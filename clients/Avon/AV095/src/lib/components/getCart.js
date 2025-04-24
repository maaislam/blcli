const fetchCart = async () => {
  const response = await fetch('/cart.json');
  return await response.json();
};

export default fetchCart;
