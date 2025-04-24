export const mentalHealthContent = (id) => {

    const htmlStr = `
    <div class="${id}__mental-health-container">
        <div class="${id}__mental-health">
            <div class="${id}__mental-health-inner">
                <h2 class="headline">Book Now</h2>
                <div class="mh-tags">
                    <div class="mh-tag hour-tag">3.5 Hours</div>
                    <div class="mh-tag certificate-tag">Certificate of learning</div>
                </div>
                <div class="mh-lists">
                    <ul class="mh-bullets">
                        <li class="mh-bullet bullet-one">Group bookings of 6-12 learners per course</li>
                        <li class="mh-bullet bullet-two">Face to face or virtual course options available</li>
                        <li class="mh-bullet bullet-three">From £520 + VAT</li>
                    </ul>
                </div>
                <div class="mh-button">
                    <a href="https://resources.redcrossfirstaidtraining.co.uk/enquire-mental-health-training">Enquire
                        Now</a>
                </div>
            </div>
        </div>
    </div>`;

    return htmlStr.trim();
};