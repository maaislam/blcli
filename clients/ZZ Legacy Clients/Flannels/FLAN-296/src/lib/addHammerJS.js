import { pollerLite } from '../../../../../lib/utils';
import { hammer } from './hammer';

export default () => {
    pollerLite(['#hotspotModal'], () => {
        let contentHolder = document.getElementById('hotspotModal')
        if (window.outerWidth < 780) {
            var hammertime = new Hammer(contentHolder);
            hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
            hammertime.on('swipedown', function (ev) {
                document.querySelector('#hotspotModal .close').click();
            });
        }


    });
    
}
