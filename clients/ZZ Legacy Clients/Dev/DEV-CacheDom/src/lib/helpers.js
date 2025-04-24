import {cacheDom} from '../../../../../lib/cache-dom';

export function testInSeparateFile() {
    console.log(cacheDom.cache);

    console.time('From cache 2');
    for(var i = 0; i < 1000; i++) {
        cacheDom.get('.category-title');
    }
    console.timeEnd('From cache 2');
}
