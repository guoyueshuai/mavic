<template>
    <div class="Set_up">
        <div class="Account_information">
            <h2 class="title">企业账户信息</h2>
            <p class="Enterprise_name"><span>企业名称</span><input placeholder="请限制在6-16个字符" type="text" v-model="Enterprise_name" id="Enterprise_name" v-on:input="name" :style="{border:border1}"></p>
            <p class="Enterprise_abbreviation"><span>企业简称</span><input placeholder="请限制在0-8个字符" type="text" v-model="Enterprise_abbreviation" v-on:input="abbreviation" :style="{border:border2}" id="Enterprise_abbreviation"></p>
            <p class="Business_account"><span>企业账号</span>{{Enterprise_user_name}}</p>
            <p class="Enterprise_password"><span>登录密码</span><input type="password" v-model="Enterprise_password" id="Enterprise_password"></p>
            <p class="Preservation"><i @click="updata">保存</i></p>
            <div class="tishi_name" v-show="tishi_name">
                <span></span>
                请限制在6~16个字符以内
            </div>
            <div class="tishi_abbreviation" v-show="tishi_abbreviation">
                <span></span>
                请限制在0~6个字符以内
            </div>
        </div>
        <div class="Question_feedback">
            <h2 class="title">问题反馈</h2>
            <textarea class="Question_feedback_ctt" v-model="Question_feedback_ctt" placeholder="请反馈您遇到的问题"></textarea>
            <p class="submit"><i @click="submit">提交</i></p>
        </div>
        <div class="Service_mode">
            <h2 class="Service_mode_title">当前服务模式</h2>
            <div class="Service_mode_ctt">
                <div class="left">
                    <ul>
                        <li>功能开通：</li>
                        <li>Rothman Index实时预警</li>
                        <li>生理数据查看</li>
                        <li>用户管理</li>
                        <li>信息推送</li>
                    </ul>
                    <ol>
                        <li>维护状态：</li>
                        <li>永久开通</li>
                        <li>系统维护12个月</li>
                    </ol>
                    <p>如需定制开通或升级系统功能，或您有任何问题，请致电 010-53607181</p>
                </div>
                <div class="right">
                    <img src="static/img/LOHAS.png">
                    <p>由悦享趋势科技（北京）有限责任公司开发并运营</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Https from '@/utils/https';
export default {
    data(){
        return{
            Enterprise_name:"",
            Enterprise_abbreviation:"",
            Enterprise_user_name:"",
            Enterprise_password:"",
            Question_feedback_ctt:"",
            border1:"",
            tishi_name:false,
            border2:"",
            tishi_abbreviation:false
        }
    },
    mounted(){
        this.data_list()
    },
    methods:{
        login_out(one,two,three){
            this.$alert(one, two, {
                confirmButtonText: three,
                callback: action => {
                    this.$router.push({path: '/'});
                }
            });
        },
        name(){
            this.border1 = "";
            this.tishi_name = false;
            if(this.Enterprise_name.length<6 || this.Enterprise_name.length>16){
                this.border1 = "1px solid #f00";
                this.tishi_name = true;
            }
        },
        abbreviation(){
            this.border2 = "";
            this.tishi_abbreviation = false;
            if(this.Enterprise_abbreviation.length>6){
                this.border2 = "1px solid #f00";
                this.tishi_abbreviation = true;
            }
        },
        submit(){    
            let params = {
                "fields":this.Question_feedback_ctt
            }
            if(this.Question_feedback_ctt){
                Https.PushSupport(params).then(res=>{
                    if(res.data.code == 10000){
                        this.$alert('<strong>感谢您的反馈</strong>', '提示', {
                            dangerouslyUseHTMLString: true
                        });
                        this.Question_feedback_ctt = ""
                    }else{
                        this.login_out("登录超时，请重新登录！","提示","确定")
                    }
                }).catch(error=>{
                    console.log("网络错误")
                })
            }else{
                this.$alert('<strong>内容不能为空</strong>', '提示', {
                    dangerouslyUseHTMLString: true
                });
            }
        },
        updata(){
            if(this.Enterprise_name.length<6 || this.Enterprise_name.length>16){
                this.border1 = "1px solid #f00";
                this.tishi_name = true;
            }else if(this.Enterprise_abbreviation.length>6){
                this.border2 = "1px solid #f00";
                this.tishi_abbreviation = true;
            }else{
                let params = {
                    "full_name":this.Enterprise_name,
                    "name":this.Enterprise_abbreviation,
                    "password":this.Enterprise_password
                }
                Https.ChangeSetting(params).then(res=>{
                    if(res.data.code == 10000){
                        this.login_out("保存成功，请重新登录！","提示","确定")
                    }else{
                        this.login_out("登录超时，请重新登录！","提示","确定")  
                    }
                }).catch(error=>{
                    console.log("网络错误")
                })
            }
        },
        data_list(){
            Https.AccountInfo({}).then(res=>{
                if(res.data.code == 10000){
                    this.Enterprise_name = res.data.data.full_name;
                    this.Enterprise_abbreviation = res.data.data.name;
                    this.Enterprise_user_name = res.data.data.login_name;
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        }
    }
}
</script>

<style lang="less" scoped>
.Set_up{
    width: 1250px;
    height: 100%;
    padding: 100px 0 0 240px;
    box-sizing: border-box;
    overflow: auto;
    margin: 0 auto;
    font-family: PingFangSC-Medium;
    h2{
        width: 100%;
        height: 22px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        box-sizing: border-box;
        padding-left: 46px;
        margin: 10px 0 48px 0;
    }
    .Account_information{
        background: #FFFFFF;
        border: 1px solid #E7E9ED;
        border-radius: 4px;
        height: 360px; width: 480px;
        float: left;
        position: relative;
        .tishi_name{
            padding: 5px 10px;
            border: 1px solid #f00;
            position: absolute;
            left: 120px; top: 42px;
            color: #f00;
            font-size: 12px;
            background: #fff;
            font-family: PingFangSC-Regular;
            border-radius: 5px;
            span{
                display: block;
                width: 10px;
                height: 10px;
                border-bottom: 1px solid #f00;
                border-right: 1px solid #f00;
                background: #fff;
                position: absolute;
                left: 20px; bottom: -6px;
                transform:rotate(45deg);
                -ms-transform:rotate(45deg); 	/* IE 9 */
                -moz-transform:rotate(45deg); 	/* Firefox */
                -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
                -o-transform:rotate(45deg); 
            }
        }
        .tishi_abbreviation{
            padding: 5px 10px;
            border: 1px solid #f00;
            position: absolute;
            left: 120px; top: 85px;
            color: #f00;
            font-size: 12px;
            background: #fff;
            font-family: PingFangSC-Regular;
            border-radius: 5px;
            span{
                display: block;
                width: 10px;
                height: 10px;
                border-bottom: 1px solid #f00;
                border-right: 1px solid #f00;
                background: #fff;
                position: absolute;
                left: 20px; bottom: -6px;
                transform:rotate(45deg);
                -ms-transform:rotate(45deg); 	/* IE 9 */
                -moz-transform:rotate(45deg); 	/* Firefox */
                -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
                -o-transform:rotate(45deg); 
            }
        }
        h2{
            background: url(../../../../static/img/enterprise.png) no-repeat 20px center;
        }
        p{
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #666666;
            width: 100%;
            box-sizing: border-box;
            padding-left: 40px;
            line-height: 32px;
            height: 32px;
            span{
                padding-right: 16px;
            }
            input{
                outline: none;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #999999;
                line-height: 30px;
                width: 320px;
                height: 32px;
                background: #FAFAFA;
                border: 1px solid #DDDDDD;
                border-radius: 2px;
                box-sizing: border-box;
                padding: 0 10px;
            }
            i{
                padding: 8px 32px;
                font-family: PingFangSC-Semibold;
                font-size: 18px;
                color: #FFFFFF;
                background: #4A90E2;
                border-radius: 2px;
                font-style: normal;
                cursor: pointer;
            }
        }
        .Enterprise_name,.Business_account{
            margin-bottom: 10px;
        }
        .Enterprise_abbreviation{
            margin-bottom: 30px;
        }
        .Enterprise_password{
            margin-bottom: 38px;
        }
        .Preservation{
            text-align: center;
            padding-left: 0;
        }
    }
    .Question_feedback{
        background: #FFFFFF;
        border: 1px solid #E7E9ED;
        border-radius: 4px;
        height: 360px; width: 480px;
        float: left;
        margin-left: 16px; 
        h2{
            background: url(../../../../static/img/feedback.png) no-repeat 20px center;
        }
        .Question_feedback_ctt{
            resize:none;
            display: block;
            width: 440px;
            height: 180px;
            outline: none;
            background: #FAFAFA;
            border: 1px solid #DDDDDD;
            border-radius: 2px;
            box-sizing: border-box;
            margin: 0 auto;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #999999;
            line-height: 22px;
            padding: 5px 10px;
        }
        .submit{
            margin-top: 38px; 
            text-align: center;
            i{
                padding: 8px 32px;
                font-family: PingFangSC-Semibold;
                font-size: 18px;
                color: #FFFFFF;
                background: #4A90E2;
                border-radius: 2px;
                font-style: normal;
                cursor: pointer;
            }
            
        }
    }
    .Service_mode{
        width: 980px;
        height: 330px;
        background: #FFFFFF;
        border: 1px solid #E7E9ED;
        border-radius: 4px;
        margin-top: 380px;
        margin-bottom: 20px;
        box-sizing: border-box;
        padding: 0 30px;
        h2{
            padding: 0;
            text-align: center;
            height: 22px;
            line-height: 22px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #333333;
            margin: 10px 0 28px 0;
        }
        .Service_mode_ctt{
            width: 100%;
            height: 240px;
            display: flex;
            justify-content: space-between;
            .left{
                width: 450px;
                height: 240px; 
                background: #F7F7F7;
                border-radius: 4px;
                display: flex;
                box-sizing: border-box;
                padding: 20px 30px 0 30px;
                justify-content: flex-start;
                position: relative;
                ul{
                    width: 240px;
                    height: auto;
                }
                ol{
                    width: auto;
                    height: auto;
                }
                ul,ol{
                    li{
                        height: 20px;
                        line-height: 20px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #666666;
                        margin-bottom: 12px;
                    }
                    li:first-child{
                        height: 22px;
                        line-height: 22px;
                        font-family: PingFangSC-Medium;
                        font-size: 16px;
                        color: #666666;
                    }
                }
                p{
                    width: 100%;
                    text-align: center;
                    position: absolute;
                    left: 0px; bottom: 25px;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #999999;
                    text-align: center;
                }
            }
            .right{
                width: 450px;
                height: 240px; 
                background: #F7F7F7;
                border-radius: 4px;
                position: relative;
                img{
                    display: block;
                    margin: 0 auto;
                    margin-top: 50px;
                }
                p{
                    width: 100%;
                    height: auto;
                    position: absolute;
                    left: 0px; bottom: 25px;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #999999;
                    text-align: center;
                }
            }
        }
    }
}
</style>


