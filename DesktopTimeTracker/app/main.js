import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import App from './App.vue';
import routes from './utils/routes.js';
import session from './store/session.js';
import Lang from 'vuejs-localization'

Lang.requireAll(require.context('./lang', true, /\.js$/));

Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(Lang, { default: 'es' });


const router = new VueRouter({
	routes: routes
});

var eventHub = new Vue({
	el:'#appWrapper',
	store: session,
	router,
	components:{App}
});

