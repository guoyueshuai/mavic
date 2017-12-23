<template>
	<div class="header">
		<div class="headerTop">
			<div class="logo">Santa Fe 健康信息护理系统</div>
			<div class="logoOut" @mousemove="logoIn()" @mouseout="logoOut()">
				<div class="user_logo"><img :src="user_logo"></div>
				{{user_name}}
				<img class="user_logo_out" src="static/img/select_out.png"/>
				<ul class="logoOutTo" v-show="LogoOutShow">
					<li @click="logoOutTo">{{ $t('login.logoOutTo') }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import Https from '@/utils/https';

import {getNavigator} from '@/components/common/dealData';
import En from '@/components/common/en';
import Zh from '@/components/common/zh';
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const messages = {
    en: En,
    zh: Zh
};
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

export default{
	i18n,
    created () {
        i18n.locale = getNavigator();
    },
	data(){
		return{
			LogoOutShow:false,
			user_logo:"",
            user_name:""
		}
	},
	mounted(){
		this.data_list();
	},
	methods:{
		logoIn(){
			this.LogoOutShow = true;
		},
		logoOut(){
			this.LogoOutShow = false;
		},
		logoOutTo(){
			Https.logout({}).then(res=>{
				this.$router.replace({ path: '/' })
			}).catch(error=>{
				console.log("网络错误")
			})
		},
		data_list(){
			Https.AccountInfo({}).then(res=>{
				if(res.data.code == 10000){
					this.user_logo = res.data.data.logo_url;
					this.user_name = res.data.data.full_name;
				}
			}).catch(error=>{
				console.log("网络错误")
			})
		}
	}
}
</script>
 
<style lang='less' scoped>
.header{
	width: 100%;
	min-width: 1200px;
	height: 80px;
	background: #365574;
	color: #fff;
	position: fixed;
	top: 0;left: 0;
	z-index: 2001;
	.headerTop{
		width: 1200px;
		height: 80px;
		margin: 0 auto;
		background: #365574;
		.logo {
			width: 300px;
			height: 24px;
			line-height: 24px;
			font-size: 24px;
			font-family: MFYueYuan_Noncommercial-Regular;
			float: left;
			margin-top:33px;
		}
		.logoOut{
			width: auto;
			height: 80px;
			font-family: PingFangSC-Medium;
			font-size: 14px;
			line-height: 80px;
			padding: 0 25px 0 40px;
			cursor: pointer;
			float: right;
			position: relative;
			.user_logo{
				width: 30px;
				height: 20px;
				position: absolute;
				left: 0;top: 50%;
				transform: translateY(-50%);
				img{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.user_logo_out{
				display: block;
				width: 10px;
				height: 5px;
				position: absolute;
				right: 5px;
				top: 50%;
				transform: translateY(-50%);
				cursor: pointer;
			}
			.logoOutTo{
				width: 120px;
				height: auto;
				text-align: center;
				font-family: Arial, Helvetica, sans-serif;
				font-size: 14px;
				line-height: 20px;
				padding: 12px 20px;
				border: 1px solid #ddd;
				border-radius: 2px;
				background: #fff;
				position: absolute;
				top: 100%;
				right: 0;
				color: #5a738e;
				li{
					letter-spacing: 5px;
				}
			}
			.logoOutTo:hover{
				background: #ededed;
				color: #000
			}
		}
	}	
}

</style>

