// 创建vue实例对象
var app = new Vue({
    el: '#app',
    data: {
        list : [
            {
                id: 1,
                name: 'iPhone 7',
                price: 6798,
                count: 1,
                select: false
            },
            {
                id: 2,
                name: 'rice',
                price: 89,
                count: 1,
                select: false
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 18928,
                count: 1,
                select: false
            }
        ],
        haha: 'text-align: center',
    },
    computed: {
        // 计算属性: 所依赖得数据发生变化时,才重新取值
        totalPrice: function(){
            var total = 0;
            for(var i=0; i<this.list.length; i++){
                var item = this.list[i];
                if(item.select){
                    total += item.price * item.count;
                }
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
        },
        tdClasses: function(){
            return {
                'check-td': true,
                
            }
        }
    },
    methods: {
        handleReduce: function(index){
            if(this.list[index].count === 1){
                return;
            }
            this.list[index].count--;
        },
        handleAdd: function(index){
            this.list[index].count++;
        },
        handleRemove: function(index){
            this.list.splice(index, 1);
        },
        handleSelect: function(index){
            if(this.list[index].select){
                this.list[index].select = false;
            }else{
                this.list[index].select = true;
            }
        }
    }
});