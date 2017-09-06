/**
 * Created by lianx on 2017/4/7.
 */

require('./static/css/style.css');
require('bootstrap/css/bootstrap.css');
require('bootstrap/js/bootstrap.js');
require('avalonbootstrap/avalonbootstrap.js');
require('./static/js/view.js');
require('./static/lib/vui-avalon/autocomplete/vui.autocomplete');

var userCtrl = avalon.define({
    $id: 'user_ctrl',
    user: {
        username: 'bingfengwx@qq.com'
    }
});

var xxb = require('xxb.html');
var tabCtrl = avalon.define({
    $id: 'tab_ctrl',
    config: {
        headerData: [{title : '信息表'},{title : '税收表'},{title : '产品表'},{title : '财务表'},{title : '调查表'},{title : '审核明细表'}],
        contentData: [{html : xxb},{html : '<div>数据</div>'},{html : '产品表。。。'},{html : '财务表。。。'},{html : '调查表。。。'},{html : '审核明细表。。。'}],

    },
    dataObj: {
        jcsj:{
            xxb: {
                shxydm: '11111'
            }
        }
    },

    saveBtnClick: function () {
        alert(this.dataObj.jcsj.xxb.shxydm);
    }
});

avalon.define({
    $id: 'hylb',
    hylb: [{id: 1, pid: 0, text: 'aaa1'}, {id: 2, pid: 0, text: 'bbb2'}],
});

// $(window).bind('beforeunload',function(){
//     return '确定离开页面?';
// });