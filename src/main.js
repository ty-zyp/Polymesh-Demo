import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import router from './router'
import 'view-design/dist/styles/iview.css';
import JsonViewer from 'vue-json-viewer';
Vue.use(JsonViewer);
Vue.config.productionTip = false
Vue.use(ViewUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
