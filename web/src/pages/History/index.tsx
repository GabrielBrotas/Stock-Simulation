import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StateProps } from "../../redux/store"
import { getTransactions } from "../../redux/actions/stocksActions"

import AppHeader from "../../components/AppHeader"
import Aside from "../../components/Aside"

function History() {

    const dispatch = useDispatch();

    const {credentials} = useSelector( (state: StateProps) => state.user);
    const {transactions} = useSelector( (state: StateProps) => state.stocks);
    console.log(transactions);

    useEffect( () => {
        dispatch(getTransactions(credentials.id))
    }, [credentials.id, dispatch]);
    
    function transformTimestampInDate(timestamp: number) {
        let unix_timestamp = 1549312452
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000)
        
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();

        var month = date.getMonth();
        var day = date.getUTCDay();
        var year = date.getFullYear();

        // Will display time in 10:30:23 format
        var formattedTime = `${day}/${month}/${year} - ${hours}:${minutes.substr(-2)}`

        return formattedTime
    }

    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Histórico" />
                    <table>
                        <thead>
                            <tr>
                                <td>Código</td>
                                <td>Nome</td>
                                <td>Quantidade</td>
                                <td>Preço</td>
                                <td>Total</td>
                                <td>Data</td>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map( transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.stockSymbol}</td>
                                <td>{transaction.stockName}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.price}</td>
                                <td>{(transaction.price * transaction.amount).toFixed(2)}</td>
                                <td>{transformTimestampInDate(transaction.transacted)}</td>
                            </tr>
                            ))}
                        </tbody>
                        
                    </table>
                </div>       
            </main>
        </div>
    )
}

export default History