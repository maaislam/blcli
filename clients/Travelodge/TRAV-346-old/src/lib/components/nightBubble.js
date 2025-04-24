const nightBubble = (ID) => {
  const chechInOptions = [
    {
      text: 'Today',
      value: 0,
    },
    {
      text: 'Tomorrow',
      value: 1,
    },
  ];

  const checkOutOptions = [
    {
      text: '1 night',
      value: 1,
    },
    {
      text: '2 nights',
      value: 2,
    },
    {
      text: '3 nights',
      value: 3,
    },

    {
      text: '7 nights',
      value: 7,
    },
  ];

  const htmlStr = `
    
    <div class="${ID}__bic-nightBubbles">
        <div class="${ID}__bic-nightBubbles--container" data-type="checkin">
            ${chechInOptions
              .map(
                (option) => `
            <div class="${ID}__bic-nightBubbles--bubble" data-value="${option.value}" >
                <span data-value="${option.value}" >${option.text}</span>
            </div>
            `
              )
              .join('')}
        </div>
        <div class="${ID}__bic-nightBubbles--container" data-type="checkout">
            ${checkOutOptions
              .map(
                (option) => `
            <div class="${ID}__bic-nightBubbles--bubble" data-value="${option.value}" >
                <span data-value="${option.value}" >${option.text}</span>
            </div>
            `
              )
              .join('')}

        </div>

    
    </div>
      
  
  `;

  return htmlStr;
};

export default nightBubble;
