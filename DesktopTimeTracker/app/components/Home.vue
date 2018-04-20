<template>
	<!-- The HTML template for our component -->
	<div class="home">
		<div class="header">
			<div class="hamburguer" v-on:click="toggleMenu()"></div>
			<div class="title">
				<h5>{{ $lang.messages.my_schoolclasses }}</h5>
			</div>
			<div class="searchbox">
				<form @submit.prevent="submitSearchForm" class="srch-form">
					<div class="srch-wrapper">
						<input type="text" class="srch-input" v-model="searchInput" :placeholder="$lang.messages.search_placeholder" />
						<button class="srch-button" type="submit">
						</button>
						<button class="close-button" type="reset" v-on:click="submitSearchForm('close')">
						</button>
					</div>
				</form>
			</div>
		</div>
		<div class="overlay" v-bind:class="{ active: isMenuOpen }" v-on:click="toggleMenu()">
		</div>
		<div class="menu" v-bind:class="{ open: isMenuOpen }">
			<div class="menu-header">
				<div class="logo-container">
					<div class="logo"></div>
				</div>
				<div class="user">
					<div class="profile-image"></div>
					<div class="name">
						<div class="dropdown">
							<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							{{ userFirstName }} {{ userLastName }}
							</button>
							<div class="recorded-users dropdown-menu" aria-labelledby="dropdownMenuButton">
								<div class="recorded-users-box" v-bind:style="{ 'max-height': recordedUsersBoxHeight + 'px' }" v-bind:class="{ show: showAllUsers }">
									<div class="user" v-for="user in recordedUsers" :key="user.id">
										<div class="col-2 profile-image"></div>
										<a class="col-9" href="#" v-on:click="goToLogin2(user)" >{{ user.firstName }} {{ user.lastName }}</a>
									</div>
								</div>
								<div class="more-users" v-on:click.stop.prevent="toggleShowMoreUsers()" v-bind:class="{ show: showMoreUsersButton }"></div>
								<div class="user other-account">
									<div class="col-2 profile-image"></div>
									<a class="col-9" href="#" v-on:click="goToLogin2()" >{{ $lang.messages.login_change_account }}</a>
								</div>
								<div class="dropdown-divider"></div>
								<div class="user">
									<div class="col-2 exit-icon"></div>
									<a class="col-9" href="#" v-on:click="logOut()" >{{ $lang.messages.exit }}</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="menu-body">
				<div class="divider"></div>
				<div class="sync-button">
					<div class="col-2 sync-icon"></div>
					<a class="col-9" href="#" v-on:click="logOut()" >{{ $lang.messages.sync_button }}</a>
				</div>
			</div>
			<div class="menu-footer">
			</div>
		</div>
		<component class="content-component" v-bind:is="content"></component>
	</div>
</template>

<script>

	import api from '../store/api.js';
	import dao from '../store/dao.js';
	import eventHub from '../shared/EventHub';
	import Schoolclasses from './Schoolclasses.vue';
	import Subjects from './Subjects.vue';
	import Projects from './Projects.vue';
	import Resources from './Resources.vue';
	import modal from './Modal.vue';
	import facade from '../shared/LSFacade';
	import { mapGetters } from 'vuex';

	export default {

		components:{
			Schoolclasses,
			modal
		},
		props: ['recordedUsers'],
		computed: mapGetters ([
			'userId',
			'userFirstName',
			'userLastName'
			]),
		data: function () {
			return {
				content: 'Schoolclasses',
				isModalVisible: false,
				isMenuOpen: false,
				userSelectorOpen:false,
				searchInput: '',
				showMoreUsersButton: false,
				showAllUsers: false,
				showUsersNumber: 3,
				recordedUsersBoxHeight: 0
			}
		},
		methods: {
			submitSearchForm: function(button=null) {

				var $wrapper = $('.srch-wrapper'), 
					isOpen = $wrapper.hasClass('open');
					$wrapper.toggleClass('open')
					.find('.srch-input')[isOpen ? 'blur' : 'focus']();

				//TODO: handle search input data
				if(button != 'close' && isOpen && this.searchInput != ""){
					console.log(this.searchInput);
					this.searchInput = "";
				}
				
			},
			showModal: function() {
				this.isModalVisible = true;
			},
			closeModal: function() {
				this.isModalVisible = false;
			},
			toggleMenu: function() {

				if(this.isMenuOpen){
					this.isMenuOpen = false;
				} else {
					this.updateRecordedUsersBoxHeight();
					this.isMenuOpen = true;
				}
			},
			logOut: function() {
				this.$store.dispatch('deleteUser');
				this.$parent.goToLogin1();
			},
			goToLogin2: function (user) {
				this.$store.dispatch('deleteUser');
		      	this.$parent.goToLogin2(user);
		    },
			toggleShowMoreUsers(){
				if(this.showAllUsers){
					this.showAllUsers = false;
					this.updateRecordedUsersBoxHeight();
				} else {
					this.showAllUsers = true;
					this.updateRecordedUsersBoxHeight();
				}
			},
			updateRecordedUsersBoxHeight() {
				if(Object.keys(this.recordedUsers).length > 3){
					this.showMoreUsersButton = true;
				}
				var userElementHeight = ($('.recorded-users-box>.user').height() + parseInt($('.recorded-users-box>.user').css('margin-top')))
				if(this.showAllUsers || (Object.keys(this.recordedUsers).length <= this.showUsersNumber)){
					this.recordedUsersBoxHeight = (Object.keys(this.recordedUsers).length) * userElementHeight;
				} else {
					this.recordedUsersBoxHeight = this.showUsersNumber * userElementHeight;
				}
			}
		}
	}

</script>
