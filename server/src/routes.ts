import express from 'express';

import UsersController from './controllers/UsersController'

const routes = express.Router();

routes.post('/register', UsersController.create)
routes.post('/login', UsersController.login)

routes.get('/wallet', UsersController.getWallet)


export default routes