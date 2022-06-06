<template>
  <vue-basic-alert
      :duration="500"
      :closeIn="5000"
      ref="alert"/>
  <div class="container">
    <div class="input-amount">
      <p>Amount:</p>
      <custom-input v-model="amountFrom"/>
    </div>
    <div class="option">
      <div class="from">
        <p>From:</p>
        <custom-select v-model="convertFrom" :options="convertOptions"/>
      </div>
      <div class="convert" @click="onConvertCurrency"><p>Convert</p></div>
      <div class="to">
        <p>To:</p>
        <custom-select v-model="convertTo" :options="convertOptions"/>
      </div>
    </div>
  </div>
</template>

<script>

import CustomSelect from "@/components/CustomSelect";
import CustomInput from "@/components/CustomInput";


export default {
  name: "ConvertModule",
  components: {CustomSelect, CustomInput},
  data() {
    return {
      convertFrom: '',
      convertTo: '',
      amountFrom: null,
      convertOptions: [
        {value: ['usd', 'usd'], name: 'usd'},
        {value: ['bitcoin', 'btc'], name: 'bitcoin'},
        {value: ['ethereum', 'eth'], name: 'ethereum'}
      ]
    }
  },
  methods: {
    onConvertCurrency() {
      let isInvalidAmount = this.amountFrom < 0 || this.amountFrom > this.$store.getters[`rateModule/get_${this.convertFrom.split(',')[1]}Wallet`]
      let isEqualCurrencies = this.convertFrom === this.convertTo
      let isInvalidCurrency = this.convertFrom === '' || this.convertTo === ''
      if (isInvalidAmount || isEqualCurrencies || isInvalidCurrency) {
        let error = (isInvalidAmount ? `You don't have enough ${this.convertFrom.split(',')[0]} on your balance or the amount is less than zero. ` : '') +
            (isEqualCurrencies ? 'Currencies must be different. ' : '') + (isInvalidCurrency ? 'Choose currencies. ' : '')
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
            `Conversion was successful`,
            'Success',
            {
              iconSize: 35,
              iconType: 'solid',
              position: 'top right'
            })
        this.$store.dispatch('rateModule/convertAction', {
          from: `${this.convertFrom}`,
          to: `${this.convertTo}`,
          amount: this.amountFrom
        })
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  margin: 0 auto;
  width: 60%;
  min-width: 300px;
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.convert {
  background-color: #b5e9cf;
  border-radius: 15px;
  height: 30px;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
}

.convert:hover {
  transform: scale(1.1);
}

p {
  height: 1em;
  font-family: Arial, sans-serif;
}

.convert p {
  color: white;
}

.from, .to {
  width: 35%;
  display: flex;
  justify-content: space-between;
}
</style>
