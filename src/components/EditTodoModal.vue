<template>
  <q-dialog v-model="isOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit Todo</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div id='todo'>
          <q-form @submit="updateTodo()" class="q-gutter-md">
            <q-input v-model="todoData.content" label="Content"></q-input>
            <q-input v-model="todoData.description" label="Description"></q-input>
            <q-input v-model="convertDate" filled type="date" hint="Dadline date"></q-input>
            <q-input v-model="convertTime" filled type="time" hint="Deadline time"></q-input>
            <q-btn label="Submit" type="submit" color="primary"></q-btn>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
  import moment from 'moment';
  export default {
    props: ['isOpen', 'todoData'],
    methods: {
      updateTodo() {
        let self = this
        let deadline = this.todoData.deadline.toString()
        this.$withAuth.patch(`/todos/${this.todoData.id}`, {content: this.todoData.content, description: this.todoData.description, deadline: deadline}).then((response) => {
          self.$emit('update-todos', {newData: response.data})
        })
      },
    },
    computed: {
      convertDate: function(){
        return String(moment(this.todoData.deadline).format('YYYY-MM-DD'))
      },
      convertTime: function(){
        return String(moment(this.todoData.deadline).format('HH:mm'))
      },
    }
  }
</script>
