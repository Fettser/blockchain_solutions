<template>
  <select class="select-module" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
    <option disabled value="">Select</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "custom-select",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.select-module {
  width: 80%;
  margin-left: 10px;
}
</style>