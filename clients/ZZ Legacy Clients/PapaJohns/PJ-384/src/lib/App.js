import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import shared from "../../../../../core-files/shared";
import { fireEvent } from "../../../../../core-files/services";
import { bindTriggerToBasket } from "./utils";

import Container from "./components/Container/Container";
import Item from "./components/Item/Item";
import Button from "./components/Button/Button";

const { ID } = shared;

export default function App() {
  const [isOpenState, setIsOpenState] = useState(false);
  const [buttonState, setButtonState] = useState();
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [totalCostState, setTotalCostState] = useState(0);
  const [productsState, setProductsState] = useState({
    "d27fbffd-844c-4cdf-956b-0aea196126d4": {
      name: "Philly Cheesesteak",
      info: "2 slices / 472Kcal per slice",
      price: 6.49,
      image: "/images/papadias/philly_cheesestake.png",
      quantity: 0,
      id: "d27fbffd-844c-4cdf-956b-0aea196126d4",
    },
    "ff46b86f-ed99-4788-9dce-ef82fea00b12": {
      name: "Philly Mushroom",
      info: "2 slices / 450Kcal per slice",
      price: 5.99,
      image: "/images/papadias/philly_mushroom.png",
      quantity: 0,
      id: "ff46b86f-ed99-4788-9dce-ef82fea00b12",
    },
    "89981f47-ff6b-4650-8ff9-a100821f78db": {
      name: "Italian Sausage & Pepperoni",
      info: "2 slices / 461Kcal per slice",
      price: 5.99,
      image: "/images/papadias/italian_sausage.png",
      quantity: 0,
      id: "89981f47-ff6b-4650-8ff9-a100821f78db",
    },
    "94fb9c24-5811-434c-9612-bfeef942f4ff": {
      name: "BBQ Chicken & Bacon",
      info: "2 slices / 370Kcal per slice",
      price: 6.49,
      image: "/images/papadias/bbq_chicken.png",
      quantity: 0,
      id: "94fb9c24-5811-434c-9612-bfeef942f4ff",
    },
    "235aa256-e36c-4a83-952e-64d4e2c2e084": {
      name: "Vegan Philly Mushroom",
      info: "2 slices / 455Kcal per slice",
      price: 5.99,
      image: "/images/papadias/vegan_philly_mushroom.png",
      quantity: 0,
      id: "235aa256-e36c-4a83-952e-64d4e2c2e084",
    },
  });

  function redirectToBasketPage() {
    setIsOpenState("overlay");
    window.location.href = "/basket-confirmation.aspx";
  }

  function incrementProductQuantity(id) {
    setProductsState((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          quantity:
            prev[id].quantity < 20 ? prev[id].quantity + 1 : prev[id].quantity,
        },
      };
    });
    fireEvent("Plus item");
  }

  function decrementProductQuantity(id) {
    setProductsState((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          quantity:
            prev[id].quantity > 0 ? prev[id].quantity - 1 : prev[id].quantity,
        },
      };
    });
    fireEvent("Minus item");
  }

  function getTotalCost() {
    return Object.keys(productsState).reduce((prev, curr) => {
      return prev + productsState[curr].price * productsState[curr].quantity;
    }, 0);
  }

  function addItemsToBasket() {
    setButtonState(<Button loading />);
    setIsLoadingState(true);

    const products = Object.keys(productsState)
      .filter((p) => productsState[p].quantity !== 0)
      .map((p) =>
        fetch(
          `https://www.papajohns.co.uk/services/addtobasket.aspx?variationId=${productsState[p].id}&quantity=${productsState[p].quantity}`
        )
      );

    Promise.all(products).then(() => redirectToBasketPage());
  }

  function lockBodyScroll() {
    if (isOpenState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  useEffect(() => lockBodyScroll(), [isOpenState]);

  useEffect(
    () =>
      bindTriggerToBasket((e) => {
        e.preventDefault();
        setIsOpenState(true);
        fireEvent("Open intercept modal");
      }),
    []
  );

  useEffect(() => {
    setTotalCostState(() => getTotalCost());
    if (totalCostState > 0) {
      setButtonState(
        <Button
          text={`Add to order £${totalCostState.toFixed(2)}`}
          onClick={() => {
            addItemsToBasket();
            fireEvent(`Tap 'Add to order'`);
            fireEvent(`Added value - £${totalCostState.toFixed(2)}`);
          }}
        />
      );
    } else {
      setButtonState(
        <Button
          text="No thanks"
          onClick={() => {
            redirectToBasketPage();
            fireEvent("Tap 'No thanks'");
          }}
          secondary
        />
      );
    }
  }, [productsState, setTotalCostState, totalCostState]);

  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector(`.${ID}-transitions-only-after-page-load`)
        .classList.remove(`${ID}-transitions-only-after-page-load`);
    }, 250);
  }, []);

  return (
    <div className={`${ID}-app`} data-open={isOpenState}>
      <Container
        onClose={() => {
          if (!isLoadingState) {
            redirectToBasketPage();
            fireEvent("Close modal using close icon");
          }
        }}
        button={buttonState}
      >
        {Object.keys(productsState).map((product) => (
          <Item
            name={productsState[product].name}
            info={productsState[product].info}
            price={productsState[product].price}
            image={productsState[product].image}
            quantity={productsState[product].quantity}
            onAdd={() => incrementProductQuantity(productsState[product].id)}
            onRemove={() => decrementProductQuantity(productsState[product].id)}
            key={productsState[product].id}
            disabled={isLoadingState}
          />
        ))}
      </Container>
    </div>
  );
}
