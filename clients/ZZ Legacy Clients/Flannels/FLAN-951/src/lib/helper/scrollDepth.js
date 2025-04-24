import { fireEvent } from "../../../../../../core-files/services";

export const scrollDepth = () => {
  const getScrollPercent = () => {
    const winHeight = $(window).height();
    const docHeight = $(document).height();
    const scrollTop = $(window).scrollTop(); //NaN or zero at top
    const trackLength = docHeight - winHeight;
    const pctScrolled = Math.floor((scrollTop / trackLength) * 100);
    return pctScrolled;
  };

  const scrollPositions = [20, 40, 60, 80, 100];
  let scroll20, scroll40, scroll60, scroll80, scroll100;
  const scrollEvent = (scroll) => {
    scrollPositions.forEach((pos) => {
      if (pos != scroll) eval(`scroll${pos} = false`);
      else eval(`scroll${pos} = true`);
    });
    // console.log(`Scroll Depth ${scroll}`);
    fireEvent(`Scroll Depth ${scroll}`);
  };
  window.addEventListener("scroll", function () {
    let currentScroll = getScrollPercent();
    if (currentScroll > 20 && currentScroll < 40 && !scroll20) {
      scrollEvent(20);
    } else if (currentScroll > 40 && currentScroll < 60 && !scroll40) {
      scrollEvent(40);
    } else if (currentScroll > 60 && currentScroll < 80 && !scroll60) {
      scrollEvent(60);
    } else if (currentScroll > 80 && currentScroll < 90 && !scroll80) {
      scrollEvent(80);
    } else if (currentScroll > 90 && !scroll100) {
      scrollEvent(100);
    }
  });
};
