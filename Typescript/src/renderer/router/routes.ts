import Home from '../Pages/HomeWrapper.vue'
import NetworkStats from '../Pages/Stats/NetworkStats.vue'

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/stats',
		component: NetworkStats
	}
]

export default routes
