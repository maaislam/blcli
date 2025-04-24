const renderLabelContent = (id, data, labels) => {
  const htmlStr = ({ attendeeLabel, successAttendeeLabel, successAttendeeIcon, addIcon, minusIcon, arrowIcon }, renderType) =>
    `
    <div class="${id}__newLabel">
        ${
          renderType === 'success'
            ? `
                <span class="tick-icon">${successAttendeeIcon}</span>
                <span class="success-message">${successAttendeeLabel}</span>
                <span class="arrow arrow-success">${arrowIcon}</span>
                `
            : `
                <span class="add-icon">${addIcon}</span>
                <span class="minus-icon">${minusIcon}</span>
                <span class="message">${attendeeLabel}</span>
                <span class="arrow">${arrowIcon}</span>
                `
        }
      
    </div>
    `;

  labels.forEach((label) => {
    const renderType = label.dataset.message;
    console.log(renderType);
    label.innerHTML = htmlStr(data, renderType);
  });
};

export default renderLabelContent;
