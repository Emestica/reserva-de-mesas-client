<template>
  <v-navigation-drawer v-model="drawer" location="left" theme="dark" permanent width="360">

<v-list-item prepend-icon="mdi mdi-account-circle" title="Jhony Gente Loca" subtitle="jhony.gente.loca@gmail.com"></v-list-item>

<v-divider></v-divider>
<v-list v-model:opened="open">
  <v-list-item prepend-icon="mdi-home" link title="Inicio" to="/"></v-list-item>

  <v-list-group value="Users">
    <template v-slot:activator="{ props }">
      <v-list-item
        v-bind="props"
        prepend-icon="mdi-account-circle"
        title="Catalogos"
      ></v-list-item>
    </template>

    <v-list-group value="Admin">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          title="Admin"
        ></v-list-item>
      </template>

      <v-list-item
        v-for="([title, icon, ulr], i) in admins"
        :key="i"
        :title="title"
        :prepend-icon="icon"
        :value="title"
        :to="ulr"
      ></v-list-item>
    </v-list-group>

    <v-list-group value="Actions">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          title="Actions"
        ></v-list-item>
      </template>

      <v-list-item
        v-for="([title, icon], i) in cruds"
        :key="i"
        :value="title"
        :title="title"
        :prepend-icon="icon"
      ></v-list-item>
    </v-list-group>
  </v-list-group>
</v-list>

<!--<v-list v-model:opened="open">

  <v-list-item link title="Inicio" to="/"></v-list-item>

  <v-list-item link title="Roles" to="/roles"></v-list-item>

  <v-list-group value="Catalogos">

    <template v-slot:activator>
      <v-list-item prepend-icon="mdi-account-circle" title="Catalogos"></v-list-item>
    </template>

    <v-list-item
      title="Perfiles"
      prepend-icon="icon-md"
      to="/roles"
      link
    ></v-list-item>

  </v-list-group>
</v-list>-->

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
    group: null
  }),
  watch: {
    group(){
      this.drawer = false
    }
  }
};

</script>
