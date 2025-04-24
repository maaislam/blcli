import { h } from 'preact';

const Button = ({
  children,
  onClick,
  darkOutline,
  plainBlackText,
  underlined,
  disabled,
  noHoverStyle,
  id,
}) => {
  return (
    <button
      className={`${id}-button ${darkOutline ? 'dark-outline' : ''} ${
        plainBlackText ? 'plain-black-text' : ''
      } ${underlined ? 'underlined' : ''} ${disabled ? 'disabled' : ''} ${
        noHoverStyle ? 'no-hover-style' : ''
      }`}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
