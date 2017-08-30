<template>
	<div id="activityStyleSetting" class="flex-zhong">
		<alert v-on:close="close" v-on:submitMessage="submitStyle">
			<span slot="name">编辑活动样式</span>
			<div class="activeSetting" slot="con">
				<div class="as-item flex flex-sc" v-for="(item,index) of list" v-loading.body="loading == index">
					<p class="as-item-tit">
						{{item.text}}：
					</p>
					<div class="as-item-con">
						<el-input v-model="item.value" placeholder="请输入内容"></el-input>
					</div>
					<label class="smallHandle" for="uppic" @click="isThisUp(index)">上传</label>
				</div>
			</div>
		</alert>
		<input type="file" id="uppic" name="fileToUpload" class="fileToUpload" @change="upPic" accept="image/jpg,image/jpeg,image/png" />
	</div>
</template>
<script type="text/javascript">
	import { Util } from '../lib/util.js';
	import alert from './alert.vue';
	export default {
		data() {
			return {
				thisIn: null,
				list: [],
				loading: -1,
			}
		},
		props:[
			'type'
		],
		computed:{
			styleList(){
				return this.$store.state.styleList
			}
		},
		components: {
			'alert': alert
		},
		methods: {
			submitStyle(){
				this.$store.commit('submitStyleList',this.list);
				this.close();
			},
			isThisUp(ind){
				this.thisIn = ind;
			},
			upPic(){//上传图片
				let that = this;
				let reader = new FileReader();
				let input = document.getElementById("uppic");
				let files = input.files;
				if(/image\/\w+/.test(files[0].type)) {
					reader.readAsDataURL(files[0]);
					reader.onload = function(){
						let param = new FormData();
						param.append('file',files[0],files[0].name);
						that.loading = that.thisIn;
						that.api.postUp('infoActivityNewController.do?uploadImg', param, function(data) {
							that.loading = -1;
							if(data.data.code == 1200){
								that.$message.success({
									message: '上传成功',
									duration: Util.time()
								});
								let res = data.data.data[0].url;
								that.list[that.thisIn].value = res;
							}
						},function(res){
							console.log('上传中...');
						});
					};
				};
			},
			close() {//关闭活动样式编辑弹窗
				this.list = [];
				this.thisIn = null;
				this.$store.commit('changeActiveStyleAlert',false);
			},
		},
		created() {
			let _slist = this.styleList;
			var slist = [];//请求到的本活动的样式的key列表
			let slen = _slist.length;
			for(let j = 0; j < slen; j++){
				slist.push(_slist[j].key);
			};
			this.api.getN('infoActivityNewController.do?getCode',{
				code : this.type
			}).then((res)=>{
				if(res.data.code == 1200){
					let len = res.data.data.length;
					let arr = [];//要渲染的列表
					let dlist = [];//请求到的字典key列表
					for(let i = 0; i< len; i++){
						arr[i] = {};
						arr[i].key = res.data.data[i].typecode;
						arr[i].text = res.data.data[i].typename;
						arr[i].value = '';
						dlist.push(res.data.data[i].typecode);
					};
					//遍历字典列表，如果字典key列表在本活动样式key列表里面有，就把样式赋值给arr渲染出来
					for(let n = 0; n < dlist.length; n++){
						let bb = slist.indexOf(dlist[n]);
						if(bb >= 0){
							arr[n].value = this.styleList[bb].value;
						}
					}
					this.list = arr;
				}else{
					this.$message.error({
						message: data.data.msg,
						duration: Util.time()
					});
				}
			})
		}
	}
</script>
<style lang="scss" scoped>
	#activityStyleSetting {
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
			width: 150px;
			height: 100%;
			line-height: 40px;
			text-align: right;
			border-right: 1px solid #e2e2e2;
		}
		.as-item-con {
			width: 65%;
			margin-left: 155px;
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
