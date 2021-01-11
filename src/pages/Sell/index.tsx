import React from "react"
import AppHeader from "../../components/AppHeader"

import Aside from "../../components/Aside"
import './styles.css'

function Sell() {
    
    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Vender" />

                    <fieldset className="sell-container">
                        <label>Código da Ação</label>

                        <select>
                            <option value="TSLA34">TSLA34</option>
                            <option value="TSLA34">TSLA34</option>
                            <option value="TSLA34">TSLA34</option>
                            <option value="TSLA34">TSLA34</option>
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