/**
 * Created by lianx on 2017/4/28.
 */

var tpl = require('./vui.autocomplete.html');

avalon.component('ms-autocomplete', {
    template: tpl,
    defaults: {
        data: [],
        setting: {
            data: {
                name: 'text',
                title: '',
                url: ''
            }
        },
        onInit: function () {
            for(var i = 0; i < this.data.length; i++) {
                var obj = this.data[i];
                if(this.setting.data.name && this.setting.data.name != 'name') {
                    this.data[i].name = obj[this.setting.data.name];
                    console.log(this.data[i]);
                }
            }
        }
    },
});

avalon.define({
    $id: 'autocompleteCtrl',

    dropShow: false,
    onClick: function(){
        this.dropShow = true;
    },
    onBlur: function () {
        this.dropShow = false;
    },
});