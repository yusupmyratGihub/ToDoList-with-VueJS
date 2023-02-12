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
          v-on="v$.title.$touch()"
        />
        <p class="text-red-600" v-if="v$.title?.$error">Title is required</p>

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
          v-on="v$.description"
        />
        <p class="text-red-600" v-if="v$.description?.$error">
          Description is required
        </p>
      </div>

      <div class="mb-4">
        <functional-calendar
          @input="v$.expiredate"
          v-model="expireDate"
          :is-modal="true"
          :is-date-range="true"
          :is-multiple="true"
          :calendars-count="2"
        ></functional-calendar>
        <p class="text-red-600" v-if="v$.expiredate?.$error">
          Dates is required
        </p>
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
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "app",
  components: { TodoList, FunctionalCalendar },
  computed: {
    selected() {
      const sel = this.$store.getters.getSelected;
      /* this.description=sel.description,
      this.expireDate=sel.expireDate */
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
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      title: {
        required: helpers.withMessage("This field cannot be empty", required),
      },
      description: { required },
      expireDate: {
        dateRange: { 
          $each: helpers.forEach({
          start: {
            required,
          },
          end: {
            required,
          },
        }),
         },
      },
    };
  },

  data() {
    return {
      title: "",
      description: "",
      expireDate: {},
      id: 0,
      status: false,
    };
  },
  methods: {
    async createTodo(e) {
     e.preventDefault();
      const result = async () => {
        await this.v$.validate();
      };
      console.log(result);
      this.v$.$touch();

      if (!this.v$.$invalid) {
        //console.log('selected when clicked is: ', this.selected)

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
    },
  },
};
</script>

<style scoped>
</style> 