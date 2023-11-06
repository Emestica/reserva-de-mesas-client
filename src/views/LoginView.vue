<template>
    <div>
        <v-img 
            class="mx-auto my-6" 
            max-width="228" 
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
        ></v-img>
  
        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            
            <div class="text-subtitle-1 text-medium-emphasis">Cuenta:</div>
            <v-text-field 
                density="compact" 
                placeholder="Correo Electrónico" 
                prepend-inner-icon="mdi-email-outline" 
                variant="outlined"
                type="email"
            ></v-text-field>
  
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Contrase&ntilde;a:
                <router-link class="text-caption text-decoration-none text-blue" 
                    to="/forgot-password"
                    rel="noopener noreferrer" 
                    target="_blank"
                >¿Olvidó su contraseña?</router-link>
            </div>
            <v-text-field 
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" 
                :type="visible ? 'text' : 'password'" 
                density="compact" 
                placeholder="Ingrese su contraseña" 
                prepend-inner-icon="mdi-lock-outline" 
                variant="outlined" 
                @click:append-inner="visible = !visible"
            ></v-text-field>
  
            <v-card class="mb-12" color="surface-variant" variant="tonal">
                <v-card-text class="text-medium-emphasis text-caption">
                    Advertencia: Después de 3 intentos fallidos de inicio de sesión consecutivos, 
                    su cuenta se bloqueará temporalmente durante tres horas. 
                    Si necesita iniciar sesión ahora, también puede hacer clic en 
                    '¿Olvidó su contraseña?' 
                    a continuación para restablecer la contraseña de inicio de sesión.
                </v-card-text>
            </v-card>
  
            <v-btn 
                block class="mb-8" 
                color="blue" 
                size="large" 
                variant="tonal"
            >Iniciar sesión</v-btn>
  
            <v-card-text class="text-center">
                <router-link class="text-blue text-decoration-none" to="/register" rel="noopener noreferrer" target="_blank">
                    Regístrese ahora <v-icon icon="mdi-chevron-right"></v-icon>
                </router-link>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        visible: false,
    }),
}
</script>