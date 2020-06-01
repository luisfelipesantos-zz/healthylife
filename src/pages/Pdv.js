import React, { Component } from 'react';
import { MdSearch, MdClose, MdPerson, MdAccessTime, MdToday, MdMonetizationOn } from "react-icons/md";
import '../style/pdv.css';
import logo from '../images/logo.png'

class Pdv extends Component {
  componentDidMount() {
    this.getHour();
    this.currentDate();
  }

  constructor() {
    super();

    this.state = {
      prodCod: '',
      prodNome: '',
      prodPreco: '',
      prodSubtotal: '',
      prodQuantidade: '',
      prodTotal: 0,
      prodDesconto: 0,
      prodTotalDiscount: 0,
      produtos: [{
        "id": 1,
        "nome": "Desinchá Dia ",
        "preco": "25",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 2,
        "nome": "Desinchá Noite ",
        "preco": "25",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 3,
        "nome": "Chá Desinchá ",
        "preco": "25",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 4,
        "nome": "Cintura Fina Chá ",
        "preco": "25",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 5,
        "nome": "Super Chá Seca Barriga",
        "preco": "25",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 6,
        "nome": "Chá misto com 30 Ervas",
        "preco": "16",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 7,
        "nome": "Chá misto com 37 Ervas ",
        "preco": "16",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 8,
        "nome": "30 Ervas Premium",
        "preco": "30",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 9,
        "nome": "Chá Verde 125g",
        "preco": "16",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 10,
        "nome": "Chá da vida p/ Diabetes 100g",
        "preco": "16",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 11,
        "nome": "Flor de hibisco 100g ",
        "preco": "10",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 12,
        "nome": "Chá misto Fibras 150g ",
        "preco": "60",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 13,
        "nome": "Canela Inteira",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 14,
        "nome": "Sene ",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 15,
        "nome": "Canela de Velho 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 16,
        "nome": "Mulungu 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 17,
        "nome": "Passiflora 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 18,
        "nome": "Mangabeira 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 19,
        "nome": "Uxi Amarelo 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 20,
        "nome": "Espinhaira Santa 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 21,
        "nome": "Unha de gato 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 22,
        "nome": "Quebra pedra 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 23,
        "nome": "Alcachofra 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 24,
        "nome": "Composto p/ diabete 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 25,
        "nome": "Composto p/ Anemia 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 26,
        "nome": "Anis Estrelado 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 27,
        "nome": "Folha de Louro 40g",
        "preco": "4",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 28,
        "nome": "Cavalinha 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 29,
        "nome": "Dente de leao 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 30,
        "nome": "Alecrim 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 31,
        "nome": "Arruda 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 32,
        "nome": "Angelica 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 33,
        "nome": "Banchá",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 34,
        "nome": "Arnica do mato 60g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 35,
        "nome": "Picao 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 36,
        "nome": "Salvia 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 37,
        "nome": "Pata de vaca 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 38,
        "nome": "Chá de agoniada 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 39,
        "nome": "Chá de guaçatonga 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 40,
        "nome": "Carqueja 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 41,
        "nome": "Composto reumático 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 42,
        "nome": "Canarana 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 43,
        "nome": "Erva de bicho 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 44,
        "nome": "Jambolao 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 45,
        "nome": "Graviola 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 46,
        "nome": "Calendola 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 47,
        "nome": "Porangaba 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 48,
        "nome": "Composto p/ sinusite 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 49,
        "nome": "Chá verde 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 50,
        "nome": "Cordao de frade 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 51,
        "nome": "Moringa 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 52,
        "nome": "Eucalipto 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 53,
        "nome": "Valeriana 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 54,
        "nome": "Paulista 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 55,
        "nome": "Melao Sao Caetano 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 56,
        "nome": "Imiriba 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 57,
        "nome": "Douradinha 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 58,
        "nome": "Cedro 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 59,
        "nome": "Macela 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 60,
        "nome": "Flor da catingueira 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 61,
        "nome": "Casca Preciosa 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 62,
        "nome": "Erva de Sao Joao 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 63,
        "nome": "Mostarda 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 64,
        "nome": "Melissa 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 65,
        "nome": "Aroeira 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 66,
        "nome": "Jequitibá 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 67,
        "nome": "Jatobá 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 68,
        "nome": "Noni 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 69,
        "nome": "Boldo do Chile 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 70,
        "nome": "Pariri 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 71,
        "nome": "Ipe roxo 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 72,
        "nome": "Sucuba 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 73,
        "nome": "Guaco ou Sucurijú 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 74,
        "nome": "Vereda 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 75,
        "nome": "Abacateiro 40g",
        "preco": "0",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 76,
        "nome": "Copo Couro Tereré M",
        "preco": "18",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 77,
        "nome": "Copo Couro Tereré G",
        "preco": "28",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 78,
        "nome": "Copo Madeira Tereré",
        "preco": "60",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 79,
        "nome": "Copo Chimarrao G",
        "preco": "60",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 80,
        "nome": "Copo Inox Trots ",
        "preco": "120",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 81,
        "nome": "Copo Inox Tereré",
        "preco": "8",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 82,
        "nome": "Copo Chifre Tereré",
        "preco": "25",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 83,
        "nome": "Bomba simples tereré",
        "preco": "12",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 84,
        "nome": "Bomba Alpaca P",
        "preco": "30",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 85,
        "nome": "Bomba Alpaca M",
        "preco": "35",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 86,
        "nome": "Bomba Inox Desmontável ",
        "preco": "60",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 87,
        "nome": "Bomba inox Achatada",
        "preco": "160",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 88,
        "nome": "Filtro p/ chimarrao",
        "preco": "3",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 89,
        "nome": "Erva Pagliosa Chimarrao 500g",
        "preco": "18",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 90,
        "nome": "Erva Pagliosa Tereré 500g",
        "preco": "18",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 91,
        "nome": "Erva Campanário Menta e Limao 500g",
        "preco": "20",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 92,
        "nome": "Erva Campanário Ice Menta 500g",
        "preco": "20",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 93,
        "nome": "Erva Campanário Extra Forte 500g",
        "preco": "20",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 94,
        "nome": "Erva Kurupí Menta e boldo 500g",
        "preco": "20",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 95,
        "nome": "Erva Kurupí Menta e Limao 500g",
        "preco": "20",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 96,
        "nome": "Erva Kurupí Citrus 500g",
        "preco": "20",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      },
      {
        "id": 97,
        "nome": "Erva Colon Composta 500g",
        "preco": "20",
        "descricao": null,
        "imagem": null,
        "CategoriaId": null
      }],
      listItems: [],
      hour: `${new Date().getHours()}:${new Date().getMinutes()}`
    }

    this.getHour = this.getHour.bind(this);
    this.searchNameByCode = this.searchNameByCode.bind(this);
    this.calculateSubtotal = this.calculateSubtotal.bind(this);
    this.includeItem = this.includeItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.applyDiscount = this.applyDiscount.bind(this);
  }

  currentDate() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  getHour() {
    setInterval(() => {
      const now = new Date();

      this.setState({
        hour: `${now.getHours()}:${now.getMinutes()}`
      });
    }, 60000);
  }

  applyDiscount(event) {
      let discount = event.target.value;
      if(discount == '' || discount == undefined)
        discount = '0'
      
      console.log('---------' + discount);
      discount = discount.replace(',', '.')
      this.setState((state) => {
        const finalValue = state.prodTotal - parseFloat(discount);

        return {
          prodTotalDiscount: finalValue
        }
      });
  }

  includeItem(event) {
    const { prodCod, prodNome, prodPreco, prodSubtotal, prodQuantidade } = this.state;
    if (event.which === 13) {
      if (prodCod, prodNome, prodPreco, prodSubtotal, prodQuantidade !== '') {
        console.log('dá pra cadastrar');
        const newitem = {
          cod: prodCod,
          nome: prodNome,
          preco: prodPreco,
          subtotal: prodSubtotal,
          quantidade: prodQuantidade
        };

        this.setState((state) => {
          const list = state.listItems.push(newitem);

          const parsedTotal = isNaN(state.prodTotal) ? 0 : state.prodTotal
          const total = parseFloat(parsedTotal) + parseFloat(newitem.subtotal)

          console.log('total: ' + parsedTotal)

          return {
            list,
            prodCod: '',
            prodPreco: '',
            prodNome: '',
            prodQuantidade: '',
            prodSubtotal: '',
            prodTotal: total,
            prodTotalDiscount: total,
          }
        });

        let codInput = document.getElementById('pdvCodigo');
        codInput.value = '';
        codInput.focus();
      } else {
        console.log('There is empty fields');
      }
    } else {
      console.log('Not Enter KeyCode');
    }
  }

  deleteItem(id) {
    this.setState((state) => {
      const updatedList = state.listItems.filter((item, key) => key !== id);
      const deletedItem = state.listItems.filter((item, key) => key === id);
      const total = state.prodTotal - deletedItem[0].subtotal
      return {
        listItems: updatedList,
        prodTotal: total,
        prodTotalDiscount: total,
      }
    });
  }

  searchNameByCode(event) {
    if (event.target.value !== undefined) {
      const produto = this.state.produtos.filter((prod) => prod.id == event.target.value);
      if (produto[0] !== undefined) {
        this.setState({ prodNome: produto[0].nome, prodPreco: produto[0].preco, prodCod: produto[0].id });

      } else {
        console.log('Nenhum produto encontrado');
        this.setState({ prodNome: '', prodPreco: '', prodSubtotal: '', prodQuantidade: '', prodCod: '' })
      }
    } else {
      console.log('nenhum produto encontrado')
      this.setState({ prodNome: '', prodPreco: '', prodSubtotal: '', prodQuantidade: '', prodCod: '' })
    }
  }

  calculateSubtotal(event) {
    if (isNaN(event.target.value)) {
      console.log('Not a number');
      this.setState({ prodSubtotal: '', prodQuantidade: '' })
    } else {
      if (this.state.prodPreco !== '') {
        const subtotal = this.state.prodPreco * event.target.value;
        this.setState({ prodSubtotal: subtotal, prodQuantidade: event.target.value })
      }
    }
  }

  render() {
    const list = this.state.listItems;
    const listTable = list.map((item, key) => (
      <tr key={key}>
        <td>{item.cod}</td>
        <td>{item.nome}</td>
        <td>{item.quantidade}</td>
        <td>R${parseFloat(item.preco).toFixed(2).replace('.', ',')}</td>
        <td>R${parseFloat(item.subtotal).toFixed(2).replace('.', ',')}</td>
        <button className='listButton'><MdClose className='footerIcons' onClick={() => this.deleteItem(key)} /></button>
      </tr>
    ));
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
              <input type='text' value={this.state.prodNome} id='pdvProduto' />
            </div>
            <div className='detailsPurchase'>
              <div class='detailsDiv'>
                <p className='inputLabel'>Código:</p>
                <input type='text' id='pdvCodigo' onChange={this.searchNameByCode} />
              </div>

              <div class='detailsDiv'>
                <p className='inputLabel'>Quantidade:</p>
                <input value={this.state.prodQuantidade} type='text' id='pdvQuantidade' onKeyPress={this.includeItem} onChange={this.calculateSubtotal} />
              </div>

              <div class='detailsDiv'>
                <p className='inputLabel'>Val. Unit. (R$):</p>
                <input type='text' id='pdvValorUnit' onKeyPress={this.includeItem} value={this.state.prodPreco == '' ? '' : parseFloat(this.state.prodPreco).toFixed(2).replace('.', ',')} />
              </div>

              <div class='detailsDiv'>
                <p className='inputLabel'>SubTotal (R$):</p>
                <input type='text' id='pdvTotal' onKeyPress={this.includeItem} value={this.state.prodSubtotal == '' ? '' : parseFloat(this.state.prodSubtotal).toFixed(2).replace('.', ',')} />
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
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                    {
                      listTable
                    }
                  </tbody>
                </table>

              </div>
            </div>
          </aside>
          <aside className='rightAside'>
            <h3 id='righttitle'>Total a Pagar</h3>
            <input value={parseFloat(this.state.prodTotalDiscount).toFixed(2).replace('.', ',')} type='text' id='pdvTotalPagar' />

            <h3 id='righttitle'>Desconto</h3>
            <input type='text' id='pdvDesconto' onChange={this.applyDiscount} />

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