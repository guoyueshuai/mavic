<template>
    <div class="right_table">
        <table>
            <tr>
                <td>时间</td>
                <td>测量数值</td>
                <td>程度</td>
            </tr>
            <tr v-for="item in list">
                <td>{{parseInt(item.create_date) | formatDates}}</td>
                <td>{{item.item_value}}</td>

                <td v-if="item.level == -1">过低</td>
                <td v-else-if="item.level == 0">正常</td>
                <td v-else-if="item.level == 1">过高</td>
            </tr>
        </table>
        <el-pagination
            class="data_list_pages"
            small
            @current-change = "change_pages"
            :page-size="6"
            :current-page="current_page"
            layout="total, prev, pager, next"
            :page-count="page_size">
        </el-pagination>
    </div>
</template>

<script>
import Https from '@/utils/https';
import {formatDate} from '@/components/common/date.js';
export default {
    props: ['msg'],
    data(){
        return{
            current_page:1,
            page_size:0,
            list:[]
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
        change_pages(val){
            this.current_page = val;
        },
        data_list(){
            let params = {
                "reg_id":this.current_page || 1,
                "start_pos":"6",
                "fields":"sbp",
                "user_id":this.msg
            }
            //数据列表
            Https.DatasNew(params).then(res=>{
                if(res.data.code == 10000){
                    this.page_size = res.data.data.pagesize;
                    this.list = res.data.data.list;
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
    },
    filters: {
        formatDates(time) {
            var date = new Date(time);
            return formatDate(date, 'MM/dd hh:mm:ss');
        }
    },
}
</script>

<style lang="less" scoped>
    .right_table{
        width: 320px;
        height: 320px;
        float: right;
        margin-right: 10px;
        position: relative;
        table{
            width: 100%;
            height: auto;
            border-top: 1px solid #ccc;
            tr{
                width: 100%;
                height: 40px;
                border-bottom: 1px solid #ccc;
                td{
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #333333;
                    text-align: center;
                }
            }
            tr:nth-child(odd){
                background: #F4F5FA;
            }
            tr:nth-child(even){
                background: #ffffff;
            }
        }
        .data_list_pages{
            position: absolute;
            right: 0; bottom: 0;
        }
    }
</style>