const menuData = [
  {
    mainNav: 'Home care options',
    mainUrl: '/home-care-services/',
    subCategory: [
      {
        title: 'Live in care',
        imgUrl: 'https://www.helpinghandshomecare.co.uk/wp-content/uploads/middle-aged-man-smiling-at-his-live-in-carer_4x1.jpg',
        pageUrl: '/live-in-care/',
        subTitle: 'A carer lives with you in your home, offering round-the-clock support for peace of mind.',
      },
      {
        title: 'Visiting care',
        imgUrl:
          'https://www.helpinghandshomecare.co.uk/wp-content/uploads/elderly-lady-opening-the-door-to-her-visiting-carer_4x1.jpg',
        pageUrl: '/visiting-care/',
        subTitle: 'Regular and reliable support with visits as little or as often as you need.',
      },
      {
        title: 'Respite care',
        imgUrl: 'https://www.helpinghandshomecare.co.uk/wp-content/uploads/elderly-man-smiling-with-respite-carer_4x1.jpg',
        pageUrl: '/home-care-services/respite-care/',
        subTitle: 'Short-term support where the quality of your care is never compromised.',
      },
    ],
    sideBarContent: [
      {
        title: 'What are the costs of care?',
        bulletImg: 'question-circle',
        subtitle: 'Learn more about the cost of our care and available funding options.',
        url: '/costs-funding/',
      },
      {
        title: 'Looking for urgent care?',
        bulletImg: 'exclamation-triangle',
        subtitle: 'If you need urgent support, we’re available day and night to take your call.',
        url: '/home-care-services/emergency-home-care/',
      },
    ],
  },
  {
    mainNav: 'Emergency care',
    mainUrl: '/home-care-services/emergency-home-care/',
    subCategory: [
      {
        title: 'Emergency care',
        imgUrl:
          'https://www.helpinghandshomecare.co.uk/wp-content/uploads/emergency-carer-in-bedroom-helping-middle-aged-man-out-of-his-wheelchair_4x1.jpg',
        pageUrl: '/home-care-services/emergency-home-care/',
        subTitle: 'If circumstances leave you in need of urgent support, we’re here to help.',
      },
      {
        title: 'Long term care',
        imgUrl: 'https://www.helpinghandshomecare.co.uk/wp-content/uploads/elderly-lady-smiling-with-her-carer_4x1.jpg',
        pageUrl: '/home-care-services/',
        subTitle: 'Flexible care packages to assist you as long as you need care.',
      },
      {
        title: 'Palliative care',
        imgUrl:
          'https://www.helpinghandshomecare.co.uk/wp-content/uploads/palliative-carers-hand-on-top-of-elderly-persons-hand_4x1.jpg',
        pageUrl: '/home-care-services/fast-track-palliative-care/',
        subTitle: 'Specialist palliative support so your family can make the most of your time together.',
      },
    ],
    sideBarContent: [
      {
        title: 'What are the costs of care?',
        bulletImg: 'question-circle',
        subtitle: 'Learn more about the cost of our care and available funding options.',
        url: 'https://www.helpinghandshomecare.co.uk/costs-funding/',
      },
      {
        title: 'Looking for urgent care?',
        bulletImg: 'exclamation-triangle',
        subtitle: 'If you need urgent support, we’re available day and night to take your call.',
        url: 'https://www.helpinghandshomecare.co.uk/home-care-services/emergency-home-care/',
      },
    ],
  },
  {
    mainNav: 'What can we support with?',
    mainUrl: '/home-care-services/',
    subCategory: [
      {
        title: 'Domiciliary care',
        imgUrl:
          'https://www.helpinghandshomecare.co.uk/wp-content/uploads/domiciliary-carer-bringing-breakfast-in-bed-to-elderly-lady_4x1.jpg',
        pageUrl: '/home-care-services/domiciliary-care/',
        subTitle: 'Dedicated home care that’s built entirely around your needs and routines.',
      },
      {
        title: 'Health and personal care',
        imgUrl: 'https://www.helpinghandshomecare.co.uk/wp-content/uploads/carer-helping-elderly-lady-wash-her-face_4x1.jpg',
        pageUrl: '/home-care-services/personal-care/',
        subTitle: 'Dedicated personal care that is discreet and respectful of your personal boundaries.',
      },
      {
        title: 'Errands and shopping',
        imgUrl: 'https://www.helpinghandshomecare.co.uk/wp-content/uploads/carer-lifting-a-plate-out-of-the-dishwasher_4x1.jpg',
        pageUrl: '/home-care-services/housekeeping-services/errands-and-shopping/',
        subTitle: 'From social support to ensuring your fridge stays full, our support varies to suit you.',
      },
      {
        title: 'Companionship',
        imgUrl: 'https://www.helpinghandshomecare.co.uk/wp-content/uploads/carer-playing-cards-with-elderly-man_4x1.jpg',
        pageUrl: '/home-care-services/housekeeping-services/companionship-services/',
        subTitle: 'Our companionship care enables you to live the life you want, doing the things you love.',
      },
    ],
    sideBarContent: [],
  },
  {
    mainNav: 'Condition-led care',
    mainUrl: '/home-care-services/condition-led-care/',
    subCategory: [
      {
        title: 'Dementia care',
        imgUrl: '',
        pageUrl: '/home-care-services/dementia-care/',
        subTitle: 'Specialist dementia care with patience and understanding to support the entire family.',
      },
      {
        title: 'Elderly care',
        imgUrl: '',
        pageUrl: '/home-care-services/elderly-care/',
        subTitle: 'Comprehensive support that offers safety, independence and complete peace of mind.',
      },
      {
        title: 'Support for young adults',
        imgUrl: '',
        pageUrl: '/home-care-services/support-for-younger-people/',
        subTitle: 'Dedicated support that’s designed to inspire and empower you in work, study or play.',
      },
      {
        title: 'Complex care conditions',
        imgUrl: '',
        pageUrl: '/nursing-care/complex-care/',
        subTitle: 'Support that’s guided by our clinical team of nurses with extensive NHS experience.',
      },
      {
        title: 'Stroke care',
        imgUrl: '',
        pageUrl: '/nursing-care/neurological-care/stroke/',
        subTitle: 'Aftercare that is based entirely around your needs and delivered in the comfort of home.',
      },
      {
        title: 'Parkinson’s care',
        imgUrl: '',
        pageUrl: '/nursing-care/neurological-care/parkinsons/',
        subTitle: 'Our Parkinson’s care empowers you to active, independent and in control of your routine.',
      },
      {
        title: 'Cancer care',
        imgUrl: '',
        pageUrl: '/home-care-services/condition-led-care/cancer-care/',
        subTitle: 'We’ll work alongside your medical professionals to provide the best care for you.',
      },
      {
        title: 'All conditions',
        imgUrl: '',
        pageUrl: '/home-care-services/condition-led-care/',
        subTitle: 'Our condition-led care is completely bespoke to your preferences, with no ‘one size fits all’.',
      },
    ],
    sideBarContent: [],
  },
  {
    mainNav: 'Costs of care',
    mainUrl: '/costs-funding/',
    subCategory: [
      {
        title: 'How much does care cost?',
        imgUrl: 'https://www.helpinghandshomecare.co.uk/wp-content/uploads/carer-and-elderly-lady-in-conversation_4x1.jpg',
        pageUrl: '/costs-funding/',
        subTitle: 'Find out the cost breakdown of our dedicated home care services.',
      },
      {
        title: 'Costs of live in care',
        imgUrl: 'https://www.helpinghandshomecare.co.uk/wp-content/uploads/elderly-lady-and-carer-smiling-together_4x1.jpg',
        pageUrl: '/costs-funding/cost-of-live-in-care/',
        subTitle: 'Our live-in care costs are clear and up-front, with no hidden costs or transaction fees.',
      },
      {
        title: 'Costs of visiting care',
        imgUrl:
          'https://www.helpinghandshomecare.co.uk/wp-content/uploads/carer-helping-elderly-man-walk-around-the-garden_4x1.jpg',
        pageUrl: '/costs-funding/costs-of-visiting-care/',
        subTitle: 'Our visiting care is bespoke to your needs, with clear and transparent costs.',
      },
      {
        title: 'Funding options',
        imgUrl: 'https://www.helpinghandshomecare.co.uk/wp-content/uploads/hand-holding-pen-and-using-a-calculator_4x1.jpg',
        pageUrl: '/costs-funding/funding-options/',
        subTitle: 'You may be eligible for social care funding. Click here to find out more.',
      },
    ],
    sideBarContent: [],
  },
  {
    mainNav: 'Jobs',
    mainUrl: '/jobs/',
    subCategory: [
      {
        title: 'Live-in carer jobs',
        imgUrl:
          'https://www.helpinghandshomecare.co.uk/wp-content/uploads/elderly-man-smiling-at-live-in-carer-while-playing-cards_4x1.jpg',
        pageUrl: '/jobs/live-in-carer-jobs/',
        subTitle: 'Become a live-in carer to receive excellent pay and benefits and make a real difference.',
      },
      {
        title: 'Visiting carer jobs',
        imgUrl:
          'https://www.helpinghandshomecare.co.uk/wp-content/uploads/elderly-lady-and-visiting-carer-sat-on-the-sofa-and-smiling-together_4x1.jpg',
        pageUrl: '/jobs/care-assistant-jobs/',
        subTitle: 'With competitive pay and career progression, we’ve become the care company of choice.',
      },
      {
        title: 'Office jobs',
        imgUrl:
          'https://www.helpinghandshomecare.co.uk/wp-content/uploads/lady-smiling-next-to-her-colleagues-in-a-call-centre_4x1.jpg',
        pageUrl: '/jobs/office-vacancies/',
        subTitle: 'From sales and marketing to training and HR, become a member of our vital support team.',
      },
    ],
    sideBarContent: [
      {
        title: 'View all available jobs',
        bulletImg: 'list',
        subtitle: 'Unsure of where you’d like your career to take you? View our full list of vacancies here.',
        url: 'https://careers.helpinghands.co.uk/e/careers/search/new',
      },
      {
        title: 'What our team says',
        bulletImg: 'comment',
        subtitle: 'Don’t just take our word for it - find out how much our staff love to work here.',
        url: 'https://www.helpinghandshomecare.co.uk/jobs/working-at-helping-hands/what-our-team-says/',
      },
    ],
  },
  {
    mainNav: 'About our team',
    mainUrl: '/about-us/',
    subCategory: [
      {
        title: 'Our carers',
        imgUrl: 'https://www.helpinghandshomecare.co.uk/wp-content/uploads/three-carers-sat-down-and-laughing-together_4x1.jpg',
        pageUrl: '/about-us/our-carers/',
        subTitle: 'Each and every one of our carers are selected based on their natural ability to care.',
      },
      {
        title: 'Why choose Helping Hands?',
        imgUrl:
          'https://www.helpinghandshomecare.co.uk/wp-content/uploads/carer-and-elderly-lady-smiling-at-each-other-in-the-garden_4x1.jpg',
        pageUrl: '/about-us/why-choose-helping-hands/',
        subTitle: 'Find out why Helping Hands are the perfect home care solution for your family’s needs.',
      },
      {
        title: 'Our experts and accreditations',
        imgUrl: 'https://www.helpinghandshomecare.co.uk/wp-content/uploads/visit-record-document-being-filled-in_4x1.jpg',
        pageUrl: '/about-us/our-team-of-experts/',
        subTitle: 'Find out how our in-house experts and accreditations enhance our service.',
      },
    ],
    sideBarContent: [
      {
        title: 'About us',
        bulletImg: 'info-circle',
        subtitle: 'From our humble beginnings, find out how we became a leading home care provider.',
        url: 'https://www.helpinghandshomecare.co.uk/about-us/',
      },
      {
        title: 'News and blog',
        bulletImg: 'file-text',
        subtitle: 'Read our specialist advice and find out more about what’s happening behind the scenes.',
        url: 'https://www.helpinghandshomecare.co.uk/blog/',
      },
    ],
  },
  {
    mainNav: 'Contact us',
    mainUrl: '/about-us/contact-us/',
    subCategory: [],
    sideBarContent: [],
  },
  {
    mainNav: 'Find  your branch',
    mainUrl: '/our-locations/',
    subCategory: [],
    sideBarContent: [],
  },
];

export default menuData;
