import * as _ from 'lodash';

console.log(_.chunk(3));

const NUM = 15;

interface Cat {
    name: String,
    sex: String
}

function touchCat(cat: Cat) {
    console.log('----miao----', cat.name, cat.sex);
}

touchCat({
    name: 'tom',
    sex: 'male'
});