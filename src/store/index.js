import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

const state = {
    title: "",
    description: "",
    expireDate: "",
    listTodoFunc: []
}
const getters = {
    fullList: function (state) {
        return `${state.title} ${state.description} ${state.expireDate}`
      }
}



const mutations = {
    setTodoItem(state, title, description, expireDate) {
        state.title = title,
            state.description = description,
            state.expireDate = expireDate
    }
}



const actions = {
    addTodoFunc(context, payload) {
        const favorites = context.state.favorites
        favorites.push(payload)
        context.commit('UPDATE_FAVORITES', favorites)
    },
    updateToListTodoFunc({ commit }, title, description, expireDate) {
        commit('setTodoItem', title, description, expireDate)
    }
}

const store = new Vuex.Store({ state, getters, mutations, actions });

export default store;