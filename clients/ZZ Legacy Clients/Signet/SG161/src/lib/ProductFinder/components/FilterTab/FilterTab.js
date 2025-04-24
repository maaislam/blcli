import { h } from 'preact';
import { useState, useLayoutEffect, useEffect, useRef } from 'preact/hooks';

const FilterTab = ({ text, onClick, id }) => {
  const elementRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [width, setWidth] = useState(null);

  useLayoutEffect(() => {
    setWidth(elementRef.current.offsetWidth);
    elementRef.current.style.width = '0px';
  }, [setWidth]);

  useEffect(() => {
    setIsVisible(true);
    elementRef.current.style.width = `${width}px`;
    const clearWidthTimeout = setTimeout(() => {
      elementRef.current.style.width = null;
    }, 500);

    return () => {
      clearTimeout(clearWidthTimeout);
    };
  }, [setIsVisible, width]);

  return (
    <li className={`${id}-filter-tab is-visible-${isVisible}`} ref={elementRef}>
      <button onClick={() => onClick(text)} type="button">
        {text}
      </button>
    </li>
  );
};

export default FilterTab;
