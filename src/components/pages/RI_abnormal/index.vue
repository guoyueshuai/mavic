<template>
  <div class="RI_abnormal">
        <div class="RI_details">
            <h2 class="RI_details_title">{{ $t('RI_Exception_list.RI_details') }}</h2>
            <div class="RI_details_echrat">
                <IEcharts :option="RI_details_option" :loading="loading"></IEcharts>
            </div>
        </div>
        <div class="Questionnaire_proportion">
            <h2 class="Questionnaire_proportion_title">
                <div class="Proportion">{{ $t('RI_Exception_list.Abnormal_proportion_of_questionnaires') }}</div>
                <div class="Questionnaire_img">
                    <img src="static/img/Questionnaire.png">
                    <div class="wenjuan">
                         <p>1、{{ $t('RI_Exception_list.questionnaires1') }}</p>
                         <p>2、{{ $t('RI_Exception_list.questionnaires2') }}</p>
                         <p>3、{{ $t('RI_Exception_list.questionnaires3') }}</p>
                         <p>4、{{ $t('RI_Exception_list.questionnaires4') }}</p>
                         <p>5、{{ $t('RI_Exception_list.questionnaires5') }}</p>
                         <p>6、{{ $t('RI_Exception_list.questionnaires6') }}</p>
                         <p>7、{{ $t('RI_Exception_list.questionnaires7') }}</p>
                         <p>8、{{ $t('RI_Exception_list.questionnaires8') }}</p>
                         <p>9、{{ $t('RI_Exception_list.questionnaires9') }}</p>
                         <p>10、{{ $t('RI_Exception_list.questionnaires10') }}</p>
                         <p>11、{{ $t('RI_Exception_list.questionnaires11') }}</p>
                         <p>12、{{ $t('RI_Exception_list.questionnaires12') }}</p>
                         <p>13、{{ $t('RI_Exception_list.questionnaires13') }}</p>
                         <p>14、{{ $t('RI_Exception_list.questionnaires14') }}</p>
                    </div>
                </div>
                <div class="Questionnaire_download"><a href="http://www.lohas-tech.cn/doc/word/Rothman Index评估问题.docx">{{ $t('RI_Exception_list.Downloading_of_questionnaires') }}</a></div>
            </h2>
            <ul class="Questionnaire_proportion_name">
                <li>{{ $t('RI_Exception_list.quest1') }}</li>
                <li>{{ $t('RI_Exception_list.quest2') }}</li>
                <li>{{ $t('RI_Exception_list.quest3') }}</li>
                <li>{{ $t('RI_Exception_list.quest4') }}</li>
                <li>{{ $t('RI_Exception_list.quest5') }}</li>
                <li>{{ $t('RI_Exception_list.quest6') }}</li>
                <li>{{ $t('RI_Exception_list.quest7') }}</li>
                <li>{{ $t('RI_Exception_list.quest8') }}</li>
                <li>{{ $t('RI_Exception_list.quest9') }}</li>
                <li>{{ $t('RI_Exception_list.quest10') }}</li>
                <li>{{ $t('RI_Exception_list.quest11') }}</li>
                <li>{{ $t('RI_Exception_list.quest12') }}</li>
                <li>{{ $t('RI_Exception_list.quest13') }}</li>
                <li>{{ $t('RI_Exception_list.quest14') }}</li>
            </ul>
            <ul class="Questionnaire_proportion_value">
                <li v-for="item in Questionnaire_proportion">
                    <span :style="{width:item+'%'}"></span>
                </li>
            </ul>
        </div>
        <div class="RI_abnormal_user">
            <h2 class="RI_title">{{ $t('RI_Exception_list.RI_Abnormal_user') }}<span @click="see_all_RI">{{ $t('RI_Exception_list.view_list') }}</span></h2>
            <div class="charts">
                <div class="chart" @click="user_information(RI_1_list.user_id)">
                    <div class="username">{{RI_1_list.login_name}}</div>
                    <div class="usertime">{{RI_1_list.create_date | formatDate}}</div>
                    <div class="RI_echrat">
                        <IEcharts :option="RI_1_option" :loading="loading"></IEcharts>
                    </div>
                </div>
                <div class="chart" @click="user_information(RI_2_list.user_id)">
                    <div class="username">{{RI_2_list.login_name}}</div>
                    <div class="usertime">{{RI_2_list.create_date | formatDate}}</div>
                    <div class="RI_echrat">
                        <IEcharts :option="RI_2_option" :loading="loading"></IEcharts>
                    </div>
                </div>
                <div class="chart" @click="user_information(RI_3_list.user_id)">
                    <div class="username">{{RI_3_list.login_name}}</div>
                    <div class="usertime">{{RI_3_list.create_date | formatDate}}</div>
                    <div class="RI_echrat">
                        <IEcharts :option="RI_3_option" :loading="loading"></IEcharts>
                    </div>
                </div>
                <div class="chart" @click="user_information(RI_4_list.user_id)">
                    <div class="username">{{RI_4_list.login_name}}</div>
                    <div class="usertime">{{RI_4_list.create_date | formatDate}}</div>
                    <div class="RI_echrat">
                        <IEcharts :option="RI_4_option" :loading="loading"></IEcharts>
                    </div>
                </div>
                <div class="chart" @click="user_information(RI_5_list.user_id)">
                    <div class="username">{{RI_5_list.login_name}}</div>
                    <div class="usertime">{{RI_5_list.create_date | formatDate}}</div>
                    <div class="RI_echrat">
                        <IEcharts :option="RI_5_option" :loading="loading"></IEcharts>
                    </div>
                </div>
                <div class="chart" @click="user_information(RI_6_list.user_id)">
                    <div class="username">{{RI_6_list.login_name}}</div>
                    <div class="usertime">{{RI_6_list.create_date | formatDate}}</div>
                    <div class="RI_echrat">
                        <IEcharts :option="RI_6_option" :loading="loading"></IEcharts>
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
            RI_details_option:{
                tooltip : {
                    trigger: 'axis',
                    formatter: "{c}%",
                    axisPointer : {
                        type : 'shadow' 
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    data: ['1-5', '6-10', '11-15', '16-20', '21-25', '26-30', '31-35', '36-40', '41-45', '46-50', '51-55', '56-60', '61-65', '66-70', '71-75', '76-80', '81-85', '86-90', '91-95', '96-100'],
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        },
                        fontSize:12,
                        interval:0
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        },
                        formatter: '{value} %'
                    }
                },
                series: {
                    barWidth: '40%',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: "#509CF8"
                        }
                    },
                    data: []
                }
            },
            Questionnaire_proportion:[],
            RI_1:"",
            RI_1_list:"",
            RI_1_option:{
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
                xAxis: {
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
                },
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
                series: {
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
                }
            },
            RI_2:"",
            RI_2_list:"",
            RI_2_option:{
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
                xAxis: {
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
                },
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
                series: {
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
                }
            },
            RI_3:"",
            RI_3_list:"",
            RI_3_option:{
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
                xAxis: {
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
                },
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
                series: {
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
                }
            },
            RI_4:"",
            RI_4_list:"",
            RI_4_option:{
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
                xAxis: {
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
                },
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
                series: {
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
                }
            },
            RI_5:"",
            RI_5_list:"",
            RI_5_option:{
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
                xAxis: {
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
                },
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
                series: {
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
                }
            },
            RI_6:"",
            RI_6_list:"",
            RI_6_option:{
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
                xAxis: {
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
                },
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
                series: {
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
                }
            }
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'MM/dd hh:mm');
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
        user_information(id){
            this.$router.push({ path: 'RI_abnormal/user_information', query: {"id":id} })
        },
        see_all_RI(){
            this.$router.push({ path: 'user_list' })
        },
        async data_list(){
            Https.RIDetail({}).then(res=>{
                if(res.data.code == 10000){
                    let msg = res.data.data.map(item=>({
                        pos:item.pos,
                        val:item.count
                    }));
                    this.RI_details_option.series.data = msg.map(item=> (item.val*100).toFixed(2))
                    
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            Https.QuestCounts({}).then(res=>{
                if(res.data.code == 10000){
                    let msg = res.data.data.map(item=>({
                        pos:item.pos,
                        val:item.count
                    }));
                    this.Questionnaire_proportion = msg.map(item=> item.val*100);
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
            let RI_datas={
                "reg_id":"0",
                "start_pos":"6",
                "fields":"exp"
            }
            Https.IndexUserRI(RI_datas).then(res=>{
                if(res.data.code == 10000){
                    this.RI_1 = res.data.data.dataList[0];
                    this.RI_1_list = this.RI_1[0];
                    let msg1 =this.RI_1.map(item=>({
                        RI:item.ri
                    }));
                    if(msg1[0].RI <= 40){
                        this.RI_1_option.backgroundColor = "#E5BFCC"
                    }else if(msg1[0].RI >= 65){
                        this.RI_1_option.backgroundColor = "#A9CCED"
                    }else{
                        this.RI_1_option.backgroundColor = "#EDE1B8"
                    }
                    this.RI_1_option.series.data = msg1.map(item=>item.RI).reverse();

                    this.RI_2 = res.data.data.dataList[1];
                    this.RI_2_list = this.RI_2[0];
                    let msg2 =this.RI_2.map(item=>({
                        RI:item.ri
                    }));
                    if(msg2[0].RI <= 40){
                        this.RI_2_option.backgroundColor = "#E5BFCC"
                    }else if(msg2[0].RI >= 65){
                        this.RI_2_option.backgroundColor = "#A9CCED"
                    }else{
                        this.RI_2_option.backgroundColor = "#EDE1B8"
                    }
                    this.RI_2_option.series.data = msg2.map(item=>item.RI).reverse();

                    this.RI_3 = res.data.data.dataList[2];
                    this.RI_3_list = this.RI_3[0];
                    let msg3 =this.RI_3.map(item=>({
                        RI:item.ri
                    }));
                    if(msg3[0].RI <= 40){
                        this.RI_3_option.backgroundColor = "#E5BFCC"
                    }else if(msg3[0].RI >= 65){
                        this.RI_3_option.backgroundColor = "#A9CCED"
                    }else{
                        this.RI_3_option.backgroundColor = "#EDE1B8"
                    }
                    this.RI_3_option.series.data = msg3.map(item=>item.RI).reverse();

                    this.RI_4 = res.data.data.dataList[3];
                    this.RI_4_list = this.RI_4[0];
                    let msg4 =this.RI_4.map(item=>({
                        RI:item.ri
                    }));
                    if(msg4[0].RI <= 40){
                        this.RI_4_option.backgroundColor = "#E5BFCC"
                    }else if(msg4[0].RI >= 65){
                        this.RI_4_option.backgroundColor = "#A9CCED"
                    }else{
                        this.RI_4_option.backgroundColor = "#EDE1B8"
                    }
                    this.RI_4_option.series.data = msg4.map(item=>item.RI).reverse();

                    this.RI_5 = res.data.data.dataList[4];
                    this.RI_5_list = this.RI_5[0];
                    let msg5 =this.RI_5.map(item=>({
                        RI:item.ri
                    }));
                    if(msg5[0].RI <= 40){
                        this.RI_5_option.backgroundColor = "#E5BFCC"
                    }else if(msg5[0].RI >= 65){
                        this.RI_5_option.backgroundColor = "#A9CCED"
                    }else{
                        this.RI_5_option.backgroundColor = "#EDE1B8"
                    }
                    this.RI_5_option.series.data = msg5.map(item=>item.RI).reverse();

                    this.RI_6 = res.data.data.dataList[5];
                    this.RI_6_list = this.RI_6[0];
                    let msg6 =this.RI_6.map(item=>({
                        RI:item.ri
                    }));
                    if(msg6[0].RI <= 40){
                        this.RI_6_option.backgroundColor = "#E5BFCC"
                    }else if(msg6[0].RI >= 65){
                        this.RI_6_option.backgroundColor = "#A9CCED"
                    }else{
                        this.RI_6_option.backgroundColor = "#EDE1B8"
                    }
                    this.RI_6_option.series.data = msg6.map(item=>item.RI).reverse();
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
    .RI_abnormal{
        width: 1250px;
        height: auto;
        box-sizing: border-box;
        padding: 100px 0 0 240px;
        margin: 0 auto;
        overflow: auto;
        .RI_details{
            width: 980px;
            height: 280px;
            box-sizing: border-box;
            background: #FFFFFF;
            border: 1px solid #E7E9ED;
            border-radius: 4px;
            position: relative;
            margin-bottom: 10px;
            .RI_details_title{
                width: 100%;
                height: 25px;
                line-height: 25px;
                margin-top: 10px;
                font-family: PingFangSC-Medium;
                font-size: 18px;
                color: #666666;
                box-sizing: border-box;
                padding-left: 40px;
                background: url(../../../../static/img/RI.png) no-repeat 10px center;
                position: absolute;
                left:0; top: 0;
                z-index: 22;
            }
            .RI_details_echrat{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0; top: 0;
            }
        }
        .Questionnaire_proportion{
            width: 300px;
            height: 630px;
            background: #FFFFFF;
            border: 1px solid #E7E9ED;
            border-radius: 4px;
            margin-bottom: 20px;
            float: left;
            .Questionnaire_proportion_title{
                height: 22px;
                width: 100%;
                box-sizing: border-box;
                background: url(../../../../static/img/Questionnaire_proportion.png) no-repeat 10px center;
                line-height: 22px;
                margin-top: 10px;
                margin-bottom: 18px;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                .Proportion{
                    float: left;
                    margin-left: 40px;
                    color: #666666;
                }
                .Questionnaire_img{
                    float: left;
                    width: 12px;
                    height: 12px;
                    margin-left: 10px;
                    margin-top: 5px;
                    cursor: pointer;
                    position: relative;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                    .wenjuan{
                        position: absolute;
                        left: 20px; top: -5px;
                        width: 300px;
                        height: auto;
                        z-index: 999;
                        background: rgba(0, 0, 0, 0.8);
                        font-family: PingFangSC-Medium;
                        font-size: 12px;
                        color: #fff;
                        padding: 10px 20px;
                        border-radius: 10px;
                        display: none;
                        p{
                            text-indent: 2em;
                        }
                    }
                    &:hover{
                        .wenjuan{
                            display: block;
                        }
                    }
                }
                .Questionnaire_download{
                    float: right;
                    margin-right: 10px;
                    cursor: pointer;
                    a{
                        color:#4A90E2;
                        text-decoration: none;
                    }
                }
            }
            .Questionnaire_proportion_name{
                width: 128px;
                height: auto;
                box-sizing: border-box;
                padding-left: 30px;
                overflow: hidden;
                float: left;
                li{
                    width: 100%;
                    height: 16px;
                    line-height: 16px;
                    font-size: 14px;
                    margin-bottom: 25.5px;
                }
            }
            .Questionnaire_proportion_value{
                width: 140px;
                height: auto;
                box-sizing: border-box;
                overflow: hidden;
                float: left;
                li{
                    width: 100%;
                    height: 16px;
                    background: #F7F7F7;
                    border: 1px solid #CCCCCC;
                    box-sizing: border-box;
                    margin-bottom: 25.5px;
                    span{
                        display: block;
                        height: 100%;
                        width: 20%;
                        background: #F5A623;
                    }
                }
            }
        }
        .RI_abnormal_user{
            width: 666px;
            height: 632px;
            background: #fff;
            box-sizing: border-box;
            border-radius: 4px;
            border: 1px solid #E7E9ED;
            margin-bottom: 20px;
            margin-left: 12px;
            float: left;
            .RI_title{
                width: 100%;
                height: 22px;
                line-height: 22px;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #666666;
                background: url(../../../../static/img/RI.png) no-repeat 10px center;
                box-sizing: border-box;
                padding-left: 40px;
                margin-top: 10px;
                margin-bottom: 0px;
                span{
                    float: right;
                    margin: 0 10px 0 0;
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
                height: 580px;
                box-sizing: border-box;
                margin-top: 18px;
                padding: 0 29px;
                .chart{
                    width: 298px;
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
                .chart:nth-child(2n){
                    margin: 0 0 10px 0;
                }
            }    
        }

    }
</style>

