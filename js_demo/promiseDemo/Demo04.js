// promise处理多个异步狐狸任务
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
    function recordValue(results, value){
        results.push(value);
        return results;
    }
    var pushValue = recordValue.bind(null, []);
    return requestObj.comment().then(pushValue).then(requestObj.people).then(pushValue);
}

main().then((value) => {
    console.log(value);
}).catch((error) => {
    console.error(error);
});
