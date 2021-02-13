<template>
  <!-- Registration Page -->
    <div id="registerPage" class="mt-5 shadow p-3 mb-5 bg-white rounded container">
      <h2>Register</h2>
      <p>Have an account? <a @click.prevent="changeShowPage('login')" href="">Login here</a></p>
      <form @submit.prevent="register">
        <div class="form-floating mb-3">
          <input v-model="firstName" type="text" class="form-control" placeholder="First Name">
          <label>First Name</label>
        </div>
        <div class="form-floating mb-3">
          <input v-model="lastName" type="text" class="form-control" placeholder="Last Name">
          <label>Last Name</label>
        </div>
        <div class="form-floating mb-3">
          <input v-model="email" type="email" class="form-control" placeholder="name@example.com">
          <label>Email address</label>
        </div>
        <div class="form-floating">
          <input v-model="password" type="password" class="form-control" placeholder="Password">
          <label>Password</label>
        </div>
        <br>
        <button class="btn btn-success" type="submit">Register</button>
      </form>
    </div>
</template>

<script>
  import axios from 'axios'

export default {
  props: ['baseUrl','changeShowPage'],
  data(){
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register(){
        axios({
          method: 'POST',
          url: this.baseUrl + 'register',
          data: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          }
        })
        .then(res => {
          console.log(res);
          this.changeShowPage('login')
        })
        .catch(err => {
          console.log(err);
        })
        .then(_ => {
          this.firstName = ''
          this.lastName = ''
          this.email = ''
          this.password = ''
        })
      },
  }
}
</script>

<style>

</style>