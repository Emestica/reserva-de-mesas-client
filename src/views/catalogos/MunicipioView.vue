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
                                @click="agregarClasif">Guardar</v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
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
            listaMunicipios: [],
            listaDepartamentos: [],
            municipio: {},
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
            axios.get('http://127.0.0.1:8000/api/get-municipios')
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    this.listaMunicipios = response.data.data;
                })
        },
        agregarMunicipio() {
            this.municipio.usuario_creacion = 'root'
            axios.post('http://127.0.0.1:8000/api/save-municipio', this.municipio)
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    console.log(response);
                    this.obtenerMunicipios()
                    this.municipio = {}
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