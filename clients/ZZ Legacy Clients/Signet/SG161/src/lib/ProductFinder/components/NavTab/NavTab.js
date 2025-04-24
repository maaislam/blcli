import { h } from 'preact';

const NavTab = ({ title, active, onClick, id }) => {
  return (
    <li className={`${id}-nav-tab ${active ? 'active' : ''}`}>
      <span className={`${id}-nav-tab-arrow`} />
      <button onClick={onClick} type="button">
        <h3>{title}</h3>
      </button>
    </li>
  );
};

export default NavTab;
