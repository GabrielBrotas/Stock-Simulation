import express from 'express';

import StocksController from './controllers/StocksController';
import UsersController from './controllers/UsersController';

const routes = express.Router();

routes.post('/register', UsersController.create)
routes.post('/login', UsersController.login)

routes.get('/wallet/:user_id', UsersController.getTransactions)

routes.get('/stock', StocksController.quote)

export default routes