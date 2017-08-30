<template>
    <div class="flex-zhong alertSetting">
        <div class="alertSetting-in" :class="fullpage">
            <div class="alertSetting-tit flex">
                <p class="alertSetting-name"><slot name="name">编辑</slot></p>
                <div class="alertSetting-handle">
                    <a v-if="!fullPage" href="javascript:;" @click="changeFullPage">最大化</a>
                    <a v-else href="javascript:;" @click="changeFullPage">还原</a>
                    <a href="javascript:;" @click="close">关闭</a>
                </div>
            </div>
            <div class="alertSetting-container">
                <slot name="con"></slot>
            </div>
            <div class="alertSetting-footer flex">
            	<div class="footer-left flex-zhong">
					<el-pagination v-if="total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="sizes"
                        :current-page="page"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
					</el-pagination>
            	</div>
            	<div class="footer-right">
            		<button class="border" @click="close">返回</button>
            		<button class="blue" @click="submitMessage" v-if="type != 1">提交</button>
            	</div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
    	props: [
            "size",
            "page",
            "total",
            "pagesize",
            "type",
            "sizes",
        ],
        data(){
            return{
                fullPage: false,
            }
        },
        computed: {
            fullpage: function () {
                return {
                    alertSettingWindow: !this.fullPage,
                    alertSettingFullPage: this.fullPage,
                }
            },
        },
        methods:{
            close(){
                this.$emit('close', '')
            },
            submitMessage(){
            	this.$emit('submitMessage', '')
            },
            changeFullPage(){
                this.fullPage = !this.fullPage;
            },
			handleCurrentChange(val){
				this.$emit('handdleCurrent', val)
			},
            handleSizeChange(val){
                this.$emit('handleSize', val)
            }
        },
        created(){
        }
    }
</script>
<style lang="scss">
    .alertSetting{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        .alertSetting-in{
        	position: relative;
            background: #fff;
        }
        .alertSettingWindow{
            width: 800px;
            height: 90%;
        }
        .alertSettingFullPage{
            width: 100%;
            height: 100%;
        }

        .alertSetting-tit{
            padding: 0 5px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #20a0ff;
            background: #fff;
        }
        .alertSetting-name{
            width: 50%;
            height: 100%;
        }
        .alertSetting-handle{
            width: 50%;
            height: 100%;
            text-align: right;
            a{
                color: #20a0ff;
            }
        }
        .alertSetting-container{
            position: absolute;
            top: 42px;
            bottom: 45px;
            right: 0;
            left: 0;
        	padding: 0 5px 0;
            width: auto;
            height: auto;
            overflow: auto;
        }
        .alertSetting-footer{
            position: absolute;
            bottom: 0;
            z-index: 999999;
        	width: 100%;
        	height: 44px;
        	background: #fff;
        	border-top: 1px solid #20a0ff;
        	.footer-left{
        		width: 75%;
        		height: 100%;
        	}
        	.footer-right{
        		width: 25%;
        		height: 100%;
        		button{
        			float: right;
        			margin-left: 10px;
        			margin-top: 7px;
        			margin-right: 10px;
        			width: 70px;
        			height: 30px;
        			background: #fff;
        			cursor: pointer;
        		}
        		.blue{
        			background: #20a0ff;
        			color: #fff;
        			border-radius: 3px;
        		}
        		.border{
        			border-radius: 3px;
        			border: 1px solid #333;
        		}
        	}
        }
    }
</style>

</style>
