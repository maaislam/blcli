import { h } from 'preact';
import { Children } from 'preact/compat';
import { useState, useLayoutEffect, useEffect, useRef, useCallback } from 'preact/hooks';

const Carousel = ({
  children,
  gutter = 10,
  startPosition = 1,
  overflow = 'auto',
  scrollBehavior = 'smooth',
  rendered,
  id,
}) => {
  const carouselRef = useRef(null);

  const [itemWidth, setItemWidth] = useState(null);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [scrollAlign, setScrollAlign] = useState('start');

  const scrollRight = (amount = itemWidth) => {
    carouselRef.current.scrollBy({
      top: 0,
      left: amount,
      behavior: scrollBehavior,
    });
  };

  const scrollLeft = (amount = -itemWidth) => {
    carouselRef.current.scrollBy({
      top: 0,
      left: amount,
      behavior: scrollBehavior,
    });
  };

  const calculateItemWidth = useCallback(() => {
    setItemWidth(
      Math.floor(
        Math.floor(carouselRef.current.offsetWidth - 1) / itemsPerSlide -
          Math.floor((gutter * (itemsPerSlide - 1)) / itemsPerSlide)
      )
    );
  }, [gutter, itemsPerSlide]);

  const scrollToPosition = useCallback(() => {
    carouselRef.current.scrollLeft = startPosition > 1 ? startPosition * itemWidth - gutter : 0;
  }, [startPosition, itemWidth, gutter]);

  const calculateItemsPerSlide = useCallback(() => {
    setItemsPerSlide(() => {
      if (carouselRef.current.offsetWidth < 400) return 1.2;
      if (carouselRef.current.offsetWidth < 700) return 2;
      if (carouselRef.current.offsetWidth < 1000) return 3;
      return 4;
    });

    setScrollAlign(() => {
      if (carouselRef.current.offsetWidth < 400) return 'center';
      return 'start';
    });
  }, [setItemsPerSlide, setScrollAlign]);

  useLayoutEffect(() => {
    calculateItemWidth();
  }, [calculateItemWidth, gutter, itemsPerSlide]);

  useEffect(() => {
    if (rendered) window.addEventListener('resize', calculateItemWidth);

    return () => {
      window.removeEventListener('resize', calculateItemWidth);
    };
  }, [calculateItemWidth]);

  useEffect(() => {
    scrollToPosition();
  }, [scrollToPosition]);

  useLayoutEffect(() => {
    calculateItemsPerSlide();
  }, [calculateItemsPerSlide]);

  useEffect(() => {
    if (rendered) window.addEventListener('resize', calculateItemsPerSlide);

    return () => {
      window.removeEventListener('resize', calculateItemsPerSlide);
    };
  }, [rendered, setItemsPerSlide]);

  return (
    <div className={`${id}-carousel`}>
      {children.length > itemsPerSlide && (
        <button onClick={() => scrollLeft()} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
          >
            <path fill="#000" d="M19.41 24.59L18 26 8 16 18 6l1.41 1.41L11 16l8.41 8.59z" />
          </svg>
        </button>
      )}
      <ul
        className={`${id}-carousel-list`}
        style={{ gap: `${gutter}px`, overflow }}
        ref={carouselRef}
      >
        {Children.map(children, (child, idx) => {
          return (
            <li
              className={`${id}-carousel-list-item`}
              style={{ width: itemWidth, scrollSnapAlign: scrollAlign }}
              key={`carousel-${idx}`}
            >
              {child}
            </li>
          );
        })}
      </ul>
      {children.length > itemsPerSlide && (
        <button onClick={() => scrollRight()} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
          >
            <path fill="#000" d="M12 7.41L13.41 6l10 10-10 10L12 24.59 20.41 16 12 7.41z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Carousel;
