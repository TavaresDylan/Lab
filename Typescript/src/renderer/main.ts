import { createApp } from 'vue';
import App from '../renderer/App.vue';
import router from '../renderer/router';
import './main.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
