<template>
    <v-container>
        <h1>Formulario de Tipos de Men&uacute;s</h1>
        <br>
        <v-card>
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="tipomenu.tipo_menu"
                            label="Tipo de men&uacute;"
                            color="indigo"
                            placeholder="Ingrese un tipo de men&uacute;"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="tipomenu.descripcion"
                            label="Descripci&oacute;n"
                            color="indigo"
                            placeholder="Ingrese una descripci&oacute;n"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-divider class="mb-2"></v-divider>
                    <v-row>
                        <v-col cols="12" md="12">
                            <div class="text-end">
                                <v-btn type="button" class="mt-2 green" color="green-darken-3" @click="agregarTipoMenu">Guardar</v-btn>
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
                                    <th>Tipo de men&uacute;</th>
                                    <th>Descripci&oacute;n</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listaTipoMenus" :key="item.id_tipo_menu">
                                    <td>{{ item.id_tipo_menu }}</td>
                                    <td>{{ item.tipo_menu }}</td>
                                    <td>{{ item.descripcion }}</td>
                                    <td>
                                        <div v-if="item.estado === 'A'">Activo</div>
                                        <div v-if="item.estado === 'I'">Inactivo</div>
                                        <div v-if="item.estado === 'E'">Eliminado</div>
                                    </td>
                                    <td>
                                        <v-btn icon="mdi-pencil" color="green" @click="obtenerTipoMenu(item.id_tipo_menu, 1)"></v-btn>
                                        <v-btn icon="mdi-delete" color="red" @click="obtenerTipoMenu(item.id_tipo_menu, 2)"></v-btn>
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
            width="500"
        >
            <v-card title="Editar" subtitle="Datos del tipo de men&uacute;">
                <v-card-text>
                    <v-text-field
                        v-model="datos.tipo_menu"
                        label="Tipo de men&uacute;"
                        color="indigo"
                        placeholder="Ingrese un tipo de men&uacute;"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.descripcion"
                        label="Descripci&oacute;n"
                        color="indigo"
                        placeholder="Ingrese una descripci&oacute;n"
                        required
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
                        @click="editarTipoMenu(datos.id_tipo_menu)"
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
                    <v-btn color="red-accent-4" @click="eliminarTipoMenu">Eliminar</v-btn>
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
            idEliminar: null,
            listaTipoMenus: [],
            tipomenu: {},
            datos: {},
            dialogOne: false,
            dialogTwo: false,
            alertaEstado: false,
            mensaje: '',
            estados: [
                {
                    title: 'Activo', value: 'A',
                },
                {
                    title: 'Inactivo', value: 'I',
                },
            ]
        }
    },
    methods: {
        obtenerTipoMenus(){

            let headerTipoMenus = {
                params: {
                    opcion: 1,
                    estado: 'A',
                }
            }

            axios.get('http://127.0.0.1:8000/api/get-tipo-menu', headerTipoMenus)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaTipoMenus = response.data.data;
            });
        },
        obtenerTipoMenu(id, action){
            if (action == 1) {

                let headerById = {
                    params:{
                        opcion: 2,
                        idtipomenu: id
                    }
                }

                axios.get('http://127.0.0.1:8000/api/get-tipo-menu', headerById)
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
        agregarTipoMenu(){
            this.tipomenu.icon = 'icon';
            this.tipomenu.usuario_creacion = 'root';
            axios.post('http://127.0.0.1:8000/api/save-tipo-menu', this.tipomenu)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.alertaEstado = true
                this.mensaje = response.data.data
                this.obtenerTipoMenus()
                this.tipomenu = {}
            })
        },
        editarTipoMenu(id){
            this.datos.icon = 'icon'
            this.datos.usuario_modificacion = 'root';
            axios.put(`http://127.0.0.1:8000/api/update-tipo-menu/${id}`, this.datos)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerTipoMenus()
                this.dialogOne = false
                this.alertaEstado = true
                this.mensaje = response.data.data
            })
        },
        eliminarTipoMenu(){
            axios.put(`http://127.0.0.1:8000/api/delete-tipo-menu/${this.idEliminar}`)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.alertaEstado = true
                this.mensaje = response.data.data
                this.obtenerTipoMenus()
                this.dialogTwo = false;
            })
        }
    },
    created() {
        this.obtenerTipoMenus();
    },
}
</script>

<style></style>