<template>
  <layout-default>
    <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  </layout-default>
</template>
<script>
  import LayoutDefault from '../layouts/LayoutDefault.vue'
  import HelloWorld from '@/components/HelloWorld'
  export default {
    components: {
    LayoutDefault,
    HelloWorld
    }
  }
</script>
