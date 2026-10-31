#!/usr/bin/env python3
"""KüchenVorrat — Lokaler HTTP-Server auf Port 8080"""

import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        pass  # Suppress console output

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🍽 KüchenVorrat läuft auf http://localhost:{PORT}")
    print(f"📂 Verzeichnis: {DIRECTORY}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server gestoppt.")
        httpd.server_close()
