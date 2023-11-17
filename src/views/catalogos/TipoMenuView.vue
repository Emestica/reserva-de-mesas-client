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
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="tipomenu.icon"
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
                                    <th>Icono</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listaTipoMenus" :key="item.id_tipo_menu">
                                    <td>{{ item.id_tipo_menu }}</td>
                                    <td>{{ item.tipo_menu }}</td>
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
            listaTipoMenus: [],
            tipomenu: {},
        }
    },
    methods: {
        obtenerTipoMenus(){
            axios.get('http://127.0.0.1:8000/api/get-tipo-menu')
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaTipoMenus = response.data.data;
            });
        },
        agregarTipoMenu(){
            this.tipomenu.usuario_creacion = 'root';
            axios.post('http://127.0.0.1:8000/api/save-tipo-menu', this.tipomenu)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerTipoMenus()
                this.tipomenu = {}
            })
        }
    },
    created() {
        this.obtenerTipoMenus();
    },
}
</script>

<style></style>