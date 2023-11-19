<template>
    <v-container>
        <h1>Formulario de Mesas</h1>
        <v-card>
            <v-container>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select
                                v-model="mesas.id_restaurante"
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
                            <v-text-field
                                v-model="mesas.mesa"
                                label="Mesa"
                                color="indigo"
                                placeholder="Ingrese un numero mesa"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="mesas.descripcion"
                                label="Descripci&oacute;n"
                                placeholder="Ingrese una descripci&oacute;n"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field
                                v-model="mesas.numero"
                                label="N&uacute;mero"
                                placeholder="Ingrese un N&uacute;mero"
                                color="indigo"
                                type="number"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field
                                v-model="mesas.capacidad"
                                label="Capacidad"
                                placeholder="Ingrese una capacidad de asientos"
                                color="indigo"
                                type="number"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select
                                v-model="mesas.disponible"
                                :items="listaDisponibilidad"
                                item-value="value"
                                item-title="title"
                                density="compact"
                                label="Disponibilidad"
                                color="indigo"
                                clearable
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-divider class="mb-2"></v-divider>
                    <v-row>
                        <v-col cols="12" md="12">
                            <div class="text-end">
                                <v-btn type="button" class="mt-2 green" color="green-darken-3" @click="agregarMesa">Guardar</v-btn>
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
                                    <th>Mesa</th>
                                    <th>Descripci&oacute;n</th>
                                    <th>N&uacute;mero</th>
                                    <th>Capacidad</th>
                                    <th>Disponibilidad</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listaMesas" :key="item.id_mesa">
                                    <td>{{ item.id_mesa }}</td>
                                    <td>{{ item.restaurante }}</td>
                                    <td>{{ item.mesa }}</td>
                                    <td>{{ item.descripcion }}</td>
                                    <td>{{ item.numero }}</td>
                                    <td>{{ item.capacidad }}</td>
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
                                        <v-btn icon="mdi-pencil" color="green" @click="obtenerMesa(item.id_mesa, 1)"></v-btn>
                                        <v-btn icon="mdi-delete" color="red" @click="obtenerMesa(item.id_mesa, 2)"></v-btn>
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
            <v-card title="Editar" subtitle="Datos de mesa">
                <v-card-text>
                    <v-select
                        v-model="datos.id_restaurante"
                        :items="listaRestaurante"
                        item-value="id_restaurante"
                        item-title="restaurante"
                        density="compact"
                        color="indigo"
                        label="Seleccione un Restaurante"
                        clearable
                    ></v-select>
                    <v-text-field
                        v-model="datos.mesa"
                        label="Mesa"
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.descripcion"
                        label="Descripci&oacute;n"
                        color="indigo"
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.numero"
                        label="N&uacute;mero"
                        color="indigo"
                        type="number"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.capacidad"
                        label="Capacidad"
                        color="indigo"
                        type="number"
                        required
                    ></v-text-field>
                    <v-select
                        v-model="datos.disponible"
                        :items="listaDisponibilidad"
                        item-value="value"
                        item-title="title"
                        density="compact"
                        label="Disponibilidad"
                        color="indigo"
                        clearable
                        required
                    ></v-select>
                    <v-select
                        v-model="datos.estado"
                        :items="estados"
                        item-value="value"
                        item-title="title"
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
                        @click="editarMesa(datos.id_mesa)"
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
                    <v-btn color="red-accent-4" @click="eliminarMesa">Eliminar</v-btn>
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
            listaRestaurante: [],
            listaMesas: [],
            listaDisponibilidad: [
                {
                    title: 'Disponible', value: true,
                },
                {
                    title: 'No disponible', value: false,
                }
            ],
            estados: [
                {
                    title: 'Activo', value: 'A',
                },
                {
                    title: 'Inactivo', value: 'I',
                },
            ],
            mesas: {},
            idEliminar: null,
            dialogOne: false,
            dialogTwo: false,
            datos: {},
            alertaEstado: false,
            mensaje: '', 
        }
    },
    methods: {
        obtenerRestaurante(){
            axios.get('http://127.0.0.1:8000/api/get-restaurantes')
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaRestaurante = response.data.data;
            })
        },
        obtenerMesas(){

            let headerMesas = {
                params: {
                    opcion: 1,
                    estado: 'A',
                    idrestaurante: 1 
                }
            }

            axios.get('http://127.0.0.1:8000/api/get-mesas', headerMesas)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaMesas = response.data.data;
            })
        },
        obtenerMesa(id, action){
            if (action == 1) {
                let headerById = {
                    params: {
                        opcion: 2,
                        idmesa: id
                    }
                }

                axios.get('http://127.0.0.1:8000/api/get-mesas', headerById)
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
        agregarMesa(){
            this.mesas.usuario_creacion = 'root';
            axios.post('http://127.0.0.1:8000/api/save-mesa', this.mesas)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.alertaEstado = true
                this.mensaje = response.data.data
                this.obtenerMesas()
                this.mesas = {}
            })
        },
        editarMesa(id){
            this.datos.usuario_modificacion = 'root';
            axios.put(`http://127.0.0.1:8000/api/update-mesa/${id}`, this.datos)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerMesas()
                this.dialogOne = false
                this.alertaEstado = true
                this.mensaje = response.data.data
            })
        },
        eliminarMesa(){
            axios.put(`http://127.0.0.1:8000/api/delete-mesa/${this.idEliminar}`)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.alertaEstado = true
                this.mensaje = response.data.data
                this.obtenerMesas()
                this.dialogTwo = false;
            })
        }
    },
    created() {
        this.obtenerRestaurante();
        this.obtenerMesas();
    },
}
</script>

<style>

</style>