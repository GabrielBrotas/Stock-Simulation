import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import User from '../models/User'

export default {
    
    async create(req: Request, res: Response) {

        const {email, password, confirmPassword} = req.body
        const userData = {email, password}

        // get users
        const usersRepository = getRepository(User)
        const users = await usersRepository.find();

        // schema
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required(),
        })

        // check if email exists
        let emailAlreadyExists = false;
        users.forEach( user => {
            if(user.email === userData.email) {
                emailAlreadyExists = true;
            }
        })
        if(emailAlreadyExists) return res.status(400).send({email: "* Este email já está sendo utilizado"})
        
        // chech if passwords matches
        if(password !== confirmPassword) return res.status(400).send({password: "* As senhas estão divergentes"})
        
        // create user
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(userData.password, salt)

        userData.password = hash

        const user = usersRepository.create(userData)
        await usersRepository.save(user)
        return res.status(200).send("Usuario criado com sucesso!")

    }
}