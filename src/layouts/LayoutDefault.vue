<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList">
            <q-item :key="index" clickable :active="activedMenu(menuItem.route)" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"></q-icon>
              </q-item-section>
              <q-item-section>
                <router-link :to="{ path: menuItem.route}">{{ menuItem.label }}</router-link>
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index"  v-if="menuItem.separator"></q-separator>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <slot/>
    </q-page-container>

  </q-layout>
</template>

<script>
  const menuList = [
    {
      icon: 'home',
      label: 'Home',
      route: '/',
      separator: true
    },
    {
      icon: 'send',
      label: 'Outbox',
      route: '/about',
      separator: false
    },
  ]

  export default {
    data () {
      return {
        left: false,
        menuList
      }
    },
    methods: {
      activedMenu: function (currentRoute) {
        return this.$route.fullPath.includes(currentRoute)
      }
    },
  }
</script>
