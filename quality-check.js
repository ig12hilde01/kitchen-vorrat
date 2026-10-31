#!/usr/bin/env node
/**
 * KüchenVorrat App — HTTPS Quality Checker v2
 * Testet HTTPS, HTML, JS, Scanner, Modal, Resources, PWA.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const APP_DIR = __dirname;
const HTML_FILE = path.join(APP_DIR, 'index.html');
const PORT = 8443;

const results = [];
let passCount = 0;
let failCount = 0;
let warningCount = 0;

function addResult(category, name, passed, message, fixSuggestion) {
  const entry = { category, name, passed, message: message || '', fixSuggestion: fixSuggestion || '' };
  results.push(entry);
  if (passed) passCount++;
  else if (fixSuggestion) failCount++;
  else warningCount++;
}

// ================================================================
// TEST 0: HTTPS SERVER CHECK
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 0: HTTPS-Server — https://localhost:8443');
console.log('='.repeat(60) + '\n');

let html = '';
let htmlStatus = null;
let htmlContentType = '';
let htmlSize = 0;
let serverRunning = false;

try {
  // Use separate curl calls to avoid shell escaping issues
  var code = execSync('curl -s -o /dev/null -w "%{http_code}" -k https://localhost:' + PORT + ' 2>/dev/null', { timeout: 10000 }).toString().trim();
  var size = execSync('curl -s -o /dev/null -w "%{size_download}" -k https://localhost:' + PORT + ' 2>/dev/null', { timeout: 10000 }).toString().trim();
  var ct = execSync('curl -s -I -k https://localhost:' + PORT + ' 2>/dev/null | grep -i "content-type" | sed "s/Content-Type: //" | tr -d "\\r\\n"', { timeout: 10000 }).toString().trim();
  var time = execSync('curl -s -o /dev/null -w "%{time_total}" -k https://localhost:' + PORT + ' 2>/dev/null', { timeout: 10000 }).toString().trim();

  htmlStatus = parseInt(code);
  htmlSize = parseInt(size);
  htmlContentType = ct;

  if (htmlStatus >= 200 && htmlStatus < 300) {
    serverRunning = true;
    console.log('OK Server antwortet mit HTTP ' + htmlStatus);
    console.log('Size: ' + htmlSize + ' bytes, CT: ' + htmlContentType + ', Time: ' + time + 's');
  } else {
    console.log('FAIL HTTP ' + htmlStatus);
  }

  addResult('HTTPS-Server', 'HTTP Status 200', htmlStatus === 200,
    'HTTP ' + htmlStatus,
    'Server nicht erreichbar. Start: python3 server-https.py');

  html = execSync('curl -s -k https://localhost:' + PORT, { timeout: 10000 }).toString();

  addResult('HTTPS-Server', 'HTML-Body geladen', html.length > 100,
    'HTML geladen: ' + html.length + ' bytes',
    html.length < 100 ? 'HTML leer oder Server-Fehler' : null);

  addResult('HTTPS-Server', 'Content-Type korrekt', htmlContentType.indexOf('html') !== -1 || html.indexOf('<!DOCTYPE') !== -1,
    'CT: ' + htmlContentType);

} catch (e) {
  console.log('WARN Server nicht erreichbar: ' + e.message);

  // Try to start server
  try {
    console.log('Trying to start server...');
    execSync('cd "' + APP_DIR + '" && nohup python3 server-https.py > /dev/null 2>&1 &', { timeout: 3000 });
    var _delay = function(ms) { var t = Date.now(); while (Date.now() - t < ms); };
    _delay(2000);

    var curlRecover = execSync(
      'curl -s -o /dev/null -w "%{http_code}" -k https://localhost:' + PORT + ' 2>/dev/null',
      { timeout: 5000 }
    ).toString().trim();

    if (curlRecover === '200') {
      serverRunning = true;
      html = execSync('curl -s -k https://localhost:' + PORT, { timeout: 10000 }).toString();
      htmlStatus = 200;
      addResult('HTTPS-Server', 'HTTP Status 200 (recovered)', true, 'Server gestartet');
      addResult('HTTPS-Server', 'HTML-Body (recovered)', html.length > 100, 'HTML: ' + html.length + ' bytes');
    } else {
      addResult('HTTPS-Server', 'HTTP Status 200 (recovered)', false, 'Recover failed: HTTP ' + curlRecover);
      addResult('HTTPS-Server', 'HTML-Body (recovered)', false, 'Server nicht gestartet');
    }
  } catch (e2) {
    addResult('HTTPS-Server', 'HTTP Status 200', false, 'Server nicht erreichbar: ' + e.message);
    addResult('HTTPS-Server', 'HTML-Body', false, 'Server nicht gestartet');

    // Fallback: read from disk
    if (fs.existsSync(HTML_FILE)) {
      html = fs.readFileSync(HTML_FILE, 'utf-8');
      console.log('Fallback: HTML from disk (' + html.length + ' bytes)');
    }
  }
}

// ================================================================
// TEST 1: HTML STRUCTURE — IDs
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 1: HTML IDs');
console.log('='.repeat(60) + '\n');

var jsFull = html.match(/<script>([\s\S]*?)<\/script>/);
jsFull = jsFull ? jsFull[1] : '';

// Extract getElementById refs from JS
var idRefs = [];
var idRegex = /getElementById\(['"`]([^'"`]+)['"`]\)/g;
var m;
while ((m = idRegex.exec(jsFull)) !== null) {
  idRefs.push(m[1]);
}
// Also catch querySelector('#id') refs
var idRegex2 = /querySelector\(['"`]#([^'"`]+)['"`]\)/g;
while ((m = idRegex2.exec(jsFull)) !== null) {
  idRefs.push(m[1]);
}
// Also catch .dataset refs like data-tab values
var datasetTabRefs = [];
var dtRegex = /data-tab="([^"]+)"/g;
while ((m = dtRegex.exec(html)) !== null) {
  datasetTabRefs.push(m[1]);
}

// All IDs defined in HTML
var definedIds = [];
var idDefRegex = /id=['"`]([^'"`]+)['"`]/g;
while ((m = idDefRegex.exec(html)) !== null) {
  definedIds.push(m[1]);
}

var uniqueIdRefs = [];
var seen = {};
idRefs.forEach(function(r) { if (r && !seen[r]) { seen[r] = true; uniqueIdRefs.push(r); } });

console.log('JS ID refs: ' + uniqueIdRefs.length);
console.log('HTML IDs defined: ' + definedIds.length + '\n');

uniqueIdRefs.forEach(function(id) {
  var exists = definedIds.indexOf(id) !== -1;
  if (!exists) console.log('  MISSING: #' + id);
  addResult('HTML-IDs', 'ID: #' + id, exists,
    exists ? 'Existiert' : 'Referenziert aber NICHT im HTML',
    exists ? null : 'Fuege id="' + id + '" hinzu');
});

datasetTabRefs.forEach(function(targetId) {
  var exists = definedIds.indexOf(targetId) !== -1;
  addResult('HTML-IDs', 'Tab-Ziel: ' + targetId, exists,
    exists ? 'Ziel existiert' : 'Ziel existiert NICHT',
    exists ? null : 'Erstelle section id="' + targetId + '"');
});

var sections = ['sec-home','sec-products','sec-detail','sec-scan','sec-shopping','sec-locations','sec-categories','sec-timeline','sec-recipes','sec-settings'];
sections.forEach(function(secId) {
  var exists = definedIds.indexOf(secId) !== -1;
  addResult('HTML-IDs', 'Section: ' + secId, exists,
    exists ? 'Vorhanden' : 'FEHLT!');
});

// ================================================================
// TEST 2: FUNCTION DEFINITIONS
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 2: JavaScript-Funktionen');
console.log('='.repeat(60) + '\n');

var funcDefs = [];
var fdRegex = /function\s+(\w+)\s*\(/g;
while ((m = fdRegex.exec(jsFull)) !== null) {
  funcDefs.push(m[1]);
}

var criticalFunctions = [
  'loadProducts','saveProducts','getProductById','updateProduct',
  'deleteProduct','addProduct','loadShopping','saveShopping',
  'addToShopping','toggleShoppingItem','removeShoppingItem','clearShoppingList',
  'getAutoShoppingProducts','loadTimeline','addTimelineEntry',
  'renderStats','renderExpiringList','renderLowStockList','renderTimeline',
  'renderFilterPills','renderProductGrid','changeQty','openDetail',
  'refreshDetail','renderShoppingList','showToast','showSection',
  'openModal','closeModal','refreshAll','init',
  'formatExpiry','getEmojiForCategory','getStatusBadge','getExpiryClass',
  'getDefaultProducts','formatDateShort','formatDateFull',
  'isValidBarcode','normalizeBarcode','fetchProductByBarcode',
  'loadScanHistory','saveScanHistory','addToScanHistory','renderScanHistory',
  'getTimeAgo','openScanner','closeScanner','switchCamera',
  'onScanSuccess','onScanFailure','showScannerError','restartScanner',
  'processBarcode','showBarcodeLoading','showBarcodeResult',
  'showBarcodeResultForExisting','showBarcodeError','handleManualBarcodeSearch'
];

criticalFunctions.forEach(function(fn) {
  var isDefined = funcDefs.indexOf(fn) !== -1;
  var isUsed = jsFull.indexOf(fn + '(') !== -1 || jsFull.indexOf("'" + fn + "'") !== -1;
  addResult('Funktionen', 'Funktion: ' + fn + '()', isDefined,
    isDefined ? (isUsed ? 'Definiert und verwendet' : 'Definiert') : 'NICHT DEFINIERT!',
    isDefined ? null : 'function ' + fn + '() { ... }');
});

// ================================================================
// TEST 3: LOCALSTORAGE
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 3: localStorage');
console.log('='.repeat(60) + '\n');

var hasSK = jsFull.indexOf('STORAGE_KEY') !== -1;
var hasLK = jsFull.indexOf('SHOPPING_KEY') !== -1;
var hasHK = jsFull.indexOf('HISTORY_KEY') !== -1;
var hasSHK = jsFull.indexOf('SCAN_HISTORY_KEY') !== -1;
addResult('localStorage', 'Storage-Keys definiert', hasSK && hasLK && hasHK && hasSHK,
  hasSK && hasLK && hasHK && hasSHK ? 'Alle 4 Keys definiert' : 'Fehlende Keys');

var lsRead = (jsFull.match(/localStorage\.getItem/g) || []).length;
var lsWrite = (jsFull.match(/localStorage\.setItem/g) || []).length;
addResult('localStorage', 'getItem (read)', lsRead > 0, lsRead + 'x getItem');
addResult('localStorage', 'setItem (write)', lsWrite > 0, lsWrite + 'x setItem');

var tryCatch = (jsFull.match(/try\s*\{[\s\S]*?localStorage/g) || []).length;
addResult('localStorage', 'try/catch Error-Handling', tryCatch > 0,
  tryCatch + 'x try/catch',
  tryCatch === 0 ? 'Alle localStorage-Zugriffe in try/catch wrappen' : null);

// ================================================================
// TEST 4: EVENT HANDLERS
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 4: Event Handler');
console.log('='.repeat(60) + '\n');

var criticalBindings = [
  { id: 'modalSave', ctx: 'Modal speichern' },
  { id: 'modalClose', ctx: 'Modal schliessen' },
  { id: 'modalCancel', ctx: 'Modal abbrechen' },
  { id: 'fabBtn', ctx: 'FAB neues Produkt' },
  { id: 'homeScanBtn', ctx: 'Home-Scanner' },
  { id: 'startScanBtn', ctx: 'Scanner starten' },
  { id: 'scannerClose', ctx: 'Scanner schliessen' },
  { id: 'scannerSwitchCam', ctx: 'Scanner Kamera-Wechsel' },
  { id: 'clearShopping', ctx: 'Einkaufsliste loeschen' },
  { id: 'shoppingAddBtn', ctx: 'Einkauf hinzufügen' },
  { id: 'viewToggle', ctx: 'Grid/List Toggle' },
  { id: 'backBtn', ctx: 'Back-Button' },
  { id: 'manualSearchBtn', ctx: 'Manuelle Suche' },
  { id: 'modalScanBtn', ctx: 'Modal Scanner' },
  { id: 'showAllExpired', ctx: 'Ablauf anzeigen' },
  { id: 'showAllLow', ctx: 'Niedrig anzeigen' },
];

criticalBindings.forEach(function(b) {
  var hasId = definedIds.indexOf(b.id) !== -1;
  var hasBind = jsFull.indexOf(b.id) !== -1 && jsFull.indexOf('addEventListener') !== -1;
  var ok = hasId && hasBind;
  if (!ok) console.log('  ' + (hasId ? 'WARN' : 'FAIL') + ': ' + b.ctx + ' ID:' + hasId + ' Bind:' + hasBind);
  addResult('Event-Handler', b.ctx + ' (#' + b.id + ')', ok,
    hasId ? (hasBind ? 'ID+Binding OK' : 'ID vorhanden, Binding fehlt') : 'ID fehlt',
    hasBind && !hasId ? null : 'Erstelle Element + addEventListener');
});

// ================================================================
// TEST 5: SCANNER SETUP
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 5: Barcode-Scanner');
console.log('='.repeat(60) + '\n');

var libLoaded = html.indexOf('html5-qrcode') !== -1;
addResult('Scanner', 'html5-qrcode Bibliothek', libLoaded,
  libLoaded ? 'Bibliothek geladen' : 'NICHT geladen',
  libLoaded ? null : 'script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"');

var scContainer = html.indexOf('id="scanner-reader"') !== -1;
addResult('Scanner', 'Container #scanner-reader', scContainer,
  scContainer ? 'Container vorhanden' : 'FEHLT');

var scOverlay = html.indexOf('scanner-overlay') !== -1;
addResult('Scanner', 'Scanner-Overlay', scOverlay,
  scOverlay ? 'Overlay vorhanden' : 'FEHLT');

var scError = html.indexOf('scanner-error') !== -1;
addResult('Scanner', 'Fehlerbehandlung', scError,
  scError ? 'Fehler-Overlay vorhanden' : 'FEHLT');

var scFeedback = html.indexOf('scanner-feedback') !== -1;
addResult('Scanner', 'Scanner-Feedback', scFeedback,
  scFeedback ? 'Feedback vorhanden' : 'FEHLT');

var scannerFuncs = ['openScanner','closeScanner','switchCamera','onScanSuccess','onScanFailure','showScannerError','restartScanner'];
scannerFuncs.forEach(function(fn) {
  var defined = funcDefs.indexOf(fn) !== -1;
  addResult('Scanner', 'Funktion: ' + fn, defined,
    defined ? 'Definiert' : 'FEHLT',
    defined ? null : 'function ' + fn + '() { ... }');
});

// ================================================================
// TEST 6: MODAL FORM FIELDS
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 6: Modal-Formular');
console.log('='.repeat(60) + '\n');

var modalFields = [
  'modalName','modalCategory','modalLocation','modalQty','modalUnit',
  'modalMinStock','modalExpiry','modalNoExp','modalBought',
  'modalBarcode','modalNotes','modalPrice','modalScanBtn','modalCancel'
];
modalFields.forEach(function(f) {
  var exists = definedIds.indexOf(f) !== -1;
  addResult('Modal', 'Feld: ' + f, exists,
    exists ? 'Vorhanden' : 'FEHLT im HTML',
    exists ? null : 'Erstelle input id="' + f + '"');
});

// ================================================================
// TEST 7: CSS CLASSES
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 7: CSS-Klassen');
console.log('='.repeat(60) + '\n');

var jsClassNames = {};
var cssRe = /(?:\.\w[\w-]*)/g;
// Just check critical CSS classes
var criticalCss = [
  'scanner-overlay','scanner-error','scanner-feedback','scanner-body','scanner-top',
  'scanner-frame','scanner-line','scanner-label','scanner-choices',
  'product-card','modal-backdrop','modal-panel','modal-header','modal-close',
  'toast','fab','filter-pill','qty-control','detail-hero',
  'barcode-result','br-header','br-body','br-loading','br-error',
  'tl-entry','tl-dot','tl-date','tl-text',
  'settings-group','settings-item','toggle',
  'list-item','list-section-title','section-header',
  'stats-row','stat-card','quick-action',
  'search-bar','filter-pills','product-grid'
];

criticalCss.forEach(function(cls) {
  var inStyle = html.indexOf('.' + cls) !== -1 || html.indexOf('#' + cls) !== -1;
  var inJs = jsFull.indexOf("'" + cls + "'") !== -1 || jsFull.indexOf('"' + cls + '"') !== -1;
  var ok = inStyle || !inJs;
  if (!ok) console.log('  MISSING CSS: .' + cls + ' (used in JS)');
  addResult('CSS', 'Klasse: .' + cls, ok,
    inStyle ? 'Definiert in <style>' : (inJs ? 'In JS verwendet, NICHT in CSS' : 'Nicht verwendet'),
    inJs && !inStyle ? '.class {' + cls + ' { ... } zum <style>-Block hinzufuegen' : null);
});

// ================================================================
// TEST 8: PRODUCT ID SCHEMA
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 8: Produkt-IDs');
console.log('='.repeat(60) + '\n');

var defaultProducts = html.match(/\{ id:'([^']+)'/g) || [];
var defaultIds = [];
defaultProducts.forEach(function(x) {
  var m2 = x.match(/id:'([^']+)'/);
  if (m2) defaultIds.push(m2[1]);
});
addResult('Produkt-IDs', 'Default-Produkte', defaultIds.length > 0,
  defaultIds.length + ' Produkte: ' + defaultIds.join(', '));

var apMatch = jsFull.match(/function addProduct[\s\S]*?product\.id\s*=\s*([^;]+)/);
if (apMatch) {
  var idGen = apMatch[1].trim();
  var usesTs = idGen.indexOf('Date.now()') !== -1;
  addResult('Produkt-IDs', 'ID-Generierung', usesTs, 'Generiert mit Date.now()');
} else {
  addResult('Produkt-IDs', 'ID-Generierung', false, 'Keine ID-Generierung in addProduct',
    "product.id = 'p' + Date.now();");
}

// ================================================================
// TEST 9: SHOPPING & TIMELINE
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 9: Einkaufsliste & Timeline');
console.log('='.repeat(60) + '\n');

var shopFuncs = ['loadShopping','saveShopping','addToShopping','toggleShoppingItem','removeShoppingItem','clearShoppingList','getAutoShoppingProducts','renderShoppingList'];
shopFuncs.forEach(function(fn) {
  addResult('Einkaufsliste', fn, funcDefs.indexOf(fn) !== -1,
    funcDefs.indexOf(fn) !== -1 ? 'Definiert' : 'FEHLT');
});

var tlFuncs = ['loadTimeline','addTimelineEntry','renderTimeline'];
tlFuncs.forEach(function(fn) {
  addResult('Timeline', fn, funcDefs.indexOf(fn) !== -1,
    funcDefs.indexOf(fn) !== -1 ? 'Definiert' : 'FEHLT');
});

// ================================================================
// TEST 10: OPENFOODFACTS API
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 10: OpenFoodFacts API');
console.log('='.repeat(60) + '\n');

var offApi = jsFull.indexOf('openfoodfacts') !== -1;
addResult('API', 'OpenFoodFacts URL', offApi,
  offApi ? 'API definiert' : 'FEHLT');

var fetchBar = jsFull.indexOf('fetchProductByBarcode') !== -1;
addResult('API', 'fetchProductByBarcode', fetchBar,
  fetchBar ? 'Funktion definiert' : 'FEHLT');

// ================================================================
// TEST 11: FILES
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 11: Dateistruktur');
console.log('='.repeat(60) + '\n');

var requiredFiles = ['index.html','manifest.json','service-worker.js','server-https.py','cert.pem','key.pem'];
requiredFiles.forEach(function(f) {
  var exists = fs.existsSync(path.join(APP_DIR, f));
  var size = exists ? fs.statSync(path.join(APP_DIR, f)).size : 0;
  addResult('Dateien', f, exists, exists ? (size + ' bytes') : 'FEHLT');
});

// manifest check
try {
  var manifest = JSON.parse(fs.readFileSync(path.join(APP_DIR, 'manifest.json'), 'utf-8'));
  addResult('Dateien', 'manifest.json gueltig', manifest.name && manifest.start_url && manifest.display,
    manifest.name ? 'name=' + manifest.name + ' display=' + manifest.display : 'Fehlende Felder');
  addResult('Dateien', 'PWA Icons', manifest.icons && manifest.icons.length > 0,
    manifest.icons ? manifest.icons.length + ' Icons' : 'Keine Icons');
} catch(e) {
  addResult('Dateien', 'manifest.json gueltig', false, 'JSON Error: ' + e.message);
}

// ================================================================
// TEST 12: CROSS-REFERENCE
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 12: Cross-Reference');
console.log('='.repeat(60) + '\n');

var definedFns = {};
funcDefs.forEach(function(f) { definedFns[f] = true; });

var onclicks = html.match(/onclick=['"]([^'"]+)['"]/g) || [];
var undefinedOnclicks = [];
onclicks.forEach(function(o) {
  var fn = o.match(/onclick=['"]([^'"]+)['"]/);
  if (fn) {
    // Strip trailing parens/args: "restartScanner()" -> "restartScanner", "openDetail('x')" -> "openDetail"
    var cleanName = fn[1].replace(/\(.*$/, '').trim();
    if (cleanName && !definedFns[cleanName]) undefinedOnclicks.push(cleanName);
  }
});
addResult('Cross-Ref', 'onclick -> JS-Funktion', undefinedOnclicks.length === 0,
  undefinedOnclicks.length === 0 ? 'Alle OK' : 'Ohne JS: ' + undefinedOnclicks.join(', '),
  undefinedOnclicks.length > 0 ? 'Erstelle Funktionen: ' + undefinedOnclicks.join(', ') : null);

var hasBB = definedIds.indexOf('backBtn') !== -1;
var hasBBH = jsFull.indexOf('backBtn') !== -1 && jsFull.indexOf('addEventListener') !== -1;
addResult('Cross-Ref', 'Back-Button', hasBB && hasBBH,
  hasBB ? (hasBBH ? 'OK' : 'Button vorhanden, Handler fehlt') : 'Button fehlt');

var hasToast = definedIds.indexOf('toast') !== -1;
addResult('Cross-Ref', 'Toast-Element', hasToast,
  hasToast ? '#toast vorhanden' : '#toast fehlt');

// ================================================================
// TEST 13: HTTPS RESOURCES (no mixed content)
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST 13: HTTPS-Ressourcen');
console.log('='.repeat(60) + '\n');

var httpInHtml = [];
var allHttpUrls = html.match(/['"]http:\/\/[^'"]+/g) || [];
allHttpUrls.forEach(function(u) {
  // Filter out false positives
  var idx = html.indexOf(u);
  if (idx === -1) { httpInHtml.push(u); return; }
  var ctx = html.substring(Math.max(0, idx - 100), idx);
  // Skip data URIs (SVG namespaces inside SVG data URIs)
  if (ctx.indexOf('data:image/svg+xml') !== -1 || ctx.indexOf('data:application/svg') !== -1) return;
  // Skip xml namespace attributes
  if (ctx.indexOf("xmlns='") !== -1 || ctx.indexOf('xmlns="') !== -1) return;
  httpInHtml.push(u);
});
addResult('HTTPS', 'Kein Mixed-Content (http://)', httpInHtml.length === 0,
  httpInHtml.length === 0 ? 'Alle Ressourcen HTTPS' : 'HTTP gefunden: ' + httpInHtml.join(', '),
  httpInHtml.length > 0 ? 'Ersetze http:// durch https://' : null);

var fetchHttpCalls = [];
var fRe = /fetch\(['"`]([^'"`]+)['"`]/g;
var fm;
while ((fm = fRe.exec(jsFull)) !== null) {
  if (fm[1].indexOf('http://') === 0) fetchHttpCalls.push(fm[1]);
}
addResult('HTTPS', 'fetch() via HTTPS', fetchHttpCalls.length === 0,
  fetchHttpCalls.length === 0 ? 'Alle fetch() URLs sicher' : 'HTTP fetch: ' + fetchHttpCalls.join(', '),
  fetchHttpCalls.length > 0 ? 'Ersetze http:// in fetch()' : null);

// External resources
var extScripts = html.match(/<script[^>]+src=['"]([^'"]+)['"]/g) || [];
var extStyles = html.match(/<link[^>]+href=['"]([^'"]+)['"]/g) || [];

addResult('HTTPS', 'Externe Scripts', extScripts.length > 0,
  extScripts.length > 0 ? extScripts.length + ' externe Scripts geladen' : 'Keine externen Scripts');
addResult('HTTPS', 'Externe Stylesheets', extStyles.length > 0,
  extStyles.length > 0 ? extStyles.length + ' externe Stylesheets geladen' : 'Keine externen Stylesheets');

// ================================================================
// BONUS: SERVICE WORKER / PWA
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('BONUS: Service Worker & PWA');
console.log('='.repeat(60) + '\n');

var swExists = fs.existsSync(path.join(APP_DIR, 'service-worker.js'));
addResult('PWA', 'service-worker.js vorhanden', swExists,
  swExists ? 'Datei vorhanden' : 'FEHLT');

if (swExists) {
  var swContent = fs.readFileSync(path.join(APP_DIR, 'service-worker.js'), 'utf-8');
  addResult('PWA', 'SW: install Event', swContent.indexOf('install') !== -1,
    swContent.indexOf('install') !== -1 ? 'install Handler vorhanden' : 'FEHLT');
  addResult('PWA', 'SW: fetch Event', swContent.indexOf('fetch') !== -1,
    swContent.indexOf('fetch') !== -1 ? 'fetch Handler vorhanden' : 'FEHLT');
}

var swReg = html.indexOf('service-worker') !== -1 || html.indexOf('register') !== -1;
addResult('PWA', 'SW-Registration im HTML', swReg,
  swReg ? 'Registrierung vorhanden' : 'Keine Registrierung gefunden',
  'Fuege navigator.serviceWorker.register(\"service-worker.js\") in init() hinzu');

// ================================================================
// SUMMARY
// ================================================================
console.log('\n' + '='.repeat(60));
console.log('ZUSAMMENFASSUNG');
console.log('='.repeat(60) + '\n');

console.log('OK: ' + passCount);
console.log('FAIL: ' + failCount);
console.log('WARN: ' + warningCount);
var total = passCount + failCount + warningCount;
var score = total > 0 ? Math.round((passCount / total) * 100) : 0;
console.log('TOTAL: ' + total);
console.log('SCORE: ' + score + '%\n');

if (failCount > 0) {
  console.log('KRITISCHE PROBLEME:');
  results.filter(function(r) { return !r.passed && r.fixSuggestion; }).forEach(function(r) {
    console.log('  FAIL: ' + r.name + ': ' + r.message);
    console.log('    Fix: ' + r.fixSuggestion);
  });
}

// ================================================================
// GENERATE REPORT.md
// ================================================================

var now = new Date().toISOString().replace('T', ' ').slice(0, 19);
var htmlSizeBytes = fs.existsSync(HTML_FILE) ? fs.statSync(HTML_FILE).size : 0;
var jsLines = jsFull ? jsFull.split('\n').length : 0;

var report = '# KitchenVorrat App - HTTPS Quality Check Report\n\n';
report += '> Generated: ' + now + '\n';
report += '> App Directory: `' + APP_DIR + '`\n';
report += '> index.html: ' + new Intl.NumberFormat('de-DE').format(htmlSizeBytes) + ' bytes, ' + jsLines + ' JS lines\n';
report += '> Server: https://localhost:' + PORT + ' (' + (serverRunning ? 'RUNNING' : 'STOPPED') + ')\n\n';
report += '---\n\n';

report += '## Result\n\n';
report += '| Status | Count |\n';
report += '|--------|-------|\n';
report += '| OK | ' + passCount + ' |\n';
report += '| FAIL | ' + failCount + ' |\n';
report += '| WARN | ' + warningCount + ' |\n';
report += '| SCORE | **' + score + '%** |\n\n';
report += '---\n\n';

// Group by category
var catLabels = {
  'HTTPS-Server': 'HTTPS-Server',
  'HTML-IDs': '1. HTML IDs',
  'Funktionen': '2. JavaScript-Funktionen',
  'localStorage': '3. localStorage',
  'Event-Handler': '4. Event Handler',
  'Scanner': '5. Barcode-Scanner',
  'Modal': '6. Modal-Formular',
  'CSS': '7. CSS-Klassen',
  'Produkt-IDs': '8. Produkt-IDs',
  'Einkaufsliste': '9. Einkaufsliste',
  'Timeline': '10. Timeline',
  'API': '11. OpenFoodFacts API',
  'Dateien': '12. Dateistruktur',
  'Cross-Ref': '13. Cross-Reference',
  'HTTPS': '14. HTTPS-Ressourcen',
  'PWA': 'BONUS: Service Worker & PWA'
};

Object.keys(catLabels).forEach(function(key) {
  var catResults = results.filter(function(r) { return r.category === key; });
  if (catResults.length === 0) return;

  var catPass = catResults.filter(function(r) { return r.passed; }).length;

  report += '## ' + catLabels[key] + '\n\n';
  report += '**Result: ' + catPass + '/' + catResults.length + ' passed**\n\n';

  catResults.forEach(function(r) {
    report += '- ' + (r.passed ? 'OK' : 'FAIL') + ' ' + r.name + ': ' + r.message + '\n';
    if (r.fixSuggestion) report += '  -> **Fix:** ' + r.fixSuggestion + '\n';
  });

  report += '\n---\n\n';
});

// Fix priority
report += '## Priority Fixes\n\n';
var fixes = results.filter(function(r) { return !r.passed && r.fixSuggestion; });
if (fixes.length > 0) {
  fixes.forEach(function(r, i) {
    report += (i + 1) + '. **' + r.name + '**\n';
    report += '   Problem: ' + r.message + '\n';
    report += '   **Solution:** ' + r.fixSuggestion + '\n\n';
  });
} else {
  report += 'No critical issues found!\n';
}

// HTTPS Server status
report += '## HTTPS Server Status\n\n';
if (serverRunning) {
  report += '- **Server:** https://localhost:' + PORT + '\n';
  report += '- **Status:** HTTP ' + htmlStatus + '\n';
  report += '- **Size:** ' + htmlSize + ' bytes\n';
  report += '- **Content-Type:** ' + htmlContentType + '\n';
  report += '- **Certificate:** Self-signed (localhost)\n';
  report += '\n```bash\n';
  report += 'curl -k https://localhost:' + PORT + '\n';
  report += '```\n';
} else {
  report += '- **Server:** https://localhost:' + PORT + ' NOT REACHABLE\n';
  report += '- **Start:** `python3 server-https.py` in app directory\n\n';
  report += '```bash\ncd ' + APP_DIR + '\npython3 server-https.py\n```\n';
}

// Test commands
report += '## Test Commands\n\n';
report += '```bash\n';
report += '# Check HTTPS server\ncurl -k https://localhost:' + PORT + '\n\n';
report += '# Check HTML content\ncurl -k https://localhost:' + PORT + ' | grep -o "id=\"[^\"]*\"" | sort -u\n\n';
report += '# Check certificate\nopenssl s_client -connect localhost:' + PORT + ' </dev/null 2>/dev/null | openssl x509 -noout -dates\n\n';
report += '# Validate manifest\npython3 -m json.tool manifest.json\n';
report += '```\n';

fs.writeFileSync(path.join(APP_DIR, 'REPORT.md'), report);

console.log('\nREPORT.md created: ' + path.join(APP_DIR, 'REPORT.md') + '\n');

process.exit(failCount > 0 ? 1 : 0);
