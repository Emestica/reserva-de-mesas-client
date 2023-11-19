import { createStore } from 'vuex'

export default createStore({
  state: {
    usuario: null,
  },
  getters: {
    getUser(state){
      return state.usuario;
    }
  },
  mutations: {
    setUser(state, usuario){
      return state.usuario = usuario;
    }
  },
  actions: {
    login(context, data){
      context.commit('setUser', data.usuario);

      localStorage.setItem('user_data', JSON.stringify(data));
    },
    logout(context){
      context.commit('setUser', null);

      localStorage.removeItem('user_data');
    }
  },
  modules: {
  }
})
