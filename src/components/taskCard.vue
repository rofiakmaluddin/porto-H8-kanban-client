<template>
<div>
  
    <div v-if="editForm !== task.id" class="card m-1">
      <div class="card-body">
        <h5 class="card-title"><b>{{task.title}}</b></h5>
        <p class="card-text">{{task.description}}</p>
        <p class="card-text">By {{task.User.firstName}} {{task.User.lastName}}</p>
        <div class="taskButton m-0 p-0">
          <a class="taskButton2" v-on:click.prevent="changeCategory(task.id, task.category,false)" v-if = "task.category !== 'Backlog'" href=""><i class="fas fa-arrow-circle-left"></i></a>
          <a class="taskButton2" v-on:click.prevent="getById(task.id)" href=""><i class="fas fa-edit"></i></a>
          <a class="taskButton2" v-on:click.prevent="destroy(task.id)" href=""><i class="fas fa-trash-alt"></i></a> 
          <a class="taskButton2" @click.prevent="changeCategory(task.id, task.category,true)" v-if = "task.category !== 'Done'" href=""><i class="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>
    </div>
    <div v-else-if="editForm === task.id">
      <form @submit.prevent="editTask(task.id)">
        <div class="form-floating mr-1 ml-1 mb-1 mt-3">
          <input v-model="editTitle" type="text" class="form-control" placeholder="">
          <label>Title</label>
        </div>
        <div class="form-floating mr-1 ml-1">
          <input v-model="editDesc" type="text" class="form-control" placeholder="">
          <label>Description</label>
        </div>
        <div class="mt-1 mb-1">
          <button type="submit">Edit</button>
          <button @click.prevent="changeEditForm(false)">Cancel</button> 
        </div>
      </form>
    </div>
</div>
  
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert';

export default {
  props: ['task','editForm','changeEditForm','baseUrl','getAllData','auth','changeShowPage'],
  data() {
    return {
      editTitle: '',
      editDesc: '',
      is: 'mainPage'
    }
  },
  methods: {
    getById(id){
      axios({
        method: 'GET',
        url: this.baseUrl + `tasks/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
        this.editTitle = data.title
        this.editDesc = data.description 
        this.changeEditForm(id)
      })
      .catch(err => {
        console.log(err);
      })
    },
    editTask(id){
      axios({
        method: 'PUT',
        url: this.baseUrl + `tasks/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: this.editTitle,
          description: this.editDesc
        }
      })
      .then(({data}) => {
        console.log(data);
        this.changeEditForm(false)
        swal("Task is edited", "", "success");
        this.auth()
      })
      .catch(err => {
        console.log(err);
        swal("Error", "", "error");
      })
      .then(_ => {
        this.editTitle = ''
        this.editDesc = ''
      })
    },
    destroy(id){
      console.log(id);
      axios({
        method: 'DELETE',
        url: this.baseUrl + `tasks/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
      .then(({data}) => {
        console.log(data);
        // this.getAllData()
        // this.auth()
        swal("Task has been deleted", data.msg, "success");

        this.getAllData()
        this.changeShowPage(this.is)
      })
      .catch((err,text) => {
        console.log('masuk err Destroy');
        console.log(err);
        swal("Error", "", "error");
      })
    },
    changeCategory(id,category,dir){
      if (dir) {
        if (category === 'Backlog') category = 'Todo'
        else if (category === 'Todo') category = 'Doing'
        else if (category === 'Doing') category = 'Done'
      } else {
        if (category === 'Todo') category = 'Backlog'
        else if (category === 'Doing') category = 'Todo'
        else if (category === 'Done') category = 'Doing'
      }
      axios({
        method: 'PATCH',
        url: this.baseUrl + `tasks/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          category
        }
      })
      .then(({data}) => {
        console.log(data);
        swal("Success", "Category has been changed", "success");
        this.getAllData()
        this.changeShowPage('mainPage')
        // this.auth()
      })
      .catch(err => {
        console.log(err);
        swal("Error", "You cannot change other's task", "error");
      })
    }
  }
  
}
</script>

<style>

</style>