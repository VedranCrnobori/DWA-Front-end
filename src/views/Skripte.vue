<template>
    <div id="skripte">
        <Navigacija></Navigacija>
        <div class="prikaz-skripti">
            <ol v-if="skripteUcitane">
                <li :id="index"  v-for="(skripta, index) in sveSkripte" :key="index" @click="odaberiSkriptu(index)">
                    <h2 style="">{{skripta[2]}}</h2>
                    <span>Datum objavljivanja: {{skripta[5]}}</span>
                    <span style="margin-left: 2.5%">Ocjena: {{skripta[3]}}</span>
                </li>
            </ol>
            <div v-else class="container-dijete">
                <h1>Trenutno se ne nalazi niti jedna skripta u repozitoriju.</h1>
            </div>
        </div>
        <input
                @change="konfigurirajSkriptu"
                style="display: none;"
                type="file"
                ref="skriptaInput"
        />
        <b-button @click="$refs.skriptaInput.click()" class="custome-admin-btn" variant="danger"><i class="material-icons">add_circle</i> DODAJ SKRIPTU</b-button>
        <b-button-group v-if="odabrana" class="dodatneOpcije">
            <b-button variant="info" v-b-modal.modal-ocjenjivanje><i class="material-icons">stars</i>OCIJENI</b-button>
            <b-button @click="preuzimanje" variant="success"><i class="material-icons">file_download</i>PREUZMI</b-button>
            <b-button v-if="this.$store.state.admin" @click="ukloniSkriptu" variant="danger"><i class="material-icons">delete</i>UKLONI</b-button>
        </b-button-group>

        <b-modal id="modal-ocjenjivanje" hide-header>
            <p class="my-4">Ocjenite odabranu skriptu</p>
            <b-form-select v-model="trenutnaOcjena" :options="opcije"></b-form-select>
        </b-modal>

    </div>
</template>

<script>
    import Navigacija from '../components/Navigacija.vue'
    import axios from 'axios'

    export default {
        name: 'skripte',
        data () {
            return {
                dokument: {
                    naziv: '',
                    skripta: '',
                    datumSpremanja: '',
                    ocjena: 0,
                    korisnikId: this.$store.state.trenutni_korisnik[0]
                },
                trenutnaOcjena: 0,
                opcije: [
                    {value: null, text: 'Odaberite ocijenu', disabled: true},
                    {value: 1, text: '1'},
                    {value: 2, text: '2'},
                    {value: 3, text: '3'},
                    {value: 4, text: '4'},
                    {value: 5, text: '5'}
                ],
                sveSkripte: [],
                skripteUcitane: false,
                odabranaSkriptaPreuzimanje: null,
                odabrana: false,
                lastIndex: null,
                modalOcjena: false
            }
        },
        components: {
            Navigacija
        },
        created(){
            this.ucitajSkripte();
        },
        watch: {
            trenutnaOcjena() {
                if (this.trenutnaOcjena !== 0) {
                    this.odabranaSkriptaPreuzimanje[3] = this.izracunOcjena;
                    this.trenutnaOcjena = 0;
                    this.azurirajOcjene();
                }
            }
        },
        methods: {
            async ucitajSkripte(){
                await axios.get("http://127.0.0.1:5000/skripte")
                    .then((odg) => {
                        this.sveSkripte = odg.data.skripte;
                        if(this.sveSkripte.length === 0) {
                            this.skripteUcitane = false;
                        } else {
                            this.skripteUcitane = true;
                        }
                    })
                    .catch(() => {
                        alert('Doslo je do greske kod ucitavanja skripti.');
                    })
            },
            dodajSkriptu : function () {
                axios.post("http://127.0.0.1:5000/skripte", this.dokument)
                    .then(() => {
                        alert("Skripta je uspjesno dodana.");
                    })
                    .catch(() => {
                        alert("Doslo je do greske kod spremanja skripte.");
                    })
            },
            ukloniSkriptu : function () {
                const s = {
                    skriptaId: this.odabranaSkriptaPreuzimanje[0]
                };
                axios.put("http://127.0.0.1:5000/skripte/brisanje",  s)
                    .then((odg) => {
                        if (odg.data.status === 'success'){
                            alert('Skripta je uspjesno obrisana.');
                            this.sveSkripte = odg.data.skripte;
                        }
                    })
                    .catch(() => {
                        alert('Doslo je do greske kod brisanja odabrane skripte.');
                    })
            },
            azurirajOcjene : function () {
                const o = {
                    skriptaId: this.odabranaSkriptaPreuzimanje[0],
                    ocijena: this.odabranaSkriptaPreuzimanje[3]
                };
                axios.put("http://127.0.0.1:5000/skripte",  o)
                    .then((odg) => {
                        this.sveSkripte = odg.data.skripte;
                    })

            },
            konfigurirajSkriptu : function (event) {
                var datum = new Date().toJSON().slice(0, 10).replace(/-/g,'/');
                var file = event.target.files[0];
                this.dokument.naziv = file.name;
                this.dokument.datumSpremanja = datum;
                this.komparacija(file);
            },
            komparacija : function (file) {
                var self = this;
                var reader = new FileReader() ;
                var doc = new Blob([file]);
                reader.readAsDataURL(doc);
                reader.onload = function () {
                    self.dokument.skripta = reader.result;
                    self.dodajSkriptu();
                };
            },
            odaberiSkriptu : function (index) {
                this.sveSkripte.forEach(function(value, key) {
                    if (key === index && index === this.lastIndex && this.odabrana) {
                        this.odabranaSkriptaPreuzimanje = null;
                        this.odabrana = false;
                        document.getElementById(this.lastIndex).style.backgroundColor = "#fff";
                        document.getElementById(this.lastIndex).style.color = "black";
                        this.lastIndex = '';
                    }
                    else if (key === index && index !== this.lastIndex && this.odabrana) {
                        document.getElementById(this.lastIndex).style.backgroundColor = "#fff";
                        document.getElementById(this.lastIndex).style.color = "black";
                        this.odabranaSkriptaPreuzimanje = value;
                        document.getElementById(index).style.backgroundColor = "#2c3e50";
                        document.getElementById(index).style.color = "#fff6e5";
                        this.lastIndex = index;
                    }
                    else if (key === index && !this.odabrana) {
                        this.odabranaSkriptaPreuzimanje = value;
                        this.odabrana = true;
                        document.getElementById(index).style.backgroundColor = "#2c3e50";
                        document.getElementById(index).style.color = "#fff6e5";
                        this.lastIndex = index;
                    }
                }, this);
            },
            preuzimanje : function () {

                    var fileBlob = this.odabranaSkriptaPreuzimanje[4];
                    fileBlob = fileBlob.split(',');

                    const url = URL.createObjectURL(new Blob([this.odabranaSkriptaPreuzimanje[4]]));
                    const link = document.createElement('a');
                console.log(url);
                    link.href = url;
                    link.setAttribute('download', this.odabranaSkriptaPreuzimanje[2]);
                    document.body.appendChild(link);
                    link.click()
            }
        },
        computed: {
            izracunOcjena() {
                if (this.odabranaSkriptaPreuzimanje[3] === 0 || this.odabranaSkriptaPreuzimanje[3] === this.trenutnaOcjena) {
                    return this.trenutnaOcjena;
                } else {
                    var o = Number(this.odabranaSkriptaPreuzimanje[3]) + Number(this.trenutnaOcjena);
                    o = Number(o) / 2;
                    return o;
                }
            }
        }
    }
</script>

<style>
    #skripte{
        position: relative;
    }
    .prikaz-skripti{
        width: 70%;
        height: 430px;
        margin: 3% auto auto -5%;
        background-color: #fff;
        border: 2px solid black;
        border-radius: 8px;
        display: inline-block;
        text-align: start;
        scroll-behavior: smooth;
    }
    .prikaz-skripti ol li:hover{
        background-color: #2c3e50;
        color: #fff6e5;
        cursor: pointer;
        transition: .5s ease;
    }
    .prikaz-skripti ol li{
        padding: 1.5%;
    }
    .container-dijete h1{
        margin-top: 20%;
    }
    .dodatneOpcije{
        float: left;
        margin: .5% auto 0 25%;
    }

</style>
