<template>
  <div :class="getItemClass(todo.status, todo.expireDate?.dateRange?.end)">
    <a href="#">
      <h5
        class="
          mb-2
          text-2xl
          font-bold
          tracking-tight
          text-gray-900
          dark:text-white
        "
      >
        Title: {{ todo.title }}
      </h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
      Descrioption: {{ todo.description }}
    </p>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
      Expire Date: {{ todo.expireDate?.dateRange?.end }}
    </p>

    <a
      @click="completed"
      v-if="!todo.status"
      href="#"
      class="
        inline-flex
        items-center
        mx-4
        mb-4
        mt-4
        px-3
        py-2
        text-sm
        font-medium
        text-center text-white
        bg-blue-700
        rounded-lg
        hover:bg-blue-800
        focus:ring-4 focus:outline-none focus:ring-blue-300
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
      "
    >
      Mark As Completed
    </a>
    <a
      @click="duplicate"
      v-if="!todo.status"
      href="#"
      class="
        inline-flex
        items-center
        mx-4
        mb-4
        mt-4
        px-3
        py-2
        text-sm
        font-medium
        text-center text-white
        bg-blue-700
        rounded-lg
        hover:bg-blue-800
        focus:ring-4 focus:outline-none focus:ring-blue-300
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
      "
    >
      Duplicate
    </a>
    <a
      @click="selectItemTodo"
      v-if="!todo.status"
      href="#"
      class="
        inline-flex
        items-center
        mx-4
        mb-4
        mt-4
        px-3
        py-2
        text-sm
        font-medium
        text-center text-white
        bg-blue-700
        rounded-lg
        hover:bg-blue-800
        focus:ring-4 focus:outline-none focus:ring-blue-300
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
      "
    >
      update
    </a>

    <a
      @click="deleteTodo"
      href="#"
      class="
        inline-flex
        items-center
        px-3
        py-2
        mb-4
        mx-4
        mt-4
        text-sm
        font-medium
        text-center text-white
        bg-blue-700
        rounded-lg
        hover:bg-blue-800
        focus:ring-4 focus:outline-none focus:ring-blue-300
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
      "
    >
      Delete
    </a>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: ["todo"],
  methods: {
    completed() {
      this.$store.dispatch("COMPLETE_TODO", this.todo);
    },
    deleteTodo() {
      this.$store.dispatch("DELETE_TODO", this.todo);
    },
    duplicate() {
      this.$store.dispatch("DUPLICATE_TODO", {...this.todo,id: Math.floor(Math.random() * 1000)});
    },
    selectItemTodo() {

      this.$store.dispatch("SELECTED_UPDATE_TODO",this.todo);
    },
  },
  setup() {
    function getItemClass(status = false, exDate) {
      const tempClass = "mb-4 border-4 rounded rounded-lg";
      const date = new Date();
      const expiringDate = new Date(exDate);
      console.log(expiringDate);

      if (!status && expiringDate > date) {
        return `${tempClass} border-red-300`;
      }
      return tempClass;
    }

    return {
      getItemClass,
    };
  },
};
</script>

<style scoped>
</style>