<template>
  <div class="col-lg-3 col-md-6 col-12">
    <div class="FixedHeightContainer shadow-lg rounded pb-0 mb-0">
      <div style="color: white;" class="category pt-2  mt-0">
        <h4>{{category}}</h4>
      </div>
      <div class="cardContainer mr-2 ml-2 mb-0">
        <div v-if="taskDataLength === 0">
          <h3>No Task</h3>
        </div>
        <taskCard
        v-for="(task,index) in taskData"
        :key = "index"
        :task = "task"
        :editForm = "editForm"
        :baseUrl = "baseUrl"
        :changeEditForm = "changeEditForm"
        :getAllData="getAllData"
        :changeShowPage="changeShowPage"
        :auth = "auth"
        ></taskCard>
        
        <div v-if="addForm === category" >
          <form @submit.prevent="addTask(category)">
            <div class="form-floating mr-1 ml-1 mb-1 mt-3">
              <input v-model="addTitle" type="text" class="form-control" placeholder="Title">
              <label>Title</label>
            </div>
            <div class="form-floating mr-1 ml-1">
              <input v-model="addDesc" type="text" class="form-control" placeholder="Desc">
              <label>Description</label>
            </div>
            <div class="mt-1 mb-1">
              <button type="submit">Add</button>
              <button @click.prevent="changeAddForm(false)">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="addForm !== category" @click.prevent="changeAddForm(category)" class="addBtn m-0 p-0">
        <a style="color: white;" href="#">
          <i class="fas fa-plus-square"></i>
          Add Task
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import taskCard from './taskCard'
import swal from 'sweetalert';

export default {
  props: ['category','taskData','addForm','changeAddForm','baseUrl','editForm','changeEditForm','auth','getAllData','taskDataLength','changeShowPage'],
  data() {
    return {
      addTitle: '',
      addDesc: '',
    }
  },
  methods: {
    addTask(category){
      // console.log(this.addTitle, '&&', this.addDesc, category);
      axios({
        method: 'POST',
        url: this.baseUrl + 'tasks',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          category,
          title: this.addTitle,
          description: this.addDesc
        }
      })
      .then(({data}) => {
        console.log(data);
        this.changeAddForm(false)
        // this.getAllData()
        swal("Task is added", "You need to refresh the page", "success");
        this.auth()
      })
      .catch(err => {
        console.log(err);
        swal("Error","", "error");
      })
      .then(_ => {
        this.addTitle = ''
        this.addDesc = ''
      })
    }
  },
  components: {
    taskCard
  }
  
}
</script>

<style>

</style>