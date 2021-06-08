<template>
  <layout-default>
    <div class="home">
      <q-list bordered class="rounded-borders todo-list">
        <q-item-label header>Todos <q-btn label="New Todo" color="primary" @click="newTodoModal = true"></q-btn></q-item-label>
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
              <q-item>
                <q-item-section top class="col-2 gt-sm">
                  <q-item-label class="q-mt-sm">{{todo.content}}</q-item-label>
                </q-item-section>

                <q-item-section top>
                  <q-item-label class="q-mt-sm">{{todo.description}}</q-item-label>
                </q-item-section>

                <q-item-section top>
                  <q-item-label class="q-mt-sm">{{format_date(todo.deadline)}}</q-item-label>
                </q-item-section>

                <q-item-section top side>
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
      <q-dialog v-model="newTodoModal">
        <q-card>
          <q-card-section>
            <div class="text-h6">Add new to do</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <add-todo @add-todos="addTodoList"></add-todo>
          </q-card-section>
        </q-card>
      </q-dialog>
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
      <q-dialog v-model="editTodoModal">
        <q-card>
          <q-card-section>
            <div class="text-h6">Edit Todo</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <edit-todo :todoData="specifyTodo" @update-todos="updateTodoList"></edit-todo>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </layout-default>
</template>

<style>
  .todo-list {
    width: 100%;
  }
</style>

<script>
  import LayoutDefault from '../layouts/LayoutDefault.vue'
  import { Container, Draggable } from "vue-smooth-dnd";
  import AddTodo from '../components/AddTodo.vue'
  import EditTodo from '../components/EditTodo.vue'
  import moment from 'moment';

  export default {
    data() {
      return {
        newTodoModal: false,
        deleteTodoModal: false,
        editTodoModal: false,
        todos: [],
        todos_completed: [],
        specifyTodo: null,
        maxLength: 0,
        page: 1,
        currentPage:1,
        nextPage: null,
        totalPages: 0
      }
    },

    props: ['todoData'],

    created() {
      console.log(this.todos_completed)
      this.$withAuth.get('/todos')
      .then(response => {
        this.todos = response.data['todos']
        this.todos_completed = response.data['todos_completed']
        this.totalPages = response.data['total_pages']
      })
    },
    methods: {
      addTodoList(e) {
        this.todos.push(e);
      },

      updateTodoList(e) {
        // this.todos[this.todos.indexOf(e.oldData)] = Object.assign({}, this.todos[this.todos.indexOf(e.oldData)], e.newData)
        const index = this.todos.indexOf(e.oldData)
        this.$set(this.todos, index, e.newData)
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
        this.editTodoModal = true
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
          self.todos.splice(self.todos.indexOf(todo), 1);
          self.todos_completed.push(response)
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
      AddTodo,
      EditTodo,
      Container,
      Draggable
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
