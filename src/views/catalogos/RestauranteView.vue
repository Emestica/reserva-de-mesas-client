<template>
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
                                item-title="departamento"
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
                                        <v-btn icon="mdi-pencil" color="green"></v-btn>
                                        <v-btn icon="mdi-delete" color="red"></v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {            
            header:{
                params:{
                    opcion: 4
                }
            },
            listaMunicipio: [],
            listaRestaurante: [],
            restaurante: {},
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
        obtenerRestaurante(){
            axios.get('http://127.0.0.1:8000/api/get-restaurantes', this.header)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaRestaurante = response.data.data;

            })
        },
        agregarRestaurante(){
            this.restaurante.usuario_creacion = 'root';
            axios.post('http://127.0.0.1:8000/api/save-restaurante', this.restaurante)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerRestaurante()
                this.restaurante = {}
            })
        }
    },
    created() {
        this.obtenerMunicipio();
        this.obtenerRestaurante();
    },
}
</script>

<style>

</style>