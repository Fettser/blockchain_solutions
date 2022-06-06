<template>
  <vue-basic-alert
      :duration="500"
      :closeIn="5000"
      ref="alert"/>
  <div class="container">
    <div class="profile">
      <div class="currencies">
        <div class="wallet">
          <h1>Your wallet:</h1>
          <div class="dollars">{{ usdWallet }} $</div>
          <div class="bitcoin">{{ btcWallet }} BTC</div>
          <div class="ethereum">{{ ethWallet }} ETH</div>
          <div class="total">Total dollar amount: {{ totalAmount }} $</div>
        </div>
        <div class="rates">
          <h1>Current rates:</h1>
          <div class="dollars">1 BTC = {{ btcRate }} $</div>
          <div class="bitcoin">1 ETH = {{ ethRate }} $</div>
          <div class="ethereum">1 BTC = {{ btcRateInEth }} ETH</div>
        </div>
      </div>
      <div class="filling_module">
        <p>Fill up</p>
        <div class="filling_wallet">
          <custom-input v-model="amount" style="margin-bottom: 0; margin-right: 10px"/>
          <custom-select v-model="currency" :options="fillingOptions" style="width: 80px; margin: 0"/>
          <div class="filling_button" @click="onFillWallet">Button</div>
        </div>
      </div>
      <bar-chart class="diagram"
                 :data="{'ETH': ethWallet*ethRate, 'BTC': btcWallet*btcRate, 'USD': usdWallet}"></bar-chart>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import 'chartkick/chart.js'
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";

export default {
  name: "BriefcasePage",
  components: {
    CustomSelect,
    CustomInput
  },
  data() {
    return {
      fillingOptions: [
        {value: 'usd', name: 'usd'},
        {value: 'btc', name: 'bitcoin'},
        {value: 'eth', name: 'ethereum'}
      ],
      amount: 0,
      currency: ''
    }
  },
  computed: {
    ...mapState({
      btcRate: state => state.rateModule.btcRate,
      ethRate: state => state.rateModule.ethRate,
      btcRateInEth: state => state.rateModule.btcRateInEth,
      btcWallet: state => state.rateModule.btcWallet,
      ethWallet: state => state.rateModule.ethWallet,
      usdWallet: state => state.rateModule.usdWallet,
    }),
    totalAmount: function () {
      return Number((this.usdWallet + this.btcRate * this.btcWallet + this.ethRate * this.ethWallet).toFixed(2))
    }
  },
  methods: {
    onFillWallet() {
      let isValidAmount = !!this.amount
      let isValidCurrency = this.currency === ''
      if (!isValidAmount || isValidCurrency) {
        let error = (isValidCurrency ? `You must select a currency. ` : '') +
            (!isValidAmount ? 'You must entre the amount.' : '')
        this.$refs.alert.showAlert('error',
            error,
            'Error',
            {
              iconSize: 35,
              iconType: 'solid',
              position: 'top right'
            })
      } else {
        this.$refs.alert.showAlert('success',
            `Filling was successful`,
            'Success',
            {
              iconSize: 35,
              iconType: 'solid',
              position: 'top right'
            })
      }
      this.$store.dispatch('rateModule/fillWallet', {
        currency: `${this.currency}`,
        amount: this.amount
      })
      this.amount = 0
    }
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 80px;
}

.currencies {
  display: flex;
  justify-content: space-between;
}

.profile {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.wallet, .rates {
  width: 45%;
  border-radius: 5px;
  border: #cac3e9 solid 2px;
  padding: 5px;
  font-family: Arial, sans-serif;
}

.diagram {
  margin-top: 30px;
  border-radius: 5px;
  border: #cac3e9 solid 2px;
  padding: 5px;
}

.filling_wallet {
  display: flex;
  width: 95%;
  justify-content: space-between;
}

.filling_module {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  align-self: center;
  align-items: center;
  margin: 20px 0 auto;
  padding: 10px 5px;
  border-radius: 5px;
  border: #cac3e9 solid 2px;
  text-align: left;
}

.filling_module p {
  font-family: Arial, sans-serif;
  margin: 0 10px 10px;
  font-size: 20px;
}

.filling_button {
  display: flex;
  width: 120px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  background-color: #b5e9cf;
  border-radius: 0.5em;
  color: white;
  font-family: sans-serif, Arial;
  transition: 0.2s;
}

.filling_button:hover {
  transform: scale(1.1);
}


</style>