<template>
    <form @submit.prevent="submit">

        <input required placeholder="title" v-model="title" />

        <input required placeholder="description" v-model="description">
        <input required placeholder="expireDate" v-model="title" />

        <button type="submit" >ADD</button>

    </form>

</template>


<script>

import { mapActions } from "vuex";
export default {
    name: "ToDoForm",
    
   data() {
        return (
            {
                title:"",
                description: "",
                expireDate:""
            }
        )
    },
   methods: {
        submit() {
            [...mapActions.addTodoFunc(this.emitNewTodo())]
            
        },
        emitNewTodo() {
            this.$emit("onNewTodo", {
                title: this.title,
                description: this.description,
                expireDate:this.expireDate,
                id: `todo_${Math.random() * 1000}`
            })
        }

    },

}

</script>


<style scoped>

</style>