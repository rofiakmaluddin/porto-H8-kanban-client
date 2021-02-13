<template>
  <!-- Main Page -->
    <div>
      <navbar 
      :auth = "auth" 
      :taskData = "taskData"
      :taskDataLength = "taskDataLength"
      :categories = "categories"
      :changeTaskDataLength = "changeTaskDataLength"
      :baseUrl = "baseUrl"
      :showAllData = "showAllData"
      :changeShowAllData = "changeShowAllData"
      :getAllData = "getAllData"
      :getMyData = "getMyData"
      ></navbar>

      <!-- Task Container -->
      <div class="container-fluid">
        <div class="row">
          <categoryContainer
          v-for="(category,index) in categories"
          :key = "index"
          :category = "category"
          :taskData = "taskData[index]"
          :addForm = "addForm"
          :changeAddForm = "changeAddForm"
          :baseUrl = "baseUrl"
          :editForm = "editForm"
          :changeEditForm = "changeEditForm"
          :auth = "auth"
          :getAllData="getAllData"
          :changeShowPage="changeShowPage"
          :taskDataLength = "taskDataLength"
          ></categoryContainer>
        </div>
      </div>

    </div>
</template>

<script>
import navbar from '../components/navbar'
import categoryContainer from '../components/categoryContainer'
import axios from 'axios'

export default {
  props: ['auth','categories','baseUrl','addForm','changeAddForm','editForm','changeEditForm','getAllData','changeShowPage','taskData','taskDataLength','changeTaskDataLength','showAllData','changeShowAllData','getMyData'],
  data(){
    return{
      
    }
  },
  components: {
    navbar,
    categoryContainer,
  },
  methods: {
    
    
  },
  // created: function() {
  //     this.auth()
  //   }
}
</script>

<style>

</style>