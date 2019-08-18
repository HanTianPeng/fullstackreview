var http = require('http'), 
    formidable = require('formidable'),
    url = require('url');

// function start(route, handle){  // 接收路由并且转发给路由，交给路由进行转发
//     // 创建一个server
//     var server = http.createServer(function(request, response){
//         var postData = '';
//         var pathName = url.parse(request.url).pathname;
//         console.log('the request url path----', pathName);
        
//         request.setEncoding('utf8');
//         request.addListener('data', function(postDataChunk){
//             postData += postDataChunk;
//             console.log('Received POST data chunk' + postDataChunk);
//         });

//         request.addListener('end', function(){
//             // 路由转发,确保只有当所有数据接收完毕后才触发，并且只触发一次
//             route(handle, pathName, response, postData);
//         });
        
//         // 路由转发
//         // route(handle, pathName, response);

//         // response.writeHead(200, {"Content-Type": 'text/html'});
//         // response.write('Hello World');
//         // response.end();
//     });

//     // 监听8080端口
//     server.listen(9999);

//     console.log('the server is running');
// }


function start(route, handle){  // 接收路由并且转发给路由，交给路由进行转发
    // 创建一个server
    var server = http.createServer(function(request, response){
        var pathName = url.parse(request.url).pathname;
        console.log('the request url path----', pathName);
        // 路由转发,确保只有当所有数据接收完毕后才触发，并且只触发一次
        route(handle, pathName, response, request);
    });

    // 监听8080端口
    server.listen(9999);

    console.log('the server is running');
}

module.exports = {
    start: start,
}