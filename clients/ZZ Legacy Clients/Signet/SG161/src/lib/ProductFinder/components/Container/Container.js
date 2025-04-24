import { h } from 'preact';

const Container = ({ children, dark, id, smallPadding, smallBottomPadding, shadow }) => {
  return (
    <div
      className={`${id}-container ${dark ? 'dark' : ''} ${smallPadding ? 'small-padding' : ''} ${
        smallBottomPadding ? 'small-bottom-padding' : ''
      } ${shadow ? 'shadow' : ''}`}
    >
      <div className={`${id}-container-inner`}>{children}</div>
    </div>
  );
};

export default Container;
