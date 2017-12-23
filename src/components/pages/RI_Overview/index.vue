<template>
    <div class="RI_Overview">
        <div class="RI_Overview_ctts">
            <h2 class="RI_Overview_title">
                <span>{{ $t('RI_Overview.RI_Overview') }}</span>
                <input type="text" v-model="search_ctt" class="search" :placeholder="$t('RI_Overview.search')" :style={background:searchBgcolor,border:searchBorder} @focus="search_focus" @blur="search_blur">
                <img :src="searchImgUrl" class="search_sub" @click="search_sub">
            </h2>
            <div class="chart" v-if="RI_1_show" @click="user_information(RI_1_list.user_id)">
                <div class="username">{{RI_1_list.login_name}}</div>
                <div class="usertime">{{RI_1_list.create_date | formatDate}}</div>
                <div class="RI_echrat">
                    <IEcharts :option="RI_1_options" :loading="loading"></IEcharts>
                </div>
            </div>
            <div class="chart" v-if="RI_2_show" @click="user_information(RI_2_list.user_id)">
                <div class="username">{{RI_2_list.login_name}}</div>
                <div class="usertime">{{RI_2_list.create_date | formatDate}}</div>
                <div class="RI_echrat">
                    <IEcharts :option="RI_2_options" :loading="loading"></IEcharts>
                </div>
            </div>
            <div class="chart" v-if="RI_3_show" @click="user_information(RI_3_list.user_id)">
                <div class="username">{{RI_3_list.login_name}}</div>
                <div class="usertime">{{RI_3_list.create_date | formatDate}}</div>
                <div class="RI_echrat">
                    <IEcharts :option="RI_3_options" :loading="loading"></IEcharts>
                </div>
            </div>
            <div class="chart" v-if="RI_4_show" @click="user_information(RI_4_list.user_id)">
                <div class="username">{{RI_4_list.login_name}}</div>
                <div class="usertime">{{RI_4_list.create_date | formatDate}}</div>
                <div class="RI_echrat">
                    <IEcharts :option="RI_4_options" :loading="loading"></IEcharts>
                </div>
            </div>
            <div class="chart" v-if="RI_5_show" @click="user_information(RI_5_list.user_id)">
                <div class="username">{{RI_5_list.login_name}}</div>
                <div class="usertime">{{RI_5_list.create_date | formatDate}}</div>
                <div class="RI_echrat">
                    <IEcharts :option="RI_5_options" :loading="loading"></IEcharts>
                </div>
            </div>
            <div class="chart" v-if="RI_6_show" @click="user_information(RI_6_list.user_id)">
                <div class="username">{{RI_6_list.login_name}}</div>
                <div class="usertime">{{RI_6_list.create_date | formatDate}}</div>
                <div class="RI_echrat">
                    <IEcharts :option="RI_6_options" :loading="loading"></IEcharts>
                </div>
            </div>
            <div class="chart" v-if="RI_7_show" @click="user_information(RI_7_list.user_id)">
                <div class="username">{{RI_7_list.login_name}}</div>
                <div class="usertime">{{RI_7_list.create_date | formatDate}}</div>
                <div class="RI_echrat">
                    <IEcharts :option="RI_7_options" :loading="loading"></IEcharts>
                </div>
            </div>
            <div class="chart" v-if="RI_8_show" @click="user_information(RI_8_list.user_id)">
                <div class="username">{{RI_8_list.login_name}}</div>
                <div class="usertime">{{RI_8_list.create_date | formatDate}}</div>
                <div class="RI_echrat">
                    <IEcharts :option="RI_8_options" :loading="loading"></IEcharts>
                </div>
            </div>
            <div class="chart" v-if="RI_9_show" @click="user_information(RI_9_list.user_id)">
                <div class="username">{{RI_9_list.login_name}}</div>
                <div class="usertime">{{RI_9_list.create_date | formatDate}}</div>
                <div class="RI_echrat">
                    <IEcharts :option="RI_9_options" :loading="loading"></IEcharts>
                </div>
            </div>
            <div class="chart" v-if="RI_10_show" @click="user_information(RI_10_list.user_id)">
                <div class="username">{{RI_10_list.login_name}}</div>
                <div class="usertime">{{RI_10_list.create_date | formatDate}}</div>
                <div class="RI_echrat">
                    <IEcharts :option="RI_10_options" :loading="loading"></IEcharts>
                </div>
            </div>
            <div class="chart" v-if="RI_11_show" @click="user_information(RI_11_list.user_id)">
                <div class="username">{{RI_11_list.login_name}}</div>
                <div class="usertime">{{RI_11_list.create_date | formatDate}}</div>
                <div class="RI_echrat">
                    <IEcharts :option="RI_11_options" :loading="loading"></IEcharts>
                </div>
            </div>
            <div class="chart" v-if="RI_12_show" @click="user_information(RI_12_list.user_id)">
                <div class="username">{{RI_12_list.login_name}}</div>
                <div class="usertime">{{RI_12_list.create_date | formatDate}}</div>
                <div class="RI_echrat">
                    <IEcharts :option="RI_12_options" :loading="loading"></IEcharts>
                </div>
            </div>
            <el-pagination
                class="pages"
                @current-change = "change_pages"
                :page-size="12"
                :current-page="current_page"
                layout="total, prev, pager, next"
                :page-count="page_size">
            </el-pagination>
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
    data(){
        return{
            searchImgUrl:"static/img/search.png",
            searchBgcolor:'#fafafa',
            searchBorder:'1px solid #ddd',
            loading:false,
            RI_1:"",
            RI_1_list:"",
            RI_1_show:false,
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
            RI_2_show:false,
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
            RI_3_show:false,
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
            RI_4_show:false,
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
            RI_5_show:false,
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
            RI_6_show:false,
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
            RI_7:"",
            RI_7_list:"",
            RI_7_show:false,
            RI_7_options:{
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
            RI_8:"",
            RI_8_list:"",
            RI_8_show:false,
            RI_8_options:{
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
            RI_9:"",
            RI_9_list:"",
            RI_9_show:false,
            RI_9_options:{
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
            RI_10:"",
            RI_10_list:"",
            RI_10_show:false,
            RI_10_options:{
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
            RI_11:"",
            RI_11_list:"",
            RI_11_show:false,
            RI_11_options:{
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
            RI_12:"",
            RI_12_list:"",
            RI_12_show:false,
            RI_12_options:{
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
            search_ctt:"",
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
        search_focus(){
            this.searchImgUrl = 'static/img/search_active.png'
            this.searchBgcolor = '#fff'
            this.searchBorder = '1px solid #bbb'
        },
        search_blur(){
            this.searchImgUrl = 'static/img/search.png'
            this.searchBgcolor = '#fafafa',
            this.searchBorder = '1px solid #ddd'
        },
        user_information(id){
            this.$router.push({path: 'RI_Overview/user_information', query: {"id":id}})
        },
        change_pages(val){
            this.current_page = val;
        },
        search_sub(){
            this.dataList();
        },
        async dataList(){
            let RI_datas={
                "reg_id":this.current_page || 1,
                "start_pos":"12",
                "display_name":this.search_ctt
            }
            Https.IndexUserRI(RI_datas).then(res=>{
                if(res.data.code == 10000){
                    this.RI_1_show = false;
                    this.RI_2_show = false;
                    this.RI_3_show = false;
                    this.RI_4_show = false;
                    this.RI_5_show = false;
                    this.RI_6_show = false;
                    this.RI_7_show = false;
                    this.RI_8_show = false;
                    this.RI_9_show = false;
                    this.RI_10_show = false;
                    this.RI_11_show = false;
                    this.RI_12_show = false;
                    this.page_size = res.data.data.pageSize;
                    if(res.data.data.dataList[0]){
                        this.RI_1_show = true;
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
                    }

                    if(res.data.data.dataList[1]){
                        this.RI_2_show = true;
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
                    }

                    if(res.data.data.dataList[2]){
                        this.RI_3_show = true;
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
                    }

                    if(res.data.data.dataList[3]){
                        this.RI_4_show = true;
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
                    }

                    if(res.data.data.dataList[4]){
                        this.RI_5_show = true;
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
                    }

                    if(res.data.data.dataList[5]){
                        this.RI_6_show = true;
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
                    }

                    if(res.data.data.dataList[6]){
                        this.RI_7_show = true;
                        this.RI_7 = res.data.data.dataList[6];
                        this.RI_7_list = this.RI_7[0];
                        let msg7 =this.RI_7.map(item=>({
                            RI:item.ri
                        }));
                        if(msg7[0].RI <= 40){
                            this.RI_7_options.backgroundColor = "#E5BFCC"
                        }else if(msg7[0].RI >= 65){
                            this.RI_7_options.backgroundColor = "#A9CCED"
                        }else{
                            this.RI_7_options.backgroundColor = "#EDE1B8"
                        }
                        this.RI_7_options.series[0].data = msg7.map(item=>item.RI).reverse();
                    }

                    if(res.data.data.dataList[7]){
                        this.RI_8_show = true;
                        this.RI_8 = res.data.data.dataList[7];
                        this.RI_8_list = this.RI_8[0];
                        let msg8 =this.RI_8.map(item=>({
                            RI:item.ri
                        }));
                        if(msg8[0].RI <= 40){
                            this.RI_8_options.backgroundColor = "#E5BFCC"
                        }else if(msg8[0].RI >= 65){
                            this.RI_8_options.backgroundColor = "#A9CCED"
                        }else{
                            this.RI_8_options.backgroundColor = "#EDE1B8"
                        }
                        this.RI_8_options.series[0].data = msg8.map(item=>item.RI).reverse();
                    }

                    if(res.data.data.dataList[8]){
                        this.RI_9_show = true;
                        this.RI_9 = res.data.data.dataList[8];
                        this.RI_9_list = this.RI_9[0];
                        let msg9 =this.RI_9.map(item=>({
                            RI:item.ri
                        }));
                        if(msg9[0].RI <= 40){
                            this.RI_9_options.backgroundColor = "#E5BFCC"
                        }else if(msg9[0].RI >= 65){
                            this.RI_9_options.backgroundColor = "#A9CCED"
                        }else{
                            this.RI_9_options.backgroundColor = "#EDE1B8"
                        }
                        this.RI_9_options.series[0].data = msg9.map(item=>item.RI).reverse();
                    }

                    if(res.data.data.dataList[9]){
                        this.RI_10_show = true;
                        this.RI_10 = res.data.data.dataList[9];
                        this.RI_10_list = this.RI_10[0];
                        let msg10 =this.RI_10.map(item=>({
                            RI:item.ri
                        }));
                        if(msg10[0].RI <= 40){
                            this.RI_10_options.backgroundColor = "#E5BFCC"
                        }else if(msg10[0].RI >= 65){
                            this.RI_10_options.backgroundColor = "#A9CCED"
                        }else{
                            this.RI_10_options.backgroundColor = "#EDE1B8"
                        }
                        this.RI_10_options.series[0].data = msg10.map(item=>item.RI).reverse();
                    }

                    if(res.data.data.dataList[10]){
                        this.RI_11_show = true;
                        this.RI_11 = res.data.data.dataList[10];
                        this.RI_11_list = this.RI_11[0];
                        let msg11 =this.RI_11.map(item=>({
                            RI:item.ri
                        }));
                        if(msg11[0].RI <= 40){
                            this.RI_11_options.backgroundColor = "#E5BFCC"
                        }else if(msg11[0].RI >= 65){
                            this.RI_11_options.backgroundColor = "#A9CCED"
                        }else{
                            this.RI_11_options.backgroundColor = "#EDE1B8"
                        }
                        this.RI_11_options.series[0].data = msg11.map(item=>item.RI).reverse();
                    }

                    if(res.data.data.dataList[11]){
                        this.RI_12_show = true;
                        this.RI_12 = res.data.data.dataList[11];
                        this.RI_12_list = this.RI_12[0];
                        let msg12 =this.RI_12.map(item=>({
                            RI:item.ri
                        }));
                        if(msg12[0].RI <= 40){
                            this.RI_12_options.backgroundColor = "#E5BFCC"
                        }else if(msg11[0].RI >= 65){
                            this.RI_12_options.backgroundColor = "#A9CCED"
                        }else{
                            this.RI_12_options.backgroundColor = "#EDE1B8"
                        }
                        this.RI_12_options.series[0].data = msg12.map(item=>item.RI).reverse();
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
        this.dataList()
    },
    components: {
        IEcharts
    }
}
</script>

<style lang="less" scoped>
.RI_Overview{
    width: 1250px;
    height: 100%;
    padding: 100px 0 0 240px;
    box-sizing: border-box;
    margin: 0 auto;
    overflow: auto;
    font-family: PingFangSC-Medium;
    .RI_Overview_ctts{
        width: 980px;
        height: 870px;
        background: #FFFFFF;
        border: 1px solid #E7E9ED;
        border-radius: 4px;
        margin-bottom: 11px;
        box-sizing: border-box;
        padding: 0 20px;
        position: relative;
        .RI_Overview_title{
            height: 32px;
            width: 100%;
            margin-top: 10px;
            margin-bottom: 20px;
            background: url(../../../../static/img/RI.png) no-repeat left center;
            line-height: 32px;
            position: relative;
            span{
                font-size: 16px;
                color: #666666;
                padding-left: 30px;
            }
            .search{
                width: 640px;
                height: 32px;
                box-sizing: border-box;
                background: #FAFAFA;
                border: 1px solid #DDDDDD;
                border-radius: 2px;
                float: right;
                padding:0 32px 0 20px;
                font-size: 16px;
                color: #BBBBBB;
                line-height: 30px;
                outline: none;
            }
            .search_sub{
                position: absolute;
                right: 8px; top: 9px;
                cursor: pointer;
            }
        }
        .chart{
            width: 300px;
            height: 180px;
            float: left;
            margin: 0 0 10px 10px;
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
        .pages{
            position: absolute;
            right: 15px;
            bottom: 15px;
        }
    }
}
</style>


