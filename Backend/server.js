const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())


const port = 8000;

app.get('/', (req,res) => {
    res.json('...')
})

app.listen(port, () => {console.log(`http://localhost:${port}`)});