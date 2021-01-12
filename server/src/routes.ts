import express from 'express';

import StocksController from './controllers/StocksController';
import UsersController from './controllers/UsersController';

const routes = express.Router();

routes.post('/register', UsersController.create)
routes.post('/login', UsersController.login)

routes.get('/transactions/:user_id', StocksController.getTransactions)
routes.get('/quote/:symbol', StocksController.quote)
routes.post('/buy', StocksController.buy)
routes.post('/sell', StocksController.sell)
routes.get('/wallet/:user_id', StocksController.wallet)

export default routes