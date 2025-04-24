import { h } from 'preact';

export const Button = ({ children, onClick, className, ...props }) => (
  <button onClick={onClick} className={className} {...props}>
    {children}
  </button>
);
