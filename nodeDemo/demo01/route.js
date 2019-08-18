// function route(handle, pathName, response, postData){
//     console.log('the route is parse request for ====', pathName);

//     // 路由具体进行转发到业务逻辑
//     if(typeof(handle[pathName]) === 'function'){
//         handle[pathName](response, postData);
//     }else if(pathName === '/favicon.ico'){
//         console.log('the requet is favicon.ico');
//         response.writeHead(200, {'Content-Type': 'text/html'});
//         response.end();
//     }else{
//         console.log('the request is not valid');
//         response.writeHead(400, {'Content-Type': 'text/html'});
//         response.write('Hello World');
//         response.end();
//     }
// }

function route(handle, pathName, response, request){
    console.log('the route is parse request for ====', pathName);

    // 路由具体进行转发到业务逻辑
    if(typeof(handle[pathName]) === 'function'){
        handle[pathName](response, request);
    }else if(pathName === '/favicon.ico'){
        console.log('the requet is favicon.ico');
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end();
    }else{
        console.log('the request is not valid');
        response.writeHead(400, {'Content-Type': 'text/html'});
        response.write('Hello World');
        response.end();
    }
}

module.exports = {
    route: route,
}