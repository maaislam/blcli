/*eslint-disable no-underscore-dangle */
const wistiaTrackings = (wID, fireEvent) => {
  //const WISTIA_ID = variation === 'control' ? '4c570et3gk' : wistiaId();

  const trackingPoints = [9, 18, 27, 36, 47, 56, 64, 73, 82, 91, 100];

  let counter;
  window._wq = window._wq || [];
  window._wq.push({
    id: wID,
    onReady: (video) => {
      counter = 1;

      video.bind('play', () => {
        if (counter === 1) {
          fireEvent('user starts the video');
        }
        if (counter > 1) {
          fireEvent('User rewatches the video');
        }
        counter++;
      });

      video.bind('pause', () => {
        const percentWatched = Math.round(video.percentWatched() * 100);
        fireEvent(`user pauses the video after watching ${percentWatched}%`);
      });
      video.bind('enterfullscreen', () => {
        fireEvent('user goes fullscreen');
      });
      video.bind('cancelfullscreen', () => {
        fireEvent('user exits fullscreen');
      });
      video.bind('percentwatchedchanged', (percent) => {
        const trackingPointmatched = trackingPoints.some((trackingPoint) => Math.round(percent * 100) === trackingPoint);
        if (trackingPointmatched) {
          fireEvent(`user has seen ${Math.round(percent * 100)}% of the video`);
        }
      });
    },
  });
};

export default wistiaTrackings;
