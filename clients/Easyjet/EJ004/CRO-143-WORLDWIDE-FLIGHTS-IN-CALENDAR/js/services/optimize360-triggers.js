function triggerIsFormInputValuesEmpty() {
    let originValue    = document.querySelector('input[id*="origin-"]').value;
    let departureValue = document.querySelector('input[id*="destination-"]').value;

    if (originValue !== '' && departureValue !== '') {
        console.log("fields not empty");
        return true;
    } else {
        return false;
    };
};

function checkTriggerDestination(){
	var originValueIATA         = document.querySelector('input[id*="origin-"]').value.match(/\((.*)\)/)[1];
	var destinationValueIATA    = document.querySelector('input[id*="destination-"]').value.match(/\((.*)\)/)[1];

	if (originValueIATA === "EDI" && destinationValueIATA === "PMI") {
		return true;
	}
};

module.exports  = {
    triggerIsFormInputValuesEmpty,
	checkTriggerDestination
};