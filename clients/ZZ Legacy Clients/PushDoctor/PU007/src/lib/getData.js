import {poller} from '../../../../../lib/uc-lib';
import getMins from './ajaxMinutes';

export default (pathname) => {
  const data = {
    '/ppc/see-a-doctor-online': {
      changeText: function(variation) {
        const that = this;
        poller([
          '.c-video-list__sub-heading'
        ], () => {
          const tagline = document.querySelector('.c-video-list__sub-heading');
          tagline.innerHTML = that.text[variation];
          getMins();
        });
      },
      text: {
        V1: 'Why wait? See a qualified NHS-trained doctor online. Available until 11pm tonight',
        V2: 'Why wait? See a doctor online <span id="PU007_appointmentTime"></span>',
        V3: 'Every doctor in our network is registered with the General Medical Council (GMC), the organisation responsible for overseeing medical practitioners in the UK'
      }
    },

    '/ppc/walk-in-centre': {
      changeText: function(variation) {
        const that = this;
        poller([
          '.page-title .widthcontrol'
        ], () => {
          const tagline = document.querySelector('.page-title .widthcontrol');
          tagline.innerHTML = that.text[variation];
        });
      },
      text: {
        V1: 'No need to find your local walk-in centre, see one of our qualified GPs at your convenience',
        V2: 'Don\'t sit for hours in a waiting room, we\'ll see you within minutes',
        V3: 'Europe\'s largest network of online GPs. Quick, convenient and qualified'
      }
    },

    '/ppc/antibiotics-online': {
      changeText: function(variation) {
        const that = this;
        poller([
          '.c-page-title__col h2'
        ], () => {
          const tagline = document.querySelector('.c-page-title__col h2');
          tagline.innerHTML = that.text[variation];
        });
      },
      text: {
        V1: 'Order your repeat, same-day or emergency prescription right now to pick up later',
        V2: 'Same day prescriptions available as quick as 1 hour collection from your local pharmacy',
        V3: 'Our GMC qualified NHS-trained doctors can issue (or send/write) your antibiotic prescription easily and quickly'
      }
    },

    '/ppc/online-doctor-mobile': {
      changeText: function(variation) {
        const that = this;
        poller([
          '.c-ppc-page-title__h2'
        ], () => {
          const tagline = document.querySelector('.c-ppc-page-title__h2');
          tagline.innerHTML = that.text[variation];
          getMins();
        });
      },
      text: {
        V1: 'Get the treatment you need online from the comfort of your own home or work',
        V2: 'See a doctor online <span id="PU007_appointmentTime"></span>',
        V3: 'We\'re Europe\'s largest network of online GPs. Speak to one of them right now - 9 out of 10 would recommend us to a friend'
      }
    },

    '/ppc/walk-in-centre-3': {
      changeText: function(variation) {
        const that = this;
        poller([
          '.c-page-title__col > h1'
        ], () => {
          const tagline = document.querySelector('.c-page-title__col > h1');
          tagline.insertAdjacentHTML('afterend', `<div style="margin: -15px 0 10px 0">${that.text[variation]}</div>`);
        });
      },
      text: {
        V1: 'No need to find your local walk in centre, see one of 7,000 qualified GPs at your convenience',
        V2: 'Don\'t sit for hours in a waiting room, we\'ll see you within minutes',
        V3: 'Europe\'s largest network of online GPs. Quick, convenient and qualified'
      }
    },

    '/ppc/gps-near-me': {
      changeText: function(variation) {
        const that = this;
        poller([
          '.page-title .widthcontrol'
        ], () => {
          const tagline = document.querySelector('.page-title .widthcontrol');
          tagline.innerHTML = that.text[variation];
        });
      },
      text: {
        V1: 'Don’t wait to be seen by your local GP. With us, you can speak to a doctor online today up to 11pm everyday',
        V2: 'Don’t wait to be seen by your local GP, speak to them from the comfort of your own home',
        V3: 'We’ve a smart network of over 7,000 qualified GPs who are ready to speak to you, diagnose and prescribe medication'
      }
    },

    // '/ppc/sexual-health-clinic-mobile': {
    //   changeText: function changeText(variation) {
    //     var that = this;
    //     poller(['.c-page-title h1'], function () {
    //       var tagline = document.querySelector('.c-page-title h1');
    //       tagline.insertAdjacentHTML('afterend', '<div style="margin: -15px 0 10px 0">' + that.text[variation] + '</div>');
    //       getMins();
    //     });
    //   },
    //   text: {
    //     V1: 'Sexual health advice, diagnosis and prescription from your own home',
    //     V2: 'Sexual health advice and diagnosis in a matter of minutes by NHS-trained registered GPs',
    //     V3: 'Discreet, private, quick advice from UK, NHS-trained registered GPs'
    //   }
    // },
    
    // '/ppc/gum-clinic-mobile': {
    //   changeText: function changeText(variation) {
    //     var that = this;
    //     poller(['.c-page-title h1'], function () {
    //       var tagline = document.querySelector('.c-page-title h1');
    //       tagline.insertAdjacentHTML('afterend', '<div style="margin: -15px 0 10px 0">' + that.text[variation] + '</div>');
    //       getMins();
    //     });
    //   },
    //   text: {
    //     V1: '100% discreet appointments with NHS-trained sexual health experts. Speak to a doctor online for ultimate privacy',
    //     V2: '100% discreet appointments with NHS-trained sexual health experts. Speak to a doctor <span id="PU007_appointmentTime"></span>',
    //     V3: '100% discreet appointments with NHS-trained sexual health GPs, all General Medical Council (GMC) registered'
    //   }
    // },

    '/ppc/sexual-health-clinic-3': {
      changeText: function(variation) {
        const that = this;
        poller([
          '.c-page-title h1'
        ], () => {
          const tagline = document.querySelector('.c-page-title h1');
          tagline.insertAdjacentHTML('afterend', `<div style="margin: -15px 0 10px 0">${that.text[variation]}</div>`);
          getMins();
        });
      },
      text: {
        V1: '100% discreet appointments with NHS-trained sexual health experts. Speak to a doctor online for ultimate privacy',
        V2: '100% discreet appointments with NHS-trained sexual health experts. Speak to a doctor <span id="PU007_appointmentTime"></span>',
        V3: '100% discreet appointments with NHS-trained sexual health GPs, all General Medical Council (GMC) registered'
      }
    },

    '/ppc/ooh-appointments': {
      changeText: function(variation) {
        const that = this;
        poller([
          '.c-page-title-alt__left-col h1'
        ], () => {
          const tagline = document.querySelector('.c-page-title-alt__left-col h1');
          tagline.insertAdjacentHTML('afterend', `<div style="margin: 0px 0 20px 0">${that.text[variation]}</div>`);
          getMins();
        });
      },
      text: {
        V1: 'Need to see a doctor when other surgeries are closed? Speak to a doctor in the comfort of your own home up to 11pm tonight',
        V2: 'Need to see a doctor when other surgeries are closed? Speak to a doctor up to 11pm. Appointments available <span id="PU007_appointmentTime"></span>',
        V3: 'Need to see a doctor when other surgeries are closed? We have over 7,000 GMC registered doctors waiting to speak to you up to 11pm everyday'
      }
    },

    '/ppc/walk-in-centre-near-mob': {
      changeText: function(variation) {
        const that = this;
        poller([
          '.three-column-imageicon-wrapper p'
        ], () => {
          const tagline = document.querySelector('.three-column-imageicon-wrapper p');
          tagline.innerHTML = that.text[variation];
        });
      },
      text: {
        V1: 'No need to find your local walk in centre, see one of 7,000 qualified GPs at your convenience',
        V2: 'Don\'t sit for hours in a waiting room, we\'ll see you within minutes',
        V3: 'Europe\'s largest network of online GPs. Quick, convenient and qualified'
      }
    }
  };

  return data[pathname];
};