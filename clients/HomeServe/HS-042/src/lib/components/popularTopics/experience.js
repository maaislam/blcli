import { penIcon } from '../../assets/icons';

const experience = () => {
  const html = `
        <div class="experienceSection">
            <div class="experienceContainer">
                <div class="experienceContainer-header">
                    <h1>Unhappy with your experience?</h1>
                    <p>Here at HomeServe we always aim to provide our customers with the best possible service, but
                        unfortunately sometimes things can go wrong.</p>
                    <p>Letting us know when you're unhappy with your experience gives us the opportunity to put things right and
                        make sure that we continue to improve to deliver the best possible service in the future.</p>
                </div>
                <div class="experienceContainer-content">
                    <div class="experienceContainer-item write-to-us-item">
                        <div class="experienceContainer-item-header">
                            <h2>
                            <span>${penIcon}</span>
                            Write to us
                            </h2>
                            <p>You can send your complaint via post to:</p>
                        </div>
                        <div class="experienceContainer-item-text">
                            <p class="experienceContainer-item-description">Freepost RLYC-LXAL-GEEH</p>
                            <p class="experienceContainer-item-description">Customer Relations Department</p>
                            <p class="experienceContainer-item-description">HomeServe Membership Ltd</p>
                            <p class="experienceContainer-item-description">Walsall</p>
                            <p class="experienceContainer-item-description">West Midlands</p>
                            <p class="experienceContainer-item-description">WS2 7BN</p>
                        </div>
                    </div>

                    <div class="experienceContainer-item form-item">
                        <div class="experienceContainer-item-header">
                            <h2>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27" viewBox="0 0 24 27" fill="none">
                                    <path d="M21.3333 2.63379H15.76C15 0.557182 12.7067 -0.507742 10.6667 0.237705C9.52 0.637052 8.66667 1.51561 8.24 2.63379H2.66667C1.95942 2.63379 1.28115 2.91428 0.781048 3.41356C0.280951 3.91284 0 4.59001 0 5.2961V23.9323C0 24.6384 0.280951 25.3155 0.781048 25.8148C1.28115 26.3141 1.95942 26.5946 2.66667 26.5946H21.3333C22.0406 26.5946 22.7189 26.3141 23.219 25.8148C23.719 25.3155 24 24.6384 24 23.9323V5.2961C24 4.59001 23.719 3.91284 23.219 3.41356C22.7189 2.91428 22.0406 2.63379 21.3333 2.63379ZM12 2.63379C12.3536 2.63379 12.6928 2.77403 12.9428 3.02367C13.1929 3.27331 13.3333 3.6119 13.3333 3.96494C13.3333 4.31799 13.1929 4.65657 12.9428 4.90621C12.6928 5.15585 12.3536 5.2961 12 5.2961C11.6464 5.2961 11.3072 5.15585 11.0572 4.90621C10.8071 4.65657 10.6667 4.31799 10.6667 3.96494C10.6667 3.6119 10.8071 3.27331 11.0572 3.02367C11.3072 2.77403 11.6464 2.63379 12 2.63379ZM5.33333 7.95841H18.6667V5.2961H21.3333V23.9323H2.66667V5.2961H5.33333V7.95841ZM18.6667 13.283H5.33333V10.6207H18.6667V13.283ZM16 18.6077H5.33333V15.9453H16V18.6077Z" fill="#E62419"></path>
                                    </svg>
                                </span>
                            Online form
                            </h2>
                            <p>You can fill in our online form.</p>
                        </div>
                        <a href="https://www.homeserve.co.uk/send-us-complaint"
                        class="complete-form">Complete form</a>
                    </div>


                    <div class="experienceContainer-item speak-to-us-item">
                        <div class="experienceContainer-item-header">
                            <h2>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M4.72 2.66667C4.8 3.85333 5 5.01333 5.32 6.12L3.72 7.72C3.17333 6.12 2.82667 4.42667 2.70667 2.66667H4.72ZM17.8667 18.6933C19 19.0133 20.16 19.2133 21.3333 19.2933V21.28C19.5733 21.16 17.88 20.8133 16.2667 20.28L17.8667 18.6933ZM6 0H1.33333C0.6 0 0 0.6 0 1.33333C0 13.8533 10.1467 24 22.6667 24C23.4 24 24 23.4 24 22.6667V18.0133C24 17.28 23.4 16.68 22.6667 16.68C21.0133 16.68 19.4 16.4133 17.9067 15.92C17.7743 15.872 17.6341 15.8494 17.4933 15.8533C17.1467 15.8533 16.8133 15.9867 16.5467 16.24L13.6133 19.1733C9.8339 17.2405 6.75948 14.1661 4.82667 10.3867L7.76 7.45333C8.13333 7.08 8.24 6.56 8.09333 6.09333C7.58753 4.55741 7.33095 2.9504 7.33333 1.33333C7.33333 0.6 6.73333 0 6 0Z" fill="#E62419"></path>
                                    </svg>
                                </span>
                                Speak to us
                            </h2>
                            <p>Our customer service department is open 24/7, 365 days a year</p>
                        </div>
                        <div class="contact-info">
                            <p>By Phone <a href="tel:03300247002" class="phone">0330 0247 002*</a></p>
                            <p>By Textphone <a href="tel:1800103300247999" class="textphone">18001 0330 0247 999</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  return html;
};

export default experience;
