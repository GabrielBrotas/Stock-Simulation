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
                            <tr>
                                <td>TSLA34</td>
                                <td>Tesla </td>
                                <td>10</td>
                                <td>346,00</td>
                                <td>34600,00</td>
                            </tr>
                        </tbody>
                        
                        <tfoot>
                            <tr className="money-left">
                                <td>
                                    Dinheiro
                                </td>
                                <td>
                                    R$100.000
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