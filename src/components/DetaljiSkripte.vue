<template>
  <div id="detalji">
    <h2>{{skripta.naziv}}</h2>
    <i class="material-icons" style="font-size:48px">insert_drive_file</i>
    <h5>Preuzmi</h5>
    <i class="material-icons" style="font-size:36px">cloud_download</i>
    <h5>Ocjeni</h5>
    <i class="material-icons" style="font-size:36px">stars</i>
    <i class="material-icons" style="font-size:36px">stars</i>
    <i class="material-icons" style="font-size:36px">stars</i>
    <i class="material-icons" style="font-size:36px">stars</i>
    <i class="material-icons" style="font-size:36px">stars</i>
    <h4>TRENUTNA OCJENA {{this.ocjena}}</h4>
    <i class="material-icons" style="font-size:36px;color:yellow">stars</i>
    <b-button class="custome-admin-btn" variant="light">Komentiraj</b-button>
  </div>
</template>

<script>

export default {
  name: 'detaljiSkripte',
  data () {
    return {
      skripta: {
        naziv: '',
        ocjena: '',
        file: '',
        komentari: [{ime: '', datum: '', text: ''}],
      }
    }
  },
  methods: {
  }
}
</script>

<style>
  .custome-btn{
    display: block !important;
    margin-left: 45%;
    margin-top: 1.5%
  }
</style
