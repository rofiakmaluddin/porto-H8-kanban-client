const app = new Vue({
  el: '#app',
  data: {
    showPage: 'login'
  },
  methods: {
    changePage(page){
      this.showPage = page
    }
  },

  beforeCreate: function() {},
  created: function() {
    if (!localStorage.getItem('access_token')) {
      this.showPage = 'login'
    } else {
      this.showPage = 'main'
    }
  },
  beforeMount: function() {},
  mounted: function() {},

  computed: {

  },
  watch: {

  }
})