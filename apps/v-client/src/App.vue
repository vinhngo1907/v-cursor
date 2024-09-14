<script lang="ts">
import SideMenu from "./components/SideMenu.vue";
import HeaderAlert from "./components/HeaderAlert.vue";
import { useHeaderAlertStore } from "./stores/header-alert";

export default {
	data: () => ({
		toggle: true,
	}),
	methods: {
		toggleDrawer() {
			this.toggle = !this.toggle;
		},
	},
	components: { SideMenu, HeaderAlert },
	errorCaptured(error: any) {
		const headerAlertStore = useHeaderAlertStore();
		headerAlertStore.setError(error);
		if (error.response?.status === 401) {
			this.$router.push({ name: "login" });
		}
	},
};
</script>

<template>
	<v-app>
		<!-- header -->
		<v-app-bar>
			<v-app-bar-nav-icon variant="text" @click.stop="toggleDrawer"></v-app-bar-nav-icon>

			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-heart</v-icon>
			</v-btn>
		</v-app-bar>

		<!-- side menu -->
		<SideMenu v-model="toggle"></SideMenu>

		<!--  content -->
		<v-main>
			<v-container>
				<HeaderAlert></HeaderAlert>
				<RouterView />
			</v-container>
		</v-main>
	</v-app>
</template>