# 🍽 KüchenVorrat

Deine lokale Küchen-Vorratsverwaltung — **ohne Login, ohne Cloud, komplett auf deinem Mac.**

## ✨ Features

- **20 Kategorien** mit Emoji und Farbe — automatisch erkannt
- **Barcode-Scanner** (Kamera) — scanne Produkte und lookup in OpenFoodFacts
- **Lagerverwaltung** — Räume, Lagerplätze, QR-Codes zum Drucken
- **Refill-Modus** — Bestand via Barcode schnell auffüllen
- **Einkaufsliste** — mit Vorschlägen aus niedrigem Bestand
- **Rezept-Import** — von Chefkoch.de und anderen Quellen (JSON-LD)
- **Wochenplan** — automatische Generierung aus eigenen Rezepten
- **Timeline** — Verbrauch, Kauf, Ablauf aller Produkte
- **Backup/Import** — alles als einzelne JSON-Datei
- **PWA** — als App auf dem Homescreen installieren

## 🚀 Starten

```bash
cd /Users/hilde01/.hermes/scratch/kitchen-app-new
python3 server-https.py
```

Dann im Browser öffnen: **https://localhost:8443**

> **Ein Server für alles** — App, Kamera, API und PWA-Assets auf einem einzigen HTTPS-Port.

## 📱 Als App installieren (iOS Safari)

1. App in Safari öffnen
2. **Teilen**-Button tippen
3. **Zum Home-Bildschirm** tippen
4. Fertig — die App startet ohne Browser-UI

## 💾 Datenspeicher

Alle Daten liegen lokal im **localStorage** des Browsers — eine einzige JSON-Datei:

```json
{
  "categories": [...],
  "products": [...],
  "rooms": [...],
  "locations": [...],
  "shopping": [...],
  "recipes": [...],
  "timeline": [...]
}
```

## 📂 Datei-Struktur

| Datei | Beschreibung |
|-------|-------------|
| `index.html` | Hauptdatei (Single-Page-App, 110KB) |
| `manifest.json` | PWA Manifest |
| `service-worker.js` | Offline-Caching |
| `server-https.py` | **Einzelner HTTPS-Server** (alles auf Port 8443) |
| `README.md` | Diese Datei |
| `cert.pem` | Selbstsigniertes TLS-Zertifikat |
| `key.pem` | TLS-Privatschlüssel |
| `uploads/` | Kameraspeicherung |

## 🔐 HTTPS-Server (Port 8443)

Der Server dient **alles** auf einem einzigen HTTPS-Port:

| Route | Methode | Beschreibung |
|-------|---------|-------------|
| `/` | GET | Haupt-App (index.html) |
| `/manifest.json` | GET | PWA Manifest |
| `/service-worker.js` | GET | Service Worker |
| `/icon-192.png` | GET | PWA Icon (Platzhalter) |
| `/api/capture` | POST | Kamera-Bild speichern (Base64-JPEG) |
| alle anderen | GET | Statische Dateien aus Root |
