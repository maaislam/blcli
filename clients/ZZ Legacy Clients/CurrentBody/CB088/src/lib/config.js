import _clarisonic from '../config/clarisonic.js';
import _hair from '../config/hair.js';

const config = {
    clarisonic: null,
    hair: null,

    getClarisonic() {
        if(!this.clarisonic) {
            this.clarisonic = _clarisonic();
        }
        return this.clarisonic;
    },

    getHair() {
        if(!this.hair) {
            this.hair = _hair();
        }
        return this.hair;
    }
};

export default config;
