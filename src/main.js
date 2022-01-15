import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElIconModules from '@element-plus/icons'
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(VueAxios, axios)
for(let iconName in ElIconModules){ 
    app.component(iconName,ElIconModules[iconName]) 
}
app.mount('#app')