import express from 'express';

import './database/connection'

const app = express();

app.get('/', (req, res) => {
    return res.send("yo")
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})