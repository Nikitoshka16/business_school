<template>
  <div class="main">
      <div class="login">
          <div >
              <h1 style="text-transform: capitalize">авторизация</h1>
              <my-input
                  :modelValue="userLogin"
                  @update:modelValue="newValue => userLogin = newValue"
                  placeholder="Введите email"
              />
              <my-input
                  isPassword="password"
                  :modelValue="userPassword"
                  @update:modelValue="newValue => userPassword = newValue"
                  placeholder="Введите пароль"
              />
              <div class="btn">
                  <my-button
                      @click="authUser"
                      style="margin-top: 15px "
                  >
                      Войти
                  </my-button>
                  <label
                      style="color: crimson; border: 1px solid crimson; padding: 3px; border-radius: 5px"
                      v-show="showDismissibleAlert"
                  >
                      Неправильный логин или пароль
                  </label>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import store from "@/store/index.js";
import router from "@/router/router";
import axios from "axios";

export default {
    name: "UserLogin",
    components: {MyButton, MyInput},
    data(){
        return{
            userLogin: '',
            userPassword: '',
            showDismissibleAlert: false
        }
    },
    methods: {
        authUser(){
            axios.post('http://45.12.236.247:50/login', {login: this.userLogin, password: this.userPassword})
                .then(res => {
                    console.log(res)
                    if (res.status === 200 && res.data['admin'] === false) {
                        store.dispatch('changeIsAuth')
                        store.dispatch('createUser', res.data)
                        router.push({name: 'mailingPage', params: {role: 'manager',id : res.data['id']}})
                    }
                    else if (res.status === 200 && res.data === 'incorrect'){
                        this.showDismissibleAlert = true
                    }
                    else if (res.status === 200 && res.data['admin'] === true){
                        store.dispatch('changeIsAuth')
                        store.dispatch('createUser', res.data)
                        router.push({name: 'adminPage', params: {role: 'admin',id : res.data['id']}})
                    }
                })
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    width: 100%;
    height: 100%;
}
.login {
    transform: translate(50%, 50%);
    width: 650px;
    padding: 10px;
    border: 1px solid teal;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
}
.btn {
    align-items: center;
    justify-content: space-between;
    display: flex;
}
</style>