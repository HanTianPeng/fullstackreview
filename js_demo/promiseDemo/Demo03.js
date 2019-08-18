function getURLCallback(URL, callback){
    var request = new XMLHttpRequest();
    request.open('GET', URL, true);
    request.onload = () => {
        if(request.status === 200){
            callback(null, request.responseText);
        }else{
            callback(new Error(request.statusText), request.response);
        }
    };
    request.onerror = () => {
        callback(new Error(request.statusText));
    };
    request.send();
}

// 对json数据进行安全的解析
function jsonParse(callback, error, value){
    if(error){
        callback(error, value);
    }else{
        try{
            var result = JSON.parse(value);
            callback(null, result);
        }catch(e){
            callback(e, value);
        }
    }
}

// 发送请求
var requestObj = {
    comment: function getComment(callback){
        return getURLCallback('http://azu.github.io/promises-book/json/comment.json', jsonParse.bind(null, callback));
    },
    people: function getPeople(callback){
        return getURLCallback('http://azu.github.io/promises-book/json/people.json', jsonParse.bind(null, callback));
    }
};

// 启动请求
function allRequest(requests, callback, results){
    if(requests.length === 0){
        return callback(null, results);
    }
    var requestItem = requests.shift();
    requestItem(function(error, value){
        if(error){
            callback(error, value);
        }else{
            results.push(value);
            allRequest(requests, callback, results);
        }
    });
}

function main(callback){
    allRequest([requestObj.comment, requestObj.people], callback, []);
}

// 运行
main(function(error, results){
    if(error){
        return console.error(error);
    }else{
        console.log(results);
    }
});