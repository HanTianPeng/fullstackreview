var app = new Vue({
    el: '#app',
    data: {
        valueParent: 6
    },
    methods: {
        handleOnChange: function(value){
            console.log('on-change事件====>', value);
            // this.valueParent = parseInt(value)
            console.log('父组件======>', this.valueParent, typeof(value));
        }
    }
});