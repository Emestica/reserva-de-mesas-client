<template>
  <v-container fluid>
    <v-card title="Bienvenid@ a" subtitle="Nuestro Sistema de reservas">
      <v-img src="https://loredomuebles.com/wp-content/uploads/2017/11/MESAS-1080x675.jpg"></v-img>
    </v-card><br>
    <v-row>
      <v-col>
        <v-card>
          <v-img
            src="https://www.loquequierasya.com/wp-content/uploads/2011/07/reservaciones-gestion-hotelera-1024x480.jpg"></v-img>
          <v-card-text>¡Bienvenido a nuestro sistema de reservación de mesas para administradores!</v-card-text>
          <v-card-text>Estamos encantados de que haya elegido nuestro sistema para gestionar su restaurante. Nuestro
            sistema está diseñado para ayudarle a administrar todas las reservas de su restaurante de forma eficiente y
            sencilla.</v-card-text>
          <v-card-text></v-card-text>
          <v-card-text></v-card-text>
        </v-card><br>
      </v-col>
      <v-col>
        <v-card>
          <v-img src="https://www.upmenu.com/wp-content/uploads/2022/08/Reservar-restaurante.jpg"></v-img>
          <v-card-text>Beneficios de nuestro sistema:</v-card-text>
          <v-card-text> Aumento de la eficiencia: Nuestro sistema automatiza muchas tareas que normalmente se realizan
            manualmente, lo que libera tiempo a los administradores para centrarse en otras tareas
            importantes.</v-card-text>
          <v-card-text>Mejora de la experiencia del cliente: Nuestro sistema facilita a los clientes realizar reservas, lo
            que mejora su experiencia y aumenta la probabilidad de que vuelvan.</v-card-text>
          <v-card-text>Aumento de los ingresos: Nuestro sistema ayuda a los administradores a optimizar sus reservas y a
            aumentar la ocupación de sus restaurantes, lo que puede traducirse en un aumento de los
            ingresos.</v-card-text>
        </v-card>


      </v-col>


    </v-row>
    <v-row>
      <v-col>
        <v-card title="Restaurantes">
          <v-img src="../assets/Restaurante.png"></v-img>
          <v-card-text>▪Agregar Restaurante </v-card-text>
          <v-card-text>▪Agregar Clasificacion </v-card-text>
          <v-card-text>▪Agregar Menu </v-card-text>
          <v-card-text>▪Modificar Menu </v-card-text>
          <v-card-text>▪Eliminar Menu </v-card-text>
          <v-card-text>▪Agregar Mesas </v-card-text>
          <v-card-text>▪Modificar Mesas </v-card-text>
          <v-card-text>▪Eliminar Mesas </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card title="Reservaciones">
          <v-img
            src="https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-calendar-icon-on-white-background-png-image_4926329.png"></v-img>
          <v-card-text>▪Visualizar Reservaciones </v-card-text>
          <v-card-text>▪Modificar Reservaciones </v-card-text>
          <v-card-text>▪Eliminar Reservaciones </v-card-text>


        </v-card>
      </v-col>
      <v-col>

        <v-card title="Usuarios">
          <v-img src="https://cdn-icons-png.flaticon.com/512/72/72728.png"></v-img>
          <v-card-text>▪Visualizar Usuarios </v-card-text>
          <v-card-text>▪Agregar Roles </v-card-text>
          <v-card-text>▪Agregar Usuarios </v-card-text>
          <v-card-text>▪Modificar Usuarios </v-card-text>
          <v-card-text>▪Eliminar Usuarios </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>




  <v-navigation-drawer v-model="drawer" location="left" theme="dark" permanent width="360">

    <v-list-item prepend-icon="mdi mdi-account-circle" :title="nombre_completo"
      :subtitle="correo"></v-list-item>

    <v-divider></v-divider>
    <v-list v-model:opened="open">
      <v-list-item prepend-icon="mdi-home" link title="Inicio" to="/home"></v-list-item>

      <v-list-group value="Users">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-account-circle" title="Catalogos"></v-list-item>
        </template>

        <v-list-group value="Admin">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Admin"></v-list-item>
          </template>

          <v-list-item v-for="([title, icon, ulr], i) in admins" :key="i" :title="title" :prepend-icon="icon"
            :value="title" :to="ulr"></v-list-item>
        </v-list-group>

        <v-list-group value="Actions">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="Actions"></v-list-item>
          </template>

          <v-list-item v-for="([title, icon], i) in cruds" :key="i" :value="title" :title="title"
            :prepend-icon="icon"></v-list-item>
        </v-list-group>
      </v-list-group>
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
  name: 'HomeView',
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
    nombres: null,
    apellidos: null,
    nombre_completo: null
  }),
  watch: {
    group() {
      this.drawer = false
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    accessValidate(){
      let datos = localStorage.getItem('user_data');

      if(datos){
        let myObject = JSON.parse(datos);
        this.$store.dispatch('login', myObject);
        this.$router.push('/home');

        this.correo = myObject.user_email;
        this.nombres = myObject.person_name;
        this.apellidos = myObject.person_last_name;
        this.nombre_completo = myObject.person_name + ' ' + myObject.person_last_name; 
      } else {
        this.$router.push('/');
      }
    }
  },
  created(){
    this.accessValidate();
  }
};

</script>

<style>
title {
  text-align: center;
}
</style>
