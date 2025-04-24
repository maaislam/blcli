import {poller} from '../../../../lib/uc-lib';
import {fullStory, getPreviousSiblings} from '../../../../lib/utils';

/** 
 * PU013 - Funnel Steps
 * @requires module:poller
 * @requires module:fullStory
 */
export const Experiment = {
	globals: {
		ID: 'PU013', 
		variation: '2'
	},
	
	init: function() {
		const globals = Experiment.globals;
		const services = Experiment.services;
		const components = Experiment.components;

		document.body.classList.add(globals.ID);
		document.body.classList.add(`PU013-V${globals.variation}`);
		
		services.tracking();
		services.cacheDom();

		if (document.querySelector('.PU013_Steps')) {
			const component = window.UC.experiments[globals.ID].components.Steps;
			component.changeStep(window.location.pathname);
		} else {
			Experiment.components.Steps._init();
		}
	},

	services: {
		tracking: function() {
			const globals = Experiment.globals;
			fullStory(globals.ID, `Variation ${globals.variation}`);
		},

		cacheDom: function() {
			const elements = Experiment.elements;
			elements.cart = document.querySelector('.shoppingCart-wrapper');
			elements.page = document.querySelector('.page');
		}
	},

	components: {
		Steps: {
			_settings: {
				sequence: [
					'Select Time',
					'Register',
					'Verification',
					'Add Card',
					'Confirmation'	
				],
				component: null
			},

			_create: function() {
				const globals = Experiment.globals;

				const container = document.createElement('div');
				container.classList.add('PU013_StepsContainer')
				const steps = document.createElement('ul');
				steps.classList.add('PU013_Steps');

				const sequence = this._settings.sequence;
				for (let i = 0; i < sequence.length; i++) {
					const stepName = sequence[i];
					const step = document.createElement('li');
					step.classList.add('PU013_Step');
					step.setAttribute('data-step', stepName);
					step.innerHTML = `<div class="PU013_Step__icon"><span>${i+1}</span></div><p>${stepName}</p>`;
					steps.appendChild(step);
				}

				const progress = document.createElement('div');
				progress.classList.add('PU013_Step__progress');
				progress.innerHTML = `Step <span class="PU013_Step__progress__count">1</span> of ${sequence.length}`;

				const label = document.createElement('div');
				label.classList.add('PU013_Step__label');

				container.appendChild(steps);
				container.appendChild(label);
				container.appendChild(progress);
				return container;
			},

			_render: function(component) {
				const elements = Experiment.elements;
				// const cart = elements.cart;
				// cart.parentNode.insertBefore(component, cart.nextSibling);
				const page = elements.page;
				page.insertBefore(component, page.firstChild);
			},

			/**
			 * @description Changes which step is active in the sequence
			 * @param path pathname
			 */
			changeStep: function(path) {
				const steps = document.querySelector('.PU013_Steps');
				const label = document.querySelector('.PU013_Step__label');
				const progressCount = document.querySelector('.PU013_Step__progress__count');
				
				// Remove active and completed classes
				const activeStep = steps.querySelector('.PU013_Step--active');
				if (activeStep) activeStep.classList.remove('PU013_Step--active');
				const completedSteps = steps.querySelectorAll('.PU013_Step--completed');
				for (let i = 0; i < completedSteps.length; i++) {
					completedSteps[i].classList.remove('PU013_Step--completed');
				}

				let newActiveStep, labelChanged;
				switch(path) {
					case '/see-a-doctor-2/select-day':
					newActiveStep = steps.querySelector('[data-step="Select Time"]');
					label.innerText = 'Select Day';
					labelChanged = true;
					break;
					
					case '/see-a-doctor-2/select-time':
					newActiveStep = steps.querySelector('[data-step="Select Time"]');
					break;

					case '/see-a-doctor-2/register/details':
					newActiveStep = steps.querySelector('[data-step="Register"]');
					break;

					case '/see-a-doctor-2/signIn':
					newActiveStep = steps.querySelector('[data-step="Register"]');
					newActiveStep.querySelector('p').innerText = 'Login';
					label.innerText = 'Login';
					labelChanged = true;
					break;

					case '/see-a-doctor-2/activate':
					newActiveStep = steps.querySelector('[data-step="Verification"]');
					break;
					
					case '/see-a-doctor-2/verify':
					newActiveStep = steps.querySelector('[data-step="Verification"]');
					break;

					case '/see-a-doctor-2/addCard':
					newActiveStep = steps.querySelector('[data-step="Add Card"]');
					break;

					case '/see-a-doctor-2/confirm-appointment':
					newActiveStep = steps.querySelector('[data-step="Confirmation"]');
					break;

					case '/see-a-doctor-2/appointment-confirmed':
					newActiveStep = steps.querySelector('[data-step="Confirmation"]');
					break;
				}

				if (!labelChanged) label.innerText = newActiveStep.getAttribute('data-step');
				newActiveStep.classList.add('PU013_Step--active');
				const prev = getPreviousSiblings(newActiveStep);
				for (let i = 0; i < prev.length; i++) {
					prev[i].classList.add('PU013_Step--complete');
				}
				// Update step count
				progressCount.innerText = prev.length+1;
			},

			_init: function() {
				const component = this._create();
				this._render(component);
				
				// Set current step
				this.changeStep(window.location.pathname);

				const api = {
					changeStep: this.changeStep
				}

				// Make API accessible from window
				const globals = Experiment.globals;
				if (!window.UC.experiments[globals.ID].components) window.UC.experiments[globals.ID].components = {};
				window.UC.experiments[globals.ID].components.Steps = api;

				return api;
			}
		}
	},

	elements: {}
};