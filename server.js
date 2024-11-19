const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8083;

// Path to the single file (files.zip)
const FILE_NAME = 'files.zip';
const FILES_DIR = path.join(__dirname, 'public');
const FILE_PATH = path.join(FILES_DIR, FILE_NAME);

// Middleware: Ensure the directory and file exist
if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR, { recursive: true });
    console.log(`Das Verzeichnis "${FILES_DIR}" wurde erstellt.`);
}

if (!fs.existsSync(FILE_PATH)) {
    console.error(`Die Datei "${FILE_NAME}" existiert nicht im Verzeichnis "${FILES_DIR}".`);
    process.exit(1); // Exit the application if the file is missing
}

// Endpoint: Always send the files.zip file
app.get('/api/files', (req, res) => {
    res.download(FILE_PATH, FILE_NAME, (err) => {
        if (err) {
            console.error(`Fehler beim Senden der Datei: ${err.message}`);
            res.status(500).json({ error: 'Fehler beim Abrufen der Datei.' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`);
});
