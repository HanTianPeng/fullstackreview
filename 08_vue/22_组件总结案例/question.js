
Vue.component('radioselect', {
    name: 'radioselect',
    props: {
        name: {
            type: String,
            default: 'question0'
        },
        title: {
            type: String,
            default: 'Radio Question'
        },
        choices: {
            type: Array,
            default: function(){
                return ['A', 'B', 'C']
            }
        }
    },
    data: function(){
        var _this = this;
        var values = [];
        this.choices.forEach((item, index) => {
            values.push(_this.name + index);
        });
        return {
            values: values,
            curValue: ''
        }
    },
    template: "\
        <div>\
            <span>{{ title }}</span>\
            <div v-for='(choice, index) in choices'>\
                <input type='radio' v-model='curValue' :value='choices[index]' :id='values[index]'>\
                <label :for='values[index]'>{{ choice }}</label>\
            </div>\
        </div>\
    ",
    methods: {

    },
    watch: {
        curValue: function(newVal, oldVal){
            this.$emit('pick', newVal);
        }
    }
});


Vue.component('multiselect', {
    name: 'multiselect',
    props: {
        name: {
            type: String,
            default: 'question0'
        },
        title: {
            type: String,
            default: 'Multi Question'
        },
        choices: {
            type: Array,
            default: function(){
                return ['A', 'B', "C"]
            }
        }
    },
    data: function(){
        var _this = this;
        var values = [];
        this.choices.forEach((item, index) => {
            values.push(_this.name + index);
        });
        return {
            values: values,
            curValue: []
        }
    },
    template: '\
        <div>\
            <span class="question-title">{{ title }}</span>\
            <div v-for="(choice, index) in choices">\
                <input type="checkbox" v-model="curValue" :value="choices[index]" :id="values[index]">\
                <label :for="values[index]">{{ choice }}</label>\
            </div>\
        </div>\
    ',
    methods: {

    },
    watch: {
        curValue: function(newVal, oldVal){
            this.$emit('pick', newVal);
        }
    }
});


Vue.component('typetext', {
    name: 'typetext',
    props: {
        name: {
            type: String,
            default: 'question0'
        },
        title: {
            type: String,
            default: 'Text Question'
        }
    },
    data: function(){
        return {
            curValue: ''
        }
    },
    template: '\
        <div>\
            <span>{{ title }}</span>\
            <div>\
                <textarea v-model="curValue"></textarea>\
            </div>\
        </div>\
    ',
    methods: {

    },
    watch: {
        curValue: function(newVal, oldVue){
            this.$emit('pick', newVal);
        }
    }
})