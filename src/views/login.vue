<template>
  <!-- Login Page -->
    
    <div id="loginPage" class="shadow p-3 mt-5 mb-5 bg-white rounded container">
      <h2>Login to Kanban</h2>
      <p>Don't have an account? <a @click.prevent="changeShowPage('register')" href="">Register here now</a></p>
      <form @submit.prevent="login">
        <div class="form-floating mb-3">
          <input v-model="email" type="email" class="form-control" placeholder="name@example.com">
          <label>Email address</label>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" placeholder="Password">
          <label>Password</label>
        </div>
        <br>
        <button class="btn btn-success" type="submit">Login</button>
      </form>
      <p>or login with</p>
      <googleLogin></googleLogin>
    </div>
</template>

<script>
  import axios from 'axios'
  import googleLogin from '../components/googleLogin'
export default {
  props: ['baseUrl','auth','changeShowPage'],
  data(){
    return{
      email: '',
      password: ''
    }
  },
  components: {
    googleLogin
  },
  methods: {
    login(){
        axios({
          method: 'POST',
          url: this.baseUrl + 'login',
          data: {
            email:this.email,
            password: this.password
          }
        })
        .then(({data}) => {
          console.log(data.access_token);
          localStorage.setItem('access_token', data.access_token)
          this.auth()
        })
        .catch(err => {
          console.log(err);
        })
        .then(_ => {
          this.email = ''
          this.password = ''
        })
      },
  }
}
</script>

<style>

</style>