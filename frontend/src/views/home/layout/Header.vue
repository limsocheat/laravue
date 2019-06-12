<template>
	<div>
		<v-toolbar>
			<router-link :to="{ name: 'home' }">
				<v-toolbar-title>Laravue</v-toolbar-title>
			</router-link>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-sm-and-down">
				<v-menu open-on-hover offset-y v-for="(menu, index) in menus" :key="index">
					<template v-slot:activator="{ on }">
						<v-btn flat :to="{ name: menu.link }" v-on="on">
							{{ menu.title }}
							<v-icon v-show="menu.children">arrow_drop_down</v-icon>
						</v-btn>
					</template>
					<v-list v-show="menu.children" style="min-width: 250px">
						<v-list-tile v-for="(child, index) in menu.children" :key="index" :to="{name: child.link}">
							<v-list-tile-title>{{ child.title }}</v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>
			</v-toolbar-items>
			<v-toolbar-items>
				<v-btn flat @click.stop="drawer = !drawer" icon>
					<v-icon>menu</v-icon>
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>

		<v-navigation-drawer fixed v-model="drawer" temporary right>
			<router-link :to="{ name: 'home' }">
				<v-list class="pa-1">
					<v-list-tile avatar>
						<span class="headline text-uppercase">LARAVUE</span>
						<br>
						<small style="font-size: 12px">Laravel VueJS</small>
					</v-list-tile>
				</v-list>
			</router-link>

			<v-list class="pt-0" dense>
				<v-divider></v-divider>

				<template v-for="(menu, index) in menus">
					<v-list-group v-if="menu.children" :key="index">
						<v-list-tile slot="activator" :to="{name: menu.link}">
							<v-list-tile-content>
								<v-list-tile-title>{{ menu.title }}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
						<v-list-tile v-for="(child, i) in menu.children" :key="i" :to="{name: child.link}">
							<v-list-tile-content>
								<v-list-tile-title>{{ child.title }}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-group>
					<v-list-tile v-else :key="index" :to="{name: menu.link}">
						<v-list-tile-content>
							<v-list-tile-title>{{ menu.title }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</template>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
	export default {
		name: "Header",
		data() {
			return {
				drawer: false,
				menus: [
					{
						title: "About",
						link: "about"
					},
					{
						title: "Services",
						link: "service",
						children: [
							{
								title: "Web App",
								link: "service.web"
							},
							{
								title: "Mobile App",
								link: "service.mobile"
							}
						]
					}
				]
			};
		}
	};
</script>

<style scoped>
</style>
