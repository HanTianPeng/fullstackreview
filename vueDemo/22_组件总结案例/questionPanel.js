// 注册问题面板组件
Vue.component('question-panel', {
    template: '\
        <div class="content">\
            <slot></slot>\
        </div>\
    ',
})