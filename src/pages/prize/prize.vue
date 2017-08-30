<template>
	<div id="prize" class="wrapper">
		<div class="search-bar flex">
			<div class="seach-bar-item flex flex-sc">
				<p>奖品名称：</p>
				<div class="item-wrapper">
					<el-input v-model="keyWord" placeholder="请输入内容"></el-input>
				</div>
			</div>
			<div class="seach-bar-item flex flex-sc">
				<button class="search-btn" @click="search()">查询</button>
			</div>
			<div class="seach-bar-item flex flex-sc">
				<button class="search-btn" @click="openPrizeSettingAlert(1)">新增</button>
			</div>
		</div>
		<div class="content" v-loading.body="loading">
			<div class="list-tit">
				<table class="list" border="1" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width="12">
						<col width="12">
						<col width="12">
						<col width="12">
						<col width="12">
						<col width="12">
					</colgroup>
					<thead>
						<tr>
							<th>操作</th>
							<th>奖品ID</th>
							<th>奖品名称</th>
							<th>奖品图片</th>
							<th>备注</th>
							<th>投放活动</th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="list-container">
				<table class="list" border="1" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width="12">
						<col width="12">
						<col width="12">
						<col width="12">
						<col width="12">
						<col width="12">
					</colgroup>
					<tbody class="list-con" @click="allClick">
						<tr v-for="(item,index) in list" class="list-con-item">
							<!-- 操作 -->
							<td>
								<a href="javascript:;" :data='JSON.stringify(item)' class="mode mode1">编辑</a>
							</td>
							<!--活动ID-->
							<td>{{item.id}}</td>
							<!--活动名称-->
							<td>{{item.name}}</td>
							<!--活动策划-->
							<td><img class="tdImg" :src="item.img" alt=""></td>
							<!--奖品备注-->
							<td>{{item.remark}}</td>
							<!--活动类型-->
							<td>{{item.activityCount}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="pagination">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<prize-setting v-if="prizeSettingAlert.state" v-on:submitSuccess="getList"></prize-setting>
	</div>
</template>

<script>
	import {Util} from '../../lib/util.js';
	import prizeSetting from '../../components/prizeSetting.vue';
	export default {
		data() {
				return {
					list:[],
					pageNum: 1,
					pagesize: 10,
					total: 0,
					loading: false,
					keyWord: '',
				}
			},
			computed: {
			    prizeSettingAlert(){
			    	return this.$store.state.prizeSettingAlert
			    },
			},
			components: {
				'prize-setting': prizeSetting
			},
			methods: {
				search(){
					this.pageNum = 1;
					this.getList();
				},
				allClick(e){//事件委托到tbody上
					let classStr = e.target.className.split(" ")[1];
					switch(classStr){
						case 'mode1'://编辑
							let message = JSON.parse(e.target.getAttribute('data'));
							this.openPrizeSettingAlert(2,message);
							break;
					}
				},
				getList(){//获取列表
					this.loading = true;
					this.api.getN('infoActivityPrizeController.do?getPrize',{
						keyWord: Util.trim(this.keyWord),
						pageSize: this.pagesize,
						pageNum: this.pageNum,
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
				openPrizeSettingAlert(type1,message){
					//打开编辑弹窗type1  1为新增，2为编辑，message为现在信息
					if(message){
						this.$store.commit('pushPrizeSettingMessage',message);
					};
					this.$store.commit('changePrizeSettingAlert',{
						state: true,
						type: type1,
					});
				},
				handleSizeChange(val){//改变一页的条数
					this.pagesize = val;
					this.pageNum = 1;
					this.getList();
				},
				handleCurrentChange(val){//改变页数
					this.pageNum = val;
					this.getList();
				}
			},
			created() {
				this.getList()
			}
	}
</script>

<style lang="scss">
	#prize {
		min-width: 800px;
		width: 100%;
		.tdImg{
			max-width: 80px;
			max-height: 80px;
		}
	}
</style>
