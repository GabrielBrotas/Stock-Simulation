import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { StateProps } from "../../redux/store"
import { buyStock } from "../../redux/actions/stocksActions"

import AppHeader from "../../components/AppHeader"
import Aside from "../../components/Aside"
import './styles.css'

function Buy() {
    
    const dispatch = useDispatch();
    const {push} = useHistory();

    const {credentials: {id}} = useSelector( (state: StateProps) => state.user)
    const {error} = useSelector( (state: StateProps) => state.stocks)

    const [stockSymbol, setStockSymbol] = useState('')
    const [amount, setAmount] = useState('')

    function handleBuyStock() {
        const data = {stockSymbol, amount, userId: id}

        dispatch(buyStock(data, id, push));
    }

    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Comprar" />
                    
                    <fieldset className="buy-container">
                        <label>Código da Ação</label>
                        <input
                         type="text"
                         value={stockSymbol}
                         onChange={ e => setStockSymbol(e.target.value)}
                        />
                        
                        <label>Quantidade</label>
                        <input
                         type="text"
                         value={amount}
                         onChange={ e => setAmount(e.target.value)}
                        />

                        {error.error && <span className="error">{error.error}</span>}

                        <button onClick={handleBuyStock}>
                            Comprar
                        </button>
                    </fieldset>

                </div>       
                
            </main>
        </div>
    )
}

export default Buy