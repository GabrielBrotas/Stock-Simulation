import express from 'express';
import bodyParser from 'body-parser'

import './database/connection'
import routes from './routes'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes)

app.listen(8080, () => {
    console.log('listening on port 8080')
})