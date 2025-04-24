const getGender = () => {
  try {
    const { productGender } = window.dataLayer[1];
    if (productGender) {
      return productGender.toLowerCase();
    }
  } catch (error) {
    console.error(error);
  }
};

export default getGender;
