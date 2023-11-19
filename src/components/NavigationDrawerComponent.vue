<template>
    <v-navigation-drawer 
        v-model="drawer" 
        location="left" 
        theme="dark" 
        permanent width="360">

        <v-list-item 
            prepend-icon="mdi mdi-account-circle" 
            :title="nombre_completo" 
            :subtitle="correo">
        </v-list-item>

        <v-divider></v-divider>
        
        <v-list 
            v-model:opened="open">
            
            <v-list-item prepend-icon="mdi-home" link title="Inicio" to="/home"></v-list-item>
            <v-list-item prepend-icon="mdi-home" link title="Roles" to="/roles"></v-list-item>
            <v-list-item prepend-icon="mdi-home" link title="Clasificacion" to="/clasificacion"></v-list-item>
            <v-list-item prepend-icon="mdi-home" link title="Personas" to="/personas"></v-list-item>
            <v-list-item prepend-icon="mdi-home" link title="Municipios" to="/municipios"></v-list-item>
            <v-list-item prepend-icon="mdi-home" link title="Menu" to="/menu"></v-list-item>
            <v-list-item prepend-icon="mdi-home" link title="Tipo Menu" to="/tipo-menu"></v-list-item>
            <v-list-item prepend-icon="mdi-home" link title="Mesas" to="/mesas"></v-list-item>
            <v-list-item prepend-icon="mdi-home" link title="Restaurante" to="/restaurante"></v-list-item>
            <v-list-item prepend-icon="mdi-home" link title="Reservacion" to="/reservacion"></v-list-item>

        </v-list>
        <template v-slot:append>
            <v-btn prepend-icon="mdi mdi-logout" block class="mb-5" v-on:click="logout">
                Cerrar Sesi&oacute;n
            </v-btn>
        </template>
    </v-navigation-drawer>

    <v-app-bar color="blue">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
</template>

<script>

export default {
    name: 'NavigationDrawerComponent',
    data: () => ({
        open: ['Users'],
        admins: [
            ['Management', 'mdi-account-multiple-outline', '/testTwo'],
            ['Settings', 'mdi-cog-outline', '/testOne'],
            ['Roles', 'mdi-cog-outline', '/roles'],
        ],
        cruds: [
            ['Create', 'mdi-plus-outline'],
            ['Read', 'mdi-file-outline'],
            ['Update', 'mdi-update'],
            ['Delete', 'mdi-delete'],
        ],
        drawer: false,
        group: null,
        correo: null,
        nombre_completo: null
    }),
    watch: {
        group() {
            this.drawer = false
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$router.push('/');
        }, accessValidate() {
            let datos = localStorage.getItem('user_data');

            if (datos) {
                let myObject = JSON.parse(datos);
                this.correo = myObject.user_email;
                this.nombre_completo = myObject.person_name + ' ' + myObject.person_last_name;
            }
        },
    },
    created() {
        this.accessValidate();
    }
}

</script>