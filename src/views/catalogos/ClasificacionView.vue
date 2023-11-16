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
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="clasifn.icon"
                                label="Ingrese un icono"
                                color="indigo"
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
                                    <th>Icono</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listaClasif" :key="item.id_clasificacion">
                                    <td>{{ item.id_clasificacion }}</td>
                                    <td>{{ item.clasificacion }}</td>
                                    <td>{{ item.descripcion }}</td>
                                    <td>{{ item.icon }}</td>
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
            listaClasif:[],
            clasifn: {},
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
            });
        },
        agregarClasif(){
            this.clasifn.usuario_creacion = 'root';
            axios.post('http://127.0.0.1:8000/api/save-clasificacion', this.clasifn)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerClasif()
                this.clasifn = {}
            })
        }
    },
    created() {
        this.obtenerClasif();
    },
}
</script>

<style>

</style>