/**
 * AV031 - Samples Shop: Homepage
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import Banner from './components/Banner';

export default () => {
  setup();

  const banner = new Banner({
    // desktop: 'https://dl.airtable.com/.attachmentThumbnails/2506548ca4df1208bbfdf403f462c6ec/50a5aac2',
    // mobile: 'https://dl.airtable.com/.attachmentThumbnails/b12b1b25b68a60b819806a062eb37dfe/b789e2e1',
    desktop: '#$(ContentManager:desktopBanner.png)!',
    // mobile: '#$(ContentManager:mobileBanner.png)!',
    mobile: '#$(ContentManager:mobileBanner__new.png)!',
    link: '/1106/sample-shop',
    render: ($banner) => {
      $banner.prependTo('#MainContentWrapper');
    },
  });
};
