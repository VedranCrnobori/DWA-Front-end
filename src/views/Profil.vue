<template>
    <div id="profil">
        <Navigacija></Navigacija>
        <div v-if="!this.$store.state.admin">
            <div>
                <h4>Uređivanje profila</h4>
            </div>
            <div class="test">
                <h1>IZMJENA OSOBNIH PODATAKA</h1>
                <div class="Pozadina">
                    <table>
                        <tr>
                            <td>IME I PREZIME:</td>
                            <td v-if="!edit"><h5>{{korisnik.ime}} {{korisnik.prezime}}</h5></td>
                            <td v-if="edit">
                                <b-form-input
                                        id="input-1"
                                        v-model="korisnik.ime"
                                        :placeholder="korisnik.ime"
                                        style="display: inline-block"
                                ></b-form-input>
                            </td>
                            <td v-if="edit">
                                <b-form-input
                                        id="input-2"
                                        v-model="korisnik.prezime"
                                        :placeholder="korisnik.prezime"
                                        style="display: inline-block"
                                ></b-form-input>
                            </td>
                        </tr>

                        <tr>
                            <td>EMAIL:</td>
                            <td v-if="!edit"><h5>{{korisnik.email}}</h5></td>
                            <td colspan=2 v-if="edit">
                                <b-form-input
                                        id="input-3"
                                        v-model="korisnik.email"
                                        :placeholder="korisnik.email"
                                ></b-form-input>
                            </td>
                        </tr>

                        <tr style="margin-left: 5%">
                            <td>LOZINKA:</td>
                            <td v-if="!edit"><h5>{{korisnik.lozinka}}</h5></td>
                            <td colspan=2 v-if="edit">
                                <b-form-input
                                        id="input-4"
                                        v-model="korisnik.lozinka"
                                        :placeholder="korisnik.lozinka"
                                ></b-form-input>
                            </td>
                        </tr>

                        <tr>
                            <td>GRAD:</td>
                            <td v-if="!edit"><h5>{{korisnik.grad}}</h5></td>
                            <td v-if="edit">
                                <b-form-group>
                                    <b-form-input
                                            id="input-5"
                                            v-model="korisnik.grad"
                                            :placeholder="korisnik.grad"
                                    ></b-form-input>
                                </b-form-group>
                            </td>
                        </tr>

                        <tr>
                            <td>SVEUCILISTE:</td>
                            <td v-if="!edit"><h5>{{korisnik.sveuciliste}}</h5></td>
                            <td colspan=2 v-if="edit">
                                <b-form-group>
                                    <b-form-input
                                            id="input-6"
                                            v-model="korisnik.sveuciliste"
                                            :placeholder="korisnik.sveuciliste"
                                    ></b-form-input>
                                </b-form-group>
                            </td>
                        </tr>

                        <tr>
                            <td>SMJER:</td>
                            <td v-if="!edit"><h5>{{korisnik.smjer}}</h5></td>
                            <td v-if="edit">
                                <b-form-group>
                                    <b-form-input
                                            id="input-7"
                                            v-model="korisnik.smjer"
                                            :placeholder="korisnik.smjer"
                                    ></b-form-input>
                                </b-form-group>
                            </td>
                        </tr>

                    </table>

                    <b-button v-if="!edit" @click="urediPodatke(true)" variant="info">Uredi podatke</b-button>
                    <b-button-group v-if="edit">
                        <b-button @click="spremiPromjene" variant="success" >Spremi promjene</b-button>
                        <b-button @click="urediPodatke(false)">Odustani</b-button>
                    </b-button-group>

                </div>
            </div>
        </div>
        <div v-else class="admin-pozadina">
            <h2>Nije moguce izmjeniti podatke admina.</h2>
        </div>
    </div>
</template>

<script>
    import Navigacija from '../components/Navigacija.vue'
    import axios from 'axios'

    export default {
        name: 'profil',
        data () {
            return {
                korisnik: {
                    id: this.$store.state.trenutni_korisnik[0],
                    ime: this.$store.state.trenutni_korisnik[1],
                    prezime: this.$store.state.trenutni_korisnik[2],
                    lozinka: this.$store.state.trenutni_korisnik[3],
                    email: this.$store.state.trenutni_korisnik[4],
                    grad: this.$store.state.trenutni_korisnik[5],
                    sveuciliste: this.$store.state.trenutni_korisnik[6],
                    smjer: this.$store.state.trenutni_korisnik[7]
                },
                edit: false
            }
        },
        components: {
            Navigacija
        },
        mounted() {
        },
        methods: {
            urediPodatke : function (status) {
                this.edit = status;
            },
            spremiPromjene : function () {
                if (this.$store.state.admin) {
                    return null;
                } else {
                    axios.put('http://127.0.0.1:5000/korisnik/registracija', this.korisnik)
                        .then((odg) => {
                            if (odg.data.data === true) {
                                alert("Korisnik uspješno ažuriran!");
                                this.edit = false;
                            }
                        })
                        .catch(() => {
                            alert("Doslo je do greške prilikom spremanje podataka.");
                        })
                }
            }
        }
    }
</script>

<style>
    .Pozadina{
        margin: 1.5%;
        background-color: #fff6e5;
        padding: 2% 3.5%;
        transition: .5s ease-in-out;
    }
    table tr td{
        text-align: start;
    }
    table tr td h5{
        margin-left: 10%;
        margin-bottom: 5%;
    }
    .test{
        background-color: white;
    }
    .admin-pozadina{
        background-color: antiquewhite;
        border-radius: 8px;
        margin: 5% 15%;
        text-align: center;
    }
</style>
