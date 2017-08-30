import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
	floatSettingAlert: {
		state: false,
		type: 1,
	},//素材编辑弹窗
	selectActiveAlert: false,//选择活动弹窗
	floatSettingMessage: {},
	idList: [],
}

export default new Vuex.Store({
	state,
	mutations,
})
