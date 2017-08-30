export default {
	changeActivityAlert(state, status) {
		//活动编辑弹窗
		state.activityAlert = status;
	},
	changeActiveStyleAlert(state, status) {
		//活动样式弹窗
		state.activeStyleAlert = status;
	},
	changeActivityPrizeAlert(state, status) {
		//奖品弹窗
		state.activityPrizeAlert = status;
	},
	changeAddInAlert(state, status) {
		//渠道弹窗
		state.addInAlert = status;
	},
	pushActivitySettingMessage(state, message) {
		//编辑的信息
		state.pushActivitySettingMessage = message;
	},
	submitStyleList(state, styleList) {
		//样式列表
		state.styleList = styleList;
	},
	pushAddInIdList(state, list) {
		//渠道列表
		state.addInIdList = list;
	},
	pushPrizeList(state, list) {
		//奖品列表
		state.prizeList = list;
	},
	pushPrizeidList(state, list) {
		//奖品id列表
		state.prizeidList = list;
	},
	changeSelectPicAlert(state, status) {
		//浮标素材弹窗
		state.selectPicAlert = status;
	},
	pushFloatList(state, list) {
		//浮标素材列表
		state.floatList = list;
	},
	pushFloatidList(state, list) {
		//浮标素材id列表
		state.floatidList = list;
	},
}
