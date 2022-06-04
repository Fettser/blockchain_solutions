<template>
  <div class="chart">
    <line-chart v-if="loaded" :title="currency.toUpperCase()" :min="null" :max="null" :data="chartData"></line-chart>
    <pulse-loader :color="'#1b0037'" v-else></pulse-loader>
  </div>
</template>

<script>
import 'chartkick/chart.js'
import axios from "axios"
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: "ExRates",
  components: {
    PulseLoader
  },
  props: {
    currency: {
      type: String,
      require: true
    }
  },
  async mounted() {
    this.loaded = false
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${this.$props.currency}/market_chart?vs_currency=usd&days=14&interval=daily`)
      const dataset = {}
      response.data["prices"].forEach(price => dataset[new Date(price[0]).toISOString().substr(5, 5)] = price[1])
      this.chartData = dataset
    } catch (e) {
      console.log(e)
    } finally {
      this.loaded = true
    }
  },
  data() {
    return {
      loaded: false,
      chartData: null
    }
  }
}
</script>

<style scoped>
.chart {
  width: 45%;
  min-width: 300px;
  margin: 20px 20px;
  border-radius: 5px;
  border: #cac3e9 solid 2px;
  padding: 5px;
}
</style>