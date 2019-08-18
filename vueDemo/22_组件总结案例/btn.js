// 注册按钮组件
Vue.component('btn', {
    template: '\
        <div class="btn">\
            <button>\
                <slot></slot>\
            </button>\
        </div>\
    '
});