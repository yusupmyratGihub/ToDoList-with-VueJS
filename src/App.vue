<template>
  <div>
    <form
      @submit="createTodo"
      class="bg-white shadow-md rounded px-8 pt-10 pb-10 mb-10"
      novalidate="ture"
    >
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li class="text-red-600 mb-8" v-for="error in errors" v-bind:key="error"> {{ error }}</li>
    </ul>
  </p>
    
      <div class="identity-input mb-4">
        <label
          for="identity"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Title</label
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
          placeholder="Title"
          v-model="title"
          type="text"
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

    <div
      class="grid grid-flow-row gap-x-8 gap-y-4 sm:grid-cols-1 md:grid-cols-2"
    >
      <div class="m-4">
        <h4
          class="
            pb-4
            mb-2
            text-2xl
            font-bold
            tracking-tight
            text-blue-900
            dark:text-white
          "
        >
          Pending Todo
        </h4>
        <todo-list completed="false"></todo-list>
      </div>
      <div class="m-4 pb-4">
        <h4
          class="
            pb-4
            mb-2
            text-2xl
            font-bold
            tracking-tight
            text-blue-900
            dark:text-white
          "
        >
          Completed Todo
        </h4>
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
  computed: {
    selected() {
      const sel = this.$store.getters.getSelected;
      return sel;
    },
  },
  watch: {
    selected(newSelected) {
      console.log("this is validator's error:", newSelected);
      if (newSelected && newSelected?.id !== 0) {
        this.title = newSelected.title;
        this.description = newSelected.description;
        this.expireDate = { ...newSelected.expireDate };
        (this.id = newSelected.id), (this.status = newSelected?.status);
      }
    },
  },

  data() {
    return {
      errors: [],
      title: "",
      description: "",
      expireDate: {},
      id: 0,
      status: false,
    };
  },
  methods: {
    async createTodo(e) {
      if (this.title && this.description && this.expireDate) {
        if (this.selected?.description) {
          await this.$store.dispatch("UPDATE_TODO", {
            id: this.id,
            title: this.title,
            description: this.description,
            expireDate: { ...this.expireDate },
          });
        } else {
          await this.$store.dispatch("ADD_TODO", {
            id: Math.floor(Math.random() * 1000),
            title: this.title,
            description: this.description,
            expireDate: { ...this.expireDate },
          });
        }
        (this.id = 0),
          (this.status = false),
          (this.title = this.description = "");
        this.expireDate.selectedDate = false;

        this.expireDate.dateRange = {
          start: "",

          end: "",
        };
      }

      this.errors = [];
      if (!this.title) {
        this.errors.push("title required.");
      }
      if (!this.description) {
        this.errors.push("Description  required.");
      }
      if (!this.expireDate) {
        this.errors.push("Calendar  required.");
      }

      if (!this.errors.length) {
        return true;
      }
      e.preventDefault();
    },
  },
};
</script>

<style scoped>
</style> 