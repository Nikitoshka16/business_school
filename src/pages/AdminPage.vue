<template>
  <div class="mailing" >
      <div class="context">
          <div class="formBtn">
              <my-button

                  @click = 'showDialog'
              >
                  Добавить пользователя
              </my-button>
              
          </div>


          <my-dialog
                  v-model:show="dialogVisible"
          >
              <my-input
                      :modelValue="nameUser"
                      @update:modelValue="newValue => nameUser = newValue"
                      placeholder="Введите имя"
              />
              <my-input
                      :modelValue="email"
                      @update:modelValue="newValue => email = newValue"
                      placeholder="Введите email"
              />
              <my-input
                      :modelValue="firstPsw"
                      @update:modelValue="newValue => firstPsw = newValue"
                      placeholder="Введите пароль"
              />
              <my-input
                      :modelValue="secondPsw"
                      @update:modelValue="newValue => secondPsw = newValue"
                      placeholder="Повторите пароль"
              />
              <div class="formBtn">
                  <input
                      type="checkbox"
                      v-model="admin"
                      @update:modelValue="newValue => admin = newValue"
                  />
                  <span v-if="admin===false">Пользователь</span>
                  <span v-else>Админ</span>

                  <my-button
                      @click = 'registerUser'
                      style="margin-top: 15px"
                  >
                      Добавить пользователя
                  </my-button>
              </div>
          </my-dialog>

          <div class="stats">
              <h1><strong>Статистика</strong></h1>
              <stat-list
                  :stats = 'stats'
              />
          </div>


      </div>
      <div class="users">
          <user-list
                  @remove = "blockUser"
                  @move = "unblockUser"
                  :users = 'users'
          />
      </div>
  </div>
</template>

<script>
import UserList from "@/components/UserList.vue";
import axios from "axios";
import MyButton from "@/components/UI/MyButton.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyInput from "@/components/UI/MyInput.vue";
import StatList from "@/components/StatList.vue";

export default {
    name: "AdminPage",
    components: {StatList, MyInput, MyDialog, MyButton, UserList},
    data(){
        return{
            users: [],
            stats: [],
            dialogVisible: false,
            firstPsw: '',
            secondPsw: '',
            nameUser: '',
            email: '',
            admin: false,
            user: []
        }
    },
    methods: {
        showDialog(){
            this.dialogVisible = true;
        },
        async fetchStats(){
            try {
                const response = await axios.get('http://45.12.236.247:50/stats');
                console.log(response)
                this.stats = response.data
            }catch (e){
                console.log(e)
            }
        },
        async blockUser(user){
            this.user = this.users.filter(u => u.id === user.id)
            axios.post('http://45.12.236.247:50/block', {user: this.user})
                .then(res => {
                    console.log(res)
                    if (res.status === 200 && res.data === 'success') {
                        this.fetchUsers()
                    }
                    else if (res.status === 200 && res.data === 'error'){
                        console.log('e')
                    }
                })
        },
        async unblockUser(user){
            this.user = this.users.filter(u => u.id === user.id)
            axios.post('http://45.12.236.247:50/unblock', {user: this.user})
                .then(res => {
                    console.log(res)
                    if (res.status === 200 && res.data === 'success') {
                        this.fetchUsers()
                    }
                    else if (res.status === 200 && res.data === 'error'){
                        console.log('e')
                    }
                })
        },
        async fetchUsers(){
            try {
                const response = await axios.get('http://45.12.236.247:50/users');
                console.log(response)
                this.users = response.data
            }catch (e){
                console.log(e)
            }
        },
        async registerUser(){
            axios.post('http://45.12.236.247:50/register', {
                    nameUser: this.nameUser,
                    psw1: this.firstPsw,
                    psw2: this.secondPsw,
                    email: this.email,
                    admin: this.admin}
            )
                .then(res => {
                    console.log(res)
                    if (res.status === 200 && res.data === 'success') {
                        this.dialogVisible = false
                        this.nameUser =''
                        this.email = ''
                        this.secondPsw = ''
                        this.firstPsw = ''
                        this.fetchUsers()
                    }
                    else if (res.status === 200 && res.data === 'error'){
                        console.log('e')
                    }
                    else if (res.status === 200 && res.data === 'incorrect'){
                        console.log('i')
                    }
                })
        }
    },
    mounted() {
        this.fetchUsers();
        this.fetchStats();
    }
}
</script>

<style scoped>
.formBtn{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.mailing{
    display: flex;
    padding: 10px;
}
.context{
    width: 70%;
    padding: 10px;
}
.users{
    width: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    height: 80vh;
    border: 5px solid teal;
    padding: 10px;
}
.stats {
    width: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    height: 70.3vh;
    border: 3px solid teal;
    padding: 10px;
}
.formBtn{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-bottom: 15px;
    align-items: center;
}
</style>