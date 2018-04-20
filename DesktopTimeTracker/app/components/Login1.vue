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
						<h5>{{ $lang.messages.login_select_account }}</h5>
					</div>
				</div>
			</div>
			<div class="row recorded-users">
				<div class="recorded-users-box" v-bind:style="{ 'max-height': recordedUsersBoxHeight + 'px' }" v-bind:class="{ show: showAllUsers }">
					<div class="user" v-for="user in recordedUsers" :key="user.id">
						<div class="col-2 profile-image"></div>
						<a class="col-9" href="#" v-on:click="goToLogin2(user)" >{{ user.firstName }} {{ user.lastName }}</a>
					</div>
				</div>
				<div class="more-users" v-on:click="toggleShowMoreUsers()" v-bind:class="{ show: showMoreUsersButton }"></div>
				<div class="user other-account">
					<div class="col-2 profile-image"></div>
					<a class="col-9" href="#" v-on:click="goToLogin2()" >{{ $lang.messages.login_change_account }}</a>
				</div>
			</div>
		</div>
		<modal v-show="isModalVisible" @close="closeModal" />
	</div>
</template>

<script>
	import api from '../store/api.js';
	import eventHub from '../shared/EventHub';
	import facade from '../shared/LSFacade';
	import modal from './Modal.vue';

	export default {

		components:{
			modal
		},
		props: ['recordedUsers'],
		data: function () {
		    return {
		        isModalVisible: false,
				showMoreUsersButton: false,
				showAllUsers: false,
				showUsersNumber: 3,
				recordedUsersBoxHeight: 0
		    }
	   	},
		mounted(){
			if(Object.keys(this.recordedUsers).length > 3){
				this.showMoreUsersButton = true;
			}
			if(Object.keys(this.recordedUsers).length == 0){
				this.$parent.goToLogin2();
			}
			this.recordedUsersBoxHeight = this.showUsersNumber * ($('.user').height() + parseInt($('.user').css('margin-top')));
		},
		methods: {
			goToLogin2: function (user) {
		      	this.$parent.goToLogin2(user);
		    },
			showModal: function() {
				this.isModalVisible = true;
			},
			closeModal: function() {
				this.isModalVisible = false;
			},
			toggleShowMoreUsers(){
				var userElementHeight = ($('.user').height() + parseInt($('.user').css('margin-top')))
				if(this.showAllUsers){
					this.showAllUsers = false;
					this.recordedUsersBoxHeight = this.showUsersNumber * userElementHeight;
				} else {
					this.showAllUsers = true;
					this.recordedUsersBoxHeight = (Object.keys(this.recordedUsers).length) * userElementHeight;
				}
			}
		}
	}
</script>
