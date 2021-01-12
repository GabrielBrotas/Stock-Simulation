import {Request, Response} from 'express'

export default {
    
    async create(req: Request, res: Response) {

        const {name, email, password, confirmPassword} = req.body

        return res.send('you')
    }
}