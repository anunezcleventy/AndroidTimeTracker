<template>
	<div class="login container-fluid text-center d-flex vh100">
		<div class="login-box align-self-center">
			<div class="row">
				<div class="col-12">
					<div class="logo">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="subtitle">
						<h5>Login:</h5>
					</div>
				</div>
			</div>
			<form @submit.prevent="submitData">
				<div class="row">
					<div class="col-12">
						<input class="w-100" type="text" v-model="login.user" name="user" placeholder="Usuario" />
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<input class="w-100" type="password" v-model="login.password" name="password" placeholder="Contraseña" />
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<button type="submit" class="btn btn-primary w-100">{{ $lang.messages.login_submit }}</button>
					</div>
				</div>
				<div class="row">
					<div class="col-12 text-left">
						<md-checkbox v-model="login.remember">{{ $lang.messages.login_remember }}</md-checkbox>
					</div>
				</div>
			</form>
		</div>
		<modal v-show="isModalVisible" @close="closeModal" />
	</div>
</template>

<script>
	import api from '../store/api.js';
	import modal from './Modal.vue';
	import facade from '../shared/LSFacade';
	import { mapGetters } from 'vuex'

	export default {

		components:{
			modal
		},
		props: ['selectedUser'],
		computed: mapGetters ([
			'userId',
			'userFirstName',
			'userLastName'
			]),
		data: function () {
		    return {
		        login: {
		        	user: this.selectedUser.login,
		        	password: '',
		        	remember: (this.selectedUser.remember)? true : false
		        },
		        isModalVisible: false
		     }
		   },
		methods: {
			submitData: function() {

				facade.userExists(this.login.user,  (userResult) =>{

					if (userResult != false) {
						//check session
						//TODO: login skipped or disabled 
						if(facade.checkUserLoginDate(userResult.loginDate)) {
							//local DB login
							if(facade.md5(this.login.password) == userResult.pass) {
								facade.updateRememberUser(userResult, (this.login.remember) ? 1 : 0);
								console.log('Local DB login success');
								this.$store.dispatch('setUser', userResult);
								this.$parent.goToHome();
							}else{
								//TODO: contraseña incorrecta
								console.log('Contraseña incorrecta');
							}
						}else{

							console.log('Ha expirado');
							this.apiLogin();
						}
					}else{
						this.apiLogin();
					}
				});

			},
			showModal: function() {
				this.isModalVisible = true;
			},
			closeModal: function() {
				this.isModalVisible = false;
			},
			apiLogin: function() {


				facade.getIp((resultIp) => {
					if(resultIp != false) {
						facade.apiLogin(this.login, resultIp, facade.getTheme(), (userResult) => {
							if(typeof userResult === 'object') {
								console.log('Usuario guardado');
								this.$store.dispatch('setUser', userResult);
								this.$parent.goToHome();
							}else{

								switch (userResult) {
									case 'L121':
										//TODO: modal contraseña incorrecta
										console.log('Credenciales incorrectas');
										break;

									case 'NO NETWORK':
										//TODO: modal internet
										console.log('No hay acceso a internet');
										break;
									case false:
										//TODO: display modal
										console.log('Error ocurred');
										break;
									default:
										//TODO: display modal
										console.log('ERROR DESCONOCIDO');
										break;
									}
							}
							
						});
					}else{
						//TODO: Handle error
						console.log('IP error')
					}
				});

			}

		}
	}
</script>
