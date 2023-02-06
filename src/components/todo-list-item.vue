<template>
    <div>
        {{ $store.getters.fullList }}
     
        <input type="checkbox" v-model="isChecked"/>
        
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
    computed: {
        isChecked: {
            get() {
                return this.todo.isChecked
            },
            set(value) {
                this.$emit("onToggleIsChecked", {
                    value,
                    id: this.todo.id,
                })
            }
        }
    }
}
</script>
<style scoped>

</style>