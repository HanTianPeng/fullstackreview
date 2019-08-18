// 封装请求函数
function getURLCallback(callback, URL){
    var request = new XMLHttpRequest();
    request.open('GET', URL, true);
    request.onload = () => {
        if(request.status === 200){
            // 成功，准备数据，等待序列化
            callback(null, request.responseText);
        }else{
            // 服务器异常，准备错误信息，等待序列化
            callback(new Error(request.status), request.response);
        }
    };
    request.onerror = () => {
        // 请求异常，准备错误信息，等待序列化
        callback(new Error(request.status));
    };
    request.send();
}

// 封装json序列化函数
function JSONParse(callback, error, value){
    if(error){
        callback(error, value);
    }else{
        try{
            // 序列化数据
            var result = JSON.parse(value);
            // 返回序列化数据
            callback(null, result);
        }catch(e){
            // 序列化异常处理
            callback(e, value);
        }
    }
}

// 封装请求对象
var requestObj = {
    people: function getPeople(callback){
        return getURLCallback(JSONParse.bind(null, callback), 'http://azu.github.io/promises-book/json/people.json');
    },
    comment: function getComment(callback){
        return getURLCallback(function JSONParseCallback(error, value){
            JSONParse(callback, error, value);
        }, 'http://azu.github.io/promises-book/json/comment.json');
    }
};

// 迭代请求
function routeRequest(callback, requests, results){
    if(requests.length === 0){
        callback(null , results);
    }else{
        // 获取每一个请求
        var requestItem = requests.shift();
        requestItem(function(error, value){
            if(error){
                callback(error, value);
            }else{
                results.push(value);
                routeRequest(callback, requests, results);
            }
        });
    }
}

// main函数
function main(callback){
    routeRequest(callback, [requestObj.comment, requestObj.people, ], []);
}

// 执行
main(function(error, value){
    if(error){
        console.error(error);
    }else{
        console.log(value);
    }
});