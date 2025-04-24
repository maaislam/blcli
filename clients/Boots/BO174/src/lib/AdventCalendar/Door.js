import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { fireEvent } from '../../../../../../core-files/services';
import { sendHttpRequest, nthDay } from '../../../../../../lib/utils';
import Modal from './Modal';

const Door = ({
  id,
  available,
  day,
  name,
  image,
  width,
  url,
  allRevealed,
  hasColours,
  basketId,
}) => {
  const [modal, setModal] = useState(false);
  const [reveal, setReveal] = useState(false);

  const [productPrice, setProductPrice] = useState('');


  useEffect(() => {
    if (modal) {

      fireEvent('Clicked view details');

      sendHttpRequest('GET', url).then((res) => {
        const temp = document.createElement('html');
        temp.innerHTML = res;

        const price = temp.querySelector('#PDP_productPrice').innerText;
        setProductPrice(price);
      });

      if (localStorage.getItem('NO7DISCOUNT') === null) {
        localStorage.setItem('NO7DISCOUNT', 'NO7CAL10');
      }
    }
  }, [modal]);

  return (
    <Fragment>
      <li className={`${id}-advent-door`} style={{ width: `${width}px` }}>
        <div className={`${id}-advent-door-container`}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {available ? (
            reveal || allRevealed ? (
              <div className={`${id}-advent-door-inner`}>
                <div className={`${id}-advent-door-image`}>
                  <img src={image} alt={name} />
                </div>
                <div className={`${id}-advent-door-content`}>
                  <p className={`${id}-advent-door-content-discount`}>10% off</p>
                  <h3 className={`${id}-advent-door-product-name`}>{name}</h3>
                  <button type="button" onClick={() => setModal(true)}>
                    View Details
                  </button>
                </div>
              </div>
            ) : (
              <div className={`${id}-advent-door-inner ${id}-unavailable`}>
                <div className={`${id}-advent-door-unavailable-image`} />
                <div className={`${id}-advent-door-content`}>
                  <p className={`${id}-advent-door-day`}>Day {day}</p>
                  <p>Now Available!</p>
                  <button onClick={() => setReveal(true)} type="button">
                    Claim Offer!
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className={`${id}-advent-door-unavailable`}>
              <div>
                <p>
                  {day}
                  {nthDay(day)} Day
                </p>
                <p>Not Available Yet</p>
              </div>
            </div>
          )}
        </div>
      </li>
      {modal && (
        <Modal id={id} onClose={() => setModal(false)} day={day}>
          <div className={`${id}-advent-modal`}>
            <div className={`${id}-advent-modal-image`}>
              <img src={image} alt={name} />
            </div>
            <div className={`${id}-advent-modal-content`}>
              <h3>{name} - 10% Off</h3>
              <p className={`${id}-advent-modal-content-price`}>{productPrice}</p>
              {!hasColours ? (
                <button
                  className={`${id}-advent-modal-add-to-basket`}
                  type="button"
                  onClick={() => {

                    fireEvent('Clicked add to bag')

                    sendHttpRequest('GET', url).then((res) => {
                      const temp = document.createElement('html');
                      temp.innerHTML = res;

                      const items = temp.querySelector(
                        '.shopperActions.pdp_shopperActions_redesign'
                      );
                      const sku = temp.querySelector(`#entitledItem_${basketId}`);
                      const invisibleContainer = document.createElement('div');

                      invisibleContainer.classList.add(`${id}-invisible-container`);
                      document.body.appendChild(invisibleContainer);
                      invisibleContainer.appendChild(sku);
                      invisibleContainer.appendChild(items);

                      window.shoppingActionsJS.Add2ShopCartAjaxRedesign(
                        `entitledItem_${basketId}`,
                        1,
                        false
                      );
                    });
                    setModal(false);
                  }}
                >
                  Add to basket
                </button>
              ) : (
                <a href={url} className={`${id}-advent-modal-add-to-basket`} onClick={() => {
                  fireEvent('Clicked view product');
                }}>
                  View Product
                </a>
              )}
              <p className={`${id}-advent-modal-checkout-message`}>
                Discount will be automatically applied at checkout!
              </p>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default Door;
