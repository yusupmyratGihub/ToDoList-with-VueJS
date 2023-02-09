import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({

    state:{
        todos:[
            { title: 'this is a task', description: 'yes it is defeinitely a task for us to do!',expireDate:{}, status: false },
          
            { title: 'Wow a task', description: 'wow defeinitely a task for us to do!',expireDate:{}, status: true },
            { title: 'Wow a ', description: ' a task for us to do!',expireDate:{}, status: true }
        ]
    },
    actions:{
        ADD_TODO ({ commit }, todo){
            console.log(todo);
            let new_todo = {

                title: todo.title,
                description: todo.description,
                expireDate:todo.expireDate,
                status: false
            };
            commit("ADD_TODO_MUTATION", new_todo);
        },
        COMPLETE_TODO({ commit },todo){
            commit('COMPLETE_TODO_MUTATION',todo);
        },
        DELETE_TODO({ commit }, todo){
            commit("DELETE_TODO_MUTATION",todo);
        }
    },

    getters:{
        completed: (state) => {
            return state.todos.filter( todo => todo.status);
        },
        incompleted: (state) => {
            return state.todos.filter((todo) => !todo.status);
        }
    },
    mutations:{
        ADD_TODO_MUTATION(state,todo){
            return state.todos.push(todo);
        },
        COMPLETE_TODO_MUTATION(state,todo){
            state.todos.find(item => item.title + item.description === todo.title + todo.description).status = true;
        },
        DELETE_TODO_MUTATION(state,todo){
            state.todos = state.todos.filter( item => item.title + item.description != todo.title + todo.description);
        }
    }


});

export default store;