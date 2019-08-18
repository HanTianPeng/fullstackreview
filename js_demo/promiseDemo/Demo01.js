// 目标1：创建一个Promise对象,通过构造函数Promise来创建
var promise = new Promise(function(resolve, reject){

});

function asyncFunction(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('Async Hello World');
        }, 10);
    });
}

// 创建一个promise实例对象
asyncFunction().then(function(value){
    console.log(value);
}).catch(function(error){
    console.log(error);
});


