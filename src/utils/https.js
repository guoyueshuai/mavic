import axios from 'axios'
// axios 配置
axios.defaults.timeout = 10000000;
axios.defaults.baseURL = 'http://test.lohas-tech.cn/energon-new/web/test';
// axios.defaults.baseURL = location.protocol + '//' + location.hostname + '/energon-new/web';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Cookie'] = 'sid=85830024-ab5f-4c69-98f8-75ac3eaaa30f';
//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = JSON.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
//返回状态判断
axios.interceptors.response.use((res) => {
    return res;
});
export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
        .then(response => {
            resolve(response);
        }, err => {
            reject(err);
        })
        .catch((error) => {
            reject(error);
        })
    }).catch((error) => {});
}
export default {
    //用户登录
    Login(params) {
        return fetch('/research/partnerlogin', params);
    },
    //首页总数数据,用户总数,数据总数
    IndexDetail(params) {
        return fetch('/linktop/IndexDetail', params);
    },
    //首页RI
    IndexUserRI(params){
        return fetch('/linktop/IndexUserRI', params);
    },
    //首页异常数据列表
    IndexExpDatas(params){
        return fetch('/linktop/IndexExpDatas', params);
    },
    //首页年龄分布
    IndexDistribute(params){
        return fetch('/linktop/IndexDistribute', params);
    },
    //RI异常--详情
    RIDetail(params){
        return fetch('/linktop/RIDetail', params);
    },
    //问卷调查
    QuestCounts(params){
        return fetch('/linktop/QuestCounts', params);
    },
    //生理参数最近七天异常统计
    ExpCount(params){
        return fetch('/linktop/ExpCount', params);
    },
    //生理参数异常页具体异常情况
    ExpDetail(params){
        return fetch('/linktop/ExpDetail', params);
    },
    //用户列表
    UsersNew(params){
        return fetch('/linktop/UsersNew', params);
    },
    //用户信息统计--时间统计
    IndexActive(params){
        return fetch('/linktop/IndexActive', params);
    },
    //获取帐户信息
    AccountInfo(params){
        return fetch('/linktop/AccountInfo', params);
    },
    //修改账户信息
    ChangeSetting(params){
        return fetch('/linktop/ChangeSetting', params);
    },
    //反馈问题
    PushSupport(params){
        return fetch('/linktop/PushSupport', params);
    },
    //退出登录
    logout(params){
        return fetch('/logout', params);
    },
    //用户年龄、性别信息
    UserInfo(params){
        return fetch('/linktop/UserInfo', params);
    },
    //30天RI
    UserRIByDay(params){
        return fetch('/linktop/UserRIByDay', params);
    },
    //30次RI
    UserRIByCount(params){
        return fetch('/linktop/UserRIByCount', params);
    },
    //用户所有的心电波形
    WarnDataNew(params){
        return fetch('/linktop/WarnDataNew', params);
    },
    //某条ecg数据
    ecgData(params){
        return fetch('/linktop/ecgData', params);
    },
    //数据列表
    DatasNew(params){
        return fetch('/linktop/DatasNew', params);
    },
    //获取最近一条RI数据
    recentData(params){
        return fetch('/linktop/recentData', params);
    },
    //获取某用户所有护理记录
    getByType(params){
        return fetch('/nurse/getByType', params);
    },
    //保存护理记录
    save(params){
        return fetch('/nurse/save', params);
    },
    //添加标记
    u_save(params){
        return fetch('/linktop/u/save', params);
    },
    //删除标记
    delMark(params){
        return fetch('/linktop/delMark', params);
    },
}
