import express from 'express';

import UsersController from './controllers/UsersController'

const routes = express.Router();

routes.post('/register', UsersController.create)


export default routes