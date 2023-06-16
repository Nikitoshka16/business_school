<template>
  <div class="mailing">
      <div class="context">
          <div class="confirm">
              <my-dialog
                  v-model:show="confirmVisible"
              >
                  <h1><strong>Начать рассылку?</strong></h1>
                  <div class="formBtn">
                      <my-button
                          @click = 'mailing'
                      >
                          Подтвердить
                      </my-button>
                      <my-button
                          @click = 'hideDialog'
                      >Отмена</my-button>
                  </div>

              </my-dialog>
          </div>


          <div class="formBtn">
              <my-button
                  @click = 'showDialog'
              >
                  Фильтр
              </my-button>
              <my-button
                  @click="showConfirm"
              >
                  Разослать
              </my-button>
              <img class="load" v-show="load" src="./img/loading.gif" alt="Loading" />
          </div>

          <my-dialog
              v-model:show="dialogVisible"
          >
              <h1><strong>Фильтр</strong></h1>
              <filter-form
                  @create = 'updateClients'
                  @update = 'searchedClients'
              />
          </my-dialog>
          <my-dialog
              v-model:show="paternVisible"
          >
              <h1><strong>Шаблоны</strong></h1>
              <patern-list

                  @pick = "pickPatern"
                  @remove = "removePatern"
                  :paterns = 'paterns'
              />
          </my-dialog>
          <div>
              <my-input
                  placeholder ='Заголовок'
                  :model-value="subjectMsg"
                  @update:modelValue="newValue => subjectMsg = newValue"
              />

              <my-input
                  placeholder ='Прехедер'
                  :model-value="preview"
                  @update:modelValue="newValue => preview = newValue"
              />

              <my-textarea
                  placeholder="Сообщение"
                  :modelValue="textMsg"
                  @update:modelValue="newValue => textMsg = newValue"
              />
              <div class="formBtn">
                  <my-button
                      @click="clear"
                  >
                      Очистить поля
                  </my-button>
                  <my-button
                      @click="savePatern"
                  >
                      Сохранить шаблон
                  </my-button>
                  <my-button
                      @click="loadPatern"
                  >
                      Выбрать шаблон
                  </my-button>
              </div>

          </div>

          <div class="stats">
              <stat-list
                  :stats = 'stats'
              />
          </div>

      </div>
      <div class="clients">
          <div class="count"><h1><strong>Найдено клиентов</strong> {{this.clients.length}}</h1></div>
          <client-list
                       @remove = "removeClient"
                       :clients = 'clients'
          />
      </div>
  </div>
</template>

<script>
import ClientList from "@/components/ClientList.vue";
import axios from "axios";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import FilterForm from "@/components/FilterForm.vue";
import MyTextarea from "@/components/UI/MyTextarea.vue";
import MyInput from "@/components/UI/MyInput.vue";
import PaternList from "@/components/PaternList.vue";
import StatList from "@/components/StatList.vue";

export default {
    name: "MailingPage",
    components: {StatList, PaternList, MyInput, MyTextarea, FilterForm, MyButton, MyDialog, ClientList},
    data() {
        return{
            clients: [],
            paterns: [],
            stats: [],
            dialogVisible: false,
            confirmVisible: false,
            load: false,
            subjectMsg: '',
            textMsg: '',
            preview: '',
            paternVisible: false,
        }
    },
    methods:{
        clear(){
          this.subjectMsg = ''
          this.preview = ''
          this.textMsg = ''
        },
        savePatern(){
            axios.post('http://127.0.0.1:5000/savepatern',{
                msg: this.textMsg,
                subject: this.subjectMsg,
                preview: this.preview
            })
                .then(res => {
                    if (res.status === 200 && res.data === 'success') {
                        console.log('Сохранение успешно')
                    }else {
                        console.log('Ошибка сохранения')
                    }
                })
        },
        pickPatern(patern){
            this.subjectMsg = patern.title;
            this.preview = patern.preview;
            this.textMsg = patern.message;
            this.paternVisible = false;
        },
        removeClient(client){
            this.clients =this.clients.filter(c => c.clients_id !== client.clients_id)
        },
        removePatern(patern){
            axios.post('http://127.0.0.1:5000/removepatern',{patern_id: patern.id})
                .then(res => {
                    if (res.status === 200 && res.data === 'success') {
                        console.log('Удаление успешно')
                        this.loadPatern()
                    }else {
                        console.log('Ошибка удаления')
                    }
                })
        },
        async fetchClients(){
            try {
                const response = await axios.get('http://127.0.0.1:5000/clients');
                console.log(response)
                this.clients = response.data
            }catch (e){
                console.log(e)
            }
        },
        async fetchStats(){
            let arr = window.location.href.split('/')
            let id = arr[arr.length-1]
            try {
                const response = await axios.get('http://127.0.0.1:5000/stats');
                console.log(response)
                this.stats = response.data
                console.log(id)
                this.stats = this.stats.filter(stat => stat.userj == id)
            }catch (e){
                console.log(e)
            }
        },
        showDialog(){
            this.dialogVisible = true;
        },
        async loadPatern(){
            this.paternVisible = true;
            try {
                const response = await axios.get('http://127.0.0.1:5000/getpatern');
                console.log(response)
                this.paterns = response.data
            }catch (e){
                console.log(e)
            }
        },
        showConfirm(){
            this.confirmVisible = true;
        },
        updateClients(response){
            this.clients = response.data
        },
        searchedClients(searchQuery){
            console.log(searchQuery)
            this.clients = this.clients.filter(client => client.name.toLowerCase().includes(searchQuery.searchName.toLowerCase()))
            this.clients = this.clients.filter(client => client.surname.toLowerCase().includes(searchQuery.searchSurname.toLowerCase()))
            this.clients = this.clients.filter(client => client.region.toLowerCase().includes(searchQuery.searchRegion.toLowerCase()))
            this.clients = this.clients.filter(client => client.sex.toLowerCase().includes(searchQuery.searchSex.toLowerCase()))
            this.clients = this.clients.filter(client => client.fullage >= searchQuery.searchAge)
            this.clients = this.clients.filter(client => client.dateofbirth.includes(searchQuery.searchDateOfBirth))
            this.clients = this.clients.filter(client => client.faculty.toLowerCase().includes(searchQuery.searchFaculty.toLowerCase()))
            this.clients = this.clients.filter(client => client.specialty.toLowerCase().includes(searchQuery.searchSpecialty.toLowerCase()))
            this.clients = this.clients.filter(client => client.university.toLowerCase().includes(searchQuery.searchUniversity.toLowerCase()))
        },
        hideDialog(){
            this.confirmVisible = false
        },
        mailing(){
            this.hideDialog()
            this.load = true

            let arr = window.location.href.split('/')
            let id = arr[arr.length-1]

            axios.post('http://127.0.0.1:5000/mail',{
                userId: id,
                clients: this.clients,
                msg: this.textMsg,
                subject: this.subjectMsg,
                preview: this.preview})
                .then(res => {
                    console.log(res)
                    if (res.status === 200 && res.data === 'Success') {
                        this.load = false
                        this.fetchStats()
                        console.log('успех')
                    }
                })
        },

    },
    mounted() {
        this.fetchClients();
        this.fetchStats();
    }
}
</script>

<style scoped>
.mailing {
    display: flex;
}
.context {
    width: 70%;
    padding-right: 30px;
}
.clients {
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
    height: 37.5vh;
    border: 3px solid teal;
    padding: 10px;
}

.confirm {
    justify-content: space-between;
    width: 100%;
    align-items: center;
    display: flex;
}
.formBtn{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-bottom: 5px;
    align-items: center;
}
.load {
    width: 63px;
    height: 42px;
}

</style>