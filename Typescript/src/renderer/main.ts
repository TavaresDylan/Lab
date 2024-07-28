import { createApp } from 'vue';
import App from '../renderer/App.vue';
import router from '../renderer/router';
import './main.css';
import 'preline/preline';

const app = createApp(App);

app.use(router);

app.mount('#app');
