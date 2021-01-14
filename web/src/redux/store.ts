import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import usersReducer from './reducers/usersReducer'
import stocksReducer from './reducers/stocksReducer'

const middleware = [thunk]

const initialState = {}

export interface StateProps {
    user: {
        credentials: {
            id: string,
            email: string,
            cash: string,   
        },
        authenticated: boolean,
        error: {
            email: string,
            password: string,
        }
    },
    stocks: {
        stock: {
            name: string;
            price: number;
        };
        wallet: Array<{
            stockSymbol: string;
            stockName: string;
            amount: string;
            id: number;
        }>,
        transactions: Array<{
            id: number;
            stockSymbol: string;
            stockName: string;
            amount: number;
            price: number;
            transacted: number;
        }>,
        error: {
            error: string
        } 
    }
}

const reducers = combineReducers({
    user: usersReducer,
    stocks: stocksReducer,
})

const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
)

export default store