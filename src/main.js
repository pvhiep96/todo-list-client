import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {withAuth, withoutAuth} from './backend/axios'
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
Vue.prototype.$auth = withAuth
Vue.prototype.$axios = withoutAuth
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
