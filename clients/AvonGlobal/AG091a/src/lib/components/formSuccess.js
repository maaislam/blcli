const renderFormSuccess = (id, anchorElem) => {
  const htmlStr = `
    <div class="${id}__ordersubmit">
        <div class="${id}__close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.6129 0.209705C1.22061 -0.0953203 0.653377 -0.0675907 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L4.58579 6L0.292893 10.2929L0.209705 10.3871C-0.0953203 10.7794 -0.0675907 11.3466 0.292893 11.7071C0.683418 12.0976 1.31658 12.0976 1.70711 11.7071L6 7.41421L10.2929 11.7071L10.3871 11.7903C10.7794 12.0953 11.3466 12.0676 11.7071 11.7071C12.0976 11.3166 12.0976 10.6834 11.7071 10.2929L7.41421 6L11.7071 1.70711L11.7903 1.6129C12.0953 1.22061 12.0676 0.653377 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L6 4.58579L1.70711 0.292893L1.6129 0.209705Z" fill="#707677"/>
            </svg>
        </div>
        <div class="${id}__icon">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none">
                <path d="M32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0ZM32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2ZM43.6925 24.2786C44.0603 24.6317 44.0996 25.1982 43.8026 25.5966L43.7214 25.6925L30.2814 39.6925C29.9181 40.071 29.3315 40.1001 28.9338 39.7799L28.8386 39.6925L21.2786 31.8175C20.8961 31.4191 20.9091 30.7861 21.3075 30.4036C21.6752 30.0506 22.2429 30.0344 22.6289 30.3474L22.7214 30.4325L29.56 37.555L42.2786 24.3075C42.6611 23.9091 43.2941 23.8961 43.6925 24.2786Z"
                        fill="#1A8282" />
            </svg>
        </div>
        <div class="${id}__success-messages">
            <div class="title">Order sent</div>
            <div class="paragraph">
                Thanks! Your order has successfully been submitted and your Rep will be in touch shortly.
            </div>
        </div>
        <div class="${id}__success-closebtn">
            Back to brochures
        </div>
    </div>`;

  anchorElem.insertAdjacentHTML('beforeend', htmlStr);
};

export default renderFormSuccess;
