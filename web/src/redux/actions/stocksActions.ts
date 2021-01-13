import api from "../../services/api"
import { GET_WALLET, SET_ERROR } from "../types"

export const getUserWallet = (userId: string) => (dispatch: Function) => {
    api.get(`/wallet/${userId}`)
        .then( res => {
            dispatch({type: GET_WALLET, payload: res.data})
        })
        .catch( err => {
            dispatch({type: SET_ERROR, payload: err.data})
        })
}