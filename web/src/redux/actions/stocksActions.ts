import api from "../../services/api"
import { CLEAR_STOCK_ERROR, GET_STOCK, GET_TRANSACTIONS, GET_WALLET, SET_STOCK_ERROR } from "../types"

export const getUserWallet = (userId: string) => (dispatch: Function) => {
    api.get(`/wallet/${userId}`)
        .then( res => {
            dispatch({type: CLEAR_STOCK_ERROR})
            dispatch({type: GET_WALLET, payload: res.data})
        })
        .catch( err => {
            dispatch({type: CLEAR_STOCK_ERROR, payload: err.data})
        })
}

export const getStock = (stockSymbol: string) => (dispatch: Function) => {

    if(stockSymbol.trim() === "" || stockSymbol === null) {
        dispatch({type: SET_STOCK_ERROR, payload: {error: "* Campo vazio"}})
    } else {
        dispatch({type: CLEAR_STOCK_ERROR})
        api.get(`/quote/${stockSymbol}`)
        .then( res => {
            dispatch({type: CLEAR_STOCK_ERROR})
            dispatch({type: GET_STOCK, payload: res.data})
        })
        .catch( err => {
            dispatch({type: SET_STOCK_ERROR, payload: err.response.data})
        })
    }
    
}

export const buyStock = (data: Object, userId: string, push: Function) => (dispatch: Function) => {
    api.post('/buy', data)
        .then( () => {
            dispatch({type: CLEAR_STOCK_ERROR})
            alert("Ação comprada com sucesso!")
            dispatch(getUserWallet(userId))
            push('/wallet')
        })
        .catch( err => {
            dispatch({type: SET_STOCK_ERROR, payload: err.response.data})
        })
}

export const getTransactions = (userId: string) => (dispatch: Function) => {

    api.get(`/transactions/${userId}`)
        .then( res => {
            dispatch({type: GET_TRANSACTIONS, payload: res.data})
        })
        .catch( err => console.log(err))
}