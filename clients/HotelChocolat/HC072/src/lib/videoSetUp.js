import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import data from './expData';

const { ID, VARIATION } = shared;

export const getVideoUrl = () => {
  const prodSku = dataLayer[0].product_ID;
  let prodVideo = '';

  if (!!data[`${prodSku}`]) {
    prodVideo = data[`${prodSku}`].video;
  }

  return prodVideo;
}

export const addYTapi = () => {
  var tag = document.createElement('script');
  tag.className = `youtube`;
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

export const loadYTvideo = () => {
  let player;
  function readyYoutube() {
      if ((typeof YT !== "undefined") && YT && YT.Player) {
          player = new YT.Player('player', {
              height: "100%",
              width: "100%",
              videoId: 'C6yi9hN2mfs',
              playerVars: {
                'rel': 0, 
              },
              events: {
                'onStateChange': onPlayerStateChange,
              }
          });
          let done = false;
          function onPlayerStateChange(event) {
              if (event.data == YT.PlayerState.PLAYING && !done) {
                  done = true;
              }
          }
      } else {
          setTimeout(readyYoutube, 1000);
      }
  }
  readyYoutube();
}



export const addAndPlayVideo = () => {
  const videoUrl = getVideoUrl();
  // --- Defined SKUs
  if (videoUrl !== '') {
    //https://hotelchocolat.com/on/demandware.static/-/Sites-HotelChocolat-Library/default/dweed62486/VIDEOS/
    let videoPlayer = `<video class="${ID}-video__v${VARIATION}" autoplay="true" controls="true" style="width: 100%;" preload="yes" controlslist="nodownload" disablepictureinpicture playsinline 
    src="https://ucds.ams3.digitaloceanspaces.com/hc072/${getVideoUrl()}" type="video/mp4">
      <source src="https://ucds.ams3.digitaloceanspaces.com/hc072/${getVideoUrl()}"
        type="video/mp4">

      Sorry, your browser doesn't support embedded videos.
    </video>`;
    if (VARIATION == '1' || VARIATION == '3' ) {
      document.querySelector(`body`).classList.add(`${ID}-noScroll`);
      document.querySelector('body').insertAdjacentHTML('afterbegin', `<div class="${ID}-video__wrapper"><div class="${ID}-closeIcon"></div></div>`);
      closeVideo();
  
      const video = document.createElement('div');
      video.classList.add(`${ID}-video`);
      video.innerHTML = `<div id="player"></div>`;
      document.querySelector(`.${ID}-video__wrapper`).appendChild(video);

      document.querySelector(`.${ID}-video__wrapper #player`).insertAdjacentHTML('afterbegin', videoPlayer);

    } else if (VARIATION == '2') {
      if( document.querySelector(`.product-primary-image img.primary-image`)) {
        document.querySelector(`.product-primary-image img.primary-image`).insertAdjacentHTML('afterend', videoPlayer);

        addNewThumb();
        showCarouselVideo();
      } else {

          // Add Thumb
       

        const imageContent = `<div class="${ID}-imageBlock thumb">${videoPlayer}</div>`;
        let jQuery = null;
        jQuery = window.jQuery || window.$;
        if (window.$.fn.slick) {
          jQuery('#thumbnails').slick('slickAdd', imageContent); // this adds it to the end of the carousel
          jQuery('#thumbnails').slick('refresh'); // this refreshes
          jQuery('#thumbnails').slick('resize'); // I just put this in to stop the width messing up
        }

      
  
      //showCarouselVideo();
      }
  
      
    }
  // All Other PDPs - Using Youtube
  } else {
    // --- Add YT API
    if (!document.querySelector(`body.${ID}-yt`)) {
      addYTapi();
      document.querySelector(`body`).classList.add(`${ID}-yt`);
    }

    const video = document.createElement('div');
    video.classList.add(`${ID}-video`);
    video.innerHTML = `<div id="player"></div>`;

    if (VARIATION == '1' || VARIATION == '3') {
      document.querySelector(`body`).classList.add(`${ID}-noScroll`);
      document.querySelector('body').insertAdjacentHTML('afterbegin', `<div class="${ID}-video__wrapper"><div class="${ID}-closeIcon"></div></div>`);
      closeVideo();

      document.querySelector(`.${ID}-video__wrapper`).appendChild(video);

      loadYTvideo();
    } else if (VARIATION == '2') {

      let videoPlayer = `<div class="${ID}-video__v${VARIATION} ${ID}-video-yt" style="width: 100%;"></div>`;

      if(document.querySelector(`.product-primary-image img.primary-image`)) {
        document.querySelector(`.product-primary-image img.primary-image`).insertAdjacentHTML('afterend', videoPlayer);
        document.querySelector(`.${ID}-video__v${VARIATION}`).insertAdjacentElement('afterbegin', video);
        loadYTvideo();
      } else {
       
        const imageContent = `
        <div class="${ID}-imageBlock thumb">
            <div class="${ID}-video__v${VARIATION} ${ID}-video-yt" style="width: 100%;">
              <div class="${ID}-video">
                <div id="player"></div>
              </div>
            </div>
        </div>`;

        let jQuery = null;
        jQuery = window.jQuery || window.$;
        if (window.$.fn.slick) {
          jQuery('#thumbnails').slick('slickAdd', imageContent); // this adds it to the end of the carousel
          jQuery('#thumbnails').slick('refresh'); // this refreshes
          jQuery('#thumbnails').slick('resize'); // I just put this in to stop the width messing up
        }
        loadYTvideo();
      }
     
  
      // Add Thumb
      addNewThumb();
      
      
     showCarouselVideo();
    } 
    
  }
  

  clickEvents();

}

export const closeVideo = () => {
  const videoWrapper = document.querySelector(`.${ID}-video__wrapper`);
  document.querySelector(`.${ID}-closeIcon`).addEventListener('click', (e) => {
    videoWrapper.parentElement.removeChild(videoWrapper);
    document.querySelector(`body`).classList.remove(`${ID}-noScroll`);

    fireEvent(`Click - Close Video`);
  }); 
}

export const showCarouselVideo = () => {
  observer.connect(document.querySelector(`#${ID}-video-thumb`), () => {
    if (document.querySelector(`#${ID}-video-thumb.selected`)) {
      // --- Video Slide is visible
      document.querySelector(`.${ID}-video__v2`).classList.add('show');
      document.querySelector('.product-primary-image img.primary-image').setAttribute('style', 'display: none;');

      fireEvent(`Visible - Video slide is active`);
    } else {
      document.querySelector(`.${ID}-video__v2`).classList.remove('show');
      document.querySelector('.product-primary-image img.primary-image').removeAttribute('style');
    }
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
      // subtree: true,
    },
  });

}

export const addNewThumb = () => {
  const thumbContainer = document.querySelector('#thumbnails');
  const newThumb = `<div class="thumb" id="${ID}-video-thumb">
  <a href="javascript:void(0)" class="thumbnail-link">
    <span class="active"></span>
    <img class="productthumbnail desktop" src="/on/demandware.static/Sites-HotelChocolat-Site/-/default/dwd0735cad/images/alt_image.png">
  </a></div>`
  thumbContainer.insertAdjacentHTML('beforeend', newThumb);
}

export const clickEvents = () => {
  if (VARIATION == '1' || VARIATION == '3') {
    if (document.querySelector(`.${ID}-video-btn`)) {
      document.querySelector(`.${ID}-video-btn`).addEventListener('click', (e) => {
        fireEvent(`Click - Play Video CTA`);
      });
    }
  }
}