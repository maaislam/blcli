/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';

const Dropdown = (props) => {
  const {
    name, url, level2, multilevel2,
  } = props;
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    isOpenMenu && menuRef.current.focus();
  }, [isOpenMenu]);

  const hover = {
    color: '#7f28c4',
    borderBottomColor: '#7f28c4',
    paddingBottom: '14px',
  };

  return (
    <div
      className="menu-container noSelect"
      onMouseEnter={() => setIsOpenMenu(!isOpenMenu)}
      ref={menuRef}
      onMouseLeave={() => setIsOpenMenu(false)}
      tabIndex={0}
    >
      {url && (
        <div className="menuButton" style={!isOpenMenu ? '' : { ...hover }}>
          <a href={url}>
            {name}
          </a>
        </div>
      )}
      {!url && (
        <span className="menuButton" style={!isOpenMenu ? '' : { ...hover }}>
          {name}
        </span>
      )}
      {level2 && (
        <ul
          className="menuSingle"
          style={{ visibility: !isOpenMenu ? 'hidden' : 'visible' }}
        >
          {level2.map(item => (
            <li className="item sub-items">
              <a href={item.link}>
                <li className="item sub-items">{}</li>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
      {multilevel2 && (
        <div
          className="menu"
          style={{ visibility: !isOpenMenu ? 'hidden' : 'visible' }}
        >
          <div className="flex">
            {multilevel2.map(item => (
              <div className="menu-columns">
                <span>{item.name}</span>
                <ul>
                  {item.level2.map(subLevel => (
                    <li className="item sub-items">
                      <a href={subLevel.link}>
                        <li className="item sub-items">{}</li>
                        {subLevel.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="best-sellers">
            <a href="https://www.avon.de/5672/bestseller">
              Alle ansehen
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export const DropDownMenu = (props) => {
  const { data } = props;
  return (
    <div className="main-menu noSelect">
      {data.map(item => (
        <Dropdown {...item} />
      ))}
    </div>
  );
};
