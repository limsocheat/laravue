import Vue from 'vue'
import Router from 'vue-router'
import store from "./store";

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
			path: '/login',
			name: 'auth.login',
			component: () => import('./views/Login.vue'),
		},
		{
			path: '/dashboard',
			component: () => import('./views/dashboard/Index.vue'),
			meta: {
				requiresAuth: true
			},
			children: [
				{
					path: '',
					name: 'dashboard',
					component: () => import('./views/dashboard/Dashboard.vue'),
				},
				{
					path: 'page',
					name: 'dashboard.page',
					component: () => import('./views/dashboard/pages/Index.vue'),
				},
				{
					path: 'profile',
					component: () => import('./views/dashboard/tools/profile/Index.vue'),
					children: [
						{
							path: '',
							name: 'dashboard.profile',
							component: () => import('./views/dashboard/tools/profile/Profile.vue'),
						},
						{
							path: 'password',
							name: 'dashboard.profile.password',
							component: () => import('./views/dashboard/tools/profile/Password.vue'),
						},
					]
				},
			]
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (store.getters["auth/isLoggedIn"]) {
			next();
			return;
		}
		next({name: 'auth.login'});
	} else {
		next();
	}
});

export default router;