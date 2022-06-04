<template>
  <input class="input-area" type="number" :value="modelValue" @change="changeInput" min="0"/>
</template>

<script>
export default {
  name: "CustomInput",
  props: {
    modelValue: {
      type: Number
    }
  },
  methods: {
    changeInput(event) {
      this.$emit('update:modelValue', Number(event.target.value))
    }
  }
}
</script>

<style scoped>
  .input-area {
    width: 100%;
    margin-top: 0;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
</style>