<template>
  <div>
    <form
      @submit="createTodo"
      class="bg-white shadow-md rounded px-8 pt-10 pb-10 mb-10"
    >
      <div class="identity-input mb-4">
        <label
          for="identity"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Email</label
        >
        <input
          class="
            form-control
            shadow
            appearance-none
            borderrounded
            w-full
            py-2
            px-3
            text-gray-700
            mb-3
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          type="text"
          placeholder="Title"
          v-model="title"
          required
        />

        <span class="text-xs text-red-700" id="emailHelp"></span>
      </div>

      <div class="password-input mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2"
          >Description</label
        >

        <input
          aria-describedby="passwordHelp"
          v-model="description"
          class="
            shadow
            appearance-none
            borderrounded
            w-full
            py-2
            px-3
            text-gray-700
            mb-3
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          type="text"
          placeholder="Description"
          required
        />
      </div>

      <div class="mb-4">
        <functional-calendar
          v-model="expireDate"
          :is-modal="true"
          :is-date-range="true"
          :is-multiple="true"
          :calendars-count="2"
        ></functional-calendar>
      </div>

      <div class="flex items-center justify-between">
        <button
          class="
            bg-blue-600
            hover:bg-black
            text-white
            font-bold
            py-2
            px-4
            rounded
            focus:outline-none focus:shadow-outline
          "
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
    <div></div>

    <div class="grid grid-rows-3 grid-flow-col gap-4">
      <div class="row-start-2 row-span-2">
        <h4>Pending Todo</h4>
        <todo-list completed="false"></todo-list>
      </div>
      <div class="row-start-2 row-span-2">
        <h4>Completed Todo</h4>
        <todo-list completed="true"></todo-list>
      </div>
    </div>
  </div>
</template>


<script>
import TodoList from "./components/todo-list.vue";
import { FunctionalCalendar } from "vue-functional-calendar";
export default {
  name: "app",
  components: { TodoList, FunctionalCalendar },
  data() {
    return {
      title: "",
      description: "",
      expireDate: {},
    };
  },
  methods: {
    //dates: function() { this.isReset = true; this.$nextTick(() => { this.isReset = false; }) },
    async createTodo(e) {
     // const tempExpiry = {...this.expireDate};
      e.preventDefault();
      await this.$store.dispatch("ADD_TODO", {
        title: this.title,
        description: this.description,
        expireDate: {...this.expireDate},
      });
      this.title = this.description = "";
      this.expireDate.selectedDate = false;
      this.expireDate.dateRange = {
        start: "",

        end: "",
      };
    },
  },
};
</script>

<style scoped>
</style>