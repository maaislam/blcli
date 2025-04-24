const hirelonger = (ID, numberOfDays) => {
  const extraDays = 7 - numberOfDays;
  const htmlStr = `<div class='${ID}__hireLonger' data-numberOfDays='${numberOfDays}'>
    <div class='${ID}__hireLonger-offer'>${extraDays} extra day${extraDays > 1 ? 's' : ''} free</div>
    <div class='${ID}__hireLonger-header'>
      <div class='${ID}__hireLonger-header-title'>Hire longer at no extra cost</div>
      <div class='${ID}__hireLonger-header-details'>Hiring for 7 days is the same as ${numberOfDays} days, giving you more time for the same price.</div>
    </div>
    <div class='${ID}__hireLonger-options'>
      <form>
        <label class='${ID}__hireLonger-option hirelonger'>
          <input type="radio" id="hireDayWise" name="hireOption" value="1">
          <span for="hireDayWise">Hire for 7 days</span>
        </label>
        <label class='${ID}__hireLonger-option ${ID}__active no-thanks'>
          <input type="radio" id="noThanks" name="hireOption" value="2" checked="checked">
          <span for="noThanks">No thanks</span>
        </label>
      </form>
    </div>
    <div class="${ID}__enddate-label">
      <span class='${ID}__hireLonger-endDateText'>New end date:</span>
      <span class='${ID}__hireLonger-date'>10/10/2023</span>
    </div>
    
  </div>`;

  return htmlStr;
};

export default hirelonger;
