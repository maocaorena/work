<template>
	<div id="activity" class="wrapper">
		<div class="search-bar flex">
			<div class="seach-bar-item flex flex-sc">
				<p>活动名称：</p>
				<div class="item-wrapper">
					<el-input v-model="keyWord" placeholder="请输入内容"></el-input>
				</div>
			</div>
			<div class="seach-bar-item flex flex-sc">
				<p>活动类型：</p>
				<div class="item-wrapper">
					<el-select v-model="acttypeSelect" clearable placeholder="请选择">
				      	<el-option v-for="item of acttype" :label="item.typename" :value="item.typecode"></el-option>
				    </el-select>
				</div>
			</div>
			<div class="seach-bar-item flex flex-sc">
				<p>投放类型：</p>
				<div class="item-wrapper">
					<el-select v-model="deliverySelect" clearable placeholder="请选择">
				      	<el-option v-for="item of delivery" :label="item.typename" :value="item.typecode"></el-option>
				    </el-select>
				</div>
			</div>
			<div class="seach-bar-item flex flex-sc">
				<p>状态:</p>
				<div class="item-wrapper">
					<el-select v-model="actstateSelect" clearable placeholder="请选择">
				      	<el-option v-for="item of actstate" :label="item.typename" :value="item.typecode"></el-option>
				    </el-select>
				</div>
			</div>
			<div class="seach-bar-item flex flex-sc">
				<button class="search-btn" @click="search()">查询</button>
			</div>
			<div class="seach-bar-item flex flex-sc">
				<button class="search-btn" @click="openActivityAlert(1)">新增</button>
			</div>
		</div>
		<div class="content" v-loading.body="loading">
			<div class="list-tit">
				<table class="list" border="1" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width="15">
						<col width="8">
						<col width="18">
						<col width="10">
						<col width="10">
						<col width="11">
						<col width="8">
						<col width="8">
						<col width="8">
						<col width="8">
						<col width="19">
						<col width="19">
						<col width="8">
						<col width="21">
					</colgroup>
					<thead>
						<tr>
							<th>操作</th>
							<th>活动ID</th>
							<th>活动名称</th>
							<th>活动策划</th>
							<th>活动类型</th>
							<th>投放类型</th>
							<th>投放渠道</th>
							<th>抽奖次数</th>
							<th>奖品数</th>
							<th>浮标素材</th>
							<th>上线时间</th>
							<th>下线时间</th>
							<th>状态</th>
							<th>活动URL</th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="list-container">
				<table class="list" border="1" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width="15">
						<col width="8">
						<col width="18">
						<col width="10">
						<col width="10">
						<col width="11">
						<col width="8">
						<col width="8">
						<col width="8">
						<col width="8">
						<col width="19">
						<col width="19">
						<col width="8">
						<col width="21">
					</colgroup>
					<tbody class="list-con" @click="haha">
						<tr v-for="(item,index) of list" class="list-con-item">
							<!-- 操作 -->
							<td>
								<a href="javascript:;" :data="item.activityId" class="mode mode1" v-if="item.activityState == 0 || item.activityState == 2"">编辑</a>
								<a href="javascript:;" :data="item.activityId" class="mode mode1" v-if="item.activityState == 1">查看</a>
								<a href="javascript:;" :data="item.activityId" class="mode copy">复制活动</a>
								<br />
								<a href="javascript:;" :data="item.activityId" class="mode start" v-if="item.activityState == 0">启用</a>
								<a href="javascript:;" :data="item.activityId" class="mode stop" v-if="item.activityState == 1">停用</a>
							</td>
							<!--活动ID-->
							<td>{{item.activityId}}</td>
							<!--活动名称-->
							<td>{{item.activityName}}</td>
							<!--活动策划-->
							<td>{{item.activityPlanText}}</td>
							<!--活动类型-->
							<td>{{item.activityTypeText}}</td>
							<!--投放类型-->
							<td>{{item.deliveryStateText}}</td>
							<!--投放渠道-->
							<td>{{item.appBusinessCount}}</td>
							<!--抽奖次数-->
							<td>{{item.awardTimes}}</td>
							<!--奖品数-->
							<td>{{item.prizeCount}}</td>
							<!--浮标素材-->
							<td>{{item.floatCount}}</td>
							<!--上线时间-->
							<td>{{item.planStartTime | dateTime}}</td>
							<!--下线时间-->
							<td>{{item.planEndTime | dateTime}}</td>
							<!--状态-->
							<td>{{item.activityStateText}}</td>
							<!--活动URL-->
							<td>{{item.activityurl}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="pagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<activity-setting v-if="activityAlert.state" v-on:submitSuccess="getList"></activity-setting>
	</div>
</template>

<script>
	import {Util} from '../../lib/util.js';
	import activitySetting from '../../components/activitySetting.vue';

	export default {
		data() {
				return {
					acttype: [],//活动类型列表
					delivery: [],//投放类型列表
					actstate: [],//状态列表
					acttypeSelect: '',//活动类型
					deliverySelect: '',//投放类型
					actstateSelect: '',//状态
					list:[],
					pageNum: 1,
					pagesize: 10,
					total: 0,
					loading: false,
					keyWord: '',
				}
			},
			computed: {
			    activityAlert(){
			    	return this.$store.state.activityAlert
			    },
			},
			components: {
				'activity-setting': activitySetting,
			},
			filters: {
			    dateTime: function (value) {
					return Util.dateTime(value);
			    }
			},
			methods: {
				haha(e){
					let classStr = e.target.className.split(" ")[1];
					let message = JSON.parse(e.target.getAttribute('data'));
					switch(classStr){
						case 'mode1':
							this.openActivityAlert(2,message);
							break;
						case 'copy':
							this.copy(message);
							break;
						case 'start':
							this.start(message);
							break;
						case 'stop':
							this.stop(message);
							break;
					}
				},
				copy(thisId){//复制
					this.api.getN('infoActivityNewController.do?copyActivity',{
						id: thisId,
					}).then((data)=>{
						if(data.data.data){
							this.$message.success({
								message: data.data.msg,
								duration: Util.time()
							});
							this.getList();
						}else{
							this.$message.error({
								message: data.data.msg,
								duration: Util.time()
							});
						}
					})
				},
				start(thisId){//启用
					this.api.getN('infoActivityNewController.do?changeActivityState',{
						id: thisId,
						state: 1
					}).then((data)=>{
						if(data.data.data){
							this.$message.success({
								message: data.data.msg,
								duration: Util.time()
							});
							this.getList();
						}else{
							this.$message.error({
								message: data.data.msg,
								duration: Util.time()
							});
						}
					})
				},
				stop(thisId){//停用
					this.api.getN('infoActivityNewController.do?changeActivityState',{
						id: thisId,
						state: 0
					}).then((data)=>{
						if(data.data.data){
							this.$message.success({
								message: data.data.msg,
								duration: Util.time()
							});
							this.getList();
						}else{
							this.$message.error({
								message: data.data.msg,
								duration: Util.time()
							});
						}
					})
				},
				openActivityAlert(type1,message){//打开活动编辑弹窗
					if(message){
						this.$store.commit('pushActivitySettingMessage',message);
					};
					this.$store.commit('changeActivityAlert',{
						state: true,
						type: type1,//1为新增，2位编辑
					});
				},
				search(){
					this.pageNum = 1;
					this.getList();
				},
				handleSizeChange(val){//改变一页的条数
					this.pagesize = val;
					this.pageNum = 1;
					this.getList();
				},
				handleCurrentChange(val){//改变页数
					this.pageNum = val;
					this.getList();
				},
				getList(){//获取列表
					this.loading = true;
					this.api.getN('infoActivityNewController.do?getActivitys',{
						keyWord: Util.trim(this.keyWord),
						pageSize: this.pagesize,
						pageNum: this.pageNum,
						activitytype: this.acttypeSelect,
						deliverystate: this.deliverySelect,
						activityState: this.actstateSelect,
					}).then((res)=>{
						this.loading = false;
						let _res = res.data;
						if(_res.code == 1200){
							this.$message.success({
								message: res.data.msg,
								duration: Util.time()
							});
							this.list = _res.data.list;
							this.total = _res.data.total;
						}else{
							this.$message.error({
								message: res.data.msg,
								duration: Util.time()
							});
						}
					})
				},
				getActstate(){//获取活动状态
					this.api.getN('infoActivityNewController.do?getCode',{
						code: 'actstate'
					}).then((data)=>{
						let _res = data.data;
						if(_res.code == 1200){
							this.actstate = _res.data;
						}else{
							this.$message.error({
								message: res.data.msg,
								duration: Util.time()
							});
						}
					});
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
			},
			created() {
				this.getActtype();
				this.getDelivery();
				this.getActstate();
				this.getList();
			}
	}
</script>

<style lang="scss" scoped>
	#activity {
		min-width: 1400px;
		width: 100%;
	}
</style>
