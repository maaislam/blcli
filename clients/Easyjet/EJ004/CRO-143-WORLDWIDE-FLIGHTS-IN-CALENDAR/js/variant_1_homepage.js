import initialiseABTest from './_LocalhostHelpers/Initialise';
import optimize360Triggers from './_Optimize360Triggers/CustomJavascriptTrigger';
import routeDatePickerController from './_MambaServices/Controllers';
import manipulateDOM from './_CalendarDOMChanges/CalendarDayCells';
import { calendarCheckBox } from './_CalendarDOMChanges/CalendarCheckbox';
import { loopDatesAndHighlight } from './_CalendarDOMChanges/WorldwideCellHighlighting';

let worldwideAvailabilityDates = [];
console.log('is running'); 
const options = { 
    childList: true,
    attributes: true,
    attributeOldValue: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: true
};

// Waiting for day cell content to appear in day cell
function waitForCalendarDayContentToPopulate(className, callBack) {
    window.setTimeout(function(){
        var element = document.querySelector(className);
        if(element) {
            callBack(className, element);
        } else {
            waitForCalendarDayContentToPopulate(className, callBack);
        }
    }, 100)
};


// AB TEST CODE //
function matchWorldwideDateToCalendarDate(date) {
    let object = worldwideAvailabilityDates.find(el => el.date === date);

    if (object != undefined) {
        return object;
    };
    return;
};

// LOOP THOUGH DAYS IN THE CALENDAR
// Find days by the day attribute
// And if they are UNSELECTABLE
// Match obj date to DOM attribute data-date
// Set up toggle
// Create WW icon/content
function injectWorldwideAvailabilityIntoCalendar() {
    let daysInCalendarDrawer = manipulateDOM.setQuerySelector();

    for (let i = 0; i < daysInCalendarDrawer.length; i++) {
        let dateInCalendarDayCell = daysInCalendarDrawer[i].dataset.date;
        let day = daysInCalendarDrawer[i];

        if (daysInCalendarDrawer[i].firstElementChild.classList.value === 'unselectable'){
            let worldwideAvailableDates = matchWorldwideDateToCalendarDate(dateInCalendarDayCell);

            if (worldwideAvailableDates !== undefined) {
                if (daysInCalendarDrawer[i].attributes[1].value === worldwideAvailableDates.date) {
                    manipulateDOM.hideUnselectableEJDayNumber(day);
                    manipulateDOM.createSelectableWorldwideElement(worldwideAvailableDates, day);
                };
            };
        };
    };
};

// FORMAT RESPONSE OBJECT
function formatWorldwideAvailabilityData(res) {
    for (let i = 0; i < res.Data.Months.length; i++) {
        for (let j = 0; j < res.Data.Months[i].FlightDates.length; j++) {
            let obj  = {};
            obj['date'] = String(res.Data.Months[i].YearNumber) + '-' + String(('0' + String(res.Data.Months[i].MonthNumber)).slice(-2)) + '-' + String(('0' + (res.Data.Months[i].FlightDates[j])).slice(-2));
            obj['clickEvent'] = res.Data.Months[i].YearNumber + ', ' +  res.Data.Months[i].MonthNumber + ', ' +  res.Data.Months[i].FlightDates[j];
            obj['dayNumber'] = res.Data.Months[i].FlightDates[j];
            worldwideAvailabilityDates.push(obj);
        };
    };
};

// FETCH
function generateAPIURL() {
    console.log("generate api")
    let originValueIATA         = document.querySelector('input[id*="origin-"]').value.match(/\((.*)\)/)[1];
    let destinationValueIATA    = document.querySelector('input[id*="destination-"]').value.match(/\((.*)\)/)[1];
    let apiURL                  = "";

    // `https://localhost:3000/ejcms/cache15m/api/worldwideroutedates/get/?destinationIata=${destinationValueIATA}&language=en&originIata=${originValueIATA}`
    if (routeDatePickerController.isCalendarReturnPicker() === false) {
        console.log("isCalendarReturnPicker", routeDatePickerController.isCalendarReturnPicker());
        apiURL = `https://www.easyjet.com/ejcms/cache15m/api/worldwideroutedates/get/?destinationIata=${destinationValueIATA}&language=en&originIata=${originValueIATA}`;
        return apiURL;
    } else {
        apiURL = `https://www.easyjet.com/ejcms/cache15m/api/worldwideroutedates/get/?destinationIata=${originValueIATA}&language=en&originIata=${destinationValueIATA}`;
        return apiURL;
    };
};

// GET REQUEST IS  MADE
// Then we formate the response into an object, so I can later loop through it
// Then inject/match object data, by data-date attribute
function activateABTest() {
    console.log("Test activated!!!!");
    const FetchApiService       = angular.element(document.body).injector().get("FetchApiService");
    let apiurl                  = generateAPIURL();

    FetchApiService.Fetch(apiurl).then(res => {
        console.log("res", res.Data);
        formatWorldwideAvailabilityData(res); 
    }).then(() => {;
        injectWorldwideAvailabilityIntoCalendar();
        calendarCheckBox();
        if(document.querySelector('#drawer-title-routedatepicker').textContent == 'Pick a return date') {
           loopDatesAndHighlight(); 
        }
        
    });
};

// WAITING FOR EITHER DEPARTING OR RETURN TAB TO DISPLAY
// And then waiting for day content to populate
let runMutationObserver = (mutations, observer) => {
    for (let mutation of mutations) {
        if (mutation.target.innerText === "Pick a departure date" || mutation.target.innerText === "Pick a return date") {
            if (mutation.addedNodes.length > 0) {
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    if (mutation.addedNodes[0].nodeValue === "Pick a departure date" || mutation.addedNodes[0].nodeValue === "Pick a return date") {
                        console.log("mutation departure: ", mutation);
                        waitForCalendarDayContentToPopulate(".day-sub-text",function(){
                            activateABTest();
                        });
                    }
                };
            };
        };
    };
};

function listenForCalendarToOpen() {
    // TEST FIRES HERE
    // Mutation observer set here, watching when calendar tabs toggle from departing/returning
    if (optimize360Triggers.checkTriggerDestination()) {
        var target      = document.querySelector(".drawer.drawer-angular.anim-slide-rtr")
        let observer    = new MutationObserver(runMutationObserver);
        observer.observe(target, options);

        // Disconnect observer when drawer closes
        // Check drawerID when firing this event.  Must only fire when calendar drawer closes.
        window["angularEjRootScope"].$on(AngularEj.Events.Names.Drawer.Closing, () => {
            console.log("closing...")
            observer.disconnect();
            console.log("observer disconnected...");
        });
    };
};

// This module is only called in localhost, to listen for the gtmDataLayer event calender_opened.
// It will not be used in PROD
initialiseABTest.gtmCalendarOpenedEvent(listenForCalendarToOpen);