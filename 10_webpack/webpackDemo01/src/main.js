// main.js：是我们项目的js入口文件
// import *** from *** 为es6语法
// const *** = require('***')为node语法
import $ from 'jquery';
import './css/index.css';  // 引用css文件
import './css/index.less';  // 引用less文件
import './css/index.scss';  // 引用sass文件
import 'bootstrap/dist/css/bootstrap.css';  // 引用bootstrap.css文件

$(function(){
    $('li:odd').css('backgroundColor', 'blue');
    $('li:even').css('backgroundColor', function(){
        return 'red';
    });
});

class Person {
    static info = {name: 'penghantian', age: 18}
}

console.log(Person.info);
     






