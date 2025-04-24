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
const DesktopSlidingNav = ({ data, salutation, children, closeHandler, extraMenuContent, extraNavContent, defaultGroup, loggedIn }) => {

  const { step, setStep } = useStep();
  const [activeGroup, setActiveGroup] = useState(defaultGroup);

  const stepClick = (e) => {
    const target = e.currentTarget.dataset.target;
    if(target) {
      e.preventDefault();
      setStep(target);
    } else {
      setStep('level0');
    }
  };

  const handleClose = () => {
    setStep('level0');

    if(typeof closeHandler == 'function') {
      closeHandler();
    }
  }

  if(loggedIn) {
    data['My Account'] = {
      name: 'My Account',
      link: '/customer/account',
      items: [],
    };
  }

  const parseData = (data) => {
    const groups = [];
    const topLevel = [];
    const linkedCats = [];

    Object.keys(data).forEach(group => {
      if(data[group].desktop === false) {
        return;
      }
      if(data[group].link) {
        groups.push(
          <a className={'DesktopSlidingNav__groups-item ' + (
            data[group].name == activeGroup ? 'DesktopSlidingNav__groups-item--active' : ''
          )}
            href={data[group].link}
            onMouseEnter={() => { setActiveGroup(data[group].name); setStep('level0'); }}
          >
            {(data[group].icon ? (<img src={data[group].icon} width="16" height="16" />) : '')}
            {data[group].name}
          </a>
        );
      } else {
        groups.push(
          <a className={'DesktopSlidingNav__groups-item ' + (
            data[group].name == activeGroup ? 'DesktopSlidingNav__groups-item--active' : ''
          )}
            onMouseEnter={() => { setActiveGroup(data[group].name); setStep('level0'); }}
          >
            {data[group].name}
          </a>
        );
      }
    });
    
    data[activeGroup].items.forEach(d => {
      topLevel.push(
        <li>
          <a href={d.link || ''} data-target={d.hasSubmenu ? slugify(d.name) : ''}
            className={step == slugify(d.name) ? 'xactive' : ''}
              onMouseEnter={stepClick}>
            <span>{d.name}</span>
          </a>
        </li>
      );
      
      if(d.hasSubmenu && d.children) {
        linkedCats.push((
          <div className={'DesktopSlidingNav__level DesktopSlidingNav__level-2 ' + (
            step == slugify(d.name) ? 'DesktopSlidingNav__level--active' : ''
          )} data-id={slugify(d.name)}>
            <div className="DesktopSlidingNav__header">
              <a className="DesktopSlidingNav__back"
                data-target="level0"
                onClick={stepClick}
                ><span></span> <strong>Back</strong></a>

              <span title="Close" className="DesktopSlidingNav__close" onClick={handleClose}>&times;</span>
            </div>

            <div className="DesktopSlidingNav__listing-wrap">
              <ul className="DesktopSlidingNav__listing">
              {d.children.map((kid) => (
                <li>
                  <a href={kid.link || ''} onClick={() => setStep(slugify(d.name))}>
                    {kid.image ? (
                      <img class="DesktopSlidingNav__listing-icon1" src={kid.image}/>
                    ) : ''}
                    <span>{kid.name}</span>
                  </a>
                </li>
              ))}
              </ul>
            </div>

            {
              d.banner ? (
                <div class="DesktopSlidingNav__banner">
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
      <div className={(step == 'level0' ? 'level1' : 'level2')}
        onMouseLeave={(e) => {
            if(e.target == e.currentTarget) {
              handleClose();
            }
          }} 
      >
        <div className={'DesktopSlidingNav__level DesktopSlidingNav__level-1'} >
          <div className={'DesktopSlidingNav__level-1-inner'}>
            <div className="DesktopSlidingNav__header">
              <span className="DesktopSlidingNav__salutation">{salutation || ''}</span>

              <span title="Close" className="DesktopSlidingNav__close" onClick={handleClose}>&times;</span>
            </div>

            { groups.length > 1 ? (
              <div className="DesktopSlidingNav__groups">
                <div className="DesktopSlidingNav__groups-inner">
                {groups}
                </div>
              </div>
              ) : ''
            }

            <div className="DesktopSlidingNav__listing-wrap">
              <ul className="DesktopSlidingNav__listing">
              {topLevel}
              </ul>
            </div>

            {
              children ? (
                <div className="DesktopSlidingNav__extra-content">
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
        </div>

        {linkedCats}
      </div>

    );
  };

  return (
    <div className="DesktopSlidingNav" data-step={step} onClick={(e) => {
          if(e.target == e.currentTarget) {
            handleClose();
          }
        }}
      >

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

export default DesktopSlidingNav;
