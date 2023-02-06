<template>
  <div id="app">
    <ToDoForm @onNewTodo="handleNewTodo" />
    
    <div style="margin-top: 20px">
      
      <ToDoListItem v-for="todo in todoList" :key="todo.id" :todo="todo"
      
      @onToggleIsChecked="handleToggleIsChecked" 
       />

    </div>
  </div>

</template>


<script>

import ToDoForm from "./components/todo-from.vue"
import ToDoListItem from "./components/todo-list-item.vue"

export default {
  name: 'App',
  components: {
    ToDoListItem,
    ToDoForm
  },
  data() {
    return {
      todoList: []
    }
  },

  methods: {
    handleNewTodo(newTodo) {
      this.todoList.push(newTodo)
      console.log(this.todoList)
    },
    handleToggleIsChecked({value, id}) {
      const todo=this.findId(id)
      todo.isChecked=value
    },
    findId(id) {
      return this.todoList.find(todo => todo.id === id)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
