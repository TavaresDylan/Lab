import AccountPage from '@/Pages/User/AccountPage.vue';
import DashboardPage from '@/Pages/Dashboard/DashboardPage.vue';
import LoginPage from '@/Pages/Auth/LoginPage.vue';
import SignupPage from '@/Pages/Auth/SignupPage.vue';
import NotFoundPage from '@/Pages/Errors/NotFoundPage.vue';

const routes = [
	{
		path: '/',
		component: DashboardPage,
	},
	{
		path: '/account',
		component: AccountPage,
	},
	{
		path: '/login',
		component: LoginPage,
	},
	{
		path: '/signup',
		component: SignupPage,
	},
	{
		path: '/:pathMatch(.*)*',
		component: NotFoundPage,
	},
];

export default routes;
