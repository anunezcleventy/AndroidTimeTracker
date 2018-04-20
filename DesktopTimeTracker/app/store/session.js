import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	user: {
		id: 0,
		firstName: "",
		lastNamme: ""
	}
}

const mutations = {
	SET_USER (state, user) {
		state.user = {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName
			}
	},
	SET_USER_ID (state, id) {
		state.user.id = id
	},
	SET_USER_FIRSTNAME (state, firstName) {
		state.user.firstName = firstName
	},
	SET_USER_LASTNAME (state, lastName) {
		state.user.lastName = lastName
	},
	DELETE_USER (state) {
		state.user = {
				id: 0,
				firstName: "",
				lastNamme: ""
			}
	}
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
	setUser: (context, user) => {
		context.commit("SET_USER", user)
	},setUserId: (context, userId) => {
		context.commit("SET_USER_ID", userId)
	},
	setUserFirstname: (context, userFirstName) => {
		context.commit("SET_USER_FIRSTNAME", userFirstName)
	},
	setUserLastname: (context, userLastName) => {
		context.commit("SET_USER_LASTNAME", userLastName)
	},
	deleteUser: (context) => {
		context.commit("DELETE_USER")
	}
}

const getters = {
	userId: user => state.user.id,
	userFirstName: user => state.user.firstName,
	userLastName: user => state.user.lastName
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})
