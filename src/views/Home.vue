<template>
  <div id="home">
    <h1 class="naslov">{{ message }}</h1>
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="buttons">
      <router-link to="registracija" style="text-decoration: none;"><b-button class=" first custome-btn" variant="primary">REGISTRACIJA</b-button></router-link>
      <router-link :to="{name: 'prijava', params: {msg}}" style="text-decoration: none;"><b-button class="custome-btn" variant="light">PRIJAVA</b-button></router-link>
      <router-link to="o-nama" style="text-decoration: none;"><b-button class="custome-btn" variant="info">O NAMA</b-button></router-link>
      <router-link :to="{name: 'prijava'}" style="text-decoration: none;"><b-button class="custome-admin-btn" variant="danger">ADMINISTRATOR</b-button></router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      message: "DOBRODOŠLI NA",
      msg: 'Prijavi se kao korisnik'
    }
  }
}
</script>

<style>
  #home{
    padding-top: 3%;
  }
  .naslov{
    letter-spacing: 5px;
  }
  .first {
    margin-left: 42% !important;
  }
  .custome-btn{
    display: block !important;
    margin-left: 45%;
    margin-top: 1.5%
  }
  .custome-admin-btn{
    display: block !important;
    float: right;
    margin-right: 2.5%;
    margin-top: 15%;
  }
  .buttons{
    margin-top: 10%;
  }

</style>
