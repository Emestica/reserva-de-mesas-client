<template>
    <v-container>
        <h1>Formulario de Mesas</h1>
        <v-card>
            <v-container>
                <v-form v-model="validar">
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
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="mesas.descripcion"
                                label="Descripci&oacute;n"
                                placeholder="Ingrese una descripci&oacute;n"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="mesas.numero"
                                label="N&uacute;mero"
                                placeholder="Ingrese un N&uacute;mero"
                                color="indigo"
                                type="number"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
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
            validar: false,
            // items: ["Activo", "Inactivo", "Eliminado"],
            // rest: ["Pizza Hut", "Wendy's", "MacDonald's"],
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
            header: {
                params:{
                    opcion: 1,
                    estado: 'A',
                    idrestaurante: 1,
                }
            },
            mesas: {},
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
            axios.get('http://127.0.0.1:8000/api/get-mesas', this.header)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaMesas = response.data.data;
            })
        },
        agregarMesa(){
            this.mesas.usuario_creacion = 'root';
            axios.post('http://127.0.0.1:8000/api/save-mesa', this.mesas)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerMesas()
                this.mesas = {}
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