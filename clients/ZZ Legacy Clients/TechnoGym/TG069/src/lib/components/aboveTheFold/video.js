import { pollerLite } from '../../../../../../../lib/uc-lib';
import scrollToElement from './scrollTo';
import settings from '../../settings';

export default () => {
  const allVideos = {
    MYRUN: 'https://player.vimeo.com/external/458191257.hd.mp4?s=f494412d56d33bb3ae2b0ba63f9944ff8cbcf1b1&profile_id=175',
    MYCYCLING: 'https://player.vimeo.com/external/268036869.hd.mp4?s=a8b1be6b865c03a5b1c27a57f765f83b191a3a56&profile_id=175',
    'SKILLROW™': 'https://player.vimeo.com/external/207658117.hd.mp4?s=92796364c0e6927611a059f22e9992d11d2af94d&profile_id=175',
    'RUN PERSONAL': 'https://player.vimeo.com/external/288528394.hd.mp4?s=83c83e6e2ff5c13f01404872de76f9b9e54749cc&profile_id=175',
  };

  const titleText = document.querySelector('.TG069-textContent');
  const arrow = document.querySelector('.TG069-bottomArrow');
  const playVideoButton = document.querySelector('.TG069-play_video');
  /**
   * @desc Create the video container which is shown when play video is clicked
   */
  const createVideo = () => {
    // create the video
    const productVideo = document.createElement('video');
    productVideo.id = 'TG069-videoPlayer';
    productVideo.setAttribute('type', 'video/mp4');

    // add the video link
    const productName = document.querySelector('.product-name h1').textContent;
    for (let i = 0; i < Object.keys(allVideos).length; i += 1) {
      const data = Object.entries(allVideos)[i];
      const category = data[1];
      if (data[0] === productName) {
        productVideo.setAttribute('src', category);
      }
    }

    // add video the page
    const video = document.querySelector('.TG069-video');
    video.appendChild(productVideo);
  };

  /**
   * @desc Append and play the video
   */
  const runVideo = () => {
    pollerLite(['.TG069-video video'], () => {
      const video = document.querySelector('.TG069-video video');
      titleText.classList.add('TG069-hide_text');
      video.play();
    });
  };

  /**
  * @desc Remove the video on the arrow click
  */
  const removeTheVideo = () => {
    const video = document.querySelector('#TG069-videoPlayer');
    titleText.classList.remove('TG069-hide_text');
    video.remove();
  };

  const arrowScroll = () => {
    let overView;
    if (settings.VARIATION === '1') {
      overView = document.querySelector('#TG069-overview');
    } else if (settings.VARIATION === '2') {
      overView = document.querySelector('#TG069-mainProduct');
    }
    scrollToElement(overView);
  };

  /**
  * @desc Check when the video ends and anchor the page
  */
  const videoEnded = () => {
    pollerLite(['#TG069-videoPlayer'], () => {
      document.querySelector('#TG069-videoPlayer').addEventListener('ended', () => {
        arrowScroll();

        document.querySelector('.TG069-textContent').classList.remove('TG069-hide_text');
        document.querySelector('#TG069-videoPlayer').remove();
      });
    });
  };

  pollerLite(['.TG069-textContent', '.TG069-play_video'], () => {
    // on click of the play button
    playVideoButton.addEventListener('click', () => {
      createVideo();
      runVideo();
      videoEnded();
    });
    // on click of the arrow if video exists
    arrow.addEventListener('click', () => {
      if (document.querySelector('.TG069-video video')) {
        removeTheVideo();
      }
    });
  });

  // on click of the arrow
  pollerLite(['.TG069-bottomArrow'], () => {
    arrow.addEventListener('click', () => {
      arrowScroll();
    });
  });
};
