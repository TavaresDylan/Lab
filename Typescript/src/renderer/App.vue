<script setup lang="ts">
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import NavigationDrawer from "@/layout/NavigationDrawer.vue";
onMounted(() => {
    initFlowbite();
})
</script>

<template>
	<div>
		<NavigationDrawer />
		<div class="p-4 sm:ml-64">
			<router-view />
		</div>
	</div>
</template>
