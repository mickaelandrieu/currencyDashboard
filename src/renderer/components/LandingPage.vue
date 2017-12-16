<template>
  <div id="wrapper">
    <!--<img id="logo" src="~@/assets/logo.png" alt="electron-vue">-->
    <main>
      <div class="left-side">
        <h1 class="title">CryptoBoard</h1>
        <h3><b>Total money</b>: {{ totalMoney }}</h3>
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
      calculateMoney (currencies) {
        let totalMoney = 0
        for (let currency in this.stocks) {
          totalMoney += this.stocks[currency] * currencies[currency].price
        }

        return totalMoney
      }
    },
    created: function () {
      this.$electron.ipcRenderer.send('init')

      this.$electron.ipcRenderer.on('data', (e, data) => {
        for (let currencyData of data) {
          let currencyName = currencyData.name
          this.currencies[currencyName] = new CurrencyModel(currencyData)
        }

        this.totalMoney = this.calculateMoney(this.currencies)
      })

      if (storage.has('stocks')) {
        this.stocks = storage.get('stocks')
      } else {
        this.stocks = {
          'Bitcoin': 0.28,
          'Ethereum': 1.005,
          'Litecoin': 47,
          'Ripple': 340
        }
      }
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
