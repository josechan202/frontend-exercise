import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router';
//Entry point
const app = createApp(App);
app.use(router);
app.mount('#app')
