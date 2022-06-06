import fetcherModule from "@/store/fetcherModule";
import axios from "axios";

export default {
    state: () => ({
        interval: null,
        btcRate: null,
        ethRate: null,
        btcRateInEth: null,
        btcWallet: 0.569,
        ethWallet: 10.93,
        usdWallet: 1500.00
    }),
    getters: {
        get_usdWallet: (state) => {
            return state.usdWallet
        },
        get_btcWallet: (state) => {
            return state.btcWallet
        },
        get_ethWallet: (state) => {
            return state.ethWallet
        },
    },
    mutations: {
        updateBtcRate(state, btc) {
            state.btcRate = btc
        },
        updateEthRate(state, eth) {
            state.ethRate = eth
        },
        updateBtcRateInEth(state, btcInEth) {
            state.btcRateInEth = btcInEth
        },
        update_btcWallet(state, btc) {
            state.btcWallet = Number((state.btcWallet + btc).toFixed(8))
        },
        update_ethWallet(state, eth) {
            state.ethWallet = Number((state.ethWallet + eth).toFixed(7))
        },
        update_usdWallet(state, usd) {
            state.usdWallet = Number((state.usdWallet + usd).toFixed(2))
        }
    },
    actions: {
        fetchRates({state, commit}) {
            if (!state.interval) {
                state.interval = setInterval(async () => {
                    await fetcherModule(commit)
                }, 60000)
            }
        },
        async initialRates({commit}) {
            await fetcherModule(commit)
        },
        async convertAction({commit}, {from, to, amount}) {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${from.split(',')[0]}&vs_currencies=${to.split(',')[1]}`)
            commit(`update_${from.split(',')[1]}Wallet`, -amount)
            commit(`update_${to.split(',')[1]}Wallet`, amount * Number(response.data[`${from.split(',')[0]}`][`${to.split(',')[1]}`]))
        },
        fillWallet({commit}, {currency, amount}) {
            commit(`update_${currency}Wallet`, amount)
        }
    },
    namespaced: true
}