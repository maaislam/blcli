export const topHeader = `
  <h1></h1>
  <span>Get the medication you need in minutes</span>
  <div class="PU005-ticks"/>
  <a class="btn_seeadoctor_black PU5-book" href="https://patient.pushdoctor.co.uk/see-a-doctor-2/select-time">Book an appointment</a>
`;

export const pageMarkup = `
  <div class="PU5-wrap PU5-prescriptions"/>
  <div class="PU5-wrap PU5-about"/>
  <div class="PU5-wrap PU5-trustpilot"/>
  <div class="PU5-wrap PU5-available_prescriptions"/>
  <div class="PU5-wrap PU5-faq_content" id="#PU5-faq"/>
`;

export const prescriptionContent = `
  <span class="PU5-section-title">What type of prescription do you need?</span>
  <div class="PU5-prescriptions_inner">
    <div class="PU5-types_wrap"/>
  </div>
`;

export const aboutContent = `
  <h2>About us</h2>
  <span>The UK's #1 online doctor</span>
  <p>With Push Doctor, you can see a doctor at a time and place to suit you. 9/10 customers get a resolution in their first 10 minute consultation.</p>
  <div class="PU5-wrap PU5-logos"/>
  <div class="PU5-wrap PU5-twoBlocks"/>
`;

export const trustpilotContent = `
  <h2>Here's what our customers say...</h2>
  <div class="PU5-trustpilot_video">
  <iframe width="560" height="315" src="https://www.youtube.com//embed/videoseries?list=PLwq6alYNgqek3LtUmrBqIlA_FKGdMo3Rf" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
  <div class="PU5-trustpilot_total"/>
  <a href="https://uk.trustpilot.com/review/pushdoctor.co.uk">See us on trustpilot</a>
`;

export const accordionContent = `
  <div class="PU5-wrap PU5-available_prescriptions">
    <h2>Prescriptions when you need them</h2>
    <p>We'll send your prescription direct to your local pharmacy. Admin fee = £8 + the cost of medication at the pharmacy</p>
  </div>
  <div class="PU5-wrap PU5-accordion"/>
  <div class="PU5-wrap PU5-faq"/>
`;

export const ticks = [
  ['Book an appointment and speak to a doctor online <span class="PU005-time"/>'],
  ['Discuss your prescription needs'],
  ['Prescription sent directly to your local pharmacy, ready for you to pick up that same day'],
];

export const prescriptionTypes = [
  ['Repeat', '#PU5-repeat'],
  ['Same-day', '#PU5-sameday'],
  ['Emergency', '#PU5-emergency'],
  ['Contraception', '#PU5-contraception'],
  ['Other', '#PU5-other'],
];

export const aboutBlocks = {
  blockOne: {
    title: 'Our doctors',
    content: '<p>All Push Doctor GPs are NHS-trained. Every doctor in our network is registered with the General Medical Council (GMC), the organisation responsible for overseeing medical practitioners in the UK.</p>',
    image: 'https://via.placeholder.com/100x100',
    link: '<a href="https://www.pushdoctor.co.uk/meet-our-gp-doctors">Read more about our doctors</a>',
  },
  blockTwo: {
    title: 'How it works',
    content: '<li>Book a 10 minute slot with one of our online GPs</li><li>Discuss your health concerns and prescription needs</li><li>Pick up your medication at your local pharmacy the same day.</li><li>Our GPs are available 6am - 11pm, 7 days a week</li>',
    image: 'https://via.placeholder.com/100x100',
    link: '<a href="https://www.pushdoctor.co.uk/how-it-works">Read more about how it works</a>',
  },
};

export const logoImages = [
  ['https://www.pushdoctor.co.uk/hubfs/PDR_Global_6_logo_images/Landing-page-desktop_12.png?t=1517393294473'],
  ['https://www.pushdoctor.co.uk/hubfs/PDR_Global_6_logo_images/Landing-page-desktop_07.png?t=1517393294473'],
  ['https://www.pushdoctor.co.uk/hubfs/Landing-page-desktop_itv.png?t=1517393294473'],
  ['https://www.pushdoctor.co.uk/hubfs/PDR_Global_6_logo_images/Landing-page-desktop_08.png?t=1517393294473'],
  ['https://www.pushdoctor.co.uk/hubfs/PDR_Global_6_logo_images/Landing-page-desktop_11.png?t=1517393294473'],
  ['https://www.pushdoctor.co.uk/hubfs/PDR_Global_6_logo_images/Landing-page-desktop_10.png?t=1517393294473'],
];

export const accordion = {
  repeat: {
    type: 'PU5-repeat',
    title: 'Repeat prescriptions ',
    content: [
      ['We can issue prescriptions for medication that lasts up to one month, or in some cases, three months.'],
      ["If you're running low on an existing repeat prescription, our GPs can write you a top-up in minutes."],
      ['Get your prescription when it suits you. Our GPs are available 6am - 11pm and will send the prescription straight to your local pharmacy.'],
    ],
  },
  sameday: {
    type: 'PU5-sameday',
    title: 'Same-day prescriptions',
    content: [
      ['Discuss your health concerns with our GPs and get a prescription in minutes.'],
      ['Your prescription is sent straight to your local pharmacy, ready for you to pick up that same day.'],
      ['We\'ll send you a text message as soon as your prescription can be collected.'],
    ],
  },
  emergency: {
    type: 'PU5-emergency',
    title: 'Emergency prescriptions',
    content: [
      'If you don\'t have time to wait for an appointment at your GP clinic, you can book an appointment with Push Doctor and see a GP in minutes.',
      'Discuss your health concerns, and have your prescription sent straight to your local pharmacy where you can collect it that same day',
      'We\'ll send you a text as soon as your prescription is ready.',
    ],
  },
  contraception: {
    type: 'PU5-contraception',
    title: 'Contraception',
    content: [
      'Get a contraceptive solution to suit you, privately and quickly. Our GPs are on hand to discuss options and address any worries you might have.',
      'We can help with both regular contraception prescriptions, and emergency contraception.',
      'Prescriptions are sent to your local pharmacy, where you can collect it that same day.',
    ],
  },
  other: {
    type: 'PU5-other',
    title: 'Other',
    content: [
      'Our GPs can prescribe a wide range of medication, and will always discuss your medical concerns thoroughly before writing a prescription.',
      'We\'ve got appointments available in minutes.',
      'Prescriptions can be picked up at your local pharmacy that same day.',
    ],
  },
};

export const repeatPrescriptions = [
  ['We can issue prescriptions for medication that lasts up to one month or in some cases, three months.'],
  ['We can also offer a top-up for an existing repeat prescription. It may be faster and more convenient to get a top-up through Push Doctor.'],
  ['Get your prescription around your schedule. We\'ll send it directly to your preferred pharmacy, ready to pick up.'],
];

export const faqs = {
  faq1: {
    question: 'How will I get my prescription?',
    answer: 'We\'ll send your online prescription to your local pharmacy immediately after your consultation, or we can send it out to you in the post (first class).<br></br>Often, you\'ll be able to collect it within a few hours. We\'ll send you a text when it\'s ready.',
  },
  faq2: {
    question: "Is there anything you can't prescribe?",
    answer: 'We can\'t prescribe any controlled drugs - this includes sedatives, strong painkillers, unlicensed medication or anything that requires a specialist consultation.',
  },
  faq3: {
    question: 'What do I say at the pharmacy when I go to collect my medication?',
    answer: 'Just tell the pharmacy that you\'ve come to collect a private prescription from Push Doctor. They should then ask you to confirm your name, address and date of birth, and take payment for your prescription.',
  },
};

export const faqContent = '<h2>FAQs</h2><div class="PU5-faq_slider"/>';
