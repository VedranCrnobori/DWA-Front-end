<template>
  <div id="navigacija">

    <b-navbar type="light" variant="light">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

        <b-nav-item>
          <router-link to="skripte" style="text-decoration: none;"><b-img fluid :src="require('../assets/skripte.png')" alt="Skripte"></b-img><br>Skripte</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="novosti" style="text-decoration: none;"><b-img fluid :src="require('../assets/novosti.png')" alt="Novosti"></b-img><br>Novosti</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="profil" style="text-decoration: none;"><b-img fluid :src="require('../assets/uredivanje.png')" alt="Uredivanje"></b-img><br>Profil</router-link>
        </b-nav-item>

        <b-nav-item>
          <b-img fluid :src="require('../assets/odjava.png')" @click="emitodjava" alt="Odjava"></b-img><br>Odjava
        </b-nav-item>

      </b-navbar-nav>
    </b-navbar>

  </div>
</template>

<script>

export default {
  name: 'navigacija',
  data () {
    return {
      props: { width: 64, height: 64}
    }
  },
  methods: {
    emitodjava : function () {
        this.$emit("prijava", false);
        this.$router.replace({ name: "home"});
        this.$store.state.trenutni_korisnik = [];
        this.$store.state.admin = false;
    }
  }
}
</script>

<style>

</style>
