import { createRouter, createWebHistory } from 'vue-router';
import StudentsDashboard from '@/pages/StudentsDashboard.vue';

const routes = [
    { path: '/students-dashboard', component: StudentsDashboard },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;