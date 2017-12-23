<template>
    <div class="Abnormal_physiological_parameters">
        <div class="datas">
            <div class="data">
                <p>{{ $t('Abnormal_physiological_parameters.sbp') }}</p>
                <div>{{sbp}}<span>{{ $t('Abnormal_physiological_parameters.pro') }}</span></div>
            </div>
            <div class="data">
                <p>{{ $t('Abnormal_physiological_parameters.temp') }}</p>
                <div>{{temp}}<span>{{ $t('Abnormal_physiological_parameters.pro') }}</span></div>
            </div>
            <div class="data">
                <p>{{ $t('Abnormal_physiological_parameters.hr') }}</p>
                <div>{{hr}}<span>{{ $t('Abnormal_physiological_parameters.pro') }}</span></div>
            </div>
            <div class="data">
                <p>{{ $t('Abnormal_physiological_parameters.spo2h') }}</p>
                <div>{{spo2h}}<span>{{ $t('Abnormal_physiological_parameters.pro') }}</span></div>
            </div>
            <div class="data">
                <p>{{ $t('Abnormal_physiological_parameters.afib') }}</p>
                <div>{{afib}}<span>{{ $t('Abnormal_physiological_parameters.pro') }}</span></div>
            </div>
        </div>
        <div class="temperature_heart_rate">
            <div class="temperature">
                <h2 class="temperature_title">{{ $t('Abnormal_physiological_parameters.Abnormal_temp') }}</h2>
                <ul class="left">
                    <li>≥37.4℃</li>
                    <li>36.3～37.3℃</li>
                    <li>≤36.2℃</li>
                </ul>
                <ul class="right">
                    <li v-for="item in temperature"><span :style="{width:item+'%'}"></span></li>
                </ul>
            </div>
            <div class="heart_rate">
                <h2 class="eart_rate_title">{{ $t('Abnormal_physiological_parameters.Abnormal_hr') }}</h2>
                <ul class="left">
                    <li>&gt;100bpm</li>
                    <li>55～100bpm</li>
                    <li>&lt;55bpm</li>
                </ul>
                <ul class="right">
                    <li v-for="item in heart_rate"><span :style="{width:item+'%'}"></span></li>
                </ul>
            </div>
        </div>
        <div class="oxygen_ratio">
            <h2 class="oxygen_ratio_title">{{ $t('Abnormal_physiological_parameters.bnormal_proportion_of_blood_oxygen') }}</h2>
            <span>{{ $t('Abnormal_physiological_parameters.Blood_oxygen_range') }}</span>
            <div class="oxygen_ratio_echrat" id="oxygen_ratio_echrat">
                <IEcharts :option="oxygen_option" :loading="loading"></IEcharts>
            </div>
        </div>
        <div class="Blood_pressure">
            <h2 class="lood_pressure_title">{{ $t('Abnormal_physiological_parameters.Distribution_of_blood_pressure') }}</h2>
            <div class="Sbp">
                <span>{{ $t('Abnormal_physiological_parameters.Sbp') }}</span>
                <i>{{ $t('Abnormal_physiological_parameters.Company') }}</i>
                <div id="Sbp">
                    <IEcharts :option="Sbp_option" :loading="loading"></IEcharts>
                </div>
            </div>
            <div class="Dbp">
                <span>{{ $t('Abnormal_physiological_parameters.Dbp') }}</span>
                <i>{{ $t('Abnormal_physiological_parameters.Company') }}</i>
                <div id="Dbp">
                    <IEcharts :option="Dbp_option" :loading="loading"></IEcharts>
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
            loading:false,
            sbp:0,
            temp:0,
            hr:0,
            spo2h:0,
            afib:0,
            temperature:[],
            heart_rate:[],
            oxygen_option:{
                color:['#4A90E2','#F5A623'],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    right: 110,
                    top: 80,
                    itemWidth: 12,
                    itemHeight: 12,
                    data:['正常','过低'],
                    selectedMode: false
                },
                series: {
                    name:'血氧异常占比',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '55%'],
                    center: ['28%','43%'],
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'正常'},
                        {value:679, name:'过低'}
                    ]
                }
            },
            Sbp_option:{
                backgroundColor: '#f7f7f7',
                color: ['#509CF8'],
                tooltip : {
                    trigger: 'axis',
                    formatter: "{c}%",
                    axisPointer : {
                        type : 'shadow' 
                    }
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis : {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        fontSize:12,
                        interval:0
                    },
                    type : 'category',
                    data : ['<90', '91-110', '111-130', '131-150', '151-170', '171-190', '>191']
                },
                yAxis : {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    type : 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series : {
                    type:'bar',
                    barWidth: '40%',
                    data:[]
                }
            },
            Dbp_option:{
                backgroundColor: '#f7f7f7',
                color: ['#509CF8'],
                tooltip : {
                    trigger: 'axis',
                    formatter: "{c}%",
                    axisPointer : {
                        type : 'shadow' 
                    }
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis : {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        fontSize:12,
                        interval:0
                    },
                    type : 'category',
                    data : ['<50', '51-60', '61-70', '71-80', '81-90', '91-100', '>100']
                },
                yAxis : {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    type : 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series : {
                    type:'bar',
                    barWidth: '40%',
                    data:[]
                }
            }
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
        data_list(){
            Https.ExpCount({}).then(res=>{
                if(res.data.code == 10000){
                    let msg =res.data.data.map(item=>({
                        pos:item.pos,
                        count:item.count
                    }));
                    for(var i=0; i<msg.length; i++){
                        if(msg[i].pos == "afib"){
                            this.afib = msg[i].count
                        }else if(msg[i].pos == "spo2h"){
                            this.spo2h = msg[i].count
                        }else if(msg[i].pos == "hr"){
                            this.hr = msg[i].count
                        }else if(msg[i].pos == "temp"){
                            this.temp = msg[i].count
                        }else if(msg[i].pos == "sbp"){
                            this.sbp = msg[i].count
                        }
                    }
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            Https.ExpDetail({"fields":"temp"}).then(res=>{
                if(res.data.code == 10000){
                    let msg = res.data.data.map(item=>({
                        pos:item.pos,
                        val:item.count
                    }));
                    this.temperature = msg.map(item=> item.val*100).reverse();
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            Https.ExpDetail({"fields":"hr"}).then(res=>{
                if(res.data.code == 10000){
                    let msg = res.data.data.map(item=>({
                        pos:item.pos,
                        val:item.count
                    }));
                    this.heart_rate = msg.map(item=> item.val*100).reverse();
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            Https.ExpDetail({"fields":"spo2h"}).then(res=>{
                if(res.data.code == 10000){
                    let msg =res.data.data.map(item=>({
                        pos:item.pos,
                        count:item.count
                    }));
                    for(var i=0; i<msg.length; i++){
                        if(msg[i].pos == 0){
                            this.oxygen_option.series.data[0].value = msg[i].count*100
                        }else{
                            this.oxygen_option.series.data[1].value = msg[i].count*100
                        }
                    }
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            Https.ExpDetail({"fields":"sbp"}).then(res=>{
                if(res.data.code == 10000){
                    let msg = res.data.data.map(item=>({
                        pos:item.pos,
                        val:item.count
                    }));
                    this.Sbp_option.series.data = msg.map(item=> (item.val*100).toFixed(2))
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            Https.ExpDetail({"fields":"dbp"}).then(res=>{
                if(res.data.code == 10000){
                    let msg = res.data.data.map(item=>({
                        pos:item.pos,
                        val:item.count
                    }));
                    this.Dbp_option.series.data = msg.map(item=> (item.val*100).toFixed(2))
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        }
    },
    components: {
        IEcharts
    }
}
</script>

<style lang="less" scoped>
.Abnormal_physiological_parameters{
    width: 1250px;
    height: 100%;
    padding: 100px 0 0 240px;
    box-sizing: border-box;
    overflow: auto;
    margin: 0 auto;
    h2{
        width: 100%;
        height: 22px;
        line-height: 22px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #666666;
        box-sizing: border-box;
        padding-left: 35px;
    }
    li{
        width: 100%;
        height: 16px;
        line-height: 16px;
        text-align: right;
        margin-bottom: 24px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
    }
    li:last-child{
        margin-bottom: 0px;
    }
    .datas{
        width: 980px;
        height: 110px;
        display: flex;
        justify-content: space-between;
        .data{
            width: 180px;
            height: 90px;
            box-sizing: border-box;
            margin-right: 20px;
            border: 1px solid #E7E9ED;
            border-radius: 4px;
            padding-left: 36px;
            p:first-child{
                width: 100%;
                height: 22px;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #666666;
                margin-top: 8px;
                line-height: 20px;
            }
            div{
                width: 100%;
                height: 38px;
                line-height: 38px;
                font-family: FZLTTHJW--GB1-0;
                font-size: 24px;
                color: #333333;
                margin-top: 10px;
                font-weight: bolder;
                span{
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #151515;
                    padding-left: 5px;
                    font-weight:  normal;
                }
            }
        }
        .data:first-child{
            background: url(../../../../static/img/blood_pressure.png) no-repeat 10px 10px;
            background-color: #FFFFFF;
        }
        .data:nth-child(2){
            background: url(../../../../static/img/temperature.png) no-repeat 10px 10px;
            background-color: #FFFFFF;
        }
        .data:nth-child(3){
            background: url(../../../../static/img/heart_rate.png) no-repeat 10px 10px;
            background-color: #FFFFFF;
        }
        .data:nth-child(4){
            background: url(../../../../static/img/Oxygen.png) no-repeat 10px 10px;
            background-color: #FFFFFF;
        }
        .data:last-child{
            margin-right: 0;
            background: url(../../../../static/img/activation.png) no-repeat 10px 10px;
            background-color: #FFFFFF;
        }
    }
    .temperature_heart_rate{
        float: left;
        width: 640px;
        height: 200px;
        margin-bottom: 20px;
        background: #FFFFFF;
        border: 1px solid #E7E9ED;
        border-radius: 4px;
        box-sizing: border-box;
        .temperature{
            width: 320px;
            height: 100%;
            float: left;
            box-sizing: border-box;
            padding-top: 10px;
            .temperature_title{
                background: url(../../../../static/img/temperature.png) no-repeat 10px center;
            }
            .left{
                width: 118px;
                height: auto;
                float: left;
                margin-top: 30px;  
            }
            .right{
                width: 198px;
                height: auto;
                float: left;
                border-right: 2px solid #eeeeee;
                margin-top: 30px; 
                box-sizing: border-box;
                padding:0 40px 0 20px; 
                li{
                    background: #F7F7F7;
                    border: 1px solid #CCCCCC;
                    box-sizing: border-box;
                    span{
                        display: block;
                        width: 20%;
                        height: 100%;
                        background: #F5A623;
                    }
                }
            }
        }
        .heart_rate{
            width: 310px;
            height: 100%;
            float: left;
            box-sizing: border-box;
            padding-top: 10px;
            .eart_rate_title{
                padding-left: 40px;
                background: url(../../../../static/img/heart_rate.png) no-repeat 15px center;
            }
            .left{
                width: 118px;
                height: auto;
                float: left;
                margin-top: 30px;  
            }
            .right{
                width: 190px;
                height: auto;
                float: left;
                margin-top: 30px; 
                box-sizing: border-box;
                padding:0 30px 0 20px; 
                li{
                    background: #F7F7F7;
                    border: 1px solid #CCCCCC;
                    box-sizing: border-box;
                    span{
                        display: block;
                        width: 20%;
                        height: 100%;
                        background: #F5A623;
                    }
                }
            }
        }
    }
    .oxygen_ratio{
        width: 330px;
        height: 200px;
        float: left;
        margin-bottom: 20px;
        background: #FFFFFF;
        border: 1px solid #E7E9ED;
        border-radius: 4px;
        box-sizing: border-box;
        padding-top: 10px;
        overflow: hidden;
        position: relative;
        margin-left: 10px;
        span{
            position: absolute;
            top: 80px; left: 170px;
            z-index: 99;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
        }
        .oxygen_ratio_title{
            background: url(../../../../static/img/Oxygen.png) no-repeat 10px center;
        }
        .oxygen_ratio_echrat{
            width: 100%;
            height: 100%;
        }
    }
    .Blood_pressure{
        margin-top: 220px;
        margin-bottom: 20px;
        width: 980px;
        height: 520px;
        background: #FFFFFF;
        border: 1px solid #E7E9ED;
        border-radius: 4px;
        box-sizing: border-box;
        .lood_pressure_title{
            margin: 10px 0 28px 0;
            background: url(../../../../static/img/blood_pressure.png) no-repeat 10px center;
        }
        div{
            border-radius: 4px;
            width: 450px;
            height: 420px;
            float: left;
            position: relative;
            span{
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #666666;
                position: absolute;
                z-index: 99;
                top: 10px;
                right: 20px;
            }
            i{
                font-family: PingFangSC-Medium;
                font-size: 12px;
                color: #666666;
                position: absolute;
                z-index: 99;
                top: 35px;
                right: 20px;
                font-style: normal;
            }
        }
        .Sbp{
            margin-left: 30px;
        }
        .Dbp{
            margin-left: 20px;
        }
    }
}
</style>


