export const dealData = (parn, data) => {
    if (parn === 'hiddenNumber') {
      // 用正则表达式隐藏中间四位数
      var hiddenNumber = '' + data;
      return (hiddenNumber.replace(/(\d{3})\d{4}(\d+)/, '$1XXXX$2'));
    }
  };
  export const returnData = (data) => {
    let Arr = [];
     for (let value of data) {
       let json = {};
       json = value;
       json.hiddenname = dealData('hiddenNumber', value.user_id);
       Arr.push(json);
     }
     return Arr;
  };
  export const returnData1 = (data) => {
    let Arr = [];
    for (let value of data) {
      let json = {};
      json = value;
      json.hiddenname = dealData('hiddenNumber', value.id);
      Arr.push(json);
    }
    return Arr;
  };
  export const getNavigator = () => {
    let lang = (navigator.language || navigator.browserLanguage).trim().substring(0, 2);
    if (lang === 'zh') {
      return 'zh';
    } else {
      return 'en';
    }
  };
  
  