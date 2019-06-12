<template>
	<v-app>
		<Header></Header>
		<v-content>
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-content>
		<Footer></Footer>
	</v-app>
</template>

<script>
	import Header from "@/views/home/layout/Header.vue";
	import Footer from "@/views/home/layout/Footer.vue";
	export default {
		name: "Home",
		components: {
			Header,
			Footer
		}
	};
</script>

<style scoped>
</style>
