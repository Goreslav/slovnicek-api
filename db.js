const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'slovnicek.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Chyba pri pripojení k databáze:', err);
    } else {
        console.log('Pripojený k SQLite databáze.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS slovicka (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL,
        translation TEXT NOT NULL,
        description TEXT NOT NULL
    )`);
});

module.exports = db;
