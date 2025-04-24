import shared from "./shared";

const calculateChristmasCountdown = () => {

    const { ID } = shared;
    
    //Get today's date.
    const now = new Date();
 
    //Get the current month. Add a +1 because
    //getMonth starts at 0 for January.
    const currentMonth = (now.getMonth() + 1);
 
    //Get the current day of the month.
    const currentDay = now.getDate();
 
    //Work out the year that the next Christmas
    //day will occur on.

    const nextChristmasYear = now.getFullYear();
    if(currentMonth == 12 && currentDay > 25){
        //This year's Christmas Day has already passed.
        nextChristmasYear = nextChristmasYear + 1;
    }
 
    const nextChristmasDate = nextChristmasYear + '-12-25T00:00:00.000Z';
    const christmasDay = new Date(nextChristmasDate);
 
    //Get the difference in seconds between the two days.
    let diffSeconds = Math.floor((christmasDay.getTime() - now.getTime()) / 1000);
 
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
 
    //Don't calculate the time left if it is Christmas day.
    if(currentMonth != 12 || (currentMonth == 12 && currentDay != 25)){
        //Convert these seconds into days, hours, minutes, seconds.
        days = Math.floor(diffSeconds / (3600*24));
        diffSeconds  -= days * 3600 * 24;
        hours   = Math.floor(diffSeconds / 3600);
        diffSeconds  -= hours * 3600;
        minutes = Math.floor(diffSeconds / 60);
        diffSeconds  -= minutes * 60;
        seconds = diffSeconds;
    }
 
    //Add our counts to their corresponding HTML elements.
    document.querySelector(`.${ID}-xmasCountdown #days h4`).innerHTML = days;
    document.querySelector(`.${ID}-xmasCountdown #hours h4`).innerHTML = hours;
    document.querySelector(`.${ID}-xmasCountdown #minutes h4`).innerHTML = minutes;
    document.querySelector(`.${ID}-xmasCountdown #seconds h4`).innerHTML = seconds;
 
    //Recursive call after 1 second using setTimeout
    setTimeout(calculateChristmasCountdown, 1000);
}
 
export default calculateChristmasCountdown;