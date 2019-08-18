// 创建时间对象
var date = new Date();

var Time = {
    // 获取当前时间戳
    getUnix: function (){
        return date.getTime();
    },

    // 获取今天凌晨时间戳
    getTodayUnix: function (){
        date.setHours(0);
        date.setMinutes(0);
        date.setMinutes(0);
        date.setMilliseconds(0);
        return date.getTime();
    },

    // 获取今年1月1日0点0分的时间戳
    getYearUnix: function (){
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setMinutes(0);
        date.setMilliseconds(0);
        return date.getTime();
    },

    // 获取标准年月日
    getLastDate: function (){
        var month = (date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth());
        var day = date.getDate() ? ('0' + date.getDate()) : (date.getDate());
        return date.getFullYear() + '-' + month + '-' + day;
    },

    // 按照需求，友好转化时间格式
    getFormatTime: function (timestamp){
        // 获取当前时间戳
        var now = this.getUnix();
        // 获取今天凌晨时间戳
        var today = this.getTodayUnix();
        // 获取今年0点时间戳
        var year = this.getYearUnix();

        // 求差
        var timer = (now - timestamp) / 1000;
        
        // 初始化前台页面展示字符串
        var tip = '';

        if(timer <= 0){
            // 刚刚
            tip = '刚刚';

        }else if(Math.floor(timer / 60) <=0){
            // 一分钟以内===>也代表刚刚
            tip = '刚刚';
        }else if(timer < 60*60){
            // 一分钟到一小时以内===>几分钟前
            tip = Math.floor(timer / 60) + '分钟前';
        }else if(timer >= 3600 && (timestamp - today >= 0) ){
            // 一小时到一天内===>几小时前
            tip = Math.floor(timer / 3600) + '小时前';
        }else if(timer / 24*3600 <= 31){
            // 一天到一个月(31天)之间===>几天前
            tip = Math.ceil(timer / 24*3600) + '天前';
        }else{
            tip = this.getLastDate(timestamp);
        }
        return tip;
    }
};

// 注册自定义命令
Vue.directive('time', {
    // 
    bind: function (el, binding, vnode){
        el.innerHTML = Time.getFormatTime(binding.value);
        el.__timeout__ = setInterval(function(){
            el.innerHTML = Time.getFormatTime(binding.value);
        }, 60000);
    },
    
    unbind: function (el, binding, vnode){
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
});