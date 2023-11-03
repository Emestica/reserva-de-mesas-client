<template>
  <v-layout>

    <v-navigation-drawer v-model="drawer" location="left" theme="dark" permanent>

      <v-list-item prepend-icon="mdi mdi-account-circle" title="Jhony Gente Loca" subtitle="jhony.gente.loca@gmail.com"></v-list-item>
      
      <v-divider></v-divider>

      <v-list>
        <v-list-item link title="Inicio" to="/"></v-list-item>

        <v-list-item link title="Roles" to="/roles"></v-list-item>

        <v-list-group value="Catalogos">

          <template v-slot:activator>
            <v-list-item prepend-icon="mdi-account-circle" title="Catalogos"></v-list-item>
          </template>

          <v-list-item
            title="Roles"
            prepend-icon="icon-md"
            to="/roles"
            link
          ></v-list-item>

        </v-list-group>
      </v-list>

      <template v-slot:append>
        <v-btn prepend-icon="mdi mdi-logout" block class="mb-5">
          Cerrar Sesi&oacute;n
        </v-btn>
      </template>
    </v-navigation-drawer>

    <v-app-bar color="blue">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <template v-slot:append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

  </v-layout>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    group: null
  }),
  watch: {
    group(){
      this.drawer = false
    }
  }
}
</script>
