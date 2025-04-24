import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import shared from '../../../../../../core-files/shared';
import { closeNav, makeHeaderTransparent } from './helpers';


const { ID, VARIATION } = shared;
/**
 * Helper slugify menu name
 */

const slugify = (name) => {
  if(name) {
    return name.replace(/[\s]/ig, '').toLowerCase();
  }
};

const useStep = () => {
  const [step, setStep] = useState('level0');

  return { step, setStep };
};

const useLevel2 = () => {
  const [level2, setLevel2] = useState();
  return { level2, setLevel2 };
};

/**
 * Mobile Sliding Nav Component
 */
const DesktopNavigation = ({ data, salutation, children, defaultStep }) => {
  const { step, setStep } = useStep();

  const { level2, setLevel2 } = useLevel2();


  const handleClose = () => {
    closeNav();

    if(VARIATION === '3') {
      if(window.location.href === 'https://www.ernestjones.co.uk/' || window.location.href.indexOf('https://www.ernestjones.co.uk/?') > -1) {
        makeHeaderTransparent(true)
      }
    }
    
    setStep('level0');
    setLevel2('');
  }

  const backClick = (e) => { 
    const target = e.currentTarget.dataset.target;
      if(target) {
        e.currentTarget.parentNode.classList.remove('Nav__level--active');
        setLevel2('');
        setStep(target);
      } else {
        setStep('level0');
        if(document.querySelector('.Nav__level--active')) {
          document.querySelector('.Nav__level--active').classList.remove('Nav__level--active');
        }
      }
  }

/**
 * Add hover delay
 */
let hoverTimeout = null; 
let didLeaveAcross = false;

const onMouseLeave = (e) => {


  if((e.relatedTarget || e.toElement) && (e.relatedTarget || e.toElement).closest('.SG201-overlay')) {
    handleClose();
  }
}

  // useEffect(() => {
  //   data.forEach(item => {
  //     if(location.pathname.indexOf(item.regex) > -1) {
  //       setStep(slugify(item.name));
  //     }
  //   });
  // }, [false]);
  

  const stepClick = (e) => {

    if(e.type == 'mouseenter' && e.currentTarget.classList.contains('Nav__level--active')) {
      return; 
    }

    const target = e.currentTarget.dataset.target;
    
     if(target) {
      e.preventDefault();
      setLevel2('');
      if(step == target) {
        setStep('level0');
      } else {
        setStep(target);
      }
     } else {
      setStep('level0');
     }
  };


  const parseData = (data) => {
    const topLevel = [];

   // create all levels within top level
    data.forEach(d => {
      topLevel.push(
        <li className={(d.noneCat === true ? 'smallLink' : '')} style={d.hidden === false ? 'display:none' : ''}>
          <a className={'Nav__level Nav__level-1 Nav__title ' + (step == slugify(d.name) ? 'Nav__level--active' : ''
                )} href={d.link || ''} data-target={d.hasSubmenu ? slugify(d.name) : ''} onMouseEnter={stepClick} onMouseLeave={onMouseLeave}>
            <h4 className="headerFour alternate" style={d.colour ? "color:" + d.colour : ''}>{d.name}</h4>
          </a>
        {
        d.children ?
                <div className={'Nav__level Nav__level-2 ' + (step == slugify(d.name) ? 'Nav__level--active' : ''
                )} onMouseLeave={onMouseLeave}>
                    <div className="Nav__listing-wrap">
                    <div className="Nav__listing">
                      {d.children.map((level2kid) => (  
                          <ul class="Nav__level-2-inner">
                              {level2kid.content ? level2kid.content : ''}
                           </ul>
                      ))}
                    </div>
                    </div>
                </div>

                : ''}
        </li>
      );
      
    });

    return ( 
      <div className={"wrapper"}>
        <div className={'Nav__level Nav__level-1 Nav__level--active'}>
          <div className="Nav__listing-wrap">
            <ul className="Nav__listing">
            {topLevel}
            </ul>
          </div>
        </div>
      </div>

    );
  };

  const navClose = document.querySelector(`.Nav__close`);
  const overlay = document.querySelector(`.${ID}-overlay`);
  if(navClose) {
   navClose.addEventListener('click', () => {
    handleClose();
   });
  }
  if(overlay) {
    overlay.addEventListener('click', () => {
     handleClose();
    });
   }

  return (
     <div className="Nav__container">
        <div className="Nav" data-step={step}>
          {parseData(data)}
        </div>
     </div>
  
  );
};

export default DesktopNavigation;
