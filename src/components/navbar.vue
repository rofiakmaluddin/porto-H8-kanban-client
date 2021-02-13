<template>
  <!-- Navbar -->
      <nav class="shadow container-fluid mb-3">
        <div class="row">
          <div id="leftNav" class="col-2">
            <a href=""><b>KANBAN</b></a>
          </div>
          <div class="col-7"></div>      
          <div id="rightNav" class="col-3">
              <a @click = "changeShowAllData(true)" href="#">All Tasks</a>
              <a @click = "changeShowAllData(false)" href="#">My Tasks</a>
              <a @click = "logout" href="#">Logout</a>
          </div>
        </div>
      </nav>
</template>

<script>
import axios from 'axios'
export default {
  props: ['auth','taskData','taskDataLength','categories','changeTaskDataLength','baseUrl','showAllData','changeShowAllData','getAllData','getMyData'],
  methods: {
    logout(){
      localStorage.clear()
      this.auth()
    }
    
  },
  
}
</script>

<style>

</style>