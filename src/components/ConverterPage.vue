<template>
  <div class="container">
    <div class="converter">
      <convert-module/>
      <div class="graphics">
        <ex-rates
            v-for="rate in rates"
            :key="rate.id"
            :currency="rate.title"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ExRates from "@/components/ExRates";
import ConvertModule from "@/components/ConvertModule";

export default {
  name: "ConverterPage",
  data() {
    return {
      rates: [
        {
          id: 1,
          title: 'bitcoin',
        },
        {
          id: 2,
          title: 'ethereum',
        }
      ]
    }
  },
  components: {ExRates, ConvertModule}
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

.graphics {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.converter {
  display: flex;
  flex-direction: column;
  width: 80%;
}
</style>