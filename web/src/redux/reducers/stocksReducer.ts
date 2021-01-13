import { CLEAR_ERROR, GET_WALLET, SET_ERROR } from "../types";

const initialState = {
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

        case SET_ERROR:
            return {...state, error: action.payload};
        case CLEAR_ERROR:
            return {...state, error: ''};
        
        default:
            return state
    }

}