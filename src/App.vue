<template>
  <div id="app">
    <router-view @prijava="postaviPrijavu" />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        prijava: false
      }
    },
    mounted () {
      if (!this.prijava) {
        this.$router.replace ({ name: "home" })
      } else {
        this.$router.replace ({ name: "skripte" })
      }
    },
    methods: {
      postaviPrijavu : function (status) {
        this.prijava = status;
      },
      odjava : function () {
        this.prijava = false;
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 10% auto;
  height: 600px;
  width: 900px;
  background-image: url("assets/background.jpg");
  border-radius: 8px;
  box-shadow: 4px 2px 5px 3px lightgray;
}
</style>
