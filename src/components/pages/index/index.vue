<template>
    <div class="RouterView">
        <div class="datas">
            <div class="data">
                <p>{{ $t('index.Total_number_of_users') }}</p>
                <div>{{list.nowUser?list.nowUser:0}}</div>
                <p>{{ $t('index.Last_week') }}<span v-if="list.overUser > 0"><img src="static/img/up.png"></span><span v-else><img src="static/img/down.png"></span>{{parseInt(list.overUser*100)}}%</p>
            </div>
            <div class="data">
                <p>{{ $t('index.Total_data_collection') }}</p>
                <div>{{list.nowData?list.nowData:0}}</div>
                <p>{{ $t('index.Last_week') }}<span v-if="list.overData > 0"><img src="static/img/up.png"></span><span v-else><img src="static/img/down.png"></span>{{parseInt(list.overData*100)}}%</p>
            </div>
            <div class="data">
                <p>{{ $t('index.New_users_this_week') }}</p>
                <div>{{list.nowAddUser ? list.nowAddUser : 0}}</div>
                <p>{{ $t('index.Last_week') }}<span v-if="list.overAddUser > 0"><img src="static/img/up.png"></span><span v-else><img src="static/img/down.png"></span>{{parseInt(list.overAddUser*100)}}%</p>
            </div>
            <div class="data">
                <p>{{ $t('index.New_data_this_week') }}</p>
                <div>{{list.nowAddData?list.nowAddData:0}}</div>
                <p>{{ $t('index.Last_week') }}<span v-if="list.overAddData > 0"><img src="static/img/up.png"></span><span v-else><img src="static/img/down.png"></span>{{parseInt(list.overAddData*100)}}%</p>
            </div>
            <div class="data">
                <p>{{ $t('index.Activation_of_the_total_amount_of_equipment') }}</p>
                <div>{{list.activeDevice?list.activeDevice:0}}</div>
            </div>
        </div>
        <div class="rothman_index">
            <h2 class="RI_title">{{ $t('index.Real_time_RI_index_display') }}<span @click="see_all_RI">{{ $t('index.Look_at_the_whole') }}</span></h2>
            <div class="charts">
                <div class="chart" @click="user_information(RI_1_list.user_id)">
                    <div class="username">{{RI_1_list.login_name}}</div>
                    <div class="usertime">{{RI_1_list.create_date | formatDate}}</div>
                    <div class="RI_echrat">
                        <IEcharts :option="RI_1_options" :loading="loading"></IEcharts>
                    </div>
                </div>
                <div class="chart" @click="user_information(RI_2_list.user_id)">
                    <div class="username">{{RI_2_list.login_name}}</div>
                    <div class="usertime">{{RI_2_list.create_date | formatDate}}</div>
                    <div class="RI_echrat">
                        <IEcharts :option="RI_2_options" :loading="loading"></IEcharts>
                    </div>
                </div>
                <div class="chart" @click="user_information(RI_3_list.user_id)">
                    <div class="username">{{RI_3_list.login_name}}</div>
                    <div class="usertime">{{RI_3_list.create_date | formatDate}}</div>
                    <div class="RI_echrat">
                        <IEcharts :option="RI_3_options" :loading="loading"></IEcharts>
                    </div>
                </div>
                <div class="chart" @click="user_information(RI_4_list.user_id)">
                    <div class="username">{{RI_4_list.login_name}}</div>
                    <div class="usertime">{{RI_4_list.create_date | formatDate}}</div>
                    <div class="RI_echrat">
                        <IEcharts :option="RI_4_options" :loading="loading"></IEcharts>
                    </div>
                </div>
                <div class="chart" @click="user_information(RI_5_list.user_id)">
                    <div class="username">{{RI_5_list.login_name}}</div>
                    <div class="usertime">{{RI_5_list.create_date | formatDate}}</div>
                    <div class="RI_echrat">
                        <IEcharts :option="RI_5_options" :loading="loading"></IEcharts>
                    </div>
                </div>
                <div class="chart" @click="user_information(RI_6_list.user_id)">
                    <div class="username">{{RI_6_list.login_name}}</div>
                    <div class="usertime">{{RI_6_list.create_date | formatDate}}</div>
                    <div class="RI_echrat">
                        <IEcharts :option="RI_6_options" :loading="loading"></IEcharts>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="abnormalDataList">
                <h2 class="abnormalDataListTitle">{{ $t('index.Exception_data_list') }}</h2>
                <table>
                    <tr>
                        <td>{{ $t('index.Account_number') }}</td>
                        <td>{{ $t('index.User_name') }}</td>
                        <td>{{ $t('index.Abnormal_measurement_term') }}</td>
                        <td>{{ $t('index.Measurement_value') }}</td>
                        <td></td>
                    </tr>
                    <tr v-for="item in abnormalDataList">
                        <td>{{item.login_name}}</td>

                        <td v-if="item.name">{{item.name}}</td>
                        <td v-else>{{ $t('index.Unfilled') }}</td>

                        <td v-if="item.item_name == 'hr'">{{ $t('index.hr') }}</td>
                        <td v-else-if="item.item_name == 'sbp'">{{ $t('index.sbp') }}</td>
                        <td v-else-if="item.item_name == 'afib'">{{ $t('index.afib') }}</td>
                        <td v-else-if="item.item_name == 'spo2h'">{{ $t('index.spo2h') }}</td>
                        <td v-else-if="item.item_name == 'ri'">{{ $t('index.ri') }}</td>
                        <td v-else>{{ $t('index.temp') }}</td>

                        <td>{{item.item_value}}</td>
                        <td><span class="span" @click="user_information(item.user_id)">{{ $t('index.View_the_details') }}</span></td>
                    </tr>
                </table>
                <el-pagination
                    class="pages"
                    @current-change = "change_pages"
                    :page-size="5"
                    :current-page="current_page"
                    layout="total, prev, pager, next"
                    :page-count="page_size">
                </el-pagination>
            </div>
            <div class="userAge">
                <h2 class="UserAgeTitle">{{ $t('index.User_age_distribution') }}</h2>
                <div id="userAge">
                    <IEcharts :option="user_age_options" :loading="loading"></IEcharts>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Https from '@/utils/https';
import IEcharts from 'vue-echarts-v3/src/full.js';
import {formatDate} from '@/components/common/date.js';

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
    data() {
        return {
            loading:false,
            list:[],
            RI_1:"",
            RI_1_list:"",
            RI_1_options:{
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
                    left: -18,
                    top: 46,
                    right: -18,
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
                                color: 'rgba(0, 0, 0, 0.2)'
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
                    data:[]
                }]
            },
            RI_2:"",
            RI_2_list:"",
            RI_2_options:{
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
                    left: -18,
                    top: 46,
                    right: -18,
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
                                color: 'rgba(0, 0, 0, 0.2)'
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
                    data:[]
                }]
            },
            RI_3:"",
            RI_3_list:"",
            RI_3_options:{
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
                    left: -18,
                    top: 46,
                    right: -18,
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
                                color: 'rgba(0, 0, 0, 0.2)'
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
                    data:[]
                }]
            },
            RI_4:"",
            RI_4_list:"",
            RI_4_options:{
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
                    left: -18,
                    top: 46,
                    right: -18,
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
                                color: 'rgba(0, 0, 0, 0.2)'
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
                    data:[]
                }]
            },
            RI_5:"",
            RI_5_list:"",
            RI_5_options:{
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
                    left: -18,
                    top: 46,
                    right: -18,
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
                                color: 'rgba(0, 0, 0, 0.2)'
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
                    data:[]
                }]
            },
            RI_6:"",
            RI_6_list:"",
            RI_6_options:{
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
                    left: -18,
                    top: 46,
                    right: -18,
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
                                color: 'rgba(0, 0, 0, 0.2)'
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
                    data:[]
                }]
            },
            current_page:1,
            page_size:0,
            abnormalDataList:[],
            user_age_options:{
                color:['#3498DB', '#26B99B', '#E74D3C', '#9B59B6', '#BDC3C7'],
                legend: {
                    orient: 'horizontal',
                    data:['<   20','20~40','40~60','60~80','>   80'],
                    bottom: 60,
                    itemWidth:12,
                    itemHeight:12,
                    selectedMode: false
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: '年龄分布',
                        type:'pie',
                        radius: [45, 90],
                        avoidLabelOverlap: false,
                        center:["50%",100],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '22',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:"", name:'<   20'},
                            {value:"", name:'20~40'},
                            {value:"", name:'40~60'},
                            {value:"", name:'60~80'},
                            {value:"", name:'>   80'}
                        ]
                    }
                ]
            }
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'MM/dd hh:mm');
        }
    },
    watch:{
        current_page(){
            this.dataList()
        },
    },
    mounted(){
        this.dataList();
    },
    methods:{
        user_information(id){
            this.$router.push({path: 'index/user_information', query: {"id":id}})
        },
        see_all_RI(){
            this.$router.push({ path: 'RI_Overview' })
        },
        change_pages(val){
            this.current_page = val;
        },
        dataList(){
            //首页统计信息
            Https.IndexDetail({}).then(res=>{
                if(res.data.code == 10000){
                    this.list = res.data.data;
                }else{
                    this.$alert('登录超时, 请重新登录!', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            const router = this.$router;
                            router.push({path: '/'});
                        }
                    });
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            //首页RI
            let RI_datas={
                "reg_id":"0",
                "start_pos":"6"
            }
            Https.IndexUserRI(RI_datas).then(res=>{
                if(res.data.code == 10000){
                    this.RI_1 = res.data.data.dataList[0];
                    this.RI_1_list = this.RI_1[0];
                    let msg1 =this.RI_1.map(item=>({
                        RI:item.ri
                    }));
                    if(msg1[0].RI <= 40){
                        this.RI_1_options.backgroundColor = "#E5BFCC"
                    }else if(msg1[0].RI >= 65){
                        this.RI_1_options.backgroundColor = "#A9CCED"
                    }else{
                        this.RI_1_options.backgroundColor = "#EDE1B8"
                    }
                    this.RI_1_options.series[0].data = msg1.map(item=>item.RI).reverse();

                    this.RI_2 = res.data.data.dataList[1];
                    this.RI_2_list = this.RI_2[0];
                    let msg2 =this.RI_2.map(item=>({
                        RI:item.ri
                    }));
                    if(msg2[0].RI <= 40){
                        this.RI_2_options.backgroundColor = "#E5BFCC"
                    }else if(msg2[0].RI >= 65){
                        this.RI_2_options.backgroundColor = "#A9CCED"
                    }else{
                        this.RI_2_options.backgroundColor = "#EDE1B8"
                    }
                    this.RI_2_options.series[0].data = msg2.map(item=>item.RI).reverse();

                    this.RI_3 = res.data.data.dataList[2];
                    this.RI_3_list = this.RI_3[0];
                    let msg3 =this.RI_3.map(item=>({
                        RI:item.ri
                    }));
                    if(msg3[0].RI <= 40){
                        this.RI_3_options.backgroundColor = "#E5BFCC"
                    }else if(msg3[0].RI >= 65){
                        this.RI_3_options.backgroundColor = "#A9CCED"
                    }else{
                        this.RI_3_options.backgroundColor = "#EDE1B8"
                    }
                    this.RI_3_options.series[0].data = msg3.map(item=>item.RI).reverse();

                    this.RI_4 = res.data.data.dataList[3];
                    this.RI_4_list = this.RI_4[0];
                    let msg4 =this.RI_4.map(item=>({
                        RI:item.ri
                    }));
                    if(msg4[0].RI <= 40){
                        this.RI_4_options.backgroundColor = "#E5BFCC"
                    }else if(msg4[0].RI >= 65){
                        this.RI_4_options.backgroundColor = "#A9CCED"
                    }else{
                        this.RI_4_options.backgroundColor = "#EDE1B8"
                    }
                    this.RI_4_options.series[0].data = msg4.map(item=>item.RI).reverse();

                    this.RI_5 = res.data.data.dataList[4];
                    this.RI_5_list = this.RI_5[0];
                    let msg5 =this.RI_5.map(item=>({
                        RI:item.ri
                    }));
                    if(msg5[0].RI <= 40){
                        this.RI_5_options.backgroundColor = "#E5BFCC"
                    }else if(msg5[0].RI >= 65){
                        this.RI_5_options.backgroundColor = "#A9CCED"
                    }else{
                        this.RI_5_options.backgroundColor = "#EDE1B8"
                    }
                    this.RI_5_options.series[0].data = msg5.map(item=>item.RI).reverse();

                    this.RI_6 = res.data.data.dataList[5];
                    this.RI_6_list = this.RI_6[0];
                    let msg6 =this.RI_6.map(item=>({
                        RI:item.ri
                    }));
                    if(msg6[0].RI <= 40){
                        this.RI_6_options.backgroundColor = "#E5BFCC"
                    }else if(msg6[0].RI >= 65){
                        this.RI_6_options.backgroundColor = "#A9CCED"
                    }else{
                        this.RI_6_options.backgroundColor = "#EDE1B8"
                    }
                    this.RI_6_options.series[0].data = msg6.map(item=>item.RI).reverse();
                }else{
                    this.$alert('登录超时, 请重新登录!', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            const router = this.$router;
                            router.push({path: '/'});
                        }
                    });
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            //异常数据列表
            let indexExpDatas = {
                "reg_id":this.current_page || 1,
                "start_pos":"5",
            }
            Https.IndexExpDatas(indexExpDatas).then(res=>{
                if(res.data.code == 10000){
                    this.page_size = res.data.data.pagesize-1;
                    this.abnormalDataList = res.data.data.list;
                }else{
                    this.$alert('登录超时, 请重新登录!', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            const router = this.$router;
                            router.push({path: '/'});
                        }
                    });
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            //首页年龄分布
            Https.IndexDistribute({"fields":"age"}).then(res=>{
                if(res.data.code == 10000){
                    let msg = res.data.data.map(item=>({
                        pos:item.pos,
                        val:item.count
                    }));
                    for(var i=0; i<msg.length; i++){
                        this.user_age_options.series[0].data[i].value = msg[i].val ? msg[i].val : 0;
                    }
                }else{  
                    this.$alert('登录超时, 请重新登录!', '提示', {
                        confirmButtonText: '确定',
                        callback: instance => {
                            const router = this.$router;
                            router.push({path: '/'});
                        }
                    });
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
.RouterView{
    width: 1250px;
    height: 100%;
    padding: 100px 0 0 240px;
    box-sizing: border-box;
    margin: 0 auto;
    overflow: auto;
    .datas{
        width: 980px;
        height: 110px;
        .data{
            width: 180px;
            height: 100px;
            box-sizing: border-box;
            margin-right: 20px;
            border: 1px solid #E7E9ED;
            border-radius: 4px;
            padding-left: 36px;
            float: left;
            p:first-child{
                width: 100%;
                height: 20px;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #666666;
                margin-top: 8px;
                line-height: 20px;
            }
            div{
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-family: FZLTTHJW--GB1-0;
                font-size: 24px;
                color: #333333;
                margin-top: 4px;
                font-weight: bolder;
            }
            p:last-child{
                width: 100%;
                height: 17px;
                line-height: 17px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #666666;
                margin-top: 4px;
                display: flex;
                justify-content: flex-start;
                span{
                    display: block;
                    width: 22px;
                    height: 100%;
                    position: relative;
                    img{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translateY(-50%)
                    }
                }
            }
        }
        .data:first-child{
            background: url(../../../../static/img/user.png) no-repeat 10px 10px;
            background-color: #FFFFFF;
        }
        .data:nth-child(2){
            background: url(../../../../static/img/data_acquisition.png) no-repeat 10px 10px;
            background-color: #FFFFFF;
        }
        .data:nth-child(3){
            background: url(../../../../static/img/week_user.png) no-repeat 10px 10px;
            background-color: #FFFFFF;
        }
        .data:nth-child(4){
            background: url(../../../../static/img/week_data.png) no-repeat 10px 10px;
            background-color: #FFFFFF;
        }
        .data:last-child{
            margin-right: 0;
            background: url(../../../../static/img/activation.png) no-repeat 10px 10px;
            background-color: #FFFFFF;
        }
    }
    .rothman_index{
        width: 980px;
        height: 440px;
        background: #fff;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #E7E9ED;
        margin-bottom: 10px;
        .RI_title{
            width: 100%;
            height: 20px;
            line-height: 20px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #666666;
            background: url(../../../../static/img/RI.png) no-repeat 10px center;
            box-sizing: border-box;
            padding-left: 34px;
            margin-top: 10px;
            margin-bottom: 0px;
            span{
                float: right;
                margin: 0 20px 0 0;
                display: black;
                width: 64px;
                height: 22px;
                line-height: 22px;
                color: #4A90E2;
                cursor: pointer;
            }
        }
        .charts{
            width: 100%;
            height: 388px;
            box-sizing: border-box;
            margin-top: 20px;
            padding: 0 29px;
            .chart{
                width: 300px;
                height: 180px;
                float: left;
                margin: 0 10px 10px 0;
                box-sizing: border-box;
                border: 2px solid #000;
                position: relative;
                div{
                    position: absolute;
                    width: auto;
                    height: 20px;
                    line-height: 20px;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #333333;
                }
                .username{
                    left:10px;
                    top: 6px;
                    z-index: 99;
                }
                .usertime{
                    right:10px;
                    top: 6px;
                    z-index: 99;
                }
                .RI_echrat{
                    width: 100%;
                    height: 100%;
                }
            }
            .chart:nth-child(3),.chart:nth-child(6){
                margin: 0 0 10px 0;
            }
        }    
    }
    .bottom{
        width: 980px;
        height: 350px;
        margin: 10px 0 0 0;
        display: flex;
        justify-content: space-between;
        h2{
            width: 100%;
            height: 44px;
            line-height: 44px;
            box-sizing: border-box;
            padding-left: 24px;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #666666;
            margin: 0;
        }
        .abnormalDataList{
            height: 330px;
            width: 720px;
            box-sizing: border-box;
            padding: 0 10px;
            background: #FFFFFF;
            border: 1px solid #E7E9ED;
            border-radius: 4px;
            margin-right: 10px;
            position: relative;
            .abnormalDataListTitle{
                background: url(../../../../static/img/early_warning.png) no-repeat left center;
            }
            table{
                width: 100%;
                height: auto;
                box-sizing: border-box;
                border-bottom: 1px solid #ccc;
                tr{
                    width: auto;
                    height: 40px;
                    border-top: 1px solid #ccc;
                    td{
                        font-family: PingFangSC-Regular;
                        font-size: 16px;
                        color: #333333;
                        text-align: center;
                        padding: 0;
                        .span{
                            color: #4A90E2;
                            cursor: pointer;
                        }
                    }
                }
                tr:nth-child(odd){
                    background: #F4F5FA;
                }
            }
            .pages{
                position: absolute;
                right: 7px;bottom:5px;
            }
        }
        .userAge{
            width: 250px;
            height: 330px;
            background: #fff;
            border: 1px solid #E7E9ED;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 0 10px;
            .UserAgeTitle{
                float: left;
                background: url(../../../../static/img/user_age.png) no-repeat left center;
            }
            #userAge{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>