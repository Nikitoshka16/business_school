<template>
  <textarea
          class="input"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
    name: "MyTextarea",
    props: {
        modelValue: {
            required: true,
            type: String
        }
    }
}
</script>

<style scoped>
.input {
    resize: none;
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>