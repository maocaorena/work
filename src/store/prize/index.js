import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
	prizeSettingAlert: {
		state: false,
		type: 1,
	},//素材编辑弹窗
	prizeSettingMessage: {},
}

export default new Vuex.Store({
	state,
	mutations,
})
