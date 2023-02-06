<template>
    <div>
        <span>
            <strong> {{ todo.title }}</strong>
        </span>
        <span style="margin:0 20px">
            {{ todo.description }}
        </span>
    </div>
</template>
<script>
export default {
    name: "ToDoListItem",
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
}
</script>
<style scoped>
</style>