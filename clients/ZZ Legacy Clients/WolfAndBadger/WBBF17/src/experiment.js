// -----------------------------------------------
// IMPORTANT!!!!
// DO NOT EDIT THIS TEST DIRECTLY IN THE PLATFORM
//
// Modify the source in the experiments repo
// -----------------------------------------------

/* eslint-disable */

import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';

var _WBBF17 = (function() {

	/*--------------------------------------
	Experiment Code
	---------------------------------------*/
	var _activate = function() {
		var cm = require('cookieman');

		if (cm.get('WBBF17_bucketed').length === 0) {
			cm.set('WBBF17_bucketed', true, {
				expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 365)), 
				path: '/',
				domain: '.wolfandbadger.com'
			});
		}
		
		// Cache elements
		var elements = (function() {
			var body = document.body;
			
			return {
				body: body
			};
		}());

		// Namespace CSS
		elements.body.className += ' WBBF17';

		function createBanner() {
			var userSignedUp = cm.get('WBBF17_signed-up').length > 0 ? true : false;
			
			// Calc days to go
			var daysToGo = (function() {
				var blackFriday = new Date('2017-11-24');
				var now = new Date();
				now.setHours(0);
				now.setMinutes(0);

				return Math.round((blackFriday-now)/(1000*60*60*24));
			}());

			var el = document.createElement('div');
			el.className = 'WBBF17_hero-banner';

			/* 
				If it's Black Friday or user has signed up to newsletter,
				show the version of banner with the discount code,
				else show the sign up to newsletter version
			*/
			//if (daysToGo <= 0 || userSignedUp) {
			if (daysToGo <= 0) {
				el.innerHTML = `
					<div class="WBBF17_links">
						<ul>
							<li>
								<a href="/category/women/?onsale=True">Women</a>
							</li>
							<li>
								<a href="/category/men/?onsale=True">Mens</a>
							</li>
							<li>
								<a href="/category/kids/?onsale=True">Kids</a>
							</li>
							<li>
								<a href="/category/homewares/?onsale=True">Home</a>
							</li>
						</ul>
					</div>
					<a href="/black-friday" class="WBBF17_offer-link">
						<div class="WBBF17_offer">
							<div class="WBBF17_offer__percentage">
								<em>10%</em>
								<br />
								Off
							</div>
							<div class="WBBF17_offer__code">
								with code:
								<br />
								<em>BLACKFRIDAY17</em>
							</div>					
						</div>
					</a>
					<a href="/black-friday" class="WBBF17_offer-link--mobile">
						<div class="WBBF17_offer--mobile">
							10% off everything with the code:
							<br/>
							<em>BLACKFRIDAY17</em>		
						</div>
					</a>
				`;

				el.className += ' WBBF17_code-visible';
			} else {
				el.innerHTML = `
					<div class="WBBF17_inner-content">
						<div class="WBBF17_days">
							<div class="WBBF17_days__count">${daysToGo}</div>
							<div class="WBBF17_days__label">Days</div>
						</div>
						<p class="WBBF17_banner-text">
							Sign up <a href="#" id="WBBF17_sign-up">here</a>
							<br />
							for exclusive offers and early access
						</p>
					</div>
				`;
				
				el.className += ' WBBF17_code-hidden';
			}

			return el;
		}

		function renderBanner(banner) {
			var content;

			if (!elements.content) {
				content = document.getElementById('content');
				elements.content = content;
			} else {
				content = elements.content;
			}

			content.parentNode.insertBefore(banner, content);
		}

		function findRegion() {
			var userId = cm.get('_qubitTracker')[0].value,
				region = window.currentRegion;			

			if (region === 'UK') {
				return 'uk';

			} else if (region === 'EU') {
				// Check if country is DE or FR
				UC.poller([
					function() {
						if (options.getVisitorState) return true;
					}
				], function() {
					var country = options.getVisitorState().value.countryCode;
					if (country) {
						if (country === 'DE') {
							return 'de';

						} else if (country === 'FR') {
							return 'fr';

						} else {
							return 'eu';

						}
					} else {
						return 'eu';

					}
				});

			} else if (region === 'US') {
				return 'us';

			} else if (region === 'AU') {
				return 'au';
				
			} else if (region === 'AA') {
				return 'row';
				
			} else {
				return 'uk';
			}
		}

		function createModal() {
			var userSignedUp = cm.get('WBBF17_signed-up').length > 0 ? true : false;
			var userClosedInitialPopup = cm.get('WBBF17_popup-closed').length > 0 ? true : false;

			var region = findRegion();

			// DATA
			var data = {
				content: {
					uk: {
						image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/f0e1dd5e8dfdeebb2d32f5e9c7afd635_427_600.jpeg',
						html_right: [
						'<div class="WBBF17_top-bar">',
							'<div class="WBBF17_lightbox_flag"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/f8ee18e51f8c16e6cb421a3fc35ab3af_100_100.png" /></div>',
							'<div class="WBBF17_lightbox_heading">',
								'Welcome to our UK site',
							'</div>',
							'<div id="WBBF17_lightbox-exit"></div>',
						'</div>',
						'<div class="WBBF17_centre WBBF17_top-content">',
							'<div class="WBBF17_logo-wrap"><div class="WBBF17_logo"></div><div class="WBBF17_tagline">The world\'s best independent brands</div></div>',
							'<p>Discover over 500 independent designers from all over the world</p>',
							'<ul>',
							'<li>Exclusive discount code</li>',
							'<li>Free domestic delivery</li>',
							'<li>Free worldwide extended returns</li>',
							'</ul>',
							'<div class="WBBF17_centre"><a class="WBBF17_closeLightbox WBBF17_btn">Start shopping</a></div>',
						'</div>',
						'<div class="WBBF17_email-wrapper">',
							'<span class="WBBF17_heading">Sign up for our newsletter</span>',
							'<p>Be the first to know about new designers, trends and events</p>',
							'<div class="WBBF17_input-wrap WBBF17_centre">',
							'<input type="text" placeholder="Enter your email address" class="WBBF17_input WBBF17_small"/>',
							'<div class="WBBF17_send">Register</div>',
							'</div>',
							'<div class="WBBF17_contact">',
							'<div class="WBBF17_contact-row">',
								'<span class="WBBF17_contact__phone">+44 (0) 20 3627 3191</span>',
								'<span class="WBBF17_contact__address">32 Dover Street, London, W1S 4NE</span>',
							'</div>',
							'<div class="WBBF17_contact-row">',
								'<span class="WBBF17_contact__phone">+44 (0) 20 7229 5698</span>',
								'<span class="WBBF17_contact__address">46 Ledbury Road, London, W11 2AB</span>',
							'</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Thank you for signing up to our newsletter',
							'<br/>',
							'Use the code <em>BLACKFRIDAY17</em> for 10% off',
						'</div>'
						].join(''),
						html_bottom: [
						'<hr>',
						'<div class="WBBF17_email-wrapper">',
							'<p>Be the first to know about new designers, trends and events</p>',
							'<div class="WBBF17_input-wrap">',
							'<input type="text" placeholder="Enter your email address" class="WBBF17_input"/>',
							'<div class="WBBF17_send">Register</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Thank you for signing up to our newsletter',
							'<br/>',
							'Use the code <em>BLACKFRIDAY17</em> for 10% off',
						'</div>'
						].join('')
					},
					us: {
						image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/f0e1dd5e8dfdeebb2d32f5e9c7afd635_427_600.jpeg',
						html_right: [
						'<div class="WBBF17_top-bar">',
							'<div class="WBBF17_lightbox_flag"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/b302c4e8c36d9de8fb08f1de23728e20_100_100.png" /></div>',
							'<div class="WBBF17_lightbox_heading">',
								'Welcome to our US site',
							'</div>',
							'<div id="WBBF17_lightbox-exit"></div>',
						'</div>',
						'<div class="WBBF17_centre WBBF17_top-content">',
							'<div class="WBBF17_logo-wrap"><div class="WBBF17_logo"></div><div class="WBBF17_tagline">The world\'s best independent brands</div></div>',
							'<p>Discover over 500 independent designers from all over the world</p>',
							'<ul>',
							//'<li>Free delivery over $240</li>',
							'<li>Over 500 curated emerging designers</li>',
							'<li>Free delivery from all US brands</li>',
							'<li>Free worldwide returns</li>',
							'<li>No customs duties or taxes</li>',
							'</ul>',
							'<div class="WBBF17_centre"><a class="WBBF17_closeLightbox WBBF17_btn">Start shopping</a></div>',
						'</div>',
						'<div class="WBBF17_email-wrapper">',
							'<span class="WBBF17_heading">Sign up for our newsletter</span>',
							'<p>Be the first to know about new designer, trends and offers</p>',
							'<div class="WBBF17_input-wrap WBBF17_centre">',
							'<input type="text" placeholder="Enter your email address" class="WBBF17_input WBBF17_small"/>',
							'<div class="WBBF17_send">Register</div>',
							'</div>',
							'<div class="WBBF17_contact">',
							'<div class="WBBF17_contact-row">',
								'<span class="WBBF17_contact__phone">+1 (646) 934 6601</span>',
								'<span class="WBBF17_contact__address">95 Grand Street, New York, NY 10013, USA</span>',
							'</div>',
							'</div>',
						'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Thank you for signing up to our newsletter',
							'<br/>',
							'Use the code <em>BLACKFRIDAY17</em> for 10% off',
						'</div>'
						].join(''),
						html_bottom: [
						'<hr>',
						'<div class="WBBF17_email-wrapper">',
							'<p>Be the first to know about new designers, trends and events</p>',
							'<div class="WBBF17_input-wrap">',
							'<input type="text" placeholder="Enter your email address" class="WBBF17_input"/>',
							'<div class="WBBF17_send">Register</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Thank you for signing up to our newsletter',
							'<br/>',
							'Use the code <em>BLACKFRIDAY17</em> for 10% off',
						'</div>'
						].join('')
					},
					au: {
						image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/f0e1dd5e8dfdeebb2d32f5e9c7afd635_427_600.jpeg',
						html_right: [
						'<div class="WBBF17_top-bar">',
							'<div class="WBBF17_lightbox_flag"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/fb0a8994ab8c865f6affefde48ac5fb2_100_100.png" /></div>',
							'<div class="WBBF17_lightbox_heading">',
								'Welcome to our AUS site',
							'</div>',
							'<div id="WBBF17_lightbox-exit"></div>',
						'</div>',
						'<div class="WBBF17_centre WBBF17_top-content">',
							'<div class="WBBF17_logo-wrap"><div class="WBBF17_logo"></div><div class="WBBF17_tagline">The world\'s best independent brands</div></div>',
							'<p>Discover over 500 independent designers from all over the world</p>',
							'<ul>',
							'<li>Over 500 curated emerging designers</li>',
							//'<li>Free delivery from all AUS brands</li>',
							'<li>Free worldwide returns</li>',
							//'<li>Free delivery over $300</li>',
							'<li>No customs duties or taxes</li>',
							'</ul>',
							'<div class="WBBF17_centre"><a class="WBBF17_closeLightbox WBBF17_btn">Start shopping</a></div>',
						'</div>',
						'<div class="WBBF17_email-wrapper">',
							'<span class="WBBF17_heading">Sign up for our newsletter</span>',
							'<p>Be the first to know about new designer, trends and offers</p>',
							'<div class="WBBF17_input-wrap WBBF17_centre">',
							'<input type="text" placeholder="Enter your email address" class="WBBF17_input WBBF17_small"/>',
							'<div class="WBBF17_send">Register</div>',
							'</div>',
							'<div class="WBBF17_contact">',
							'<div class="WBBF17_contact-row">',
								'<span class="WBBF17_contact__phone WBBF17_contact__phone-icon">+ 61283111555</span>',
							'</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Thank you for signing up to our newsletter',
							'<br/>',
							'Use the code <em>BLACKFRIDAY17</em> for 10% off',
						'</div>'
						].join(''),
						html_bottom: [
						'<hr>',
						'<div class="WBBF17_email-wrapper">',
							'<p>Be the first to know about new designers, trends and events</p>',
							'<div class="WBBF17_input-wrap">',
							'<input type="text" placeholder="Enter your email address" class="WBBF17_input"/>',
							'<div class="WBBF17_send">Register</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Thank you for signing up to our newsletter',
							'<br/>',
							'Use the code <em>BLACKFRIDAY17</em> for 10% off',
						'</div>'
						].join('')
					},
					eu: {
						image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/f0e1dd5e8dfdeebb2d32f5e9c7afd635_427_600.jpeg',
						html_right: [
						'<div class="WBBF17_top-bar">',
							'<div class="WBBF17_lightbox_flag"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/946daef15041d8d7e288e4aedf5c648c_100_100.png" /></div>',
							'<div class="WBBF17_lightbox_heading">',
								'Welcome to our EU site',
							'</div>',
							'<div id="WBBF17_lightbox-exit"></div>',
						'</div>',
						'<div class="WBBF17_centre WBBF17_top-content">',
							'<div class="WBBF17_logo-wrap"><div class="WBBF17_logo"></div><div class="WBBF17_tagline">The world\'s best independent brands</div></div>',
							'<p>Discover over 500 independent designers from all over the world</p>',
							'<ul>',
							//'<li>Free delivery over €210</li>',
							'<li>Over 500 curated emerging designers</li>',
							'<li>Free worldwide returns</li>',
							'<li>No customs duties or taxes<span class="WBBF17_subtext">*some exclusions apply</span></li>',
							'</ul>',
							'<div class="WBBF17_centre"><a class="WBBF17_closeLightbox WBBF17_btn">Start shopping</a></div>',
						'</div>',
						'<div class="WBBF17_email-wrapper">',
							'<span class="WBBF17_heading">Sign up for our newsletter</span>',
							'<p>Be the first to know about new designer, trends and offers</p>',
							'<div class="WBBF17_input-wrap WBBF17_centre">',
							'<input type="text" placeholder="Enter your email address" class="WBBF17_input WBBF17_small"/>',
							'<div class="WBBF17_send">Register</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Thank you for signing up to our newsletter',
							'<br/>',
							'Use the code <em>BLACKFRIDAY17</em> for 10% off',
						'</div>'
						].join(''),
						html_bottom: [
						'<hr>',
						'<div class="WBBF17_email-wrapper">',
							'<p>Be the first to know about new designers, trends and events</p>',
							'<div class="WBBF17_input-wrap">',
							'<input type="text" placeholder="Enter your email address" class="WBBF17_input"/>',
							'<div class="WBBF17_send">Register</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Thank you for signing up to our newsletter',
							'<br/>',
							'Use the code <em>BLACKFRIDAY17</em> for 10% off',
						'</div>'
						].join('')
					},
					de: {
						image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/f0e1dd5e8dfdeebb2d32f5e9c7afd635_427_600.jpeg',
						html_right: [
						'<div class="WBBF17_top-bar">',
							'<div class="WBBF17_lightbox_flag"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/71a6c6d2ff3fea148df07a382e713b5d_100_100.png" /></div>',
							'<div class="WBBF17_lightbox_heading">',
								'Willkommen auf unserer Website!',
							'</div>',
							'<div id="WBBF17_lightbox-exit"></div>',
						'</div>',
						'<div class="WBBF17_centre WBBF17_top-content">',
							'<div class="WBBF17_logo-wrap"><div class="WBBF17_logo"></div><div class="WBBF17_tagline">The world\'s best independent brands</div></div>',
							'<p>Entdecken Sie über 500 unabhängige Designer aus der ganzen Welt</p>',
							'<ul>',
							//'<li>Free delivery over €210</li>',
							'<li>Über 750 kuratierte aufstrebende Designer</li>',
							'<li>Kostenlose Lieferung aller deutschen Marken</li>',
							'<li>Kostenlose Rücksendung und Umtausch</li>',
							'<li>Keine Zölle oder weitere Steuern</li>',
							'<li>Höchste Sicherheit & Datenschutz</li>',
							'</ul>',
							'<p>Ethisch. Einzigartig. Jeden Tag neue Arrivals!</p>',
							'<div class="WBBF17_centre"><a class="WBBF17_closeLightbox WBBF17_btn">JETZT SHOPPEN </a></div>',
						'</div>',
						'<div class="WBBF17_email-wrapper">',
							'<span class="WBBF17_heading">WERDE TEIL DER WOLF & BADGER COMMUNITY</span>',
							'<p>Sign-up hier für unseren Newsletter über neue Designer, Trends, Angebote und mehr</p>',
							'<div class="WBBF17_input-wrap WBBF17_centre">',
							'<input type="text" placeholder="Email Adresse hier eingeben" class="WBBF17_input WBBF17_small"/>',
							'<div class="WBBF17_send">SIGN-UP</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Vielen Dank fuer Deine Newsletter Registrierung!',
							'<br/>',
							'Nutze den Gutschein <em>BLACKFRIDAY17</em> für 10% Rabatt',
						'</div>'
						].join(''),
						html_bottom: [
						'<hr>',
						'<div class="WBBF17_email-wrapper">',
							'<p>Sign-up hier für unseren Newsletter über neue Designer, Trends, Angebote und mehr</p>',
							'<div class="WBBF17_input-wrap">',
							'<input type="text" placeholder="Email Adresse hier eingeben" class="WBBF17_input"/>',
							'<div class="WBBF17_send">SIGN-UP</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Vielen Dank fuer Deine Newsletter Registrierung!',
							'<br/>',
							'Nutze den Gutschein <em>BLACKFRIDAY17</em> für 10% Rabatt',
						'</div>'
						].join('')
					},
					fr: {
						image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/f0e1dd5e8dfdeebb2d32f5e9c7afd635_427_600.jpeg',
						html_right: [
						'<div class="WBBF17_top-bar">',
							'<div class="WBBF17_lightbox_flag"><img src="https://dd6zx4ibq538k.cloudfront.net/static/images/4347/b2a1d76a8e903a12fbe946d0db0d02ac_100_100.png" /></div>',
							'<div class="WBBF17_lightbox_heading">',
								'Bienvenue sur notre site!',
							'</div>',
							'<div id="WBBF17_lightbox-exit"></div>',
						'</div>',
						'<div class="WBBF17_centre WBBF17_top-content">',
							'<div class="WBBF17_logo-wrap"><div class="WBBF17_logo"></div><div class="WBBF17_tagline">The world\'s best independent brands</div></div>',
							'<p>Découvrez plus de 500 designers indépendants du monde entier</p>',
							'<ul>',
							//'<li>Free delivery over €210</li>',
							'<li>Plus de 750 designers sélectionnés & emergés</li>',
							'<li>Livraison gratuite de toutes les marques françaises</li>',
							'<li>Retour gratuit sur tout</li>',
							'<li>Pas de droits de douane ni taxes</li>',
							'</ul>',
							'<p>Ethique, unique. Nouvelles arrivées chaque jour!</p>',
							'<div class="WBBF17_centre"><a class="WBBF17_closeLightbox WBBF17_btn">Commencer le SHOPPING</a></div>',
						'</div>',
						'<div class="WBBF17_email-wrapper">',
							'<span class="WBBF17_heading">INSCRIPTION A LA NEWSLETTER WOLF & BADGER!</span>',
							'<p>Sign-up ici pour de nouveautés à ne pas manquer</p>',
							'<div class="WBBF17_input-wrap WBBF17_centre">',
							'<input type="text" placeholder="Entrez votre adresse email svp" class="WBBF17_input WBBF17_small"/>',
							'<div class="WBBF17_send">JE M’INSCRIS</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Merci pour l\'inscription à notre newsletter',
							'<br/>',
							'Utilisez le coupon <em>BLACKFRIDAY17</em> pour 10% de réduction',
						'</div>'
						].join(''),
						html_bottom: [
						'<hr>',
						'<div class="WBBF17_email-wrapper">',
							'<p>Sign-up ici pour de nouveautés à ne pas manquer</p>',
							'<div class="WBBF17_input-wrap">',
							'<input type="text" placeholder="Entrez votre adresse email svp" class="WBBF17_input"/>',
							'<div class="WBBF17_send">JE M’INSCRIS</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Merci pour l\'inscription à notre newsletter',
							'<br/>',
							'Utilisez le coupon <em>BLACKFRIDAY17</em> pour 10% de réduction',
						'</div>'
						].join('')
					},
					row: {
						image: 'https://dd6zx4ibq538k.cloudfront.net/static/images/4347/f0e1dd5e8dfdeebb2d32f5e9c7afd635_427_600.jpeg',
						html_right: [
						'<div class="WBBF17_top-bar">',
							'<div id="WBBF17_lightbox-exit"></div>',
							'<div class="WBBF17_lightbox_heading">',
								'Welcome to Wolf & Badger',
							'</div>',
						'</div>',
						'<div class="WBBF17_centre WBBF17_top-content">',
							'<div class="WBBF17_logo-wrap"><div class="WBBF17_logo"></div><div class="WBBF17_tagline">The world\'s best independent brands</div></div>',
							'<p>Discover over 500 independent designers from all over the world</p>',
							'<ul>',
							//'<li>Free delivery over £150</li>',
							'<li>Over 500 curated emerging designers</li>',
							'<li>Free worldwide returns</li>',
							'<li>No customs duties or taxes<span class="WBBF17_subtext">*some exclusions apply</span></li>',
							'</ul>',
							'<div class="WBBF17_centre"><a class="WBBF17_closeLightbox WBBF17_btn">Start shopping</a></div>',
						'</div>',
						'<div class="WBBF17_email-wrapper">',
							'<span class="WBBF17_heading">Sign up for our newsletter</span>',
							'<p>Be the first to know about new designer, trends and offers</p>',
							'<div class="WBBF17_input-wrap WBBF17_centre">',
							'<input type="text" placeholder="Enter your email address" class="WBBF17_input WBBF17_small"/>',
							'<div class="WBBF17_send">Register</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Thank you for signing up to our newsletter',
							'<br/>',
							'Use the code <em>BLACKFRIDAY17</em> for 10% off',
						'</div>'
						].join(''),
						html_bottom: [
						'<hr>',
						'<div class="WBBF17_email-wrapper">',
							'<p>Be the first to know about new designers, trends and events</p>',
							'<div class="WBBF17_input-wrap">',
							'<input type="text" placeholder="Enter your email address" class="WBBF17_input"/>',
							'<div class="WBBF17_send">Register</div>',
							'</div>',
						'</div>',
						'<div class="WBBF17_email-success">',
							'Thank you for signing up to our newsletter',
							'<br/>',
							'Use the code <em>BLACKFRIDAY17</em> for 10% off',
						'</div>'
						].join('')
					}
				}
			};

			// EXPERIMENT
			var $ = require('jquery'),
				sendEvent = require('@qubit/send-uv-event'),
				urlCountry = window.location.href.match(/wolfandbadger.com\/(.*)\//)[1],
				POST_url = 'https://www.wolfandbadger.com/' + urlCountry + '/newsletter/subscribe/?next=https://www.wolfandbadger.com/'+urlCountry+'/',
				lightboxContent_right = data.content[region].html_right,
				lightboxContent_bottom = data.content[region].html_bottom,
				$body = $('body');
			
			var $lightboxHTML = $([
				'<div id="WBBF17_lightbox-overlay" style="display:none;"></div>',
				'<div class="WBBF17_lightbox" style="display:none;">',
					'<div class="WBBF17_lightbox__dialog">',
						'<div class="WBBF17_lightbox__dialog__content">',
						'<div class="WBBF17_lightbox_left"></div>',
						'<div class="WBBF17_lightbox_right">',
							lightboxContent_right,
						'</div>',
						'<div class="WBBF17_clearfix"></div>',
					'</div>',
				'</div>'
			].join(''));
			
			$lightboxHTML.prependTo($body);
			
			var $lightbox = $lightboxHTML.filter('#WBBF17_lightbox-overlay, .WBBF17_lightbox'),
				$exitPoints;
				
			function open() {
				$lightbox.fadeIn(500);
				$body.addClass('WBBF17_no-overflow');
			}

			function close() {
				$lightbox.fadeOut(500);
				$body.removeClass('WBBF17_no-overflow');
				if (!userClosedInitialPopup) {
					cm.set('WBBF17_popup-closed', true, {
						expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 365)), 
						path: '/',
						domain: '.wolfandbadger.com'
					});
				}
			}

			if ($lightboxHTML.find('.WBBF17_closeLightbox').length > 0) {
				$exitPoints = $lightboxHTML.find("#WBBF17_lightbox-exit").add($lightboxHTML.filter('#WBBF17_lightbox-overlay')).add($lightboxHTML.find('.WBBF17_closeLightbox'));
			} else {
				$exitPoints = $lightboxHTML.find("#WBBF17_lightbox-exit").add($lightboxHTML.filter('#WBBF17_lightbox-overlay'));
			}
			
			$exitPoints.click(function () {
				close();
			});
			
			
			var error_msg_shown,
				validating_on_keyup;
				
			$lightboxHTML.find('.WBBF17_send').on('click', function () {
				var email = $lightboxHTML.find('input').val();
				
				if(validateEmail(email)) { // Email successfully submitted
				
					signUp(email);
					$lightboxHTML.find('.WBBF17_email-wrapper').hide();
					$lightboxHTML.find('.WBBF17_email-success').css({'display':'block'});
					cm.set('WBBF17_signed-up', true, {
						expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 365)), 
						path: '/',
						domain: '.wolfandbadger.com'
					});
					
					// Update banner to version with voucher
					$('.WBBF17_hero-banner').remove();
					//renderBanner(createBanner());
					window.ga('send', 'event', 'WBBF17', 'submit', 'User signed up to newsletter', {nonInteraction: true});
					sendEvent('WBBF17:email:submitted');

				
				} else { // else show error message and start checking email validation on keyup
					if (!error_msg_shown) {
						var $error_msg = $('<div class="WBBF17_error-msg">Oops, we\'ve encountered an error. Please check that your email is correct.</div>');
						$error_msg.hide().prependTo($lightboxHTML.find('.WBBF17_input-wrap'));
						$error_msg.fadeIn();
						error_msg_shown = true;
					}
					
					if (!validating_on_keyup) {
						$lightboxHTML.find('input').on('keyup', function() {
							var $input = $lightboxHTML.find('input'),
								email = $lightboxHTML.find('input').val(),
								$error_msg = $('.WBBF17_error-msg');
							
							if(validateEmail(email)) {
								$error_msg.addClass('hide-validation-error');
								$input.addClass('validated');
							} else {
								if ($input.hasClass('validated')) {
									$input.removeClass('validated');
								}
								if ($error_msg.hasClass('hide-validation-error')) {
									$error_msg.removeClass('hide-validation-error');
								}
							}
						});
						
						validating_on_keyup = true;
					}
				}
			});

			// Show lightbox if user hasn't signed up and didn't close initial popup
			if (!userSignedUp && !userClosedInitialPopup) {
				open();
			}

			function validateEmail($email) {
				var emailReg = /^([\w-\+\\\/\.]+@([\w-]+\.)+[\w-]{2,6})?$/
				return ( $email.length > 0 && emailReg.test($email));
			}
			
			function signUp (email) {
				if (cm.get('csrftoken').length > 0) {
					window.jQuery.ajax({
						type: 'POST',
						url: POST_url,
						data: {
							csrfmiddlewaretoken: cm.get('csrftoken')[0].value,
							email: email
						}
					});
				}
			}

			return {
				open: open,
				close: close
			};
		}

		UC.poller(['#content'], function() {
			var banner = createBanner();
			renderBanner(banner);
			var modal = createModal();

			function modifyModal() {
				UC.poller(['#mailingListModal h1'], function() {
					var $modal = $('#mailingListModal');

					function changeModalText() {
						$modal.find('.modal-body').addClass('WBBF17_modified-modal');
						$modal.find('h1').text('Sign up for Black Friday early access');
						$modal.find('p.lead').text('Be the first to shop our Black Friday sale when you sign up to our newsletter');
					}
					changeModalText();

					UC.observer.disconnect($modal);
					UC.observer.connect($modal, function() {
						var $h1 = $modal.find('h1');
						if ($h1.text() === 'You have been successfully subscribed to our mailing list') {
							// User subbed - send events and store cookie
							cm.set('WBBF17_signed-up', true, {
								expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 365)), 
								path: '/',
								domain: '.wolfandbadger.com'
							});
							window.ga('send', 'event', 'WBBF17', 'submit', 'User signed up to newsletter');
							sendEvent('WBBF17:email:submitted');
							$('.WBBF17_hero-banner').remove();
						} else {
							// Modify modal
							changeModalText();
						}
					}, {
						config: {childList: true, attribute: false, subtree: true}
					});


				});
			}

			$(banner).find('#WBBF17_sign-up').click(function() {
				if (window.innerWidth < 980) {
					// Open welcome mat
					modal.open();
				} else {
					// Open newsletter popup
					// Simualte click on newsletter icon and open FOMO modal
					$('a[data-target="#mailingListModal"]').trigger('click');
					// Modify FOMO modal
					modifyModal();
				}
			});
		});
		
	};


	/*-------------------------------------- 
	Activation
	---------------------------------------*/
	var _triggers = function(options) {
		utils.fullStory('WBBF17', 'Variation 1');

		_activate();
	};


	// Run experiment
	_triggers();

})();