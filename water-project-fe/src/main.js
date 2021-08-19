import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import SpaceBetween from './components/SpaceBetween/index.vue'
import FlexEnd from './components/FlexEnd/index.vue'
import { regDirectives } from '@/helpers/directive';
import _ from '@/config/common';
const app = createApp(App)
Object.defineProperty(app.config.globalProperties, '$$', {
    get() {
      return _;
    },
  });
regDirectives(app)
app
.use(store)
.component('space-between',SpaceBetween)
.component('flex-end',FlexEnd)
.use(router)
.use(Antd)
.mount('#app');

