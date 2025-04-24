// Primary journey data and config for options
export const journeyData = {
  'for her': {
      'Fragrance': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/FBCAB2E3A7302A3D48C8A0A69845300807AEE8169FC4ABC9DDFD64060881830F/new-boots-com/BO006---Gift-Finder/noun_Perfume_147152-min.jpg',
        url: 'https://www.boots.com/gift/her/all-perfume',
      },
      'Premium Beauty': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/293BDE3443E84B2DD7A6828123DBD0B8631BD0B5D53999BDDCEC0F3024EBC99E/new-boots-com/BO006---Gift-Finder/noun_makeup_930735-min.jpg',
        url: 'https://www.boots.com/beauty/luxury-beauty-skincare',
      },
      'Hair': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/174807C7D547A09C39D9A87133749CB21B351B21D33D396D55731C1BAF5D479E/new-boots-com/BO006---Gift-Finder/noun_Wig_3155186-min.png',
        url: 'https://www.boots.com/beauty/hair/all-hair',
      },
      'Luxury Bath & Body': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/FFD6D06C6775C0C731E9F0025847D737F62129EF099702AF64485AAC36BD184C/new-boots-com/BO006---Gift-Finder/noun_Wash_204407-min.jpg',
        url: 'https://www.boots.com/toiletries/luxury-bath-body/bath-body-gifts-',
      },
      'Electrical Beauty': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/DECAD4332BCB1BEAA5F7DD261E39F0EC6D2567E706831B901C479F03B6BB0F41/new-boots-com/BO006---Gift-Finder/noun_HairStraightener_2902337Copy-min.jpg',
        url: 'https://www.boots.com/electrical/beauty-tools/all-electrical-beauty-tools'
      },
      'Home': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/187A25827F638794BC8001A1CE182886EEA889A850B79D2BDE5E541C6BA52C27/new-boots-com/BO006---Gift-Finder/noun_homefragrance_1648485-min.jpg',
        url: 'https://www.boots.com/gift/candles-home-fragrance-for-her'
      },
      'Wellness': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/45FC96EFEE49452633F6AAA4E1A9FA653B5306DEED719800E7CA234EC4D95842/new-boots-com/BO006---Gift-Finder/noun_Lotus_2670526-min.jpg',
        url: 'https://www.boots.com/wellness/new-in-wellness'
      },
      'Personalised Photo': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/C1A2ACFE76306375C9840C7F6C761B339078444E6E035FB12F58301261E5B690/new-boots-com/BO006---Gift-Finder/noun_Photo_2042239-min.jpg',
        url: 'https://www.boots.com/photo/new-in-photo'
      },
      'Experience Days': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/2149F8F10B1E7C2C060F330E944B5F7ECBE518702A751A533D5842F7CA4EC580/new-boots-com/BO006---Gift-Finder/noun_Balloon_2061666-min.jpg',
        url: 'https://www.boots.com/gift/experience-days'
      },
  },
  'for him': {
      'Fragrance': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/62D3EFAFDA6850665172F6BBB88D9F5E238E789B5DCF0DED37D1A2E676418585/new-boots-com/BO006---Gift-Finder/as-icon.jpg',
        url: 'https://www.boots.com/mens/aftershave/mens-aftershave'
      },
      'Male Grooming': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/E5C007D163422074AB74E7C4FE0650DDB01BB8C9C561DCEA1E20661CC4CB5582/new-boots-com/BO006---Gift-Finder/shavingkit.jpg',
        url: 'https://www.boots.com/mens/male-grooming-tools/all-electrical-male-grooming'
      },
      'Personalised Photo': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/C1A2ACFE76306375C9840C7F6C761B339078444E6E035FB12F58301261E5B690/new-boots-com/BO006---Gift-Finder/noun_Photo_2042239-min.jpg',
        url: 'https://www.boots.com/photo/new-in-photo'
      },
      'Experience Days': {
        image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/2149F8F10B1E7C2C060F330E944B5F7ECBE518702A751A533D5842F7CA4EC580/new-boots-com/BO006---Gift-Finder/noun_Balloon_2061666-min.jpg',
        url: 'https://www.boots.com/gift/experience-days'
      },
  }
};

/**
 * We return the step data in a dynamic way by always referring
 * to state - this allows us more control over the order of steps
 * and to dynamically alter how things appear (e.g. the title
 * in step 2 depends on the answer in step 1 (she / he)
 */
export const getStepData = (state) => {
  const result = [
    {
      type: 'single',
      id: 'gender',
      skip: !!window.location.pathname.match(/him|her/ig),
      skipValue: (window.location.pathname.match(/him/) ? 'for him' : 'for her'),
      hasBackButton: false,
      getTitle: () => "Who is your gift for?",
      getOptions: () => [
        {
          id: 'for her',
          value: 'for her',
          image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/F784A4D4FFFBF6A80EB7571491F7551C1E0D795057060F26125725320D7A3201/new-boots-com/BO006---Gift-Finder/noun_Woman_2078474-min.jpg',
          friendlyText: 'For her',
        },
        {
          id: 'for him',
          value: 'for him',
          image: 'https://service.maxymiser.net/cm/images-eu/1/1/1/643B066A63AD7A0BC771747A71A0076E36498CF573AC4D4CCAE724F44F02DC4F/new-boots-com/BO006---Gift-Finder/noun_Man_2078502-min.jpg',
          friendlyText: 'For him',
        }
      ],
    },
    {
      type: 'single',
      id: 'likes',
      hasBackButton: !window.location.pathname.match(/her|him/),
      getTitle: () => {
        let answer = 'for her';

        if(state.answers[0] == 'for him' || window.location.pathname.match(/him/)) {
          answer = 'for him';
        }

        const genderPronoun = answer === 'for her' ? 'she' : 'he';

        return `What does ${genderPronoun} like?`;
      },
      getOptions: () => {
        let answer = 'for her';

        if(state.answers[0] == 'for him' || window.location.pathname.match(/him/)) {
          answer = 'for him';
        }

        const opts = journeyData[answer];
        const optsClone = JSON.parse(JSON.stringify(opts));

        return Object.keys(optsClone).map(opt => ({
          // ------------------------------------------
          // Returns an array of objects where we use the opt name as the ID
          // This ensure that every 'options' call matches that in step 1:
          // [ { id: 'id', value: 'val', friendlyText: '' } ] 
          // ------------------------------------------
          id: opt.toLowerCase().replace(/\s/g, ''),
          value: opt,
          image: opts[opt].image,
          friendlyText: opt,
        }));
      }
    },
    {
      type: 'range',
      id: 'price',
      hasBackButton: true,
      nextButton: 'Find my perfect gifts',
      getTitle: () => "What's your price range?",
      getOptions: () => [
        {
          id: 'min',
          value: 0,
          friendlyText: '£0',
        },
        {
          id: 'max',
          value: 200,
          friendlyText: '£200+',
        },
      ]
    },
    {
      type: 'completer',
      id: 'final',
      hasBackButton: false,
      getTitle: () => "Loading...",
      getOptions: () => []
    }
  ];

  return result;
}
