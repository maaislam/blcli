/**
 * Merge 3 experiments into one
 */
import v1 from './experiments/v1';
import v2 from './experiments/v2';
import v3 from './experiments/v3';

let VARIATION = 1;
if(IT007VARIATION == 2) {
    VARIATION = 2;
}
if(IT007VARIATION == 3) {
    VARIATION = 3;
}

switch(VARIATION) {
    case 1:
        document.body.classList.add('it007--v1');
        v1();
        break;
    case 2:
        document.body.classList.add('it007--v2');
        v2();
        break;
    case 3:
        document.body.classList.add('it007--v3');
        v3();
        break;
    default:
        throw "Invalid variation.";
}
