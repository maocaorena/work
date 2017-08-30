<template>
	<div id="alertHandle" class="flex-zhong">
		<alert v-on:close="close" v-on:submitMessage='submitStyle' v-loading.body="loading">
			<span slot="name">活动编辑</span>
			<div class="activeSetting" slot="con">
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						素材ID：
					</p>
					<div class="as-item-con">
						<span>{{message.id}}</span>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						素材名称：
					</p>
					<div class="as-item-con">
						<el-input v-model="message.name" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						素材图片：
					</p>
					<div class="as-item-con">
						<div class="aic-style-item flex flex-sc height40">
							<label class="smallHandle" for="upbanner">上传</label>
							<input type="file" id="upbanner" name="fileToUpload" class="fileToUpload" @change="upImg" accept="image/jpg,image/jpeg,image/png" />
						</div>
						<div class="aic-style-item">
							<img class="img100" :src="message.img" alt="" />
						</div>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						投放活动：
					</p>
					<div class="as-item-con">
						<div class="aic-style-item flex flex-sc height40">
							<p class="asi-left flex flex-sc">
								<button class="smallHandle" @click="openSelectActive">选择活动</button>
							</p>
							<p class="asi-right">
								{{idList.length}}
							</p>
						</div>
					</div>
				</div>
			</div>
		</alert>
		<select-activity :activityIds="message.activityIds" v-if="selectActiveAlert"></select-activity>
	</div>
</template>
<script type="text/javascript">
	import { Util } from '../lib/util.js';
	import alert from './alert.vue';
	import selectActivity from './selectActivity.vue';

	export default {
		data() {
			return {
				message: {
					id: '',
					name: '',
					img: '',
					activityIds: [],
				},
				id: this.$store.state.floatSettingMessage.id,
				loading: false,
			}
		},
		components: {
			'alert': alert,
			'select-activity': selectActivity,
		},
		computed: {
		    selectActiveAlert(){
		    	return this.$store.state.selectActiveAlert;
		    },
			idList(){
		    	return this.$store.state.idList;
		    },
		},
		methods: {
			close() {//关闭编辑弹框
				this.$store.commit('pushIdList',[]);
				this.$store.commit('pushFloatSettingMessage',{});
				this.$store.commit('changeFloatSettingAlert',{
					state: false,
					type: 1,
				});
			},
			upImg(){
				let that = this;
				let reader = new FileReader();
				let input = document.getElementById("upbanner");
				let files = input.files;
				this.loading = true;
				if(/image\/\w+/.test(files[0].type)) {
					reader.readAsDataURL(files[0]);
					reader.onload = function(){
						let param = new FormData();
						param.append('file',files[0],files[0].name);
						param.get('file')
						that.api.postUp('infoActivityFloatController.do?uploadImg', param, function(data) {
							that.loading = false;
							if(data.data.code == 1200){
								let res = data.data.data[0].url;
								that.message.img = res;
							}
						},function(res){
							console.log('上传中...');
						});
					};
				};
			},
			getIdMessage(){
				this.loading = true;
				this.api.getN('infoActivityFloatController.do?getFloatById',{
					id: this.id,
				}).then((res)=>{
					this.loading = false;
					let _res = res.data;
					if(_res.code == 1200){
						this.message = _res.data;
						this.$store.commit('pushIdList',_res.data.activityIds || []);
					}else{
						this.$message.error({
							message: res.data.msg,
							duration: Util.time()
						});
					}
				})
			},
			submitStyle(){
				let params = JSON.parse(JSON.stringify(this.message));
				let _params = {
					id: params.id,
					name: params.name,
					img: params.img,
					activityId: JSON.stringify(this.idList),
				}
				this.loading = true;
				this.api.postN('infoActivityFloatController.do?settingFloat',_params).then((res)=>{
					this.loading = false;
					if(res.data.data){
						this.$message.success({
							message: res.data.msg,
							duration: Util.time()
						});
						this.close();
						this.$emit('submitSuccess', '')
					}else{
						this.$message.error({
							message: res.data.msg,
							duration: Util.time()
						});
					}
				});
			},
			openSelectActive(){
				this.$store.commit('changeSelectActiveAlert',true);
			},
		},
		created() {
			if(this.$store.state.floatSettingAlert.type == 2){
				this.getIdMessage();
			};
		}
	}
</script>
<style lang="scss" scoped>
	#alertHandle {
		.activeSetting {
			width: 100%;
			border-top: 1px solid #e2e2e2;
			border-left: 1px solid #e2e2e2;
			border-right: 1px solid #e2e2e2;
		}
		.as-item {
			position: relative;
			width: 100%;
			min-height: 40px;
			padding: 1px 0;
			font-size: 14px;
			border-bottom: 1px solid #e2e2e2;
		}
		.as-item-tit {
			position: absolute;
			top: 0;
			left: 0;
			width: 120px;
			height: 100%;
			line-height: 40px;
			text-align: right;
			border-right: 1px solid #e2e2e2;
		}
		.as-item-con {
			margin-left: 130px;
		}
		.aic-style-item {
			width: 500px;
		}
		.asi-left {
			width: 100px;
			height: 100%;
			text-align: right;
		}
		.asi-right {
			color: #555;
		}
		.smallHandle {
			display: block;
			width: 70px;
			height: 30px;
			line-height: 20px;
			text-align: center;
			padding: 5px;
			color: #fff;
			background: #20a0ff;
			border-radius: 3px;
			cursor: pointer;
		}
		#upbanner{
			display: none;
		}
		.img100 {
			max-width: 100%;
		}
		.img80{
			width: 80px;
		}
		.height20 {
			height: 20px;
			line-height: 20px;
		}
		.height40 {
			height: 40px;
			line-height: 40px;
		}
	}
</style>

</style>
