const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3333;
const db = require('./db');
app.use(express.json());
app.use(cors());
app.post('/create-entry', (req, res) => {
    const { word, translation, description } = req.body;

    if (!word || !translation || !description) {
        return res.status(400).send( 'something is missing ');
    }

    const query = 'INSERT INTO slovicka (word, translation,description) VALUES (?, ?, ?)';
    db.run(query, [word, translation,description], function(err) {
        if (err) {
            return res.status(500).send('failed to seve data');
        }
        res.status(201).send({ id: this.lastID });
    });
});

app.get('/get-words', (req, res) => {
    db.all('SELECT * FROM slovicka ORDER BY id ASC', [], (err, rows) => {
        if (err) {
            return res.status(500).send('failed to load data');
        }
        res.status(200).json(rows);
    });
});

app.delete('/delete-word/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM slovicka WHERE id = ?';

    db.run(query, id, function(err) {
        if (err) {
            return res.status(500).send('Failed to delete word');
        }
        res.status(200).send({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});
