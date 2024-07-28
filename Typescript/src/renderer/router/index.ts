import { createWebHistory, createRouter } from 'vue-router';
import routes from './routes';
/* import { type IStaticMethods } from 'preline/preline'; */

/* declare global {
	interface Window {
		HSStaticMethods: IStaticMethods;
	}
} */

const router = createRouter({
	history: createWebHistory(),
	routes,
});

/* router.afterEach((_to, _from, failure) => {
	if (!failure) {
		setTimeout(() => {
			window.HSStaticMethods.autoInit();
		}, 100);
	}
}); */

export default router;
