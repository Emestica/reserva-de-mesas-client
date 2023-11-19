<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="mx-auto mt-5" elevation="8">
                    <v-card-title class="text-h6 font-weight-regular justify-space-between">
                        <span>
                            {{ currentTitle }}
                        </span>
                        <v-avatar class="ml-3" color="primary" size="24" v-text="step"></v-avatar>
                    </v-card-title>

                    <v-window v-model="step">

                        <v-window-item :value="1">
                            <v-card-text>

                                <v-container>
                                    <v-row>

                                        <v-col cols="6">
                                            <v-text-field
                                                label="Nombres"
                                                type="text"
                                                maxLength="100"
                                                counter
                                                color="indigo"
                                                placeholder="Nombres de la persona"
                                                v-model="person.nombres">
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="6">
                                            <v-text-field
                                                label="Apellidos"
                                                type="text"
                                                maxLength="100"
                                                counter
                                                color="indigo"
                                                placeholder="Apellidos de la persona"
                                                v-model="person.apellidos">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>

                                        <v-col cols="6">
                                            <v-text-field
                                                label="Edad"
                                                type="number"
                                                max="100"
                                                min="18"
                                                counter
                                                color="indigo"
                                                placeholder="Edad de la persona"
                                                v-model="person.edad">
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="6">
                                            <v-text-field
                                                label="Celular"
                                                type="text"
                                                maxLength="9"
                                                counter
                                                color="indigo"
                                                placeholder="0000-0000"
                                                v-model="person.celular">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-window-item>

                        <v-window-item :value="2">
                            <v-card-text>

                                <v-container>
                                    <v-row>
                                        <v-col cols="4" class="mx-auto">
                                            <v-text-field 
                                            label="Correo" 
                                            placeholder="example@google.com"
                                            v-model="user.email">
                                        </v-text-field>
                                        <span class="text-caption text-grey-darken-1">
                                            Este es el correo electr&oacute;nico que utilizar&aacute; para iniciar sesi&oacute;n en el sistema.
                                        </span>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4" class="mx-auto">
                                            <v-text-field 
                                                label="Contrase&ntilde;a" 
                                                type="password"
                                                v-model="user.password">
                                            </v-text-field>
                                            <span class="text-caption text-grey-darken-1">
                                                Por favor ingrese una contrase&ntilde;a para su cuenta.
                                            </span>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4" class="mx-auto">
                                            <v-text-field 
                                                label="Confirmar Contrase&ntilde;a" 
                                                type="password">
                                            </v-text-field>
                                            <span class="text-caption text-grey-darken-1">
                                                Por favor confirme su contrase&ntilde;a.
                                            </span>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col></v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-window-item>

                        <v-window-item :value="3">
                            <v-card-text>
                                <v-container>

                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                                label="Nombre Legal"
                                                type="text"
                                                maxLength="150"
                                                counter
                                                color="indigo"
                                                placeholder="Restaurante S.A. de C.V."
                                                v-model="restaurant.nombre_legal">
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="6">
                                            <v-text-field
                                                label="Restaurante"
                                                type="text"
                                                maxLength="100"
                                                counter
                                                color="indigo"
                                                placeholder="Ingrese Nombre del Restaurante"
                                                v-model="restaurant.restaurante">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field
                                                label="Telefono"
                                                type="text"
                                                maxLength="9"
                                                counter
                                                color="indigo"
                                                placeholder="0000-0000"
                                                v-model="restaurant.telefono">
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="6">
                                            <v-text-field
                                                label="Correo"
                                                type="email"
                                                maxLength="150"
                                                counter
                                                color="indigo"
                                                placeholder="ejemplo@gmail.com"
                                                v-model="restaurant.correo">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row>

                                        <v-col cols="6">
                                            <v-select
                                                label="Departamentos"
                                                :items="listadoDepartamentos" 
                                                item-value="id_departamento"
                                                item-title="departamento"
                                                v-model="seleccion">
                                            </v-select>
                                        </v-col>

                                        <v-col cols="6">
                                            <v-select
                                                label="Municipios"
                                                :items="listadoMunicipios" 
                                                item-value="id_municipio"
                                                item-title="municipio"
                                                v-model="restaurant.id_municipio">
                                            </v-select>
                                        </v-col>

                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-window-item>

                    </v-window>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn v-if="step > 1" variant="text" @click="step--">Regresar</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn v-if="step < 3" color="primary" variant="flat" @click="step++">Siguiente</v-btn>
                        <v-btn v-if="step == 3" color="success" variant="flat" @click="registerUser()">Registrar</v-btn>
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
    
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        step: 1,
        person:{
            nombres: null,
            apellidos: null,
            celular: null,
            edad: null,
            usuario_creacion: "root"
        },
        user:{
            email: null,
            password: null
        },
        restaurant:{
            nombre_legal: null,
            restaurante: null,
            telefono: null,
            correo: null,
            usuario_creacion: "root",
            id_municipio: null
        },
        listadoDepartamentos: [],
        listadoMunicipios: [],
        seleccion: null
    }),
    computed: {
        currentTitle() {
            switch (this.step) {
                case 1: return 'Ingreso de Datos Personales'
                case 2: return 'Creacion de Cuenta'
                default: return 'Creacion del Restaurante'
            }
        },
    },
    methods: {
        getDepartamentosPorIdPais(){
            let headerDepartamentos = {
                params:{
                    opcion: 1,
                    estado: 'A',
                    idpais: 1
                }
            };

            axios.get('http://127.0.0.1:8000/api/get-departamentos', headerDepartamentos)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                if(response.data.success === true){
                    console.log(response.data.data)
                    this.listadoDepartamentos = response.data.data;
                } else {
                    console.log(response.data.data);
                }
            })
        },
        getMunicipiosPorIdDepartamento(id){
            let headerMuncipios = {
                params: {
                    opcion: 1,
                    estado: 'A',
                    iddepartamento: id
                }
            };
            axios.get('http://127.0.0.1:8000/api/get-municipios', headerMuncipios)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                if(response.data.success === true){
                    console.log(response.data.data)
                    this.listadoMunicipios = response.data.data;
                } else {
                    this.listadoMunicipios = [];
                    console.log(response.data.data);
                }
            })
        },
        registerUser(){

            let data = {
                person: this.person,
                user: this.user,
                restaurant: this.restaurant
            };

            axios.post('http://127.0.0.1:8000/api/client/register-user', data)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                if(response.data.success === true){
                    this.$router.push('/');
                } else {
                    console.log(response.data);
                }
            })
        }
    },
    watch: {
        seleccion(algo){
            this.getMunicipiosPorIdDepartamento(algo);
        }
    },
    created(){
        this.getDepartamentosPorIdPais();
    }
}
</script>