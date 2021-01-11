import React from "react"
import AppHeader from "../../components/AppHeader"

import Aside from "../../components/Aside"

function Sell() {
    
    return (
        <div id="app-container">
            
            <Aside />

            <main>
            <div className="app-main-wrapper">
                    <AppHeader title="Vender" />
                </div>       
            </main>
        </div>
    )
}

export default Sell