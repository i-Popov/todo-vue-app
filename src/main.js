import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store'

export const eventBus = new Vue(); // позволяет нам передавать данные между любыми компонентами напрямую

Vue.config.productionTip = false;

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
