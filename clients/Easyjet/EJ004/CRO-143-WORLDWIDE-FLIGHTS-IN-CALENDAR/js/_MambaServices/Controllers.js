function isCalendarReturnPicker() {
    const isReturnPicker = angular.element(document.querySelector(".route-date-picker-month")).controller()._scope.IsReturnDatePicker;
    return isReturnPicker;
};


module.exports  = {
    isCalendarReturnPicker
};