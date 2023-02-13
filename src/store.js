import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, title: 'this is a task', description: 'yes it is defeinitely a task for us to do!', expireDate: {}, status: false },

            { id: 2, title: 'Wow a task', description: 'wow defeinitely a task for us to do!', expireDate: {}, status: true },
            { id: 3, title: 'Wow a ', description: ' a task for us to do!', expireDate: {}, status: true }
        ],
        selected: {}
    },
    actions: {

        ADD_TODO({ commit }, todo) {

            let new_todo = {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                expireDate: todo.expireDate,
                status: false
            };
            commit("ADD_TODO_MUTATION", new_todo);
        },
        COMPLETE_TODO({ commit }, todo) {
            commit('COMPLETE_TODO_MUTATION', todo);
        },
        DELETE_TODO({ commit }, todo) {
            commit('DELETE_TODO_MUTATION', todo);
        },
        DUPLICATE_TODO({ commit }, todo) {

            commit('DUPLICATE_TODO_MUTATION', { ...todo });
        },
        UPDATE_TODO({ commit }, todo) {

            commit('UPDATE_TODO_MUTATION', { ...todo });
        },



        SELECTED_UPDATE_TODO({ commit }, todo) {

            commit('SET_TODO_MUTATION', todo);

        },
        GET_SELECTED_UPDATE_TODO({ commit }) {

            commit('SELECTED_UPDATE_TODO');
        },

    },

    getters: {
        completed: (state) => {
            return state.todos.filter(todo => todo.status);
        },
        incompleted: (state) => {
            return state.todos.filter((todo) => !todo.status);
        },
        getSelected: (state) => {
            return state.selected
        },
    },
    mutations: {
        ADD_TODO_MUTATION(state, todo) {
            return state.todos.push(todo);
        },
        COMPLETE_TODO_MUTATION(state, todo) {
            state.todos.find(item => item.title + item.description === todo.title + todo.description).status = true;
        },
        DELETE_TODO_MUTATION(state, todo) {
            state.todos = state.todos.filter(item => item.id + item.title + item.description != todo.id + todo.title + todo.description);
        },
        UPDATE_TODO_MUTATION(state, todo) {
            state.todos = state.todos.map(item => {
                return item.id !== todo?.id ? item : todo
            });
        },
        DUPLICATE_TODO_MUTATION(state, todo) {
            state.todos.push(todo);
        },
        SET_TODO_MUTATION(state, todo) {

            state.selected = todo;

        }
    }


});

export default store;