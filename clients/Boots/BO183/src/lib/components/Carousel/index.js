import { h } from "preact";
import shared from "../../../../../../../core-files/shared";

const { ID } = shared;

import { Children } from "preact/compat";
import {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  useCallback,
} from "preact/hooks";
import LoadingProductCard from "../LoadingProductCard";
import TextButton from "../TextButton";

const Carousel = ({
  section,
  children,
  itemsPerSlide = 3,
  gutter = 10,
  startPosition = 1,
  overflow = "auto",
  scrollAlign = "center",
  scrollBehavior = "smooth",
}) => {
  const carouselRef = useRef(null);

  const [perSlide, setPerSlide] = useState(itemsPerSlide);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(null);

  const scroll = useCallback(
    (direction) => {
      carouselRef.current.scrollBy({
        top: 0,
        left: direction === "right" ? itemWidth : -itemWidth,
        behavior: scrollBehavior,
      });
    },
    [itemWidth, scrollBehavior]
  );

  const calculateItemWidth = useCallback(() => {
    setItemWidth(
      Math.floor(
        Math.floor(carouselRef.current.offsetWidth - 1) / perSlide -
          Math.floor((gutter * (perSlide - 1)) / perSlide)
      )
    );
  }, [gutter, perSlide]);

  const scrollToPosition = useCallback(() => {
    carouselRef.current.scrollLeft =
      startPosition > 1 ? startPosition * itemWidth - gutter : 0;
  }, [startPosition, itemWidth, gutter]);

  useLayoutEffect(() => {
    calculateItemWidth();
  }, [carouselWidth, calculateItemWidth, gutter, perSlide]);

  useLayoutEffect(() => {
    scrollToPosition();
  }, [scrollToPosition]);

  useEffect(() => {
    const observer = new ResizeObserver(() =>
      setCarouselWidth(carouselRef.current.offsetWidth)
    );
    observer.observe(carouselRef.current, { box: "border-box" });

    return () => observer.disconnect();
  });

  useLayoutEffect(() => {
    const resizeWatcher = () => {
      if (!section) {
        if (carouselRef.current.offsetWidth <= 700) return setPerSlide(1);
        return setPerSlide(2);
      } else {
        if (carouselRef.current.offsetWidth <= 350) return setPerSlide(1.2);
        if (carouselRef.current.offsetWidth <= 600) return setPerSlide(1.5);
        setPerSlide(2.2);
      }
    };

    resizeWatcher();

    window.addEventListener("resize", resizeWatcher);

    return () => window.removeEventListener("resize", resizeWatcher);
  });

  useEffect(() => {
    scrollToPosition();
  }, [children]);

  return (
    <div className={`${ID}-carousel`}>
      <ul
        className={`${ID}-carousel-list`}
        style={{ gap: `${gutter}px`, overflow: overflow }}
        ref={carouselRef}
      >
        {Children.map(children, (child, idx) => {
          return (
            <li
              className={`${ID}-carousel-list-item`}
              style={{ width: itemWidth, scrollSnapAlign: scrollAlign }}
              key={`carousel-${idx}`}
            >
              {!child ? <LoadingProductCard /> : child}
            </li>
          );
        })}
      </ul>
      <div className={`${ID}-carousel-navigation`}>
        <button onClick={() => scroll("left")}>
          <span>Left</span>
        </button>
        <button onClick={() => scroll("right")}>
          <span>Right</span>
        </button>
      </div>
      {section && section.title && (
        <TextButton href={section.url} text={`Shop All ${section.title}`} />
      )}
    </div>
  );
};

export default Carousel;
