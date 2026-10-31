# Komparative Analyse: Top 5 Vorrats-Apps

> Erstellt: 2025-10-25 | Ziel: Erkenntnisse für den Aufbau einer neuen, cleanen Vorrats-App

---

## 1. VorratsApp

**Plattform:** iOS, Android (Android ab Juli 2025) | **Rating:** 4.8★ | **Preis:** Kostenlos + Premium ab 0,99 €/Monat (Jahresabo 24,99 €, Lifetime 9,99 €) | **Entwickler:** Kidder & Kriehuber GbR (Deutschland)

### Features
- Barcode-Scanner (10+ Datenbanken, optimiert für D/A/CH)
- KI-Erkennung: Kassenbon-Foto → alle Produkte automatisch
- KI-Erkennung: Einzelprodukt-Foto → Identifizierung
- Automatische Kategorieerkennung per KI
- Farbcodierte MHD-Ampel (Rot/Orange/Grün)
- Push-Benachrichtigungen bei ablaufenden Produkten
- Lagerorte mit Symbol und Farbe (Kühlschrank, Gefriertruhe, Vorratsschrank, Keller)
- Mindestbestand pro Ort → automatische Erinnerung
- KI-Rezeptvorschläge (basierend auf Vorrat, priorisiert ablaufende Produkte)
- Eigene Rezepte speichern (Foto, Zutaten, Schritt-für-Schritt)
- **Koch-Modus** mit integrierten Timern pro Schritt
- Gemeinschafts-Rezeptdatenbank & Teilen mit Community
- Essensplaner (Wochenplaner)
- Saisonkalender (60+ Sorten, Freiland/Lager/Gewächshaus)
- Challenges & Achievements (gamification: Bronze→Diamant)
- Haushaltsteilung (Echtzeit-Sync, Ein Premium-Kauf gilt für ganzen Haushalt)
- Intelligente Einkaufsliste mit Supermarkt-Zuordnung
- Statistiken (Vorratsgesundheits-Score, Kategorie-Verteilung, Resthaltbarkeit)
- Dark Mode (Premium)

### Design-Muster
- Primärfarbe: Violett/Lila (`#6c63ff` — ähnlicher Ton wie unsere aktuelle App)
- Klare weiße Karten auf hellem Grund
- Ampel-Farbsystem für MHD
- Emoji-Kategorien mit Farbakzenten
- Bottom-Tab-Navigation
- Floating Action Button (FAB) für +
- Modale Bottom-Sheets

### USP
- **Kassenbon-Scan per KI** (einzigartig)
- **Koch-Modus mit Timer** (einzigartig)
- Saisonskalender (einzigartig im Vorratsbereich)
- Gamification (Challenges/Achievements)
- Entwickler direkt aus D/A/CH → lokale Datenbanken

### Kritik
- Viele Premium-Features hinter Paywall (auch Dark Mode!)
- KI-Funktionen als Marketing-Buzzword, aber wahrscheinlich limitiert in der Qualität
- Gamification könnte als unnötig empfunden werden
- Wenig Information über Privatsphäre/Datenschutz auf der Website

---

## 2. Smantry (ehemals Pantry.App)

**Plattform:** iOS, Android, Web | **Rating:** Gut | **Preis:** Kostenlos (100 Artikel) + Premium (Subscription) | **Entwickler:** Eigenständig, seit 2019

### Features
- Barcode-Scanner (Open Food Facts)
- MHD-Tracking mit Farbcodierung (Rot/Orange/Gelb/Grün)
- Lagerräume & Fächer (Schiff, Holzfass, Obstkorb, etc.)
- **Inventory Mode**: Ganzes Lager auf einmal aktualisieren (Expected vs. Actual)
- Mindestbestand pro Artikel → "Was fehlt?" statt "Was ist da?"
- **Bereinigungsliste** (Items, die >14 Tage abgelaufen + nicht berührt)
- Home-Screen Widgets (iOS & Android): "Läuft bald ab"
- Lock-Screen Widgets (iOS)
- **Haltbarkeits-Screen** (dedizierte Seite für Datumseingabe, keine Rad-Auswahl)
- Relativ-Datumseingabe ("In 3 Tagen", "In 1 Woche", "In 1 Monat", "Kein MHD")
- Monats-only MHD ("05/2027")
- **Monat-Jahr MHD-Modus** (einzigartig)
- Kaufdatum-Tracking (Verbrauchsrate)
- Verbrauchsrate-Berechnung (z.B. "0.5 pro Tag")
- Community-Features (Storage-Location-Sharing)
- PDF-Export der Bestandsliste
- **Inventar-Modus**: Schnelles Durchgehen eines ganzen Raums
- API für eigene Integrationen
- Community-Feedback-Portal
- Siri/Shortcuts Integration (iOS)

### Design-Muster
- Sehr zurückhaltendes, sachliches Design
- Weißer Hintergrund, dezentere Farben
- Fokus auf Funktionalität über Ästhetik
- **Inventory Toolbar**: Search/Sort/Filter nebeneinander
- **Item Count** über der Liste (nicht versteckt)
- Größeres Add-Button auf Inventory-Screen
- Vollbild-Scanner mit Controls darüber
- System-Fonts, große Schrift unterstützt
- **Labeled Search Pill** (nicht nur Lupe)

### USP
- **Inventory Mode** (ganze Räume scannen)
- **Verbrauchsrate & Kaufdatum** → vorausschauendes Nachbestellen
- **Monat-Jahr MHD** (einzigartig)
- Community-Sharing von Storage-Locations
- API + Web-App + native Apps
- Home-Screen Widgets (iOS + Android)

### Kritik
- Wenig emotional/freundlich
- Design wirkt eher "Tool" als "App"
- Wenig visuelle Hierarchie
- Subscription-Modell (kein Lifetime)

---

## 3. NoWaste

**Plattform:** iOS, Android, Web (business.nowasteapp.com) | **Rating:** 4.2★ | **Preis:** Kostenlos + Pro Lifetime (29,99 €) oder 6,99 €/Monat | **Entwickler:** KH Creations IVS

### Features
- Barcode-Scanner (600K lokal / 4M Pro, 14 Länder / 150 Länder)
- Foto-Scan (mehrere Produkte gleichzeitig)
- Kassenbon-Scan (Receipt scanning)
- Expiry-Date Calendar (Übersicht)
- Haushaltsteilung (Echtzeit-Sync)
- Multiple Locations (bis 20 mit Pro)
- Rezepte & Meal Plans
- Shopping Lists (pro Location)
- **Waste Tracker** (verrückte Lebensmittel tracken → Statistiken)
- Food Sustainability Page (Umweltauswirkungen)
- Impact Stats (5.6M+ tracked foods, 3.29% waste rate)
- **+100 Category Icons** (farblich)
- Search, Sort, Filter
- Free = 1 Location, 500 items | Pro = Unlimited

### Design-Muster
- **Grün/Weiß** Farbschema (Natur/Sustainability-Thema)
- Kartenbasiertes Layout
- Icon-heavy (100+ Category Icons)
- Clean, uncluttered Listen
- **Calendar-View** für Expiry Dates (einzigartig visuell)
- **Waste Tracker** mit Statistiken
- Illustrationen statt Fotos (family-groceries, cabin-fridge, etc.)
- Bottom-Tab-Navigation

### USP
- **Waste Tracker** → echtes Feedback über Verschwendung
- **Kassenbon-Scan** (Foto → multiple products)
- **Impact Page** (community-wide stats)
- Lifetime-Option (einmalig, kein Abo-Druck)
- Web-App + native Apps

### Kritik
- Android-Version: 2.9★ (sehr schlecht auf Android)
- **Scan-Timeout-Probleme** (falsches Datum, falsche Kategorie)
- "Added!"-Message geht nicht weg (Bug)
- App-Crashs beim Batch-Add
- Barcode-Scanner manchmal langsam
- Wenig Rezept-Vorschläge basierend auf Vorrat
- **Bloat** durch Sustainability-Page (laut Review)

---

## 4. FoodShelf

**Plattform:** iOS (Android geplant?) | **Rating:** ~4.5★ (neu) | **Preis:** Kostenlos | **Entwickler:** SPORTMEO LTD

### Features
- Quick-Scan (Barcode)
- MHD-Tracking
- Lagerorte als "Drawers" (Schubladen)
- **Automatische Einkaufsliste** (Low Stock → automatisch zur Liste)
- **QR-Code-Labels** für physische Schubladen (drucken & scannen)
- Statistics (Waste & Savings)
- Drawer-Selection beim Hinzufügen/Entfernen
- Manual Add mit explizitem Skip der Barcode-Lookup
- Audio & Visual Feedback bei Quick-Quantity-Adjustment
- Scanner-Undo-Behavior
- Family-Share
- Produkt-Duplikate-Integration

### Design-Muster
- Modern, clean
- QR-Code Integration für physische Organisation
- Minimalistisch
- Likely Apple-Style (iOS only)

### USP
- **QR-Code-Labels** für physische Schubladen (einzigartig)
- **Automatische Shopping List** (Low Stock)
- Audio Feedback beim Scannen
- Drawer-basierte Organisation

### Kritik
- Sehr jung (App Store seit 2025)
- Wenig Information öffentlich
- Nur iOS → begrenzte Reichweite
- Wenig bekannt über Design-Details
- Open Food Facts als einzige Datenquelle

---

## 5. Your Food

**Plattform:** iOS, Android | **Rating:** 4.7★ (5000+ Bewertungen, 50K+ Downloads) | **Preis:** Kostenlos + Premium Lifetime | **Entwickler:** Harderue Studio (1 Person)

### Features
- Barcode-Scanner (Open Food Facts)
- **Jedes Feld optional** (außer Name) → ~10 Sekunden pro Produkt
- MHD-Tracking mit per-Item Reminder-Periode (nicht global!)
- **First-Expire-First-Out Sortierung** (automatisch)
- Shopping List (Produkt move ohne Neutippen)
- **One-Tap "Put back"** vom Shopping-List zurück in den Vorrat
- Haushaltsteilung (Echtzeit-Sync)
- Budget/Spending Tracking (Preis + Charts: Woche/Monat/Jahr)
- Sublists pro Location
- **Home Inventory** (Medizin, Drogerie, Putzmittel, Tierfutter)
- Icons pro Produkt
- Sync über Geräte gratis
- Lifetime-Purchase + Abo
- Sehr persönliche Developer-Website (1 Person, direkte Messages)

### Design-Muster
- **Cute, simple, playful** — "not annoying"
- **Cute Icons** (1000+ diverse Icons)
- Clean, nicht überladen
- Sanfte Farben
- **Labeled** statt icon-only Buttons
- Klare Typografie
- **One-person brand** — sehr persönlich auf der Website
- Keine aggressiven Paywalls (free version is "a real version")

### USP
- **Jedes Feld optional** → schnellste Erfassung
- **Per-Item Reminder-Perioden** (nicht global)
- **Budget Tracking mit Charts** (einzigartig)
- **One-Tap Put-Back** vom Einkaufszettel
- **Open Food Facts** als Datenbank (community-driven, international)
- 1-Person-Studio → direkter Developer-Contact
- Kein Abo-Druck: "A paid tier exists so that they never have to [subscribe]"

### Kritik
- Keine Rezept-Vorschläge
- Kein Meal Planner
- Keine Community-Features
- Limitierte Barcode-Datenbank (nur Open Food Facts)
- Weniger Features → weniger "Premium-Feeling"

---

## 6. Quervergleich: Alle Features im Überblick

| Feature | VorratsApp | Smantry | NoWaste | FoodShelf | Your Food |
|---|---|---|---|---|---|
| Barcode-Scanner | ✅ (10+ DB) | ✅ (OFF) | ✅ (600K/4M) | ✅ | ✅ (OFF) |
| MHD-Tracking | ✅ | ✅ | ✅ | ✅ | ✅ |
| Farbcodierte MHD-Ampel | ✅ | ✅ | ✅ | ✅ | ✅ |
| Autom. Kategorie-Erkennung | ✅ KI | ❌ | ❌ | ❌ | ❌ |
| Kassenbon-Scan | ✅ KI | ❌ | ✅ Foto | ❌ | ❌ |
| Rezept-Vorschläge (KI) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Koch-Modus mit Timer | ✅ | ❌ | ❌ | ❌ | ❌ |
| Wochenplaner | ✅ | ❌ | ✅ | ❌ | ❌ |
| Saisonkalender | ✅ | ❌ | ❌ | ❌ | ❌ |
| Gamification | ✅ | ❌ | ❌ | ❌ | ❌ |
| Haushaltsteilung | ✅ | ✅ | ✅ | ✅ (Family-Share) | ✅ |
| Lagerräume/Orte | ✅ | ✅ | ✅ (20 mit Pro) | ✅ (Drawers) | ✅ |
| Sublists | ❌ | ❌ | ❌ | ❌ | ✅ |
| QR-Code-Labels | ❌ | ❌ | ❌ | ✅ | ❌ |
| Home-Screen Widgets | ❌ | ✅ | ❌ | ❌ | ❌ |
| Shopping List | ✅ | ✅ | ✅ | ✅ (auto) | ✅ |
| **Auto Shopping List** | ❌ | ❌ | ❌ | ✅ | ❌ |
| Waste Tracker | ❌ | ✅ (Cleanup) | ✅ | ❌ | ❌ |
| Budget Tracking | ❌ | ❌ | ❌ | ❌ | ✅ |
| Verbrauchsrate | ❌ | ✅ | ❌ | ❌ | ❌ |
| Monat-Jahr MHD | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Per-Item Reminder** | ❌ | ❌ | ❌ | ❌ | ✅ |
| Home Inventory (non-food) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Impact/Stats | Premium | ❌ | ✅ | ✅ | ❌ |
| API | ❌ | ✅ | ❌ | ❌ | ❌ |
| Web-App | ❌ | ✅ | ✅ | ❌ | ❌ |
| Siri Shortcuts | ❌ | ✅ | ❌ | ❌ | ❌ |

---

## 7. Design-Muster im Detail

### Häufiges Design-Muster: Farbcodierte MHD-Ampel

**ALLE 5 Apps** nutzen das Rot/Orange/Grün-Schema:
- 🔴 **Rot** = Abgelaufen / Heute
- 🟠 **Orange/Gelb** = Bald ablaufend (1-3 Tage)
- 🟢 **Grün** = In Ordnung
- ⚪ **Weiß/Grau** = Kein MHD

**Konvention:** Badges/Tags mit abgerundeten Ecken (Pill-Style)

### Layout-Pattern
1. **Bottom Navigation** (4-5 Tabs): Alle Apps
2. **Floating Action Button** (FAB, +): VorratsApp, FoodShelf
3. **Card-based Lists**: Alle Apps
4. **Search Bar**: Alle Apps (oft über den Listen)
5. **Category Pills**: VorratsApp, Your Food (horizontally scrollable)
6. **Empty States** mit Illustration + Text: Alle Apps
7. **Bottom-Sheet Modals**: Alle Apps (iOS-style)

### Typografie
- **Apple System Fonts** (`-apple-system`, `SF Pro Display`): VorratsApp, NoWaste
- **Inter/System**: Smantry, Your Food
- **Headlines**: 600 weight, tight letter-spacing (-.02em)
- **Body**: 14-16px
- **Meta/Labels**: 11-12px, uppercase, letter-spacing

### Icons
- **Emoji** als Kategorie-Icons: VorratsApp, Your Food
- **Custom Icons** (100+): NoWaste
- **System Icons**: Alle
- **Product Icons**: Your Food (1000+ diverse Icons)

---

## 8. UX-Patterns: Wie Produkte erfasst werden

### Pattern A: Barcode-Scan → Modal mit Vorschlägen (Standard)
```
1. Scanner öffnet sich (Vollbild)
2. Barcode wird erkannt
3. Produkt wird in Datenbank gesucht (OFF oder eigene DB)
4. Modal öffnet sich mit:
   - Produktname (vorgefüllt oder leer)
   - Barcode (vorgefüllt)
   - Kategorie (vorgefüllt per KI oder manuell)
   - Menge, Einheit, Verpackung
   - Verfalldatum
   - Lagerplatz
   - Notiz
5. User bestätigt oder editiert → Speichern
```

**VorratsApp:** KI-gestützte automatische Kategorisierung
**Smantry:** Dedizierter Haltbarkeits-Screen (kein Rad-Selector)
**Your Food:** Nur Name + Barcode nötig, alles andere optional
**NoWaste:** Batch-Add mit Foto-Scan möglich
**FoodShelf:** Quick-Scan mit Audio Feedback

### Pattern B: Manuelles Hinzufügen
```
1. + Button drücken
2. Formular mit allen Feldern
3. Optional: Barcode-Eingabe + Lookup
```

**Ihr Food:** Extrem minimalistisch — nur Name + Barcode, alles optional. **~10 Sekunden.**

### Pattern C: Schneller Add (Inventory Mode)
```
1. Inventory Mode starten
2. Scan oder manuell
3. Nur Datum eingeben (dedizierte Seite)
4. Weiter zum nächsten
```

**Smantry:** "Expected vs. Actual" — schnelles Durchgehen, ein Tipp = "Correct"

### Best Practice Pattern (kombiniert)
1. **Scanner → automatischer Lookup → minimales Formular**
2. **Optional-Felder** (nur Name + Barcode erforderlich)
3. **Smart Defaults** (Kategorie per KI/Heuristik)
4. **Ein-Tipp-Bestätigung** wo möglich
5. **Keine unnötigen Formulare** (Your Food's Ansatz)

---

## 9. UX-Patterns: Listen-Design

### Produkteinträge in der Liste
Alle Apps zeigen:
- **Name** (fett, 14-16px)
- **Menge + Einheit** (klein, grau)
- **MHD-Status** (farbiger Badge)
- **Lagerplatz** (optional, als Badge)
- **Icon/Emoji** (links)
- **Aktionen** (Bearbeiten, Lösken, Timeline)

**VorratsApp:** Timeline-Button (📈) direkt in der Karte
**Smantry:** Shelf + Compartment + frühestes MHD direkt in der Zeile
**NoWaste:** Swipe-to-delete, Checkbox für Mehrfachauswahl
**FoodShelf:** Drawer-Navigation + Quick-Quantity-Adjustment

### Kategorien-Filter
- **Horizontally scrollable pills**: VorratsApp, Your Food
- **Tab-Navigation**: NoWaste (Pantry/Fridge/Freezer)
- **Dropdown/Select**: Smantry

### Leere Listen
- **Illustration/Emoji** (zentriert)
- **Kurzer Text** ("Noch keine Produkte")
- **CTA-Button** ("+ Hinzufügen")

---

## 10. USP-Übersicht: Was unterscheidet die Apps?

| App | Kern-USP |
|---|---|
| **VorratsApp** | KI-Fokus: Kassenbon-Scan, Rezept-Vorschläge, Koch-Modus, Gamification |
| **Smantry** | Daten-Fokus: Verbrauchsrate, Inventory-Mode, Monat-Jahr MHD, Community-Sharing |
| **NoWaste** | Household-Fokus: Waste Tracker, Impact Stats, Kassenbon-Scan, Lifetime-Preis |
| **FoodShelf** | Physical-Digital: QR-Labels für Schubladen, Auto-Shopping-List |
| **Your Food** | Minimalismus-Fokus: 10-Sekunden-Erfassung, per-Item Reminder, Budget Tracking, 1-Person-Studio |

---

## 11. Was wir NICHT machen sollten (Lessons Learned)

### ❌ Design-Fehler

1. **Kein Dark Mode als Premium-Feature** (VorratsApp)
   - Dark Mode ist ein Grundrecht auf iOS — nicht monetarisieren

2. **Kein zu viel KI als Marketing** (VorratsApp)
   - "KI-Rezeptvorschläge" klingt gut, ist aber oft enttäuschend
   - Besser: ehrliche, zuverlässige Features als USP

3. **Kein überladenes Design** (NoWaste Sustainability Page)
   - Review sagt: "Adds unnecessary bloat"
   - Weniger ist mehr — fokussieren auf Kern-Features

4. **Kein unübersichtliches UI** (Smantry)
   - Wirkt zu "Tool" — wenig Emotion, wenig Freude
   - Balance zwischen Funktionalität und Freundlichkeit

5. **Kein "glasmorphism" oder übertriebene Effekte**
   - Keine der 5 Apps nutzt Glass-Effekte
   - Native, clean look ist der Standard

6. **Kein dunkles Design als Basis**
   - Alle 5 Apps haben helle Designs als Primary
   - Dark Mode optional (und gratis)

### ❌ UX-Fehler

1. **Kein obligatorisches Ausfüllen aller Felder** (Your Food's Gegenbeispiel!)
   - Nur Name + Barcode erforderlich, alles andere optional
   - "Every field except name is optional" → 10 Sekunden pro Produkt

2. **Kein versteckter Item Count** (Smantry's Gegenbeispiel!)
   - Item-Count sollte oben über der Liste sichtbar sein
   - Nicht im Tab-Badge verstecken

3. **Kein nur-Icon Search-Button** (Smantry's Gegenbeispiel!)
   - Labeled Search Pill statt nur Lupe-Icon
   - "Suchen" statt Icon-only → bessere Discoverability

4. **Kein Batch-Add ohne Feedback** (NoWaste)
   - "Added!"-Message die nicht weggeht → Bug
   - Batch-Actions brauchen klares Feedback

5. **Kein zu aggressives Paywall-Gating** (VorratsApp)
   - Dark Mode hinter Paywall ist ein Red Flag
   - Your Food: "Free version is a real version"

6. **Kein per-User Reminder (globale Setting)** (Ihr Food's Gegenbeispiel!)
   - Your Food: Per-Item Reminder-Perioden → flexibler
   - Global ist zu starr

### ❌ Feature-Fehler

1. **Keine Gamification** (VorratsApp)
   - Challenges/Achievements → für die meisten Nutzer irrelevant
   - Erhöht Komplexität ohne echten Nutzen

2. **Kein Receipt-Scan als KI-Glow** (VorratsApp)
   - "KI-Erkennung" ist Buzzword
   - Kassenbon-Scan funktioniert oft nicht gut genug

3. **Kein Bloat durch Features** (NoWaste)
   - Sustainability-Page wurde als "unnecessary bloat" kritisiert
   - Features nur wenn sie regelmäßig genutzt werden

4. **Kein veralteter Barcode-Scanner** (NoWaste, Android)
   - Android-Version hat 2.9★ → Scanner-Probleme
   - Scanner muss auf ALLEN Plattformen zuverlässig funktionieren

5. **Keine inkompatiblen Plattformen** (NoWaste Android)
   - Android-App schlechter als iOS → verliert Nutzer
   - Wenn keine Plattform stabil, besser nicht launchen

---

## 12. Design-Richtlinien für unsere App

### Visuelles System
- **Heller Hintergrund** (Weiß/Hellgrau) — native iOS feel
- **Eine Primärfarbe** → warmes, einladendes Grün oder Blau (nicht zu techy)
- **Weiße Karten** mit subtilem Schatten (`0 1px 3px rgba(0,0,0,.06)`)
- **Kein Gradient**
- **Kein Glass-Effekt**
- **Kein übermäßiges Rounded** (max 14px, wie native iOS)
- **System Fonts** (`-apple-system`, `SF Pro Display`)
- **Emoji** für Kategorien (warm, freundlich)
- **Ampel-Farben** für MHD (etwas weicher, nicht neon)

### Interaktions-Design
- **Bottom Tab Navigation** (iOS standard)
- **FAB** (Floating Action Button) für +
- **Bottom-Sheet Modals** (iOS standard)
- **Swipe Actions** (iOS standard: swipe-left für Aktionen)
- **Toast-Nachrichten** für Feedback (kurz, 2 Sekunden)
- **Pull to Refresh** auf Listen

### Erfassungs-Flow
1. **Barcode-Scan → automatisch Lookup → minimales Formular**
2. **Nur Name + Barcode erforderlich**
3. **Smart Defaults** (Kategorie per Heuristik aus OFF-Daten)
4. **Optional-Felder:** MHD, Menge, Lagerplatz, Notiz
5. **Scan-Feedback:** visuell + audio (wie FoodShelf)
6. **Quick-Add:** Scan → 1-Tipp-Bestätigung (wenn bekannt)

### Listen-Design
- **MHD-Status als Badge** (farbig, Pill-Style)
- **Lagerplatz als Badge** (dezenter)
- **Item Count über der Liste** (wie Smantry's Improvement)
- **Labeled Search** (nicht Icon-only)
- **Kategorien-Pills** horizontal scrollable (mit Emoji + Farbakzent)

### Was wir besser machen
- **Cleaner als Smantry** (mehr Emotion)
- **Minimalistischer als VorratsApp** (weniger KI-Buzzword, mehr Substanz)
- **Zuverlässiger als NoWaste** (besonders Scanner)
- **Mehrwert als FoodShelf** (mehr Features, gleicher Fokus)
- **Vollständiger als Your Food** (mehr Features, gleiche Einfachheit)

---

## 13. Feature-Recommendation für unsere App

### Must-Have (MVP)
- [x] Barcode-Scanner (OFF-Anbindung)
- [x] Manuelles Hinzufügen (minimal: Name + optional alles)
- [x] MHD-Tracking mit Ampel
- [x] Push-Benachrichtigungen (per-Item konfigurierbar)
- [x] Lagerräume & -plätze
- [x] Shopping List
- [x] Kategorien mit Emoji + Farbe
- [x] Suchen & Filtern
- [x] Timeline/Verlauf pro Produkt
- [x] Backup & Import (JSON)
- [x] Helle, cleanes UI

### Nice-to-Have (Phase 2)
- [ ] Budget Tracking (à la Your Food)
- [ ] Sublists (à la Your Food)
- [ ] Home-Screen Widgets (à la Smantry)
- [ ] Rezept-Import (à la unserer bestehender Code)
- [ ] Wochenplaner (à la unserer bestehender Code)
- [ ] Rezept-Vorschläge (basis, ohne KI-Hype)
- [ ] Household Sharing (wenn Backend verfügbar)

### Nice-to-Have (Phase 3)
- [ ] QR-Code-Labels (à la FoodShelf)
- [ ] Verbrauchsrate (à la Smantry)
- [ ] Monats-Jahr MHD (à la Smantry)
- [ ] Cleanup-Liste (à la Smantry)

### Nicht priorisieren
- [ ] Gamification/Challenges (VorratsApp)
- [ ] Kassenbon-Scan (technisch komplex, oft unzuverlässig)
- [ ] Koch-Modus mit Timer (Nischen-Feature)
- [ ] Saisonkalender (Nischen-Feature)
- [ ] Rezept-Community (Nischen-Feature)
- [ ] AI-Buzzwords (Marketing ohne Mehrwert)

---

## 14. Benchmarking: Preise & Monetarisierung

| App | Free | Premium Abo | Lifetime |
|---|---|---|---|
| VorratsApp | Limitiert (Produkte) | 0,99 €/Monat | 9,99 € |
| Smantry | 100 Artikel | Subscription | ❌ |
| NoWaste | 1 Location, 500 Items | 6,99 €/Monat | 29,99 € |
| FoodShelf | Kostenlos | Unbekannt | Unbekannt |
| Your Food | Vollständig (real version) | Lifetime + Abo | ✅ |

**Empfehlung:** Your Food's Ansatz — Free version ist eine "real version", Premium als Lifetime-Option. Kein Abo-Druck.

---

## Zusammenfassung: Die 5 goldenen Regeln

1. **Licht und Luft** — Helles Design, viel whitespace, keine Effekterei
2. **Schneller Scan** — Barcode → 10 Sekunden, optional Felder, smart defaults
3. **Klar strukturiert** — Item Count sichtbar, labeled buttons, keine Icon-only-Navigation
4. **Fokus auf Kern** — Keine Gamification, keine KI-Buzzwords, echte Features
5. **Freundlich statt technisch** — Warme Farben, Emoji-Icons, einladende Sprache
