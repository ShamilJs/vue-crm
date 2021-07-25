<template>
	<div>
		<Loader v-if="isLoading"/>

		<div v-else class="app-main-layout">
			<Navbar @click="isOpen = !isOpen" v-model="isOpen" />

			<Sidebar v-model="isOpen" />

			<main class="app-content" :class="{ full: !isOpen }">
				<div class="app-page">
					<router-view />
				</div>
			</main>

			<div class="fixed-action-btn">
				<router-link custom v-slot="{ navigate, href }" to="/record">
					<a class="btn-floating btn-large blue" :href="href" @click="navigate">
						<i class="large material-icons">add</i>
					</a>
				</router-link>
			</div>
		</div>
	</div>	
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";

export default {
	name: "main-layout",
	data: () => ({
		isOpen: true,
		isLoading: true
	}),
	components: { Navbar, Sidebar },
	async mounted() {
		if (!Object.keys(this.$store.getters.info).length) {
			await this.$store.dispatch('fetchInfo')
		}

		this.isLoading = false;
	}
};
</script>
