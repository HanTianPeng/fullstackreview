import './subPageA';
import './subPageB';

// 代码分割
require.include('./moduleA');  // subPageA, subPageB都引用moduleA,但是可以通过include解决代码分割
if(page === 'subPageA') {
    require.ensure(['./subPageA'], function() {
        var subPageA = require('./subPageA');
    }, 'subPageA')
}else if(page === 'subPageB') {
    require.ensure(['./subPageB'], function() {
        var subPageB = require('./subPageB');
    }, 'subPageB')
}

// 代码分割: ensure只是加载到页面, 回调函数才是真正执行这个
require.ensure(['lodash'], function() {
    var _ = require('lodash');
    _.join([1,2,3], 4);
}, 'vendor')

export default 'pageA';