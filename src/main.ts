import { createApp } from 'vue';

import 'ant-design-vue/dist/antd.css';
import '@/assets/base.less';

import App from './App.vue';
import pinia from '@/stores';
import { setupStore } from '@/stores';
import router from '@/router';
import AntD from 'ant-design-vue';

const app = createApp(App);
app.use(pinia).use(AntD);
await setupStore();
app.use(router).mount('#app');


