const moment = require('moment');
moment.locale('zh-cn');
exports.fromNow = function(time){
    return moment(new Date(time)).fromNow();
}