<template>
	<div class="row">
		<div class="col-12">
			<p>test</p>
			<p>This is my id: {{ id }}</p>
		</div>
	</div>
</template>

<script>

	export default {
		data(){
			return {
				id: this.$route.params.id
			}
		}
	}
</script>