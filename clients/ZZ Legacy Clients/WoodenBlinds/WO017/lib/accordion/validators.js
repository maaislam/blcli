class Validators {
    constructor() {
        this.stack = [];
    }

    add(name, func) {
        this.stack[name] = func;
    }

    get(name, func) {
        return this.stack[name];
    }

    execute(name, params, enabledFailedCallback = true) {
        const validator = this.get(name);
        if(validator) {

            var result = validator.apply(null, params);

            if(!result && typeof this.failedExecutionCallback == 'function' && enabledFailedCallback) {
                this.failedExecutionCallback.apply(null, params);
            }

            return result;
        }
        return true;
    }

    addFailedExecutionCallback(fn) {
        this.failedExecutionCallback = fn;
    }
}

export default Validators;
