import { __ } from '../../helpers';
/**
 * @desc Markup for the video
 */
const topImageHtml = [
  `<div class="TG071-image_wrapper">
    <div class="TG071-image"></div>
    <div class="TG071-video"></div>
    <div class="TG071-lines"></div>
    <div class="TG071-textContent">
      <h1><span>${__('MYRUN')}</span>${__('THE PLEASURE')} <span> ${__('OF RUNNING')}</span></h1>
      <div class="TG071-buttons">
        <div class="TG071-button TG071-play_video"></div>
      </div>
    </div>
    <div class="TG071-bottomArrow"></div>
  </div>
`,
].join();

export default topImageHtml;
