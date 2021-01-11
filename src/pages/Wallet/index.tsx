import React from "react"

import AppHeader from "../../components/AppHeader"
import Aside from "../../components/Aside"

import './styles.css'

function Wallet() {
    
    return (
        <div id="app-container">
            
            <Aside />

            <main>
                <div className="app-main-wrapper">
                    <AppHeader title="Carteira" />

                </div>                
            </main>
        </div>
    )
}

export default Wallet