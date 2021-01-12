import {Request, Response} from 'express'
import { getRepository } from 'typeorm'

import User from '../models/User'
import Transaction from '../models/Transaction'

import api from '../service/api'

interface StockProps {
    name: string;
    price: number;
}

interface TransactionProps {
    stockSymbol: string;
    stockName: string;
    amount: string;
}

async function getStock(symbol: string) {
    
    try {
        const stockOptions = await api.get('/', {
            params: {
                symbol,
                region: "US"
            },
            headers: {
            'x-rapidapi-key': '06825af78bmshaf9d2305bd04cd7p152184jsn5fe51244ca01',
            'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
        })
    
        const stockFormated = {
            name: stockOptions.data.price.shortName,
            price: stockOptions.data.price.regularMarketPrice.raw,
        }
        return stockFormated    

    } catch(error) {
        return {
            name: '',
            price: 0,
        }
    }
    
}

export default {
    async quote(req: Request, res: Response) {
        const {symbol} = req.params

        const stock = await getStock(symbol)
        if(stock.name === "" && stock.price === 0 ) return res.status(404).json({error: "Ação não encontrada"})

        return res.status(200).json(stock)
    },

    async buy(req: Request, res: Response) {
        const {stockSymbol, amount, userId} = req.body

        // get repositories
        const usersRepository = getRepository(User)
        const transactionsRepository = getRepository(Transaction)

        // get user and stock data
        const user = await usersRepository.findOne({id: userId})
        const stock: StockProps = await getStock(stockSymbol)        
        
        if((stock.name === "" || stock.name === null) && (stock.price === 0 || stock.price === undefined) ) return res.status(404).json({error: "Ação não encontrada"})
       
        try { 
            if(user) {
                if(user.cash <= stock.price * amount ) {
                    return res.json({money: "Você não tem dinheiro para comprar essa quantidade"})
                } else {
                    console.log(stock)
                    await usersRepository.update({id: user.id}, {cash: user.cash - stock.price * amount})
                    const transactionData = {
                        stockSymbol, 
                        stockName: stock.name,
                        amount,
                        userId: user.id
                    }    

                    const newTransaction = transactionsRepository.create(transactionData)
                    await transactionsRepository.save(newTransaction)

                    return res.status(200).send("Comprado com sucesso !")
                }
            } else {
                return res.status(404).send("Usuario não encontrado")
            }
        } catch (error) {
            return res.send(error)
        }

    },

    async wallet(req: Request, res: Response) {
        const {id} = req.params
        
        const usersRepository = getRepository(User)
        const transactionsRepository = getRepository(Transaction)
        const user = await usersRepository.findOne(id)

        try {
            const transactions = await transactionsRepository.find({
                relations: ['userId'],
                where: {userId: user},
            })

            const userTransactions: Array<TransactionProps> = []
            let stockAlreadyInTransaction: boolean = false;

            transactions.forEach( transaction => {

                userTransactions.forEach( userTransaction => {
                    if(transaction.stockSymbol === userTransaction.stockSymbol) {
                        userTransaction.amount = transaction.amount + userTransaction.amount;
                        stockAlreadyInTransaction = true;
                    }
                })

                if(!stockAlreadyInTransaction) {
                    userTransactions.push({
                        stockSymbol: transaction.stockSymbol,
                        stockName: transaction.stockName,
                        amount: transaction.amount,
                    })
                }
                stockAlreadyInTransaction = false;
            })

            return res.json(userTransactions)
        } catch (error) {
            return res.json(error)
        }
 
    }
}