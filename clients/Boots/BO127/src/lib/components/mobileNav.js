import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import shared from '../shared';

const { ID } = shared;
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
 * Mobile Sliding Nav Component
 */
const MobileSlidingNav = ({ data, salutation, children, defaultStep }) => {
  const { step, setStep } = useStep();

  const { level2, setLevel2 } = useLevel2();


  const handleClose = () => {
    document.querySelector(`.${ID}-navigation`).classList.remove(`${ID}-open`);
    document.documentElement.classList.remove(`${ID}-noScroll`);
    setStep('level0');
    setLevel2('');
  }



  
 

  useEffect(() => {
    data.forEach(item => {
      if(location.pathname.indexOf(item.regex) > -1) {
        setStep(slugify(item.name));
      }
    });
  }, [false]);
  

  const stepClick = (e) => {
    const target = e.currentTarget.dataset.target;
    if(target) {
      e.preventDefault();
      setLevel2('');

      if(step == target) {
        setStep('level0');
      } else {
        setStep(target);
      }
    }
  };

  const lvl2Click = (e) => {
    const target = e.currentTarget.dataset.target;
    if(target) {
      e.preventDefault();

      if(level2 == target) {
        setLevel2('');
      } else {
        setLevel2(target);
      }
    }
  }

  const parseData = (data) => {
    const topLevel = [];

   // create all levels within top level
    data.forEach(d => {
      topLevel.push(
        <li className={d.allBrands === true ? 'allBrands' : ''} style={d.hidden === false ? 'display:none' : ''}>
          <a className={'MobileSlidingNav__level MobileSlidingNav__level-1 MobileSlidingNav__title ' + (step == slugify(d.name) ? 'MobileSlidingNav__level--active' : ''
                )} href={d.link || ''} data-target={d.hasSubmenu ? slugify(d.name) : ''} onClick={stepClick} style={d.colour ? 'color:'+ d.colour : ''}>
            <span>{d.name}</span>
          </a>

        {
        d.children ?
                <div className={'MobileSlidingNav__level MobileSlidingNav__level-2 ' + (step == slugify(d.name) ? 'MobileSlidingNav__level--active' : ''
                )}>
                    <div className="MobileSlidingNav__listing-wrap">
                    <ul className="MobileSlidingNav__listing">
                    {d.children.map((level2kid) => (  
                    <li>
                       <a className = {(level2kid.children ? `Lvl2Title ` : '') + (level2 == slugify(level2kid.name) ? 'MobileSlidingNav__level--active' : '')}  href={level2kid.link || ''} onClick={level2kid.children ? lvl2Click : ''} data-target={d.hasSubmenu ? slugify(level2kid.name) : ''} >
                            <span>{level2kid.name}</span>
                        </a>

                        {level2kid.children ?  
                        <ul className={'MobileSlidingNav__level MobileSlidingNav__level-3 ' + (level2 == slugify(level2kid.name) ? 'MobileSlidingNav__level--active' : '')}>             
                            {
                            (level2kid.children || []).map((level3kid) => (
                            <div class="thirdLink">
                                <a href={level3kid.link}>{level3kid.name}</a>
                            </div>
                            ))
                        }
                        </ul> : ''}       
                      
                    </li>
                  ))}
                    </ul>
                    </div>
                </div>

                : ''}
        </li>
      );
      
    });

    return ( 
      <div>
        
        <div className={'MobileSlidingNav__level MobileSlidingNav__level-1 MobileSlidingNav__level--active'}>
          <div className="MobileSlidingNav__header">
            
            <span className="MobileSlidingNav__close" onClick={handleClose}>&times;</span>
            <div class="MobileLogo"></div>
            <a class="MobileBasket" href="https://www.boots.com/OrderItemDisplay"></a>
          </div>
          <div className="MobileSlidingNav__listing-wrap">
            <ul className="MobileSlidingNav__listing">
            {topLevel}
            </ul>
          </div>
        </div>

        
      </div>

    );
  };

  return (
    <div className="MobileSlidingNav" data-step={step}>
      {parseData(data)}

    </div>
  );
};

export default MobileSlidingNav;
