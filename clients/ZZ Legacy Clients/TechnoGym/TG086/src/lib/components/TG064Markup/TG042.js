import { pollerLite } from "../../../../../../../lib/uc-lib";


export default () => {
  // ----------------------------------------------------------------
  // Create Variables for content
  // ----------------------------------------------------------------

  const categorySubTitle = {
    gb: 'Our selection of high-end, premium and professional treadmills feature state-of-the-art technology, design and entertainment. Designed to give you the best user experience every time.',
    us: 'Our selection of high-end, premium and professional treadmills feature state-of-the-art technology, design and entertainment. Designed to give you the best user experience every time.',
    int: 'Our selection of high-end, premium and professional treadmills feature state-of-the-art technology, design and entertainment. Designed to give you the best user experience every time.',
  };

  // --------------- Product slides------------- //

  const productSlide = {
    gb: [
      {
        image1: '//cdn.optimizely.com/img/8355110909/07aae19990194e1eb6bf928f992ff537.jpg',
        altText1: 'Myrun',
        imageTitle1: 'Myrun',
        image2: '//cdn.optimizely.com/img/8355110909/65fc32d1a11e403e8cdfe70bcd7e83b2.jpg',
        altText2: 'Myrun',
        imageTitle2: 'Myrun',
        image3: '//cdn.optimizely.com/img/8355110909/16f88ee921cf4ad7a93e9aa6d34c86d5.jpg',
        altText3: 'Myrun',
        imageTitle3: 'Myrun',
        link: 'https://www.technogym.com/gb/treadmill-myrun.html',
        Title: 'Myrun',
        line: 'MYRUN',
        Price: '£3,250',
        subLine: 'MINIMAL DESIGN AND INNOVATIVE TECH WHICH FITS PERFECTLY INTO ANY HOME ENVIRONMENT',
        SmallDescription: 'Dedicated to those who love <span>technology</span> and <span>music</span>. Thanks to its tracking feature you can measure cadence, step length and torso oscillation for constant monitoring of your technique.',
        SmallDescriptionHidden: 'Running on the treadmill is more fun with MYRUN and its multiple apps including RUNNING MUSIC and the ability to connect to Zwift.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/a66bef325e3e45179a763664fa6fb54e.jpg',
        altText1: 'Run Personal',
        imageTitle1: 'Run Personal',
        image2: '//cdn.optimizely.com/img/8355110909/6d922848d5014efab59d8c9c3e2d3e43.jpg',
        altText2: 'Run Personal',
        imageTitle2: 'Run Personal',
        image3: '//cdn.optimizely.com/img/8355110909/3eda577a17e44a09884dbb19d7ae4e12.jpg',
        altText3: 'Run Personal',
        imageTitle3: 'Run Personal',
        link: 'https://www.technogym.com/gb/run-personal.html',
        Title: 'Run Personal',
        line: 'Personal',
        Price: '£13,000',
        subLine: 'A TIMELESS CLASSIC FOR HOMES AND HOTELS WITH IMPECCABLE DESIGN AND CUTTING-EDGE TECHNOLOGY',
        SmallDescription: 'A true piece of interior art, made for design lovers. Run Personal is combines innovative materials and design excellence.',
        SmallDescriptionHidden: 'The result of a collaboration between Technogym and Antonio Citterio Design Studio for professional cardio training and pure entertainment. Ideal for sports performance: the powerful engine adapts to any type of exercise, from walking to high intensity training.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/4305406aa3754396954cfa3419bd8d6b.jpg',
        altText1: 'Jog Forma',
        imageTitle1: 'Jog Forma',
        image2: '//cdn.optimizely.com/img/8355110909/9b32615556b04798ac617f39923b8cf0.jpg',
        altText2: 'Jog Forma',
        imageTitle2: 'Jog Forma',
        image3: '//cdn.optimizely.com/img/8355110909/eda97f04bc5d4ca39a2fc74a6cf05806.jpg',
        altText3: 'Jog Forma',
        imageTitle3: 'Jog Forma',
        link: 'https://www.technogym.com/gb/jog-excite-forma.html',
        Title: 'Jog Forma',
        line: 'Forma',
        Price: '£6,190',
        subLine: 'EXPERIENCE COMMERCIAL GRADE QUALITY AND EASE OF USE AT HOME',
        SmallDescription: 'Designed for those who love functionality. Jog Forma is a professional treadmill that combines performance and functionality.',
        SmallDescriptionHidden: 'It allows simple and effective workouts thanks to the new user interface with QR codeguidance and new hand sensors. The CPR system follows your heart rate, automatically adjusting the treadmill settings to constantly provide you with a safe and effective workout.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/44f6078ba5f5483ebbb33130227067f9.jpg',
        altText1: 'Skillmill Go',
        imageTitle1: 'Skillmill Go',
        image2: '//cdn.optimizely.com/img/8355110909/38d265295cd44f7f8fb4e829da88f832.jpg',
        altText2: 'Skillmill Go',
        imageTitle2: 'Skillmill Go',
        image3: '//cdn.optimizely.com/img/8355110909/bae6e0bfe15f4f328cc6a8c96680962c.jpg',
        altText3: 'Skillmill Go',
        imageTitle3: 'Skillmill Go',
        link: 'https://www.technogym.com/gb/skillmill-go-1.html',
        Title: 'Skillmill Go',
        line: 'Skill line',
        Price: '£8,550',
        subLine: 'USED IN THE BEST GYMS TO ENSURE AN ATHLETE’S LEVEL WORKOUT',
        SmallDescription: 'SKILLMILL’s non-motorised treadmill design gives you the experience of running at full speed, using Technogym’s MULTIDRIVE TECHNOLOGY™.',
        SmallDescriptionHidden: 'SKILLMILL GO is the console free version which is perfect for those who want to focus on athletic performance training with the supervision of a trainer or it can be used with the support of Virtual Training solution for advanced home based workouts.',
      },
      {
        image1: 'https://cdn.optimizely.com/img/8355110909/44f6078ba5f5483ebbb33130227067f9.jpg',
        altText1: 'Skillmill Connect',
        imageTitle1: 'Skillmill Connect',
        image2: '//cdn.optimizely.com/img/8355110909/3dcffc711de04b01b6759d087571be7f.jpg',
        altText2: 'Skillmill Connect',
        imageTitle2: 'Skillmill Connect',
        image3: '//cdn.optimizely.com/img/8355110909/d6b43be351124654a4e4862c88102704.jpg',
        altText3: 'Skillmill Connect',
        imageTitle3: 'Skillmill Connect',
        link: 'https://www.technogym.com/gb/skillmill-connect.html',
        Title: 'Skillmill Connect',
        line: 'Skill line',
        Price: '£9,680',
        subLine: 'USED IN THE BEST GYMS TO ENSURE AN ATHLETE’S LEVEL WORKOUT',
        SmallDescription: 'Made for data obsessed users for everyday improvement. SKILLMILL Connect’s tracking function works in real time and sends and stores your data through the Technogym mywellness open platform.',
        SmallDescriptionHidden: 'It can also be paired with the UNITY SELF SKILLMILL APP, an interactive touch screen kiosk allowing trainers to lead and manage performance sessions.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/4583a126f89e432d8e2d19bf11ffb662.jpg',
        altText1: 'Skill Run',
        imageTitle1: 'Skill Run',
        image2: '//cdn.optimizely.com/img/8355110909/649ceeb233f74a16a6b2d7be42286549.jpg',
        altText2: 'Skill Run',
        imageTitle2: 'Skill Run',
        image3: '//cdn.optimizely.com/img/8355110909/d86bf61d963649128abc44d6c99797ba.jpg',
        altText3: 'Skill Run',
        imageTitle3: 'Skill Run',
        link: 'https://www.technogym.com/gb/skillrun.html',
        Title: 'Skillrun',
        line: 'Skill line',
        Price: 'PRICE ON REQUEST',
        subLine: 'USED IN THE BEST GYMS TO ENSURE AN ATHLETE’S LEVEL WORKOUT',
        SmallDescription: 'SKILLRUN is the first piece of running equipment designed to meet the training requirements of elite athletes and demanding fitness enthusiasts.',
        SmallDescriptionHidden: 'Thanks to its unique MULTIDRIVE TECHNOLOGY™, users can combine cardio and power training in a single solution. More than a treadmill, the SKILLRUN enhances your workout with speciality training modes and simulations to keep you engaged and motivated.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/a4c5085cf0c345e2a06917a5953df455.jpg',
        altText1: 'Artis Run',
        imageTitle1: 'Artis Run',
        image2: '//cdn.optimizely.com/img/8355110909/e7b36730652c45c6abffd6812a38bc39.jpg',
        altText2: 'Artis Run',
        imageTitle2: 'Artis Run',
        image3: '//cdn.optimizely.com/img/8355110909/8b27f044ad7d45bdaec936bc571db515.jpg',
        altText3: 'Artis Run',
        imageTitle3: 'Artis Run',
        link: 'https://www.technogym.com/gb/treadmill-artis-run-standard.html',
        Title: 'Artis Run',
        line: 'Artis',
        Price: 'PRICE ON REQUEST',
        subLine: 'THE STATE-OF-THE-ART CARDIO AND <br>MULTIMEDIA EXPERIENCE',
        SmallDescription: 'Once you’ve tried running on an ARTIS treadmill, no other treadmill can compare. It combines the highest standards of design, technology and connectivity.',
        SmallDescriptionHidden: 'Equipped with the widest running surface on the market, speed shift control for uninterrupted workouts and the latest UNITY 3.0 technology, users can track data, take part in virtual races and gain access to customisable content.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/f05e363283d241d68b32797783801066.jpg',
        altText1: 'Excite run 600',
        imageTitle1: 'Excite run 600',
        image2: '//cdn.optimizely.com/img/8355110909/99d6da58f8344623ab3f32c6f8f57fbc.jpg',
        altText2: 'Excite run 600',
        imageTitle2: 'Excite run 600',
        image3: '//cdn.optimizely.com/img/8355110909/36ecfba00747437e80fbc4f8ded9d26f.jpg',
        altText3: 'Excite run 600',
        imageTitle3: 'Excite run 600',
        link: 'https://www.technogym.com/gb/treadmill-excite-600.html',
        Title: 'Excite run 600',
        line: 'Excite',
        Price: 'PRICE ON REQUEST',
        subLine: 'THE MOST WIDESPREAD PROFESSIONAL LINE, AVAILABLE IN PRESTIGIOUS CLUBS & HOTELS',
        SmallDescription: 'Excite Run 600 is a versatile and sturdy treadmill in a contemporary style that offers new ergonomic features such as the reduced deck height to improve accessibility.',
        SmallDescriptionHidden: 'The treadmill has a powerful engine and features new exercise and entertainment options with refreshed graphics, promising more challenge, fun and motivation.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/4cc1c0e5e9ed461ab57dfa4b85959595.jpg',
        altText1: 'Excite Run 1000',
        imageTitle1: 'Excite Run 1000',
        image2: '//cdn.optimizely.com/img/8355110909/0e3b6b22262d4d2a8a02933a53a73507.jpg',
        altText2: 'Excite Run 1000',
        imageTitle2: 'Excite Run 1000',
        image3: '//cdn.optimizely.com/img/8355110909/096d11b795c34dc39e4e2ab081b51d7a.jpg',
        altText3: 'Excite Run 1000',
        imageTitle3: 'Excite Run 1000',
        link: 'https://www.technogym.com/gb/treadmill-excite-1000.html',
        Title: 'Excite run 1000',
        line: 'Excite',
        Price: 'PRICE ON REQUEST',
        subLine: 'THE MOST WIDESPREAD PROFESSIONAL LINE, AVAILABLE IN PRESTIGIOUS CLUBS & HOTELS',
        SmallDescription: 'Excite RUN 1000 makes you enjoy the natural sensation of running on an adaptive surface. The UNITY 3.0 console offers a fully connected experience enriched with new interval training workouts.',
        SmallDescriptionHidden: 'You can also recreate your favourite outdoor runs or challenge your friends in a marathon with RACES.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/b105e7342c9a400faf3f2f85bd60f2ad.jpg',
        altText1: 'Skillmill Console',
        imageTitle1: 'Skillmill Console',
        image2: '//cdn.optimizely.com/img/8355110909/afe76f74ea854251aeb816b33f10d198.jpg',
        altText2: 'Skillmill Console',
        imageTitle2: 'Skillmill Console',
        image3: '//cdn.optimizely.com/img/8355110909/b41d0cbca9e345c68c5f2de66d09f9aa.jpg',
        altText3: 'Skillmill Console',
        imageTitle3: 'Skillmill Console',
        link: 'https://www.technogym.com/gb/skillmill-console-1.html',
        Title: 'Skillmill Console',
        line: 'Skill line',
        Price: 'PRICE ON REQUEST',
        subLine: 'USED IN THE BEST GYMS TO ENSURE AN ATHLETE’S LEVEL WORKOUT',
        SmallDescription: 'Users enjoy all the benefits of SKILLATHLETIC training and can monitor their physiological workout parameters in real time with the console which activates only on use.',
        SmallDescriptionHidden: 'The console also uses a rechargeable battery. Equipped with an easy-to-read display and a touch sensitive keypad features everything you need to have a safe and engaging High Intensity Training session.',
      },
    ],
    us: [
      {
        image1: '//cdn.optimizely.com/img/8355110909/07aae19990194e1eb6bf928f992ff537.jpg',
        altText1: 'Myrun',
        imageTitle1: 'Myrun',
        image2: '//cdn.optimizely.com/img/8355110909/65fc32d1a11e403e8cdfe70bcd7e83b2.jpg',
        altText2: 'Myrun',
        imageTitle2: 'Myrun',
        image3: '//cdn.optimizely.com/img/8355110909/16f88ee921cf4ad7a93e9aa6d34c86d5.jpg',
        altText3: 'Myrun',
        imageTitle3: 'Myrun',
        link: 'https://www.technogym.com/us/myrun-running-treadmill.html',
        Title: 'Myrun',
        line: 'MYRUN',
        Price: '$4,470.00',
        subLine: 'MINIMAL DESIGN AND INNOVATIVE TECH WHICH FITS PERFECTLY INTO ANY HOME ENVIRONMENT',
        SmallDescription: 'Dedicated to those who love <span>technology</span> and <span>music</span>. Thanks to its tracking feature you can measure cadence, step length and torso oscillation for constant monitoring of your technique.',
        SmallDescriptionHidden: 'Running on the treadmill is more fun with MYRUN and its multiple apps including RUNNING MUSIC and the ability to connect to Zwift.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/a66bef325e3e45179a763664fa6fb54e.jpg',
        altText1: 'Run Personal',
        imageTitle1: 'Run Personal',
        image2: '//cdn.optimizely.com/img/8355110909/6d922848d5014efab59d8c9c3e2d3e43.jpg',
        altText2: 'Run Personal',
        imageTitle2: 'Run Personal',
        image3: '//cdn.optimizely.com/img/8355110909/3eda577a17e44a09884dbb19d7ae4e12.jpg',
        altText3: 'Run Personal',
        imageTitle3: 'Run Personal',
        link: 'https://www.technogym.com/us/run-personal-technogym.html',
        Title: 'Run Personal',
        line: 'Personal',
        Price: '$16,050.00',
        subLine: 'A TIMELESS CLASSIC FOR HOMES AND HOTELS WITH IMPECCABLE DESIGN AND CUTTING-EDGE TECHNOLOGY',
        SmallDescription: 'A true piece of interior art, made for design lovers. Run Personal is combines innovative materials and design excellence.',
        SmallDescriptionHidden: 'The result of a collaboration between Technogym and Antonio Citterio Design Studio for professional cardio training and pure entertainment. Ideal for sports performance: the powerful engine adapts to any type of exercise, from walking to high intensity training.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/4305406aa3754396954cfa3419bd8d6b.jpg',
        altText1: 'Jog Forma',
        imageTitle1: 'Jog Forma',
        image2: '//cdn.optimizely.com/img/8355110909/9b32615556b04798ac617f39923b8cf0.jpg',
        altText2: 'Jog Forma',
        imageTitle2: 'Jog Forma',
        image3: '//cdn.optimizely.com/img/8355110909/eda97f04bc5d4ca39a2fc74a6cf05806.jpg',
        altText3: 'Jog Forma',
        imageTitle3: 'Jog Forma',
        link: 'https://www.technogym.com/us/jog-excite-forma.html',
        Title: 'Jog Forma',
        line: 'Forma',
        Price: '$6,350.00',
        subLine: 'EXPERIENCE COMMERCIAL GRADE QUALITY AND EASE OF USE AT HOME',
        SmallDescription: 'Designed for those who love functionality. Jog Forma is a professional treadmill that combines performance and functionality.',
        SmallDescriptionHidden: 'It allows simple and effective workouts thanks to the new user interface with QR codeguidance and new hand sensors. The CPR system follows your heart rate, automatically adjusting the treadmill settings to constantly provide you with a safe and effective workout.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/44f6078ba5f5483ebbb33130227067f9.jpg',
        altText1: 'Skillmill Go',
        imageTitle1: 'Skillmill Go',
        image2: '//cdn.optimizely.com/img/8355110909/38d265295cd44f7f8fb4e829da88f832.jpg',
        altText2: 'Skillmill Go',
        imageTitle2: 'Skillmill Go',
        image3: '//cdn.optimizely.com/img/8355110909/bae6e0bfe15f4f328cc6a8c96680962c.jpg',
        altText3: 'Skillmill Go',
        imageTitle3: 'Skillmill Go',
        link: 'https://www.technogym.com/us/skillmill-go-1.html',
        Title: 'Skillmill Go',
        line: 'Skill line',
        Price: '$8,560.00',
        subLine: 'USED IN THE BEST GYMS TO ENSURE AN ATHLETE’S LEVEL WORKOUT',
        SmallDescription: 'SKILLMILL’s non-motorised treadmill design gives you the experience of running at full speed, using Technogym’s MULTIDRIVE TECHNOLOGY™.',
        SmallDescriptionHidden: 'SKILLMILL GO is the console free version which is perfect for those who want to focus on athletic performance training with the supervision of a trainer or it can be used with the support of Virtual Training solution for advanced home based workouts.',
      },
      {
        image1: 'https://cdn.optimizely.com/img/8355110909/44f6078ba5f5483ebbb33130227067f9.jpg',
        altText1: 'Skillmill Connect',
        imageTitle1: 'Skillmill Connect',
        image2: '//cdn.optimizely.com/img/8355110909/3dcffc711de04b01b6759d087571be7f.jpg',
        altText2: 'Skillmill Connect',
        imageTitle2: 'Skillmill Connect',
        image3: '//cdn.optimizely.com/img/8355110909/d6b43be351124654a4e4862c88102704.jpg',
        altText3: 'Skillmill Connect',
        imageTitle3: 'Skillmill Connect',
        link: 'https://www.technogym.com/us/skillmill-connect.html',
        Title: 'Skillmill Connect',
        line: 'Skill line',
        Price: '$9,740.00',
        subLine: 'USED IN THE BEST GYMS TO ENSURE AN ATHLETE’S LEVEL WORKOUT',
        SmallDescription: 'Made for data obsessed users for everyday improvement. SKILLMILL Connect’s tracking function works in real time and sends and stores your data through the Technogym mywellness open platform.',
        SmallDescriptionHidden: 'It can also be paired with the UNITY SELF SKILLMILL APP, an interactive touch screen kiosk allowing trainers to lead and manage performance sessions.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/4583a126f89e432d8e2d19bf11ffb662.jpg',
        altText1: 'Skill Run',
        imageTitle1: 'Skill Run',
        image2: '//cdn.optimizely.com/img/8355110909/649ceeb233f74a16a6b2d7be42286549.jpg',
        altText2: 'Skill Run',
        imageTitle2: 'Skill Run',
        image3: '//cdn.optimizely.com/img/8355110909/d86bf61d963649128abc44d6c99797ba.jpg',
        altText3: 'Skill Run',
        imageTitle3: 'Skill Run',
        link: 'https://www.technogym.com/us/skillrun-performance-running.html',
        Title: 'Skillrun',
        line: 'Skill line',
        Price: 'PRICE ON REQUEST',
        subLine: 'USED IN THE BEST GYMS TO ENSURE AN ATHLETE’S LEVEL WORKOUT',
        SmallDescription: 'SKILLRUN is the first piece of running equipment designed to meet the training requirements of elite athletes and demanding fitness enthusiasts.',
        SmallDescriptionHidden: 'Thanks to its unique MULTIDRIVE TECHNOLOGY™, users can combine cardio and power training in a single solution. More than a treadmill, the SKILLRUN enhances your workout with speciality training modes and simulations to keep you engaged and motivated.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/a4c5085cf0c345e2a06917a5953df455.jpg',
        altText1: 'Artis Run',
        imageTitle1: 'Artis Run',
        image2: '//cdn.optimizely.com/img/8355110909/e7b36730652c45c6abffd6812a38bc39.jpg',
        altText2: 'Artis Run',
        imageTitle2: 'Artis Run',
        image3: '//cdn.optimizely.com/img/8355110909/8b27f044ad7d45bdaec936bc571db515.jpg',
        altText3: 'Artis Run',
        imageTitle3: 'Artis Run',
        link: 'https://www.technogym.com/us/treadmill-artis-run-standard.html',
        Title: 'Artis Run',
        line: 'Artis',
        Price: 'PRICE ON REQUEST',
        subLine: 'THE STATE-OF-THE-ART CARDIO AND <br>MULTIMEDIA EXPERIENCE',
        SmallDescription: 'Once you’ve tried running on an ARTIS treadmill, no other treadmill can compare. It combines the highest standards of design, technology and connectivity.',
        SmallDescriptionHidden: 'Equipped with the widest running surface on the market, speed shift control for uninterrupted workouts and the latest UNITY 3.0 technology, users can track data, take part in virtual races and gain access to customisable content.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/f05e363283d241d68b32797783801066.jpg',
        altText1: 'Excite run 600',
        imageTitle1: 'Excite run 600',
        image2: '//cdn.optimizely.com/img/8355110909/99d6da58f8344623ab3f32c6f8f57fbc.jpg',
        altText2: 'Excite run 600',
        imageTitle2: 'Excite run 600',
        image3: '//cdn.optimizely.com/img/8355110909/36ecfba00747437e80fbc4f8ded9d26f.jpg',
        altText3: 'Excite run 600',
        imageTitle3: 'Excite run 600',
        link: 'https://www.technogym.com/us/excite-run-600.html',
        Title: 'Excite run 600',
        line: 'Excite',
        Price: 'Starting from $8,620.00',
        subLine: 'THE MOST WIDESPREAD PROFESSIONAL LINE, AVAILABLE IN PRESTIGIOUS CLUBS & HOTELS',
        SmallDescription: 'Excite Run 600 is a versatile and sturdy treadmill in a contemporary style that offers new ergonomic features such as the reduced deck height to improve accessibility.',
        SmallDescriptionHidden: 'The treadmill has a powerful engine and features new exercise and entertainment options with refreshed graphics, promising more challenge, fun and motivation.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/4cc1c0e5e9ed461ab57dfa4b85959595.jpg',
        altText1: 'Excite Run 1000',
        imageTitle1: 'Excite Run 1000',
        image2: '//cdn.optimizely.com/img/8355110909/0e3b6b22262d4d2a8a02933a53a73507.jpg',
        altText2: 'Excite Run 1000',
        imageTitle2: 'Excite Run 1000',
        image3: '//cdn.optimizely.com/img/8355110909/096d11b795c34dc39e4e2ab081b51d7a.jpg',
        altText3: 'Excite Run 1000',
        imageTitle3: 'Excite Run 1000',
        link: 'https://www.technogym.com/us/excite-run-1000.html',
        Title: 'Excite run 1000',
        line: 'Excite',
        Price: 'PRICE ON REQUEST',
        subLine: 'THE MOST WIDESPREAD PROFESSIONAL LINE, AVAILABLE IN PRESTIGIOUS CLUBS & HOTELS',
        SmallDescription: 'Excite RUN 1000 makes you enjoy the natural sensation of running on an adaptive surface. The UNITY 3.0 console offers a fully connected experience enriched with new interval training workouts.',
        SmallDescriptionHidden: 'You can also recreate your favourite outdoor runs or challenge your friends in a marathon with RACES.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/b105e7342c9a400faf3f2f85bd60f2ad.jpg',
        altText1: 'Skillmill Console',
        imageTitle1: 'Skillmill Console',
        image2: '//cdn.optimizely.com/img/8355110909/afe76f74ea854251aeb816b33f10d198.jpg',
        altText2: 'Skillmill Console',
        imageTitle2: 'Skillmill Console',
        image3: '//cdn.optimizely.com/img/8355110909/b41d0cbca9e345c68c5f2de66d09f9aa.jpg',
        altText3: 'Skillmill Console',
        imageTitle3: 'Skillmill Console',
        link: 'https://www.technogym.com/us/skillmill-console-1.html',
        Title: 'Skillmill Console',
        line: 'Skill line',
        Price: 'PRICE ON REQUEST',
        subLine: 'USED IN THE BEST GYMS TO ENSURE AN ATHLETE’S LEVEL WORKOUT',
        SmallDescription: 'Users enjoy all the benefits of SKILLATHLETIC training and can monitor their physiological workout parameters in real time with the console which activates only on use.',
        SmallDescriptionHidden: 'The console also uses a rechargeable battery. Equipped with an easy-to-read display and a touch sensitive keypad features everything you need to have a safe and engaging High Intensity Training session.',
      },
    ],
    int: [
      {
        image1: '//cdn.optimizely.com/img/8355110909/07aae19990194e1eb6bf928f992ff537.jpg',
        altText1: 'Myrun',
        imageTitle1: 'Myrun',
        image2: '//cdn.optimizely.com/img/8355110909/65fc32d1a11e403e8cdfe70bcd7e83b2.jpg',
        altText2: 'Myrun',
        imageTitle2: 'Myrun',
        image3: '//cdn.optimizely.com/img/8355110909/16f88ee921cf4ad7a93e9aa6d34c86d5.jpg',
        altText3: 'Myrun',
        imageTitle3: 'Myrun',
        link: 'https://www.technogym.com/int/treadmill-myrun.html',
        Title: 'Myrun',
        line: 'MYRUN',
        subLine: 'MINIMAL DESIGN AND INNOVATIVE TECH WHICH FITS PERFECTLY INTO ANY HOME ENVIRONMENT',
        SmallDescription: 'Dedicated to those who love <span>technology</span> and <span>music</span>. Thanks to its tracking feature you can measure cadence, step length and torso oscillation for constant monitoring of your technique.',
        SmallDescriptionHidden: 'Running on the treadmill is more fun with MYRUN and its multiple apps including RUNNING MUSIC and the ability to connect to Zwift.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/a66bef325e3e45179a763664fa6fb54e.jpg',
        altText1: 'Run Personal',
        imageTitle1: 'Run Personal',
        image2: '//cdn.optimizely.com/img/8355110909/6d922848d5014efab59d8c9c3e2d3e43.jpg',
        altText2: 'Run Personal',
        imageTitle2: 'Run Personal',
        image3: '//cdn.optimizely.com/img/8355110909/3eda577a17e44a09884dbb19d7ae4e12.jpg',
        altText3: 'Run Personal',
        imageTitle3: 'Run Personal',
        link: 'https://www.technogym.com/int/run-personal.html',
        Title: 'Run Personal',
        line: 'Personal',
        subLine: 'A TIMELESS CLASSIC FOR HOMES AND HOTELS WITH IMPECCABLE DESIGN AND CUTTING-EDGE TECHNOLOGY',
        SmallDescription: 'A true piece of interior art, made for design lovers. Run Personal is combines innovative materials and design excellence.',
        SmallDescriptionHidden: 'The result of a collaboration between Technogym and Antonio Citterio Design Studio for professional cardio training and pure entertainment. Ideal for sports performance: the powerful engine adapts to any type of exercise, from walking to high intensity training.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/4305406aa3754396954cfa3419bd8d6b.jpg',
        altText1: 'Jog Forma',
        imageTitle1: 'Jog Forma',
        image2: '//cdn.optimizely.com/img/8355110909/9b32615556b04798ac617f39923b8cf0.jpg',
        altText2: 'Jog Forma',
        imageTitle2: 'Jog Forma',
        image3: '//cdn.optimizely.com/img/8355110909/eda97f04bc5d4ca39a2fc74a6cf05806.jpg',
        altText3: 'Jog Forma',
        imageTitle3: 'Jog Forma',
        link: 'https://www.technogym.com/int/jog-excite-forma.html"',
        Title: 'Jog Forma',
        line: 'Forma',
        subLine: 'EXPERIENCE COMMERCIAL GRADE QUALITY AND EASE OF USE AT HOME',
        SmallDescription: 'Designed for those who love functionality. Jog Forma is a professional treadmill that combines performance and functionality.',
        SmallDescriptionHidden: 'It allows simple and effective workouts thanks to the new user interface with QR codeguidance and new hand sensors. The CPR system follows your heart rate, automatically adjusting the treadmill settings to constantly provide you with a safe and effective workout.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/44f6078ba5f5483ebbb33130227067f9.jpg',
        altText1: 'Skillmill Go',
        imageTitle1: 'Skillmill Go',
        image2: '//cdn.optimizely.com/img/8355110909/38d265295cd44f7f8fb4e829da88f832.jpg',
        altText2: 'Skillmill Go',
        imageTitle2: 'Skillmill Go',
        image3: '//cdn.optimizely.com/img/8355110909/bae6e0bfe15f4f328cc6a8c96680962c.jpg',
        altText3: 'Skillmill Go',
        imageTitle3: 'Skillmill Go',
        link: 'https://www.technogym.com/int/skillmill-go-1.html',
        Title: 'Skillmill Go',
        line: 'Skill line',
        subLine: 'USED IN THE BEST GYMS TO ENSURE AN ATHLETE’S LEVEL WORKOUT',
        SmallDescription: 'SKILLMILL’s non-motorised treadmill design gives you the experience of running at full speed, using Technogym’s MULTIDRIVE TECHNOLOGY™.',
        SmallDescriptionHidden: 'SKILLMILL GO is the console free version which is perfect for those who want to focus on athletic performance training with the supervision of a trainer or it can be used with the support of Virtual Training solution for advanced home based workouts.',
      },
      {
        image1: 'https://cdn.optimizely.com/img/8355110909/44f6078ba5f5483ebbb33130227067f9.jpg',
        altText1: 'Skillmill Connect',
        imageTitle1: 'Skillmill Connect',
        image2: '//cdn.optimizely.com/img/8355110909/3dcffc711de04b01b6759d087571be7f.jpg',
        altText2: 'Skillmill Connect',
        imageTitle2: 'Skillmill Connect',
        image3: '//cdn.optimizely.com/img/8355110909/d6b43be351124654a4e4862c88102704.jpg',
        altText3: 'Skillmill Connect',
        imageTitle3: 'Skillmill Connect',
        link: 'https://www.technogym.com/int/skillmill-connect.html',
        Title: 'Skillmill Connect',
        line: 'Skill line',
        subLine: 'USED IN THE BEST GYMS TO ENSURE AN ATHLETE’S LEVEL WORKOUT',
        SmallDescription: 'Made for data obsessed users for everyday improvement. SKILLMILL Connect’s tracking function works in real time and sends and stores your data through the Technogym mywellness open platform.',
        SmallDescriptionHidden: 'It can also be paired with the UNITY SELF SKILLMILL APP, an interactive touch screen kiosk allowing trainers to lead and manage performance sessions.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/4583a126f89e432d8e2d19bf11ffb662.jpg',
        altText1: 'Skill Run',
        imageTitle1: 'Skill Run',
        image2: '//cdn.optimizely.com/img/8355110909/649ceeb233f74a16a6b2d7be42286549.jpg',
        altText2: 'Skill Run',
        imageTitle2: 'Skill Run',
        image3: '//cdn.optimizely.com/img/8355110909/d86bf61d963649128abc44d6c99797ba.jpg',
        altText3: 'Skill Run',
        imageTitle3: 'Skill Run',
        link: 'https://www.technogym.com/int/skillrun-performance-running.html',
        Title: 'Skillrun',
        line: 'Skill line',
        subLine: 'USED IN THE BEST GYMS TO ENSURE AN ATHLETE’S LEVEL WORKOUT',
        SmallDescription: 'SKILLRUN is the first piece of running equipment designed to meet the training requirements of elite athletes and demanding fitness enthusiasts.',
        SmallDescriptionHidden: 'Thanks to its unique MULTIDRIVE TECHNOLOGY™, users can combine cardio and power training in a single solution. More than a treadmill, the SKILLRUN enhances your workout with speciality training modes and simulations to keep you engaged and motivated.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/a4c5085cf0c345e2a06917a5953df455.jpg',
        altText1: 'Artis Run',
        imageTitle1: 'Artis Run',
        image2: '//cdn.optimizely.com/img/8355110909/e7b36730652c45c6abffd6812a38bc39.jpg',
        altText2: 'Artis Run',
        imageTitle2: 'Artis Run',
        image3: '//cdn.optimizely.com/img/8355110909/8b27f044ad7d45bdaec936bc571db515.jpg',
        altText3: 'Artis Run',
        imageTitle3: 'Artis Run',
        link: 'https://www.technogym.com/int/treadmill-artis-run-standard.html',
        Title: 'Artis Run',
        line: 'Artis',
        subLine: 'THE STATE-OF-THE-ART CARDIO AND <br>MULTIMEDIA EXPERIENCE',
        SmallDescription: 'Once you’ve tried running on an ARTIS treadmill, no other treadmill can compare. It combines the highest standards of design, technology and connectivity.',
        SmallDescriptionHidden: 'Equipped with the widest running surface on the market, speed shift control for uninterrupted workouts and the latest UNITY 3.0 technology, users can track data, take part in virtual races and gain access to customisable content.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/f05e363283d241d68b32797783801066.jpg',
        altText1: 'Excite run 600',
        imageTitle1: 'Excite run 600',
        image2: '//cdn.optimizely.com/img/8355110909/99d6da58f8344623ab3f32c6f8f57fbc.jpg',
        altText2: 'Excite run 600',
        imageTitle2: 'Excite run 600',
        image3: '//cdn.optimizely.com/img/8355110909/36ecfba00747437e80fbc4f8ded9d26f.jpg',
        altText3: 'Excite run 600',
        imageTitle3: 'Excite run 600',
        link: 'https://www.technogym.com/int/excite-run-600.html',
        Title: 'Excite run 600',
        line: 'Excite',
        subLine: 'THE MOST WIDESPREAD PROFESSIONAL LINE, AVAILABLE IN PRESTIGIOUS CLUBS & HOTELS',
        SmallDescription: 'Excite Run 600 is a versatile and sturdy treadmill in a contemporary style that offers new ergonomic features such as the reduced deck height to improve accessibility.',
        SmallDescriptionHidden: 'The treadmill has a powerful engine and features new exercise and entertainment options with refreshed graphics, promising more challenge, fun and motivation.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/4cc1c0e5e9ed461ab57dfa4b85959595.jpg',
        altText1: 'Excite Run 1000',
        imageTitle1: 'Excite Run 1000',
        image2: '//cdn.optimizely.com/img/8355110909/0e3b6b22262d4d2a8a02933a53a73507.jpg',
        altText2: 'Excite Run 1000',
        imageTitle2: 'Excite Run 1000',
        image3: '//cdn.optimizely.com/img/8355110909/096d11b795c34dc39e4e2ab081b51d7a.jpg',
        altText3: 'Excite Run 1000',
        imageTitle3: 'Excite Run 1000',
        link: 'https://www.technogym.com/int/excite-run-1000.html',
        Title: 'Excite run 1000',
        line: 'Excite',
        subLine: 'THE MOST WIDESPREAD PROFESSIONAL LINE, AVAILABLE IN PRESTIGIOUS CLUBS & HOTELS',
        SmallDescription: 'Excite RUN 1000 makes you enjoy the natural sensation of running on an adaptive surface. The UNITY 3.0 console offers a fully connected experience enriched with new interval training workouts.',
        SmallDescriptionHidden: 'You can also recreate your favourite outdoor runs or challenge your friends in a marathon with RACES.',
      },
      {
        image1: '//cdn.optimizely.com/img/8355110909/b105e7342c9a400faf3f2f85bd60f2ad.jpg',
        altText1: 'Skillmill Console',
        imageTitle1: 'Skillmill Console',
        image2: '//cdn.optimizely.com/img/8355110909/afe76f74ea854251aeb816b33f10d198.jpg',
        altText2: 'Skillmill Console',
        imageTitle2: 'Skillmill Console',
        image3: '//cdn.optimizely.com/img/8355110909/b41d0cbca9e345c68c5f2de66d09f9aa.jpg',
        altText3: 'Skillmill Console',
        imageTitle3: 'Skillmill Console',
        link: 'https://www.technogym.com/int/skillmill-console-1.html',
        Title: 'Skillmill Console',
        line: 'Skill line',
        subLine: 'USED IN THE BEST GYMS TO ENSURE AN ATHLETE’S LEVEL WORKOUT',
        SmallDescription: 'Users enjoy all the benefits of SKILLATHLETIC training and can monitor their physiological workout parameters in real time with the console which activates only on use.',
        SmallDescriptionHidden: 'The console also uses a rechargeable battery. Equipped with an easy-to-read display and a touch sensitive keypad features everything you need to have a safe and engaging High Intensity Training session.',
      },
    ],
  };

  const countryKey = location.pathname.split('/')[1];
  let itemProdHtml = '';
  productSlide[countryKey].forEach((ele) => {
    const mainClass = ele.Price ? 'item-product' : 'item-product price-request-quote';
    const productLineLocal = ` ${ele.line.toLowerCase().replace(' ', '')}`;
    const temp =
    `<div class="${mainClass}${productLineLocal}">
      <div class="custom-product-slides"> 
        <div id="slider-rap" class="wp-block slider-wrapper slider-wrapper-0">
          <div class="swiper-container slider-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <a href="${ele.link}" class="call-to-action"><img src="${ele.image1}" alt="${ele.altText1}" title="${ele.imageTitle1}"/></a>
              </div>
              <div class="swiper-slide">
                <a class="call-to-action" href="${ele.link}"><img src="${ele.image2}" alt="${ele.altText2}" title="${ele.imageTitle2}"/></a>
              </div>
              <div class="swiper-slide">
                <a class="call-to-action" href="${ele.link}"><img src="${ele.image3}" alt="${ele.altText3}" title="${ele.imageTitle3}"/></a>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
        <div class="custom-product-slides">
          <div class="TG086-product_text-top">
            <h1>
              <a href="${ele.link}">${ele.Title}</a>
            </h1>
            ${ele.Price ? `<h5>LINE : ${ele.line} | ${ele.Price}</h5>` : `<h5>LINE : ${ele.line} </h5>`}
            <span>${ele.subLine}</span>
          </div>
          <div class="TG086-description">
            <p>
              ${ele.SmallDescription} 
              <span class="TG086-hidden_text">${ele.SmallDescriptionHidden}</span>
            </p>
            <span class="TG086-read_more"></span>
            </div>
        </div>
      </div>
     <a class="TG086-learn_more TG086-secondary_button TG086-button" href="${ele.link}">Learn More</a>
    </div>`;
    itemProdHtml = itemProdHtml + temp;
  });



  pollerLite(['.category-title > h1'], () => {
    const categoryTitle = document.querySelector('.category-title > h1');
    const subTitle = document.createElement('h2');
    subTitle.innerHTML = `${categorySubTitle[countryKey]}`;
    categoryTitle.insertAdjacentElement('afterend', subTitle);
  });

  const overlay = document.createElement('div');
  overlay.classList.add('overlayTech');
  document.body.appendChild(overlay);

  const content = () => {
    const containerTitle = document.querySelector('#amshopby-page-container .category-title');

    // add the need help section
    const bottomBar = document.querySelector('.bottom-bar');
    const needHelpBar = document.createElement('div');
    needHelpBar.classList.add('TG086-need_help');
    needHelpBar.innerHTML = needHelp[countryKey];
    bottomBar.insertAdjacentElement('beforeBegin', needHelpBar);

    const helpBar = document.querySelector('.TG086-need_help');
    const aboutColumns = document.createElement('div');
    aboutColumns.classList.add('TG086-bottom_content');
    aboutColumns.innerHTML = twoColEqual[countryKey];
    helpBar.insertAdjacentElement('afterend', aboutColumns);
  };
 // content();

  const waitForObjectReady = setInterval(() => {
    if (typeof swiperSliders === 'object') {
      clearInterval(waitForObjectReady);
      document.querySelector('.category-products').innerHTML = itemProdHtml;
      const mySwiper = new Swiper('#slider-rap .swiper-container', {
        speed: 400,
        spaceBetween: 100,
        paginationClickable: true,
        pagination: '.swiper-pagination',
        observer: true,
        observeParents: true,
        clickable: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
      const nextButton = document.querySelectorAll('.swiper-button-next');
      const previousButton = document.querySelectorAll('.swiper-button-prev');
      for (let index = 0; index < nextButton.length; index += 1) {
        const element = nextButton[index];
        element.addEventListener('click', (e) => {
          e.currentTarget.parentNode.querySelector('.swiper-container').swiper.slideNext();
        });
      }

      for (let index = 0; index < previousButton.length; index += 1) {
        const element = previousButton[index];
        element.addEventListener('click', (e) => {
          e.currentTarget.parentNode.querySelector('.swiper-container').swiper.slidePrev();
        });
      }
    }
  }, 100);
};

