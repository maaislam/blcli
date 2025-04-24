 import Experiment from './experiment';
 import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
], Experiment.init);


function waitForElement(selector, callback){
  var poops = setInterval(function(){
      if(document.querySelector(selector)){
          clearInterval(poops);
          callback();
      }
  }, 100);
}

// ----------------------------------------------------------------
// Create Variables for content
// ----------------------------------------------------------------

//------------------ Product line menus ------------------------

var productLine = {
  'gb' : [
    '<div class="custom-product-line">',
      '<ul class="productLine">',
        '<li><span class="title">Product line</span></li>',
        '<li><a class="tg42-all" data-attr="all">View All</a></li>',
        '<li><a data-attr="artis">ARTIS</a></li>',
        '<li><a data-attr="excite">Excite</a></li>',
        '<li><a data-attr="forma">Forma</a></li>',
        '<li><a data-attr="myrun">MYRUN</a></li>',
        '<li><a data-attr="personal">Personal</a></li>',
        '<li><a data-attr="skillline">SKILL LINE</a></li>',
      '</ul>',
    '</div>'
  ].join(''),
  'it' : [
    '<div class="custom-product-line">',
      '<ul class="productLine">',
        '<li><span class="title">Product line</span></li>',
        '<li><a class="tg42-all" data-attr="all">View All</a></li>',
        '<li><a data-attr="artis">ARTIS</a></li>',
        '<li><a data-attr="excite">Excite</a></li>',
        '<li><a data-attr="forma">Forma</a></li>',
        '<li><a data-attr="myrun">MYRUN</a></li>',
        '<li><a data-attr="personal">Personal</a></li>',
        '<li><a data-attr="skillline">SKILL LINE</a></li>',
      '</ul>',
    '</div>'
    ].join('')
}; 

var categorySubTitle = {
  'gb' : 'Our selection of high-end, premium and professional treadmills feature state-of-the-art technology, design and entertainment. Designed to give you the best user experience every time.',
  'it' : 'Our selection of high-end, premium and professional treadmills feature state-of-the-art technology, design and entertainment. Designed to give you the best user experience every time.' 
} 

//--------------- Product slides-------------

var productSlide = {
'gb': [
  {
    'image1' : '//cdn.optimizely.com/img/8355110909/07aae19990194e1eb6bf928f992ff537.jpg',
    'altText1': 'Myrun',
    'imageTitle1': 'Myrun',
    'image2' : '//cdn.optimizely.com/img/8355110909/65fc32d1a11e403e8cdfe70bcd7e83b2.jpg',
    'altText2': 'Myrun',
    'imageTitle2': 'Myrun',
    'image3' : '//cdn.optimizely.com/img/8355110909/16f88ee921cf4ad7a93e9aa6d34c86d5.jpg',
    'altText3': 'Myrun',
    'imageTitle3': 'Myrun',
    'link': 'https://www.technogym.com/gb/treadmill-myrun.html',
    'Title' : 'Myrun',
    'line': 'MYRUN',
    'Price' : '£3,250',
    // 'SmallDescription':'Benjamin Franklin, inventor, statesman, writer, publisher and economist relates in his autobiography that early in his life he decided to focus on arriving at moral perfection.'
    'SmallDescription':'Dedicated to those who love <span>technology</span> and <span>music</span>. Thanks to its tracking feature you can measure cadence, step length and torso oscillation for constant monitoring of your technique. Running on the treadmill is more fun with MYRUN and its running music function: the tracks will be selected directly from the playlist contained in the device, but only those that best suit the running rhythm.',
  },
  {
    'image1' : '//cdn.optimizely.com/img/8355110909/a66bef325e3e45179a763664fa6fb54e.jpg',
    'altText1': 'Run Personal',
    'imageTitle1': 'Run Personal',
    'image2' : '//cdn.optimizely.com/img/8355110909/6d922848d5014efab59d8c9c3e2d3e43.jpg',
    'altText2': 'Run Personal',
    'imageTitle2': 'Run Personal',
    'image3' : '//cdn.optimizely.com/img/8355110909/3eda577a17e44a09884dbb19d7ae4e12.jpg',
    'altText3': 'Run Personal',
    'imageTitle3': 'Run Personal',
    'link': 'https://www.technogym.com/gb/run-personal.html',
    'Title' : 'Run Personal',
    'line': 'Personal',
    'Price' : '£13,000',
    // 'SmallDescription':'Professional equipment meets designer style with the Run Personal treadmill. Often situated in luxuary hotels and spas around the world as well as large home gyms and loved by the professionals. '
    'SmallDescription':'A true piece of interior <span>art</span> and made for <span>design lovers</span>. Run Personal is a synthesis of innovative materials and design. Born out of the collaboration between Technogym and Antonio Citterio Design Studio for professional cardio training and pure entertainment during a run. Run Personal was also built for sports performance: the engine, powerful and silent, adapts to any type of exercise, from simple walking to high intensity training.'
  },
  {
    'image1' : '//cdn.optimizely.com/img/8355110909/4305406aa3754396954cfa3419bd8d6b.jpg',
    'altText1': 'Jog Forma',
    'imageTitle1': 'Jog Forma',
    'image2' : '//cdn.optimizely.com/img/8355110909/9b32615556b04798ac617f39923b8cf0.jpg',
    'altText2': 'Jog Forma',
    'imageTitle2': 'Jog Forma',
    'image3' : '//cdn.optimizely.com/img/8355110909/eda97f04bc5d4ca39a2fc74a6cf05806.jpg',
    'altText3': 'Jog Forma',
    'imageTitle3': 'Jog Forma',
    'link': 'https://www.technogym.com/gb/jog-excite-forma.html',
    'Title' : 'Jog Forma',
    'line': 'Forma',
    'Price' : '£6,190',
    // 'SmallDescription':'Benjamin Franklin, inventor, statesman, writer, publisher and economist relates in his autobiography that early in his life he decided to focus on arriving at moral perfection.'
    'SmallDescription':'Designed for those who <span>love functionality</span>. Jog Forma is a professional treadmill that combines performance and functionality. It allows simple and effective workouts thanks to the new user interface with QR code guidance and new hand sensors. The CPR system follows your heart rate, automatically adjusting the treadmill settings to constantly provide you with a safe and effective workout.'
  },
  {
    'image1' : '//cdn.optimizely.com/img/8355110909/a4c5085cf0c345e2a06917a5953df455.jpg',
    'altText1': 'Artis Run',
    'imageTitle1': 'Artis Run',
    'image2' : '//cdn.optimizely.com/img/8355110909/e7b36730652c45c6abffd6812a38bc39.jpg',
    'altText2': 'Artis Run',
    'imageTitle2': 'Artis Run',
    'image3' : '//cdn.optimizely.com/img/8355110909/8b27f044ad7d45bdaec936bc571db515.jpg',
    'altText3': 'Artis Run',
    'imageTitle3': 'Artis Run',
    'link': 'https://www.technogym.com/gb/treadmill-artis-run-standard.html',
    'Title' : 'Artis Run',
    'line': 'Artis',
    'Price' : 'REQUEST A QUOTE',
    // 'SmallDescription':'Benjamin Franklin, inventor, statesman, writer, publisher and economist relates in his autobiography that early in his life he decided to focus on arriving at moral perfection.'
    'SmallDescription':'Once you’ve tried running on an ARTIS treadmill, no other treadmill can compare. It combines the highest standards of design, technology and connectivity. Equipped with the widest running surface on the market, speed shift control for uninterrupted workouts and the latest UNITY 3.0 technology, users can track data, take part in virtual races and gain access to customisable content.'
  },
  {
    'image1' : '//cdn.optimizely.com/img/8355110909/f05e363283d241d68b32797783801066.jpg',
    'altText1': 'Excite run 600',
    'imageTitle1': 'Excite run 600',
    'image2' : '//cdn.optimizely.com/img/8355110909/99d6da58f8344623ab3f32c6f8f57fbc.jpg',
    'altText2': 'Excite run 600',
    'imageTitle2': 'Excite run 600',
    'image3' : '//cdn.optimizely.com/img/8355110909/36ecfba00747437e80fbc4f8ded9d26f.jpg',
    'altText3': 'Excite run 600',
    'imageTitle3': 'Excite run 600',
    'link': 'https://www.technogym.com/gb/treadmill-excite-600.html',
    'Title' : 'Excite run 600',
    'line': 'Excite',
    'Price' : 'REQUEST A QUOTE',
    // 'SmallDescription':'Benjamin Franklin, inventor, statesman, writer, publisher and economist relates in his autobiography that early in his life he decided to focus on arriving at moral perfection.'
    'SmallDescription':'Excite Run 600 is a <span>versatile</span> and <span>sturdy treadmill</span> in a contemporary style that offers new ergonomic features such as the reduced deck height to improve accessibility. The treadmill has a powerful engine and features new exercise and entertainment options with refreshed graphics, promising more challenge, fun and motivation.'
  },
  {
    'image1' : '//cdn.optimizely.com/img/8355110909/4cc1c0e5e9ed461ab57dfa4b85959595.jpg',
    'altText1': 'Excite Run 1000',
    'imageTitle1': 'Excite Run 1000',
    'image2' : '//cdn.optimizely.com/img/8355110909/0e3b6b22262d4d2a8a02933a53a73507.jpg',
    'altText2': 'Excite Run 1000',
    'imageTitle2': 'Excite Run 1000',
    'image3' : '//cdn.optimizely.com/img/8355110909/096d11b795c34dc39e4e2ab081b51d7a.jpg',
    'altText3': 'Excite Run 1000',
    'imageTitle3': 'Excite Run 1000',
    'link': 'https://www.technogym.com/gb/treadmill-excite-1000.html',
    'Title' : 'Excite run 1000',
    'line': 'Excite',
    'Price' : 'REQUEST A QUOTE',
    // 'SmallDescription':'Benjamin Franklin, inventor, statesman, writer, publisher and economist relates in his autobiography that early in his life he decided to focus on arriving at moral perfection.'
    'SmallDescription':'Excite RUN 1000 makes you enjoy the <span>natural sensation</span> of running on an adaptive surface. The UNITY 3.0 console offers a fully connected experience enriched with new interval training workouts. You can also recreate your favourite outdoor runs or challenge your friends in a marathon with RACES.'
  },
  {
    'image1' : '//cdn.optimizely.com/img/8355110909/4583a126f89e432d8e2d19bf11ffb662.jpg',
    'altText1': 'Skill Run',
    'imageTitle1': 'Skill Run',
    'image2' : '//cdn.optimizely.com/img/8355110909/649ceeb233f74a16a6b2d7be42286549.jpg',
    'altText2': 'Skill Run',
    'imageTitle2': 'Skill Run',
    'image3' : '//cdn.optimizely.com/img/8355110909/d86bf61d963649128abc44d6c99797ba.jpg',
    'altText3': 'Skill Run',
    'imageTitle3': 'Skill Run',
    'link': 'https://www.technogym.com/gb/skillrun.html',
    'Title' : 'Skillrun',
    'line': 'Skill line',
    'Price' : 'REQUEST A QUOTE',
    // 'SmallDescription':'Benjamin Franklin, inventor, statesman, writer, publisher and economist relates in his autobiography that early in his life he decided to focus on arriving at moral perfection.'
    'SmallDescription':'SKILLRUN is the <span>first piece</span> of running equipment designed to meet the training requirements of elite athletes and demanding fitness enthusiasts. Thanks to its unique MULTIDRIVE TECHNOLOGY™, users can combine well-rounded cardio and power training in a single solution. More than a treadmill, the SKILLRUN enhances your workout with speciality training modes and simulations to keep you engaged and motivated for your next workout.'
  },
  {
    'image1' : '//cdn.optimizely.com/img/8355110909/44f6078ba5f5483ebbb33130227067f9.jpg',
    'altText1': 'Skillmill Go',
    'imageTitle1': 'Skillmill Go',
    'image2' : '//cdn.optimizely.com/img/8355110909/38d265295cd44f7f8fb4e829da88f832.jpg',
    'altText2': 'Skillmill Go',
    'imageTitle2': 'Skillmill Go',
    'image3' : '//cdn.optimizely.com/img/8355110909/bae6e0bfe15f4f328cc6a8c96680962c.jpg',
    'altText3': 'Skillmill Go',
    'imageTitle3': 'Skillmill Go',
    'link': 'https://www.technogym.com/gb/skillmill-go-1.html',
    'Title' : 'Skillmill Go',
    'line': 'Skill line',
    'Price' : '£8,550',
    'SmallDescription':"SKILLMILL was designed as a <span>non-motorised</span> treadmill to give you the experience of running at full speed. You can enjoy using the product with resistance for a wider range of movement reinforcing power, speed, stamina and agility. SKILLMILL GO is the console free version which is perfect for those who want to focus on athletic performance training with the supervision of a trainer or it can be used with the support of Virtual Training solution for professional home based workouts."
  },
  {
    // 'image1' : '//cdn.optimizely.com/img/8355110909/1c0acba2a3214a5fb294f4fda3cf841c.jpg',
    'image1': 'https://cdn.optimizely.com/img/8355110909/44f6078ba5f5483ebbb33130227067f9.jpg',
    'altText1': 'Skillmill Connect',
    'imageTitle1': 'Skillmill Connect',
    'image2' : '//cdn.optimizely.com/img/8355110909/3dcffc711de04b01b6759d087571be7f.jpg',
    'altText2': 'Skillmill Connect',
    'imageTitle2': 'Skillmill Connect',
    'image3' : '//cdn.optimizely.com/img/8355110909/d6b43be351124654a4e4862c88102704.jpg',
    'altText3': 'Skillmill Connect',
    'imageTitle3': 'Skillmill Connect',
    'link': 'https://www.technogym.com/gb/skillmill-connect.html',
    'Title' : 'Skillmill Connect',
    'line': 'Skill line',
    'Price' : '£9,680',
    'SmallDescription':"SKILLMILL Connect's <span>tracking</span> function works in <span>real time</span> and sends and stores your data through the Technogym mywellness open platform.  Equipped with a 7” LCD display with backlight, it's perfect for spaces which have darker lighting. It can also be paired with the UNITY SELF SKILLMILL APP, an interactive touch screen kiosk to allow trainers to lead and manage Athletic Performance training sessions.  Made for data obsessed users for everyday evaluation and improvement."
  },
  {
    'image1' : '//cdn.optimizely.com/img/8355110909/b105e7342c9a400faf3f2f85bd60f2ad.jpg',
    'altText1': 'Skillmill Console',
    'imageTitle1': 'Skillmill Console',
    'image2' : '//cdn.optimizely.com/img/8355110909/afe76f74ea854251aeb816b33f10d198.jpg',
    'altText2': 'Skillmill Console',
    'imageTitle2': 'Skillmill Console',
    'image3' : '//cdn.optimizely.com/img/8355110909/b41d0cbca9e345c68c5f2de66d09f9aa.jpg',
    'altText3': 'Skillmill Console',
    'imageTitle3': 'Skillmill Console',
    'link': 'https://www.technogym.com/gb/skillmill-console-1.html',
    'Title' : 'Skillmill Console',
    'line': 'Skill line',
    'Price' : 'REQUEST A QUOTE',
    'SmallDescription':"Users enjoy all the benefits of SKILLATHLETIC training and the ability to monitor their physiological workout parameters in real time with the console which activates only on use. The console also uses a rechargeable battery. It comes equipped with an easy-to-read display and the touch sensitive keypad features everything you need to have a safe and engaging High Intensity Training session."
  },
],
'it': [
]
};

var countryKey = location.pathname.split('/')[1];

var itemProdHtml = '';
productSlide[countryKey].forEach(function (ele) {
var mainClass = ele.Price? 'item-product' : 'item-product price-request-quote';
var productLineLocal = ' ' + ele.line.toLowerCase().replace(' ', '');
var temp = '<div class="' + mainClass + productLineLocal + '">';
temp += '<div class="custom-product-slides"> <div id="slider-rap" class="wp-block slider-wrapper slider-wrapper-0">';
temp += '<div class="swiper-container slider-container"><div class="swiper-wrapper">';
temp += '<div class="swiper-slide">';
temp += '<a href="' + ele.link + '" class="call-to-action"> <img src="' + ele.image1 +'" alt="' + ele.altText1 +'" title="' + ele.imageTitle1 + '"/> </a>';
temp += '</div>';
temp += '<div class="swiper-slide">';
temp += '<a class="call-to-action" href="' + ele.link + '"> <img src="' + ele.image2 +'" alt="' + ele.altText2 +'" title="' + ele.imageTitle2 + '"/> </a>';
temp += '</div>';
temp += '<div class="swiper-slide">';
temp += '<a class="call-to-action" href="' + ele.link + '">';
temp += '<img src="' + ele.image3 +'" alt="' + ele.altText3 +'" title="' + ele.imageTitle3 + '"/>';
temp += '</a> </div>';
temp += '</div>';
temp += '<div class="swiper-pagination"></div>';
temp += '</div></div>';
temp += '<div class="custom-product-slides">';
temp += '<h1><a href="' + ele.link + '">' + ele.Title + '</a></h1>';
temp += '<h5>LINE : ' + ele.line + ' | ' + ele.Price + '</h5> <p>' + ele.SmallDescription + '</p></div></div></div>';
itemProdHtml = itemProdHtml + temp; 
});


//------------------ Need Help Section ------------------------ 
var needHelp = {
'gb' : [
'<div class="custom-needHelp">',
'<p>Want some advice choosing your fitness equipment? <br />We are always happy to advise and support you. <a href="https://www.technogym.com/gb/contacts/">Click here</a></p>',
'</div>'
].join(''),
'it' : [
'<div class="custom-needHelp">',
'<p>Want some advice choosing your fitness equipment? <br />We are always happy to advise and support you. <a href="https://www.technogym.com/gb/contacts/">Click here</a></p>',
'</div>'
  ].join('')
}; 


//------------------ Two column right image Section content------------------------ 

var improveWorkout = {
'gb' : [
'Our range of treadmills combines ease-of-use and comfort with some of the most innovative and user-friendly technology to create an experience that allows you to workout harder and for longer. Treadmills are among the most popular pieces of ',
'<strong>cardio equipment</strong>.<br>',
'<h2>Improved Cardio Workouts</h2>',
'Technogym treadmills utilise some of the latest production techniques to improve every part of your workout experience. ',
'This includes the <a href="https://www.technogym.com/gb/treadmill-excite-1000.html">Run 1000 Excite</a>\, which features Fast Track Controls that allow you to easily adjust the speed and incline of your training without having to adjust your running posture. ',
'The cushioned running surface automatically adapts to your running style, to ensure you get the best experience every time.<br>',
'As well as improving workouts, our treadmills provide you with data from your training sessions to help you achieve your fitness goals, whether they are to tone up, lose weight or improve your overall level of fitness.'
].join(''),
'it' : [
'Our range of treadmills combines ease-of-use and comfort with some of the most innovative and user-friendly technology to create an experience that allows you to workout harder and for longer. Treadmills are among the most popular pieces of ',
'<strong>cardio equipment</strong>.<br>',
'<h2>Improved Cardio Workouts</h2>',
'Technogym treadmills utilise some of the latest production techniques to improve every part of your workout experience. ',
'This includes the <a href="https://www.technogym.com/gb/treadmill-excite-1000.html">Run 1000 Excite</a>\, which features Fast Track Controls that allow you to easily adjust the speed and incline of your training without having to adjust your running posture. ',
'The cushioned running surface automatically adapts to your running style, to ensure you get the best experience every time.<br>',
'As well as improving workouts, our treadmills provide you with data from your training sessions to help you achieve your fitness goals, whether they are to tone up, lose weight or improve your overall level of fitness.'
].join('')
}; 


//------------------ Two column left image Section content------------------------ 
var wellnessTechnology = {
'gb' : [
'<h2>Endlessly Adaptable Wellness Technology</h2>',
'As with all Technogym products, our treadmills are endlessly adaptable, offering a professional-standard product whatever your needs and for whatever size requirements you may have, with delivery and expert',
'installation available for all products.<br>',
'<h2>Fitness for Everyone</h2>',
'You\'ll find treadmills for every application, including equipment that can help with the recovery of muscular injuries and equipment featuring our ',
'<a href="https://www.technogym.com/gb/who-we-are/unity/">UNITY</a> systems, which include games that let you challenge friends to beat your performance to help you exercise and stay engaged while training.<p></p>'
].join(''),
'it' : [
'<h2>Endlessly Adaptable Wellness Technology</h2>',
'As with all Technogym products, our treadmills are endlessly adaptable, offering a professional-standard product whatever your needs and for whatever size requirements you may have, with delivery and expert',
'installation available for all products.<br>',
'<h2>Fitness for Everyone</h2>',
'You\'ll find treadmills for every application, including equipment that can help with the recovery of muscular injuries and equipment featuring our ',
'<a href="https://www.technogym.com/gb/who-we-are/unity/">UNITY</a> systems, which include games that let you challenge friends to beat your performance to help you exercise and stay engaged while training.<p></p>'
  ].join('')
}; 


//------------------ Two column equal Section ------------------------
var twoColEqual = [
'<div class="custom-two-column">',
'<h1>Treadmills</h1>',
'<div class="custom-two-col-equal clearBoth">',
'<div class="customColumn content">'+ improveWorkout[countryKey] +'</div>',
'<div class="customColumn imageBackground"><img src="//cdn-3.convertexperiments.com/uf/1002628/1002262/1521712376right.png"></div>',
'</div>',
'<div class="custom-two-col-equal clearBoth">',
'<div class="customColumn imageBackground"><img src="//cdn-3.convertexperiments.com/uf/1002628/1002262/1521712417man.png"></div>',
'<div class="customColumn content">'+ wellnessTechnology[countryKey] +'</div>',
'</div>',
'</div>'
].join('');

var twoColEqual = {
'gb' : [
'<div class="custom-two-column">',
'<h1>Treadmills</h1>',
'<div class="custom-two-col-equal clearBoth">',
'<div class="customColumn content">'+ improveWorkout[countryKey] +'</div>',
'<div class="customColumn imageBackground"><img src="//cdn.optimizely.com/img/8355110909/78f5e686a70d4a46851655e0fe57625e.jpg"></div>',
'</div>',
'<div class="custom-two-col-equal clearBoth">',
'<div class="customColumn imageBackground"><img src="//cdn-3.convertexperiments.com/uf/1002628/1002262/1521712417man.png"></div>',
'<div class="customColumn content">'+ wellnessTechnology[countryKey] +'</div>',
'</div>',
'</div>'
].join(''),
'it' : [
'<div class="custom-two-column">',
'<h1>Treadmills</h1>',
'<div class="custom-two-col-equal clearBoth">',
'<div class="customColumn content">'+ improveWorkout[countryKey] +'</div>',
'<div class="customColumn imageBackground"><img src="//cdn.optimizely.com/img/8355110909/78f5e686a70d4a46851655e0fe57625e.jpg"></div>',
'</div>',
'<div class="custom-two-col-equal clearBoth">',
'<div class="customColumn imageBackground"><img src="//cdn-3.convertexperiments.com/uf/1002628/1002262/1521712417man.png"></div>',
'<div class="customColumn content">'+ wellnessTechnology[countryKey] +'</div>',
'</div>',
'</div>'
  ].join('')
}; 



waitForElement('.category-title >h1', function () {
  jQuery('.category-title >h1').after('<h2>'+ categorySubTitle[countryKey] +'</h2>');
});

jQuery('body').append('<div class="overlayTech"></div>');

jQuery(function () {

	jQuery('#amshopby-page-container .category-title').after(productLine[countryKey]);

	jQuery('.bottom-bar').after(needHelp[countryKey]);

	jQuery('.custom-needHelp').after(twoColEqual[countryKey]);
	var waitForObjectReady = setInterval(function () {
		if(typeof swiperSliders == "object") {
			clearInterval(waitForObjectReady);
			jQuery('.category-products').html(itemProdHtml);
			var mySwiper = new Swiper('#slider-rap .swiper-container', {
				speed: 400,
				spaceBetween: 100,
				paginationClickable: true,
				pagination: '.swiper-pagination'
			});
		}
	}, 100);
	/*
	setTimeout(function () {

	}, 2000);
	*/

	jQuery('.custom-product-line > .productLine a').click(function () {
		jQuery('.custom-product-line > .productLine a').removeClass('activate');
		jQuery('.custom-product-line > .productLine a').removeClass('active');
		jQuery('overlayTech').addClass('activate');
		jQuery(this).addClass('active');
		var getLine = jQuery(this).attr('data-attr');
		jQuery('.item-product').css('display', 'none');
		jQuery('.' + getLine).css('display', 'block');
		jQuery('overlayTech').removeClass('activate');	
  });
  
  /**
   * Amends by Josh 12/6/18
   */
  jQuery('.tg42-all').click(function() {
    jQuery('.custom-product-line > .productLine a').removeClass('activate');
    jQuery('.custom-product-line > .productLine a').removeClass('active');
    jQuery(this).addClass('active');
    jQuery('.item-product:not(.not-price-request-quote)').css('display', 'block');
  });

});
