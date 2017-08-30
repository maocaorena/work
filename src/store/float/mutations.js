export default {
	changeFloatSettingAlert(state, status) {
		//素材编辑弹窗
		state.floatSettingAlert = status;
	},
	changeSelectActiveAlert(state, status) {
		//选择活动弹窗
		state.selectActiveAlert = status;
	},
	pushFloatSettingMessage(state, message) {
		//编辑的信息
		state.floatSettingMessage = message;
	},
	pushIdList(state, list) {
		//编辑的信息
		state.idList = list;
	},
}
