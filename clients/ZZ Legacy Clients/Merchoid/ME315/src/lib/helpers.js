export default function scrollToElement(element) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: (element.getBoundingClientRect().top + window.scrollY),
    });
  }