<template>
    <v-container>
        <h1>Formulario de Clasificación de Menú</h1>
        <v-card>
            <v-container>
                <v-form v-model="validar">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="clasif"
                                label="Clasificaci&oacute;n"
                                color="indigo"
                                placeholder="Ingrese una clasificaci&oacute;n"
                            ></v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field
                                v-model="descripcion"
                                label="Descripci&oacute;n"
                                color="indigo"
                                placeholder="Ingrese una descripci&oacute;n"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Ingrese un icono"
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
                                    <th>Clasificaci&oacute;n</th>
                                    <th>Descripci&oacute;n</th>
                                    <th>Icono</th>
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
            items: ["Activo", "Inactivo", "Eliminado"]
        }
    },
}
</script>

<style>

</style>