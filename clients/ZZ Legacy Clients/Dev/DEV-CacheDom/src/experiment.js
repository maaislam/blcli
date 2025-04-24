import {cacheDom} from '../../../../lib/cache-dom';
import * as helpers from './lib/helpers';

console.time('From cache');
for(var i = 0; i < 1000; i++) {
    cacheDom.get('.category-title');
}
console.timeEnd('From cache');

console.time('Bypass cache');
for(var i = 0; i < 1000; i++) {
    cacheDom.get('.category-title', true);
}
console.timeEnd('Bypass cache');

console.log(cacheDom.getAll('div').length);

helpers.testInSeparateFile();
