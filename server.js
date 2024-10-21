const express = require('express');
const app = express();
const PORT = 3333;
const db = require('./db');
app.use(express.json());

app.post('/slovicka', (req, res) => {
    const { slovo, preklad } = req.body;

    if (!slovo || !preklad) {
        return res.status(400).send('Chýba slovo alebo preklad');
    }

    const query = 'INSERT INTO slovicka (slovo, preklad) VALUES (?, ?)';
    db.run(query, [slovo, preklad], function(err) {
        if (err) {
            return res.status(500).send('Chyba pri ukladaní do databázy');
        }
        res.status(201).send({ id: this.lastID });
    });
});

// Endpoint na získanie všetkých slov
app.get('/slovicka', (req, res) => {
    db.all('SELECT * FROM slovicka ORDER BY id ASC', [], (err, rows) => {
        if (err) {
            return res.status(500).send('Chyba pri načítaní z databázy');
        }
        res.status(200).json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server beží na porte ${PORT}`);
});
