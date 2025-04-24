import shared from '../../../../../core-files/shared';
import {
  chevronDownSVG,
  checklistSVGDarkBackground,
  checklistSVGWhiteBackground,
  poundSVGDarkBackground,
  poundSVGWhiteBackground,
  locationSVGDarkBackground,
  locationSVGWhiteBackground,
  graphSVGDarkBackground,
  graphSVGWhiteBackground,
} from './svg-icons';

const { ID } = shared;

/**
 *
 * @param {'plp' | 'pdp'} page
 * @returns
 */
export const getElements = (page) => `
<div class="${ID}-mobile ${page === 'plp' ? `${ID}-hidden-desktop` : ''}">
	<h3 class="${ID}-mobile__title">Got a HSS Trade Account?</h3>
	<p class="${ID}-mobile__description">You’ll benefit from all of HSS Hire’s digital trade tools</p>
	<div class="${ID}-mobile__icons-wrapper-small">
		<div class="${ID}-mobile__icons-wrapper-small--single">${checklistSVGDarkBackground}</div>
		<div class="${ID}-mobile__icons-wrapper-small--single">${poundSVGDarkBackground}</div>
		<div class="${ID}-mobile__icons-wrapper-small--single">${locationSVGDarkBackground}</div>
		<div class="${ID}-mobile__icons-wrapper-small--single">${graphSVGDarkBackground}</div>
		<button class="${ID}-mobile__icons-wrapper-small--button ${
  page === 'pdp' ? `${ID}-mobile__icons-wrapper-small--button--dpd` : ''
}">Learn more ${chevronDownSVG}</button>
	</div>
	<div class="${ID}-mobile__icons-wrapper-big ${ID}-hidden">
		<div class="${ID}-mobile__icons-wrapper-big--single">
			<div class="${ID}-mobile__icons-wrapper-big--single__csv">${locationSVGDarkBackground}</div>
			<div class="${ID}-mobile__icons-wrapper-big--single__text">Order tracking with the HSS Hire app</div>
		</div>
		<div class="${ID}-mobile__icons-wrapper-big--single">
			<div class="${ID}-mobile__icons-wrapper-big--single__csv">${poundSVGDarkBackground}</div>
			<div class="${ID}-mobile__icons-wrapper-big--single__text">hss.com view on your personal prices</div>
		</div>
		<div class="${ID}-mobile__icons-wrapper-big--single">
			<div class="${ID}-mobile__icons-wrapper-big--single__csv">${checklistSVGDarkBackground}</div>
			<div class="${ID}-mobile__icons-wrapper-big--single__text">Track the stock you have on hire</div>
		</div>
		<div class="${ID}-mobile__icons-wrapper-big--single">
			<div class="${ID}-mobile__icons-wrapper-big--single__csv">${graphSVGDarkBackground}</div>
			<div class="${ID}-mobile__icons-wrapper-big--single__text">Online account management tools</div>
		</div>

		<p class="${ID}-mobile__icons-wrapper-big--text-below">Click below to <b>login</b>, <b>register</b> or <b>activate</b> your credit account</p>

		<div class="${ID}-mobile__icons-wrapper-big--register-button--wrapper">
			<button class="${ID}-mobile__icons-wrapper-big--register-button">Login, register or activate here</button>
		</div>

		<button class="${ID}-mobile__icons-wrapper-big--close-button">Learn more ${chevronDownSVG}</button>
	</div>
</div>

${
  page === 'plp'
    ? `<div class="${ID}-desktop ${
        page === 'plp' ? `${ID}-hidden-mobile` : `${ID}-hidden`
      }">
	<h3 class="${ID}-desktop__title">Got a HSS Trade Account?</h3>
	<div class="${ID}-desktop__header-wrapper">
		<p class="${ID}-desktop__description">You’ll benefit from all of HSS Hire’s digital trade tools</p>
		<button class="${ID}-desktop__icons-wrapper-small--button">Learn more ${chevronDownSVG}</button>
	</div>

	<div class="${ID}-desktop__icons-wrapper-big ${ID}-hidden">
		<div class="${ID}-desktop__icons-wrapper-big--single">
			<div class="${ID}-desktop__icons-wrapper-big--single__csv">${locationSVGWhiteBackground}</div>
			<div class="${ID}-desktop__icons-wrapper-big--single__text">Order tracking with the HSS Hire app</div>
		</div>
		<div class="${ID}-desktop__icons-wrapper-big--single">
			<div class="${ID}-desktop__icons-wrapper-big--single__csv">${poundSVGWhiteBackground}</div>
			<div class="${ID}-desktop__icons-wrapper-big--single__text">hss.com view on your personal prices</div>
		</div>
		<div class="${ID}-desktop__icons-wrapper-big--single">
			<div class="${ID}-desktop__icons-wrapper-big--single__csv">${checklistSVGWhiteBackground}</div>
			<div class="${ID}-desktop__icons-wrapper-big--single__text">Track the stock you have on hire</div>
		</div>
		<div class="${ID}-desktop__icons-wrapper-big--single">
			<div class="${ID}-desktop__icons-wrapper-big--single__csv">${graphSVGWhiteBackground}</div>
			<div class="${ID}-desktop__icons-wrapper-big--single__text">Online account management tools</div>
		</div>

		<div class="${ID}-desktop__icons-wrapper-big--register-button--wrapper">
			<button class="${ID}-desktop__icons-wrapper-big--register-button">Login, register or activate here</button>
		</div>
	</div>




</div>`
    : ''
}
`;
