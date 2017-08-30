<template>
	<div id="addActivityPrize" class="flex-zhong">
		<alert :total="total" :page="pageNum" :pagesize="pagesize" :sizes="sizes" v-on:handleSize="handleSize" v-on:submitMessage='submitList' v-on:handdleCurrent="handdleCurrent" v-on:close="close" v-loading.body="loading">
			<span slot="name">添加活动</span>
			<div class="activeSetting" slot="con">
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						已选择：
					</p>
					<div class="as-item-con">
						<span>{{ids.length}}</span>
					</div>
				</div>
				<div class="as-item flex flex-sc">
					<p class="as-item-tit">
						搜索：
					</p>
					<div class="as-item-con">
						<el-input v-model="keyWord" placeholder="活动ID/名称"></el-input>
					</div>
					<button class="smallHandle" @click="search()">查询</button>
				</div>
				<div class="as-item flex flex-sc">
					<table @click="select" border="1" cellspacing="0" cellpadding="0">
						<colgroup>
							<col width="10">
							<col width="35">
							<col width="55">
						</colgroup>
						<tbody>
							<tr>
								<th>
									<a href="javascript:;" class="selectAll">全选</a><br>
									<a href="javascript:;" class="invert">反选</a>
								</th>
								<th>活动ID</th>
								<th>活动名称</th>
							</tr>
							<tr v-for="(item,index) of list" :class="{selectBg:item.select}">
								<td width="11" class="selectThis">
									<p class="selectThisClick" :data="index"></p>
									<input type="checkbox" v-model="item.select" name="" id="" value="" />
								</td>
								<td>{{item.activityId}}</td>
								<td>{{item.activityName}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</alert>
	</div>
</template>
<script type="text/javascript">
	import alert from './alert.vue';
	import { Util } from '../lib/util.js';
	export default {
		data() {
			return {
				list:[],
				pageNum: 1,
				sizes: [20,50,100,500,1000],
				pagesize: 20,
				total: 0,
				loading: false,
				keyWord: '',
				pages: 0,
				floatId: this.$store.state.floatSettingMessage.id,
				ids: [],//id列表
			}
		},
		props:[
			'activityIds'
		],
		computed: {
			idList(){
		    	return this.$store.state.idList;
		    },
		},
		components: {
			'alert': alert
		},
		methods: {
			submitList(){
				this.$store.commit('pushIdList',this.ids);
				this.close();
			},
			select(e){
				let classStr = e.target.className;
				switch(classStr){
					case 'selectThisClick'://选中  取消选中
						this.selectThisOrCancel(parseInt(e.target.getAttribute('data')),1)
						break;
					case 'selectAll'://全选
						this.selectAll();
						break;
					case 'invert'://反选
						this.invert();
						break;
				}
			},
			invert(){//反选
				let len = this.list.length;
				for (let i = 0; i < len; i++) {
					this.selectThisOrCancel(i,1);
				};
			},
			selectAll(){//全选
				let len = this.list.length;
				for (let i = 0; i < len; i++) {
					this.selectThisOrCancel(i,2);
				};
			},
			selectThisOrCancel(numm,type){//第一个参数是所选的index，第二个参数全选传2，其他都是1
				let _data = numm;
				let _ids = JSON.parse(JSON.stringify(this.ids));
				if (type === 1) {
					this.list[_data].select = !this.list[_data].select;
				}else{
					switch (this.list[_data].select) {
						case false:
							this.list[_data].select = !this.list[_data].select;
							break;
					}
				};
				if(this.list[_data].select){
					if(_ids.indexOf(this.list[_data].activityId) < 0){
						this.ids.push(this.list[_data].activityId);
					};
				}else{
					let idsIndex = this.ids.indexOf(parseInt(this.list[_data].activityId));
					this.ids.splice(idsIndex,1);
				};
			},
			getList(){//获取列表
				this.loading = true;
				this.api.getN('infoActivityFloatController.do?getActivityForFloat',{
					keyWord: Util.trim(this.keyWord),
					pageSize: this.pagesize,
					pageNum: this.pageNum,
					floatId: this.floatId,
				}).then((res)=>{
					this.loading = false;
					let _res = res.data;
					if(_res.code == 1200){
						this.$message.success({
							message: res.data.msg,
							duration: Util.time()
						});
						if(_res.data.list){
							this.list = this.affirm(_res.data.list);
						}else{
							this.list = [];
						};
						this.total = _res.data.total;
					}else{
						this.$message.error({
							message: res.data.msg,
							duration: Util.time()
						});
					}
				})
			},
			affirm(list){//比对选中项
				let selectedList = this.ids;
				let _list = JSON.parse(JSON.stringify(list));
				let len = selectedList.length;
				let i = 0;
				do{
					for (let j = 0; j < _list.length; j++) {
						if (selectedList[i] === _list[j].activityId) {
							_list[j].select = true;
						}else{
							if(!_list[j].select){
								_list[j].select = false;
							};
						};
					};
					i++
				}while( i < len );
				return _list;
			},
			close() {//关闭活动样式编辑弹窗
				this.ids = [];
				this.list = [];
				this.$store.commit('changeSelectActiveAlert',false);
			},
			handdleCurrent(val){//选择页数
				this.pageNum = val;
				this.getList();
			},
			handleSize(val){
				this.pagesize = val;
				this.pageNum = 1;
				this.getList();
			},
			search(){//查询
				this.pageNum = 1;
				this.getList();
			}
		},
		created() {
			this.ids  = JSON.parse(JSON.stringify(this.idList));
			this.getList();
		}
	}
</script>
<style lang="scss" scoped>
	#addActivityPrize {
		.activeSetting {
			width: 100%;
			border-top: 1px solid #e2e2e2;
		}
		.as-item {
			position: relative;
			width: 100%;
			min-height: 40px;
			padding: 1px 0;
			font-size: 14px;
		}
		.as-item-tit {
			position: absolute;
			top: 0;
			left: 0;
			width: 120px;
			height: 100%;
			line-height: 40px;
			text-align: right;
		}
		.as-item-con {
			margin-left: 130px;
		}
		.selectThis{
			cursor: pointer;
			position: relative;
			p{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
		.smallHandle {
			position: absolute;
			right: 10px;
			top: 5px;
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

	}
</style>

</style>
