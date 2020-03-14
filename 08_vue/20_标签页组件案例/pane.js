
// pane需要控制标签页内容的显示与隐藏，设置一个data: show,并且用v-show指令来控制元素
Vue.component('pane', {
    name: 'pane',
    template: '\
        <div class="panne" v-show="show">\
            <slot></slot>\
        </div>\
    ',
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateNav (){
            this.$parent.updateNav();
        }
    },
    data: function(){
        return {
            show: true
        }
    },
    watch: {
        label (){
            this.updateNav();
        }
    },
    mounted (){
        this.updateNav();
    }
});