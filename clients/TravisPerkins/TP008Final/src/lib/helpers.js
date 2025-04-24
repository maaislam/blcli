/**
 * Match sku in array
 */
export function skuInArray(sku, products) {
    return products.indexOf(sku) > - 1 || products.indexOf(parseInt(sku)) > -1;
}

/**
 * TP delivery logic for inclusion products
 */
export function getDeliveryTargetDate() {
    const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        monthsMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        now = (new Date()),
        currentDay = now.getDay(),
        currentHour = now.getHours();

    /**
     * Helper check current hour is before the 6pm weekday cutoff
     */
    const isBeforeTimeCutoff = () => currentHour < 18; 

    let addDays = 1;

    if([1,2,3].indexOf(currentDay) > -1) {
        if(isBeforeTimeCutoff()) {
            addDays = 1;
        } else {
            addDays = 2;
        }
    }
    if(currentDay == 4) {
        if(isBeforeTimeCutoff()) {
            addDays = 1;
        } else {
            addDays = 4;
        }
    }
    if(currentDay == 5) {
        if(isBeforeTimeCutoff()) {
            addDays = 3;
        } else {
            addDays = 4;
        }
    }
    if(currentDay == 6) {
        addDays = 3;
    }
    if(currentDay == 0) {
        addDays = 2;
    }

    const targetDate = new Date(now.setDate(now.getDate() + addDays));

    return {
        targetDate: targetDate,
        targetDateFriendlyString: targetDate.getDate() + ' ' + monthsMap[targetDate.getMonth()] + ' ' + targetDate.getFullYear(),
        daysAdded: addDays,
        targetDateDayString: daysMap[targetDate.getDay()]
    }
}
