import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AppHeader from "../../components/AppHeader"

import Aside from "../../components/Aside"
import { getUserWallet } from "../../redux/actions/stocksActions"
import { StateProps } from "../../redux/store"
import './styles.css'

function Sell() {

    const dispatch = useDispatch();

    const {credentials: {id}} = useSelector( (state: StateProps) => state.user) 
    const {wallet} = useSelector( (state: StateProps) => state.stocks) 

    useEffect( () => {
        dispatch(getUserWallet(id))
    }, [dispatch, id])
    
    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Vender" />

                    <fieldset className="sell-container">
                        <label>Código da Ação</label>

                        <select>
                            {wallet.map( stock => (
                                <option key={stock.id} value={stock.stockSymbol}>{stock.stockSymbol}</option>
                            ))}
                        </select>
                        
                        <label>Quantidade</label>
                        <input type="text" />

                        <button>
                            Vender
                        </button>
                    </fieldset>
                </div>       
            </main>
        </div>
    )
}

export default Sell