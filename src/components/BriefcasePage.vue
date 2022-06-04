<template>
  <div class="container">
    <div class="profile">
      <div class="currencies">
        <div class="wallet">
          <h1>Your wallet:</h1>
          <div class="dollars">{{ usdWallet }} $</div>
          <div class="bitcoin">{{ btcWallet }} BTC</div>
          <div class="ethereum">{{ ethWallet }} ETH</div>
        </div>
        <div class="rates">
          <h1>Current rates:</h1>
          <div class="dollars">1 BTC = {{ btcRate }} $</div>
          <div class="bitcoin">1 ETH = {{ ethRate }} $</div>
          <div class="ethereum">1 BTC = {{ btcRateInEth }} ETH</div>
        </div>
      </div>
      <bar-chart class="diagram" :data="{'ETH': ethWallet*ethRate, 'BTC': btcWallet*btcRate, 'USD': usdWallet}"></bar-chart>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import 'chartkick/chart.js'

export default {
  name: "BriefcasePage",
  computed: {
    ...mapState({
      btcRate: state => state.rateModule.btcRate,
      ethRate: state => state.rateModule.ethRate,
      btcRateInEth: state => state.rateModule.btcRateInEth,
      btcWallet: state => state.rateModule.btcWallet,
      ethWallet: state => state.rateModule.ethWallet,
      usdWallet: state => state.rateModule.usdWallet,
    })
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
</style>