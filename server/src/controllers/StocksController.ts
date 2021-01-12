import {Request, Response} from 'express'
import api from '../service/api'

export default {
    quote(req: Request, res: Response) {
        const {symbol} = req.params

        api.get('/', {
            params: {
                symbol,
                region: "US"
            },
            headers: {
            'x-rapidapi-key': '06825af78bmshaf9d2305bd04cd7p152184jsn5fe51244ca01',
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
        }).then( result => {
            const stock = {
                name: result.data.price.shortName,
                price: `U$ ${result.data.price.regularMarketPrice.raw}`
            }
            return res.status(200).json(stock)
        })
    },

    async buy(req: Request, res: Response) {
        
    },

    async sell(req: Request, res: Response) {
    }
}