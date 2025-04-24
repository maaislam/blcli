import { h } from 'preact';
import { Children } from 'preact/compat';
import { useState, useLayoutEffect, useEffect, useRef, useCallback } from 'preact/hooks';

const Carousel = ({
  children,
  itemsPerSlide = 3,
  gutter = 10,
  startPosition = 1,
  overflow = 'auto',
  scrollAlign = 'start',
  scrollBehavior = 'smooth',
}) => {
  const carouselRef = useRef(null);

  const [carouselWidth, setCarouselWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(null);

  const scroll = (direction) => {
    carouselRef.current.scrollBy({
      top: 0,
      left: direction === 'right' ? itemWidth * itemsPerSlide : -itemWidth * itemsPerSlide,
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

  useLayoutEffect(() => {
    scrollToPosition();
  }, [scrollToPosition]);

  useEffect(() => {
    calculateItemWidth();
  }, [carouselWidth, calculateItemWidth, gutter, itemsPerSlide]);

  useEffect(() => {
    calculateItemWidth();
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => setCarouselWidth(carouselRef.current.offsetWidth));
    observer.observe(carouselRef.current, { box: 'border-box' });

    return () => observer.disconnect();
  });

  return (
    <div className="carousel">
      {itemsPerSlide === 3 && (
        <button className="prev" onClick={() => scroll('left')} type="button" />
      )}

      <ul className="carousel-list" style={{ gap: `${gutter}px`, overflow }} ref={carouselRef}>
        {Children.map(children, (child, idx) => {
          return (
            <li
              className="carousel-list-item"
              style={{ width: itemWidth, scrollSnapAlign: scrollAlign }}
              key={`carousel-${idx}`}
            >
              {child}
            </li>
          );
        })}
      </ul>
      {itemsPerSlide === 3 && (
        <button className="next" onClick={() => scroll('right')} type="button" />
      )}
    </div>
  );
};

export default Carousel;
