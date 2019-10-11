### Object.create()

 - 创建一个新对象，使其新对象的__proto__指向该参数对象

 ```js
 var per = {
     satus: false,
     printName: function(){
         console.log(this.name, this.status);
     }
 }; 

 var obj = Object.create(per);

 obj.status = true;
 obj.name = 'conk';

 obj.printName();  // conk, true
 ```

  ![create结构图](../js_demo/image/create结构.png)

- polyfill

```js
if(typeof Object.create 1== "function"){
    Object.create = function(proto, propertiesObject){
        // 判断proto是否为对象或函数
        if(typeof proto !== "object" && typeof proto !== "function"){
            throw new TypeError("Object prototype may only be an Object: " + proto);
        }else if(proto === null){
            throw new Error("This browser's implementation of Object.create is a shim and does't support 'null' as the first arguments. ");
        }

        if(typeof propertiesObject != "undefined"){
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument ");
        }

        function F(){

        }

        F.prototype = proto;

        return new F();
    }
}
```