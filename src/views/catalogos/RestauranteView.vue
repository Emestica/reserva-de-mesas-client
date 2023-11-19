<template>
    <NavigationDrawerComponent></NavigationDrawerComponent>
    <v-container>
        <h1>Formulario de Restaurantes</h1>
        <v-card>
            <v-container>
                <v-form>
                    <v-row>                       
                        <v-col cols="12" md="6">
                            <v-select
                                v-model="restaurante.id_municipio"
                                :items="listaMunicipio"
                                item-value="id_municipio"
                                item-title="municipio"
                                density="compact"
                                color="indigo"
                                label="Seleccione un Municipio"
                                clearable
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="restaurante.nombre_legal"
                                label="Nombre Legal"
                                placeholder="Ingrese un nombre legal"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>                        
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="restaurante.restaurante"
                                label="Restaurante"
                                placeholder="Ingrese nombre del Restaurante"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="restaurante.descripcion"
                                label="Descripci&oacute;n"
                                placeholder="Ingrese una descripci&oacute;n"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>                        
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="restaurante.direccion"
                                label="Direcci&oacute;n"
                                placeholder="Ingrese una direcci&oacute;n"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="restaurante.telefono"
                                label="Tel&eacute;fono Fijo"
                                placeholder="Ingrese un n&uacute;mero telef&oacute;nico"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>                   
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="restaurante.celular"
                                label="Tel&eacute;fono Celular"
                                placeholder="Ingrese un n&uacute;mero telef&oacute;nico"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="restaurante.correo"
                                label="Correo Electr&oacute;nico"
                                placeholder="Ingrese un correo electr&oacute;nico"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="restaurante.pagina_web"
                                label="P&aacute;gina Web"
                                placeholder="Ingrese una p&aacute;gina web"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <div class="text-end">
                                <v-btn type="button" class="mt-2 green" color="green-darken-3" @click="agregarRestaurante">Guardar</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
        <v-divider class="mt-5 mb-5"></v-divider>

        <v-card>
            <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Municipio</th>
                                    <th>Nombre Legal</th>
                                    <th>Restaurante</th>
                                    <th>Descripci&oacute;n</th>
                                    <th>Direcci&oacute;n</th>
                                    <th>Tel&eacute;fono Fijo</th>
                                    <th>Tel&eacute;fono Celular</th>
                                    <th>Correo</th>
                                    <th>P&aacute;gina Web</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listaRestaurante" :key="item.id_restaurante">
                                    <td>{{ item.id_restaurante }}</td>
                                    <td>{{ item.municipio }}</td>
                                    <td>{{ item.nombre_legal }}</td>
                                    <td>{{ item.restaurante }}</td>
                                    <td>{{ item.descripcion }}</td>
                                    <td>{{ item.direccion }}</td>
                                    <td>{{ item.telefono }}</td>
                                    <td>{{ item.celular }}</td>
                                    <td>{{ item.correo }}</td>
                                    <td>{{ item.pagina_web }}</td>
                                    <td>
                                        <div v-if="item.estado === 'A'">Activo</div>
                                        <div v-if="item.estado === 'I'">Inactivo</div>
                                        <div v-if="item.estado === 'E'">Eliminado</div>
                                    </td>
                                    <td>
                                        <v-btn icon="mdi-pencil" color="green" @click="obtenerRestaurante(item.id_restaurante, 1)"></v-btn>
                                        <v-btn icon="mdi-delete" color="red" @click="obtenerRestaurante(item.id_restaurante, 2)"></v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <!--Alerta-->
        <v-snackbar v-model="alertaEstado" color="blue-accent-1" timeout="3000">
            {{ mensaje }}
        </v-snackbar>

        <!--Editar-->
        <v-dialog
            v-model="dialogOne"
            transition="dialog-top-transition"
            width="600"
        >
            <v-card title="Editar" subtitle="Datos del Restaurante">
                <v-card-text>
                    <v-select
                        v-model="datos.id_municipio"
                        :items="listaMunicipio"
                        item-value="id_municipio"
                        item-title="municipio"
                        density="compact"
                        color="indigo"
                        label="Seleccione un Municipio"
                        clearable
                    ></v-select>
                    <v-text-field
                        v-model="datos.nombre_legal"
                        label="Nombre Legal"
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.restaurante"
                        label="Restaurante"
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.descripcion"
                        label="Descripci&oacute;n"
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.direccion"
                        label="Direcci&oacute;n"
                        placeholder="Ingrese una direcci&oacute;n"
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.telefono"
                        label="Tel&eacute;fono Fijo"
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.celular"
                        label="Tel&eacute;fono Celular"
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.correo"
                        label="Correo Electr&oacute;nico"
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.pagina_web"
                        label="P&aacute;gina Web"
                        placeholder="Ingrese una p&aacute;gina web"
                        color="indigo"
                    ></v-text-field>
                    <v-select
                        v-model="datos.estado"
                        :items="estados"
                        item-title="title"
                        item-value="value"                    
                        density="compact"
                        label="Disponibilidad"
                        color="indigo"
                        clearable
                    ></v-select>
                </v-card-text>
                <br>
                <v-card-actions>
                    <v-btn
                        color="amber-accent-4"
                        @click="dialogOne = false"
                    >Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="purple-darken-3"
                        @click="editarRestaurante(datos.id_restaurante)"
                    >Actualizar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--Eliminar-->
        <v-dialog
            v-model="dialogTwo"
            transition="dialog-top-transition"
            width="400"
        >
            <v-card title="Eliminar">  
                <br>
                <v-card-text>
                    Est&aacute; seguro de eliminar este registro?
                </v-card-text>
                <br>
                <v-card-actions>
                    <v-btn color="amber-accent-4" @click="dialogTwo = false">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red-accent-4" @click="eliminarRestaurante">Eliminar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';

import NavigationDrawerComponent from '@/components/NavigationDrawerComponent.vue';

export default {
    components:{
        NavigationDrawerComponent
    },
    data() {
        return {
            estados: [
                {
                    title: 'Activo', value: 'A',
                },
                {
                    title: 'Inactivo', value: 'I',
                },
            ],
            listaMunicipio: [],
            listaRestaurante: [],
            restaurante: {},
            idEliminar: null,
            datos: {},
            dialogOne: false,
            dialogTwo: false,
            alertaEstado: false,
            mensaje: '',
        }
    },
    methods: {
        obtenerMunicipio(){
            axios.get('http://localhost:8000/api/get-municipios')
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaMunicipio = response.data.data;
            })
        },
        obtenerRestaurantes(){

            let headerRestaurantes = {
                params: {
                    opcion: 1,
                    estado: 'A',
                }
            }

            axios.get('http://127.0.0.1:8000/api/get-restaurantes', headerRestaurantes)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaRestaurante = response.data.data;

            })
        },
        obtenerRestaurante(id, action){
            if (action == 1) {
                let headerById = {
                    params: {
                        opcion: 2,
                        idrestaurante: id
                    }
                }

                axios.get('http://127.0.0.1:8000/api/get-restaurantes', headerById)
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    this.datos = response.data.data;
                    this.dialogOne = true;
                });
            } else {
                this.dialogTwo = true;
                this.idEliminar = id;
            }
        },
        agregarRestaurante(){
            this.restaurante.usuario_creacion = 'root';
            axios.post('http://127.0.0.1:8000/api/save-restaurante', this.restaurante)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.alertaEstado = true
                this.mensaje = response.data.data
                this.obtenerRestaurante()
                this.restaurante = {}
            })
        },
        editarRestaurante(id){
            this.datos.usuario_creacion = 'root';
            axios.put(`http://127.0.0.1:8000/api/update-restaurante/${id}`, this.datos)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerRestaurantes()
                this.dialogOne = false
                this.alertaEstado = true
                this.mensaje = response.data.data
            })
        },
        eliminarRestaurante(){
            axios.put(`http://127.0.0.1:8000/api/delete-restaurante/${this.idEliminar}`)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.alertaEstado = true
                this.mensaje = response.data.data
                this.obtenerRestaurantes()
                this.dialogTwo = false;
            })
        }
    },
    created() {
        this.obtenerMunicipio();
        this.obtenerRestaurantes();
    },
}
</script>

<style>

</style>