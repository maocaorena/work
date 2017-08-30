import Vue from 'vue';
import App from './prize';
import API from '../../api/API.js';
import '../../assets/css/common.css';
import '../../assets/css/flex.css';
import '../../assets/css/like.css';

import {
	Input,
	InputNumber,
	Loading,
	Message,
  	Pagination
} from 'element-ui';

Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Loading.directive)
Vue.use(Pagination)

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

import store from '../../store/prize/';
const api = new API();
Vue.prototype.api = api;
/* eslint-disable no-new */
new Vue({
	el: '#app',
	API,
	store,
	components: {
		App
	}
})
