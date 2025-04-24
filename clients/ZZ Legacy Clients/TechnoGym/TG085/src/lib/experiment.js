/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import ZwiftSection from './components/zwiftSection';
import Lightbox from './components/lightbox';
import settings from './settings';

const activate = () => {
  setup();
  const zwiftWrap = new ZwiftSection();

  // This overrides TG082 scroll offset
  window.TG082ScrollOffset = 0;

  const lightbox = new Lightbox(settings.ID, {
    content: `<h2>Learn more about Zwift and MyRun features</h2>
    <div class="${settings.ID}-lightboxInner">
    <p>Other content in this brochure includes:</p>
      <ul>
        <li>MyRun</li>
        <li>MyRun App</li>
        <li>Technical Specifications</li>
        <li>Contact Info</li>
      </ul>
    </div>
    <div class="${settings.ID}-lightboxCTA">Request & Download</div>`,
  });
};

export default activate;
