<template>
  <div class="client">
      <div>
          <div> {{client.name}} {{client.surname}}</div>
      </div>
      <div class="client__btns">
          <my-button
                  @click="$emit('remove', client)"
          >
              Удалить
          </my-button>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        client: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.client{
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-content: center;
    justify-content: space-between;
}
.client__btns{
    display: flex;
}
</style>