<template>
    <NavigationDrawerComponent></NavigationDrawerComponent>
    <v-container>
        <h1>Formulario de Roles</h1>
        <v-card>
            <v-container>
                <v-form>
                    <v-row>

                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="roles.rol"
                                label="Rol"
                                color="indigo"
                                placeholder="Ingrese un Rol"
                                required
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="roles.descripcion"
                                label="Descripcion"
                                required
                                color="indigo"
                                placeholder="Ingrese una descripci&oacute;n"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-divider class="mb-2"></v-divider>
                    <v-row>
                        <v-col cols="12" md="12">
                            <div class="text-end">
                                <v-btn type="button" class="mt-2 green" color="green-darken-3" @click="agregarRol">Guardar</v-btn>
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
                                    <th>Rol</th>
                                    <th>Descripci&oacute;n</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listado" :key="item.id_rol">
                                    <td>{{ item.id_rol }}</td>
                                    <td>{{ item.rol }}</td>
                                    <td>{{ item.descripcion }}</td>
                                    <td> 
                                        <div v-if="item.estado === 'A'">Activo</div> 
                                        <div v-else-if="item.estado === 'I'">Inactivo</div>
                                        <div v-else-if="item.estado === 'E'">Eliminado</div>
                                        <div v-else>{{ item.estado }}</div>
                                    </td>
                                    <td>
                                        <v-btn icon="mdi-pencil" color="green" @click="obtenerRol(item.id_rol, 1)"></v-btn>
                                        <v-btn icon="mdi-delete" color="red" @click="obtenerRol(item.id_rol, 2)"></v-btn>
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
            <v-card title="Editar" subtitle="Datos del rol">
                <v-card-text>
                    <v-text-field
                        v-model="datos.rol"
                        label="Rol"
                        color="indigo"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.descripcion"
                        label="Descripci&oacute;n"
                        required
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
                    <v-btn
                        color="amber-accent-4"
                        @click="dialogOne = false"
                    >Cancelar</v-btn>

                    <v-spacer></v-spacer>

                    <v-btn
                        color="purple-darken-3"
                        @click="editarRol(datos.id_rol)"
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
                    <v-btn color="red-accent-4" @click="eliminarRol">Eliminar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';

import NavigationDrawerComponent from '@/components/NavigationDrawerComponent.vue';

export default {
    components: {
        NavigationDrawerComponent,
    },
    data(){
        return {
            estados: [
                {
                    title: 'Activo', value: 'A',
                },
                {
                    title: 'Inactivo', value: 'I',
                },
            ],
            roles: {},
            listado: [],
            idEliminar: null,
            dialogOne: false,
            dialogTwo: false,
            datos: {},
            alertaEstado: false,
            mensaje: '',
        }
    },
    methods: {
        obtenerRoles(){

            let headerRoles = {
                params: {
                    opcion: 1,
                    estado: 'A'
                }
            }

            axios.get('http://127.0.0.1:8000/api/get-roles', headerRoles)
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                this.listado = response.data.data;
            });
        },
        obtenerRol(id, action){
            if (action == 1) {
                let headerById = {
                    params: {
                        opcion: 2,
                        idrol: id
                    }
                }

                axios.get('http://127.0.0.1:8000/api/get-roles', headerById)
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
        agregarRol(){
            this.roles.usuario_creacion = 'root';
            axios.post('http://127.0.0.1:8000/api/save-rol', this.roles)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.alertaEstado = true
                this.mensaje = response.data.data
                this.obtenerRoles()
                this.roles = {}
            })
        },
        editarRol(id){
            this.datos.usuario_modificacion = 'root';
            axios.put(`http://127.0.0.1:8000/api/update-rol/${id}`, this.datos)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerRoles()
                this.dialogOne = false
                this.alertaEstado = true
                this.mensaje = response.data.data
            })
        },
        eliminarRol(){
            axios.put(`http://127.0.0.1:8000/api/delete-rol/${this.idEliminar}`)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.alertaEstado = true
                this.mensaje = response.data.data
                this.obtenerRoles()
                this.dialogTwo = false;
            })
        }
    },
    created() {
        this.obtenerRoles();
    }
}
</script>

<style>
</style>