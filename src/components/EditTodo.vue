<template>
  <div id='todo'>
    <q-form @submit="updateTodo()" class="q-gutter-md">
      <q-input v-model="content" label="Content"></q-input>
      <q-input v-model="description" label="Description"></q-input>
      <q-input v-model="date" filled type="date" hint="Dadline date"></q-input>
      <q-input v-model="time" filled type="time" hint="Deadline time"></q-input>
      <q-btn label="Submit" type="submit" color="primary"></q-btn>
    </q-form>
  </div>
</template>

<style>
  .q-card {
    width: 1000px;
  }
</style>

<script>
import moment from 'moment';
export default {
  name: 'AddTodo',
  data () {
    return {
      content: this.todoData.content,
      description: this.todoData.description,
      date: String(moment(this.todoData.deadline).format('YYYY-MM-DD')),
      time: String(moment(this.todoData.deadline).format('HH:mm'))
    }
  },

  props: ['todoData'],

  methods: {
    updateTodo() {
      let self = this
      let deadline = this.date.toString() + ' ' + this.time.toString()
      this.$withAuth.patch(`/todos/${this.todoData.id}`, {content: this.content, description: this.description, deadline: deadline}).then((response) => {
        self.$emit('update-todos', {oldData: self.todoData, newData: response.data})
      })
    },
  },
}
</script>
