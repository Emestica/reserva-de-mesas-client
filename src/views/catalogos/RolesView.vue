<template>
    <v-container>
        <v-card>
            <v-container>
                <v-form v-model="validar">
                    <v-row>

                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="rol"
                                label="Rol"
                                color="indigo"
                                placeholder="Ingrese un Rol"
                                required
                            >
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select
                                :items="estado"
                                colo="indigo"
                                clearable
                                label="Seleccione un Estado"
                            ></v-select>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="descripcion"
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
                                <v-btn type="button" class="mt-2 green" color="green-darken-3">Guardar</v-btn>
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
                                    <th></th>
                                    <th>Opciones</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listado" :key="item.id_rol">
                                    <td>{{ item.id_rol }}</td>
                                    <td>{{ item.rol }}</td>
                                    <td>{{ item.descripcion }}</td>
                                    <td> 
                                        <div v-if="item.estado === 'A'">
                                            Activo
                                        </div> 
                                        <div v-else-if="item.estado === 'I'">
                                            Inactivo
                                        </div>
                                        <div v-else-if="item.estado === 'E'">
                                            Eliminado
                                        </div>
                                        <div v-else>
                                            {{ item.estado }}
                                        </div>
                                    </td>
                                    <td>
                                        <v-btn icon="mdi-eye" color="indigo"></v-btn>
                                    </td>
                                    <td>
                                        <v-btn icon="mdi-pencil" color="green"></v-btn>
                                    </td>
                                    <td>
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
    data(){
        return {
            validar: false,
            rol: '',
            descripcion: '',
            usuario_creacion: 'root',
            listado: [],
            //modo de prueba
            estado: ['Activo', 'Inactivo', 'Eliminado']
        }
    },
    methods: {
        obtenerRoles(){
            axios.get('http://127.0.0.1:8000/api/get-roles')
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                this.listado = response.data.data;
            });
        }
    },
    created() {
        this.obtenerRoles();
    }
}
</script>

<style>
</style>