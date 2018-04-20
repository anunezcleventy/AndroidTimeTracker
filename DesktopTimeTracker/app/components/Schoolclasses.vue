<template>
	<!-- The HTML template for our component -->
	<div class="schoolclasses">
		<div class="no-data-overlay">
			<div class="background"></div>
			<p>{{ $lang.messages.no_schoolclasses }}</p>
		</div>
		<div class="schoolclasses-list">
			<div class="schoolclass" v-for="schoolclass in userSchoolclasses" :key="schoolclass.id">
				<a class="col-9" href="#" v-on:click="goToSchoolclass(schoolclass)" >{{ schoolclass.name }}</a>
			</div>
		</div>
	</div>
</template>

<script>

	import facade from '../shared/LSFacade';

	export default {

		data(){
			return {
				userSchoolclasses: []
			}
		},
		beforeMount(){
			facade.getUserSchoolclasses(this.$parent.userId, response => {
				console.log(response);
			});
		},
		methods: {
			goToSchoolClass: function(schoolclass) {
				console.log(schoolclass.name)
			}
		}
		
	}

</script>
