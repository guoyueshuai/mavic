<template>
    <div class="user_list">
        <div class="btns">
            <div class="user_search">
                <span>{{ $t('user_list.user_list') }}</span>
                <input type="text" v-model="search_ctt" class="search" :placeholder="$t('user_list.search')" :style={background:searchBgcolor,border:searchBorder} @focus="search_focus" @blur="search_blur">
                <img :src="searchImgUrl" class="search_sub" @click="search_sub">
            </div>
            <div class="user_btns">
                <ul>
                    <span>{{ $t('user_list.Screening_conditions') }}</span>
                    <li :class="{li_active:sbp}" @click="sbp_click">{{ $t('user_list.sbp') }}</li>
                    <li :class="{li_active:temp}" @click="temp_click">{{ $t('user_list.temp') }}</li>
                    <li :class="{li_active:hr}" @click="hr_click">{{ $t('user_list.hr') }}</li>
                    <li :class="{li_active:spo2h}" @click="spo2h_click">{{ $t('user_list.spo2h') }}</li>
                    <li :class="{li_active:RI}" @click="RI_click">{{ $t('user_list.RI') }}</li>
                    <li :class="{li_active:afib}" @click="afib_click">{{ $t('user_list.afib') }}</li>
                    <li :class="{li_active:wenjuan}" @click="wenjuan_click">{{ $t('user_list.wenjuan') }}</li>
                </ul>
            </div>
        </div>

        <div class="ctts">
            <div class="select">
                <span>{{ $t('user_list.time') }}</span>
                <select class="times" v-model="select_value" @change="select">
                    <option value=" " selected>{{ $t('user_list.whole') }}</option>
                    <option value="24">{{ $t('user_list.day') }}</option>
                    <option value="168">{{ $t('user_list.week') }}</option>
                    <option value="720">{{ $t('user_list.month') }}</option>
                </select>
            </div>
            <table>
                <tr>
                    <td>{{ $t('user_list.Account_number') }}</td>
                    <td>{{ $t('user_list.username') }}</td>
                    <td>{{ $t('user_list.age') }}</td>
                    <td>{{ $t('user_list.RI_1') }}</td>
                    <td>{{ $t('user_list.sbp_1') }}</td>
                    <td>{{ $t('user_list.hr_1') }}</td>
                    <td>{{ $t('user_list.spo2h_1') }}</td>
                    <td>{{ $t('user_list.temp_1') }}</td>
                    <td>{{ $t('user_list.afib_1') }}</td>
                    <td></td>
                </tr>
                <tr v-for="item in abnormalDataList">
                    <td :title="item.login_name">{{item.login_name | replace}}</td>

                    <td>{{item.name?item.name:$t('user_list.Unfilled')}}</td>

                    <td>{{item.age?item.age:$t('user_list.Unfilled')}}</td>

                    <td v-if="item.ri == 0">{{ $t('user_list.Non_existent') }}</td>
                    <td v-else>{{ $t('user_list.existent') }}</td>

                    <td>{{parseInt(item.sbp*100) | fixed}}</td>

                    <td>{{item.hr*100 | fixed}}</td>

                    <td>{{item.spo2h*100 | fixed}}</td>

                    <td>{{item.temp*100 | fixed}}</td>

                    <td v-if="item.afib == 0">{{ $t('user_list.Non_existent') }}</td>
                    <td v-else>{{ $t('user_list.existent') }}</td>

                    <td><span @click="user_details(item.user_id)">{{ $t('user_list.View_the_details') }}</span></td>
                </tr>
            </table>
            <el-pagination
                @current-change = "change_pages"
                :page-size="16"
                :current-page="current_page"
                :page-count="page_size"
                layout="total, prev, pager, next"
                class="pages">
            </el-pagination>
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
            searchImgUrl:"static/img/search.png",
            searchBgcolor:'#fafafa',
            searchBorder:'1px solid #ddd',
            
            sbp:false,
            temp:false,
            hr:false,
            spo2h:false,
            RI:false,
            afib:false,
            wenjuan:false,

            search_ctt:"",
            current_page:1,
            page_size:0,
            abnormalDataList:[],
            select_value:" ",
            fields:""
        }
    },
    watch:{
        current_page(){
            this.load_list()
        }
    },
    filters: {
        fixed(val) {
            return val.toFixed(2)+"%"
        },
        replace(val){
            if(val.indexOf("@") != -1){
                var reg = /(.{3}).+(@.+)/;
                val = val.replace(reg,"$1****$2")
            }
            return val
        }
    },
    mounted(){
        this.load_list()
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
        search_sub(){
            this.load_list()
        },
        user_details(id){
            this.$router.push({ path: 'user_list/user_information', query: {"id":id} })
        },
        change_pages(val){
            this.current_page = val;
        },
        select(){
            this.load_list()
        },
        load_list(){
            let params = {
                "reg_id":this.current_page || 1,
                "start_pos":16,
                "fields":this.fields,
                "time_fields":this.select_value,
                "display_name":this.search_ctt
            }
            Https.UsersNew(params).then(res=>{
                if(res.data.code == 10000){
                    this.page_size = res.data.data.pagesize;
                    this.abnormalDataList = res.data.data.users;
                }else{
                    this.login_out("登录超时，请重新登录！","提示","确定")
                }
            }).catch(error=>{
                console.log("网络错误")
            })
        },
        sbp_click(){
            if(this.sbp == false){
                this.sbp = true;
                let fields = this.fields.split(",");
                fields.push("sbp")
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "" || typeof(fields[i]) == "undefined")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }  
                this.fields = fields.join(",");
                this.load_list()
            }else{
                this.sbp = false;
                let fields = this.fields.split(",");
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "sbp")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }
                this.fields = fields.join(",");
                this.load_list()
            }
        },
        temp_click(){
            if(this.temp == false){
                this.temp = true;
                let fields = this.fields.split(",");
                fields.push("temp")
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "" || typeof(fields[i]) == "undefined")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }  
                this.fields = fields.join(",");
                this.load_list()
            }else{
                this.temp = false;
                let fields = this.fields.split(",");
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "temp")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }
                this.fields = fields.join(",");
                this.load_list()
            }
        },
        hr_click(){
            if(this.hr == false){
                this.hr = true;
                let fields = this.fields.split(",");
                fields.push("hr")
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "" || typeof(fields[i]) == "undefined")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }  
                this.fields = fields.join(",");
                this.load_list()
            }else{
                this.hr = false;
                let fields = this.fields.split(",");
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "hr")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }
                this.fields = fields.join(",");
                this.load_list()
            }
        },
        spo2h_click(){
            if(this.spo2h == false){
                this.spo2h = true;
                let fields = this.fields.split(",");
                fields.push("spo2h")
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "" || typeof(fields[i]) == "undefined")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }  
                this.fields = fields.join(",");
                this.load_list()
            }else{
                this.spo2h = false;
                let fields = this.fields.split(",");
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "spo2h")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }
                this.fields = fields.join(",");
                this.load_list()
            }
        },
        RI_click(){
            if(this.RI == false){
                this.RI = true;
                let fields = this.fields.split(",");
                fields.push("ri")
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "" || typeof(fields[i]) == "undefined")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }  
                this.fields = fields.join(",");
                this.load_list()
            }else{
                this.RI = false;
                let fields = this.fields.split(",");
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "ri")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }
                this.fields = fields.join(",");
                this.load_list()
            }
        },
        afib_click(){
            if(this.afib == false){
                this.afib = true;
                let fields = this.fields.split(",");
                fields.push("afib")
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "" || typeof(fields[i]) == "undefined")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }  
                this.fields = fields.join(",");
                this.load_list()
            }else{
                this.afib = false;
                let fields = this.fields.split(",");
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "afib")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }
                this.fields = fields.join(",");
                this.load_list()
            }
        },
        wenjuan_click(){
            if(this.wenjuan == false){
                this.wenjuan = true;
                let fields = this.fields.split(",");
                fields.push("quest")
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "" || typeof(fields[i]) == "undefined")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }  
                this.fields = fields.join(",");
                this.load_list()
            }else{
                this.wenjuan = false;
                let fields = this.fields.split(",");
                for(var i = 0 ;i<fields.length;i++){  
                    if(fields[i] == "quest")  {  
                        fields.splice(i,1);  
                        i= i-1;  
                    }  
                }
                this.fields = fields.join(",");
                this.load_list()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.user_list{
    width: 1250px;
    height: 100%;
    padding: 100px 0 0 240px;
    box-sizing: border-box;
    overflow: auto;
    margin: 0 auto;
    font-family: PingFangSC-Regular;
    .btns{
        width: 980px;
        height: 100px;
        box-sizing: border-box;
        background: #FFFFFF;
        border: 1px solid #E7E9ED;
        border-radius: 4px;
        padding: 0 20px;
        .user_search{
            width: 100%;
            height: 32px;
            margin-top: 10px;
            position: relative;
            span{
                display: block;
                height: 22px;
                line-height: 22px;
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #666666;
                padding-left: 30px;
                background: url(../../../../static/img/user_list.png) no-repeat left center;
                float: left;margin-top: 5px;
            }
            .search{
                width: 640px;
                height: 32px;
                box-sizing: border-box;
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
        .user_btns{
            widows: 100%;
            height: 24px;
            line-height: 24px;
            box-sizing: border-box;
            padding-left: 30px;
            margin-top: 21px;
            span{
                font-size: 14px;
                color: #999999;
                float: left;
            }
            ul{
                float: left;
                li{
                    float: left;
                    width: 80px;
                    height: 24px;
                    text-align: center;
                    margin-left: 10px;
                    line-height: 22px;
                    background: #FAFAFA;
                    border: 1px solid #DDDDDD;
                    border-radius: 100px;
                    box-sizing: border-box;
                    font-size: 14px;
                    color: #333333;
                    cursor: pointer;
                }
                .li_active{
                    color:#F5A623;
                    border: 1px solid #F5A623;
                }
            }
        }
        
    }
    .ctts{
        width: 980px;
        height: 760px;
        background: #FFFFFF;
        border: 1px solid #E7E9ED;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 20px 20px 0 20px;
        margin-top: 10px;
        margin-bottom: 13px;
        position: relative;
        .select{
            height: 24px;
            line-height: 24px;
            position: absolute;
            right: 20px; top: -48px;
            span{
                font-size: 14px;
                color: #999999;
                float: left;
            }
            .times{
                width: 110px;
                height: 22px;
                margin-left: 10px;
                box-sizing: border-box;
                outline: none;
                float: right; margin-top: 1px; 
                option{
                    width: 100%;
                    height: 20px;
                    box-sizing: border-box;
                    padding: 0 10px;
                    font-size: 14px;
                    color: #333333;
                }
            }
        }
        table{
            border-top: 1px solid #ccc;
            width: 100%;
            text-align: center;
            tr{
                height: 40px;
                border-bottom: 1px solid #ccc;
                td{
                    font-size: 14px;
                    color: #333333;
                    span{
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
            right: 10px; bottom: 15px;
        }
    }
}
</style>


