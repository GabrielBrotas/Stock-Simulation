import React from "react"
import AppHeader from "../../components/AppHeader"

import Aside from "../../components/Aside"

function History() {
    
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
                                <td>Operação</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>TSLA34</td>
                                <td>Tesla </td>
                                <td>10</td>
                                <td>346,00</td>
                                <td>34.600,00</td>
                                <td>Compra</td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>       
            </main>
        </div>
    )
}

export default History