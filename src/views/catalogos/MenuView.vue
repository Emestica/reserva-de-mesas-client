<template>
    <v-container>
        <h1>Formulario de Menú</h1>
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
                            <v-select
                                :items="clasif"
                                density="compact"
                                color="indigo"
                                label="Seleccione una Clasificaci&oacute;n"
                                clearable
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select
                                :items="tpmenu"
                                density="compact"
                                color="indigo"
                                label="Seleccione un Tipo de Menú"
                                clearable
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="descripcion"
                                label="Descripci&oacute;n"
                                color="indigo"
                                placeholder="Ingrese una descripcion"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Icono"
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
                                    <th>Restaurante</th>
                                    <th>Clasificaci&oacute;n</th>
                                    <th>Tipo de Men&uacute;</th>
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
            rest: ["Pizza Hut", "Wendy's", "MacDonald's"],
            clasif: ["Comida Rapida", "Mexicana", "Tipicos"],
            tpmenu: ["Desayuno", "Almuerzo", "Cena", "Bebidas"],
            items: ["Activo", "Inactivo", "Eliminado"],
        }
    },
}
</script>

<style>

</style>