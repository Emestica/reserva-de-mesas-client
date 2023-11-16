<template>
    <v-container>
        <h1>Reservaciones</h1>
        <v-card>
            <v-container>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Mesa</th>
                                    <th>C&oacute;digo</th>
                                    <th>Fecha</th>
                                    <th>Hora Inicio</th>
                                    <th>Hora Fin</th>
                                    <th>Notas</th>
                                    <th>Estatus</th>
                                    <th>Valoraci&oacute;n</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in listaReservacion" :key="item.id_reservacion">
                                   <td>{{ item.id_reservacion }}</td> 
                                   <td>{{ item.mesa }}</td>
                                   <td>{{ item.codigo_reservacion }}</td> 
                                   <td>{{ item.fecha_reservacion }}</td> 
                                   <td>{{ item.hora_inicio }}</td> 
                                   <td>{{ item.hora_fin }}</td> 
                                   <td>{{ item.notas }}</td> 
                                   <td>{{ item.estatus_reservacion }}</td> 
                                   <td>{{ item.valoracion }}</td> 
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
            listaReservacion: [],
            listaMesas: [],
        }
    },
    methods: {
        obtenerReservaciones(){
            axios.get('http://127.0.0.1:8000/api/get-reservaciones')
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaReservacion = response.data.data;
            })
        },
        obtenerMesas(){
            axios.get('http://127.0.0.1:8000/api/get-mesas')
            .catch(error => {
                console.log(error);
            })
            .then(response => {
                this.listaMesas = response.data.data;
            })
        }
    },
    created() {
        this.obtenerMesas();
        this.obtenerReservaciones();
    },
}
</script>

<style></style>