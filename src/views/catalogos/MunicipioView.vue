<template>
    <v-container>
        <h1>Formulario de Municipios</h1>
        <br>
        <v-card>
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field 
                            v-model="municipio.municipio" 
                            label="Municipio" 
                            placeholder="Ingrese nombre del municipio"
                            color="indigo" 
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select 
                            v-model="municipio.id_departamento" 
                            :items="listaDepartamentos" 
                            item-value="id_departamento"
                            item-title="departamento" 
                            density="compact" 
                            color="indigo" 
                            label="Seleccione un departamento"
                            clearable 
                            required
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <div class="text-end">
                            <v-btn type="button" class="mt-2 green" color="green-darken-3"
                                @click="agregarMunicipio">Guardar</v-btn>
                        </div>
                    </v-col>
                </v-row>
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
                                    <th>Departamento</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listaMunicipios" :key="item.id_municipio">
                                    <td>{{ item.id_municipio }}</td>
                                    <td>{{ item.municipio }}</td>
                                    <td>{{ item.departamento }}</td>
                                    <td>
                                        <div v-if="item.estado === 'A'">Activo</div>
                                        <div v-if="item.estado === 'I'">Inactivo</div>
                                        <div v-if="item.estado === 'E'">Eliminado</div>
                                    </td>
                                    <td>
                                        <v-btn icon="mdi-pencil" color="green" @click="obtenerMunicipio(item.id_municipio, 1)"></v-btn>
                                        <v-btn icon="mdi-delete" color="red" ></v-btn>
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

        <v-dialog
            v-model="dialogOne"
            transition="dialog-top-transition"
            width="600"
        >
            <v-card title="Editar" subtitle="Datos del municipio">
                <v-card-text>
                    <v-text-field 
                        v-model="datos.municipio"
                        label="Municipio"
                        color="indigo" 
                        required
                    ></v-text-field>
                    <v-select 
                        v-model="datos.id_departamento" 
                        :items="listaDepartamentos" 
                        item-value="id_departamento"
                        item-title="departamento" 
                        density="compact" 
                        color="indigo" 
                        label="Departamento"
                        clearable 
                        required
                    ></v-select>
                    <v-select
                        v-model="datos.estado"
                        :items="estados"
                        item-value="value"
                        item-title="title"
                        color="indigo"
                        density="compact"
                        label="Estados"
                    ></v-select>
                </v-card-text>
                <br>
                <v-card-actions>
                    <v-btn color="amber-accent-4" @click="dialogOne = false">Cancelar</v-btn>

                    <v-spacer></v-spacer>

                    <v-btn color="purple-darken-3" @click="editarMunicipio(datos.id_municipio)">Actualizar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            estados: [
                {
                    title: 'Activo', value: 'A',
                },
                {
                    title: 'Inactivo', value: 'I',
                }
            ],
            listaMunicipios: [],
            listaDepartamentos: [],
            municipio: {},
            idEliminar: null,
            dialogOne: false,
            dialogTwo: false,
            datos: {},
            alertaEstado: false,
            mensaje: '',
        }
    },
    methods: {
        obtenerDepartamentos() {
            axios.get('http://127.0.0.1:8000/api/get-departamentos')
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaDepartamentos = response.data.data;
            })
        },
        obtenerMunicipios() {
            let headerMuncipios = {
                params: {
                    opcion: 3
                }
            };
            axios.get('http://127.0.0.1:8000/api/get-municipios', headerMuncipios)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response.data.data);
                this.listaMunicipios = response.data.data;
            })
        },
        obtenerMunicipio(id, action){
            if (action == 1) {

                let headerById = {
                    params:{
                        opcion: 2,
                        idmunicipio: id
                    }
                }

                axios.get('http://127.0.0.1:8000/api/get-municipios', headerById)
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    this.datos = response.data.data;
                    console.log(this.datos);
                    this.dialogOne = true;
                });
            } else {
                this.dialogTwo = true;
                this.idEliminar = id;
            }
        },
        agregarMunicipio() {
            this.municipio.usuario_creacion = 'root'
            axios.post('http://127.0.0.1:8000/api/save-municipio', this.municipio)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.alertaEstado = true
                this.mensaje = response.data.data
                this.obtenerMunicipios()
                this.municipio = {}
            })
        },
        editarMunicipio(id){
            this.datos.usuario_modificacion = 'root';
            axios.put(`http://127.0.0.1:8000/api/update-municipio/${id}`, this.datos)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerMunicipios()
                this.dialogOne = false
                this.alertaEstado = true
                this.mensaje = response.data.data
            })
        },
        eliminarMunicipio(){
            axios.put(`http://127.0.0.1:8000/api/delete-municipio/${this.idEliminar}`)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.alertaEstado = true
                this.mensaje = response.data.data
                this.obtenerMunicipios()
                this.dialogTwo = false;
            })
        }
    },
    created() {
        this.obtenerMunicipios();
        this.obtenerDepartamentos();
    },
}
</script>

<style></style>