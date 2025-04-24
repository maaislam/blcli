/* eslint-disable */
// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

const PD020 = (() => {
    let trackerName,
        slideQ = false,
        $;

    const UCPoller = (() => {
        // Load Poller in seperate to other plugins to save on processing 
        // and only load libraries in when they are needed
        UC.poller([
            '#nav_main',
            () => {
                if (window.jQuery) {
                    $ = window.jQuery
                    return true;
                }
            }
        ], init);
    })();

    function init(){
        utils.fullStory('PD020', 'Variation 1');

        const cacheDom = (() => {
            //Cache useful selectors for later use
            const bodyVar = document.querySelector('body');

			bodyVar.classList.add('PD020');

			const oldNavigation = bodyVar.querySelector('#nav_main');
			const navRegexes = [/(Personal-Protective-Equipment-PPE-~c~A)|(Personal-Protective-Equipment-PPE-)(\/)(Head-Protection|Safety-Glasses-and-Goggles|Face-Protection|Hearing-Protection|First-Aid|Fall-Arrest-Equipment|Ebola-Protection).*/,
			/(Personal-Protective-Equipment-PPE-)(\/)(Hand-Protection).*/, /(Personal-Protective-Equipment-PPE-)(\/)(Respiratory-Protective-Equipment).*/, /(Personal-Protective-Equipment-PPE-)(\/)(Safety-Footwear).*/,
			/(Clothing-and-Workwear).*/, /(Site-Equipment-and-Consumables).*/, /(Industrial-Skin-Care-and-Janitorial).*/];

			let promotedCategory;
			let PD020Categories;
			
			const navMarkup = (`
			<div class="PD020-Navigation-Header-Wrapper">
				<p class="PD020-Navigation-Header">You are in...</p>
			</div>
			<div class="PD020-Navigation clearfix">
			
				<div class="PD020-PPE-Wrap PD020-Top-Level">
					<a class="PD020-PPE-Link PD020-Top-Level-Link" href="/Personal-Protective-Equipment-PPE-~c~A">PPE<span class="PD020-Arrow-Down"></span></a>
						<div class="PD020-PPE-Sub-Category-Wrap PD020-Sub-Category-Wrap">
							<div class="PD020-PPE-Sub-Category-Link-Wrap PD020-Sub-Category-Links-Wrap">
							<span class="PD020-PPE-Sub-Category-Header PD020-Sub-Category-Header">Personal Protection Equipment</span>
							<div class="PD020-PPE-Head-Protection-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-PPE-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Head-Protection~c~AA">Head Protection<span class="PD020-Arrow-Right"></span></a>	
											<div class="PD020-PPE-Head-Protection-Tertiary PD020-Tertiary-Wrap">
												<div class="PD020-PPE-Head-Protection-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
													<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Head-Protection/Safety-Helmets-and-Hard-Hats~c~AAA">Safety Helmets & Hard Hats</a>
													<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Head-Protection/Bump-Caps~c~AAB">Bump Caps</a>
													<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Head-Protection/Helmet-Accessories~c~AAC">Helmet Accessories</a>
												</div>
											</div>
							</div>	
							<div class="PD020-PPE-Eye-Protection-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-PPE-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Glasses-and-Goggles~c~AB">Eye Protection<span class="PD020-Arrow-Right"></span></a>	
											<div class="PD020-PPE-Eye-Protection-Tertiary PD020-Tertiary-Wrap">
												<div class="PD020-PPE-Eye-Protection-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
													<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Glasses-and-Goggles/Safety-Goggles~c~ABE">Safety Goggles</a>
													<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Glasses-and-Goggles/Protective-Safety-Glasses-Clear~c~ABC">Protective Safety Glasses - Clear</a>
													<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Glasses-and-Goggles/Protective-Safety-Glasses-Tinted~c~ABD">Protective Safety Glasses - Tinted</a>
													<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Glasses-and-Goggles/Overspecs~c~ABB">Overspecs</a>
													<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Glasses-and-Goggles/Eyewear-Accessories~c~ABA">Eyewear Accessories</a>
												</div>
											</div>
							</div>	
							<div class="PD020-PPE-Face-Protection-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-PPE-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Face-Protection~c~AC">Face Protection<span class="PD020-Arrow-Right"></span></a>	
										<div class="PD020-PPE-Face-Protection-Tertiary PD020-Tertiary-Wrap">
											<div class="PD020-PPE-Face-Protection-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Face-Protection/Browguards~c~ACA">Browguards</a>
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Face-Protection/Visor-Holders-Face-Shield-Carriers~c~ACB">Visor Holders / Face Shield Carriers</a>
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Face-Protection/Visors~c~ACC">Visors</a>
											</div>
										</div>
							</div>	
							<div class="PD020-PPE-Hearing-Protection-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-PPE-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hearing-Protection~c~AD">Hearing Protection<span class="PD020-Arrow-Right"></span></a>	
										<div class="PD020-PPE-Hearing-Protection-Tertiary PD020-Tertiary-Wrap">
											<div class="PD020-PPE-Hearing-Protection-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Hearing-Protection/Corded-Banded-Ear-Plugs~c~ADA">Corded / Banded Ear Plugs</a>
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Hearing-Protection/Disposable-Ear-Plugs~c~ADB">Disposable Ear Plugs</a>
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Hearing-Protection/Ear-Muffs~c~ADC">Ear Defenders</a>
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Hearing-Protection/Helmet-Mounted-Ear-Muffs~c~ADD">Helmet Mounted Ear Defenders</a>
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Hearing-Protection/Dispensers-and-Refills~c~ADE">Ear Plug Dispensers & Refills</a>
											</div>
										</div>
							</div>
							<div class="PD020-PPE-First-Aid-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-PPE-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/First-Aid~c~AH">First Aid<span class="PD020-Arrow-Right"></span></a>	
										<div class="PD020-PPE-First-Aid-Tertiary PD020-Tertiary-Wrap">
											<div class="PD020-PPE-First-Aid-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/First-Aid/First-Aid-Kits~c~AHA">First Aid Kits</a>
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/First-Aid/Eyewash-and-Dispensers~c~AHB">Eyewash & Dispensers</a>
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/First-Aid/Plaster-Kits~c~AHC">Plaster Kits</a>
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/First-Aid/Travel-Kits~c~AHD">Travel Kits</a>
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/First-Aid/First-Aid-Signage-HSE-Book~c~AHE">First Aid Signage / HSE Book</a>
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/First-Aid/First-Aid-accessories~c~AHF">First Aid Accessories</a>
												<a class="PD020-PPE-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/First-Aid/Medical-Equipment~c~AHG">Medical Equipment</a>
											</div>
										</div>
							</div>
							<div class="PD020-Fall-Arrest-Equipment PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-PPE-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Fall-Arrest-Equipment~c~AI">Fall Arrest Equipment</a>	
							</div>
							<div class="PD020-Ebola-Protection PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-PPE-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Ebola-Protection~c~AK">Ebola Protection</a>	
							</div>
							<div class="PD020-Ladies-PPE PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-PPE-Sub-Category-Link PD020-Sub-Category-Link" href="https://www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Ladies-PPE~c~AL">Ladies PPE</a>	
							</div>

							</div>
						</div>
				</div>

				<div class="PD020-Hand-Protection-Wrap PD020-Top-Level">
					<a class="PD020-Hand-Protection-Wrap PD020-Top-Level-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection~c~AF">Hand Protection<span class="PD020-Arrow-Down"></span></a>
						<div class="PD020-Hand-Protection-Sub-Category-Wrap PD020-Sub-Category-Wrap">
						<div class="PD020-Hand-Protection-Sub-Category-Link-Wrap PD020-Sub-Category-Links-Wrap">
						<span class="PD020-Hand-Protection-Sub-Category-Header PD020-Sub-Category-Header">Hand Protection</span>
							<div class="PD020-Hand-Protection-Wrap PD020-Sub-Category-Links-Wrap">
								<div class="PD020-Anti-Vibration-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Anti-Vibration-Gloves~c~AFA">Anti-Vibration Gloves</a>	
								</div>
								<div class="PD020-Builders-Grip-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Builders-Grip-Gloves~c~AFB">Builders Grip Gloves</a>	
								</div>
								<div class="PD020-Cotton-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Cotton-Gloves~c~AFC">Cotton Gloves</a>
								</div>
								<div class="PD020-Cut-Resistant-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Cut-Resistant-Gloves~c~AFD">Cut Resistant Gloves</a>	
								</div>
								<div class="PD020-Disposable-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Disposable-Gloves~c~AFE">Disposable Gloves</a>	
								</div>
								<div class="PD020-General-Handling-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/General-Handling-Gloves~c~AFF">General Handling Gloves</a>	
								</div>
								<div class="PD020-General-Purpose-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/General-Purpose-Gloves~c~AFG">General Purpose Gloves</a>	
								</div>
								<div class="PD020-Heat-Resistant-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Heat-Resistant-Gloves~c~AFH">Heat Resistant Gloves</a>	
								</div>
								<div class="PD020-Leather-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Leather-Gloves~c~AFI">Leather Gloves</a>	
								</div>
								<div class="Nitrile-Latex-Unsupported-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Nitrile-Latex-Unsupported-Gloves~c~AFJ">Nitrile / Latex Unsupported Gloves</a>	
								</div>
								<div class="PD020-Nitrile-Coated-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Nitrile-Coated-Gloves~c~AFK">Nitrile Coated Gloves</a>	
								</div>
								<div class="PD020-PU-Coated-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/PU-Coated-Gloves~c~AFL">PU Coated Gloves</a>	
								</div>
								<div class="PD020-Rigger-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Rigger-Gloves~c~AFM">Rigger Gloves</a>	
								</div>
								<div class="PD020-PVC-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Single-Double-Dip-PVC-Gloves~c~AFN">PVC Gloves</a>	
								</div>
								<div class="PD020-Protective-Sleeves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Protective-Sleeves~c~AFO">Protective Sleeves</a>	
								</div>
								<div class="PD020-Specialist-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Specialist-Gloves~c~AFP">Specialist Gloves</a>	
								</div>
								<div class="PD020-Thermal-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Thermal-Gloves~c~AFQ">Thermal Gloves</a>	
								</div>
								<div class="PD020-Thermal-Grip-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Thermal-Grip-Gloves~c~AFR">Thermal Grip Gloves</a>	
								</div>
								<div class="PD020-Trade-Specific-Gloves PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Hand-Protection-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Hand-Protection/Trade-Specific-Gloves~c~AFS">Trade Specific Gloves</a>	
								</div>
							
							</div>	
						</div>
					</div>
				</div>
				
				<div class="PD020-Respiratory-Wrap PD020-Top-Level">
					<a class="PD020-Respiratory-Link PD020-Top-Level-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment~c~AE">Respiratory<span class="PD020-Arrow-Down"></span></a>
						<div class="PD020-Respiratory-Link-Sub-Category-Wrap PD020-Sub-Category-Wrap">
							<div class="PD020-Respiratory-Link-Sub-Category-Link-Wrap PD020-Sub-Category-Links-Wrap">
							<span class="PD020-Respiratory-Link-Sub-Category-Header PD020-Sub-Category-Header">Respiratory</span>

								<div class="PD020-Respiratory-Link-Disposable-Respirators-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-Respiratory-Sub-Category-Link PD020-Sub-Category-Link" href="https://www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment~c~AE">
									<span class="PD020-Respiratory-Sub-Category-Link PD020-Sub-Category-Link">Disposable Respirators<span class="PD020-Arrow-Right"></span></span>	
								</a>
										<div class="PD020-Respiratory-Disposable-Respirators-Tertiary PD020-Tertiary-Wrap">
											<div class="PD020-Respiratory-Disposable-Respirators-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
												<a class="PD020-Respiratory-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Disposable-FFP1-Respirators~c~AEA">Disposable FFP1 Respirators</a>
												<a class="PD020-Respiratory-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Disposable-FFP2-Respirators~c~AEB">Disposable FFP2 Dust Masks</a>
												<a class="PD020-Respiratory-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Disposable-FFP3-Respirators~c~AEC">Disposable FFP3 Respirators</a>
											</div>
										</div>
								</div>

								<div class="PD020-Disposable-Dust-Masks PD020-Sub-Category-Link-Wrap">
									<a class="PD020-Respiratory-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Disposable-Dust-Masks-and-Respirators~c~AED">Disposable Dust Masks</a>
								</div>

								<div class="PD020-Welding-Respirators PD020-Sub-Category-Link-Wrap">
									<a class="PD020-Respiratory-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Welding-Respirators~c~AEE">Welding Respirators</a>	
								</div>

								<div class="PD020-Full-Face-Respirators-Half-Mask-Respirators PD020-Sub-Category-Link-Wrap">
									<a class="PD020-Respiratory-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Half-Masks-and-Full-Face-Masks~c~AEF">Full Face Respirators & Half Mask Respirators</a>
								</div>

								<div class="PD020-Respirator-Helmets-Hoods PD020-Sub-Category-Link-Wrap">
									<a class="PD020-Respiratory-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Respiratory-Helmets-and-Hoods~c~AEG">Respirator Helmets & Hoods</a>	
								</div>

								<div class="PD020-Respiratory-Respiratory-Filters PD020-Sub-Category-Link-Wrap">	
									<a href="https://www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment~c~AE" class="PD020-Respiratory-Sub-Category-Link PD020-Sub-Category-Link">Respiratory Filters<span class="PD020-Arrow-Right"></span></a>	
									<div class="PD020-Respiratory-Respiratory-Filters-Tertiary PD020-Tertiary-Wrap">
										<div class="PD020-Respiratory-Respiratory-Filters-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
											<a class="PD020-Respiratory-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/3M-Respiratory-Filters~c~AEH">3M Respiratory Filters</a>
											<a class="PD020-Respiratory-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Scott-Respiratory-Filters~c~AEJ">Scott Respiratory Filters</a>
											<a class="PD020-Respiratory-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Elipse-Repiratory-Filters~c~AEQ">Elipse Repiratory Filters</a>
											<a class="PD020-Respiratory-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Moldex-Respiratory-Filters~c~AEI">Moldex Respiratory Filters</a>
											<a class="PD020-Respiratory-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/North-Respiratory-Filters~c~AEK">North Respiratory Filters</a>
										</div>
									</div>
								</div>

								<div class="PD020-Respiratory-Powered-Respirators PD020-Sub-Category-Link-Wrap">
									<a href="https://www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment~c~AE" class="PD020-Respiratory-Sub-Category-Link PD020-Sub-Category-Link">Powered Respirators<span class="PD020-Arrow-Right"></span></a>	
									<div class="PD020-Respiratory-Powered-Respirators-Tertiary PD020-Tertiary-Wrap">
										<div class="PD020-Respiratory-Powered-Respirators-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
											<a class="PD020-Respiratory-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/3M-Jupiter-Powered-Respirator~c~AEL">3M Jupiter Powered Respirators</a>
											<a class="PD020-Respiratory-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/3M-Versaflo-Powered-Air-System~c~AEM">3M Versaflo Powered Air System</a>
											<a class="PD020-Respiratory-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Tornado-Powered-Respirator~c~AEN">Scott Tornado Respirators</a>
										</div>
									</div>
								</div>

								<div class="PD020-Fit-Test-Kits PD020-Sub-Category-Link-Wrap">
									<a class="PD020-Respiratory-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Fit-Test-Kits~c~AEO">Fit Test Kits</a>
								</div>	

								<div class="PD020-Respiratory-Accessories PD020-Sub-Category-Link-Wrap">
									<a class="PD020-Respiratory-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Respiratory-Protective-Equipment/Respiratory-Accessories~c~AEP">Respiratory Accessories</a>
								</div>

							</div>	
						</div>
				</div>

				<div class="PD020-Footwear-Wrap PD020-Top-Level">
					<a class="PD020-Footwear-Link PD020-Top-Level-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear~c~AG">Footwear<span class="PD020-Arrow-Down"></span></a>
						<div class="PD020-Footwear-Sub-Category-Wrap PD020-Sub-Category-Wrap">
								<div class="PD020-Footwear-Sub-Category-Link-Wrap PD020-Sub-Category-Links-Wrap">
								<span class="PD020-Footwear-Sub-Category-Header PD020-Sub-Category-Header">Safety Footwear, Boots And Shoes</span>

									<div class="PD020-Footwear-Safety-Footwear-Wrap PD020-Sub-Category-Link-Wrap">	
										<a href="https://www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Safety-Footwear~c~AG" class="PD020-Footwear-Sub-Category-Link PD020-Sub-Category-Link">Safety Footwear<span class="PD020-Arrow-Right"></span></a>	
											<div class="PD020-Footwear-Safety-Footwear-Tertiary PD020-Tertiary-Wrap">
												<div class="PD020-Footwear-Safety-Footwear-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
													<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Timberland-Safety-Boots~c~AGA">Timberland Safety Boots</a>
													<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Dr-Martens-Safety-Footwear~c~AGB">Dr Martens Safety Footwear</a>
													<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Caterpillar-Safety-Footwear~c~AGC">Caterpillar Safety Footwear</a>
													<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/DeWalt-Safety-Footwear~c~AGD">DeWalt Safety Footwear</a>
													<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/JCB-Safety-Footwear~c~AGE">JCB Safety Footwear</a>
													<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="https://www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Safety-Footwear/Ladies-Safety-Footwear~c~AGP">Ladies Safety Footwear</a>
												</div>
											</div>
									</div>	

									<div class="PD020-Footwear-Boots-Wrap PD020-Sub-Category-Link-Wrap">	
										<a href="https://www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Safety-Footwear~c~AG" class="PD020-Footwear-Sub-Category-Link PD020-Sub-Category-Link">Boots<span class="PD020-Arrow-Right"></span></a>	
										<div class="PD020-Footwear-Boots-Tertiary PD020-Tertiary-Wrap">
											<div class="PD020-Footwear-Boots-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
												<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Chukka-Boots~c~AGF">Chukka Boots</a>
												<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Rigger-Boots~c~AGG">Rigger Boots</a>
												<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Work-Boots~c~AGH">Work Boots</a>
												<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Hiker-Boots~c~AGL">Hiker Boots</a>
												<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Wellington-Boots~c~AGR">Wellington Boots</a>
											</div>
										</div>
									</div>	
									
									<div class="PD020-Footwear-Trainers-Shoes-Wrap PD020-Sub-Category-Link-Wrap">	
										<a href="https://www.protecdirect.co.uk/Personal-Protective-Equipment-PPE-/Safety-Footwear~c~AG" class="PD020-Footwear-Sub-Category-Link PD020-Sub-Category-Link">Trainers & Shoes<span class="PD020-Arrow-Right"></span></a>	
										<div class="PD020-Footwear-Trainers-Shoes-Tertiary PD020-Tertiary-Wrap">
											<div class="PD020-Footwear-Trainers-Shoes-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
												<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Work-Shoes~c~AGI">Work Shoes</a>
												<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Executive-Safety-Shoes~c~AGJ">Executive Safety Shoes</a>
												<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Safety-Trainers~c~AGK">Safety Trainers</a>
												<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Anti-Slip-Safety-Footwear~c~AGN">Anti Slip Safety Footwear</a>
												<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Ladies-Safety-Footwear~c~AGP">Wellington Boots</a>
												<a class="PD020-Footwear-Tertiary-Link PD020-Tertiary-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Specialist-Foundry-Footwear~c~AGQ">Specialist Foundry Footwear</a>
											</div>
										</div>
									</div>	

									<div class="PD020-Snow-Chains PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Footwear-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Snow-Chains~c~AGS">Snow Chains</a>	
									</div>
									
									<div class="PD020-Socks PD020-Sub-Category-Link-Wrap">
										<a class="PD020-FootwearSub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Socks~c~AGT">Socks</a>	
									</div>

									<div class="PD020-Footwear-Accessories PD020-Sub-Category-Link-Wrap">
										<a class="PD020-Footwear-Sub-Category-Link PD020-Sub-Category-Link" href="/Personal-Protective-Equipment-PPE-/Safety-Footwear/Footwear-Accessories~c~AGU">Footwear Accessories</a>	
									</div>

								</div>
						</div>
				</div>

				<div class="PD020-Clothing-Workwear-Wrap PD020-Top-Level">
					<a class="PD020-Clothing-Workwear-Link PD020-Top-Level-Link" href="/Clothing-and-Workwear~c~B">Clothing & <br />Workwear<span class="PD020-Arrow-Down"></span></a>
						<div class="PD020-Clothing-Workwear-Sub-Category-Wrap PD020-Sub-Category-Wrap">
							<div class="PD020-Clothing-Workwear-Sub-Category-Link-Wrap PD020-Sub-Category-Links-Wrap">
							<span class="PD020-Clothing-Workwear-Sub-Category-Header PD020-Sub-Category-Header">Protective Clothing & Workwear</span>


							<div class="PD020-Clothing-Workwear-Hi-Vis-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-Clothing-Workwear-Sub-Category-Link PD020-Sub-Category-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing~c~BA">Hi-Vis Clothing<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Clothing-Workwear-Hi-Vis-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Clothing-Workwear-Safety-Hi-Vis-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing/Hi-Vis-Waistcoats~c~BAA">Waistcoats</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing/Hi-Vis-Jackets~c~BAB">Jackets</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing/Hi-Vis-Trousers~c~BAC">Trousers</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing/Hi-Vis-Leisurewear~c~BAD">Leisurewear</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing/Hi-Vis-Boilersuits~c~BAE">Boilersuits</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing/Pre-Printed-Hi-Vis-Waistcoats~c~BAJ">Pre-Printed Waistcoats</a>
									</div>
								</div>
							</div>	

							<div class="PD020-Clothing-Workwear-Railway-Hi-Vis-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-Clothing-Workwear-Sub-Category-Link PD020-Sub-Category-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing~c~BA">Railway Industry Hi-Vis Clothing<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Clothing-Workwear-Railway-Hi-Vis-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Clothing-Workwear-Railway-Hi-Vis-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing/Railway-Industry-Waistcoats~c~BAF">Waistcoats</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing/Railway-Industry-Jackets~c~BAH">Jackets</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing/Railway-Industry-Trousers~c~BAG">Trousers</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Hi-Vis-Clothing/Railway-Industry-Boilersuits~c~BAI">Boilersuits</a>
									</div>
								</div>
							</div>

							<div class="PD020-Clothing-Workwear-Protective-Workwear-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-Clothing-Workwear-Sub-Category-Link PD020-Sub-Category-Link" href="/Clothing-and-Workwear/Protective-Workwear~c~BB">Protective Workwear<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Clothing-Workwear-Protective-Workwear-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Clothing-Workwear-Protective-Workwear-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Protective-Workwear/Boilersuits-and-Coveralls~c~BBA">Boilersuits & Coveralls</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Protective-Workwear/Flame-Retardent-Coveralls~c~BBB">Flame Retardent Coveralls</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Protective-Workwear/Warehouse-Coats~c~BBD">Warehouse Coats</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Protective-Workwear/Tabards~c~BBE">Tabards</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Protective-Workwear/Knee-Pads~c~BBF">Knee Pads</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Protective-Workwear/Aprons~c~BBG">Aprons</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Protective-Workwear/Accessories~c~BBH">Accessories</a>
									</div>
								</div>
							</div>

							<div class="PD020-Clothing-Workwear-Disposable-Workwear-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-Clothing-Workwear-Sub-Category-Link PD020-Sub-Category-Link" href="/Clothing-and-Workwear/Disposable-Workwear~c~BC">Disposable Workwear<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Clothing-Workwear-Disposable-Workwear-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Clothing-Workwear-Disposable-Workwear-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Disposable-Workwear/Disposable-Coveralls~c~BCA">Coveralls</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Disposable-Workwear/Disposable-Overshoes~c~BCB">Overshoes</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Disposable-Workwear/Disposable-Hoods~c~BCC">Hoods</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Disposable-Workwear/Disposable-Oversleeves~c~BCD">Oversleeves</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Disposable-Workwear/Food-Industry-Workwear~c~BCE">Food Industry Workwear</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Disposable-Workwear/Disposable-Aprons~c~BCF">Disposable Aprons</a>
									</div>
								</div>
							</div>

							<div class="PD020-Clothing-Workwear-Waterproof-PVC-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-Clothing-Workwear-Sub-Category-Link PD020-Sub-Category-Link" href="/Clothing-and-Workwear/Waterproof-PVC-Clothing~c~BD">Waterproof / PVC Clothing<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Clothing-Workwear-Waterproof-PVC-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Clothing-Workwear-Waterproof-PVC-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Waterproof-PVC-Clothing/Waterproof-Wet-Suits~c~BDA">Wet Suits</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Waterproof-PVC-Clothing/Waterproof-Jackets~c~BDC">Jackets</a>
										<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Waterproof-PVC-Clothing/Waterproof-Trousers~c~BDD">Trousers</a>
									</div>
								</div>
							</div>

							<div class="PD020-Clothing-Workwear-Other-Clothing-Wrap PD020-Sub-Category-Link-Wrap">	
								<a href="https://www.protecdirect.co.uk/Clothing-and-Workwear~c~B" class="PD020-Clothing-Workwear-Sub-Category-Link PD020-Sub-Category-Link">Other Clothing<span class="PD020-Arrow-Right"></span></a>	
									<div class="PD020-Clothing-Workwear-Other-Clothing-Tertiary PD020-Tertiary-Wrap">
										<div class="PD020-Clothing-Workwear-Other-Clothing-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
											<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Coats-Jackets-and-Bodywarmers~c~BE">Coats, Jackets & Bodywarmers</a>
											<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Fleeces-and-Softshell-Jackets~c~BF">Fleeces & Softshell Jackets</a>
											<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Polo-Shirts-T-Shirts~c~BH">Polo Shirts / T-Shirts</a>
											<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Sweatshirts-Hooded-Sweatshirts~c~BG">Sweatshirts / Hooded Sweatshirts</a>
											<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Trousers~c~BJ">Trousers</a>
											<a class="PD020-Clothing-Workwear-Tertiary-Link PD020-Tertiary-Link" href="/Clothing-and-Workwear/Outdoor-Thermal-Clothing~c~BBI">Outdoor / Thermal Clothing</a>
										</div>
									</div>
							</div>

							<div class="PD020-Clothing-Workwear-Corporate-Workwear PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Clothing-Workwear-Sub-Category-Link PD020-Sub-Category-Link" href="/Clothing-and-Workwear/Corporate-Workwear~c~BI">Corporate Workwear</a>	
							</div>
							<div class="PD020-Clothing-Workwear-Corporate-Workwear PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Sub-Category-Link" href="https://www.protecdirect.co.uk/Clothing-and-Workwear/Ladies-Clothing~c~BK">Ladies Clothing</a>
							</div>

							</div>
						</div>
				</div>

				<div class="PD020-Site-Consumables-Wrap PD020-Top-Level">
					<a class="PD020-Site-Consumables-Link PD020-Top-Level-Link" href="/Site-Equipment-and-Consumables~c~D">Site <br />Consumables<span class="PD020-Arrow-Down"></span></a>
					<div class="PD020-Site-Consumables-Sub-Category-Wrap PD020-Sub-Category-Wrap">

						<div class="PD020-Site-Consumables-Sub-Category-Link-Wrap PD020-Sub-Category-Links-Wrap">
						<span class="PD020-Site-Consumables-Sub-Category-Header PD020-Sub-Category-Header">Site Consumables</span>

							<div class="PD020-Site-Consumables-Roadworks-Equipment-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="/Site-Equipment-and-Consumables/Roadworks-and-Equipment~c~DA">Roadworks & Equipment<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Site-Consumables-Roadworks-Equipment-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Site-Consumables-Roadworks-Equipment-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Roadworks-and-Equipment/Demarcation-and-Paint-Line-Marking~c~DAA">Demarcation & Paint Line Marking</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Roadworks-and-Equipment/Cones~c~DAC">Cones</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Roadworks-and-Equipment/Road-Barriers-and-Accessories~c~DAH">Road Barriers & Accessories</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Roadworks-and-Equipment/Cold-Weather-Essentials~c~DAI">Cold Weather Essentials</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Roadworks-and-Equipment/Road-Lamps~c~DAJ">Road Lamps</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Roadworks-and-Equipment/Fencing~c~DAK">Fencing</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Roadworks-and-Equipment/Ramps~c~DAM">Ramps</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Roadworks-and-Equipment/Drain-Equipment~c~DAD">Drain Equipment</a>
									</div>
								</div>
							</div>	

							<div class="PD020-Site-Consumables-Site-Essentials-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="/Site-Equipment-and-Consumables/Site-Essentials~c~DB">Site Essentials<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Site-Consumables-Site-Essentials-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Site-Consumables-Site-Essentials-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Essentials/Batteries~c~DBA">Batteries</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Essentials/Electrical-Appliances~c~DBH">Electrical Appliances</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Essentials/Torches~c~DBJ">Torches</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Essentials/Digging-Tools~c~DBC">Digging Tools</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Essentials/Garden-and-Landscaping~c~DBE">Garden & Landscaping</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Essentials/Canteen-Equipment~c~DBF">Canteen Equipment</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Essentials/Bitumen-Repair-Products~c~DBB">Bitumen Repair Products</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Essentials/Radio-and-Equipment~c~DBK">Drain Equipment</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Essentials/Buckets-and-Water-Containers~c~DAF">Buckets & Water Containers</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Essentials/Decorating-Equipment~c~DAE">Decorating Equipment</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Roadworks-and-Equipment/Fencing~c~DAK">Fencing</a>
									</div>
								</div>
							</div>	

							<div class="PD020-Site-Consumables-Site-Materials-Supplies-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="/Site-Equipment-and-Consumables/Site-Materials-and-Supplies~c~DC">Site Materials & Supplies<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Site-Consumables-Site-Materials-Supplies-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Site-Consumables-Site-Materials-Supplies-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Materials-and-Supplies/Fuel-Cans-and-Accessories~c~DCA">Fuel Cans & Accessories</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Materials-and-Supplies/Tarpaulin-String-and-Straps~c~DCB">Tarpaulin, String & Straps</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Materials-and-Supplies/Scaffold-Netting-and-Sheeting~c~DCC">Scaffold, Netting & Sheeting</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Materials-and-Supplies/Concrete-Testing-and-Thermometers~c~DCD">Concrete Testing & Thermometers</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Materials-and-Supplies/Industrial-Hoses-and-Accessories~c~DCE">Industrial Hoses & Accessories</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Materials-and-Supplies/Polythene-Sheeting~c~DCF">Polythene Sheeting</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Materials-and-Supplies/Site-Bags-Hessian~c~DCG">Site Bags / Hessian</a>
									</div>
								</div>
							</div>	
						
							<div class="PD020-Site-Consumables-Site-Equipment-Tools-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="/Site-Equipment-and-Consumables/Site-Equipment-and-Tools~c~DD">Site Equipment & Tools<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Site-Consumables-Site-Equipment-Tools-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Site-Consumables-Site-Equipment-Tools-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Equipment-and-Tools/Hand-Tools~c~DAB">Hand Tools</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Equipment-and-Tools/Knives-and-Cutting-Blades~c~DDB">Knives & Cutting Blades</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Equipment-and-Tools/Sealants-and-Adhesives~c~DDC">Sealants & Adhesives</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Equipment-and-Tools/Measuring-Equipment~c~DDD">Measuring Equipment</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Site-Equipment-and-Consumables/Site-Equipment-and-Tools/Tapes-and-Fixings~c~DDA">Tapes & Fixings</a>
									</div>
								</div>
              </div>
              
              <div class="PD020-Site-Consumables-Safety-Signs-Wrap PD020-Sub-Category-Link-Wrap">	
                <a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="/Safety-Signs~c~E">Safety Signs<span class="PD020-Arrow-Right"></span></a>	
                <div class="PD020-Site-Consumables-Safety-Signs-Tertiary PD020-Tertiary-Wrap">
                  <div class="PD020-Site-Consumables-Safety-Signs-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Fixing-Signs~c~EA">Fixing Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Pipeline-ID-Signs~c~EB">Pipeline ID Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Posts-Signs~c~EC">Posts Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Hazard-Signs~c~ED">Hazard Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Construction-Signs~c~EE">Construction Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Mandatory-Signs~c~EF">Mandatory Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Warning-and-Security-Signs~c~EG">Warning & Security Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Prohibition-Signs~c~EH">Prohibition Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/First-Aid-Signs~c~EI">First Aid Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Fire-Signs~c~EJ">Fire Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Exit-Signs~c~EK">Exit Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Road-Signs~c~EL">Road Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Emergency-Signs~c~EM">Emergency Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Schools-Hotels-Offices-and-Shop-Signs~c~EN">Schools, Hotels, Offices & Shop Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Environment-Signs~c~EO">Environment Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Factories-and-Warehouse-Signs~c~EP">Factories & Warehouse Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Labels~c~EQ">Labels</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Floor-Signs~c~ER">Floor Signs</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Posters~c~ES">Posters</a>
                    <a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Safety-Signs/Safety-Sign-Kits~c~ET">Safety Sign Kits</a>
                  </div>
                </div>
              </div>

							<div class="PD020-Site-Consumables-Ladders-Platforms PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="/Site-Equipment-and-Consumables/Ladders-and-Platforms~c~DE">Ladders & Platforms</a>	
							</div>	

							<div class="PD020-Site-Consumables-Temporary-Site-Protection PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="/Site-Equipment-and-Consumables/Temporary-Site-Protection~c~DF">Temporary Site Protection</a>	
							</div>	

							<div class="PD020-Site-Consumables-Fire-Equipment PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="/Site-Equipment-and-Consumables/Fire-Equipment~c~AJ">Fire Equipment</a>	
							</div>

							<div class="PD020-Site-Consumables-Site-Lighting-Equipment PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="/Site-Equipment-and-Consumables/Site-Lighting-Equipment~c~DAG">Site Lighting Equipment</a>	
							</div>

							<div class="PD020-Site-Consumables-Storage-Solutions PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="https://www.protecdirect.co.uk/Site-Equipment-and-Consumables/Storage-Solutions~c~F">Storage Solutions</a>	
							</div>

							<div class="PD020-Site-Consumables-Industrial-Skin-Care-Wrap PD020-Sub-Category-Link-Wrap">	
								<a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="https://www.protecdirect.co.uk/Site-Equipment-and-Consumables/Industrial-Skin-Care~c~CA">Industrial Skin Care<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Site-Consumables-Industrial-Skin-Care-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Site-Consumables-Industrial-Skin-Care-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Industrial-Skin-Care/Deb-Industrial-Skin-Care-Step-1-Protect~c~CAA">Deb Industrial Skin Care - Step 1 - Protect</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Industrial-Skin-Care/Deb-Industrial-Skin-Care-Step-2-Cleanse~c~CAB">Deb Industrial Skin Care - Step 2 - Cleanse</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Industrial-Skin-Care/Deb-Industrial-Skin-Care-Step-3-Restore~c~CAC">Deb Industrial Skin Care - Step 3 - Restore</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Industrial-Skin-Care/Deb-Skin-Safety-Centres~c~CAD">Deb Skin Safety Centres</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Industrial-Skin-Care/Food-Industry-Skin-Hygiene~c~CAE">Food Industry Skin Hygiene</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Industrial-Skin-Care/Deb-Dispensers~c~CAM">Deb Dispensers</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Industrial-Skin-Care/Workplace-Triple-Active-Gel~c~CAF">Workplace Triple Active Gel</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Industrial-Skin-Care/Skin-Care-Wipes~c~CAI">Skin Care Wipes</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Industrial-Skin-Care/Washroom-Skin-Hygiene~c~CAJ">Washroom Skin Hygiene</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Industrial-Skin-Care/Workshop-Skin-Care~c~CAK">Workshop Skin Care</a>
										<a class="PD020-Site-Consumables-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Industrial-Skin-Care/Skin-Sanitiser~c~CAL">Skin Sanitiser</a>
									</div>
								</div>
							</div>

							<div class="PD020-Site-Consumables-Technology PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="/Site-Equipment-and-Consumables/Technology~c~DG">Technology</a>	
							</div>

							<div class="PD020-Site-Consumables-Stationary-Equipment PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Site-Consumables-Sub-Category-Link PD020-Sub-Category-Link" href="/Site-Equipment-and-Consumables/Stationary-and-Equipment~c~DH">Stationary & Equipment</a>	
							</div>

						</div>
					</div>
				</div>

				<div class="PD020-Janitorial-Cleaning-Supplies-Wrap PD020-Top-Level">
					<a class="PD020-Janitorial-Cleaning-Supplies-Link PD020-Top-Level-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies~c~CB">Janitorial & <br />Cleaning Supplies<span class="PD020-Arrow-Down"></span></a>
					<div class="PD020-Janitorial-Cleaning-Supplies-Sub-Category-Wrap PD020-Sub-Category-Wrap">
							<div class="PD020-Janitorial-Cleaning-Supplies-Sub-Category-Link-Wrap PD020-Sub-Category-Links-Wrap">
							<span class="PD020-Janitorial-Cleaning-Supplies-Sub-Category-Header PD020-Sub-Category-Header">Janitorial & Cleaning Supplies</span>
							
							
							<div class="PD020-Janitorial-Cleaning-Supplies-Cleaning-Products-Wrap PD020-Sub-Category-Link-Wrap">	
								<a href="https://www.protecdirect.co.uk/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Cleaning-Products~c~CBC" class="PD020-Janitorial-Cleaning-Supplies-Sub-Category-Link PD020-Sub-Category-Link">Cleaning Products<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Janitorial-Cleaning-Supplies-Cleaning-Products-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Janitorial-Cleaning-Supplies-Cleaning-Products-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Cleaning-Products~c~CBC">Indoor Cleaning Products</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Outdooor-Cleaning-Products~c~CBM">Outdoor Cleaning Products</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Degreasers~c~CBD">Degreasers</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Washing-Products~c~CBX">Washing Products</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Washroom-Products~c~CBY">Washroom Products</a>
                    <a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Multi-Surface-and-Floor-Cleaning~c~CBAA">Multi-Surface & Floor Products</a>
                    <a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Floor-Cleaning-Equipment~c~CBF">Floor Cleaning Equipment</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Polish-and-VDU-Wipes~c~CBP">Polish & VDU Wipes</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Air-Fresheners-and-Shoe-Sanitisers~c~CBL">Air Fresheners & Shoe Sanitisers</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Graffiti-Removers~c~CBH">Graffiti Removers</a>
									</div>
								</div>
							</div>	

							<div class="PD020-Janitorial-Cleaning-Supplies-Brushes-Mops-Wrap PD020-Sub-Category-Link-Wrap">	
								<a href="https://www.protecdirect.co.uk/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Brushes-and-Mops~c~CCA" class="PD020-Janitorial-Cleaning-Supplies-Sub-Category-Link PD020-Sub-Category-Link">Brushes & Mops<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Janitorial-Cleaning-Supplies-Brushes-Mops-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Janitorial-Cleaning-Supplies-Brushes-Mops-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Dustpan-Sets~c~CBE">Dustpan Sets</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Hand-Brushes~c~CBI">Hand Brushes</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Brooms-and-Accessories~c~CBJ">Brooms & Accessories</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Mops-and-Accessories~c~CBKX">Mops & Accessories</a>
									</div>
								</div>
							</div>

							<div class="PD020-Janitorial-Cleaning-Supplies-Paper-Towels-Dispensers-Wrap PD020-Sub-Category-Link-Wrap">	
								<a href="https://www.protecdirect.co.uk/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Paper-Towels-and-Dispensers-~c~CCB" class="PD020-Janitorial-Cleaning-Supplies-Sub-Category-Link PD020-Sub-Category-Link">Paper Towels & Dispensers<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Janitorial-Cleaning-Supplies-Paper-Towels-Dispensers-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Janitorial-Cleaning-Supplies-Paper-Towels-Dispensers-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Hand-Towels~c~CBA">Hand Towels</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Toilet-Tissue~c~CBV">Toilet Tissue</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Wipers~c~CBN">Wipers</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Paper-Dispensers~c~CBO">Paper Dispensers</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Value-Paper-and-Dispensers~c~CBW">Value Paper & Dispensers</a>
									</div>
								</div>
							</div>

							<div class="PD020-Janitorial-Cleaning-Supplies-Vacuum-Cleaners-and-Carpet-Washers PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Janitorial-Cleaning-Supplies-Sub-Category-Link PD020-Sub-Category-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Vacuum-Cleaners-and-Carpet-Washers~c~CBAC">Vacuum Cleaners & Carpet Washers</a>	
							</div>

							<div class="PD020-Janitorial-Cleaning-Supplies-Cleaning-Cloths-Wrap PD020-Sub-Category-Link-Wrap">	
								<a href="https://www.protecdirect.co.uk/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Cleaning-Cloths-and-Scouring-Pads~c~CBB" class="PD020-Janitorial-Cleaning-Supplies-Sub-Category-Link PD020-Sub-Category-Link">Cleaning Cloths<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Janitorial-Cleaning-Supplies-Cleaning-Cloths-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Janitorial-Cleaning-Supplies-Cleaning-Cloths-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Cleaning-Cloths-and-Scouring-Pads~c~CBB">Cleaning Cloths & Scouring Pads</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Rags-and-Cloths~c~CBQ">Rags & Cloths</a>
									</div>
								</div>
							</div>

							<div class="PD020-Janitorial-Cleaning-Supplies-Buckets-Wringers PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Janitorial-Cleaning-Supplies-Sub-Category-Link PD020-Sub-Category-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Buckets-and-Wringers~c~CBAB">Buckets & Wringers</a>	
							</div>

							<div class="PD020-Janitorial-Cleaning-Supplies-Bins-Sacks PD020-Sub-Category-Link-Wrap">	
								<a href="https://www.protecdirect.co.uk/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Refuse-Bins-and-Sacks-~c~CCC" class="PD020-Janitorial-Cleaning-Supplies-Sub-Category-Link PD020-Sub-Category-Link">Refuse Bins & Sacks<span class="PD020-Arrow-Right"></span></a>	
								<div class="PD020-Janitorial-Cleaning-Supplies-Bins-Sacks-Tertiary PD020-Tertiary-Wrap">
									<div class="PD020-Janitorial-Cleaning-Supplies-Bins-Sacks-Tertiary-Link-Wrap PD020-Tertiary-Link-Wrap">
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Refuse-Bins~c~CBR">Refuse Bins</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Refuse-Sacks~c~CBS">Refuse Sacks</a>
										<a class="PD020-Janitorial-Cleaning-Supplies-Tertiary-Link PD020-Tertiary-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Smoking-Bins~c~CBT">Smoking Bins</a>
									</div>
								</div>
							</div>

							<div class="PD020-Janitorial-Cleaning-Supplies-Window-Cleaning PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Janitorial-Cleaning-Supplies-Sub-Category-Link PD020-Sub-Category-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Window-Cleaning-Equipment~c~CBZ">Window Cleaning Equipment</a>	
							</div>

							<div class="PD020-Janitorial-Cleaning-Spill-Control PD020-Sub-Category-Link-Wrap">
								<a class="PD020-Janitorial-Cleaning-Supplies-Sub-Category-Link PD020-Sub-Category-Link" href="/Industrial-Skin-Care-and-Janitorial/Janitorial-and-Cleaning-Supplies/Spill-Control~c~CBU">Spill Control</a>	
							</div>
						</div>
					</div>
				</div>

				<div class="PD020-Special-Offers PD020-Top-Level">
					<a class="PD020-Special-Offers-Link PD020-Top-Level-Link" href="/All-Discounts/Special-Offers~c~special_offers">Special Offers</a>
				</div>

			</div>
			`); 

			const otherCategoriesMakup = (`
			<div class="PD020-Other-Catgories PD020-Top-Level">
				<span class="PD020-Other-Categories-Link PD020-Top-Level-Link">Other Categories<span class="PD020-Arrow-Down"></span></span>
				<div class="PD020-Other-Categories-Sub-Category-Wrap PD020-Sub-Category-Wrap">
					<div class="PD020-Other-Categories-Sub-Category-Link-Wrap PD020-Sub-Category-Links-Wrap">
					</div>
				</div>
			</div>

			`)
            
            //Retun the selectors we want to reference in other parts of the test
            return {
				bodyVar,
				navMarkup,
				oldNavigation,
				navRegexes,
				promotedCategory,
				PD020Categories,
				otherCategoriesMakup
            };
        })();


        const testBuilder = {

            setupElements(){
				//Replace old navigation
				
				cacheDom.oldNavigation.innerHTML = cacheDom.navMarkup;

				//Loop through navigation regexes to rebuild navigation if on matching product/category page

				for(let i = 0; i < cacheDom.navRegexes.length; i++){
					if(cacheDom.navRegexes[i].test(window.location.pathname)){
						cacheDom.bodyVar.classList.add("PD020-Promoted-Category");

						//Make array containing other categories

						cacheDom.PD020Categories = cacheDom.bodyVar.querySelectorAll('.PD020-Top-Level:not(.PD020-Special-Offers)');
						cacheDom.PD020Categories = Array.prototype.slice.call(cacheDom.PD020Categories);

						//Remove promoted category from other categories 
						cacheDom.promotedCategory = cacheDom.PD020Categories.splice(i, 1);

						cacheDom.bodyVar.querySelector('.PD020-Navigation').insertAdjacentHTML('beforeend', cacheDom.otherCategoriesMakup);

						//Loop through the other categories and add them to the other categories markup

						for(let j = 0; j < cacheDom.PD020Categories.length; j++){
							cacheDom.bodyVar.querySelector('.PD020-Other-Categories-Sub-Category-Link-Wrap').insertAdjacentElement('beforeend', cacheDom.PD020Categories[j]);
						};

						//Build tracking

						functionalityBuilder.promotedCategoryTracking();

						break;
					}
				}

				//Build original navigation tracking if not on promoted category

				if(cacheDom.bodyVar.classList.contains("PD020-Promoted-Category") == false){
					functionalityBuilder.navigationTracking();
        }

        }

        };

        
        const functionalityBuilder = {

			navigationTracking(){
				//Hover and click first level item

				// $('.PD020-Top-Level').hover(function(){
				// 	let topLevelCategory = $(this).find(' > a:first').text().trim();
				// 	utils.events.send('PD020', 'Hover', 'First Level: ' + topLevelCategory, {sendOnce: true});
				// });

				$('a.PD020-Top-Level-Link').click(function(){
					let topLevelCategory = $(this).text().trim();
					utils.events.send('PD020', 'Click', 'First Level: ' +  topLevelCategory, {sendOnce: true});
				});

				//Hover and click second level item

				// $('.PD020-Sub-Category-Link-Wrap').hover(function(){
				// 	let secondLevelCategory = $(this).find(' > a:first').text().trim();
				// 	utils.events.send('PD020', 'Hover', 'Second Level: ' + secondLevelCategory, {sendOnce: true});
				// });

				$('a.PD020-Sub-Category-Link').click(function(){
					let secondLevelCategory = $(this).text().trim();
					utils.events.send('PD020', 'Click', 'Second Level: ' + secondLevelCategory, {sendOnce: true});
				});

				//Hover and click third level item

				// $('.PD020-Tertiary-Link').hover(function(){
				// 	let thirdLevelCategory = $(this).text().trim();
				// 	utils.events.send('PD020', 'Hover', 'Third Level: ' + thirdLevelCategory, {sendOnce: true});
				// });

				$('a.PD020-Tertiary-Link').click(function(){
					let thirdLevelCategory = $(this).text().trim();
					utils.events.send('PD020', 'Click', 'Third Level: ' + thirdLevelCategory, {sendOnce: true});
				});

			},

			promotedCategoryTracking(){

			//Promoted Category Tracking

				//Hover and click first level item

				// $('.PD020-Navigation > .PD020-Top-Level:not(.PD020-Other-Catgories)').hover(function(){
				// 	let topLevelCategory = $(this).find('> a:first').text().trim();
				// 	utils.events.send('PD020', 'Promoted Category - Hover', 'First Level: ' + topLevelCategory, {sendOnce: true});
				// });

				$('a.PD020-Top-Level-Link').click(function(){
					let topLevelCategory = $(this).text().trim();
					utils.events.send('PD020', 'Promoted Category - Click', 'First Level: ' + topLevelCategory, {sendOnce: true});
				});

				//Hover and click second level item

				// $('.PD020-Navigation > .PD020-Top-Level:not(.PD020-Other-Catgories) > .PD020-Sub-Category-Wrap .PD020-Sub-Category-Link-Wrap').hover(function(){
				// 	let secondLevelCategory = $(this).find('> :first-child').text().trim();
				// 	utils.events.send('PD020', 'Promoted Category - Hover', 'Second Level: ' + secondLevelCategory, {sendOnce: true});
				// });

				$('.PD020-Navigation > .PD020-Top-Level:not(.PD020-Other-Catgories) > .PD020-Sub-Category-Wrap .PD020-Sub-Category-Link').click(function(){
					let secondLevelCategory = $(this).text().trim();
					utils.events.send('PD020', 'Promoted Category - Click', 'Second Level: ' + secondLevelCategory, {sendOnce: true});
				});

				//Hover and click third level item

				// $('.PD020-Navigation > .PD020-Top-Level:not(.PD020-Other-Catgories) > .PD020-Sub-Category-Wrap .PD020-Tertiary-Link').hover(function(){
				// 	let thirdLevelCategory = $(this).text().trim();
				// 	utils.events.send('PD020', 'Promoted Category - Hover', 'Third Level: ' + thirdLevelCategory, {sendOnce: true});
				// });

				$('.PD020-Navigation > .PD020-Top-Level:not(.PD020-Other-Catgories) > .PD020-Sub-Category-Wrap a.PD020-Tertiary-Link').click(function(){
					let thirdLevelCategory = $(this).text().trim();
					utils.events.send('PD020', 'Promoted Category - Click', 'Third Level: ' + thirdLevelCategory, {sendOnce: true});
				});

			
			//Other Category Tracking

				//Hover and click first level item

				// $('.PD020-Navigation > .PD020-Other-Catgories').hover(function(){
				// 	let topLevelCategory = $(this).find('> a:first').text().trim();
				// 	utils.events.send('PD020', 'Other Categories - Hover', 'First Level: ' + topLevelCategory, {sendOnce: true});
				// });

				$('.PD020-Navigation > .PD020-Other-Catgories a.PD020-Top-Level-Link').click(function(){
					let topLevelCategory = $(this).text().trim();
					utils.events.send('PD020', 'Other Categories - Click', 'First Level: ' + topLevelCategory, {sendOnce: true});
				});

				// $('.PD020-Navigation > .PD020-Other-Catgories .PD020-Top-Level').hover(function(){
				// 	let topLevelCategory = $(this).find('> a:first').text().trim();
				// 	utils.events.send('PD020', 'Other Categories - Hover', 'First Level: ' + topLevelCategory, {sendOnce: true});
				// });

				$('.PD020-Navigation > .PD020-Other-Catgories a.PD020-Top-Level').click(function(){
					let topLevelCategory = $(this).text().trim();
					utils.events.send('PD020', 'Other Categories - Click', 'First Level: ' + topLevelCategory, {sendOnce: true});
				});

				//Hover and click second level item

				// $('.PD020-Navigation > .PD020-Other-Catgories .PD020-Sub-Category-Link-Wrap').hover(function(){
				// 	let secondLevelCategory = $(this).find('> :first-child').text().trim();
				// 	utils.events.send('PD020', 'Other Categories - Hover', 'Second Level: ' + secondLevelCategory, {sendOnce: true});
				// });

				$('.PD020-Navigation > .PD020-Other-Catgories .PD020-Sub-Category-Link').click(function(){
					let secondLevelCategory = $(this).text().trim();
					utils.events.send('PD020', 'Other Categories - Click', 'Second Level: ' + secondLevelCategory, {sendOnce: true});
				});

				//Hover and click third level item

				// $('.PD020-Navigation > .PD020-Other-Catgories .PD020-Tertiary-Link').hover(function(){
				// 	let thirdLevelCategory = $(this).text().trim();
				// 	utils.events.send('PD020', 'Other Categories - Hover', 'Third Level: ' + thirdLevelCategory, {sendOnce: true});
				// });

				$('.PD020-Navigation > .PD020-Other-Catgories a.PD020-Tertiary-Link').click(function(){
					let thirdLevelCategory = $(this).text().trim();
					utils.events.send('PD020', 'Other Categories - Click', 'Third Level: ' + thirdLevelCategory, {sendOnce: true});
				});

			}

		};
		

    testBuilder.setupElements();
       
    }    
})();