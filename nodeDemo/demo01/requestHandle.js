var exec = require('child_process').exec,
    querystring = require('querystring'),
    fs = require('fs')
    formidable = require('formidable');

// function start(response){
//     console.log('request handle is come start');
//     exec('ls-lah', function(error, stdout, stderr){
//         response.writeHead(200, {'Content-Type': 'text/html'});
//         response.write(stdout + 'ssss');
//         response.end();
//     })
// }

// 文本上传
// function start(response, postData){
//     console.log('request handle is come start');
//     var body = '<html>'+
//     '<head>'+
//     '<meta http-equiv="Content-Type" content="text/html; '+
//     'charset=UTF-8" />'+
//     '</head>'+
//     '<body>'+
//     '<form action="/upload" method="post">'+
//     '<textarea name="text" rows="20" cols="60"></textarea>'+
//     '<input type="submit" value="Submit text" />'+
//     '</form>'+
//     '</body>'+
//     '</html>';
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.write(body);
//     response.end();
// }

// function upload(response, postData){
//     console.log('request handle is come upload');
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.write('you recevied data ===' + querystring.parse(postData).text);
//     response.end();
// }


// 文件上传
function start(response, request){
    console.log('request handle is come start');
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data"'+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}



function upload(response, request){
    console.log('request handle is come upload');
    var form = new formidable.IncomingForm();
    console.log('is parsing');
    form.parse(request, function(error, fields, files){
        console.log('parse done');
        fs.renameSync(files.upload.path, './tmp/test2.png');
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('received image;<br/>');
        response.write('<img src="/show">');
        response.end();
    });
}

function show(response, postData){
    console.log('request handle is come show');
    fs.readFile('./tmp/test2.png', 'binary', function(error, file){
        if(error){
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(error + '\n');
            response.end();
        }else{
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.write(file, 'binary');
            response.end();
        }
    });
    
}

module.exports = {
    start: start,
    upload: upload,
    show: show,
}