import settings from './settings';
import pubSub from './PublishSubscribe';

/**
 * Create Video
 * @return {HTMLVideoElement}
 */
export const createVideo = (src) => {
  const v = document.createElement('video');
  v.classList.add(settings.ID + '-video');

  v.setAttribute('playsinline', '');
  v.setAttribute('muted', '');

  src.forEach((s) => {
    const source = document.createElement('source');
    source.src = s.src;
    source.type = s.type;

    v.appendChild(source);
  });

  return v;
};

/**
 * Video controls
 *
 * @param {HTMLVideoElement} video
 * @return {HTMLVideoElement}
 */
export const showControls = (video) => {
  video.controls = true;

  return video;
};

/**
 * Mute video
 *
 * @param {HTMLVideoElement} video
 * @return {HTMLVideoElement}
 */
export const muteVideo = (video) => {
  video.muted = true;

  return video;
};

/**
 * Set autoplay
 *
 * Note this may not likely to come into play as we're embedding the video
 * post DOM-load
 *
 * Video.play() should also be invoked once it's added to the dom
 *
 * @param {HTMLVideoElement} video
 * @return {HTMLVideoElement}
 */
export const setAutoplay = (video) => {
  video.autoplay = true;

  return video;
};

/**
 * On can play
 *
 * @return {Promise}
 */
export const videoIsReady = (video) => {
  return new Promise((res, rej) => {
    video.addEventListener('canplay', () => {
      res();
    });
  });
};

/**
 * On interaction
 *
 * @param {HTMLVideoElement} video
 * @return {HTMLVideoElement}
 */
export const initVideoSubscribers = (video) => {
  video.addEventListener('pause', () => {
    pubSub.publish('video-interaction', 'paused');

    video.addEventListener('play', () => {
      // Only bind after first time paused
      pubSub.publish('video-interaction', 'played');
    });
  });

  video.addEventListener('ended', () => {
    pubSub.publish('video-interaction', 'ended');
  });

  return video;
};

/**
 * Play video
 *
 * @param {HTMLVideoElement} video
 * @return {HTMLVideoElement}
 */
export const playVideo = (video) => {
  video.play();

  return video;
};
