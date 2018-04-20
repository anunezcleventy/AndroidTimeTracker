<template>
	<!-- The HTML template for our component -->
	<component v-bind:is="window" :recordedUsers="recordedUsers" :selectedUser="selectedUser"></component>
</template>

<script>
	// the Javascript for our component
	// We will export a Vue component options object here
	import Login1 from './components/Login1.vue';
	import Login2 from './components/Login2.vue';
	import Home from './components/Home.vue';
	import facade from './shared/LSFacade';
	import dao from './store/dao';
	import eventHub from './shared/EventHub';

	export default{
		components:{
			Login1,
			Login2,
			Home
		},

		data(){
			return {
				//TODO: create loading component
				window: '',
				recordedUsers: [],
				selectedUser: ''
			}
		},
		beforeMount(){
			console.log("before mount app")
			facade.getRecordedUsers((err, recordedUsers) => {
				if(err){
					//TODO:handle error
					console.log(err);
				}else{
					if( Object.keys(recordedUsers).length == 0 ) {
						this.window = 'Login2';
						this.recordedUsers = [];
					}else{
						this.recordedUsers = recordedUsers;
						this.window = 'Login1';
						//eventHub.$emit('recordedUsers', recordedUsers);
					}
				}
			});

		},
		mounted(){


			//TODO: change emit listener to the facade
			dao.on('user-updated', this.updateRecordedUsers);
			// declare reactions to events
			window.addEventListener('online', function(e) {
				console.log('we are back');
				// Sync data
			});
			window.addEventListener('offline', function(e) {
				console.log('connection lost')
			});
		},
		methods:{
			goToLogin2: function (selectedUser = '') {
		 		this.selectedUser = selectedUser;
		 		this.window = 'Login2';
		    },
		    goToHome: function () {
		 		this.window = 'Home';
			},
			goToLogin1: function () {
				this.selectedUser = '';
				this.window = 'Login1';
			},
			updateRecordedUsers: function () {
				console.log("Update recorded users");
				facade.getRecordedUsers((err, recordedUsers) => {
					if(err){
						//TODO:handle error
						console.log(err);
					}else{
						if( Object.keys(recordedUsers).length != 0 ) {
							this.recordedUsers = recordedUsers;
						}else{
							this.recordedUsers = [];
							//eventHub.$emit('recordedUsers', recordedUsers);
						}
					}
				});
			}
		}
	}
</script>