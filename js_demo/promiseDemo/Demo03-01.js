// 处理请求
function getURLCallback(URL, callback){
    var request = new XMLHttpRequest();
    request.open('GET', URL, true);
    request.onload = () => {
        if(request.status === 200){
            callback(null ,request.responseText);
        }else{
            callback(new Error(request.statusText), request.response);
        }
    };
    request.onerror = () => {
        callback(new Error(request.statusText));
    };
    request.send();
}

// 解析数据
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

// 封装request对象
var requestObj = {
    people: function getPeople(callback){
        return getURLCallback('http://azu.github.io/promises-book/json/comment.json', jsonParse.bind(null ,callback));
    },
    comment: function getComment(callback){
        return getURLCallback('http://azu.github.io/promises-book/json/people.json', jsonParse.bind(null, callback));
    }
};

function bindJSONParse(error, value){
    jsonParse(callback, error, value);
}

// 路由分发
function requestRouter(requests, callback, results){
    if(requests.length === 0){
        return callback(null ,results); 
    }else{
        var requestItem = requests.shift();
        requestItem(function(error, value){
            if(error){
                return callback(error, value);
            }else{
                results.push(value);
                requestRouter(requests, callback, results);
            }
        });
    }
}

// 主函数
function main(callback){
    requestRouter([requestObj.people, requestObj.comment, ], callback, []);
}   

// 开始运行
main(function(error, value){
    if(error){
        console.error(error);
    }else{
        console.log(value);
    }
});

