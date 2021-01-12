import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import usersReducer from './reducers/usersReducer'
import stocksReducer from './reducers/stocksReducer'

const middleware = [thunk]

const initialState = {}

export interface stateProps {
    user: {
        credentials: {
            id: string,
            email: string,
            cash: string,   
        },
        authenticated: boolean,
        error: string
    },
    stocks: {
        wallet: Array<{
            stockSymbol: string;
            stockName: string;
            amount: string;
        }>,
        transactions: Array<{
            stockSymbol: string;
            stockName: string;
            amount: string;
        }> 
    }
}

const reducers = combineReducers({
    user: usersReducer,
    wallet: stocksReducer,
})

const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
)

export default store