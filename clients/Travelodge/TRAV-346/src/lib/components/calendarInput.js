import nightBubble from './nightBubble';

const calendarInput = (ID) => {
  const separatorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
        <path d="M8.293 2.79303C8.48053 2.60556 8.73484 2.50024 9 2.50024C9.26516 2.50024 9.51947 2.60556 9.707 2.79303L14.207 7.29303C14.3945 7.48056 14.4998 7.73487 14.4998 8.00003C14.4998 8.26519 14.3945 8.5195 14.207 8.70703L9.707 13.207C9.5184 13.3892 9.2658 13.49 9.0036 13.4877C8.7414 13.4854 8.49059 13.3803 8.30518 13.1948C8.11977 13.0094 8.0146 12.7586 8.01233 12.4964C8.01005 12.2342 8.11084 11.9816 8.293 11.793L11 9.00003H1.5C1.23478 9.00003 0.98043 8.89467 0.792893 8.70714C0.605357 8.5196 0.5 8.26525 0.5 8.00003C0.5 7.73481 0.605357 7.48046 0.792893 7.29292C0.98043 7.10539 1.23478 7.00003 1.5 7.00003H11L8.293 4.20703C8.10553 4.0195 8.00021 3.76519 8.00021 3.50003C8.00021 3.23487 8.10553 2.98056 8.293 2.79303Z" fill="#1280C1"/>
        </svg>`;

  const htmlStr = `
    <div class="${ID}__bic-datepicker">
        <label for="calendar-input">When?</label>
        <div class="${ID}___bic-datepicker--daterange">
            <span class="${ID}-checkin">Check in</span>
            <span class="${ID}-separator">${separatorSvg}</span>
            <span class="${ID}-checkout">Check out</span> 
        </div>
        ${nightBubble(ID)}
        <input id="calendar-input" type="text" />
    </div>`;

  return htmlStr;
};

export default calendarInput;
