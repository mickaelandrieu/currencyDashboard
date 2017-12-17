<template>
  <div id="wrapper">
    <!--<img id="logo" src="~@/assets/logo.png" alt="electron-vue">-->
    <main>
      <div class="left-side">
        <h1 class="title">CryptoBoard</h1>
        <h3>Stocks</h3>
        <b>Total Money: {{ totalMoney }} €</b>
        <ul>
          <li
            v-for="stock in stocks"
            v-bind:key="stock.name"
          >
            {{ stock.name }} : {{ stock.value }} €
          </li>
        </ul>

        <h3>Currencies</h3>
        <ul>
          <Currency
            v-for="currency in currencies"
            v-bind:currency="currency"
            v-bind:key="currency.name"
          ></Currency>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
  import Currency from './LandingPage/Currency'
  import CurrencyModel from './../models/currency'
  import Stock from './../models/stock'

  const storage = require('electron').remote.require('electron-settings')

  export default {
    name: 'landing-page',
    data () {
      return {
        currencies: {},
        stocks: {},
        totalMoney: 0
      }
    },
    components: { Currency },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      calculateValue () {
        let totalValue = 0
        for (let stock of this.stocks) {
          totalValue += stock.value
        }

        return totalValue
      }
    },
    created: function () {
      this.$electron.ipcRenderer.send('init')

      if (storage.has('stocks')) {
        this.stocks = storage.get('stocks')
      } else {
        this.stocks = [
          new Stock('Bitcoin', 0.28),
          new Stock('Ethereum', 1.005),
          new Stock('Litecoin', 47),
          new Stock('Ripple', 340)
        ]

        storage.set('stocks', this.stocks)
      }

      this.$electron.ipcRenderer.on('data', (e, data) => {
        for (let currencyData of data) {
          let currency = new CurrencyModel(currencyData)
          this.currencies[currency.name] = currency

          for (let stock of this.stocks) {
            if (stock.name === currency.name) {
              stock.value = currency.price * stock.amount
            }
          }
        }

        this.totalMoney = this.calculateValue()
      })
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }
</style>
