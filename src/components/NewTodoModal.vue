<template>
  <div>
    <q-item-label header>Todos <q-btn label="New Todo" color="primary" @click="newTodoModal = true"></q-btn></q-item-label>
    <q-dialog v-model="newTodoModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add new to do</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div id='todo'>
            <q-form @submit="createTodo" class="q-gutter-md">
              <q-input v-model="content" label="Content"></q-input>
              <q-input v-model="description" label="Description"></q-input>
              <q-input v-model="date" filled type="date" hint="Dadline date"></q-input>
              <q-input v-model="time" filled type="time" hint="Deadline time"></q-input>
              <q-btn label="Submit" type="submit" color="primary"></q-btn>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  export default {
    name: 'NewTodoModal',
    data () {
      return {
        newTodoModal: false,
        content: '',
        description: '',
        date: '',
        time: ''
      }
    },
    beforeUpdate() {
      console.log(`beforeUpdate: ${this}`)
    },
    updated() {
      console.log(`update: ${this}`)
    },
    methods: {
      createTodo: function () {
        let self = this
        let deadline = this.date.toString() + ' ' + this.time.toString()
        this.$withAuth.post('/todos', {content: this.content, description: this.description, deadline: deadline}).then((response) => {
          self.$emit('add-todos', response.data)
        })
      }
    }
  }
</script>
