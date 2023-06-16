<template>
  <select
          :value="modelValue"
          @change="$emit('update:modelValue', $event.target.value)"
          class="input"
  >
      <option value=""></option>
      <option value="М">М</option>
      <option value="Ж">Ж</option>
  </select>
</template>

<script>
export default {
    name: "MySelect",
    props: {
        modelValue: {
            required: true,
            type: String
        }
    },
    methods: {
        changeOption(option){
            this.$emit('update: modelValue', option)
        }
    }
}
</script>

<style scoped>
.input{
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>