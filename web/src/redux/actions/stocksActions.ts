import api from "../../services/api"
import { CLEAR_STOCK_ERROR, GET_STOCK, GET_WALLET, SET_STOCK_ERROR } from "../types"

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
        .catch( res => {
            dispatch({type: SET_STOCK_ERROR, payload: res.response.data})
        })
    }
    
}