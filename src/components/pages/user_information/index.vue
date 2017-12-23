<template>
    <div class="user_information">
        <div class="user_data">
            <div class="btn"><span>健康信息</span>/<span @click="user_details">Rothman Index详情</span></div>
            <ul class="user">
                <li>用户信息</li>
                <li><span>姓名：</span>{{UserInfo.name ? UserInfo.name : "未填写"}}</li>
                <li><span>账号：</span>{{UserInfo.login_name}}</li>

                <li v-if="UserInfo.age"><span>出生日期：</span>{{UserInfo.age | formatDatesss}}</li>
                <li v-else><span>出生日期：</span>未填写</li>
            </ul>
        </div>
        <div class="Measurement_trend">
            <h2 class="Measurement_trend_title">
                Rothman Index测量趋势
                <span class="btns">
                    <span :class="{span_active:data_display}" @click="data_click">日期显示</span>
                    <span :class="{span_active:frequency_display}" @click="frequency_click">次数显示</span>
                </span>
                <i @click="user_details">查看详情</i>
            </h2>
            <div class="Measurement_trend_ctt">
                <IEcharts :option="data_echart" :loading="loading"></IEcharts>
            </div>
        </div>
        <div class="ECG_data">
            <div class="ECG_data_list">
                心电数据
                <el-pagination
                    @current-change = "change_pages"
                    :page-size="3"
                    :current-page="current_page"
                    :page-count="page_size"
                    layout="prev, pager, next"
                    class="ECG_data_pages">
                </el-pagination>
            </div>
            <div class="ECG_data_ctts">
                <div class="ECG_data_ctt" v-for="item in ecg_list">
                    <div class="ECG_data_name">
                        <p class="time">{{item.date | formatDates}}</p>

                        <p class="name" v-if="item.warn_info == -1"><span style="background: #F5A623"></span>心率过缓</p>
                        <p class="name" v-if="item.warn_info == 0"><span style="background: #4A90E2"></span>心率正常</p>
                        <p class="name" v-if="item.warn_info == 1"><span style="background: #D0021B"></span>心率过速</p>
                    
                        <p class="name" v-if="item.afib >= 99 && item.is_afib == 1">存在房颤</p>
                    </div>
                    <div class="ECG_data_echarts">
                        <ul>
                            <li>RR&nbsp;max={{item.rr_max}}</li>
                            <li>RR&nbsp;min={{item.rr_min}}</li>
                            <li>HR={{item.hr}}</li>
                            <li>HRV={{item.hrv}}</li>
                            <li>Mood={{item.mood}}</li>
                        </ul>
                        <span @click="handleEdit(item.id)">查看</span>
                        <div class="ECG_data_echart">
                            <IEcharts :option="item.option" :loading="loading"></IEcharts>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="data_list">
            <div class="data_list_title">
                测量数据列表
                <ul>
                    <li :class="{li_active:blood_pressure}" @click="blood_pressure_click">血压</li>
                    <li :class="{li_active:Oxygen}" @click="Oxygen_click">血氧</li>
                    <li :class="{li_active:heart_rate}" @click="heart_rate_click">心率</li>
                    <li :class="{li_active:temperature}" @click="temperature_click">体温</li>
                </ul>
            </div>
            <div class="left_echart">
                <ul v-show="Sbp_Dbp">
                    <li><span></span>收缩压</li>
                    <li><span></span>舒张压</li>
                </ul>
                <div id="data_list_echart">
                    <IEcharts :option="data_list_echart" :loading="loading"></IEcharts>
                </div>
            </div>
            <sbp v-show="blood_pressure" :msg="user_id"></sbp>
            <spo2h v-show="Oxygen" :msg="user_id"></spo2h>
            <hrs v-show="heart_rate" :msg="user_id"></hrs>
            <temp v-show="temperature" :msg="user_id"></temp>
        </div>
        <el-dialog class="ecgWave" title="ECG波形" :visible.sync="ecgdata">
            <div id = "EcgWave" style = "width:100%;height:340px;">
                <IEcharts :loading="loading" :option="AiaecgWave"></IEcharts>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Https from '@/utils/https';
import IEcharts from 'vue-echarts-v3/src/full.js';
import {formatDate} from '@/components/common/date.js';
import Sbp from "@/components/pages/user_information/sbp";
import Spo2h from "@/components/pages/user_information/spo2h";
import Hrs from "@/components/pages/user_information/hr";
import Temp from "@/components/pages/user_information/temp";
export default {
    data(){
        return{
            ECG_data_bgcolor: '#ccc' ,
            data_display:true,
            frequency_display:false,
            blood_pressure:true,
            Oxygen:false,
            heart_rate:false,
            temperature:false,
            Sbp_Dbp:true,

            ecgdata:false,

            user_id:this.$route.query.id,
            UserInfo:[],

            loading:false,
            data_echart:{
                backgroundColor: '',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        label: {
                            backgroundColor: '#dcf0fa'
                        },
                        lineStyle: {
                            type: 'dashed',
                            color: '#dcf0fa'
                        }
                    } 
                },
                grid: {
                    left: -8,
                    top: 25,
                    right: -8,
                    bottom: 8,
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: 5,
                    axisLine: {
                        show: true,
                        lineStyle: {
                        color: '#000'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#000',
                            type: 'dashed'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    data: []
                }],
                yAxis: [
                    {
                        position: 'left',
                        type: 'value',
                        min: 0,
                        max: 100,
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: '#000'
                            }
                        },
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        axisLabel: {
                            inside: true,
                            textStyle: {
                                color: '#000',
                                lineHeight: 20,
                                verticalAlign: 'bottom'
                            },
                            formatter: '{value}'
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#000'
                            }
                        },
                        axisTick: {
                            show: false,
                            lineStyle: {
                                color: '#000'
                            }
                        }
                    },{
                        position: 'left',
                        type: 'value',
                        min: 0,
                        max: 100,
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: '#000'
                            }
                        },
                        axisLabel: {
                            show: false,
                            textStyle: {
                            color: '#000'
                            },
                            formatter: '{value}'
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                            color: '#000'
                            }
                        },
                        axisTick: {
                            show: false,
                            lineStyle: {
                            color: '#000'
                            }
                        }
                    },{
                        position: 'right',
                        type: 'value',
                        min: 0,
                        max: 100,
                        splitLine: {
                            show: true,
                            lineStyle: {
                            color: '#000'
                            }
                        },
                        axisLabel: {
                            show: false,
                            textStyle: {
                            color: '#000'
                            },
                            formatter: '{value}'
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                            color: '#000'
                            }
                        },
                        axisTick: {
                            show: false,
                            lineStyle: {
                            color: '#000'
                            }
                        }
                    }
                ],
                series: [{
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 8,
                    showSymbol: true,
                    showAllSymbol: true,
                    itemStyle: {
                        normal: {
                            color: '#000'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#000'
                        }
                    },
                    markLine: {
                        silent: true,
                        symbol: 'none',
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                            type: 'line',
                            lineStyle: {
                                normal: {
                                    type: 'solid',
                                    color: '#ffff00',
                                    width: 2
                                },
                                emphasis: {
                                    type: 'solid',
                                    color: '#ffff00',
                                    width: 2
                                }
                            },
                            yAxis: 65
                        },{
                            lineStyle: {
                                normal: {
                                    type: 'solid',
                                    color: '#c50000',
                                    width: 2
                                },
                                emphasis: {
                                    type: 'solid',
                                    color: '#c50000',
                                    width: 2
                                }
                            },
                            yAxis: 40
                        }]
                    },
                    data: []
                }]
            },

            page_size:0,
            current_page:1,
            ecg_list:[],

            data_list_echart:{
                grid: {
                    left: 20,
                    top: 47,
                    right: 20,
                    bottom: 12,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis:  {
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                series: [
                    {
                        name:'',
                        type:'line',
                        data:[],
                        itemStyle:{
                            normal:{
                                color: "#F5A623"
                            }
                        },
                        lineStyle:{
                            normal:{
                                width:2,
                                color: "#F5A623"
                            }
                        }
                    },
                    {
                        name:'',
                        type:'line',
                        data:[],
                        itemStyle:{
                            normal:{
                                color: "#4A90E2"
                            }
                        },
                        lineStyle:{
                            normal:{
                                width:2,
                                color: "#4A90E2"
                            }
                        }
                    }
                ]
            },

            AiaecgWave: {
                tooltip: {
                    trigger: 'axis',
                    formatter: '原始数据点<br/>{c}(value)'
                },
                xAxis: {
                    show: false,
                    data: []
                },
                yAxis: {
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                dataZoom: [
                    {
                        startValue: '1',
                        endValue: ''
                    }, {
                        type: 'inside'
                    }
                ],
                itemStyle: {
                    normal: {
                    color: '#57c7f6'
                    }
                },
                toolbox: {
                    show: true,
                    itemSize: 15,
                    x: '900',
                    y: '0',
                    feature: {
                        saveAsImage: {
                            type: 'png',
                            show: true,
                            name: [],
                            excludeComponents: ['toolbox', 'dataZoom', 'xAxis', 'yAxis'],
                            pixelRatio: 4
                        }
                    }
                },
                series: {
                    name: '',
                    type: 'line',
                    symbol: 'none',
                    data: [],
                    lineStyle: {
                        normal: {
                            color: '#f66'
                        }
                    }
                }
            }
        }
    },
    watch:{
        current_page(){
            this.data_list()
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
        data_click(){
            this.data_display = true;
            this.frequency_display = false;
            Https.UserRIByDay({"user_id":this.user_id}).then(res=>{
                if(res.data.code == 10000){
                    let msg = [];
                    let msg2 = [];
                    for(var i=0; i<res.data.data.length; i++){
                        if(res.data.data[i].id == undefined){
                            msg.push(null)
                            msg2.push(null)
                        }else{
                            msg.push(res.data.data[i].RI)
                            msg2.push(res.data.data[i].RI)
                        }
                    }
                    let msg3 = [];
                    for(var i = 0 ;i<msg2.length;i++){  
                        if(msg2[i] !== null)  {  
                            msg3.push(msg2[i])
                        }  
                    }  
                    if(msg3[msg3.length-1] <= 40){
                        this.data_echart.backgroundColor = "#E5BFCC"
                    }else if(msg3[msg3.length-1] >= 65){
                        this.data_echart.backgroundColor = "#A9CCED"
                    }else{
                        this.data_echart.backgroundColor = "#EDE1B8"
                    }
                    this.data_echart.series[0].data = msg;
                    this.data_echart.xAxis[0].data = this.getBeforeDate(30)
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        },
        frequency_click(){
            this.data_display = false;
            this.frequency_display = true;
            Https.UserRIByCount({"user_id":this.user_id}).then(res=>{
                if(res.data.code == 10000){
                    let msg =res.data.data.map(item=>({
                        RI:item.ri,
                        time:item.create_date
                    }));
                    if(msg[0].RI <= 40){
                        this.data_echart.backgroundColor = "#E5BFCC"
                    }else if(msg[0].RI >= 65){
                        this.data_echart.backgroundColor = "#A9CCED"
                    }else{
                        this.data_echart.backgroundColor = "#EDE1B8"
                    }
                    this.data_echart.series[0].data = msg.map(item=>item.RI).reverse();
                    this.data_echart.xAxis[0].data = msg.map(item=>this.formatDate(item.time)).reverse();
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        },
        change_pages(val){
            this.current_page = val;
        },
        blood_pressure_click(){
            this.blood_pressure = true;
            this.Oxygen = false;
            this.heart_rate = false;
            this.temperature = false;
            this.Sbp_Dbp = true;
            //数据列表波形
            let params = {
                "reg_id":this.current_page || 1,
                "start_pos":"9",
                "fields":"sbp",
                "user_id":this.user_id
            }
            Https.DatasNew(params).then(res=>{
                if(res.data.code == 10000){
                    let list = res.data.data.list.map(item=>item.item_value);
                    let time = res.data.data.list.map(item=>this.Dates(parseInt(item.create_date)));
                    let datas = []
                    for(var i=0; i<list.length; i++){
                        datas.push(list[i].split("/"))
                    }
                    this.data_list_echart.xAxis.data = time;
                    this.data_list_echart.series[0].name = "高压";
                    this.data_list_echart.series[0].data = datas.map(item=>item[0]);
                    this.data_list_echart.series[1].name = "低压";
                    this.data_list_echart.series[1].data = datas.map(item=>item[1]);
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        },
        Oxygen_click(){
            this.blood_pressure = false;
            this.Oxygen = true;
            this.heart_rate = false;
            this.temperature = false;
            this.Sbp_Dbp = false;
            //数据列表波形
            let params = {
                "reg_id":this.current_page || 1,
                "start_pos":"9",
                "fields":"spo2h",
                "user_id":this.user_id
            }
            Https.DatasNew(params).then(res=>{
                if(res.data.code == 10000){
                    let list = res.data.data.list.map(item=>item.item_value);
                    let time = res.data.data.list.map(item=>this.Dates(parseInt(item.create_date)));
                    this.data_list_echart.xAxis.data = time;
                    this.data_list_echart.series[0].data = [];
                    this.data_list_echart.series[1].name = "血氧";
                    this.data_list_echart.series[1].data = list;
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        },
        heart_rate_click(){
            this.blood_pressure = false;
            this.Oxygen = false;
            this.heart_rate = true;
            this.temperature = false;
            this.Sbp_Dbp = false;
            //数据列表波形
            let params = {
                "reg_id":this.current_page || 1,
                "start_pos":"9",
                "fields":"hr",
                "user_id":this.user_id
            }
            Https.DatasNew(params).then(res=>{
                if(res.data.code == 10000){
                    let list = res.data.data.list.map(item=>item.item_value);
                    let time = res.data.data.list.map(item=>this.Dates(parseInt(item.create_date)));
                    this.data_list_echart.xAxis.data = time;
                    this.data_list_echart.series[0].data = [];
                    this.data_list_echart.series[1].name = "心率";
                    this.data_list_echart.series[1].data = list;
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        },
        temperature_click(){
            this.blood_pressure = false;
            this.Oxygen = false;
            this.heart_rate = false;
            this.temperature = true;
            this.Sbp_Dbp = false;
            //数据列表波形
            let params = {
                "reg_id":this.current_page || 1,
                "start_pos":"9",
                "fields":"temp",
                "user_id":this.user_id
            }
            Https.DatasNew(params).then(res=>{
                if(res.data.code == 10000){
                    let list = res.data.data.list.map(item=>item.item_value);
                    let time = res.data.data.list.map(item=>this.Dates(parseInt(item.create_date)));
                    this.data_list_echart.xAxis.data = time;
                    this.data_list_echart.series[0].data = [];
                    this.data_list_echart.series[1].name = "体温";
                    this.data_list_echart.series[1].data = list;
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        },
        user_details(){
            this.$router.push({ path: 'user_details', query: {"id":this.user_id}})
        },
        getBeforeDate (m) {
            var n = m;
            var d = new Date();
            var year = d.getFullYear();
            var mon = d.getMonth() + 1;
            var day = d.getDate();
            if (day <= n) {
                if (mon > 1) {
                    mon = mon - 1;
                } else {
                    year = year - 1;
                    mon = 12;
                }
            }
            var dateArr = [];
            var dayCount = 0;
            for (var i = 0; i < n; i++) {
                if (dayCount === 0) {
                    d.setDate;
                } else {
                    d.setDate(d.getDate() - 1);
                }
                dayCount++;
                year = d.getFullYear();
                mon = d.getMonth() + 1;
                day = d.getDate();
                dateArr.push(year + '/' + (mon < 10 ? ('0' + mon) : mon) + '/' + (day < 10 ? ('0' + day) : day));
            }
            return dateArr.reverse();
        },
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'MM/dd hh:mm');
        },
        createLinkTopWave (data, id) {
            var count = 0;
            var detailDataEcg = [];
            for (var i = 0; i < data.ecg_raw.length; i++) {
                count++;
                detailDataEcg.push(count);
            }
            id = {
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    show: false,
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                },
                xAxis: {
                    show: false,
                    data: detailDataEcg,
                    axisLine: {onZero: false}
                },
                yAxis: {
                    show: false,
                    type: 'value',
                    min: 'dataMin',
                    max: 'dataMax',
                    axisLine: {onZero: false}
                },
                itemStyle: {
                    normal: {
                        color: '#57c7f6'
                    }
                },
                series: [{
                    name: 'ECG',
                    type: 'line',
                    symbol: 'none',
                    data: data.ecg_raw,
                    lineStyle: {
                        normal: {
                            color: '#f66'
                        }
                    }
                }]
            };
            return id;
        },
        handleEdit(id){
            Https.ecgData({"data_id":id}).then(res=>{
                if(res.data.code == 10000){
                    this.ecgdata = true;
                    let EcgData = [];
                    let EcgDataCount = [];
                    EcgData = res.data.data.ecg_raw;
                    for (let key of EcgData.keys()) {
                        EcgDataCount.push(key + 1);
                    }
                    this.AiaecgWave.xAxis.data = EcgDataCount;
                    this.AiaecgWave.toolbox.feature.name = this.ecgId;
                    this.AiaecgWave.series.data = EcgData;
                    this.AiaecgWave.dataZoom[0].endValue = EcgData.length + 1;
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        },
        Dates(time) {
            var date = new Date(time);
            return formatDate(date, 'MM/dd hh:mm');
        },
        data_list(){
            //用户信息
            Https.UserInfo({"user_id":this.user_id}).then(res=>{
                if(res.data.code == 10000){
                    this.UserInfo = res.data.data
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            Https.UserRIByDay({"user_id":this.user_id}).then(res=>{
                if(res.data.code == 10000){
                    let msg = [];
                    let msg2 = [];
                    for(var i=0; i<res.data.data.length; i++){
                        if(res.data.data[i].id == undefined){
                            msg.push(null)
                            msg2.push(null)
                        }else{
                            msg.push(res.data.data[i].RI)
                            msg2.push(res.data.data[i].RI)
                        }
                    }
                    let msg3 = [];
                    for(var i = 0 ;i<msg2.length;i++){  
                        if(msg2[i] !== null)  {  
                            msg3.push(msg2[i])
                        }  
                    }  
                    if(msg3[msg3.length-1] <= 40){
                        this.data_echart.backgroundColor = "#E5BFCC"
                    }else if(msg3[msg3.length-1] >= 65){
                        this.data_echart.backgroundColor = "#A9CCED"
                    }else{
                        this.data_echart.backgroundColor = "#EDE1B8"
                    }
                    this.data_echart.series[0].data = msg;
                    this.data_echart.xAxis[0].data = this.getBeforeDate(30)
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            //ecg
            Https.WarnDataNew({"user_id":this.user_id,"reg_id":this.current_page || 1,"start_pos":3}).then(res=>{
                if(res.data.code == 10000){
                    this.page_size = res.data.data[0].page_size;
                    res.data.data.shift();
                    this.ecg_list = [];
                    for (let value of res.data.data) {
                        let json = {};
                        json = value;
                        json.option = this.createLinkTopWave(value, value.id);
                        // this.ecg_list = [];
                        this.ecg_list.push(json);
                    };
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定") 
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        }
    },
    mounted(){
        this.data_list();
        this.blood_pressure_click();
    },
    components: {
        IEcharts,
        Sbp,
        Spo2h,
        Hrs,
        Temp
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy/MM/dd');
        },
        formatDates(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy.MM.dd hh:mm:ss');
        },
        formatDatesss(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy.MM.dd');
        },
    },
}
</script>

<style lang="less" scoped>
.user_information{
    width: 1250px;
    height: 100%;
    padding: 100px 0 0 240px;
    box-sizing: border-box;
    overflow: auto;
    margin: 0 auto;
    font-family: PingFangSC-Medium;
    .user_data{
        width: 980px;
        height: 50px;
        margin-bottom: 10px;
        .btn{
            width: 300px;
            height: 50px;
            box-sizing: border-box;
            background: #FFFFFF;
            border: 1px solid #E7E9ED;
            border-radius: 4px;
            float: left;
            font-size: 16px;
            color: #666;
            line-height: 48px;
            text-align: center;
            span{
                cursor: pointer;
            }
            span:first-child{
                padding-right: 17px;
                color: #4A90E2;
            }
            span:last-child{
                padding-left: 17px;
            }
        }
        ul{
            float: left;
            width: 600px;
            height: 50px;
            line-height: 50px;
            margin-left: 70px;
            display: flex;
            justify-content: space-between;
            li{
                width: auto;
                float: left;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #666666;
            }
            li:first-child{
                padding-left: 25px;
                background: url(../../../../static/img/user_list.png) no-repeat left center;
            }
        }
    }
    .Measurement_trend{
        width: 980px;
        height: 300px;
        background: #FFFFFF;
        border: 1px solid #E7E9ED;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
        .Measurement_trend_title{
            width: 100%;
            height: 24px;
            box-sizing: border-box;
            padding-left: 30px;
            margin-bottom: 16px;
            background: url(../../../../static/img/RI.png) no-repeat left center;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #666666;
            position: relative;
            .btns{
                position: absolute;
                left:50%;top: 50%;
                transform: translate(-50%,-50%);
                border-radius: 2px; 
                display: block;     
                border: 1px solid #ddd;                                              
                span{
                    display: block;
                    width: 80px;
                    height: 24px;
                    line-height: 24px;
                    float: left;
                    box-sizing: border-box;
                    text-align: center;
                    font-size: 14px;
                    color: #666666;
                    cursor: pointer;
                }
                .span_active{
                    background: #4A90E2;
                    color: #fff;
                }
            }
            i{
                font-style: normal;
                position: absolute;
                right:0;top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #4A90E2;
            }
        }
        .Measurement_trend_ctt{
            width: 100%;
            height: 240px;
            position: relative;
            box-sizing: border-box;
            border: 2px solid #000;
            div{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0; top: 0;
            }
        }
    }
    .data_list{
        width: 980px;
        height: 390px;
        background: #FFFFFF;
        border: 1px solid #E7E9ED;
        border-radius: 4px;
        margin-top: 10px;
        margin-bottom: 20px;
        box-sizing: border-box;
        .data_list_title{
            width: 100%;
            height: 24px;
            margin-top: 10px;
            box-sizing: border-box;
            padding-left: 40px;
            background: url(../../../../static/img/data_list.png) no-repeat 10px center;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #666666;
            margin-bottom: 18px;
            ul{
                float: right;
                font-size: 14px;
                border: 1px solid #ddd;
                border-radius: 2px;
                margin-right: 10px;
                height: 100%;
                box-sizing: border-box;
                li{
                    float: left;
                    height: 100%;
                    width: 80px;
                    line-height: 22px;
                    text-align: center;
                    border-right: 1px solid #ddd;
                    box-sizing: border-box;
                    cursor: pointer;
                }
                li:last-child{
                    border: none;
                }
                .li_active{
                    background: #4A90E2;
                    color: #fff;
                }
            }
        }
        .left_echart{
            width: 600px;
            height: 320px;
            background: #F7F7F7;
            border-radius: 4px;
            float: left;
            margin-left: 20px;
            position: relative;
            ul{
                position: absolute;
                right: 20px; top: 20px; z-index: 99;
                li{
                    float: left;
                    height: 18px;
                    width: auto;
                    text-align: right;
                    margin-left: 45px;
                    font-family: PingFangSC-Medium;
                    font-size: 12px;
                    color: #666666;
                    line-height: 17px;
                    padding-left: 18px;
                    position: relative;
                    span{
                        display: block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        position: absolute;
                        left: 0; top: 50%;
                        transform: translateY(-50%);
                    }
                }
                li:first-child{
                    span{
                        background: #F5A623;
                    }
                }
                li:last-child{
                    span{
                        background: #4A90E2;
                    }
                }
            }
            #data_list_echart{
                width: 100%;
                height: 100%;
            }
        }
    }
    .ECG_data{
        width: 980px;
        height: auto;
        background: #FFFFFF;
        border: 1px solid #E7E9ED;
        border-radius: 4px;
        margin: 10px 0 10px 0;
        box-sizing: border-box;
        padding-bottom: 22px;
        .ECG_data_list{
            width: 100%;
            height: 22px;
            line-height: 22px;
            background: url(../../../../static/img/ECG_data.png) no-repeat 10px center;
            box-sizing: border-box;
            padding: 0 25px 0 40px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #666666;
            margin: 10px 0 18px 0;
            position: relative;
            .ECG_data_pages{
                position: absolute;
                right: 25px; top: 50%;
                transform: translateY(-50%);
            }
        }
        .ECG_data_ctts{
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding: 0 20px;
            .ECG_data_ctt{
                width: 100%;
                height: auto;
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px; 
                div{
                    background: #FAFAFA;
                    border: 1px solid #CCCCCC;
                }
                .ECG_data_name{
                    width: 180px;
                    height: auto;
                    min-height: 80px;
                    box-sizing: border-box;
                    padding: 10px 0 0 20px;
                    .time{
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333333;
                        height: 20px;
                        line-height: 20px;
                    }
                    .name{
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #666666;
                        margin-top: 4px;
                        box-sizing: border-box;
                        padding-left: 20px;
                    }
                    .name:last-child{
                        margin-bottom: 10px;
                    }
                    p:nth-child(2){
                        margin-top: 10px;
                        position: relative;
                        span{
                            display: block;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            position: absolute;
                            left: 0; top: 50%;
                            transform: translateY(-50%);
                        }
                    }
                }
                .ECG_data_echarts{
                    width: 750px;
                    height: auto;
                    position: relative;
                    ul{
                        position: absolute;
                        left:0; top: 0; z-index: 99;
                        margin: 10px 0 0 20px;
                        li{
                            float: left;
                            width: 130px;
                            height: 20px;
                            line-height: 20px;
                            font-family: PingFangSC-Medium;
                            font-size: 14px;
                            color: #333333;
                        }
                    }
                    span{
                        display: block;
                        width: 40px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        background: #4A90E2;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #FFFFFF;
                        position: absolute;
                        cursor: pointer;
                        right: 0; top: 0; z-index: 99;
                    }
                    div{
                        border: none;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .ECG_data_ctt:last-child{
                margin-bottom: 0px; 
            }
        }
    }
}
</style>


