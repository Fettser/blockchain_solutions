import axios from 'axios'

export default async function (commit) {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd")
    const responseBtcEth = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eth")
    commit('updateBtcRate', response.data["bitcoin"]["usd"])
    commit('updateEthRate', response.data["ethereum"]["usd"])
    commit('updateBtcRateInEth', responseBtcEth.data["bitcoin"]["eth"])
}
