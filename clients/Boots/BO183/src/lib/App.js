import "@babel/polyfill";
import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import offers from "./data/offers";
import healthHubContent from "./data/healthhub-v3";
import Header from "./components/Header";
import TileGrid from "./components/TileGrid";
import Tile from "./components/Tile";
import Layout from "./components/Layout";
import PickerBlock from "./components/PickerBlock";
import SideCar from "./components/SideCar";
import ProductCard from "./components/ProductCard";
import Carousel from "./components/Carousel";
import OfferCarousel from "./components/OfferCarousel";
import LoadingProductCard from "./components/LoadingProductCard";
import Offer from "./components/Offer";
import HealthHubCard from "./components/HealthHubCard";

const App = ({ data, variation }) => {
  const [activeSection, setActiveSection] = useState(false);
  const [categoryPick, setCategoryPick] = useState();
  const [firstPick, setFirstPick] = useState(false);
  const [secondPick, setSecondPick] = useState(false);
  const [productsToShow, setProductsToShow] = useState(false);

  const carouselRef = useRef(null);

  const handlePickerButtonClick = (idx) => {
    if (activeSection.sublinks[idx].sublinks) {
      setActiveSection(activeSection.sublinks[idx]);
    }

    if (firstPick) {
      setSecondPick(activeSection.sublinks[idx]);
    } else {
      setFirstPick(activeSection.sublinks[idx]);
    }
  };

  const handleTileClick = (idx) => {
    setActiveSection(data[idx]);
    setCategoryPick(data[idx]);
    setFirstPick(false);
    setSecondPick(false);
  };

  const handleResetValues = () => {
    setActiveSection(false);
    setCategoryPick(false);
    setFirstPick(false);
    setSecondPick(false);
    setProductsToShow(false);
  };

  const handlePrevious = () => {
    if (secondPick) {
      setSecondPick(false);
      return setActiveSection(firstPick);
    }
    if (firstPick) {
      setFirstPick(false);
      return setActiveSection(categoryPick);
    }

    setCategoryPick(false);
    return setActiveSection(false);
  };

  const getProductData = async (url) => {
    setProductsToShow(false);
    const res = await fetch(url);

    const data = await res.text();

    const temp = document.createElement("html");
    temp.innerHTML = data;

    const products = temp.querySelectorAll(".estore_product_container");

    const allProducts = [];

    products.forEach((product, idx) => {
      if (idx < 8) {
        const url = product.querySelector(".product_img_link").href;
        const image = product.querySelector(".product_img").src;
        const title = product.querySelector(".product_name_link").innerText;
        const price = product.querySelector(".product_price").innerText;

        allProducts.push({
          url,
          image,
          title,
          price,
        });
      }

      return;
    });

    if (variation === "3" && activeSection.title === "Health Hub") {
      setProductsToShow(healthHubContent);
    } else {
      setProductsToShow(allProducts);
    }
  };

  useEffect(() => {
    if (secondPick.url || activeSection.url) {
      getProductData(secondPick.url || activeSection.url);
    } else {
      setProductsToShow(false);
    }
  }, [activeSection, secondPick]);

  useEffect(() => {
    if (secondPick) carouselRef.current.base.scrollIntoView();
  }, [secondPick]);

  return (
    <Layout>
      <Header />
      {activeSection && (
        <PickerBlock
          activeSection={activeSection}
          category={activeSection.category}
          categoryPick={categoryPick}
          firstPick={firstPick}
          secondPick={secondPick}
          onButtonClick={handlePickerButtonClick}
          onReset={() => handleResetValues()}
          onPrevious={() => handlePrevious()}
          variation={variation}
        />
      )}
      <TileGrid collapsed={!!activeSection}>
        {data.map((item, idx) => (
          <Tile
            text={item.title}
            category={item.category}
            isActive={activeSection.category === item.category}
            onClick={() => handleTileClick(idx)}
            key={item.title + idx}
          />
        ))}
      </TileGrid>
      <SideCar
        title={categoryPick ? categoryPick.title : "Get the Deals"}
        category={activeSection.category}
        ref={carouselRef}
      >
        {activeSection ? (
          productsToShow && productsToShow.length !== 0 ? (
            <Carousel section={secondPick || activeSection}>
              {variation === "3" && activeSection.title === "Health Hub"
                ? productsToShow.map((product) => (
                    <HealthHubCard
                      image={product.image}
                      title={product.title}
                      url={product.url}
                      key={product.title}
                    />
                  ))
                : productsToShow.map((product) => (
                    <ProductCard
                      image={product.image}
                      title={product.title}
                      price={product.price}
                      url={product.url}
                      key={product.title}
                    />
                  ))}
            </Carousel>
          ) : (
            <Carousel section={secondPick || activeSection}>
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
              <LoadingProductCard />
            </Carousel>
          )
        ) : (
          <OfferCarousel>
            {offers.map((offer) => (
              <Offer
                title={offer.title}
                text={offer.text}
                links={offer.links}
                background={offer.background}
                textColour={offer.textColour}
                key={offer.title}
              />
            ))}
          </OfferCarousel>
        )}
      </SideCar>
    </Layout>
  );
};

export default App;
