import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './quasar'
import {
  Quasar,
  QLayout,
  QPageContainer,
  QPage,
  QHeader,
  QFooter,
  QDrawer,
  QPageSticky,
  QPageScroller,
  QForm
} from 'quasar'

Vue.use(Quasar, {
  components: {
    QLayout,
    QPageContainer,
    QPage,
    QHeader,
    QFooter,
    QDrawer,
    QPageSticky,
    QPageScroller,
    QForm
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
