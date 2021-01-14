import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserWallet, sellStock } from "../../redux/actions/stocksActions"
import { StateProps } from "../../redux/store"

import AppHeader from "../../components/AppHeader"
import Aside from "../../components/Aside"

import './styles.css'
import { useHistory } from "react-router-dom"

function Sell() {

    const dispatch = useDispatch();
    const {push} = useHistory();

    const {credentials: {id}} = useSelector( (state: StateProps) => state.user); 
    const {wallet, error} = useSelector( (state: StateProps) => state.stocks) ;

    const [stockSymbol, setStockSymbol] = useState(wallet[0].stockSymbol);
    const [amount, setAmount] = useState('');

    useEffect( () => {
        dispatch(getUserWallet(id))
    }, [dispatch, id])

    function handleSellStock() {
        const data ={stockSymbol, amount, userId: id}
        dispatch(sellStock(data, id, push))
    }
    
    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Vender" />

                    <fieldset className="sell-container">
                        <label>Código da Ação</label>

                        <select onChange={e => setStockSymbol(e.target.value)}>
                            {wallet.map( stock => (
                                <option 
                                    key={stock.id} 
                                    value={stock.stockSymbol}
                                >
                                    {stock.stockSymbol}
                                </option>
                            ))}
                        </select>
                        
                        <label>Quantidade</label>
                        <input 
                           type="number"
                           value={amount}
                           min={1}
                           step={1}
                           onChange={ e => setAmount(e.target.value)}
                        />
                        
                        {error.error && <span className="error">{error.error}</span>}

                        <button onClick={handleSellStock}>
                            Vender
                        </button>
                    </fieldset>
                </div>       
            </main>
        </div>
    )
}

export default Sell