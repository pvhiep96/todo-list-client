<template>
  <div id='todo'>
    <q-form @submit="createTodo" class="q-gutter-md">
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
export default {
  name: 'AddTodo',
  data () {
    return {
      content: '',
      description: '',
      date: '',
      time: ''
    }
  },
  methods: {
    createTodo: function () {
      let self = this
      let deadline = this.date.toString() + ' ' + this.time.toString()
      this.$withAuth.post('/todos', {content: this.content, description: this.description, deadline: deadline}).then((response) => {
        self.$emit('add-todos', response.data)
      })
    }
  },
}
</script>
