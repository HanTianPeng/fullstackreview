function isValueNumber(value){
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
    template: '\
        <div class="input-number">\
            <input type="text" name="" id="" :value="currentValue" @change="handleChange">\
            <button @click="handleDown" :disabled="currentValue <= min">-</button>\
            <button @click="handleUp" :disabled="currentValue >= max">+</button>\
        </div>\
    ',
    data: function(){
        return {
            currentValue: this.value
        }
    },
    props: {
        min: {
            type: Number,
            default: -Infinity
        },
        max: {
            type: Number,
            default: Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    watch: {
        currentValue: function(newValue, oldValue){
            this.$emit('input', newValue);
            this.$emit('on-change', newValue);
            
        },
        value: function(newValue, oldValue){
            console.log('sdaasdsda');
            this.updateValue(newValue);
        }
    },
    methods: {
        updateValue: function(val){
            if(val < this.min){
                val = this.min;
            }
            if(val > this.max){
                val = this.max;
            }
            this.currentValue = val;
        },
        handleDown: function(){
            if(this.currentValue <= this.min){
                return;
            }
            this.currentValue -= 1;
        },
        handleUp: function(){
            if(this.currentValue >= this.max){
                return;
            }
            this.currentValue += 1;
        },
        handleChange: function(event){
            console.log('====促发');
            var val = parseInt(event.target.value.trim());
            this.currentValue = val;
            if(isValueNumber(val)){
                if(val < this.min){
                    this.currentValue = this.min;
                }else if(val > this.max){
                    this.currentValue = this.max;
                }else{
                    console.log('saddddddddddddddddddddddddddddddddddd');
                    event.target.value = this.currentValue; 
                }
            }
        },
        mounted: function(){
            this.updateValue(this.value);
        }
    }
});