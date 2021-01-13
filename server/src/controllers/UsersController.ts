import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import User from '../models/User'
import { validateEmail } from '../utils/helpers'

export default {
    
    async login(req: Request, res: Response) {
        const {email, password} = req.body
        const userData = {email,password}

        const usersRepository = getRepository(User)

        // schema
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required(),
        })
        // validate schema
        await schema.validate(userData, { 
            abortEarly: false
        })

        const user = await usersRepository.findOne({email})

        if(user) {

            bcrypt.compare(userData.password, user.password, (err, match) => {
                if(match) {
                    return res.status(200).json({
                        user: {
                            id: user.id,
                            email: user.email,
                            cash: user.cash.toFixed(2)
                        },
                        token: user.generateToken()
                    })
                } else {
                    return res.status(400).send({password: "Senha inválida"})
                }
            } )

        } else {
            return res.status(404).send({email: "user not found"})
        }
        
    },

    async create(req: Request, res: Response) {
        const {email, password, confirmPassword} = req.body
        const userData = {
            email, 
            password, 
            passwordResetToken: "",
            passwordResetTokenExpires: "",
            cash: 10000
        }

        // get users
        const usersRepository = getRepository(User)
        const users = await usersRepository.find();

        // * validations
        // schema
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required(),
        })
        // validate schema
        await schema.validate(userData, { 
            abortEarly: false
        })

        // check if is email
        const isEmail = validateEmail(email)
        if(!isEmail) {
            return res.status(400).send({email: "* Email inválido"})
        }

        // check if email exists
        let emailAlreadyExists = false;
        users.forEach( user => {
            if(user.email === userData.email) {
                emailAlreadyExists = true;
            }
        })

        if(emailAlreadyExists) return res.status(400).send({email: "* Este email já está sendo utilizado"})
        
        // check if passwords matches
        if(userData.password !== confirmPassword) return res.status(400).send({password: "* As senhas estão divergentes"})

        // check is password is small
        const userPassword:string = userData.password
        if(userPassword.length <= 5 ) {
            return res.status(400).send({password: "Senha muito fraca"})
        }

        // * create user
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(userData.password, salt)

        userData.password = hash

        const user = usersRepository.create(userData)
        await usersRepository.save(user)
        return res.status(200).send("Usuario criado com sucesso!")

    },
}