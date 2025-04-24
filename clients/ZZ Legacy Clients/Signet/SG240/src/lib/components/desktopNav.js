import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

/**
 * Helper slugify menu name
 */
const slugify = (name) => {
  return name.replace(/[\s]/ig, '').toLowerCase();
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
 * Desktop Sliding Nav Component
 */
const DesktopNav = ({ data, salutation, children, handleClose, defaultStep }) => {
  const { step, setStep } = useStep();

  const { level2, setLevel2 } = useLevel2();

  /*useEffect(() => {
    data.forEach(item => {
      if(location.pathname.indexOf(item.regex) > -1) {
        setStep(slugify(item.name));
      }
    });
  }, [false]);*/

  const hideNav = () => {
    setStep('level0');
  }
  

  // close nav if something else clicked
  document.addEventListener('click', (event) => {
    var container = document.querySelector(`.SG240-navigation`)
    if (!container.contains(event.target)) {
      setStep('level0');
    }
  });


  /**
   * Add hover delay
   */
  let hoverTimeout = null; 
  let didLeaveAcross = false;

  const onMouseLeave = (e) => {


    
    if((e.relatedTarget || e.toElement).closest('.DesktopNav__level')) {
      didLeaveAcross = true;
    } else {
       didLeaveAcross = false;
       setStep('level0');
    }


    clearTimeout(hoverTimeout);
  }


  const stepClick = (e) => {


    if(e.type == 'mouseenter' && e.currentTarget.classList.contains('DesktopNav__level--active')) {
      return; 
    }


    /**
     * Open on hover if not moved past the element
     */

    let timeoutDuration = didLeaveAcross ? 0 : 300;


    const target = e.currentTarget.dataset.target;
    clearTimeout(hoverTimeout);

    
    hoverTimeout = setTimeout(() => {
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
    }, timeoutDuration);
  };

  const parseData = (data) => {
    const topLevel = [];
    //const linkedCats = [];

   // create all levels within top level
    data.forEach(d => {
      topLevel.push(
        <li className={d.allBrands === true ? 'allBrands lvl1title' : 'lvl1title'} style={d.desktop == false ? 'display:none' : ''}>
         <a className={'DesktopNav__level DesktopNav__level-1 DesktopNav__title ' + (step == slugify(d.name) ? 'DesktopNav__level--active' : ''
                )} href={d.link || ''} data-target={d.hasSubmenu ? slugify(d.name) : ''} onMouseEnter={stepClick} onMouseLeave={onMouseLeave}>
            <h4 className="headerFour alternate" style={d.colour ? "color:" + d.colour : ''}>{d.name}</h4>
          </a>

          {
        d.children ?
                <div className={'DesktopSlidingNav__level DesktopSlidingNav__level-2 ' + (step == slugify(d.name) ? 'DesktopSlidingNav__level--active' : ''
                )}>
                  <div className="DesktopSlidingNav__listing-wrap DropdownContainer">
                      
                    <ul className="DesktopSlidingNav__listing">

                      {d.children.map((level2kid) => (  
                          <ul className="DesktopSlidingNav__level DesktopSlidingNav__level-2-inner">
                              {level2kid.content ? level2kid.content : ''}
                           </ul>
                      ))}
                      
                    </ul>
                    </div>
                    <div className="DesktopOverlay" onMouseEnter={hideNav}></div>
                </div>

                : ''}

        </li>
      );
      
      
      
    });

    return ( 
      <div>
        
        <div className={'DesktopNav__level DesktopNav__level-1 DesktopNav__level--active'}>
          <div className="DesktopNav__listing-wrap">
            <ul className="DesktopNav__listing DesktopNav__level-1Wrap">
            {topLevel}
            </ul>
   
          </div>
        </div>        
      </div>

    );
  };

  return (
    <div className="DesktopNav" data-step={step}>

      {parseData(data)}

    </div>
  );
};

export default DesktopNav;
