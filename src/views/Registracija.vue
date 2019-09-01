<template>
  <div id="registracija">
    <h1>Registracija novog korisnika</h1>
    <div class="col" style="padding-top: 10%;">
      <b-form>

        <b-form-group
          id="group1"
          label="OSOBNI PODACI">

          <b-form-input
            id="input1"
            v-model="korisnik.ime"
            type="text"
            required
            placeholder="Unesite ime">
          </b-form-input>

          <b-form-input
            id="input2"
            v-model="korisnik.prezime"
            type="text"
            required
            placeholder="Unesite prezime">
          </b-form-input>

          <b-form-input
            id="input3"
            v-model="korisnik.email"
            type="email"
            required
            placeholder="Unesite e-mail">
          </b-form-input>

          <b-form-input
            id="input4"
            v-model="korisnik.lozinka"
            type="password"
            required
            placeholder="Unesite lozinku">
          </b-form-input>

        </b-form-group>

        <b-form-group
          id="group2"
          label="PODACI STUDIJA">

          <b-form-input
            id="input5"
            v-model="korisnik.gradStudiranja"
            type="text"
            required
            placeholder="Unesite grad studiranja">
          </b-form-input>

          <b-form-input
            id="input6"
            v-model="korisnik.sveuciliste"
            type="text"
            required
            placeholder="Unesite sveučilište">
          </b-form-input>

          <b-form-input
            id="input7"
            v-model="korisnik.smjer"
            type="text"
            required
            placeholder="Unesite smijer">
          </b-form-input>

        </b-form-group>
        <b-button @click="submit" variant="primary" style="margin-right: 2%;">REGISTRIRAJ</b-button>
        <router-link to="/"><b-button variant="danger">ODUSTANI</b-button></router-link>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'registracija',
  data () {
    return {
      korisnik: {
        ime: "",
        prezime: "",
        email: "",
        lozinka: "",
        gradStudiranja: "",
        sveuciliste: "",
        smjer: ""
      },
    }
  },
  methods: {
        submit: function () {
          axios.post('http://127.0.0.1:5000/korisnik/registracija', this.korisnik)
            .then((odg) => {
            this.$store.state.trenutni_korisnik = odg.data.data;
            alert("Uspješno ste se registrirali!");
            this.resetirajSve();
            })
            .catch((error) => {
              alert(error);
            })
        },
    resetirajSve : function () {
          this.korisnik.ime="";
          this.korisnik.prezime="";
          this.korisnik.email="";
          this.korisnik.lozinka="";
          this.korisnik.gradStudiranja="";
          this.korisnik.sveuciliste="";
          this.korisnik.smjer="";
    }
  }
}
</script>

<style>
</style>
