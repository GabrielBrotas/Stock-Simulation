import { CLEAR_STOCK_ERROR, GET_STOCK, GET_WALLET, SET_STOCK_ERROR } from "../types";

const initialState = {
    stock: {},
    wallet: [],
    transactions: [],
    error: {}
}

interface ActionProps {
    type: string;
    payload: Object;
}

export default function userReducer(state = initialState, action: ActionProps) {

    switch(action.type) {
        
        case GET_WALLET:
            return {...state, wallet: action.payload};

        case GET_STOCK:
            return {...state, stock: action.payload}

        case SET_STOCK_ERROR:
            return {...state, error: action.payload};
        case CLEAR_STOCK_ERROR:
            return {...state, error: {}};
        
        default:
            return state
    }

}