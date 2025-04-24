import { h } from 'preact';
import { useState } from 'preact/hooks';

/**
 * Helper slugify menu name
 */
const slugify = (name) => {
  return name.replace(/[\s]/ig, '').toLowerCase();
};

/**
 * Helper for step state
 */
const useStep = () => {
  const [step, setStep] = useState('level0');

  return { step, setStep };
};

/**
 * Mobile Sliding Nav Component
 */
const MobileSlidingNav = ({ data, salutation, children, handleClose, extraMenuContent, extraNavContent }) => {
  const { step, setStep } = useStep();

  const stepClick = (e) => {

    const target = e.currentTarget.dataset.target;
    if(target) {
      e.preventDefault();
      setStep(target);
    }
  };

  const parseData = (data) => {
    const topLevel = [];
    const linkedCats = [];

    data.forEach(d => {
      topLevel.push(
        <li>
          <a href={d.link || ''} data-target={d.hasSubmenu ? slugify(d.name) : ''}
              onClick={stepClick}>
            <span>{d.name}</span>
          </a>
        </li>
      );
      
      if(d.hasSubmenu && d.children) {
        linkedCats.push((
          <div className={'MobileSlidingNav__level MobileSlidingNav__level-2 ' + (
            step == slugify(d.name) ? 'MobileSlidingNav__level--active' : ''
          )} data-id={slugify(d.name)}>
            <div className="MobileSlidingNav__header">
              <a className="MobileSlidingNav__back"
                data-target="level0"
                onClick={stepClick}
                ><span></span> Back</a>

              <span className="MobileSlidingNav__close" onClick={handleClose}>&times;</span>
            </div>

            <div className="MobileSlidingNav__listing-wrap">
              <ul className="MobileSlidingNav__listing">
              {d.children.map((kid) => (
                <li>
                  <a href={kid.link || ''} onClick={() => setStep(slugify(d.name))}>
                    {kid.image ? (
                      <img class="MobileSlidingNav__listing-icon1" src={kid.image}/>
                    ) : ''}
                    <span>{kid.name}</span>
                  </a>
                </li>
              ))}
              </ul>
            </div>

            {
              children ? (
                <div className="MobileSlidingNav__extra-content">
                  {children}
                </div>
              ) : ''
            }
          </div>
        ));
      }
    });

    return ( 
      <div>
        <div className={'MobileSlidingNav__level MobileSlidingNav__level-1 MobileSlidingNav__level--active'}>
          <div className="MobileSlidingNav__header">
            <span className="MobileSlidingNav__salutation">{salutation || ''}</span>

            <span className="MobileSlidingNav__close" onClick={handleClose}>&times;</span>
          </div>

          {
            children ? (
              <div className="MobileSlidingNav__extra-content">
                {children}
              </div>
            ) : ''
          }

          <div className="MobileSlidingNav__listing-wrap">
            <ul className="MobileSlidingNav__listing">
            {topLevel}
            </ul>
          </div>

          {
            extraMenuContent ? (
              <div>
              {extraMenuContent}
              </div>
            ) : ''
          }
        </div>

        {linkedCats}
      </div>

    );
  };

  return (
    <div className="MobileSlidingNav" data-step={step}>

      {parseData(data)}

      {
        extraNavContent ? (
          <div>
          {extraNavContent}
          </div>
        ) : ''
      }

    </div>
  );
};

export default MobileSlidingNav;
