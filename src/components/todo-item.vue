<template>
    
    <div class="mb-4 border-4 rounded rounded-lg" >
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Title: {{ todo.title }}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> Descrioption: {{ todo.description }}</p>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Expire Date: {{ todo.expireDate?.dateRange?.end }}</p>
    
    <a  @click="completed" v-if="!todo.status" href="#" class="inline-flex items-center mx-4 mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Mark As Completed
         </a>
         <a @click="deleteTodo" href="#" class="inline-flex items-center px-3 py-2 mx-4 mt-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Delete
         </a>
</div>
</template>

<script>
export default {
    name: 'todo-item',
    props: ['todo'],
    methods:{
        completed(){
            this.$store.dispatch('COMPLETE_TODO', this.todo);
        },
        deleteTodo(){
            this.$store.dispatch('DELETE_TODO',this.todo);
        }
    }
}
</script>

<style>

</style>