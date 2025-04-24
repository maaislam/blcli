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
const MobileSlidingNav = ({ data, salutation, children, handleClose, extraMenuContent, extraNavContent, defaultGroup }) => {
  const { step, setStep } = useStep();
  const [activeGroup, setActiveGroup] = useState(defaultGroup);

  const stepClick = (e) => {
    const target = e.currentTarget.dataset.target;
    if(target) {
      e.preventDefault();
      setStep(target);
    }
  };

  const parseData = (data) => {
    const groups = [];
    const topLevel = [];
    const linkedCats = [];

    Object.keys(data).forEach(group => {
      //if(data[group].link) {
      //  groups.push(
      //    <a className={'MobileSlidingNav__groups-item ' + (
      //      data[group].name == activeGroup ? 'MobileSlidingNav__groups-item--active' : ''
      //    )}
      //      href={data[group].link}
      //    >
      //      {(data[group].icon ? (<img src={data[group].icon} width="16" height="16" />) : '')}
      //      {data[group].name}
      //    </a>
      //  );
      //} else {
        groups.push(
          <a className={'MobileSlidingNav__groups-item ' + (
            data[group].name == activeGroup ? 'MobileSlidingNav__groups-item--active' : ''
          )}
            onClick={() => { setActiveGroup(data[group].name) }}
          >
            {data[group].name}
          </a>
        );
      //}
    });
    
    data[activeGroup].items.forEach(d => {
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
                ><span></span> <strong>Back</strong></a>

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
              d.banner ? (
                <div class="MobileSlidingNav__banner">
                  <a href={d.banner.link}>
                    <img src={d.banner.img} />
                    <button>{d.banner.text}</button>
                  </a>
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

          { groups.length > 1 ? (
            <div className="MobileSlidingNav__groups">
              <div className="MobileSlidingNav__groups-inner">
              {groups}
              </div>
            </div>
            ) : ''
          }

          <div className="MobileSlidingNav__listing-wrap">
            <ul className="MobileSlidingNav__listing">
            {topLevel}
            </ul>
          </div>

          {
            children ? (
              <div className="MobileSlidingNav__extra-content">
                {children}
              </div>
            ) : ''
          }

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
