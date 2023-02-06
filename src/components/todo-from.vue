<template>
    <form @submit.prevent="submit">
        <input required placeholder="title" v-model="title" />
        <input required placeholder="description" v-model="description">
        <button type="submit">ADD</button>

    </form>

</template>


<script>
export default {
    name: "ToDoForm",
    data() {
        return (
            {
                title: "",
                description: ""
            }
        )
    },
    methods: {
        submit() {
            this.emitNewTodo()
        },
        emitNewTodo(){
            this.$emit("onNewTodo",{
                title:this.title,
                description:this.description,
                id:`todo_${Math.random()* 1000}`
            })
        }

    },

}

</script>


<style scoped>

</style>