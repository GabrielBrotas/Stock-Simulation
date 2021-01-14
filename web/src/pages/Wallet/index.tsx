import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StateProps } from "../../redux/store"
import { getUserWallet } from "../../redux/actions/stocksActions"

import AppHeader from "../../components/AppHeader"
import Aside from "../../components/Aside"

import './styles.css'

function Wallet() {

    const dispatch = useDispatch();
    
    const {credentials} = useSelector( (state: StateProps) => state.user);
    const {wallet} = useSelector( (state: StateProps) => state.stocks);
    console.log(wallet)

    useEffect(() => {
        dispatch(getUserWallet(credentials.id))
    }, [credentials.id, dispatch])

    if(!credentials.email) {
        return <p>loading...</p>
    }
    
    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Carteira" />

                    <table>
                        <thead>
                            <tr>
                                <td>Código</td>
                                <td>Nome</td>
                                <td>Quantidade</td>
                                <td>Preço</td>
                                <td>Total</td>
                            </tr>
                        </thead>

                        <tbody>
                            {wallet.map( stock => (
                            <tr key={stock.id}>
                                <td>{stock.stockSymbol}</td>
                                <td>{stock.stockSymbol}</td>
                                <td>{stock.amount}</td>
                                <td>346,00</td>
                                <td>34.600,00</td>
                            </tr>
                            ))}
                            
                        </tbody>
                        
                        <tfoot>
                            <tr className="money-left">
                                <td>
                                    Dinheiro
                                </td>
                                <td>
                                    U$ {credentials.cash}
                                </td>
                            </tr>
                            
                            <tr className="total-money">
                                <td>
                                    R$100.000
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>                
            </main>
        </div>
    )
}

export default Wallet