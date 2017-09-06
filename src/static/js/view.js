/**
 * Created by lianx on 2017/4/25.
 */
$(function () {
    initTableSize();
})

/**
 * 初始化表格高度
 */
var initTableSize = function() {
    var clientHeight = $(window).height();
    var xxbTopSet = $('#xxb_box').offset().top;
    $('#xxb_box').height(clientHeight - xxbTopSet - 2);
    $('#xxb_head').addClass('navbar-fixed-top')
    $('#xxb_head').css({'top':xxbTopSet, 'left':'-18px'});
}

window.onresize = initTableSize;