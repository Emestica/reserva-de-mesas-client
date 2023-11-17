<template>
    <v-container>
        <h1>Formulario de Clientes</h1>
        <v-card>
            <v-container>
                <v-form>
                    <v-row>

                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="persona.nombres"
                                label="Nombre"
                                maxLength="25"
                                color="indigo"
                                placeholder="Ingrese los Nombres"
                                required
                            >
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="persona.apellidos"
                                label="Apellidos"
                                maxLength="25"                        
                                color="indigo"                                
                                placeholder="Ingrese los Apellidos"
                                required
                            >
                            </v-text-field>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="persona.correo_electronico"
                                label="Correo Electr&oacute;nico"   
                                color="indigo"                                
                                placeholder="Ingrese el Correo"
                                required                                
                            >
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-text-field
                                v-model="persona.telefono"
                                label="Tel&eacute;fono Fijo"
                                maxLength="9"                                
                                color="indigo"                                
                                placeholder="Ingrese un teléfono Fijo"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-text-field
                                v-model="persona.celular"
                                label="Tel&eacute;fono Celular"
                                maxLength="9"                        
                                color="indigo"                                
                                placeholder="Ingrese un teléfono Celular"
                                required
                            ></v-text-field>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="persona.direccion"
                                label="Direcci&oacute;n"
                                color="indigo"
                                placeholder="Ingrese una Direcci&oacute;n"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select
                                v-model="persona.id_tipo_persona"
                                :items="listaTipoPersona"
                                item-value="id_tipo_persona"
                                item-title="tipo_persona"
                                density="compact"
                                color="indigo"
                                label="Seleccione un Tipo de Usuario"
                                clearable
                            ></v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field label="Fecha de Nacimiento"></v-text-field>
                        </v-col>

                        <v-col cols="6" md="3">
                            <v-text-field
                                v-model="persona.edad"
                                label="Edad"
                                type="number"
                                color="indigo"
                            ></v-text-field>
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
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Correo</th>
                                    <th>Tel&eacute;fono Fijo</th>
                                    <th>Tel&eacute;fono Celular</th>
                                    <th>Direcci&oacute;n</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th>Edad</th>
                                    <th>Tipo de Usuario</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listaPersona" :key="item.id_persona">
                                    <td>{{ item.id_persona }}</td>
                                    <td>{{ item.nombres }}</td>
                                    <td>{{ item.apellidos }}</td>
                                    <td>{{ item.correo_electronico }}</td>
                                    <td>{{ item.telefono }}</td>
                                    <td>{{ item.celular }}</td>
                                    <td>{{ item.direccion }}</td>
                                    <td>{{ item.fecha_nacimiento }}</td>                                    
                                    <td>{{ item.edad }}</td>
                                    <td>{{ item.tipo_persona }}</td>
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
//import { VDatePicker } from 'vuetify/lib/labs/components.mjs';

export default {
    components:{
        
    },
    data(){
        return {
            listaPersona: [],
            listaTipoPersona: [],
            header: {
                params: {
                    opcion: 0,
                }
            },
            persona: {},
        }
    },
     methods: {
        obtenerTipoPersonas(){
            axios.get('http://127.0.0.1:8000/api/get-tipo-personas')
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                this.listaTipoPersona = response.data.data;
                console.log(this.listaTipoPersona);
            });
        },
        obtenerPersonas(){
            axios.get('http://127.0.0.1:8000/api/get-personas', this.header)
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                this.listaPersona = response.data.data;
                console.log(this.listaPersona);
            });
        },
        agregarPersona(){
            this.persona.usuario_creacion = 'root';
            axios.post('http://127.0.0.1:8000/api/save-persona', this.persona)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerPersonas()
                this.persona = {}
            })
        }
     },
     created() {
         this.obtenerPersonas();
         this.obtenerTipoPersonas();
     }
}
</script>

<style>
</style>