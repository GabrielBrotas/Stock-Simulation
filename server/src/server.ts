import express from 'express';

import './database/connection'
import routes from './routes'

const app = express();

app.use(routes)

app.listen(8080, () => {
    console.log('listening on port 8080')
})