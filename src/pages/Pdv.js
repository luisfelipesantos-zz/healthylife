import React, { Component } from 'react';
import { MdSearch, MdClose, MdPerson, MdAccessTime, MdToday, MdMonetizationOn } from "react-icons/md";
import '../style/pdv.css';
import logo from '../images/logo.png'

class Pdv extends Component {


    componentDidMount() {
        this.getHour();

    }

    constructor() {
        super();

        this.state = {
            hour: `${new Date().getHours()}:${new Date().getMinutes()}`
        }

        this.getHour = this.getHour.bind(this);
    }

    currentDate() {
        const date = new Date();
        return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    }

    getHour() {
        setInterval(() => {
            const now = new Date();

            this.setState({
                hour: `${now.getHours()}:${now.getMinutes()}`
            });
        }, 60000);

    }

    render() {
        return (
            <>
                <header>
                    <img className='logo' alt='logo' src={logo} />
                    <button className='pdvButton' onClick='#'><MdClose className='pdvIcons' />Fechar movimento</button>
                    <button className='pdvButton' onClick='#'><MdSearch className='pdvIcons' />Pesquisar Produtos</button>
                </header>

                <div className='main'>
                    <aside className='leftAside'>
                        <div className='productDiv'>
                            <p className='prodInputLabel'>Produto: </p>
                            <input type='text' id='pdvProduto' />
                        </div>
                        <div className='detailsPurchase'>
                            <div class='detailsDiv'>
                                <p className='inputLabel'>Código:</p>
                                <input type='text' id='pdvCodigo' />
                            </div>

                            <div class='detailsDiv'>
                                <p className='inputLabel'>Quantidade:</p>
                                <input type='text' id='pdvQuantidade' />
                            </div>

                            <div class='detailsDiv'>
                                <p className='inputLabel'>Val. Unit. (R$):</p>
                                <input type='text' id='pdvValorUnit' />
                            </div>

                            <div class='detailsDiv'>
                                <p className='inputLabel'>Total (R$):</p>
                                <input type='text' id='pdvTotal' />
                            </div>
                        </div>
                        <div className='itemsList'>
                            <div className='tableBox'>
                                <table className='pdvTable'>
                                    <tbody>
                                        <tr>
                                            <th>Cód</th>
                                            <th>Nome</th>
                                            <th>Qt.</th>
                                            <th>Val. Unit.</th>
                                            <th>Total</th>
                                        </tr>

                                        <tr>
                                            <td>00</td>
                                            <td>Lorem Ipsum</td>
                                            <td>00</td>
                                            <td>R$000,00</td>
                                            <td>R$000,00</td>
                                        </tr>

                                        <tr>
                                            <td>00</td>
                                            <td>Lorem Ipsum</td>
                                            <td>00</td>
                                            <td>R$000,00</td>
                                            <td>R$000,00</td>
                                        </tr>
                                        <tr>
                                            <td>00</td>
                                            <td>Lorem Ipsum</td>
                                            <td>00</td>
                                            <td>R$000,00</td>
                                            <td>R$000,00</td>
                                        </tr>
                                        <tr>
                                            <td>00</td>
                                            <td>Lorem Ipsum</td>
                                            <td>00</td>
                                            <td>R$000,00</td>
                                            <td>R$000,00</td>
                                        </tr>
                                        <tr>
                                            <td>00</td>
                                            <td>Lorem Ipsum</td>
                                            <td>00</td>
                                            <td>R$000,00</td>
                                            <td>R$000,00</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </aside>
                    <aside className='rightAside'>
                        <h3 id='righttitle'>Total a Pagar</h3>
                        <input type='text' id='pdvTotalPagar' />
                        <button className='receberButton'><MdMonetizationOn className='footerIcons' />Receber</button>
                        <button className='cancelarButton'><MdClose className='footerIcons' />Cancelar Venda</button>
                    </aside>
                </div>

                <footer>
                    <div className='footerDiv'><p>LOJA VIDA SAUDAVEL PRODUTOS NATURAIS</p></div>
                    <div className='footerDiv'><MdPerson className='footerIcons' /> João Lucas</div>
                    <div className='footerDiv'><MdAccessTime className='footerIcons' />{this.state.hour}</div>
                    <div className='footerDiv'><MdToday className='footerIcons' />{this.currentDate()}</div>
                </footer>
            </>
        );
    };
}

export default Pdv;