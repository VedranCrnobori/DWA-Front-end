<template>
  <div id="about">
  <h1>{{ naslov }}</h1>

    <div id="textDiv" v-if="!kontakt">
      <p>Dobrodošli na aplikaciju Easy Study. Ova aplikacija je specijalizirana za pohranjivanje,
      komentiranje i ocjenjivanje skripti za fakultetsko obrazovanje. Odvije možete pronaći sve
      skripte za sve fakultete u Hrvatskoj. Isto tako možete postaviti bilo koje pitanje drugim
      studentima vašeg sveučilišta ili komentirati skripte vašeg smjera.</p>
    </div>

    <div id="textDiv" v-else>
      <p>Poštovani studenti ukoliko imate bilo koje pitanje ili bilo koji problem, molimo Vas
      da nam se obratite  putem e-maila ili telefonskog broja, od Ponedjeljka do Petka
      od 08 do 20 sati.</p>
      <p> e-mail: es.support@es.hr</p>
      <p> Telefon: 099 123 456 7</p>
    </div>

    <b-button v-if="!kontakt" @click="toggle" variant="primary" style="margin-right: 2%;">KONTAKT</b-button>
    <b-button v-else @click="toggle" variant="primary" style="margin-right: 2%;">O NAMA</b-button>

  </div>
</template>

<script>

export default {
  name: 'about',
  data () {
    return {
      naslov: 'O nama',
      kontakt: false
    }
  },
  methods: {
    toggle : function () {
      if ( this.kontakt === true) {
        this.naslov = "O nama";
        this.kontakt = false;
      }else{
        this.naslov = "Kontakt";
        this.kontakt = true;
      }
    }
  }
}
</script>

<style>
  #about{
    padding-top: 3%;
  }
  #textDiv{
    margin: 10% 0 5% 10%;
    padding: 6%;
    width: 80%;
    word-wrap: break-word;
    letter-spacing: 2px;
    border: 2px solid white;
    background-color: #D3D3D3;
  }

</style>
