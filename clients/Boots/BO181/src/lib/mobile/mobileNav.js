import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import shared from '../../../../../../core-files/shared';
import { mobilePharmacyData, mobileServicesData } from './mobileData';


const { ID, VARIATION } = shared;
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

    const searchBox = document.querySelector('#search_container');
    document.querySelector('#estore_header_bottom_row').insertAdjacentElement('beforeend', searchBox);
  }

  const backClick = (e) => { 
    const target = e.currentTarget.dataset.target;
      if(target) {
        e.currentTarget.parentNode.classList.remove('MobileSlidingNav__level--active');
        setLevel2('');
        setStep(target);
      } else {
        setStep('level0');
        if(document.querySelector('.MobileSlidingNav__level--active')) {
          document.querySelector('.MobileSlidingNav__level--active').classList.remove('MobileSlidingNav__level--active');
        }
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

  const parseData = (data, name) => {
    const topLevel = [];

   // create all levels within top level
    data.forEach(d => {
      topLevel.push(
        <li className={(d.noneCat === true ? 'topLvlLink' : '') + (d.currency ? ' currency' : '')} style={d.hidden === false ? 'display:none' : ''}>
          <a className={'MobileSlidingNav__level MobileSlidingNav__level-1 MobileSlidingNav__title ' + (step == slugify(d.name) ? 'MobileSlidingNav__level--active' : ''
                )} href={d.link || ''} data-target={d.hasSubmenu ? slugify(d.name) : ''} onClick={stepClick} style={d.colour ? 'color:'+ d.colour : ''}>
            <span>
              {d.icon ? <span style={`background-image: url(`+d.icon+`)`} class="icon"></span> : ''}
              {d.name}</span>
          </a>

        {
        d.children ?
                <div className={'MobileSlidingNav__level MobileSlidingNav__level-2 ' + (step == slugify(d.name) ? 'MobileSlidingNav__level--active' : ''
                )}>
                    <div className="MobileSlidingNav__listing-wrap">
                    <ul className="MobileSlidingNav__listing">
                      <div class="MobileTitle" onClick={backClick}>
                              <div class="back"></div>
                              <h3>Main Menu</h3>
                      </div>
                    {d.children.map((level2kid) => (  
                      <li className = {(level2kid.allLink === true ? `allLink` : '')}>
                        <a className = {(level2kid.children ? `Lvl2Title ` : '') + (level2 == slugify(level2kid.name) ? 'MobileSlidingNav__level--active' : '')}  href={level2kid.link || ''} onClick={level2kid.children ? lvl2Click : ''} data-target={d.hasSubmenu ? slugify(level2kid.name) : ''} style={d.colour ? 'color:'+ d.colour : ''}>
                              <span style={level2kid.colour ? 'color:'+ level2kid.colour : ''}>{level2kid.name}</span>
                          </a>

                          {level2kid.children ?  
                          <ul className={'MobileSlidingNav__level MobileSlidingNav__level-3 ' + (level2 == slugify(level2kid.name) ? 'MobileSlidingNav__level--active' : '')}>             
                              <div class="MobileTitle" data-target={d.hasSubmenu ? slugify(d.name) : ''} onClick={backClick}>
                              <div class="back"></div>
                                <h3>{level2kid.name}</h3>
                              </div>
                              {
                              (level2kid.children || []).map((level3kid) => (
                                <li className = {(level3kid.allLink === true ? `allLink` : '') + (level3kid.hasSubmenu == true ? 'subCatBlock' : '')}>
                                  <a className ={(level3kid.heading == true ? 'categoryHeading' : '')} href={level3kid.link || ''} style={level3kid.colour ? 'color:'+ level3kid.colour : ''}>
                                      <span>{level3kid.name}</span>
                                  </a>
                                  {level3kid.children ?  
                                     <ul className="subList">
                                      {(level3kid.children || []).map((subLinks) => (
                                       <li>
                                          <a href={subLinks.link || ''}>
                                            <span>{subLinks.name}</span>
                                          </a>
                                       </li>
                                       
                                     ))}
                                    </ul>: '' }
                                </li>
                              ))}
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
      <div className={"wrapper " + name }>
        <div className={'MobileSlidingNav__level MobileSlidingNav__level-1 MobileSlidingNav__level--active'}>
          {/* <div className="MobileSlidingNav__header">
            
            <span className="MobileSlidingNav__close" onClick={handleClose}>&times;</span>
            <div class="MobileLogo"></div>
            <a class="MobileBasket" href="https://www.boots.com/OrderItemDisplay"></a>
          </div> */}
          <div className="MobileSlidingNav__listing-wrap">
            <ul className="MobileSlidingNav__listing">
            {topLevel}
            </ul>
          </div>
        </div>

        
      </div>

    );
  };


  // toggle between data, add tabs here for mobile with click function to remove steps
  // have onclick function for group, reset state
  return (
     <div>
        <div className="MobileSlidingNav__overlay" onClick={handleClose}></div>
        {VARIATION === '3' || VARIATION === '4' ? 
        <div className="topRow">
          <div className ="CatTabs">
            <div className="CatTab" target="shop">Shop</div>
            {VARIATION === '3' ? <div className="CatTab" target="pharmacy">Pharmacy</div> : <div className="CatTab" target="services">Services</div>}
            
          </div>
          <div className="MobileSlidingNav__close" onClick={handleClose}>&times;</div>
          </div> : 
          <div className="MobileSlidingNav__close" onClick={handleClose}>&times;</div>}

         {VARIATION !== '3' ?<div className="MobileSlidingNav__close" onClick={handleClose}>&times;</div> : ''}

        <div className="MobileSlidingNav" data-step={step}>
          {parseData(data, 'shop')}

          {VARIATION === '3' ? parseData(mobilePharmacyData(), 'pharmacy') : ''}
          {VARIATION === '4' ? parseData(mobileServicesData(), 'services') : ''}
        </div>
     </div>
  
  );
};

export default MobileSlidingNav;


