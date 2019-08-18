/*
    目标：
        1. all()处理多个请求
        2. promise数组同时开始执行
*/

function getURL(URL){
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest();
        request.open('GET', URL, true);
        request.onload = () => {
            if(request.status === 200){
                resolve(request.responseText);
            }else{
                reject(new Error(request.statusText));
            }
        };
        request.onerror = () => {
            reject(new Error(request.statusText));
        };
        request.send();
    });
}

var requestObj = {
    comment: function getComment(){
        return getURL('http://azu.github.io/promises-book/json/comment.json').then(JSON.parse);
    },
    people: function getPeople(){
        return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
    }
};

function main(){
    return Promise.all([requestObj.comment(), requestObj.people()]);
}

main().then((value) => {
    console.log(value);
}).catch((error) => {
    console.error(error);
});


// promise数组同时执行
function timePromise(delay){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(delay);
        }, delay);
    });
}

var startDate = Date.now();
Promise.all([
    timePromise(1),
    timePromise(32),
    timePromise(64),
    timePromise(128)
]).then((value) => {
    console.log(Date.now() - startDate + 'ms');
    console.log(value);
});