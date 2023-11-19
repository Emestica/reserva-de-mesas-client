<template>
    <v-container>
        <h1>Formulario de Clasificación de Menú</h1>
        <v-card>
            <v-container>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="clasifn.clasificacion"
                                label="Clasificaci&oacute;n"
                                color="indigo"
                                placeholder="Ingrese una clasificaci&oacute;n"
                            ></v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field
                                v-model="clasifn.descripcion"
                                label="Descripci&oacute;n"
                                color="indigo"
                                placeholder="Ingrese una descripci&oacute;n"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider class="mb-2"></v-divider>
                    <v-row>
                        <v-col cols="12" md="12">
                            <div class="text-end">
                                <v-btn type="button" class="mt-2 green" color="green-darken-3" @click="agregarClasif">Guardar</v-btn>
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
                                    <th>Clasificaci&oacute;n</th>
                                    <th>Descripci&oacute;n</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listaClasif" :key="item.id_clasificacion">
                                    <td>{{ item.id_clasificacion }}</td>
                                    <td>{{ item.clasificacion }}</td>
                                    <td>{{ item.descripcion }}</td>
                                    <td>
                                        <div v-if="item.estado === 'A'">Activo</div>
                                        <div v-if="item.estado === 'I'">Inactivo</div>
                                        <div v-if="item.estado === 'E'">Eliminado</div>
                                    </td>
                                    <td>
                                        <v-btn icon="mdi-pencil" color="green" @click="obtenerClasificacion(item.id_clasificacion, 1)"></v-btn>
                                        <v-btn icon="mdi-delete" color="red" @click="obtenerClasificacion(item.id_clasificacion, 2)"></v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <v-snackbar v-model="alertaEstado" color="blue-accent-1" timeout="3000">
            {{ mensaje }}
        </v-snackbar>

        <!--Editar-->
        <v-dialog
            v-model="dialogOne"
            transition="dialog-top-transition"
            width="600"
        >
            <v-card title="Editar" subtitle="Datos de la clasificaci&oacute;n">
                <v-card-text>
                    <v-text-field
                        v-model="datos.clasificacion"
                        label="Clasificaci&oacute;n"
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.descripcion"
                        label="Descripci&oacute;n"
                        color="indigo"
                    ></v-text-field>
                    <v-select
                        v-model="datos.estado"
                        :items="estados"
                        item-title="title"
                        item-value="value"
                        density="compact"
                        label="Estado"
                        color="indigo"
                        clearable
                    ></v-select>
                </v-card-text>
                <br>
                <v-card-actions>
                    <v-btn color="amber-accent-4" @click="dialogOne = false">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="purple-darken-3" @click="editarClasificacion(datos.id_clasificacion)">Actualizar</v-btn>
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
                    <v-btn color="red-accent-4" @click="eliminarClasificacion">Eliminar</v-btn>
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
                },
            ],
            listaClasif:[],
            clasifn: {},
            idEliminar: null,
            dialogOne: false,
            dialogTwo: false,
            datos: {},
            alertaEstado: false,
            mensaje: '',
        }
    },
    methods: {
        obtenerClasificaciones(){
            let header = {
                params:{
                    opcion: 1,
                    estado: 'A'
                }
            };
            axios.get('http://127.0.0.1:8000/api/get-clasificaciones', header)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaClasif = response.data.data;
            });
        },
        obtenerClasificacion(id, action){
            if (action == 1) {
                let headerById = {
                    params: {
                        opcion: 2,
                        idclasificacion: id
                    }
                }

                axios.get('http://127.0.0.1:8000/api/get-clasificaciones', headerById)
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
        agregarClasif(){
            this.clasifn.usuario_creacion = 'root';
            axios.post('http://127.0.0.1:8000/api/save-clasificacion', this.clasifn)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.alertaEstado = true
                this.mensaje = response.data.data
                this.obtenerClasificaciones()
                this.clasifn = {}
            })
        },
        editarClasificacion(id){
            this.datos.usuario_modificacion = 'root';
            axios.put(`http://127.0.0.1:8000/api/update-clasificacion/${id}`, this.datos)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerClasificaciones()
                this.dialogOne = false
                this.alertaEstado = true
                this.mensaje = response.data.data
            })
        },
        eliminarClasificacion(){
            axios.put(`http://127.0.0.1:8000/api/delete-clasificacion/${this.idEliminar}`)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.alertaEstado = true
                this.mensaje = response.data.data
                this.obtenerClasificaciones()
                this.dialogTwo = false;
            })
        }
    },
    created() {
        this.obtenerClasificaciones();
    },
}
</script>

<style>

</style>