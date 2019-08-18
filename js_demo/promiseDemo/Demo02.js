function getURL(URL){
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = () => {
            if(req.status === 200){
                resolve(req.responseText);
            }else{
                reject(new Error(req.statusText));
            };
        };
        req.onerror = () => {
            reject(new Error(req.statusText));
        };
        req.send();
    });
}

var URL1 = 'http://namibox.com/appnative/pschool';
getURL(URL1).then((value) => {
    console.log(value);
}, (error) => {
    console.log(error);
});

var URL2 = 'http://namibox.com/appnative/pvschool'
getURL(URL2).then((value) => {
    console.log(value);
}).catch((error) => {
    console.log(error);
});