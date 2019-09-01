<template>
  <div id="novosti">
    <Navigacija></Navigacija>
    <div v-if="!prikazNovosti" class="prikaz-novosti">
      <ol v-if="ucitano">
        <li :id="index"  v-for="(obavjest, index) in obavijesti" :key="index">
          <h2 style="">{{obavjest[1]}}</h2>
          <p>{{obavjest[2]}}</p>
          <span>Datum objavljivanja: {{obavjest[3]}}</span>
        </li>
      </ol>
      <div v-else class="container-dijete">
        <h1>Trenutno novih obavjesti.</h1>
      </div>
    </div>
    <div v-else>
      <b-form>
        <b-form-group id="input-group-1">
          <b-input class="b-input" v-model="novo.naslov" placeholder="Unesite naslov obavjesti"></b-input>
          <b-form-textarea class="b-textarea" v-model="novo.tekst" rows="3" max-rows="6" placeholder="Unesite tekst obavjesti"></b-form-textarea>
        </b-form-group>
        <b-button-group>
          <b-button @click="spremanjeObavjesti" variant="success">SPREMI</b-button>
          <b-button @click="prikazNovosti =  false">ODUSTANI</b-button>
        </b-button-group>
      </b-form>
    </div>
    <b-button v-if="this.$store.state.admin && !prikazNovosti" variant="success" @click="prikazNovosti = true"><i class="material-icons">add_circle</i> NOVA OBAVJEST</b-button>

  </div>
</template>

<script>
  import Navigacija from '../components/Navigacija.vue'
  import axios from 'axios'

  export default {
  name: 'novosti',
  data () {
    return {
      obavijesti: [],
      ucitano: false,
      prikazNovosti: false,
      novo: {
        naslov: '',
        tekst: '',
        datumObjave: ''
      }
    }
  },
  created() {
    this.getObavijesti();
  },
  components: {
    Navigacija
  },
  methods: {
    async getObavijesti() {
      await axios.get("http://127.0.0.1:5000/obavijesti")
              .then((odg) => {
                this.obavijesti = [];
                this.obavijesti = odg.data.obavijesti;
                if(this.obavijesti.length === 0) {
                  this.ucitano = false;
                } else {
                  this.ucitano = true;
                }
                console.log('obavijesti: ', this.obavijesti);
              })
              .catch(() => {
                alert("Nije moguce ucitati obavijesti.");
              })
    },
    spremanjeObavjesti : function () {
      this.novo.datumObjave = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
      axios.post("http://127.0.0.1:5000/obavijesti", this.novo)
              .then(() => {
                this.getObavijesti();
                this.prikazNovosti = false;
              })
              .catch(() => {
                alert("Nije moguce objaviti.");
              })
    }
  }
}
</script>

<style>

  .prikaz-novosti{
    width: 85%;
    height: 430px;
    margin: 3% auto auto 0;
    background-color: #fff;
    border: 2px solid black;
    border-radius: 8px;
    display: inline-block;
    text-align: start;
    scroll-behavior: smooth;
    overflow: scroll;
  }
  .container-dijete h1{
    margin: 20% 20%;
  }
  #input-group-1{
    margin-top: 10%;
    padding: 0 10%;
  }
  .b-input, .b-textarea{
    margin-bottom: 5%;
  }
</style>
