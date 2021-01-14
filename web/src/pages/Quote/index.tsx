import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../redux/store";

import AppHeader from "../../components/AppHeader"
import Aside from "../../components/Aside"

import './styles.css'
import { getStock } from "../../redux/actions/stocksActions";

function Quote() {
    
    const dispatch = useDispatch();
    
    const {stock, error} = useSelector( (state: StateProps) => state.stocks)

    const [stockSymbol, setStockSymbol] = useState('');
    
    function handleQuoteStock() {
        dispatch(getStock(stockSymbol))
    }

    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Cotação de Ações" />
                    
                    <fieldset className="quote-container">
                        <label>Código da Ação</label>

                        <input 
                         type="text"
                         value={stockSymbol.toUpperCase()}
                         onChange={ e => setStockSymbol(e.target.value)}
                        />

                        {error.error && <span className="error">{error.error}</span>}

                        {stock.name && !error.error &&  <span className="stock">Uma ação de {stock.name} vale U$ {stock.price}</span>}

                        <button onClick={handleQuoteStock}>
                            Cotar
                        </button>
                    </fieldset>

                </div>                       
            </main>
        </div>
    )
}

export default Quote