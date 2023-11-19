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
                v-model="user.email">
            </v-text-field>
  
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
                v-model="user.password">
            </v-text-field>
  
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
                v-on:click="loginUserClient()">Iniciar sesión
            </v-btn>
  
            <v-card-text class="text-center">
                <router-link class="text-blue text-decoration-none" to="/register" rel="noopener noreferrer" target="_blank">
                    Regístrese ahora <v-icon icon="mdi-chevron-right"></v-icon>
                </router-link>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        visible: false,
        user:{
            email: null,
            password: null
        }
    }),
    methods: {
        loginUserClient(){
            console.log('loginUserClient() => init');
            console.log(this.user);

            axios.post('http://127.0.0.1:8000/api/client/login-user', this.user)
            .then(response => {
                if(response.data.success === true){
                    let security = {
                        user_id:                        response.data.data_user_object.id_usuario,
                        user_name:                      response.data.data_user_object.usuario,
                        user_email:                     response.data.data_user_object.correo_electronico,
                        user_channel:                   response.data.data_user_object.channel,
                        person_user_id:                 response.data.data_user_person_object.id_usuario_persona,
                        person_id:                      response.data.data_user_person_object.id_persona,
                        person_name:                    response.data.data_user_person_object.nombres,
                        person_last_name:               response.data.data_user_person_object.apellidos,
                        person_movil:                   response.data.data_user_person_object.celular,
                        restaurant_id:                  response.data.data_user_restaurant_object.id_restaurante,
                        restaurant_user_id:             response.data.data_user_restaurant_object.id_usuario_restaurante,
                        restaurant_legal_name:          response.data.data_user_restaurant_object.nombre_legal,
                        restaurant_name:                response.data.data_user_restaurant_object.restaurante,
                        restaurant_telephone_number:    response.data.data_user_restaurant_object.telefono
                    };

                    this.$store.dispatch('login', security);
                    this.$router.push('/home');
                }else{
                    console.log('loginUserClient() => error-controlado');
                }
            }).catch(error => {
                console.log('loginUserClient() => error-no-controlado')
                console.log(error);
            });
        }
    }
}
</script>