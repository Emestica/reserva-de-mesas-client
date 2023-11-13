<template>
    <v-container>
        <h1>Formulario de Restaurantes</h1>
        <v-card>
            <v-container>
                <v-form v-model="validar">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select
                                :items="departamento"
                                density="compact"
                                color="indigo"
                                label="Seleccione un Departamento"
                                clearable
                            ></v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select
                                :items="municipio"
                                density="compact"
                                color="indigo"
                                label="Seleccione un Municipio"
                                clearable
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="name_legal"
                                label="Nombre Legal"
                                placeholder="Ingrese un Nombre Legal"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="name"
                                label="Nombre"
                                placeholder="Ingrese el Nombre del Restaurante"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="descripcion"
                                label="Descripci&oacute;n"
                                placeholder="Ingrese una Descripci&oacute;n"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="direccion"
                                label="Direcci&oacute;n"
                                placeholder="Ingrese una Direcci&oacute;n"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="telf"
                                label="Tel&eacute;fono"
                                placeholder="Ingrese un N&uacute;mero Telef&oacute;nico"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="email"
                                label="Correo Electr&oacute;nico"
                                placeholder="Ingrese un Correo Electr&oacute;nico"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="web"
                                label="P&aacute;gina Web"
                                placeholder="Ingrese su P&aacute;gina Web"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                                :items="items"
                                density="compact"
                                color="indigo"
                                label="Seleccione un Estado"
                                clearable
                            ></v-select>
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
                                    <th>Departamento</th>
                                    <th>Municipio</th>
                                    <th>Nombre Legal</th>
                                    <th>Nombre de Restaurante</th>
                                    <th>Descripci&oacute;n</th>
                                    <th>Direcci&oacute;n</th>
                                    <th>Tel&eacute;fono</th>
                                    <th>Correo</th>
                                    <th>P&aacute;gina Web</th>
                                    <th>Estado</th>
                                    <th></th>
                                    <th>Opciones</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </v-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
//import axios from 'axios';
export default {
    data() {
        return {
            validar: false,
            items: ["Activo", "Inactivo", "Eliminado"],
            departamento: ["La Libertad", "San Salvador", "Ahuachapan"],
            municipio: ["Santa Tecla", "Apopa", "Ataco"],
        }
    },
}
</script>

<style>

</style>