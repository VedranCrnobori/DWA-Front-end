<template>
  <div id="prijava">
    <h1>{{ naslov }}</h1>
    <div class="col" style="padding-top: 10%;">
      <b-form>

        <b-form-group
          id="group1">

          <b-form-input
            id="input1"
            v-model="korisnik.email"
            type="text"
            required
            placeholder="Unesite e-mail">
          </b-form-input>

          <b-form-input
            id="input2"
            v-model="korisnik.lozinka"
            type="password"
            required
            placeholder="Unesite lozinku">
          </b-form-input>

        </b-form-group>

        <b-button @click="submit" variant="primary" style="margin-right: 2%;">PRIJAVI SE</b-button>
        <router-link :to="{name: 'home'}"><b-button variant="danger">ODUSTANI</b-button></router-link>

      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'prijava',
  props: ['msg'],
  data () {
    return {
      naslov: 'Prijavi se kao administrator',
      admin: true,
      korisnik: {
        email: '',
        lozinka: ''
      },
    }
  },
  mounted() {
    if (this.msg) {
      this.naslov = this.msg;
      this.admin = false;
    }
  },
  methods: {
    submit : function () {
      if(this.admin){
        axios.post('http://127.0.0.1:5000/korisnik/prijava/admin', this.korisnik)
          .then((odg) => {
            this.$store.state.trenutni_admin = odg.data.admin;
            if (this.$store.state.trenutni_admin.length !== 0) {
              this.$store.state.admin = true;
              this.emitprijava();
            } else {
              alert("Nema podataka admina!");
            }
          })
          .catch((error) => {
            alert(error);
          })
      }else{
        axios.post('http://127.0.0.1:5000/korisnik/prijava', this.korisnik)
          .then((odg) => {
            this.$store.state.trenutni_korisnik = odg.data.korisnik;
            if (this.$store.state.trenutni_korisnik.length !== 0) {
              this.emitprijava();
            } else {
              alert("Nema podataka korisnika!");
            }
          })
          .catch(() => {
            alert("Pogrešno ste unjeli e-mail ili lozinku.");
          })
      }
    },
    emitprijava : function () {
      this.$emit("prijava", true);
      this.$router.replace ({ name: "skripte"})
    }
  }
}
</script>

<style>

</style>
