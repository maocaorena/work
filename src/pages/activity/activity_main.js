import Vue from 'vue';
import App from './activity';
import API from '../../api/API.js';
import '../../assets/css/common.css';
import '../../assets/css/flex.css';
import '../../assets/css/like.css';

import {
	Input,
	InputNumber,
	DatePicker,
  	TimeSelect,
  	TimePicker,
	Loading,
	Message,
  	Select,
  	Option,
  	Pagination
} from 'element-ui';

Vue.use(Input)
Vue.use(InputNumber)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Loading.directive)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

import store from '../../store/activity/';

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
/*const app = new Vue({
	API,
	store
}).$mount('#app')*/
