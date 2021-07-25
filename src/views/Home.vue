<template>
	<div>
		<div class="page-title">
			<h3>Счет</h3>
			<button
				class="btn waves-effect waves-light btn-small"
				@click="refresh"
			>
				<i class="material-icons">refresh</i>
			</button>
		</div>

		<Loader v-if="isLoading"/>

		<div v-else class="row">
			<HomeBill
				:rates="currency.rates"
			/>
			<HomeCurrency
				:rates="currency.rates"
				:date="currency.date"
			/>
		</div>
	</div>
</template>

<script>
import HomeBill from '@/components/HomeBill';
import HomeCurrency from '@/components/HomeCurrency';

export default { 
	name: "Home",
	data: () => ({
		isLoading: true,
		currency: null
	}),
	async mounted() {
		this.currency = await this.$store.dispatch('fetchCurrency')
		this.isLoading = false;
	},
	methods: {
		async refresh() {
			console.log(1);
			this.isLoading = true;
			this.currency = await this.$store.dispatch('fetchCurrency')
			this.isLoading = false;
		}
	},
	components: { HomeBill, HomeCurrency }
};
</script>
