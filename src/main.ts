import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// css framework - semantic-ui
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import "animate.css/source/animate.css";

Vue.config.productionTip = false

Vue.use(SuiVue);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
