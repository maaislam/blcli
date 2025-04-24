import { pollerLite } from '../../../../../../../../../lib/uc-lib';
import scrollToElement from './scrollTo';

export default () => {
  const allVideos = {
    MYRUN: 'https://player.vimeo.com/external/235761511.hd.mp4?s=429de48db636031a77016939e3c956ef2a03bcf4&profile_id=175',
    MYCYCLING: 'https://player.vimeo.com/external/268036869.hd.mp4?s=a8b1be6b865c03a5b1c27a57f765f83b191a3a56&profile_id=175',
    'SKILLROW™': 'https://player.vimeo.com/external/207658117.hd.mp4?s=92796364c0e6927611a059f22e9992d11d2af94d&profile_id=175',
    'RUN PERSONAL': 'https://player.vimeo.com/external/288528394.hd.mp4?s=83c83e6e2ff5c13f01404872de76f9b9e54749cc&profile_id=175',
  };

  const titleText = document.querySelector('.TG103-textContent');
  const arrow = document.querySelector('.TG103-bottomArrow');
  const playVideoButton = document.querySelector('.TG103-play_video');
  /**
   * @desc Create the video container which is shown when play video is clicked
   */
  const createVideo = () => {
    // create the video
    const productVideo = document.createElement('video');
    productVideo.id = 'TG103-videoPlayer';
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
    const video = document.querySelector('.TG103-video');
    video.appendChild(productVideo);
  };

  /**
   * @desc Append and play the video
   */
  const runVideo = () => {
    pollerLite(['.TG103-video video'], () => {
      const video = document.querySelector('.TG103-video video');
      titleText.classList.add('TG103-hide_text');
      video.play();
    });
  };

  /**
  * @desc Remove the video on the arrow click
  */
  const removeTheVideo = () => {
    const video = document.querySelector('#TG103-videoPlayer');
    titleText.classList.remove('TG103-hide_text');
    video.remove();
  };

  const arrowScroll = () => {
    let overView;
    overView = document.querySelector('#TG103-mainProduct');
    scrollToElement(overView);
  };

  /**
  * @desc Check when the video ends and anchor the page
  */
  const videoEnded = () => {
    pollerLite(['#TG103-videoPlayer'], () => {
      document.querySelector('#TG103-videoPlayer').addEventListener('ended', () => {
        arrowScroll();

        document.querySelector('.TG103-textContent').classList.remove('TG103-hide_text');
        document.querySelector('#TG103-videoPlayer').remove();
      });
    });
  };

  pollerLite(['.TG103-textContent', '.TG103-play_video'], () => {
    // on click of the play button
    playVideoButton.addEventListener('click', () => {
      createVideo();
      runVideo();
      videoEnded();
    });
    // on click of the arrow if video exists
    arrow.addEventListener('click', () => {
      if (document.querySelector('.TG103-video video')) {
        removeTheVideo();
      }
    });
  });

  // on click of the arrow
  pollerLite(['.TG103-bottomArrow'], () => {
    arrow.addEventListener('click', () => {
      arrowScroll();
    });
  });
};
