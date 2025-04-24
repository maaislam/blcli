import * as UC from '../../../../lib/uc-lib';
import * as utils from '../../../../lib/utils';
import * as PU15Content from './lib/PU015-content.js';

//load in the box here

const PU015 = (() => {
    const activate = () => {		
		document.body.classList.add('PU015');

		if(!utils.getCookie('PU15-boxshown')){
			setTimeout(function(){
				showdoctorsBox();
			},3000);      
		} 

		//create the box
		const createBox = () =>{
			const slideBox = document.createElement('div');
			slideBox.classList.add('PU015_box_wrap');
			slideBox.innerHTML = PU15Content.slideUpbox;

			document.body.appendChild(slideBox);
		}
		createBox();	

		//show box
		const showdoctorsBox = () => {
			let box = document.querySelector('.PU015_box_wrap');
			box.classList.add('PU015_box_show');
			utils.events.send('PU015', 'Box Shown', 'Module box shown', {sendOnce: true});
			utils.setCookie('PU15-boxshown',1);
		}
		const removedoctorsBox = () => {
			let box = document.querySelector('.PU015_box_wrap');
			box.classList.remove('PU015_box_show');
			utils.setCookie('PU15-boxshown',1);
		}

		const boxExit = document.querySelector('.PU015_box_exit');
		boxExit.addEventListener('click', () => {
			removedoctorsBox();
		});

		const boxCTA = document.querySelector('.PU015_box_wrap a');
		boxCTA.addEventListener('click', () => {
			utils.events.send('PU015 V1', 'Widget click', 'PU015 clicked on select appointment time', {
				sendOnce: true
			});
			
		});
		
	};

    // Audience conditions
    const triggers = ((options) => {
        UC.poller([
            'body',
            ], () => {
             utils.fullStory('PU015', 'Variation 1');
             activate();
            });
    })();

})();
