import {Request, Response} from 'express'
import api from '../service/api'

export default {
    quote(req: Request, res: Response) {
        
        api.get('/', {
            params: {
                symbol: "AAPL",
                region: "BR"
            },
            headers: {
            'x-rapidapi-key': '06825af78bmshaf9d2305bd04cd7p152184jsn5fe51244ca01',
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
        }).then( result => {
            return res.status(200).json(result.data.price)
        }).catch( err => {
            console.log(err)
        })
    },

    async buy(req: Request, res: Response) {
    },

    async sell(req: Request, res: Response) {
    }
}