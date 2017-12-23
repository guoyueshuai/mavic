<template>
    <div class="nav">
        <div class="null"></div>
        <dl class="user_data">
            <dd class="user_header"><img :src="user_logo"></dd>
            <dt class="user_name">{{user_name}}<br>{{ $t('aside.Welcome') }}</dt>
        </dl>
        <router-link to="/home/index" tag="div" class="index"><i class="iconfont icon-shouye"></i>{{ $t('aside.home_page') }}</router-link>
        <el-collapse accordion class="el_collapse_style">
            <el-collapse-item>
                <template slot="title">
                    <i class="iconfont icon-yujing"></i>{{ $t('aside.Early_warning_information') }}
                </template>
                <router-link tag="div" to="/home/RI_abnormal" class="router_links">{{ $t('aside.RI_abnormal') }}</router-link>
                <router-link tag="div" to="/home/Abnormal_physiological_parameters" class="router_links">{{ $t('aside.Abnormal_physiological_parameters') }}</router-link>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    <i class="iconfont icon-huoquyonghuxinxi yonhhu"></i>
                    {{ $t('aside.User_statistics') }}
                </template>
                <router-link tag="div" to="/home/user_list" class="router_links">{{ $t('aside.User_list') }}</router-link>
                <router-link tag="div" to="/home/RI_Overview" class="router_links">{{ $t('aside.RI_Overview') }}</router-link>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    <i class="iconfont icon-icon8"></i>{{ $t('aside.Information_Statistics') }}
                </template>
                <router-link tag="div" to="/home/User_information_statistics" class="router_links">{{ $t('aside.User_information_statistics') }}</router-link>
            </el-collapse-item>
            <el-collapse-item>
                <template slot="title">
                    <i class="iconfont icon-chanpinxinxi"></i>{{ $t('aside.Product_information') }}
                </template>
                <router-link tag="div" to="/home/Set_up" class="router_links">{{ $t('aside.Setting_and_feedback') }}</router-link>
            </el-collapse-item>
        </el-collapse>
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

export default {
    i18n,
    created () {
        i18n.locale = getNavigator();
    },
    data(){
        return{
            user_logo:"",
            user_name:""
        }
    },
    mounted(){
		this.data_list();
	},
    methods:{
        data_list(){
			Https.AccountInfo({}).then(res=>{
				if(res.data.code == 10000){
                    this.user_logo = res.data.data.logo_url;
                    this.user_name = res.data.data.name;
				}
			}).catch(error=>{
				console.log("网络错误")
			})
		}
    }
}
</script>
<style lang='less' scoped>
.nav{
    width: 200px;
    height: auto;
    min-height: 100%;
    padding-top: 80px;
    box-sizing: border-box;
    background: #365574;
    .el_collapse_style{
        border-top: none;
        .router_links{
            width: 100%;
            height: 40px;
            line-height: 40px;
            box-sizing: border-box;
            padding-left: 55px;
            cursor: pointer;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #DDDDDD;
            background-image: url(../../../../static/img/Oval.png);
            background-repeat: no-repeat;
            background-position: 35px center;
        }
    }
    i{
        font-size: 20px;
        padding-right: 15px;
    }
    .yonhhu{
        padding-right: 10px;
    }
    .null{
        width: 100%;
        height: 10px;
        background: #f7f7f7;
    }
    .user_data{
        width: 162px;
        height: 100px;
        margin: 0 auto;
        box-sizing: border-box;
        padding-top: 30px;
        margin-bottom: 0px;
        box-shadow: 0 1px 0 0 rgba(0,0,0,0.30), inset 0 1px 0 0 rgba(255,255,255,0.30);
        .user_header{
            width: 40px;height: 40px;
            float: left;border-radius: 50%;
            position: relative;
            img{
                display: block;
                width: 100%;
                height: auto;
                position: absolute;
                left: 50%; top: 50%;
                transform: translate(-50%,-50%)
            }
        }
        .user_name{
            width: 112px;
            height: 40px;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #fff;
            line-height: 20px;
            float: left;margin-left: 10px;
        }
    }
    .index{
        width: 100%;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        padding-left: 20px;
        color: #fff;
        cursor: pointer;
        font-size: 18px;
        i{
            font-size: 16px;
            padding-right: 12px;
        }
    }
    .router_show{
        background-color: #426383;
        box-shadow: 0 1px 0 0 rgba(0,0,0,0.30), inset 0 1px 0 0 rgba(255,255,255,0.30);
    }
}
@media (min-width:1201px) {
    .nav{
        position: fixed;
        left: 50%; top: 0;
        margin-left: -600px;
        z-index: 2000;
    }
}
@media (max-width:1200px) {
    .nav{
        position: fixed;
        left: 0; top: 0;
        margin-left: 0px;
        z-index: 2000;
    }
}
</style>