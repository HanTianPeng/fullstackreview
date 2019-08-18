// 注册自定义指令
Vue.directive('clickoutside', {
    bind: function (el, binding, vnode) {
        function documentHandler(e){
            if(el.contains(e.target)){
                return false;
            }
            if(binding.expression){
                binding.value(e);
            }
        }
        el.__vueClickOutSide__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind: function (el, binding, vnode) {
        document.removeEventListener('click', el.__vueClickOutSide__);
        delete el.__vueClickOutSide__;
    }
});