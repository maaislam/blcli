import { h, render, Component } from "preact";
import { useState, useEffect } from "preact/hooks";


const Controls = {
    /**
     * 
     * Size controls
     */
    oneUp(stateFunction) {
        stateFunction(prev => prev + 1);
    },
    oneDown(stateFunction) {
        stateFunction(prev => prev - 1);
    },
    /**
     * 
     * Stage controls
     */
    open(stateFunction) {
        stateFunction(true);
    },

    close(stateFunction) {
        stateFunction(false);
    },

    next(stateFunction) {
        stateFunction(prev => prev + 1);
    },

    prev(stateFunction) {
        stateFunction(prev => prev - 1);
    },
};


export default Controls;