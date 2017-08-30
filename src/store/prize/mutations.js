export default {
	changePrizeSettingAlert(state, status) {
		//素材编辑弹窗
		state.prizeSettingAlert = status;
	},
	pushPrizeSettingMessage(state,message){
		state.prizeSettingMessage = message;
	},
}
