<template>
  <div>
      <my-input
              v-model="searchQuery.searchName"
              type="text"
              placeholder="Имя"
      />
      <my-input
              v-model="searchQuery.searchSurname"
              type="text"
              placeholder="Фамилия"
      />
      <my-input
              v-model="searchQuery.searchRegion"
              type="text"
              placeholder="Регион"
      />
      <my-select
          v-model="searchQuery.searchSex"
          placeholder = "Пол"
      />
      <my-input
          v-model="searchQuery.searchAge"
          type="text"
          placeholder="Возраст"
      />
      <my-input
              v-model="searchQuery.searchDateOfBirth"
              type="text"
              placeholder="Дата рождения"
      />
      <my-input
              v-model="searchQuery.searchFaculty"
              type="text"
              placeholder="Факультет"
      />
      <my-input
              v-model="searchQuery.searchSpecialty"
              type="text"
              placeholder="Специальность"
      />
      <my-input
              v-model="searchQuery.searchUniversity"
              type="text"
              placeholder="Университет"
      />
      <div class="btnFilter">
          <my-button
              style="margin-top: 15px; "
              @click="fetchClients"
          >
              Сброс фильтров
          </my-button>
          <my-button
              style="margin-top: 15px;"
              @click="useSearch"
          >
              Применить фильтр
          </my-button>
      </div>

  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import MyInput from "@/components/UI/MyInput.vue";
import MySelect from "@/components/UI/MySelect.vue";

export default {
    name: "FilterForm",
    components: {MySelect, MyInput, MyButton},
    data() {
        return{
            searchQuery: {
                searchName: '',
                searchSurname: '',
                searchRegion: '',
                searchSex: '',
                searchAge: '',
                searchDateOfBirth: '',
                searchFaculty: '',
                searchSpecialty: '',
                searchUniversity: ''
            }
        }
    },
    methods:{
        async fetchClients(){
            try {
                const response = await axios.get('http://45.12.236.247:50/clients');
                this.$emit('create', response)
            }catch (e){
                console.log(e)
            }
        },
        useSearch(){
            this.$emit('update', this.searchQuery)
        }
    }
}
</script>

<style scoped>
.btnFilter {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>