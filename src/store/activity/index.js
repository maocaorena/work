import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
	activityAlert: {
		state: false,
		type: 1,//1为新增，2位编辑
	},//活动编辑弹窗
	activeStyleAlert: false,//活动样式弹窗
	activityPrizeAlert: false,//奖品弹窗
	addInAlert: false,//渠道弹窗
	selectPicAlert: false,//浮标素材弹窗
	pushActivitySettingMessage: '',//活动ID
	styleList: [],//样式列表
	addInIdList: [],//渠道列表
	prizeList: [],//奖品列表
	prizeidList: [],//奖品id列表
	floatList: [],//浮标列表
	floatidList: [],//浮标id列表
}

export default new Vuex.Store({
	state,
	mutations,
})
