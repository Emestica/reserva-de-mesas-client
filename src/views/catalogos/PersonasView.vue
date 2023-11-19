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
                                counter
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
                                counter
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
                            <v-text-field 
                                label="Fecha de Nacimiento"
                                type="date"
                                v-model="persona.fecha_nacimiento">
                            </v-text-field>
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
                                <v-btn type="button" class="mt-2 green" color="green-darken-3" v-on:click="agregarPersona()">Guardar</v-btn>
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
                                        <v-btn icon="mdi-pencil" color="green" @click="obtenerPersona(item.id_persona, 1)"></v-btn>
                                        <v-btn icon="mdi-delete" color="red" @click="obtenerPersona(item.id_persona, 2)"></v-btn>
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
            <v-card title="Editar" subtitle="Datos de la persona">
                <v-card-text>
                    <v-text-field
                        v-model="datos.nombres"
                        label="Nombre"
                        maxLength="25"
                        color="indigo"
                        placeholder="Ingrese los Nombres"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.apellidos"
                        label="Apellidos"
                        maxLength="25"                        
                        color="indigo"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.correo_electronico"
                        label="Correo Electr&oacute;nico"
                        maxLength="200"   
                        color="indigo"
                        required                                
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.telefono"
                        label="Tel&eacute;fono Fijo"
                        maxLength="9"                                
                        color="indigo"
                        required
                        counter
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.celular"
                        label="Tel&eacute;fono Celular"
                        maxLength="9"                        
                        color="indigo"
                        required
                        counter
                    ></v-text-field>
                    <v-text-field
                        v-model="datos.direccion"
                        label="Direcci&oacute;n"
                        color="indigo"
                        required
                    ></v-text-field>
                    <v-select
                        v-model="datos.id_tipo_persona"
                        :items="listaTipoPersona"
                        item-value="id_tipo_persona"
                        item-title="tipo_persona"
                        density="compact"
                        color="indigo"
                        label="Seleccione un Tipo de Usuario"
                        clearable
                        required
                    ></v-select>
                    <v-text-field 
                        label="Fecha de Nacimiento"
                        type="date"
                        v-model="datos.fecha_nacimiento">
                    </v-text-field>
                    <v-text-field
                        v-model="datos.edad"
                        label="Edad"
                        type="number"
                        color="indigo"
                        required
                    ></v-text-field>
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
                        @click="editarPersona(datos.id_persona)"
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
                    <v-btn color="red-accent-4" @click="eliminarPersona">Eliminar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    data(){
        return {
            listaPersona: [],
            listaTipoPersona: [],
            header: {
                params: {
                    opcion: 0,
                }
            },
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
            persona: {},
            idEliminar: null,
            datos: {},
            dialogOne: false,
            dialogTwo: false,
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
        obtenerPersona(id, action){
            if (action == 1) {
                let headerById = {
                    params: {
                        opcion: 2,
                        idpersona: id
                    }
                }

                axios.get('http://127.0.0.1:8000/api/get-personas', headerById)
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
        agregarPersona(){

            this.persona.usuario_creacion = 'root';
            this.persona.fecha_nacimiento = moment(this.persona.fecha_nacimiento).format('YYYY-MM-DD');
            console.log(this.persona);


            axios.post('http://127.0.0.1:8000/api/save-persona', this.persona)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerPersonas()
                this.persona = {}
            })
        },
        editarPersona(id){
            this.datos.usuario_modificacion = 'root';
            this.datos.fecha_nacimiento = moment(this.persona.fecha_nacimiento).format('YYYY-MM-DD');
            console.log(this.datos);

            axios.put(`http://127.0.0.1:8000/api/update-persona/${id}`, this.datos)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerPersonas()
                this.dialogOne = false
            })
        },
        eliminarPersona(){
            axios.put(`http://127.0.0.1:8000/api/delete-persona/${this.idEliminar}`)
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                console.log(response);
                this.obtenerPersonas()
                this.dialogTwo = false;
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