import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			component: () => import('./views/home/Index.vue'),
			children: [
				{
					path: '',
					name: 'home',
					component: () => import('./views/home/Home.vue'),
				},
				{
					path: '/about',
					name: 'about',
					component: () => import('./views/home/About.vue'),
				},
				{
					path: '/service',
					component: () => import('./views/home/services/Index.vue'),
					children: [
						{
							path: '',
							name: 'service',
							component: () => import('./views/home/services/Service.vue'),
						},
						{
							path: 'web',
							name: 'service.web',
							component: () => import('./views/home/services/Web.vue'),
						},
						{
							path: 'mobile',
							name: 'service.mobile',
							component: () => import('./views/home/services/Mobile.vue'),
						},
					]
				}
			]
		},
		{
			path: '/dashboard',
			component: () => import('./views/dashboard/Index.vue'),
			children: [
				{
					path: '',
					name: 'dashboard',
					component: () => import('./views/dashboard/Dashboard.vue'),
				}
			]
		}
	]
})

export default router;