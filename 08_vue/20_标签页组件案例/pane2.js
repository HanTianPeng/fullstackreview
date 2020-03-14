Vue.component('pane', {
    // name属性，标识当前组件名
    name: 'pane',
    template: '\
        <div class="pane" v-show="show">\
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
    data: function (){
        return {
            show: true
        };
    },
    mounted (){
        this.updateNav();
    },
    watch: {
        label (){
            this.updateNav();
        }
    },
    methods: {
        updateNav (){
            this.$parent.updateNav();
        }
    }
});