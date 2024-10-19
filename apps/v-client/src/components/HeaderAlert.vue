<script lang="ts">
import { useHeaderAlertStore } from "../stores/header-alert";

export default {
	data: function () {
		const headerAlertStore = useHeaderAlertStore();
		return {
			headerAlertStore: headerAlertStore,
		};
	},
};
</script>

<template>
	<v-alert v-if="Boolean(headerAlertStore.success)" icon="mdi-alert-circle-outline" variant="outlined" color="success"
		title="Success">
		{{ headerAlertStore.success?.message }}
	</v-alert>

	<v-alert v-if="Boolean(headerAlertStore.error)" icon="mdi-alert-circle-outline" variant="outlined" color="error"
		title="Error">
		{{ headerAlertStore.error?.message }}
	</v-alert>

	<br />
</template>