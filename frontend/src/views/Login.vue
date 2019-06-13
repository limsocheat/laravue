<template>
	<div>
		<v-container fluid fill-height>
			<v-layout align-center justify-center>
				<v-flex xs12 sm8 md4>
					<v-form @submit="submit">
						<v-card class="elevation-12">
							<v-toolbar dark color="primary">
								<v-toolbar-title>{{ login }}</v-toolbar-title>
							</v-toolbar>
							<v-card-text>
								<v-alert v-show="error" type="error" class="mb-4">
									{{
									message
									}}
								</v-alert>
								<v-text-field
									v-model="item.username"
									prepend-icon="email"
									name="email"
									label="Username or E-mail"
									type="text"
									v-validate="'required'"
									data-vv-name="email"
									:error-messages="errors.collect('email')"
								></v-text-field>
								<v-text-field
									v-model="item.password"
									prepend-icon="lock"
									name="password"
									label="Password"
									type="password"
									v-validate="'required'"
									data-vv-name="password"
									:error-messages="errors.collect('password')"
								></v-text-field>
								<v-btn
									type="submit"
									round
									block
									color="primary"
									@submit.native="submit"
									:loading="loading"
									:disabled="errors.any()"
								>Login</v-btn>
							</v-card-text>
						</v-card>
					</v-form>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	export default {
		name: "Login",
		data() {
			return {
				login: "Login Form",
				message: null,
				error: false,
				loading: false,
				checkbox: false,
				checkboxErrors: null,
				item: {
					grant_type: process.env.VUE_APP_GRANT_TYPE,
					client_id: process.env.VUE_APP_CLIENT_ID,
					client_secret: process.env.VUE_APP_CLIENT_SECRET,
					email: process.env.VUE_APP_DEFAULT_ADMIN_EMAIL,
					password: process.env.VUE_APP_DEFAULT_ADMIN_PASSWORD
				}
			};
		},
		methods: {
			submit(e) {
				var vm = this;
				e.preventDefault();
				this.loading = true;
				this.$store
					.dispatch("auth/login", this.item)
					.then(response => {
						this.$router.push({ name: "dashboard" });
						this.loading = false;
					})
					.catch(err => {
						vm.error = true;
						vm.message = err.response.data.message;
						this.loading = false;
					});
			}
		}
	};
</script>

<style></style>