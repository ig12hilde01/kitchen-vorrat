#!/usr/bin/env python3
"""
Ein HTTPS-Server für alles — Kitchen Vorrat App.
Serviert die Haupt-App (index.html), alle statischen Dateien
und die Kamera-API auf einem einzigen HTTPS-Port.

Start: python3 server-https.py
URL:   https://localhost:8443
"""

import http.server
import socketserver
import ssl
import os
import json
import sys
import mimetypes
import base64
import time
from pathlib import Path

# ─── Konfiguration ───────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
CERT_FILE = SCRIPT_DIR / "cert.pem"
KEY_FILE = SCRIPT_DIR / "key.pem"
PORT = 8443

# MIME-Type-Tabelle für alles was Python nicht kennt
EXTRA_MIME = {
    ".svg":  "image/svg+xml",
    ".webmanifest": "application/manifest+json",
    ".webp": "image/webp",
}


class KitchenHandler(http.server.BaseHTTPRequestHandler):
    """HTTPS-Server: App + Assets + Kamera-API + CORS."""

    # Verhindere doppelte Log-Einträge
    def log_message(self, format, *args):
        print(f"  [HTTPS] {self.client_address[0]} {format % args}", flush=True)

    # ── CORS ──────────────────────────────────────────────────────
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    # ── Hilfsfunktionen ───────────────────────────────────────────
    def _send_file(self, filepath: Path):
        """Datei mit korrektem MIME-Type ausliefern."""
        try:
            data = filepath.read_bytes()
            ext = filepath.suffix.lower()
            ctype = mimetypes.guess_type(str(filepath))[0] or EXTRA_MIME.get(ext, "application/octet-stream")
            self.send_response(200)
            self._cors()
            self.send_header("Content-Type", f"{ctype}; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-cache")
            self.send_header("Connection", "close")
            self.end_headers()
            self.wfile.write(data)
        except FileNotFoundError:
            self._send_error(404, "Nicht gefunden")
        except Exception as e:
            self._send_error(500, f"Server-Fehler: {e}")

    def _send_json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self._cors()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Connection", "close")
        self.end_headers()
        self.wfile.write(body)

    def _send_error(self, code, msg):
        self._send_json(code, {"error": msg})

    def _send_html(self, html_text: str):
        """HTML-String ausliefern."""
        data = html_text.encode("utf-8")
        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Connection", "close")
        self.end_headers()
        self.wfile.write(data)

    # ── GET ───────────────────────────────────────────────────────
    def do_GET(self):
        path = self.path.split("?")[0].rstrip("/") or "/"

        # Debug
        # print(f"  [DEBUG] GET {self.path} → path='{path}'", flush=True)

        # ── Index / Haupt-App ────────────────────────────────────
        if path == "/":
            html = (SCRIPT_DIR / "index.html").read_text(encoding="utf-8")
            self._send_html(html)
            return

        # ── Manifest ─────────────────────────────────────────────
        if path == "/manifest.json":
            self._send_file(SCRIPT_DIR / "manifest.json")
            return

        # ── Service Worker ───────────────────────────────────────
        if path == "/service-worker.js":
            self._send_file(SCRIPT_DIR / "service-worker.js")
            return

        # ── Icons (PWA) ──────────────────────────────────────────
        for icon in ("icon-192.png", "icon-512.png"):
            if path == f"/{icon}":
                icon_path = SCRIPT_DIR / icon
                if icon_path.exists():
                    self._send_file(icon_path)
                else:
                    self._send_placeholder_icon(icon)
                return

        # ── Statische Dateien aus Root ───────────────────────────
        relative = path.lstrip("/")
        file_path = SCRIPT_DIR / relative
        # Sicherheit: kein Path-Traversal
        try:
            resolved = file_path.resolve()
            if resolved.is_file() and str(resolved).startswith(str(SCRIPT_DIR.resolve())):
                self._send_file(resolved)
                return
        except Exception:
            pass

        self._send_error(404, f"Nicht gefunden: {self.path}")

    def _send_placeholder_icon(self, filename):
        """Generiert ein einfaches 1x1 PNG als Platzhalter."""
        png_data = bytes([
            0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
            0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
            0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
            0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
            0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41,
            0x54, 0x08, 0xD7, 0x63, 0xF8, 0x0F, 0x00, 0x00,
            0x01, 0x01, 0x01, 0x00, 0x18, 0xDD, 0x8D, 0xB4,
            0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44,
            0xAE, 0x42, 0x60, 0x82,
        ])
        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "image/png")
        self.send_header("Content-Length", str(len(png_data)))
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Connection", "close")
        self.end_headers()
        self.wfile.write(png_data)

    # ── POST (Kamera-API) ─────────────────────────────────────────
    def do_POST(self):
        if self.path == "/api/capture":
            self._handle_capture()
        else:
            self._send_error(404, "Nicht gefunden")

    def _handle_capture(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length)
            data = json.loads(body)

            data_url = data.get("data", "")
            if data_url.startswith("data:"):
                data_url = data_url.split(",", 1)[1]

            image_bytes = base64.b64decode(data_url)

            upload_dir = SCRIPT_DIR / "uploads"
            upload_dir.mkdir(exist_ok=True)

            filename = f"capture_{int(time.time())}.jpg"
            filepath = upload_dir / filename
            filepath.write_bytes(image_bytes)

            self._send_json(200, {
                "ok": True,
                "filename": filename,
                "size": len(image_bytes),
            })
        except Exception as e:
            self._send_json(500, {"ok": False, "error": str(e)})

    # ── OPTIONS (CORS preflight) ──────────────────────────────────
    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.send_header("Connection", "close")
        self.end_headers()


# Threaded Server für parallele Anfragen
class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def generate_cert_if_missing():
    """Erstellt self-signed Zertifikat falls nicht vorhanden."""
    if CERT_FILE.exists() and KEY_FILE.exists():
        return

    print("⚠️  Zertifikat nicht gefunden — erstelle self-signed …", flush=True)
    import subprocess
    subprocess.run([
        "openssl", "req", "-x509", "-newkey", "rsa:4096",
        "-keyout", str(KEY_FILE), "-out", str(CERT_FILE),
        "-days", "365", "-nodes",
        "-subj", "/CN=localhost/O=KitchenVorrat"
    ], check=True)
    print(f"  ✅ Zertifikat erstellt: {CERT_FILE}", flush=True)


def main():
    generate_cert_if_missing()

    if not CERT_FILE.exists() or not KEY_FILE.exists():
        print("❌ Zertifikat fehlt. Bitte openssl von Hand ausführen.")
        sys.exit(1)

    # Threaded Server
    server = ThreadedHTTPServer(("0.0.0.0", PORT), KitchenHandler)
    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ctx.load_cert_chain(certfile=str(CERT_FILE), keyfile=str(KEY_FILE))
    ctx.minimum_version = ssl.TLSVersion.TLSv1_2
    server.socket = ctx.wrap_socket(server.socket, server_side=True)

    print()
    print("╔══════════════════════════════════════════╗")
    print("║    🟢 Kitchen Vorrat — HTTPS Server      ║")
    print("╠══════════════════════════════════════════╣")
    print(f"║  🔗  https://localhost:{PORT}              ║")
    print(f"║  🔒  Self-signed (localhost)             ║")
    print(f"║  📁  App:   index.html                   ║")
    print(f"║  📁  PWA:   manifest.json, SW            ║")
    print(f"║  📁  API:   /api/capture (POST)          ║")
    print(f"║  📁  Upload: uploads/                    ║")
    print("╚══════════════════════════════════════════╝")
    print()
    print("  ⚠️  Safari: 'Dieser Verbindung nicht vertrauen' klicken")
    print("  ⌨️  Ctrl+C zum Stoppen")
    print()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server gestoppt.", flush=True)
        server.server_close()


if __name__ == "__main__":
    main()
