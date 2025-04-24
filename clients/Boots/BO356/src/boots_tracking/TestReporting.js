import {testLoad, testRender, testAction, experienceID } from "./GA";
// import { usabillaRunningTests, usabillaTrigger } from "./usabilla";

class TestReporting {

    /**
     * Creates a new instance of the test reporting object
     * @param {string} testID The ID of the test
     * @param {string} testVariant The variant of the test
     */
    constructor (testID, testVariant) {
        this.testID = testID;
        this.testVariant = testVariant;
        this.testName = `${testID}|${testVariant}`;

        this.experience();
    }

    experience() {
        
        if (!window.loadedTargetTests) {
            // this must be the first script running, therefore create a new array @ window level to hold running test data
            window.loadedTargetTests = [];

        }

        let lengthOfLoaded = window.loadedTargetTests.length;

        //check if this test is not already in the array
        if (window.loadedTargetTests.indexOf(this.testName) < 0) {
            //push this test to the array and keep track of the length
            lengthOfLoaded = window.loadedTargetTests.push(this.testName);
        }

        //setTimeout to check if other tests have modified the array
        setTimeout(() => {
            if (window.loadedTargetTests.length == lengthOfLoaded) {
                //no other tests have been pushed to the array, we should be safe to push to DL
                experienceID(window.loadedTargetTests);
            }
        }, 200)
    }

    /**
     * Registers the test with all reporting suites
     * Also adds CSS classes to document.body for better specificity
     */
    register() {
        //Adding CSS class to body for better specificity
        document.body.classList.add(this.testID.split('|')[0]);

        //registering test with GA
        testLoad(this.testName);

        if (!window.runningTargetTests) {
            // this must be the first script running, therefore create a new array @ window level to hold running test data
            window.runningTargetTests = [];

            //seen as we are the first script, populate window object with any items from sessionStorage
            if (sessionStorage.getItem('runningTargetTests')) {
                const runningTestsFromSessionStorage = JSON.parse(sessionStorage.getItem('runningTargetTests'));
                runningTestsFromSessionStorage.forEach(test => {
                    window.runningTargetTests.push(test)
                });
            }
        }

        let lengthOfRunning = window.runningTargetTests.length;

        //check if this test is not already in the array
        if (window.runningTargetTests.indexOf(this.testName) < 0) {
            //push this test to the array and keep track of the length
            lengthOfRunning = window.runningTargetTests.push(this.testName);
        }

        //setTimeout to check if other tests have modified the array
        setTimeout(() => {
            if (window.runningTargetTests.length == lengthOfRunning) {
                //no other tests have been pushed to the array, we should be safe to push to Usabilla

                // usabillaRunningTests(JSON.stringify(window.runningTargetTests));

                //also update/set sessionStorage to contain this array
                sessionStorage.setItem('runningTargetTests', JSON.stringify(window.runningTargetTests));
            }
        }, 200)
    }

    /**
     * Sends an event to relevant reporting suites
     * @param {string} renderedElement The action to report
     * @param {string} renderDetail additional detail to report
     */
    render(renderedElement, renderDetail = '') {
        testRender(this.testName, renderedElement, renderDetail);

        // usabillaTrigger(`${this.testName}|${renderedElement} rendered`);
    }

    /**
     * Sends an event to relevant reporting suites
     * @param {string} action The action to report
     * @param {string} actionDetail additional detail to report
     */
    action(action, actionDetail = '') {
        testAction(this.testName, action, actionDetail);

        // usabillaTrigger(`${this.testName}|${action}`);
    }
}

export default TestReporting;