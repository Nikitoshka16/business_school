<template>
  <div class="navbar">
      <div>
<!--          @click="$router.push({name: 'mainPage',-->
<!--           params: {-->
<!--              id : this.$route.params['id'],-->
<!--              role: this.$route.params['role']-->
<!--          }-->
<!--          })"-->

          Рассылка Оренбургская бизнес-школа
      </div>
      <div class="navbar__btns">
          <my-button
                  @click="$router.push({
                  name: 'mailingPage',
                   params: {
                      id : this.$route.params['id'],
                      role: this.$route.params['role']
                  }
                  })"
                  style="margin-left: 20px"
          >
              Рассылка
          </my-button>

          <my-button
              v-show="!store.getters.getIsAuth"
              @click="$router.push('/login')"
              style="margin-left: 20px"
          >
              Авторизация
          </my-button>
          <my-button
              v-show="store.getters.getIsAuth"
              @click="exitUser"
              style="margin-left: 20px"
          >
              Выйти
          </my-button>
      </div>
  </div>
</template>

<script>

import MyButton from "@/components/UI/MyButton.vue";
import store from "@/store";
import router from "@/router/router";

export default {
    name: "my-navbar",
    computed: {
        store() {
            return store
        }
    },
    components: {MyButton},
    methods: {
        exitUser(){
            router.push('/login')
            store.dispatch('changeIsAuth')
            store.dispatch('changeIsAuthAdmin')
        }
    }
}
</script>

<style scoped>
.navbar{
    height: 70px;
    background-color: lightblue;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
.navbar__btns{
    margin-left: auto;
}
</style>