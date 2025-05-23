import { createApp } from 'vue'
import App from './App.vue'

// Vue 3에 맞는 Bootstrap 구성 요소를 사용할 경우
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'leaflet/dist/leaflet.css'

const app = createApp(App)

app.use(BootstrapVue3)

app.mount('#app')
