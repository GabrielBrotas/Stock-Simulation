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
    id: number;
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

async function getWallet(transactions: Array<TransactionProps>) {
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
                id: transaction.id
            })
        }
        stockAlreadyInTransaction = false;
    })

    const transactionsFormated = userTransactions.filter( transaction => parseInt(transaction.amount) !== 0 && parseInt(transaction.amount) >= 0)

    return transactionsFormated;

}

export default {
    async quote(req: Request, res: Response) {
        const {symbol} = req.params

        if(symbol.trim() === "" || symbol === null) {
            return res.status(404).send({error: "* Campo vazio"})
        }

        const stock = await getStock(symbol)
        if(stock.name === "" && stock.price === 0 ) return res.status(404).send({error: "* Ação não encontrada"})

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
       
        // validation
        if((stock.name === "" || stock.name === null) && (stock.price === 0 || stock.price === undefined) ) return res.status(404).json({error: "* Ação não encontrada"})

        if(amount <= 0 || amount === null || amount === undefined) {
            return res.status(400).json({error: "* Quantidade inválida"})
        }

        try { 
            if(user) {
                if(user.cash <= stock.price * amount ) {
                    return res.json({error: "* Você não tem dinheiro para comprar essa quantidade"})
                } else {
                    await usersRepository.update({id: user.id}, {cash: user.cash - stock.price * amount})
                    const transactionData = {
                        stockSymbol: stockSymbol.toUpperCase(), 
                        stockName: stock.name,
                        amount,
                        price: stock.price,
                        userId: user.id,
                        transacted: new Date().getTime()
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

    async sell(req: Request, res: Response) {
        const {stockSymbol, amount, userId} = req.body

        // get repositories
        const usersRepository = getRepository(User)
        const transactionsRepository = getRepository(Transaction)

        // get user and stock data
        const user = await usersRepository.findOne({id: userId})
        const stock: StockProps = await getStock(stockSymbol)        
        
        // check if symbol exists
        if((stock.name === "" || stock.name === null) && (stock.price === 0 || stock.price === undefined) ) return res.status(404).json({error: "* Ação não encontrada"})

        try { 

            // get user stocks
            const transactions = await transactionsRepository.find({
                relations: ['userId'],
                where: {userId: user},
            })
            const userTransactions = await getWallet(transactions)
            let userHasStock: boolean = false
            let walletAmount: number = 0

            // get stock
            userTransactions.forEach( transaction => {
                if(transaction.stockSymbol === stockSymbol.toUpperCase()) {
                    userHasStock = true;
                    walletAmount = parseInt(transaction.amount)
                }
            })

            // check if have stock and quantity
            if(!userHasStock) {
                return res.status(404).send("Você não possu esta ação")
            } else if (walletAmount < -amount) {
                return res.status(403).send("Você não possui essa quantidade")
            }

            if(user) {

                await usersRepository.update({id: user.id}, {cash: user.cash + stock.price * -amount})

                const transactionData = {
                    stockSymbol: stockSymbol.toUpperCase(), 
                    stockName: stock.name,
                    amount,
                    price: stock.price,
                    userId: user.id,
                    transacted: new Date().getTime()
                }    

                const newTransaction = transactionsRepository.create(transactionData)
                await transactionsRepository.save(newTransaction)

                return res.status(200).send("Vendido com sucesso !")

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

            const userTransactions = await getWallet(transactions)
    
            return res.json(userTransactions)

        } catch (error) {
            return res.json(error)
        }
 
    },

    async getTransactions(req: Request, res: Response) {
        const {id} = req.params
        
        const usersRepository = getRepository(User)
        const transactionsRepository = getRepository(Transaction)
        const user = await usersRepository.findOne(id)

        try {
            const transactions = await transactionsRepository.find({
                relations: ['userId'],
                where: {userId: user},
                order: {transacted: 'DESC'}
            })

            const userTransactions: Array<{}> = []

            transactions.forEach( transaction => {
                userTransactions.push({
                    id: transaction.id,
                    stockSymbol: transaction.stockSymbol,
                    stockName: transaction.stockName,
                    amount: transaction.amount,
                    price: transaction.price,
                    transcated: transaction.transacted,
                })
            })

            return res.json(userTransactions)
        } catch (error) {
            return res.json(error)
        }
    },
}