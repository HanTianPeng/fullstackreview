// 注册自定义指令
Vue.directive('clickoutside', {
    // 
    bind: function (el, binding, vnode){
        function documentHandle(e){
            if(el.contains(e.target)){
                return false;
            }
            if(binding.expression){
                binding.value(e);
            }
        };
        function keyDownESC(e){
            var eLast = e || window.e || arguments.callee.caller.arguments[0];
            if(eLast && eLast.keyCode==27){ // 按 Esc 
                binding.value(eLast);
            }
        }
        el.__vueClickOutSide__ = documentHandle;
        el.__vueKeyDownESC__ = keyDownESC;
        document.addEventListener('click', documentHandle);
        document.addEventListener('keydown', keyDownESC);
    },

    unbind: function (el, binding, vnode){
        document.removeEventListener('click', el.__vueClickOutSide__);
        delete el.__vueClickOutSide__;
        document.removeEventListener('click', el.keyDownESC);
        delete el.__vueKeyDownESC__;
    }
});