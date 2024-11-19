const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8083;

// Verzeichnis, in dem die Dateien gespeichert sind
const FILES_DIR = path.join(__dirname, 'public');

// Middleware: Sicherstellen, dass das Verzeichnis existiert
if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR, { recursive: true });
    console.log(`Das Verzeichnis "${FILES_DIR}" wurde erstellt.`);
}

// Endpoint: Gibt die Liste aller Dateien im Verzeichnis zxurück
app.get('/api/files', (req, res) => {
    fs.readdir(FILES_DIR, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Fehler beim Abrufen der Dateien.' });
        }
        res.json({ files });
    });
});

// Startet den Server
app.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`);
});
