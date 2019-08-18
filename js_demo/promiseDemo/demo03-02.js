// 封装请求函数
function getURLCallback(callback, URL){
    // 新建一个request对象
    var request = new XMLHttpRequest();
    // 异步发送请求
    request.open('GET', URL, true);
    // 获取数据返回
    request.onload = () => {
        // 判断请求服务器返回状态
        if(request.status === 200){
            // 成功，准备解析结果
            callback(null, request.responseText);
        }else{
            // 失败，新建异常错误信息
            callback(new Error(request.statusText), request.response);
        }
    };
    // 请求异常处理
    request.onerror = () => {
        // 异常，新建异常错误对象
        callback(new Error(request.statusText));
    };
    request.send();
}

// 封装json解析函数
function JSONParse(callback, error, value){
    if(error){
        // 错误数据，返回错误数据解析结果
        callback(error, value);
    }else{
        try{
            // 正确数据，返回正确数据解析结果
            var result = JSON.parse(value);
            callback(null, result);
        }catch(e){
            // 解析出现异常,返回解析出现异常错误信息
            callback(e, value);
        }
    }
}

// 封装请求对象
var requestObj = {
    people: function getPeople(callback){
        return getURLCallback(function JSONParseCallback(error, value){
            JSONParse(callback, error, value);
        }, 'http://azu.github.io/promises-book/json/comment.json');
    },
    comment: function getComment(callback){
        return getURLCallback(JSONParse.bind(null, callback), 'http://azu.github.io/promises-book/json/people.json');
    }
}

// 迭代请求
function routeRequest(requests, callback, results){
    // 没有请求，直接返回结果
    if(requests.length === 0){
        return callback(null, results);
    }else{
        // 挨个调取每一个请求
        var requestItem = requests.shift();
        requestItem(function(error, value){
            if(error){
                return callback(error, value);
            }else{
                results.push(value);
                routeRequest(requests, callback, results);
            }
        });
    }
}

// 主函数
function main(callback){
    routeRequest([requestObj.comment, requestObj.people, ], callback, []);
}

// 执行主函数
main(function(error, value){
    if(error){
        console.error(error);
    }else{
        console.log(value);
    }
});