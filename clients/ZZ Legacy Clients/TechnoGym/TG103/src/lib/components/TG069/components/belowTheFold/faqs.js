import { __, getLanguage } from '../../../../helpers';

export default () => {
  const specContainer = document.querySelector('.TG103-specification');
  const faqSection = document.createElement('div');
  faqSection.classList.add('TG103-faqs');
  faqSection.classList.add('TG103-container');
  faqSection.innerHTML = `<h2>${__('FAQ\'s')}</h2><div class="TG103-faq_questions"></div><div class="TG103-faqs_all"><div class="TG103-button TG103-secondary_button"><a target="_blank"href="${__('https://www.technogym.com/gb/myrun-faqs/')}">${__('View All FAQ\'s')}</a></div></div>`;
  specContainer.appendChild(faqSection);

  const allFaqs = {
    [`${__('WHAT TABLETS ARE COMPATIBLE WITH THE MYRUN APP?')}`]: [`${__('The MYRUN App is available in an Android and Apple iPad version: Compatible Android Tablets: the majority of Android tablets with the Android 4.2 operating system or later, and specifically, with Samsung TAB S 8.4; Samsung TAB S 10.5; Samsung TAB 4 10.0; Samsung TAB 4 10.1and Google Nexus 9.  - Compatible iOS Tablets: iPad Pro (9.7”); iPad mini 4; iPad mini 3; iPad mini 2; iPad mini ; iPad Air 2; iPad Air; iPad with Retina display; iPad (3rd generation) and iPad (2nd generation). iOS 8.0 or later is required.')}`],
    [`${__('CAN I CREATE A GOAL-BASED TRAINING PROGRAM?')}`]: [`${__('By going to the “MY PROGRAM” section on the MYRUN App, you can create a training schedule on your MYRUN to help you meet a training goal that you want to achieve. For example, running a 10-mile race in 1-2 months. By analyzing your responses to a few simple questions (number of miles you want to run, the time it takes you, number of training sessions/week that you want to complete), the MYRUN App creates a training schedule to help you to reach your chosen target.')}`],
    [`${__('I WANT TO REPLICATE THE OUTDOOR RUNS I HAVE RECORDED ON GPS APPS OR DEVICES LIKE THE TECHNOGYM APP, RUNKEEPER, MAPMYFITNESS, STRAVA, POLAR, GARMIN OR FITBIT ON THE MYRUN. HOW CAN I DO THIS?')}`]: `${__('If you use the Technogym App to record outdoor runs, just go to the "my exercises" section on the MYRUN App, where you can find the runs you have recorded and replicate these on your MYRUN. Where you have used other GPS applications or devices, such as RunKeeper, MapMyFitness, Strava, Polar, Garmin or Fitbit, you can connect your account on these platforms to your Technogym account on the MYRUN App: to do this, just connect to the site mywellness.com, insert the email address and password you used to register on the MYRUN App and go to SETTINGS - LINKED ACCOUNTS; by connecting to your Strava account to your Technogym account, for example, you\'ll be able to see the runs recorded on this app on the MYRUN App (in the "my training" section), and will subsequently be able to replicate these on MYRUN.')}`,
  };

  Object.keys(allFaqs).forEach((i) => {
    const data = allFaqs[i];
    const faqQuestion = document.createElement('div');
    faqQuestion.classList.add('TG103-faq_question');
    faqQuestion.innerHTML = `<h4>${[i][0]}</h4><p>${data}</p>`;
    document.querySelector('.TG103-faq_questions').appendChild(faqQuestion);
  });


  // On click of the FAQs
  const faqQuestion = document.querySelectorAll('.TG103-faq_question');

  const showAnswer = (e) => {
    e.preventDefault();
    const active = document.querySelector('.TG103_faq-active');
    if (active) {
      active.classList.remove('TG103_faq-active');
    }
    // close or show based on whether the question is currently active
    if (e.currentTarget === active) {
      e.currentTarget.classList.remove('TG103_faq-active');
    } else {
      e.currentTarget.classList.add('TG103_faq-active');
    }
  };

  faqQuestion.forEach((node) => {
    node.addEventListener('click', showAnswer);
  });
};
