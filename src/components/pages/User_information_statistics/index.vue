<template>
    <div class="User_information_statistics">
        <div class="time_sex">
            <div class="time">
                <h2>{{ $t('User_information_statistics.time') }}</h2>
                <ul>
                    <li>0:00-3:00</li>
                    <li>3:00-6:00</li>
                    <li>6:00-9:00</li>
                    <li>9:00-12:00</li>
                    <li>12:00-15:00</li>
                    <li>15:00-18:00</li>
                    <li>18:00-21:00</li>
                    <li>21:00-24:00</li>
                </ul>
                <ol>
                    <li v-for="item in IndexActive">
                        <span :style="{width:item+'%'}"></span>
                    </li>
                </ol>
            </div>
            <div class="sex">
                <h2>{{ $t('User_information_statistics.sex') }}</h2>
                <div id="sex_echrat">
                    <IEcharts :option="sex_echrat" :loading="loading"></IEcharts>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Https from '@/utils/https';
import IEcharts from 'vue-echarts-v3/src/full.js';

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
            IndexActive:[],
            loading:false,
            sex_echrat:{
                color:["#91C7AE","#F5A623","#BDC3C7"],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: '性别分布',
                        type:'pie',
                        radius: [45, 90],
                        center: ['50%', '45%'],
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        label: {
                            normal: {
                                formatter: ' {b|{b}} {per|{d}%}  ',
                                rich: {}
                            }
                        },
                        data:[
                            {value:"", name:'男性占比'},
                            {value:"", name:'女性占比'},
                            {value:"", name:'未知占比'}
                        ]
                    }
                ]
            }
        }
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
        data_list(){
            Https.IndexActive({"fields":"day"}).then(res=>{
                if(res.data.code == 10000){
                    let msg = res.data.data.map(item=>({
                        pos:item.pos,
                        val:item.count
                    }));
                    this.IndexActive = msg.map(item=> item.val*100);
                }else{

                }
            }).catch(error=>{
                console.log("网络错误")
            })
            Https.IndexDistribute({"fields":"gender"}).then(res=>{
                if(res.data.code == 10000){
                    let msg = res.data.data.map(item=>({
                        pos:item.pos,
                        val:item.count
                    }));
                    for(var i=0; i<msg.length; i++){
                        this.sex_echrat.series[0].data[i].value = msg[i].val ? msg[i].val : 0;
                    }
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        }
    },
    mounted(){
        this.data_list()
    },
    components: {
        IEcharts
    }
}
</script>

<style lang="less" scoped>
.User_information_statistics{
    width: 1250px;
    height: 100%;
    padding: 100px 0 0 240px;
    box-sizing: border-box;
    overflow: auto;
    margin: 0 auto;
    font-family: PingFangSC-Medium;
    .time_sex{
        width: 980px;
        height: 420px;
        display: flex;
        justify-content: space-between;
        h2{
            height: 22px;
            line-height: 22px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #666666;
            width: 100%;
            box-sizing: border-box;
            padding-left: 40px;
            margin: 10px 0 30px 0;
        }
        .time{
            height: 100%;
            width: 560px;
            background: #FFFFFF;
            border: 1px solid #E7E9ED;
            border-radius: 4px;
            h2{
                background: url(../../../../static/img/time.png) no-repeat 10px center;
            }
            ul{
                width: 120px;
                height: auto;
                float: left;
                margin-left: 40px;
                li{
                    height: 16px;
                    width: 100%;
                    line-height: 16px;
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #333333;
                    margin-bottom: 26.5px;
                }
            }
            ol{
                width: 360px;
                height: auto;
                float: right;
                margin-right: 40px;
                li{
                    height: 16px;
                    width: 100%;
                    margin-bottom: 26.5px;
                    background: #F7F7F7;
                    border: 1px solid #CCCCCC;
                    box-sizing: border-box;
                    span{
                        display: block;
                        height: 100%;
                        width: 20%;
                        background: #F5A623;
                    }
                }
            }
        }
        .sex{
            height: 100%;
            width: 400px;
            background: #FFFFFF;
            border: 1px solid #E7E9ED;
            border-radius: 4px;
            overflow: hidden;
            h2{
                background: url(../../../../static/img/sex.png) no-repeat 10px center;
            }
            #sex_echrat{
                width: 100%;
                height: 358px;
            }
        }
    }
}
</style>


