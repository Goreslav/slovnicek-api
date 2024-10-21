const express = require('express');
const app = express();
const PORT = 3333;

app.get('/', (req, res) => {
    res.send('success');
});

app.listen(PORT, () => {
    console.log(`Server runs on ${PORT}`);
});
