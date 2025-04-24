export default (funnel) => {
  const data = {
    'walkIn': {
      headline: 'Don\'t wait, book your GP appointment now',
      usps: [
        'See a GMC registered GP <span id="PU003_appointmentTime"></span>',
        'Prescription top-up service and sick notes available',
        'Instant referrals to NHS / Private Specialists',
      ],
      review: {
        content: 'Quick and efficient and friendly way to see a GP in your own home without having to go out in the cold and sit in a cramped queue in a waiting room. Prescription was dispensed quite quickly to a nearby pharmacy which my neighbour picked up for me.',
        name: 'Laura',
        location: '',
      },
    },
    'sickNote': {
      headline: 'Select a time to discuss your sick note',
      usps: [
        'Discuss your sick note with our doctors',
        'Sent instantly via email or first class post',
        'Sanctioned sick notes for employees & students',
      ],
      review: {
        content: 'Wow. I\'m totally sold. Spoke directly with a Dr in ten minutes. I had a simple issue and needed a sick note for a week. Sorted there and then.',
        name: 'Enigmatic Blonde',
        location: '',
      },
    },
    'prescription': {
      headline: 'Select a time to discuss your prescription and collect the same day',
      usps: [
        'Discuss your prescription with our doctors',
        'We\'ll send your prescription to any pharmacy',
        'Repeat prescription top-up service available',
      ],
      review: {
        content: 'The Doctor was really good and friendly and after a video chat, she diagnosed my problem easily. She made me out a prescription which I picked up the same day not far from my work. I\'m so impressed with the service!',
        name: 'Lidia P',
        location: '',
      },
    },
  };

  return data[funnel];
};