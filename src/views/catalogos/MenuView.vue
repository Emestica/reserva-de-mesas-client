<template>
    <v-container>
        <h1>Formulario de Menú</h1>
        <v-card>
            <v-container>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select
                                v-model="menu.id_restaurante"
                                :items="listaRestaurante"
                                item-value="id_restaurante"
                                item-title="restaurante"
                                density="compact"
                                color="indigo"
                                label="Seleccione un Restaurante"
                                clearable
                            ></v-select>
                        </v-col>

                        <v-col>
                            <v-select
                                v-model="menu.id_clasificacion"
                                :items="listaClasif"
                                item-value="id_clasificacion"
                                item-title="clasificacion"
                                density="compact"
                                color="indigo"
                                label="Seleccione una Clasificaci&oacute;n"
                                clearable
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select
                                v-model="menu.id_tipo_menu"
                                :items="listaTipoMenu"
                                item-value="id_tipo_menu"
                                item-title="tipo_menu"
                                density="compact"
                                color="indigo"
                                label="Seleccione un Tipo de Menú"
                                clearable
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="menu.nombre"
                                label="Nombre"
                                color="indigo"
                                placeholder="Ingrese un nombre"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>                        
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="menu.informacion"
                                label="Informaci&oacute;n"
                                color="indigo"
                                placeholder="Ingrese una informacion"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="menu.precio"
                                label="Precio"
                                color="indigo"
                                placeholder="Ingrese un precio"
                                type="number"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>                        
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="menu.descuento"
                                label="Descuento"
                                color="indigo"
                                placeholder="Ingrese un descuento"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                                v-model="menu.disponible"
                                :items="listadoDisponibilidad"
                                item-value="value"
                                item-title="title"
                                color="indigo"
                                density="compact"
                                label="Disponibilidad"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-divider class="mb-2"></v-divider>
                    <v-row>
                        <v-col cols="12" md="12">
                            <div class="text-end">
                                <v-btn type="button" class="mt-2 green" color="green-darken-3" @click="agregarMenu">Guardar</v-btn>
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
                                    <th>Restaurante</th>
                                    <th>Clasificaci&oacute;n</th>
                                    <th>Tipo de Men&uacute;</th>
                                    <th>Nombre</th>
                                    <th>Informaci&oacute;n</th>
                                    <th>Precio</th>
                                    <th>Descuento</th>
                                    <th>Disponibilidad</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listaMenu" :key="item.id_menu">
                                    <td>{{ item.id_menu }}</td>
                                    <td>{{ item.restaurante }}</td>
                                    <td>{{ item.clasificacion }}</td>
                                    <td>{{ item.tipo_menu }}</td>
                                    <td>{{ item.nombre }}</td>
                                    <td>{{ item.informacion }}</td>
                                    <td>{{ item.precio }}</td>
                                    <td>{{ item.descuento }}</td>
                                    <td>
                                        <div v-if="item.disponible === true">Disponible</div>
                                        <div v-if="item.disponible === false">No disponible</div>
                                    </td>
                                    <td>
                                        <div v-if="item.estado === 'A'">Activo</div>
                                        <div v-if="item.estado === 'I'">Inactivo</div>
                                        <div v-if="item.estado === 'E'">Eliminado</div>
                                    </td>
                                    <td>
                                        <v-btn icon="mdi-pencil" color="green" @click="obtenerMenu(item.id_menu, 1)"></v-btn>                                 
                                        <v-btn icon="mdi-delete" color="red" @click="obtenerMenu(item.id_menu, 2)"></v-btn>                                    
                                    </td>                                    
                                </tr>
                            </tbody>
                        </v-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <!--Editar-->
        <v-dialog
            v-model="dialogOne"
            transition="dialog-top-transition"
            width="600"
        >
            <v-card title="Editar" subtitle="Datos del men&uacute;">
                <v-card-text>
                    <v-select
                        v-model="datos.id_restaurante"
                        :items="listaRestaurante"
                        item-value="id_restaurante"
                        item-title="restaurante"
                        color="indigo"
                        label="Seleccione un Restaurante"
                        clearable
                    ></v-select>
                    <v-select
                        v-model="datos.id_clasificacion"
                        :items="listaClasif"
                        item-value="id_clasificacion"
                        item-title="clasificacion"
                        density="compact"
                        color="indigo"
                        label="Seleccione una Clasificaci&oacute;n"
                        clearable
                    ></v-select>
                    <v-select
                        v-model="datos.id_tipo_menu"
                        :items="listaTipoMenu"
                        item-value="id_tipo_menu"
                        item-title="tipo_menu"
                        density="compact"
                        color="indigo"
                        label="Seleccione un Tipo de Menú"
                        clearable
                    ></v-select>
                    <v-text-field
                        v-model="datos.nombre"
                        label="Nombre"
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.informacion"
                        label="Informaci&oacute;n"
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.precio"
                        label="Precio"
                        color="indigo"
                        placeholder="Ingrese un precio"
                        type="number"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.descuento"
                        label="Descuento"
                        color="indigo"
                    ></v-text-field>
                    <v-select
                        v-model="datos.disponible"
                        :items="listadoDisponibilidad"
                        item-value="value"
                        item-title="title"
                        color="indigo"
                        density="compact"
                        label="Disponibilidad"
                    ></v-select>
                </v-card-text>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            header: {
                params: {
                    opcion: 1,
                    estado: 'A',
                    idrestaurante: 1,
                }
            },
            listadoDisponibilidad: [{
                title: 'Activo', value: true,
            }, {
                title: 'Inactivo', value: false,
            }],
            estados: [
                {
                    title: 'Activo', value: 'A',
                },
                {
                    title: 'Inactivo', value: 'I',
                },
                {
                    title: 'Eliminado', value: 'E',
                },
            ],
            listaMenu: [],
            listaTipoMenu: [],
            listaRestaurante: [],
            listaClasif: [],
            menu: {},
            idEliminar: null,
            dialogOne: false,
            dialogTwo: false,
            datos: {},
            alertaEstado: false,
            mensaje: '',
        }
    },
    methods: {
        obtenerClasif(){
            axios.get('http://127.0.0.1:8000/api/get-clasificaciones')
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaClasif = response.data.data;
            })
        },
        obtenerRestaurante(){
            axios.get('http://127.0.0.1:8000/api/get-restaurantes')
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaRestaurante = response.data.data;
                console.log(response);
            })
        },
        obtenerMenus(){
            axios.get('http://127.0.0.1:8000/api/get-menus', this.header)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaMenu = response.data.data;
            })
        },
        obtenerMenu(id, action){
            if (action == 1) {

                let headerById = {
                    params:{
                        opcion: 2,
                        idmenu: id
                    }
                }

                axios.get('http://127.0.0.1:8000/api/get-menus', headerById)
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
        obtenerTipoMenu(){
            axios.get('http://127.0.0.1:8000/api/get-tipo-menu')
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaTipoMenu = response.data.data;
            })
        },
        agregarMenu(){
            // this.menu.id_restaurante = 1;
            // this.menu.id_clasificacion = 1;
            // this.menu.id_tipo_menu = 1;
            this.menu.usuario_creacion = 'root';
            axios.post('http://127.0.0.1:8000/api/save-menu', this.menu)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerMenus()
                this.menu = {}
            })
        },
        editarMenu(id){
            this.datos.usuario_modificacion = 'root';
            axios.put(`http://127.0.0.1:8000/api/update-menu/${id}`, this.datos)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerMenus()
                this.dialogOne = false
            })
        },
        eliminarMenu(){
            axios.put(`http://127.0.0.1:8000/api/delete-menu/${this.idEliminar}`)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerMenus()
                this.dialogTwo = false;
            })
        }
    },
    created() {
        this.obtenerMenus();
        this.obtenerClasif();
        this.obtenerRestaurante();
        this.obtenerTipoMenu();
    },
}
</script>

<style>

</style>