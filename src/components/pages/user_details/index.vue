<template>
    <div class="user_datails">
        <div class="user_data">
            <div class="btn"><span @click="user_information">健康信息</span>/<span>Rothman Index详情</span></div>
            <ul class="user">
                <li>用户信息</li>
                <li><span>姓名：</span>{{UserInfo.name ? UserInfo.name : "未填写"}}</li>
                <li><span>账号：</span>{{UserInfo.login_name}}</li>

                <li v-if="UserInfo.age"><span>出生日期：</span>{{UserInfo.age | formatDatesss}}</li>
                <li v-else><span>出生日期：</span>未填写</li>
            </ul>
        </div>
        <div class="parameter">
            <div class="left_table">
                <h1>Rothman Index<span>{{RI_list.ri}}</span></h1>
                <h2><span></span>测量参数</h2>
                <div class="top">
                    <ul>
                        <li>血压测量BP</li>
                        <li>体温测量BT</li>
                        <li>脉率测量PR</li>
                        <li>呼吸频率BR</li>
                        <li>血氧测量SPO2</li>
                    </ul>
                    <ol>
                        <li>{{RI_list.sbp}}/{{RI_list.dbp}}</li>
                        <li>{{RI_list.temp}}</li>
                        <li>{{RI_list.hr}}</li>
                        <li>{{RI_list.respiration}}</li>
                        <li>{{RI_list.spo2h}}</li>
                    </ol>
                </div>
                <h2><span></span>评估问卷</h2>
                <div class="top">
                    <ul>
                        <li>饮食问题</li>
                        <li>心理健康</li>
                        <li>神经系统</li>
                        <li>肠胃健康</li>
                        <li>外周血管</li>
                        <li>呼吸状况</li>
                        <li>泌尿系统</li>
                        <li>皮肤健康</li>
                        <li>心脏健康</li>
                        <li>行为安全</li>
                        <li>肌肉骨骼</li>
                        <li>小便失禁</li>
                        <li>大便失禁</li>
                        <li>认知问题</li>
                    </ul>
                    <ol v-if="quest != ''">
                        <li v-for="item in quest">
                            <span v-if="item == 1" style="color:#D0021B">存在</span>
                            <span v-else-if="item == 0" style="color:#333">不存在</span>
                        </li>
                    </ol>
                    <ol v-else>
                        <li>未填写</li>
                        <li>未填写</li>
                        <li>未填写</li>
                        <li>未填写</li>
                        <li>未填写</li>
                        <li>未填写</li>
                        <li>未填写</li>
                        <li>未填写</li>
                        <li>未填写</li>
                        <li>未填写</li>
                        <li>未填写</li>
                        <li>未填写</li>
                        <li>未填写</li>
                        <li>未填写</li>
                    </ol>
                </div>
            </div>
            <div class="right_echrat">
                <div class="Measurement_trend">
                    <h2 class="Measurement_trend_title">
                        Rothman Index测量趋势
                        <span class="btns">
                            <span :class="{span_active:data_display}" @click="data_click">日期显示</span>
                            <span :class="{span_active:frequency_display}" @click="frequency_click">次数显示</span>
                        </span>
                        <i @click="addsign" v-show="biaoji"></i>
                    </h2>
                    <div class="Measurement_trend_ctt">
                        <IEcharts :option="data_echart" :loading="loading" @click="IEcharts_click"></IEcharts>
                    </div>
                </div>
                <div class="Nursing_record">
                    <h2 class="Nursing_record_title">护理记录<i @click="add_record"></i></h2>
                    <div class="abm">
                        <div class="add_record" v-show="addRecord">
                            <input type="text" autofocus v-model="record_ctt">
                            <span class="submit" @click="add_record_ctt">提交</span>
                            <span @click="display_record">撤销</span>
                        </div>
                        <div class="records">
                            <div class="record" v-for="item in getByType_list">
                                <div class="title_time">
                                    <span class="title">护理记录</span>
                                    <span class="time">{{item.create_date}}</span>
                                </div>
                                <div class="ctt">{{item.note}}</div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Https from '@/utils/https';
import IEcharts from 'vue-echarts-v3/src/full.js';
import {formatDate} from '@/components/common/date.js';
export default {
    data(){
        return{
            data_display:true,
            frequency_display:false,
            addRecord:false,
            user_id:this.$route.query.id,
            UserInfo:[],
            loading:false,
            biaoji:true,
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
                    left: 0,
                    top: 25,
                    right: 0,
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
                        }
                    ]},
                    markPoint: {
                        symbol: 'triangle',
                        symbolSize: 10,
                        symbolRotate: 180,
                        silent: true,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'insideTop',
                                    formatter: function (param) {
                                        return '';
                                    }
                                }
                            }
                        },
                        data: []
                    },
                    data: []
                }]
            },
            record_ctt:"",
            RI_list:[],
            quest:[],
            getByType_list:[],

            resData:"",
            RI_id:[],
            RI_mark:[],
            MarkPoint: [],
            positionIndex:"",//数据id
            positionX:"",//数据位置
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
        add_record(){
            this.record_ctt = "";
            this.addRecord = true;
        },
        display_record(){
            this.addRecord = false;
        },
        data_click(){
            //获取30天的数据
            this.data_display = true;
            this.frequency_display = false;
            this.biaoji = true;
            Https.UserRIByDay({"user_id":this.user_id}).then(res=>{
                if(res.data.code == 10000){
                    let msg = [];
                    let msg2 = [];
                    let id = [];
                    this.RI_mark = [];
                    this.MarkPoint = [];
                    for(var i=0; i<res.data.data.length; i++){
                        if(res.data.data[i].id == undefined){
                            msg.push("")
                            msg2.push(null)
                        }else{
                            msg.push(res.data.data[i].RI)
                            msg2.push(res.data.data[i].RI)
                        }
                        id.push(res.data.data[i].id);
                        if (res.data.data[i].mark != '1') {
                            let MarkPointJson = {};
                            MarkPointJson.IndexX = res.data.data[i].day;
                            MarkPointJson.IndexY = res.data.data[i].RI;
                            MarkPointJson.ID = res.data.data[i].id;
                            MarkPointJson.mark = "0"
                            this.RI_mark.push(MarkPointJson);
                        } else {
                            let MarkPointJson = {};
                            MarkPointJson.IndexX = res.data.data[i].day;
                            MarkPointJson.IndexY = res.data.data[i].RI;
                            MarkPointJson.ID = res.data.data[i].id;
                            MarkPointJson.mark = res.data.data[i].mark;
                            this.RI_mark.push(MarkPointJson);
                            this.MarkPoint.push(MarkPointJson)
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
                    this.RI_id = id;
                    this.data_echart.series[0].data = msg;
                    this.data_echart.xAxis[0].data = this.getBeforeDate(30);
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }

            }).catch(error=>{
                console.log("网络错误")
            })
        },
        frequency_click(){
            //获取30次的数据
            this.data_display = false;
            this.frequency_display = true;
            this.biaoji = false;
            Https.UserRIByCount({"user_id":this.user_id}).then(res=>{
                if(res.data.code == 10000){
                    let msg =res.data.data.map(item=>({
                        id:item.id,
                        RI:item.ri,
                        time:item.create_date
                    }));
                    this.RI_mark = [];
                    this.MarkPoint = [];
                    for(var i=0; i<res.data.data.length; i++){
                        if (res.data.data[i].mark != '1') {
                            let MarkPointJson = {};
                            MarkPointJson.IndexX = res.data.data[i].create_date;
                            MarkPointJson.IndexY = res.data.data[i].ri;
                            MarkPointJson.ID = res.data.data[i].id;
                            MarkPointJson.mark = "0"
                            this.RI_mark.push(MarkPointJson);
                        } else {
                            let MarkPointJson = {};
                            MarkPointJson.IndexX = res.data.data[i].create_date;
                            MarkPointJson.IndexY = res.data.data[i].ri;
                            MarkPointJson.ID = res.data.data[i].id;
                            MarkPointJson.mark = res.data.data[i].mark;
                            this.RI_mark.push(MarkPointJson);
                            this.MarkPoint.push(MarkPointJson)
                        }
                    }
                    if(msg[0].RI <= 40){
                        this.data_echart.backgroundColor = "#E5BFCC"
                    }else if(msg[0].RI >= 65){
                        this.data_echart.backgroundColor = "#A9CCED"
                    }else{
                        this.data_echart.backgroundColor = "#EDE1B8"
                    }
                    this.RI_id = msg.map(item=>item.id);
                    this.data_echart.series[0].data = msg.map(item=>item.RI).reverse();
                    this.data_echart.xAxis[0].data = msg.map(item=>this.formatDate(item.time)).reverse();
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        },
        addsign(){
            //标记
            if (this.positionIndex && this.RI_mark[this.positionX].mark == '0'){
                Https.save({"user_id":this.user_id,"type":"nurse","note":"管理员标记了当前数据","data_id":this.positionIndex}).then(res=>{
                    if(res.data.code == 10000){
                        this.getByType_list = res.data.data;
                        this.RI_mark[this.positionX].mark = '1';
                    }
                }).catch(error=>{
                    console.log("网络错误")
                })
                Https.u_save({user_id: this.user_id, mark: '1', id: this.positionIndex}).then(res=>{
                    if(res.data.code == 10000){
                        let json = {};
                        json.IndexX = this.positionX;
                        json.IndexY = this.resData;
                        json.ID = this.RI_mark[this.positionX].ID;
                        this.MarkPoint.push(json);
                        this.RI_mark[this.positionX].mark = '1';
                    }
                }).catch(error=>{
                    console.log("网络错误")
                })
            }else if(this.positionIndex && this.RI_mark[this.positionX].mark == '1'){
                Https.delMark({"data_id":this.positionIndex,"user_id":this.user_id}).then(res=>{
                    if(res.data.code == 10000){
                        this.RI_mark[this.positionX].mark = '0';
                        this.getByType_list = res.data.data;
                    }
                }).catch(error=>{
                    console.log("网络错误")
                })
                Https.u_save({user_id: this.user_id, mark: '0', id: this.positionIndex}).then(res=>{
                    if(res.data.code == 10000){
                        let tempId = this.RI_mark[this.positionX].ID;
                        for (let [index, value] of this.MarkPoint.entries()) {
                            if (value.ID === tempId) {
                                this.MarkPoint.splice(index, 1);
                            }
                        }
                        this.RI_mark[this.positionX].mark = '0';
                    }
                }).catch(error=>{
                    console.log("网络错误")
                })
            }
        },
        IEcharts_click(event){
            this.positionIndex = this.RI_id[event.dataIndex];
            this.positionX = event.dataIndex;
            this.resData = event.value;
            //获取某个点RI--echarts图表的数据
            Https.recentData({"user_id":this.user_id,"data_id":this.RI_id[event.dataIndex],"reg_id":"1","end_pos":"1","fields":"RI"}).then(res=>{
                if(res.data.code == 10000){
                    this.RI_list = res.data.data.list[0]
                    this.quest = [];
                    for(var i=0; i<res.data.data.list[0].quest.length; i++){
                        this.quest.push(res.data.data.list[0].quest[i])
                    }
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        },
        //保存护理记录
        add_record_ctt(){
            if (this.record_ctt) {
                Https.save({"user_id":this.user_id,"type":"nurse","note":this.record_ctt}).then(res=>{
                    if(res.data.code == 10000){
                        this.$alert('<strong>保存成功</strong>', '提示', {
                            dangerouslyUseHTMLString: true
                        });
                        this.getByType_list = res.data.data;
                        this.addRecord = false;
                    }else{
                        this.login_out("登录超时，请重新登录！","提示","确定")
                    }
                }).catch(res=>{
                    console.log("网络错误")
                })
            } else {
                this.$alert('<strong>内容不能为空</strong>', '提示', {
                    dangerouslyUseHTMLString: true
                });
            }
        },
        user_information(){
            this.$router.push({ path: 'user_information', query: {"id":this.user_id} })
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
            //获取最近30天的RI---echarts数据
            Https.UserRIByDay({"user_id":this.user_id}).then(res=>{
                if(res.data.code == 10000){
                    let msg = [];
                    let msg2 = [];
                    let id = [];
                    this.RI_mark = [];
                    this.MarkPoint = [];
                    for(var i=0; i<res.data.data.length; i++){
                        if(res.data.data[i].id == undefined){
                            msg.push("")
                            msg2.push(null)
                        }else{
                            msg.push(res.data.data[i].RI)
                            msg2.push(res.data.data[i].RI)
                        }
                        id.push(res.data.data[i].id);
                        if (res.data.data[i].mark != '1') {
                            let MarkPointJson = {};
                            MarkPointJson.IndexX = res.data.data[i].day;
                            MarkPointJson.IndexY = res.data.data[i].RI;
                            MarkPointJson.ID = res.data.data[i].id;
                            MarkPointJson.mark = "0"
                            this.RI_mark.push(MarkPointJson);
                        } else {
                            let MarkPointJson = {};
                            MarkPointJson.IndexX = res.data.data[i].day;
                            MarkPointJson.IndexY = res.data.data[i].RI;
                            MarkPointJson.ID = res.data.data[i].id;
                            MarkPointJson.mark = res.data.data[i].mark;
                            this.RI_mark.push(MarkPointJson);
                            this.MarkPoint.push(MarkPointJson)
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
                    this.RI_id = id;
                    this.data_echart.series[0].data = msg;
                    this.data_echart.xAxis[0].data = this.getBeforeDate(30)
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            //获取评估问卷和RI测量参数
            Https.recentData({"user_id":this.user_id,"reg_id":"1","end_pos":"1","fields":"RI"}).then(res=>{
                if(res.data.code == 10000){
                    this.RI_list = res.data.data.list[0];
                    this.quest = [];
                    for(var i=0; i<res.data.data.list[0].quest.length; i++){
                        this.quest.push(res.data.data.list[0].quest[i])
                    }
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            //获取护理记录
            Https.getByType({"user_id":this.user_id,"type":"nurse"}).then(res=>{
                if(res.data.code == 10000){
                    this.getByType_list = res.data.data
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定") 
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        }
    },
    watch:{
      MarkPoint () {
        let tempMarkPoint = [];
        for (let value of this.MarkPoint) {
            let MarkPointData = { coord: [null, null], value: 0, itemStyle: { normal: {color: '#febf2d'} } };
            MarkPointData.coord[0] = value.IndexX;
            MarkPointData.coord[1] = value.IndexY;
            tempMarkPoint.push(MarkPointData);
        }
        this.data_echart.series[0].markPoint.data = tempMarkPoint;
      },
    },
    mounted(){
        this.data_list();
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        },
        formatDates(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        },
        formatDatesss(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy.MM.dd');
        },
    },
    components: {
        IEcharts
    },
}
</script>

<style lang="less" scoped>
.user_datails{
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
                padding-right: 17px
            }
            span:last-child{
                padding-left: 17px;
                color: #4A90E2;
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
    .parameter{
        height: 800px;
        width: 980px;
        .left_table{
            width: 300px;
            height: 800px;
            background: #FFFFFF;
            border: 1px solid #E7E9ED;
            border-radius: 4px;
            float: left;
            box-sizing: border-box;
            padding: 0 20px;
            h1{
                margin-top: 10px;
                width: 100%;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #ccc;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #333333;
                span{
                    font-family: FZLTTHJW--GB1-0;
                    font-size: 24px;
                    color: #333333;
                    float: right;
                    font-weight: bolder;
                }
            }
            h2{
                height: 22px;
                line-height: 22px;
                width: 100%;
                box-sizing: border-box;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #333333;
                margin: 20px 0 10px 0;
                span{
                    display: block;
                    width: 10px;
                    height: 10px;
                    background: #4A90E2;
                    float: left;margin: 6px 10px 0 0;
                }
            }
            .top{
                width: 100%;
                height: auto;
                padding-bottom: 10px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
                overflow: hidden;
                ol,ul{
                    width: 50%;
                    height: auto;
                    float: left;
                    li{
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        box-sizing: border-box;
                    }
                    li:nth-child(odd){
                        background: #F4F5FA;
                    }
                    li:nth-child(even){
                        background: #fff;
                    }
                }
                ul{
                    li{
                        text-align: left;
                        padding-left: 20px;
                    }
                }
                ol{
                    li{
                        text-align: right;
                        padding-right: 20px;
                    }
                }
            }
        }
        .right_echrat{
            float: right;
            height: 100%;
            width: 670px;
            .Measurement_trend{
                width: 100%;
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
                        display: block;
                        width: 14px;
                        height: 16px;
                        position: absolute;
                        right:0;top: 50%;
                        transform: translateY(-50%);
                        cursor: pointer;
                        background: url(../../../../static/img/sign.png) no-repeat center;
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
            .Nursing_record{
                width: 100%;
                height: 490px;
                background: #FFFFFF;
                border: 1px solid #E7E9ED;
                border-radius: 4px;
                box-sizing: border-box;
                margin-top: 10px;
                .Nursing_record_title{
                    width: 100%;
                    height: 22px;
                    box-sizing: border-box;
                    padding-left: 40px;
                    margin-top: 10px;
                    background: url(../../../../static/img/Nursing_record.png) no-repeat 10px center;
                    font-family: PingFangSC-Medium;
                    font-size: 16px;
                    color: #666666;
                    i{
                        display: block;
                        width: 16px;
                        height: 16px;
                        background: url(../../../../static/img/add.png) no-repeat center;
                        float: right;
                        margin: 4px 10px 0 0;
                        cursor: pointer;
                    }
                }
                .abm{
                    width: 100%;
                    height: 425px;
                    overflow: auto;
                    margin-bottom: 15px;
                    box-sizing: border-box;
                    margin-top: 15px;
                    .add_record{
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        box-sizing: border-box;
                        padding: 0 20px;
                        display: flex;
                        justify-content: space-between;
                        input{
                            outline: none;
                            background: #FFFFFF;
                            border: 1px solid #CCCCCC;
                            border-radius: 4px;
                            height: 40px;
                            width: 530px;
                            box-sizing: border-box;
                            padding: 0 10px;
                            line-height: 38px;
                        }
                        span{
                            font-family: PingFangSC-Regular;
                            font-size: 16px;
                            color: #666;
                            cursor: pointer;
                        }
                        .submit{
                            color: #4A90E2;
                        }
                    }
                    .records{
                        width: 100%;
                        height: auto;
                        box-sizing: border-box;
                        padding: 0 20px;
                        margin-top: 10px;
                        .record{
                            width: 100%;
                            height: auto;
                            background: #FAFAFA;
                            border: 1px solid #CCCCCC;
                            border-radius: 4px;
                            margin-bottom: 10px;
                            box-sizing: border-box;
                            padding: 10px 20px 18px 20px;
                            .title_time{
                                width: 100%;
                                height: 22px;
                                line-height: 22px;
                                margin-bottom: 10px;
                                .title{
                                    font-family: PingFangSC-Medium;
                                    font-size: 16px;
                                    color: #666666;
                                    float: left;
                                }
                                .time{
                                    font-family: PingFangSC-Regular;
                                    font-size: 14px;
                                    color: #666666;
                                    float: right;
                                }
                            }
                            .ctt{
                                line-height: 20px;
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #666666;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>


