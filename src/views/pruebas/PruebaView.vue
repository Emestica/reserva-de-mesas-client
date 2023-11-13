<template>
    <v-container>
        <v-row>
            <v-col cols="4">
                <v-text-field type="date" required v-model="fechaInput"></v-text-field>
                <v-btn color="primary" v-on:click="formatoDeFechas">Guardar</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import moment from 'moment';
export default {
    data() {
        return {
            fechaInput: new Date()
        }
    },
    methods:{
        formatoDeFechas(){
            console.log(this.fechaInput)
            //let now = moment();
            //console.log(now)
            let esFechaValida = moment(this.fechaInput, 'YYYY-MM-DD');
            console.log(esFechaValida);
            console.log(esFechaValida.isValid());
            let fechaSv = '04/11/2023';
            console.log(fechaSv);
            let esFechaValidaSv = moment(fechaSv).format('YYYY-MM-DD');
            console.log(esFechaValidaSv);
        }
    }
}
</script>
<style></style>