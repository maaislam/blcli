const getPromoFromDOM = () => {
  const promotions = document.querySelectorAll('.promotions_container li');

  return [...promotions].map((promo) => {
    return {
      description: promo.innerText,
    };
  });

  // console.log(promotions);
};

export default getPromoFromDOM;
