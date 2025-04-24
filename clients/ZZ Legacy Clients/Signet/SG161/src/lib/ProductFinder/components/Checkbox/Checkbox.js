import { h } from 'preact';

const Checkbox = ({ label, checked, disabled, onClick, id }) => {
  return (
    <label
      className={`${id}-checkbox ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
      htmlFor={label}
    >
      <input
        type="checkbox"
        name={label}
        id={label}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        value={label}
      />
      {label}
    </label>
  );
};

export default Checkbox;
