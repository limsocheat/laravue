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
								<v-checkbox
									v-model="checkbox"
									:error-messages="checkboxErrors"
									label="Remember me"
									required
								></v-checkbox>
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
					grant_type: "password",
					client_id: 2,
                    client_secret: "FSo2rYdC6ffcbKBTsLTnONgAXqwqo73A8HmKjYMm",
                    email: 'administrator@mail.com',
                    password: 'secret'
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
						if (response.data.status == "success") {
							this.$router.push("/");
							this.$toast.info("login success...");
						} else {
							vm.error = true;
							vm.message = response.data.message;
							this.$toast.error("login failed.ssss.");
						}
						this.loading = false;
					})
					.catch(err => {
						vm.error = true;
						vm.message = err.response.data.message;
						this.$toast.error("login failed..");
						this.loading = false;
					});
			}
		}
	};
</script>

<style></style>