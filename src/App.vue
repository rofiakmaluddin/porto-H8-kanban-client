<template>
  <div>
    
    <login 
    v-if = "showPage === 'login'"
    :baseUrl = "baseUrl"
    :auth = "auth"
    :changeShowPage = "changeShowPage"
    ></login>

    <register
    v-if = "showPage ==='register'"
    :baseUrl = "baseUrl"
    :changeShowPage = "changeShowPage"
    ></register>

    <mainPage
    v-if="showPage === 'mainPage'"
    :baseUrl = "baseUrl"
    :auth = "auth"
    :changeShowPage="changeShowPage"
    :categories = "categories"
    :addForm = "addForm"
    :changeAddForm = "changeAddForm"
    :editForm = "editForm"
    :changeEditForm = "changeEditForm"
    :getAllData="getAllData"
    :taskData = "taskData"
    :taskDataLength = "taskDataLength"
    :changeTaskDataLength = "changeTaskDataLength"
    :showAllData = "showAllData"
    :changeShowAllData = "changeShowAllData"
    :getMyData = "getMyData"
    ></mainPage>

    <!-- <mainPage
    v-else-if = "showPage === 'mainPageMyData'"
    :baseUrl = "baseUrl"
    :auth = "auth"
    :changeShowPage = "changeShowPage"
    :categories = "categories"
    :addForm = "addForm"
    :changeAddForm = "changeAddForm"
    :editForm = "editForm"
    :changeEditForm = "changeEditForm"
    :getAllData = "getAllData"
    :taskData = "taskData"
    :taskDataLength = "taskDataLength"
    :changeTaskDataLength = "changeTaskDataLength"
    :showAllData = "showAllData"
    :changeShowAllData = "changeShowAllData"
    :getMyData = "getMyData"
    ></mainPage> -->

  </div>
</template>

<script>
  import login from './views/login'
  import register from './views/register'
  import mainPage from './views/mainPage'
  import axios from 'axios'
  export default {
    data(){
      return {
        showAllData: true,
        taskData: [],
        taskDataLength: 0,
        addForm: false,
        editForm: false,
        showPage: 'login',
        categories: ['Backlog','Todo','Doing','Done'],
        baseUrl: 'http://localhost:3000/'
      }
    },
    components: {
      login,
      register,
      mainPage
    },
    methods: {
      changeShowPage(value){
        this.showPage = value
      },
      changeAddForm(value){
        this.addForm = value
      },
      changeEditForm(value){
        this.editForm = value
      },
      changeTaskDataLength(value){
        this.taskDataLength = value
      },
      changeShowAllData(value){
        this.showAllData = value
        this.auth()
      },
      getAllData(){
        axios({
          method: 'GET',
          url: this.baseUrl + 'tasks',
          headers: {
            access_token : localStorage.getItem('access_token')
          }
        })
        .then(({data})=>{
          // console.log(data,'>>>> AllData');
          console.log('ini getAllData >>>>>>>>>>>>>');
          this.categories.forEach(category => {
            let temp = []
            for (let i = 0; i < data.length; i++) {
              if (data[i].category === category) {
                temp.push(data[i])
              }
            }
            this.taskData.push(temp)
          })
          this.taskDataLength = this.taskData.length
          // this.showAllData = true
        })
        .catch(err => {
          console.log(err);
        })
      },
      getMyData(){
        axios({
          method: 'GET',
          url: this.baseUrl + 'tasks/userData',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({data}) => {
          console.log(data,'>>>> MyData');
          this.categories.forEach(category => {
            let temp = []
            for (let i = 0; i < data.length; i++) {
              if (data[i].category === category) {
                temp.push(data[i])
              }
            }
            this.taskData.push(temp)
          })
          this.changeTaskDataLength(this.taskData.length)
          this.showAllData = false
        })
        .catch(err => {
          console.log(err);
        })
      },
      auth(){
        if(!localStorage.getItem('access_token')) this.showPage = 'login'
        else {
          console.log('masuk auth >>>>>>>>>>>>>');
          this.getAllData()
          this.showPage = 'mainPage'
          // if (this.showAllData) {
          //   this.showPage = 'mainPageAllData'
          //   this.getAllData()
          // }
          // else {
          //   this.showPage = 'mainPageMyData'
          //   this.getMyData()
          // }
          // console.log(this.showPage);
        }
      }
    },
    created: function() {

      this.auth()
    }
  }
</script>
<style>
  nav {
  background-color: #128C7E;
  color: white;
  }
  nav #leftNav a {
    color: white;
    font-size: 30px;
    text-decoration: none;
  }
  nav #rightNav a {
    font-size: 20px;
    color: white;
    text-decoration: none;
  }
  nav #rightNav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .taskButton {
    display: flex;
    justify-content: space-evenly;
    color: #128C7E;
  }
  .taskButton2 {
    color: #128C7E;
  }
  .FixedHeightContainer
  {
    float:right;
    height: 95%;
    width: 15em;
    background-color: lightgrey;
  }
  .category{
    background-color: #128C7E;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cardContainer
  {
    height:510px;
    overflow:auto;
    background-color: lightgrey;

  }
  .addBtn {
    color: white;
    height:40px;
    background-color: #128C7E;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #registerPage{
    max-width: 25em;
  }
  #loginPage{
    max-width: 25em;
  }
</style>