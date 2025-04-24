/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import shared from '../../../../core-files/shared';

const { VARIATION } = shared;

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

const isPDP = !!window.location.href.match(/(\d+)[^-]*$/g);
const PDPRE = /.*(-)([\d]{7,8}(p)|[\d]{7,8}).*/;

const PDPcode = window.location.pathname.match(PDPRE)[2];


if(VARIATION === '1' && PDPcode || VARIATION === '2' && PDPcode) {
  fetch(`https://boots-optimisation.co.uk/compare-similar-items/${PDPcode}/`)
	.then((r) => r.json())
	.then((d) => {
		if (!ieChecks && isPDP) {
			if (!getCookie("Synthetic_Testing")) {
				pollerLite(["body", 
				"#estore_productpage_template_container > .rowContainer > .row", 
				'#estore_product_title', 
				'#PDP_productPrice', 
				'#estore_productpage_template_container #estore_pdp_blcol',
				'.rwdPointsContent strong',
				'meta[itemprop="reviewCount"]',
				'.bv_numReviews_text',
			
			], () => {
					activate(d.Data)
        });
			}
		}
	})
	.catch(() => {
		return;
	});

} else if(VARIATION === '3' && PDPcode || VARIATION === '4' && PDPcode) {
  fetch(`https://boots-optimisation.co.uk/v2/compare-similar-items/${PDPcode}/`)
	.then((r) => r.json())
	.then((d) => {
		if (!ieChecks && isPDP) {
			if (!getCookie("Synthetic_Testing")) {
				pollerLite(["body", 
				"#estore_productpage_template_container > .rowContainer > .row", 
				'#estore_product_title', 
				'#PDP_productPrice', 
				'#estore_productpage_template_container #estore_pdp_blcol',
				'.rwdPointsContent strong',
				'meta[itemprop="reviewCount"]',
				'.bv_numReviews_text',
			
			], () => {
					activate(d.Data)
        });
			}
		}
	})
	.catch(() => {
		return;
	});
}
