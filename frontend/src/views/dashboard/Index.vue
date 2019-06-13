<template>
	<v-app>
		<v-navigation-drawer
			width="250"
			class="blue-grey darken-4"
			dark
			persistent
			:mini-variant="miniVariant"
			v-model="drawer"
			fixed
			app
		>
			<v-toolbar flat class="transparent" dense>
				<v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
					<v-list-tile>
						<v-list-tile-action v-if="!miniVariant">
							<v-icon large color="orange">invert_colors</v-icon>
						</v-list-tile-action>
						<v-list-tile-content v-if="!miniVariant">
							<v-list-tile-title>
								<h2 v-text="appName"></h2>
							</v-list-tile-title>
						</v-list-tile-content>
						<v-list-tile-action>
							<v-btn icon @click.stop="miniVariant = !miniVariant">
								<v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
							</v-btn>
						</v-list-tile-action>
					</v-list-tile>
				</v-list>
			</v-toolbar>
			<v-divider></v-divider>

			<v-tooltip right :disabled="!miniVariant">
				<v-toolbar flat class="transparent" dense slot="activator">
					<v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
						<v-list-tile :to="{name: 'dashboard'}" exact>
							<v-list-tile-action>
								<v-icon>home</v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title>DASHBOARD</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-toolbar>
				<span>DASHBOARD</span>
			</v-tooltip>
			<v-divider></v-divider>

			<v-list subheader :class="{'list-border-bottom' : miniVariant}">
				<v-subheader>MODELS</v-subheader>
				<template v-for="(model, index) in models">
					<v-tooltip right :disabled="!miniVariant" :key="index">
						<v-list-tile :key="index" :to="{name: model.link}" slot="activator">
							<v-list-tile-action>
								<v-icon v-html="model.icon"></v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title v-text="model.title"></v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
						<span v-text="model.title"></span>
					</v-tooltip>
				</template>
			</v-list>
			<v-divider></v-divider>

			<v-list subheader>
				<v-subheader>TOOLS</v-subheader>
				<template v-for="(tool, index) in tools">
					<v-tooltip right :disabled="!miniVariant" :key="index">
						<v-list-tile :key="index" slot="activator" :to="{name: tool.link}">
							<v-list-tile-action>
								<v-icon v-html="tool.icon"></v-icon>
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title v-text="tool.title"></v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
						<span v-text="tool.title"></span>
					</v-tooltip>
				</template>
			</v-list>
		</v-navigation-drawer>

		<v-toolbar app dense color="primary" dark class="evation-1">
			<v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-lg-and-up"/>
			<v-spacer></v-spacer>

			<v-tooltip bottom>
				<v-btn icon @click.stop="rightDrawer = !rightDrawer" slot="activator">
					<v-badge color="red" overlap>
						<span slot="badge">{{ notifications.length }}</span>
						<v-icon>notifications</v-icon>
					</v-badge>
				</v-btn>
				<span>{{ notifications.length }} unread notifications</span>
			</v-tooltip>

			<v-menu>
				<v-btn icon slot="activator">
					<v-avatar class="white" size="32">
						<v-icon color="primary">person</v-icon>
					</v-avatar>
				</v-btn>
				<v-list class="pa-0" light>
					<v-list-tile avatar>
						<v-list-tile-avatar>
							<v-avatar class="primary" size="48px">
								<v-icon dark>person</v-icon>
							</v-avatar>
						</v-list-tile-avatar>
						<v-list-tile-content>
							<v-list-tile-title>John Doe</v-list-tile-title>
							<v-list-tile-sub-title>Administrator</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-divider></v-divider>

					<v-list-tile key="profile" :to="{name: 'dashboard.profile'}">
						<v-list-tile-action>
							<v-icon>person</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>My Profile</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-divider></v-divider>
					<v-list-tile key="lock_open" @click.native="logout()">
						<v-list-tile-action>
							<v-icon>lock_open</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>Logout</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-menu>
		</v-toolbar>

		<v-content>
			<router-view/>
		</v-content>

		<v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
			<v-toolbar flat prominent dark class="primary">
				<v-toolbar-title>Notifications</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn icon @click.stop="rightDrawer = false">
					<v-icon>close</v-icon>
				</v-btn>
			</v-toolbar>
			<v-list subheader dense>
				<v-subheader>All notifications</v-subheader>
				<template v-for="(notification, index) in notifications">
					<v-list-tile @click="readNotification(notification)" :key="index">
						<v-list-tile-action>
							<v-icon>{{notification.icon}}</v-icon>
						</v-list-tile-action>
						<v-list-tile-title>{{notification.title}}</v-list-tile-title>
					</v-list-tile>
				</template>
			</v-list>
		</v-navigation-drawer>
	</v-app>
</template>

<script>
	export default {
		name: "VuebaseLayout",
		data() {
			return {
				appName: process.env.VUE_APP_APP_NAME,
				drawer: true,
				fixed: false,
				miniVariant: false,
				right: true,
				rightDrawer: false,
				models: [
					{
						icon: "dashboard",
						title: "Pages",
						link: "dashboard.page"
					}
				],
				tools: [
					{
						icon: "supervisor_account",
						title: "User Profile",
						link: "dashboard.profile"
					}
				],
				notifications: [
					{
						title: "12 new users registered",
						icon: "",
						link: ""
					}
				]
			};
		},
		methods: {
			logout() {
				this.$store.dispatch("auth/logout").then(() => {
					this.$router.push({ name: "auth.login" });
				});
			},

			readNotification(notification) {
				console.log(notification);
			}
		}
	};
</script>

<style scoped lang="stylus">
	@import '../../../node_modules/vuetify/src/stylus/settings/_variables.styl';

	.bottom-menu {
		position: absolute;
		width: 100%;
		bottom: 0;
	}

	.searching {
		overflow: hidden;
		width: 208px;
		padding-left: 8px;
		transition: $primary-transition;
	}

	.searching--closed {
		padding-left: 0;
		width: 0;
	}

	.searching > * {
		right: 8px;
	}

	.searching--closed > * {
		display: none;
	}

	.hidden-searching {
		@media $display-breakpoints.sm-and-down {
			display: none !important;
		}
	}

	.list-border-bottom {
		border-bottom: 1px solid rgba(255, 255, 255, 0.12);
	}
</style>