const extractHighlights = () => {
  const blogCarouselItems = document.querySelectorAll('#blogCarousel .item');

  return [...blogCarouselItems].map((item) => {
    const imageUrl = item.querySelector('img').getAttribute('data-src');
    const title = item.querySelector('p:first-of-type').innerText;
    const subTitle = item.querySelector('p:last-child').innerText;
    return {
      imageUrl: imageUrl,
      title: title,
      subTitle: subTitle,
    };
  });
};

export default extractHighlights;
