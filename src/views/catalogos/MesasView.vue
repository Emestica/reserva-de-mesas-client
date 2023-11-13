<template>
    <v-container>
        <h1>Formulario de Mesas</h1>
        <v-card>
            <v-container>
                <v-form v-model="validar">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select
                                :items="rest"
                                density="compact"
                                color="indigo"
                                label="Seleccione un Restaurante"
                                clearable
                            ></v-select>
                        </v-col>

                        <v-col>
                            <v-text-field
                                v-model="mesas"
                                label="Mesa"
                                color="indigo"
                                placeholder="Ingrese un numero mesa"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="descripcion"
                                label="Descripci&oacute;n"
                                placeholder="Ingrese una descripci&oacute;n"
                                color="indigo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="num"
                                label="N&uacute;mero"
                                placeholder="Ingrese un N&uacute;mero"
                                color="indigo"
                                type="number"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field
                                v-model="capacidad"
                                label="Capacidad"
                                placeholder="Ingrese una capacidad de asientos"
                                color="indigo"
                                type="number"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="disponible"
                                label="Disponibles"
                                placeholder="Ingrese una cantidad de mesas disponibles"
                                color="indigo"
                                type="number"
                            ></v-text-field>
                        </v-col>
                        <v-col>
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
                                    <th>Restaurante</th>
                                    <th>Mesa</th>
                                    <th>Descripci&oacute;n</th>
                                    <th>N&uacute;mero</th>
                                    <th>Capacidad</th>
                                    <th>Disponibles</th>
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
            rest: ["Pizza Hut", "Wendy's", "MacDonald's"],
        }
    },
}
</script>

<style>

</style>