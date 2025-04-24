/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { VARIATION } = shared;

export default () => {
	setup();
	fireEvent("Conditions Met");

	if (VARIATION == "control") {
		return;
	}

	pollerLite([`.center_block.mob_vista`], () => {
		const headerLogos = document.querySelectorAll(
			`.center_block.mob_vista .siteLogo a img`
		);
		headerLogos.length > 0 &&
			headerLogos.forEach((logo) => {
				if (logo.matches(`.desktop_logo`))
					logo.src =
						VARIATION == "1"
							? `https://blcro.fra1.digitaloceanspaces.com/HS-486/HSSProLogo.png`
							: `https://blcro.fra1.digitaloceanspaces.com/HS-486/HSSLogo.jpg`;
				else
					logo.src =
						VARIATION == "1"
							? `https://blcro.fra1.digitaloceanspaces.com/HS-486/HSSProLogoLarge.png`
							: `https://blcro.fra1.digitaloceanspaces.com/HS-486/HSSLogo.jpg`;
			});
	});
};
