<template>
	<div id="alertHandle" class="flex-zhong">
		<alert v-on:close="close" v-on:submitMessage='submitStyle' v-loading.body="loading" :type="message.activityState">
			<span slot="name">活动编辑</span>
			<div class="activeSetting" slot="con">
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						活动ID：
					</p>
					<div class="as-item-con">
						<span>{{id}}</span>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						活动状态：
					</p>
					<div class="as-item-con">
						<span>{{message.activityStateText}}</span>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						活动名称：
					</p>
					<div class="as-item-con">
						<el-input v-model="message.activityName" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						活动策划：
					</p>
					<div class="as-item-con">
						<el-select v-model="message.activityPlan" placeholder="请选择">
					      	<el-option v-for="item of actplan" :label="item.typename" :value="item.typecode"></el-option>
					    </el-select>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						抽奖次数：
					</p>
					<div class="as-item-con">
						<el-input-number v-model="message.awardTimes" :min="0"></el-input-number>
						<!-- <el-input v-model="message.awardTimes" placeholder="请输入内容"></el-input> -->
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						活动类型：
					</p>
					<div class="as-item-con">
						<el-select v-model="message.activityType" placeholder="请选择">
							<el-option v-for="item of acttype" :label="item.typename" :value="item.typecode"></el-option>
						</el-select>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						活动样式：
					</p>
					<div class="as-item-con">
						<div class="aic-style-item flex flex-sc height40">
							<button class="smallHandle" @click="openActiveStyleAlert">更换样式</button>
						</div>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						首页banner：
					</p>
					<div class="as-item-con">
						<div class="aic-style-item flex flex-sc height40">
							<label class="smallHandle" for="upbanner">上传</label>
							<input type="file" id="upbanner" name="fileToUpload" class="fileToUpload" @change="upBanner" accept="image/jpg,image/jpeg,image/png" />
						</div>
						<div class="aic-style-item">
							<img class="img100" :src="message.indexBanner" alt="" />
						</div>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						活动奖品：
					</p>
					<div class="as-item-con">
						<div class="aic-style-item flex flex-sc height40">
							<button class="smallHandle" @click="openActivityPrizeAlert">添加</button>
						</div>
						<div class="aic-style-item">
							<table border="" cellspacing="" cellpadding="">
								<tr>
									<th>操作</th>
									<th>奖品ID</th>
									<th>奖品名称</th>
									<th>中奖概率</th>
								</tr>
								<tr v-for="(item,index) of prizeList">
									<td>
										<a href="javascript:;" class="mode" @click="toTop(index)">置顶</a>
										<a href="javascript:;" class="mode" @click="del(index)">删除</a>
									</td>
									<td>{{item.prizeId}}</td>
									<td>{{item.prizeName}}</td>
									<td>{{item.probability}}</td>
								</tr>
								<tr>
									<td></td>
									<td></td>
									<td>广告券</td>
									<td>1</td>
								</tr>
							</table>
						</div>

					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						投放类型：
					</p>
					<div class="as-item-con">
						<el-select v-model="message.deliveryState" :modal-append-to-body="false" placeholder="请选择">
					      	<el-option v-for="item of delivery" :label="item.typename" :value="parseInt(item.typecode)"></el-option>
					    </el-select>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						投放渠道：
					</p>
					<div class="as-item-con">
						<div class="aic-style-item flex flex-sc height40">
							<p class="asi-left flex flex-sc">
								<button class="smallHandle" @click="openAddInAlert">选择渠道</button>
							</p>
							<p class="asi-right">
								{{addInIdList.length}}
							</p>
						</div>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						浮标素材：
					</p>
					<div class="as-item-con">
						<div class="aic-style-item flex flex-sc height40">
							<p class="asi-left flex flex-sc">
								<button class="smallHandle" @click="openSelectPicAlert">选择浮标素材</button>
							</p>
							<p class="asi-right">
								{{floatidList.length}}
							</p>
						</div>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						活动说明：
					</p>
					<div class="as-item-con">
						<div id="editor1">
					    </div>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						其他说明：
					</p>
					<div class="as-item-con">
						<div id="editor2">
					    </div>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						上线时间：
					</p>
					<div class="as-item-con">
						<el-date-picker v-model="message.planStartTime" @click="ssss" popper-class="haha" type="datetime" placeholder="选择日期时间" :clearable="false">
						</el-date-picker>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						下线时间：
					</p>
					<div class="as-item-con">
						<el-date-picker v-model="message.planEndTime" type="datetime" placeholder="选择日期时间" :clearable="false">
						</el-date-picker>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						模板URL：
					</p>
					<div class="as-item-con" style="width:80%;">
						<el-input v-model="message.temUrl" placeholder="请输入内容"></el-input>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						活动URL：
					</p>
					<div class="as-item-con" style="width:80%;">
						<el-input v-model="message.activityurl" placeholder="请输入内容"></el-input>
					</div>
				</div>
			</div>
		</alert>
		<activitystyle-setting v-if="activeStyleAlert" :type="message.activityType"></activitystyle-setting>
		<addactivityprize v-if="activityPrizeAlert"></addactivityprize>
		<addin v-if="addInAlert"></addin>
		<selectpic v-if="selectPicAlert"></selectpic>
	</div>
</template>
<script type="text/javascript">
	import { Util } from '../lib/util.js';
	import alert from './alert.vue';
	import activityStyleSetting from './activityStyleSetting.vue';
	import addActivityPrize from './addActivityPrize.vue';
	import addIn from './addIn.vue';
	import selectPic from './selectPic.vue';
	import wang from '../lib/wangEditor.min.js';
	import $ from 'jquery';
	var editor1,editor2;
	export default {
		data() {
			return {
				bannerImg: "/static/img/tit.png",
				id: this.$store.state.pushActivitySettingMessage,
				message: {
			        activityAttrList: [],
			        activityId: null,
			        activityName: '',
			        activityPlan: null,
			        activityPlanText: null,
			        activityState: null,
			        activityStateText: null,
			        activityType: null,
			        activityTypeText: null,
			        appBusinessCount: null,
			        appBusinessList: [],
			        awardTimes: null,
			        deliveryState: null,
			        deliveryStateText: null,
			        floatList: [],
			        indexBanner: "",
			        planEndTime: null,
			        planStartTime: null,
			        prizeList: null,
			        temUrl: null,
				},
				loading: false,
				acttype: [],//活动类型列表
				delivery: [],//投放类型列表
				actplan: [],//策划列表
				acttypeSelect: '',//活动类型
				deliverySelect: '',//投放类型
				actplanSelect: '',//策划
				edit1: null,
			}
		},
		components: {
			'alert': alert,
			'activitystyle-setting': activityStyleSetting,
			'addactivityprize' : addActivityPrize,
			'addin' : addIn,
			'selectpic' : selectPic,
		},
		computed: {
			styleList(){//活动样式列表
				return this.$store.state.styleList
			},
			addInIdList(){//渠道列表
				return this.$store.state.addInIdList
			},
			prizeList(){//奖品列表
				return this.$store.state.prizeList
			},
			prizeidList(){//奖品id列表
				return this.$store.state.prizeidList
			},
			floatidList(){//浮标素材id列表
				return this.$store.state.floatidList
			},
		    activeStyleAlert(){
		    	return this.$store.state.activeStyleAlert
		    },
		    activityPrizeAlert(){
		    	return this.$store.state.activityPrizeAlert
		    },
		    addInAlert(){
		    	return this.$store.state.addInAlert
		    },
		    selectPicAlert(){
		    	return this.$store.state.selectPicAlert
		    },
		},
		methods: {
			submitStyle(){

				let _message = JSON.parse(JSON.stringify(this.message));
				let upMessage = {};
				if(Util.trim(_message.activityName).length <= 0){
					this.$message.warning({message: '请填写活动名称',duration: Util.time()});
					return;
				};

				if(!_message.activityPlan){
					this.$message.warning({message: '请选择策划',duration: Util.time()});
					return;
				};

				if((_message.awardTimes + '').length < 1 || _message.awardTimes < 0){
					this.$message.warning({message: '请填写抽奖次数',duration: Util.time()});
					return;
				};

				if(!_message.activityType){
					this.$message.warning({message: '请选择活动类型',duration: Util.time()});
					return;
				};

				if(_message.indexBanner.length <= 0 ){
					this.$message.warning({message: '请上传banner图片',duration: Util.time()});
					return;
				};

				if(!_message.deliveryState){
					this.$message.warning({message: '请选择投放类型',duration: Util.time()});
					return;
				};

				if(!_message.planStartTime){
					this.$message.warning({message: '请选择上线时间',duration: Util.time()});
					return;
				};

				if(!_message.planEndTime){
					this.$message.warning({message: '请选择下线时间',duration: Util.time()});
					return;
				};

				if(new Date(_message.planStartTime).getTime() > new Date(_message.planEndTime).getTime()){
					this.$message.warning({message: '下线时间要晚于上线时间',duration: Util.time()});
					return;
				}
				if(this.$store.state.activityAlert.type == 2){
					upMessage.id = this.id;
				};
				upMessage.planStartTime1 = new Date(_message.planStartTime).getTime();
				upMessage.planEndTime1 = new Date(_message.planEndTime).getTime();
				upMessage.activityname = _message.activityName;
				upMessage.activityplan = _message.activityPlan;
				upMessage.awardtimes = _message.awardTimes;
				upMessage.activitytype = _message.activityType;
				upMessage.indexbanner = _message.indexBanner;
				upMessage.deliverystate = _message.deliveryState;
				upMessage.prizeIdArray = JSON.stringify(this.prizeidList);
				upMessage.floatIdArray = JSON.stringify(this.floatidList);
				upMessage.appBusinessIdArray = JSON.stringify(this.addInIdList);
				upMessage.activityAttrArray = JSON.stringify(this.styleList);
				upMessage.activityremark = editor1.txt.html();
				upMessage.otherremark = editor2.txt.html();
				upMessage.temUrl = _message.temUrl;
				upMessage.activityurl = _message.activityurl;
				this.loading = true;
				this.api.postN('infoActivityNewController.do?settingActivity',upMessage).then((data)=>{
					this.loading = false;
					if(data.data.data){
						this.$message.success({
							message: data.data.msg,
							duration: Util.time()
						});
						setTimeout(() => {
							this.close();
							this.$emit('submitSuccess', '')
						}, 1000);
					}else{
						this.$message.error({
							message: data.data.msg,
							duration: Util.time()
						});
					}
				})
			},
			toTop(ind){//奖品置顶
				let _list = JSON.parse(JSON.stringify(this.prizeList));
				let topItem = _list.splice(ind,1);
				_list.unshift(topItem[0]);
				this.$store.commit('pushPrizeList',_list);

				let _idlist = JSON.parse(JSON.stringify(this.prizeidList));
				let idtopItem = _idlist.splice(ind,1);
				_idlist.unshift(idtopItem[0]);
				this.$store.commit('pushPrizeidList',_idlist);
			},
			del(ind){//删除奖品
				let _list = JSON.parse(JSON.stringify(this.prizeList));
				_list.splice(ind,1);
				this.$store.commit('pushPrizeList',_list);

				let _idlist = JSON.parse(JSON.stringify(this.prizeidList));
				_idlist.splice(ind,1);
				this.$store.commit('pushPrizeidList',_idlist);
			},
			upBanner(){//上传banner
				let that = this;
				let reader = new FileReader();
				let input = document.getElementById("upbanner");
				let files = input.files;
				if(/image\/\w+/.test(files[0].type)) {
					reader.readAsDataURL(files[0]);
					reader.onload = function(){
						let param = new FormData();
						param.append('file',files[0],files[0].name);
						param.get('file')
						that.api.postUp('infoActivityNewController.do?uploadImg', param, function(data) {
							that.loading = false;
							if(data.data.code == 1200){
								let res = data.data.data[0].url;
								that.message.indexBanner = res;
							}
						},function(res){
							console.log('上传中...');
						});
					};
				};
			},
			close() {//关闭活动编辑弹框
				//清空store存储的信息
				this.$store.commit('submitStyleList',[]);
				this.$store.commit('pushAddInIdList',[]);
				this.$store.commit('pushPrizeList',[]);
				this.$store.commit('pushFloatidList',[]);
				this.$store.commit('pushPrizeidList', []);
				this.$store.commit('pushActivitySettingMessage', '');
				this.$store.commit('changeActivityAlert',{
					state: false,
					type: 1,//1为新增，2位编辑
				});
			},
			openActiveStyleAlert(){//打开活动样式编辑弹窗
				this.$store.commit('changeActiveStyleAlert',true);
			},
			openActivityPrizeAlert(){//打开活动奖品选择弹窗
				this.$store.commit('changeActivityPrizeAlert',true);
			},
			openAddInAlert(){//打开渠道弹窗
				this.$store.commit('changeAddInAlert',true);
			},
			openSelectPicAlert(){//打开浮标素材弹窗
				this.$store.commit('changeSelectPicAlert',true);
			},
			getIdMessage(){//获取活动详情
				this.loading = true;
				this.api.getN('infoActivityNewController.do?getActivityById',{
					id: this.id,
				}).then((res)=>{
					this.loading = false;
					let _res = res.data;
					if(_res.code == 1200){
						this.message = _res.data;
						this.$store.commit('submitStyleList',_res.data.activityAttrList || []);
						this.$store.commit('pushAddInIdList',_res.data.appBusinessList || []);
						this.$store.commit('pushPrizeList',_res.data.prizeList || []);
						this.$store.commit('pushFloatidList',_res.data.floatList || []);
						if(_res.data.prizeList){
							let len = _res.data.prizeList.length;
							let ids = [];
							if(len > 0){
								for( let i = 0; i < len; i++){
									ids.push(_res.data.prizeList[i].prizeId);
								};
							};
							this.$store.commit('pushPrizeidList', ids);
							editor1.txt.html(_res.data.activityremark);
							editor2.txt.html(_res.data.otherremark);
						}
					}else{
						this.$message.error({
							message: res.data.msg,
							duration: Util.time()
						});
					}
				})
			},
			getActtype(){//获取活动类型
				this.api.getN('infoActivityNewController.do?getCode',{
					code: 'acttype'
				}).then((data)=>{
					let _res = data.data;
					if(_res.code == 1200){
						this.acttype = _res.data;
					}else{
						this.$message.error({
							message: res.data.msg,
							duration: Util.time()
						});
					}
				});
			},
			getDelivery(){//获取投放类型
				this.api.getN('infoActivityNewController.do?getCode',{
					code: 'delivery'
				}).then((data)=>{
					let _res = data.data;
					if(_res.code == 1200){
						this.delivery = _res.data;
					}else{
						this.$message.error({
							message: res.data.msg,
							duration: Util.time()
						});
					}
				});
			},
			getActplan(){//获取策划类型
				this.api.getN('infoActivityNewController.do?getCode',{
					code: 'actplan'
				}).then((data)=>{
					let _res = data.data;
					if(_res.code == 1200){
						this.actplan = _res.data;
					}else{
						this.$message.error({
							message: res.data.msg,
							duration: Util.time()
						});
					}
				});
			},
		},
		created() {
			this.getActtype();
			this.getDelivery();
			this.getActplan();
			if(this.$store.state.activityAlert.type == 2){
				this.getIdMessage();
			};
		},
		mounted(){
			editor1 = new wang('#editor1');
			editor1.create();
			editor2 = new wang('#editor2');
			editor2.create();

			// if(document.addEventListener){
			// 	document.addEventListener('DOMMouseScroll',scrollFunc,false);
			// }
			// window.onmousewheel=document.onmousewheel=scrollFunc;
			// function scrollFunc() {
			// 	console.log($('#alertHandle'))
			// 	//$('.el-date-picker').css({'display':'none'})
			// };
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
			width: 100%;
			padding: 5px 0;
		}
		.asi-left {
			width: 140px;
			height: 100%;
			text-align: right;
		}
		.asi-right {
			color: #555;
		}
		.smallHandle {
			display: block;
			min-width: 70px;
			height: 30px;
			line-height: 20px;
			text-align: center;
			padding: 5px;
			color: #fff;
			background: #20a0ff;
			border-radius: 3px;
			cursor: pointer;
		}
		.img100 {
			max-width: 400px;
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
		#upbanner{
			display: none;
		}
	}
</style>

</style>
