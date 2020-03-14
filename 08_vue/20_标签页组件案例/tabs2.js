Vue.component('tabs', {
    template: '\
        <div class="tabs">\
            <div class="tabs-bar">\
                <div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)">\
                    {{ item.label }}\
                </div>\
            </div>\
            <div class="tabs-content">\
                <slot></slot>\
            </div>\
        </div>\
    ',
    props: {
        value: {
            type: [String, Number]
        }
    },
    data: function (){
        return {
            currentValue: this.value,
            navList: []
        };
    },
    watch: {
        value: function (val){
            this.currentValue = val;
        },
        currentValue: function (val){
            this.updateStatus();
        }
    },
    methods: {
        tabCls: function (item){
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        handleChange: function (index){
            var nav = this.navList[index];
            var name = nav.name;
            // 改变当前选中的tab，并触发watch
            this.currentValue = name;
            // 更新value
            this.$emit('input', name);
            // 触发一个自定义事件，供父级使用
            this.$emit('on-click', name);
        },
        getTabs (){
            // 通过遍历子组件，获取所有pane子组件
            return this.$children.filter(function (item){
                return item.$options.name === 'pane';
            });
        },
        updateNav (){
            this.navList = [];
            var _this = this;
            // 设置对this的引用，在function回调中，this指向的并不是vue实例对象
            this.getTabs().forEach(function (pane, index){
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });
                // 如果pane没有name，默认设置它的索引
                if (!pane.name) pane.nmae = index;
                if (index === 0){
                    if(!_this.currentValue){
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus (){
            var tabs = this.getTabs();
            var _this = this;
            // 显示当前选中的tab对应的pane组件，隐藏没有选中的
            tabs.forEach(function (pane, index){
                return pane.show = pane.name === _this.currentValue;
            });
        },
    }
})