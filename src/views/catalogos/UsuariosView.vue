<template>
    <v-container>
        <h1>Formulario de Usuarios</h1>
        <v-card>
            <v-container>
                <v-form v-model="validar">
                    <v-row>

                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="usuario"
                                label="Usuario"
                                maxLength="25"
                                color="indigo"
                                placeholder="Ingrese un Nombre de Usuario"
                                required
                            >
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="pass"
                                label="Contraseña"
                                type="password"                       
                                color="indigo"                                
                                placeholder="Ingrese una Contraseña"
                                required
                            >
                            </v-text-field>
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="email"
                                label="Correo Electr&oacute;nico"   
                                color="indigo"                                
                                placeholder="Ingrese el Correo"
                                required                                
                            >
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-select
                                :items="estado"
                                density="compact"
                                color="indigo"
                                label="Seleccione un Estado"
                                clearable
                            ></v-select>
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
                                    <th>Usuario</th>
                                    <th>Correo Electr&oacute;nico</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </v-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

    </v-container>
</template>

<script>
export default {
    data() {
        return {
            //solamente de prueba
            estado: ['Activo', 'Eliminado', 'Inactivo']
        }
    },
}
</script>