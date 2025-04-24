import { h } from 'preact';
import { useState, useEffect, useLayoutEffect, useRef } from 'preact/hooks';
import products from '../productData';
import Door from './Door';

const AdventCalendar = ({ id }) => {
  const [day, setDay] = useState(1);
  const [allRevealed, setAllRevealed] = useState(false);

  useEffect(() => {
    const date = Math.floor(Date.now());
    const today = new Date(date).getDate();
    setDay(today);
  }, []);

  const doorRef = useRef(null);
  const carouselRef = useRef(null);
  const CAROUSEL_GUTTER = 25;

  const [doorWidth, setDoorWidth] = useState(0);
  const [scrollLimit, setScrollLimit] = useState(0);
  const [scrolled, setScrolled] = useState(0);

  useLayoutEffect(() => {
    const findDoorWidth = () => {
      setDoorWidth(() => {
        if (carouselRef.current.clientWidth < 500) {
          return carouselRef.current.clientWidth / 1.5 - CAROUSEL_GUTTER / 1.5;
        }
        if (carouselRef.current.clientWidth < 700) {
          return carouselRef.current.clientWidth / 2 - CAROUSEL_GUTTER / 2;
        }
        if (carouselRef.current.clientWidth < 900) {
          return carouselRef.current.clientWidth / 3 - CAROUSEL_GUTTER / 1.5;
        }
        return carouselRef.current.clientWidth / 4 - CAROUSEL_GUTTER / 1.25;
      });
    };
    setScrollLimit(carouselRef.current.scrollWidth - (carouselRef.current.clientWidth + doorWidth));
    findDoorWidth();

    const setScrollingLimit = () => {
      findDoorWidth();
      setScrollLimit(carouselRef.current.scrollWidth - carouselRef.current.clientWidth);
    };

    window.addEventListener('resize', () => setScrollingLimit());

    return () => window.removeEventListener('resize', () => setScrollingLimit());
  }, [doorWidth]);

  useEffect(() => {
    setScrolled((doorWidth + CAROUSEL_GUTTER) * (day - (day === products.length ? 2 : 1)));
  }, [day]);

  const handleScrollRight = () => {
    if (scrolled < scrollLimit) {
      setScrolled(scrolled + (doorWidth + CAROUSEL_GUTTER));
    }
  };

  const handleScrollLeft = () => {
    if (scrolled > 0) {
      setScrolled(scrolled - (doorWidth + CAROUSEL_GUTTER));
    }
  };

  useEffect(() => {
    carouselRef.current.scroll({ top: 0, left: scrolled, behavior: 'smooth' });
  }, [scrolled, day]);

  return (
    <div className={`${id}-advent`}>
      <div className={`${id}-advent-header`}>
        <h2>A treat from No7 to you!</h2>
        <p>
          Help yourself to a special offer on everyday of Christmas from your No7 Advent calendar
        </p>
        {day > 3 && (
          <button onClick={() => setAllRevealed(true)} type="button">
            Reveal all available offers
          </button>
        )}
      </div>
      <div className={`${id}-advent-carousel`}>
        <button
          className={`${id}-advent-carousel-button ${id}-back`}
          onClick={() => handleScrollLeft()}
          type="button"
        >
          <span>Backward</span>
        </button>
        <ul ref={carouselRef}>
          {products.map((product, idx) => (
            <Door
              id={id}
              available={day === idx + 1 || day > idx + 1}
              day={idx + 1}
              name={product.name}
              image={product.image}
              width={doorWidth}
              url={product.url}
              allRevealed={allRevealed}
              hasColours={product.hasColours}
              basketId={product.entSKU}
              key={product.url}
              ref={doorRef}
            />
          ))}
        </ul>
        <button
          className={`${id}-advent-carousel-button ${id}-forward`}
          onClick={() => handleScrollRight()}
          type="button"
        >
          <span>Forward</span>
        </button>
      </div>
    </div>
  );
};

export default AdventCalendar;
