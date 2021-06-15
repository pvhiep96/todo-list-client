<template>
  <layout-default>
    <div class="home">
      <q-list bordered class="rounded-borders todo-list">
      <todo-modal @add-todos="addTodoList"></todo-modal>
      <q-item>
        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm"><b>Content</b></q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label class="q-mt-sm"><b>Description</b></q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label class="q-mt-sm"><b>Deadline</b></q-item-label>
        </q-item-section>

        <q-item-section top side>
        </q-item-section>
      </q-item>
      <Container @drop="onDrop">
        <Draggable v-for="todo of todos" :key="todo.id">
          <q-item v-bind:class="{ completed: todo.is_completed }">
            <q-item-section top class="col-2 gt-sm">
              <q-item-label class="q-mt-sm">{{todo.content}}</q-item-label>
            </q-item-section>

            <q-item-section top>
              <q-item-label class="q-mt-sm">{{todo.description}}</q-item-label>
            </q-item-section>

            <q-item-section top>
              <q-item-label class="q-mt-sm">{{format_date(todo.deadline)}}</q-item-label>
            </q-item-section>

            <q-item-section v-bind:class="{ hide: todo.is_completed }" top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="openModalConfirmDelete(todo)"></q-btn>
                <q-btn class="gt-xs" size="12px" flat dense round icon="done" @click="missionCompleted(todo)"></q-btn>
                <q-btn size="12px" flat dense round icon="more_vert" @click="openModalEditModal(todo)"></q-btn>
              </div>
            </q-item-section>
          </q-item>
        </Draggable>
      </Container>
      </q-list>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="page"
          color="blue"
          :max="totalPages"
          :max-pages="totalPages"
          @input="goAnotherPage"
          boundary-numbers
        ></q-pagination>
      </div>
      <q-dialog v-model="deleteTodoModal">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-center">Mày có chắc xóa ko?</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row">
              <div class="col-6 text-center">
                <q-btn class="gt-xs" size="12px" v-close-popup flat dense round icon="delete" @click="deleteTodo(specifyTodo)">OK</q-btn>
              </div>
              <div class="col-6 text-center">
                <q-btn class="gt-xs" size="12px" v-close-popup flat dense round icon="cancel">Cancel</q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <edit-todo-modal :isOpen="openEditTodoModal" :todoData="specifyTodo" @update-todos="updateTodoList"></edit-todo-modal>
    </div>
  </layout-default>
</template>

<style>
  .todo-list {
    width: 100%;
  }
  .completed {
    background-color: var(--q-color-primary);;
  }
  .hide {
    display: none
  }
</style>

<script>
  import LayoutDefault from '../layouts/LayoutDefault.vue'
  import { Container, Draggable } from "vue-smooth-dnd";
  import TodoModal from '../components/NewTodoModal.vue'
  import EditTodoModal from '../components/EditTodoModal.vue'
  import moment from 'moment';

  export default {
    data() {
      return {
        deleteTodoModal: false,
        editTodoModal: false,
        openEditTodoModal: false,
        todos: [],
        specifyTodo: {},
        maxLength: 0,
        page: 1,
        currentPage:1,
        nextPage: null,
        totalPages: 0
      }
    },

    updated() {
      console.log('rerender')
    },
    created() {
      this.$withAuth.get('/todos')
      .then(response => {
        this.todos = response.data['todos']
        this.totalPages = response.data['total_pages']
      })
    },
    methods: {
      addTodoList(e) {
        this.todos.push(e);
      },

      updateTodoList(e) {
        console.log(e)
        const index = this.todos.indexOf(e.newData)
        this.$set(this.todos, index, e.newData)
        this.openEditTodoModal = false
      },

      onDrop(dropResult) {
        this.todos = applyDrag(this.todos, dropResult);
      },

      format_date(value){
        if (value) {
          return moment(String(value)).format('DD-MM-YYYY HH:mm')
        }
      },

      openModalConfirmDelete(todo) {
        this.deleteTodoModal = true
        this.specifyTodo = todo
      },

      openModalEditModal(todo){
        this.openEditTodoModal = true
        this.specifyTodo = todo
      },

      deleteTodo(todo) {
        let self = this
        this.$withAuth.delete(`/todos/${todo.id}`).then(() => {
          self.todos.splice(self.todos.indexOf(todo), 1);
        })
      },

      missionCompleted(todo) {
        let self = this
        this.$withAuth.put(`/mission_completed/${todo.id}`).then((response) => {
          const index = self.todos.indexOf(todo)
          self.$set(self.todos, index, response.data)
        })
      },

      goAnotherPage(page) {
        this.$withAuth.get(`/todos?page=${page}`)
        .then(response => {
          this.todos = response.data['todos']
          this.totalPages = response.data['total_pages']
        })
      }
    },
    components: {
      LayoutDefault,
      // EditTodo,
      Container,
      Draggable,
      TodoModal,
      EditTodoModal
    }
  }
  export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr

    const result = [...arr]
    let itemToAdd = payload

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd)
    }

    return result
  }
</script>
