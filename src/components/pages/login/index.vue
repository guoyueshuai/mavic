<template>
    <div>
        <div class="login">
            <div class="login_box">
                <div class="logo">
                    Santa Fe 健康信息护理系统
                </div>
                <div class="login_ctt">
                    <p class="user">{{ $t('login.username') }}</p>
                    <p class="user_text">
                        <span class="empty" v-show="empty_name">{{ $t('login.username_placeholder') }}</span>
                        <img :src="user_img" class="user_img">
                        <input type="text" :placeholder="$t('login.username_placeholder')" v-model="user_name" @focus="user_focus" autofocus>
                    </p>
                    <p class="pwd">{{ $t('login.pwd') }}</p>
                    <p class="user_pwd">
                        <span class="empty" v-show="empty_pwd">{{ $t('login.pwd_placeholder') }}</span>
                        <img :src='pwd_img' class="pwd_img">
                        <input type="password" :placeholder="$t('login.pwd_placeholder')" v-model="user_pwd" @focus="pwd_focus" >
                    </p>
                    <div class="Unable_to_login">
                        <span class="checkbox" @click="checked"><img src="static/img/check_on.png" v-show="img_checkbox"></span>
                        <span @click="checked">{{ $t('login.Remember_the_password') }}</span>
                        <div class="Unable_login">
                            {{ $t('login.Unable_to_land') }}
                            <div class="prompt"><div></div>{{ $t('login.Unable_to_land_ctt') }}<br/>010-53607181</div>
                        </div>
                        <i v-show="sub" class="sub">{{ $t('login.user_pwd') }}</i>
                    </div>
                    <p class="submit" @click="submit">{{ $t('login.Land') }}</p>
                </div>
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

export default {
    i18n,
    created () {
        i18n.locale = getNavigator();
    },
    data(){
        return{
            user_img:'static/img/user_on.png',
            pwd_img:'static/img/pwd_off.png',
            img_checkbox:true,
            empty_name:false,
            empty_pwd:false,
            sub:false,
            user_name:'',
            user_pwd:''
        }
    },
    mounted(){
        this.Remember_pwd();
    },
    methods:{
        user_focus(){
            this.user_img = 'static/img/user_on.png';
            this.pwd_img = 'static/img/pwd_off.png';
            this.empty_name = false;
            this.empty_pwd = false;
            this.sub = false;
        },
        pwd_focus(){
            this.user_img = 'static/img/user_off.png'
            this.pwd_img = 'static/img/pwd_on.png'
            this.empty_name = false;
            this.empty_pwd = false;
            this.sub = false
        },
        Remember_pwd(){
            if(localStorage != ""){
                this.checkbox = localStorage.checked;
                this.user_name = localStorage.user_name;
                this.user_pwd = localStorage.user_pwd;
            }
        },
        checked(){
            if(this.img_checkbox == true){
                this.img_checkbox = false;
            }else{
                this.img_checkbox = true;
            }
        },
        submit(){           
            if(this.user_name == undefined){
                this.empty_name = true                
            }else if(this.user_pwd == undefined){
                this.empty_pwd = true                
            }else{
                if(this.img_checkbox){
                    localStorage.user_name = this.user_name;
                    localStorage.user_pwd = this.user_pwd;
                }else{
                    localStorage.clear();
                }
                let params = {
                    user_id : this.user_name,
                    fields : this.user_pwd
                }
                Https.Login(params).then(res=>{
                    if(res.data.code == 10000){
                        this.$router.push({ path: 'home' })
                    }else{
                        this.sub = true
                    }
                }).catch(error=>{
                    console.log("网络错误")
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.login{
    position: absolute;
    left: 0;top: 0;
    z-index: 99999;
    width: 100%;
    height: 100%;
    background: #f7f7f7;
    .login_box{
        width: 480px;
        height: 360px;
        background: #F2F2F2;
        border-radius: 2px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        box-sizing: border-box;
        border-top: 10px solid #4A90E2; 
        box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2);
        .logo{
            font-family: MFYueYuan_Noncommercial-Regular;
            font-size: 24px;
            color: #4A90E2;
            height: 24px;
            width: 100%;
            text-align: center;
            line-height: 24px;
            padding: 18px 0;
            background: #fff;
            border-bottom: 1px solid #dddddd;
        }
        .login_ctt{
            width: 100%;
            height: 290px;
            overflow: hidden;
            box-sizing: border-box;
            padding: 0 30px;
            p{
                width: 100%;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                input{
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    border: 1px solid #dddddd;
                    line-height: 38px;
                    padding: 0 0 0 40px;
                    color: #000;
                    outline: none;
                }
            }
            .user,.pwd{
                height: 20px;
                color: #999999;
                margin: 20px 0 6px 0;
            }
            .user_text,.user_pwd{
                width: 100%;
                height: 40px;
                box-sizing: border-box;
                position: relative;
                .empty{
                    position: absolute;
                    left: 41px;top: -26px;
                    color: #f00;
                }
                img{
                    position: absolute;
                    left:10px; top:50%;
                    transform: translateY(-50%);
                }
            }
            .Unable_to_login{
                width: 100%;
                height: 20px;
                line-height: 20px;
                margin: 10px 0 25px 0;
                font-size: 14px;
                position: relative;
                span{
                    float: left;
                    color: #999;
                    cursor: pointer;
                }
                .checkbox{
                    display: block;
                    width: 12px;
                    height: 12px;
                    margin:4px 6px 4px 0;
                    background: url(../../../../static/img/check_off.png) no-repeat center;
                    cursor: pointer;
                    position: relative;
                    img{
                        display: block;
                        width: 100%;height: 100%;
                        position: absolute;
                        left: 0; top: 0;
                        z-index: 99;
                    }
                }
                .Unable_login{
                    float: right;
                    color: #4A90E2;
                    position: relative;
                    cursor: pointer;
                    .prompt{
                        position: absolute;
                        right:-20px; top:130%;
                        z-index: 99;
                        width: 293px;
                        box-sizing: border-box;
                        padding: 5px 3px 5px 10px;
                        background: #fff;
                        display: none;
                        font-size: 14px;
                        color: #999;
                        border-radius: 5px;
                        div{
                            width: 0; height: 0;
                            border-bottom: 8px solid #fff;
                            border-top: 8px solid transparent;
                            border-left: 8px solid transparent;
                            border-right: 8px solid transparent;
                            position: absolute;
                            right: 54px;
                            top: -15px;
                        }
                    }
                    &:hover{
                        .prompt{
                            display: block;
                        }
                    }
                }
                .sub{
                    position: absolute;
                    left: 0; top: 100%;
                    color: #f00;
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    font-style: normal;
                }
            }
            .submit{
                width: 100%;
                height: 40px;
                background: #4A90E2;
                border-radius: 2px;
                line-height: 40px;
                text-align: center;
                font-family: PingFangSC-Semibold;
                font-size: 18px;
                color: #FFFFFF;
                cursor: pointer;
                position: relative;
                letter-spacing: 20px;
            }
        }
    }
}
</style>


