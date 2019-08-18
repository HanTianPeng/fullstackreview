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
    data: function(){
        return {
            // 用来渲染tabs的标题
            currentValue: this.value,
            navList: []
        };
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
            // 改变当前选中的tab，并触发下面watch
            this.currentValue = name;
            // 更新value
            this.$emit('input', name);
            // 触发一个自定义事件，供父级使用
            this.$emit('on-click', name);
        },
        getTabs (){
            // 通过遍历子组件，得到所有的pane组件
            return this.$children.filter(function (item){
                return item.$options.name === 'pane';
            });
        },
        updateNav (){
            this.navList = [];
            // 设置对this的引用，在function回调里，this指向的并不是Vue实例对象
            var _this = this;
            this.getTabs().forEach(function (pane, index){
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });
                // 如果pane没有name，默认设置它的索引
                if (!pane.name) pane.name = index;
                // 设置当前选中的tab的索引
                if (index === 0){
                    if (!_this.currentValue){
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
        }
    },
    watch: {
        // 执行顺序与watch里面定义顺序有关
        value: function(val){
            console.log('value发生改变');
            this.currentValue = val;
        },
        currentValue: function(val){
            console.log('currentValue发生改变');
            this.updateStatus();
        }
    }
});