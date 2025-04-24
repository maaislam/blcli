import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { serialize, sendHttpRequest } from '../../../../../lib/utils';

import Item from './components/Item';
import Carousel from './components/Carousel';
import SimpleItem from './components/SimpleItem';

const MiniBasket = ({ id, isModal, site }) => {
  const [basketOpen, setBasketOpen] = useState(false);
  const [addedProduct, setAddedProduct] = useState({});
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const basketRef = useRef(null);

  const getCurrentItem = () => {
    const productName = document.querySelector('.product-summary .product-name');
    const productPrice = document.querySelector('.product-summary .product-price--current');
    const productQuantity = document.querySelector('#js-quantity');
    const productImage = document.querySelectorAll('.product-gallery__item img');
    const productId = document.querySelector('#js-sku-display');

    setAddedProduct({
      name: productName.innerText,
      price: productPrice.innerText.replace(/£/g, ''),
      quantity: productQuantity.value,
      image: productImage[0].currentSrc,
      id: productId.innerText.replace(/\D/g, ''),
    });
  };

  const getRecommendedProducts = () => {
    const category =
      window.digitalData.product[0].category.subCategory1 ||
      window.digitalData.product[0].category.primaryCategory;
    const gender = document.getElementsByClassName('js-product-recommendation-tabs__tabbed')[0]
      .dataset.recipient;
    const price = document
      .querySelector('.product-summary .product-price--current')
      .innerText.replace(/£/g, '');

    window.exponea.getRecommendation({
      fillWithRandom: true,
      size: 6,
      catalogFilter: [
        {
          constraint: {
            operands: [
              {
                value: category,
                type: 'constant',
              },
            ],
            operator: 'equals',
            type: 'string',
          },
          property: 'category_level_1',
        },
        {
          constraint: {
            operands: [
              {
                value: gender,
                type: 'constant',
              },
            ],
            operator: 'equals',
            type: 'string',
          },
          property: 'gender',
        },
        {
          constraint: {
            operands: [
              {
                value: +price * 0.75,
                type: 'constant',
              },
              {
                value: +price * 2.5,
                type: 'constant',
              },
            ],
            operator: 'in between',
            type: 'number',
          },
          property: 'price',
        },
      ],
      catalogAttributesWhitelist: [],
      items: {},
      recommendationId:
        site === 'hsamuel' ? '6124b020d4d9e6cacbef161c' : '6124aa16d6e44079f671028d',
      callback: (resp) => setRecommendedProducts(resp),
    });
  };

  useEffect(() => {
    getRecommendedProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (basketRef.current && !basketRef.current.contains(e.target) && basketOpen) {
        setBasketOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [basketOpen]);

  useEffect(() => {
    const addToBasket = document.querySelector('#js-add-to-basket');
    const basketForm = document.querySelector('#basketForm');
    const sizeField = document.querySelector('#js-sku-change');

    const handleButtonActions = (e) => {
      if (sizeField?.value || !sizeField) {
        e.preventDefault();

        const basketData = new FormData(basketForm);
        const encoded = serialize(basketData);

        sendHttpRequest(
          'POST',
          '/webstore/handleBasketActions.sdo',
          `${Object.keys(encoded)
            .map((k) => `${k}=${encoded[k]}`)
            .join('&')}&addToBasket=Buy`
        );

        setBasketOpen(true);
        getCurrentItem();
      }
    };

    addToBasket.addEventListener('click', (e) => handleButtonActions(e));

    return () => addToBasket.removeEventListener('click', (e) => handleButtonActions(e));
  }, [setBasketOpen]);

  useEffect(() => {
    if (!isModal) {
      const t = setTimeout(() => setBasketOpen(false), 4000);

      return () => {
        clearTimeout(t);
      };
    }
  }, [addedProduct]);

  useEffect(() => {
    const waitForSimilarProducts = () => {
      console.log('SIM ITEMS:', similarItems);

      const similarItems = document.querySelectorAll(
        '.syte-offer-sale.syte-offers-items-container.tns-item, .syte-similar-items-item-container.tns-item'
      );

      const products = [];

      if (similarItems.length > 0) {
        similarItems.forEach((item) => {
          const url = item.querySelector('a').href;
          const title = item.querySelector(
            '.syte-offers-item-desc, .syte-similar-items-item-desc'
          ).innerText;
          const newPrice = item.querySelector('.new-price')?.innerText.replace(/£/g, '');
          const price = item.querySelector('.syte-item-price-wrapper').innerText.replace(/£/g, '');
          const image = item.querySelector('img').src;
          const product = { url, title, price: newPrice || price, image };
          products.push(product);
        });

        setSimilarProducts(products);
      } else {
        setTimeout(waitForSimilarProducts, 250);
      }
    };

    waitForSimilarProducts();
  }, []);

  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const checkWindowSize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 550) {
        return setItemsPerSlide(1.25);
      }

      if (windowWidth <= 750) {
        return setItemsPerSlide(2.25);
      }

      return setItemsPerSlide(3);
    };

    checkWindowSize();

    window.addEventListener('resize', () => checkWindowSize());

    return () => window.removeEventListener('resize', () => checkWindowSize());
  }, [basketOpen]);

  return (
    <div
      className={`${id}-mini-basket-outer ${id}-visible-${basketOpen} ${
        isModal ? `${id}-is-modal` : ''
      }`}
    >
      {isModal && (
        <div className={`${id}-mini-basket-modal-close`}>
          <div>
            <span>Close</span>
          </div>
        </div>
      )}
      <div
        className={`${id}-mini-basket ${id}-visible-${basketOpen} ${
          isModal ? `${id}-is-modal` : ''
        }`}
        ref={basketRef}
      >
        <div className={`${id}-mini-basket-notification`}>
          <p>
            {addedProduct.quantity} Item{addedProduct.quantity > 1 && 's'} added to basket
          </p>
          <span>
            <strong>
              £
              {Math.round((addedProduct.price * addedProduct.quantity + Number.EPSILON) * 100) /
                100}
            </strong>
          </span>
        </div>
        <div className={`${id}-mini-basket-inner`}>
          <div className={`${id}-mini-basket-desktop-summary ${isModal && `${id}-is-modal`}`}>
            {addedProduct && (
              <ul className={`${id}-mini-basket-items`}>
                <Item
                  name={addedProduct.name}
                  price={addedProduct.price}
                  quantity={addedProduct.quantity}
                  image={addedProduct.image}
                  // onRemove={() => removeFromBasket(addedProduct)}
                  id={id}
                  // key={addedProduct.id}
                />
              </ul>
            )}
          </div>
          {isModal &&
            ((recommendedProducts && recommendedProducts.length > 0) ||
              (similarProducts && similarProducts.length > 0)) && (
              <div className={`${id}-mini-basket-also-bought`}>
                <h3 className={`${id}-mini-basket-also-bought-title`}>
                  Those who added this also bought
                </h3>
                <Carousel itemsPerSlide={itemsPerSlide} gutter={20} basket={basketOpen}>
                  {recommendedProducts && recommendedProducts.length > 0
                    ? recommendedProducts.map((product) => (
                        <SimpleItem
                          name={product.title}
                          price={product.price}
                          image={product.image}
                          url={product.url}
                          id={id}
                          key={product.product_id}
                        />
                      ))
                    : similarProducts &&
                      similarProducts.map((product) => (
                        <SimpleItem
                          name={product.title}
                          price={product.price}
                          image={product.image}
                          url={product.url}
                          id={id}
                          key={product.product_id}
                        />
                      ))}
                </Carousel>
              </div>
            )}
          <div>
            <a href="/webstore/basket/" className={`${id}-mini-basket-view-basket`}>
              View Basket
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniBasket;
