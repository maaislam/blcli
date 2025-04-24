export const mentalHealthContent = (id) => {

    let onlineLearningPrice = '£40 (excl VAT) per learner';
    let onlineLearningTime = '1 Hour';
    let bookNowCTAHref = 'https://brctraining.accessplanit.com/accessplan/checkout/AddItems?coursedateid=1275574';

    let course1LearningTime = '2 Hours';

    if (window.location.href.includes('courses/mental-health-at-work/stress-awareness-at-work') || window.location.href.includes('/courses/mental-health-at-work/dealing-with-distressed-callers')) {
        onlineLearningPrice = '£50 (excl VAT) per learner';
        onlineLearningTime = '1.5 Hours';

        course1LearningTime = '3.5 Hours';
    }

    if (window.location.href.includes('courses/mental-health-at-work/stress-awareness-at-work')) {
        bookNowCTAHref = 'https://brctraining.accessplanit.com/accessplan/checkout/AddItems?coursedateid=1280577';
    }

    if (window.location.href.includes('courses/mental-health-at-work/dealing-with-distressed-callers')) {
        bookNowCTAHref = 'https://brctraining.accessplanit.com/accessplan/checkout/AddItems?coursedateid=1280578';
    }


  const htmlStr = `
    <div class="${id}__mental-health-container">
        <div class="${id}__mental-health">
            <div class="${id}__mental-health-inner">
                <h2 class="headline">Trainer Led Learning</h2>
                <div class="mh-tags">
                    <div class="mh-tag hour-tag">${course1LearningTime}</div>
                    <div class="mh-tag certificate-tag">Certificate of learning</div>
                </div>
                <div class="mh-lists">
                    <ul class="mh-bullets">
                        <li class="mh-bullet bullet-one">Group bookings of 6-12 learners per course</li>
                        <li class="mh-bullet bullet-two">Face to face or virtual course options</li>
                        <li class="mh-bullet bullet-three">From £520 (excl VAT) per group</li>
                    </ul>
                </div>
                <div class="mh-button">
                    <a class="group-booking" href="https://resources.redcrossfirstaidtraining.co.uk/enquire-mental-health-training">Enquire
                        Now</a>
                </div>
            </div>
        </div>
        <div class="${id}__mental-health second-block">
            <div class="${id}__mental-health-inner">
                <h2 class="headline">Online Learning</h2>
                <div class="mh-tags">
                    <div class="mh-tag hour-tag">${onlineLearningTime}</div>
                    <div class="mh-tag certificate-tag">Certificate of learning</div>
                </div>
                <div class="mh-lists">
                    <ul class="mh-bullets">
                        <li class="mh-bullet bullet-one">Individual or multiple learner bookings</li>
                        <li class="mh-bullet bullet-two">${onlineLearningPrice}                       
                        </li>
                    </ul>
                </div>
                <div class="mh-button">
                    <a href="${bookNowCTAHref}">Book
                        Now</a>
                </div>
            </div>
        </div>
    </div>`;

  return htmlStr.trim();
};
