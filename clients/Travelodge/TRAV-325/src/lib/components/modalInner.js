const modalInner = () => {
  const boxItems = [
    {
      imgPath: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" fill="none">
                <path d="M8.33903 10.5715C9.26114 8.97439 10.607 7.66335 12.2277 6.78336C13.8484 5.90338 15.6809 5.48872 17.5226 5.58524C19.3643 5.68176 21.1435 6.28569 22.6633 7.33027C24.1832 8.37485 25.3846 9.81939 26.1347 11.5042M6.03906 7.46574L6.95083 11.4152C7.10612 12.0878 7.77731 12.5072 8.44997 12.3519L12.3994 11.4402M25.6596 20.5714C24.7375 22.1685 23.3917 23.4796 21.7709 24.3596C20.1502 25.2396 18.3177 25.6542 16.476 25.5577C14.6343 25.4612 12.8551 24.8572 11.3353 23.8127C9.8154 22.7681 8.61399 21.3235 7.86388 19.6388M27.9596 23.6772L27.0478 19.7278C26.8925 19.0551 26.2213 18.6357 25.5486 18.791L21.5992 19.7028" stroke="#292929" stroke-width="2" stroke-linecap="round"/>
                </svg>`,
      text: 'Cancel until 12pm on arrival day',
    },
    {
      imgPath: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M23.75 8.125C23.75 9.85089 19.8325 11.25 15 11.25C10.1675 11.25 6.25 9.85089 6.25 8.125M23.75 8.125C23.75 6.39911 19.8325 5 15 5C10.1675 5 6.25 6.39911 6.25 8.125M23.75 8.125V23.125C23.75 24.8509 19.8325 26.25 15 26.25C10.1675 26.25 6.25 24.8509 6.25 23.125V8.125M23.75 13.125C23.75 14.8509 19.8325 16.25 15 16.25C10.1675 16.25 6.25 14.8509 6.25 13.125M23.75 18.125C23.75 19.8509 19.8325 21.25 15 21.25C10.1675 21.25 6.25 19.8509 6.25 18.125" stroke="#292929" stroke-width="1.875"/>
                </svg>`,
      text: 'Get a total refund or amend for FREE',
    },
    {
      imgPath: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <rect x="5" y="11.25" width="20" height="15" rx="5" stroke="#292929" stroke-width="1.875"/>
                    <path d="M15 20L15 17.5" stroke="#292929" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.3334 6.42786C18.6294 6.85271 19.2137 6.95719 19.6385 6.66123C20.0634 6.36528 20.1679 5.78095 19.8719 5.35611L18.3334 6.42786ZM10.3477 5.06078C10.026 5.46647 10.0941 6.05614 10.4998 6.37786C10.9055 6.69957 11.4952 6.63149 11.8169 6.2258L10.3477 5.06078ZM10.9375 11.25V8.75H9.0625V11.25H10.9375ZM10.9375 8.75C10.9375 6.50634 12.7563 4.6875 15 4.6875V2.8125C11.7208 2.8125 9.0625 5.47081 9.0625 8.75H10.9375ZM19.8719 5.35611C19.1638 4.33962 18.1555 3.57008 16.9882 3.15526L16.3603 4.92202C17.159 5.20584 17.8489 5.73237 18.3334 6.42786L19.8719 5.35611ZM16.9882 3.15526C15.8209 2.74045 14.553 2.70113 13.3623 3.04283L13.8795 4.84509C14.6942 4.6113 15.5616 4.6382 16.3603 4.92202L16.9882 3.15526ZM13.3623 3.04283C12.1715 3.38453 11.1175 4.09012 10.3477 5.06078L11.8169 6.2258C12.3435 5.56166 13.0647 5.07889 13.8795 4.84509L13.3623 3.04283Z" fill="#292929"/>
                </svg>`,
      text: 'Rates fluctuate daily - lock them in now',
    },
  ];

  const closeElem = `
                <div class="modal__close">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="12"
                        viewBox="0 0 11 12"
                        fill="none">
                        <line y1="-1"
                            x2="13.6614"
                            y2="-1"
                            transform="matrix(-0.68132 0.731986 -0.792628 -0.609706 9.30786 0)"
                            stroke="#1F1F1F"
                            stroke-width="2" />
                        <line y1="-1"
                            x2="13.6615"
                            y2="-1"
                            transform="matrix(-0.681367 -0.731942 0.79259 -0.609755 11.0009 9.99945)"
                            stroke="#1F1F1F"
                            stroke-width="2" />
                    </svg>
                </div>
  `;

  const htmlString = `

            <div class="pop_up_box">
                <div class="pop_up_box_contents">
                <div class="heading_text">
                <span>Before you move on, did you know we offer flexible rates?</span>
                    ${closeElem}
                </div>
                <div class="box_contents">
                
                <div class="box_items">
                <div class="box_points">
                    <div class="box_heading">
                    <span>Don’t risk losing money if plans change!</span>
                </div>
                ${boxItems
                  .map((item) => {
                    return `
                    <div class="point">
                    ${item.imgPath}
                    <span>${item.text}</span>
                    </div>
                    `;
                  })
                  .join('')}

                <div class="box_btn" data-click="flexible">
                    <span>Add flexible rate | £18 total</span>
                </div>
                
                </div>
                <div class="box_img">
                    <img src="https://media.travelodge.co.uk/image/upload/c_fill,g_south,h_400,w_626/v1664795513/Rebase/Zebrano-Tlplus-DN.webp" alt="">
                </div>
                </div>
                
                </div>
            
                </div>
                <div class="box_cta_div">
                <div class="box_total">
                    <span>Total:</span>
                    <span>£570.43</span>
                </div>
                <div class="box-cta" data-click="proceed">
                    <span>Proceed to Extras</span>
                </div>
                </div>
            </div>
    
    
    `;
  return htmlString;
};

export default modalInner;
