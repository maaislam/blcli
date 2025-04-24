import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { pageType, productToStore } from "../helpers";
import QuickView from "./quickView";

const { ID, VARIATION } = shared;
/*const { ID } = shared;

  
const loadState = () => { // componentDidMount
    const storage = JSON.parse(localStorage.getItem('wishlist'));

    setState('wishlist', storage || {});
};
  
const importItemsFromSpecialList = () => {
const wishlist = JSON.parse(localStorage.getItem('wishlist'));  
// or wishlist = state.wishlist; 

let wishlistName = 'Love Island Special';

// get hardcoded products and update list
// add all products from the list...
wishlist.items.push({
    productId: 121323,
    title: 'Imported Product',
    imageUrl: '...',
    link: 'href',
    list: wishlistName
})

if(wishlist.lists.indexOf(wishlistName) > -1) {
    // throw error, or manually rename list
    wishlistName += ' (1)';
}

wishlist.lists.push(wishlistName);

localStorage.setItem('wishlist', JSON.stringify(wishlist));
// or setState('wishlist', JSON.stringify(wishlist))
}
  
const onSetStateCalled = () => {
    localStorage.setItem('wishlist', JSON.stringify(this.state.wishlist));
}
  
const didClickRemove = (productId) => {
    setState('wishlist', {});
}
  
const openList = (e) => {
    var listToLoad = e.target.dataSet['list-name'];
    setState('activeList', listToLoad);
}
  
const userDidCreateList = () => {
    const wishlist = this.state.wishlist;
    wishlist.lists.push(wishlistName);
    
    this.setState(wishlist);
    
    this.setState('activeTab', 'all-list-view');
    this.setState('activeList', wishlistName);
}
  
const onBack = () => {
    setState('activeTab', 'home');
    setState('activeList', '');
}*/

const FavouritesModal = ({ param }) => {
  const [favourites, setFavourites] = useState({});
  const [quickViewURL, setQuickViewURL] = useState("");
  const [activeList, setActiveList] = useState("all");
  const [activeView, setActiveView] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");

  /*------  STORAGE FUNCTIONS -------*/
  /**
   * Helper function to Update favourites
   * updates the state and also updates the local storage copy of favourites
   */
  const updateFavourites = (data) => {
    // If url contains data from shared link, add items to storage
    // if (window.location.href.indexOf("bllist") > -1) {
    //   const sharedData = window.location.href.replace("https://www.boots.com/?bllist=", "");
    //   const decodedData = decodeURI(sharedData);
    //   console.log(JSON.parse(decodedData));

    //   localStorage.setItem("favouritesShared", `{"items": ${decodedData}, "lists": []}`);
    // }

    setFavourites(data || {});

    // Decide on a mechanism for when updating the list, writing back to local storage
    // so we always have disk persistence - 'state' in the component is transient
    localStorage.setItem("favourites", JSON.stringify(data));
  };

  const iconVisibility = (storage) => {
    
    if(storage.items.length > 0) {
      document.querySelector(`.${ID}-favouritesToggle`).classList.add('active');
    } else {
      document.querySelector(`.${ID}-favouritesToggle`).classList.remove('active');
    }
  }

  /**
   * This function is called when the component is first mounted
   * And it will take any favourites the user saved in local storage
   * and populate them in the 'favourite' state
   */
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("favourites"));

    updateFavourites(storage);

    iconVisibility(storage)
  }, []);

  /**
   * Add to storage on click of favourites
   */
  const addToFavourites = (el) => {
    const favouritesStorage = JSON.parse(localStorage.getItem("favourites") || '{"items": [], "lists": []}');

    let productId;

    if (pageType() === "Search" || pageType() === "PLP") {
      productId = el.querySelector("[id^='dlProductId']").value;
    }

    if (pageType() === "PDP") {
      const ID = JSON.parse(document.querySelector("#productDataDLVar").getAttribute("value"));
      productId = ID.id;
    }

    if (favouritesStorage && favouritesStorage.items && favouritesStorage.items.filter((item) => item.productId == productId).length > 0) {
      // already exists, remove it...
      favouritesStorage.items = favouritesStorage.items.filter((item) => item.productId != productId);
    } else {
      favouritesStorage.items.push(productToStore(el));
      fireEvent('Clicked add to favourites');
    }

    localStorage.setItem("favourites", JSON.stringify(favouritesStorage));

    setFavourites(JSON.parse(localStorage.getItem("favourites")));

    iconVisibility(favouritesStorage);
  };

  /**
   * Updates the storage when favourite is clicked
   */
  useEffect(() => {
    const favouritesStorage = JSON.parse(localStorage.getItem("favourites") || '{"items": [], "lists": []}');

    if (pageType() === "PLP" || pageType() === "Search") {
      const allFavourites = document.querySelectorAll(`.estore_product_container`);
      for (let i = 0; i < allFavourites.length; i += 1) {
        const element = allFavourites[i];

        const productSKU = element.getAttribute("data-productid");

        // If product already in storage
        if (favouritesStorage && favouritesStorage.items && favouritesStorage.items.filter((item) => item.productId == productSKU).length > 0) {
          element.querySelector(`.${ID}-favouriteProduct`).classList.add("saved");
          if(VARIATION === '1') {
            element.querySelector(`.${ID}-favouriteProduct span`).textContent = "Saved";
          }
        }

        if (element.querySelector(`.${ID}-favouriteProduct`)) {
          element.querySelector(`.${ID}-favouriteProduct`).addEventListener("click", (e) => {
            if (!e.currentTarget.classList.contains("saved")) {
              e.currentTarget.classList.add("saved");
              if(VARIATION === '1') {
                e.currentTarget.querySelector("span").textContent = "Saved";
              }
            } else {
              e.currentTarget.classList.remove("saved");
              if(VARIATION === '1') {
                e.currentTarget.querySelector("span").textContent = "Add to favourites";
              }
            }

            addToFavourites(element);
          });
        }
      }
    }

    if (pageType() === "PDP") {
      const productDetailsObj = JSON.parse(document.querySelector("#productDataDLVar").getAttribute("value"));
      const productSku = productDetailsObj.id;

      if (favouritesStorage && favouritesStorage.items && favouritesStorage.items.filter((item) => item.productId == productSku).length > 0) {
        document.querySelector(`.${ID}-favouriteProduct`).classList.add("saved");
        if(VARIATION === '1') {
          document.querySelector(`.${ID}-favouriteProduct span`).textContent = "Saved";
        }
      }

      document.querySelector(`.${ID}-favouriteProduct`).addEventListener("click", (e) => {
        if (!e.currentTarget.classList.contains("saved")) {
          e.currentTarget.classList.add("saved");
          if(VARIATION === '1') {
            e.currentTarget.querySelector("span").textContent = "Saved";
          }
        } else {
          e.currentTarget.classList.remove("saved");
          if(VARIATION === '1') {
            e.currentTarget.querySelector("span").textContent = "Add to favourites";
          }
        }

        addToFavourites();
      });
    }
  }, []);
  /*------  VIEW FUNCTIONS -------*/

  /**
   * Update active view
   */
  const updateActiveView = (name) => {
    setActiveView(name);
  };

  const showViewTabs = () => {
    let showTabs = false;

    if (activeView === "all-list-view" || activeView === "all") {
      if (favourites && favourites.lists && favourites.lists.length > 0) {
        showTabs = true;
      } else {
        showTabs = false;
      }
    } else {
      showTabs = false;
    }

    return showTabs;
  };

  /**
   * Close modal and reset state
   */
  const closeModal = () => {
    document.querySelector(`.${ID}-favourites-wrapper`).classList.remove("open");
    document.querySelector(`.${ID}-overlay`).classList.remove("active");
    document.documentElement.classList.remove(`${ID}-noScroll`);
    setActiveView("all");
    setActiveList("all");
    setQuickViewURL("");
  };

  const goBack = () => {
    setQuickViewURL("");

    if (favourites.lists.length === 0) {
      setActiveView("all");
      setActiveList("all");
    } else if (activeView === "quick-view" && activeList !== "all") {
      setActiveView("custom-list-view");
      setActiveList(activeList);
    } else {
      setActiveView("all");
      setActiveList("all");
    }
  };


  if(document.querySelector(`.${ID}-overlay`)) {
    document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
      closeModal();
    });
  }
  /*------  PRODUCT FUNCTIONS -------*/

  const productEvent = () => {
    fireEvent('Clicked product link');
  }
  /**
   * Loop through items, remove the one matching passed productId
   */
  const clickRemoveItem = (productId) => {
    const updated = {
      items: [...favourites.items],
      lists: [...favourites.lists],
    };

    updated.items = updated.items.filter((item) => item.productId != productId);

    updateFavourites(updated);

    if (updated.items.length === 0) {
      setActiveView("all");
    }

    // Loop through products again and change the text
    // -- IF PLP
    if (pageType() === "PLP" || pageType() === "Search") {
      const allFavourites = document.querySelectorAll(`.estore_product_container`);
      for (let i = 0; i < allFavourites.length; i += 1) {
        const element = allFavourites[i];

        const productSKU = element.getAttribute("data-productid");
        if(updated && updated.items.length === 0) {
          element.querySelector(`.${ID}-favouriteProduct`).classList.remove("saved");
          if(VARIATION === '1') {
            element.querySelector(`.${ID}-favouriteProduct span`).textContent = "Add to favourites";
          }
        }

        // If product removed, remove saved from badge
        else if (updated && updated.items && updated.items.filter((item) => item.productId != productSKU).length > 0) {
          element.querySelector(`.${ID}-favouriteProduct`).classList.remove("saved");
          if(VARIATION === '1') {
            element.querySelector(`.${ID}-favouriteProduct span`).textContent = "Add to favourites";
          }
        }
      }
    } else if (pageType() === "PDP") {
      const productDetailsObj = JSON.parse(document.querySelector("#productDataDLVar").getAttribute("value"));
      const productSku = productDetailsObj.id;

      if (updated && updated.items && updated.items.filter((item) => item.productId !== productSku).length > 0) {
        document.querySelector(`.${ID}-favouriteProduct`).classList.remove("saved");
        if(VARIATION === '1') {
          document.querySelector(`.${ID}-favouriteProduct span`).textContent = "Add to favourites";
        }
      }
    }

    iconVisibility(updated)
  };

  /**
   * On click of quick view button, set url and show once data has been requested
   */
  const showQuickView = (url) => {
    setActiveView("quick-view");
    fireEvent('Clicked quick view');
    setQuickViewURL(url);
  };

  /*------   LIST FUNCTIONS -------*/

  const listValidation = () => {
    const input = document.querySelector(".createList input");
    const invalidWords = /(bitch|\bass\b|asshole|bastard|bullshit|cunt|cock|dick|fuck|fucking|fucker|motherfucker|piss|penis|pussy|queer|shit|slut|twat|whore)/gim;

    if (input.value === "") {
      setErrorMessage("Please enter a name for your list");
    } else if (input.value.match(invalidWords)) {
      setErrorMessage("No inexplicit words allowed");
    } else if (input.value.length >= 40) {
      setErrorMessage("List name can be no longer than 40 characters");
    } else {
      setErrorMessage("");
      fireEvent('Created list '+ listInputRef.current.value);
      createList();
    }
  };

  // const shareList = (activeList) => {
  //   const sharearr = (favourites.items || []).filter((item) => item.list == activeList);
  //   const stringArr = JSON.stringify(sharearr);

  //   const shareURL = `https://www.boots.com/?bllist=${encodeURI(stringArr)}`;
  //   console.log(shareURL);
  // };
  /**
   * Match list name and remove it
   */
  const clickRemoveList = (listName) => {
    const updated = {
      items: [...favourites.items],
      lists: [...favourites.lists],
    };

    updated.lists = updated.lists.filter((item) => item != listName);

    // remove specified list from matching products
    updated.items.filter((item) => {
      if (item.list === listName) {
        item.list = "";
      }
    });

    updateFavourites(updated);

    // if no lists, set view back to all
    if (updated.lists.length === 0) {
      setActiveView("all");
      setActiveList("all");
    } else {
      setActiveView("all-list-view");
      setActiveList("all");
    }
  };

  /**
   * Adds product to chosen list
   */
  const addProductToList = (productid, listName) => {
    const array = { ...favourites };

    const item = array.items.find((item) => item.productId == productid);
    item.list = listName;

    setFavourites(array);

    localStorage.setItem("favourites", JSON.stringify(array));
  };

  /**
   * Remove item from current list
   */
  const removeItemFromList = (productid) => {
    const array = { ...favourites };

    const item = array.items.find((item) => item.productId == productid);
    item.list = "";

    setFavourites(array);

    localStorage.setItem("favourites", JSON.stringify(array));
  };

  /**
   * Ref so we can just refer to the input elm in createList()
   */
  const listInputRef = useRef(null);

  /**
   * Add item to list
   */
  const createList = () => {
    const updated = {
      items: [...favourites.items],
      lists: [...favourites.lists],
    };

    updated.lists.push(listInputRef.current.value);

    updateFavourites(updated);

    updateActiveView("all-list-view");

    // clear input value after create
    listInputRef.current.value = "";
  };

  const showCreateList = () => {
    updateActiveView("create-list");
    //console.log(listInputRef.current)
    setTimeout(() => listInputRef.current.focus(), 0);
  }

  const cancelCreateList = () => {
    updateActiveView("all");
    setErrorMessage("");
    // clear input value after cancel
    //listInputRef.current.value = "";
  };


  /**
   * Show the list items
   */
  const showCustomList = (listName) => {
    setActiveView("custom-list-view");
    setActiveList(listName);
  };

  /**
   * Add matching products to relevant list if exist, if not show message
   */
  const getListItems = () => {
    const arr = (favourites.items || []).filter((item) => item.list == activeList);

    if (!arr.length) return <div>You currently have no products in this list.</div>;

    return arr.map((item) => (
      <li key={item.productId} className="favourite-product">
        <div className="favourite-product-image" style={`background-image:url(${item.imageUrl})`}>
          <a className="fullLink" href={item.link} onClick={productEvent}></a>
        </div>
        <div className="favourite-product-info">
          <p className="bodyText">{item.title}</p>
          <a className="cta primary" onClick={() => showQuickView(item.link)}>
            Quick view
          </a>
        </div>
        <span className="favourites-close" onClick={() => removeItemFromList(item.productId)}></span>
      </li>
    ));
  };

  const getListCount = (listName) => {
    const listArr = (favourites.items || []).filter((item) => item.list == listName);
    return listArr.length;
  };

  return (
    <div>
      <div className={activeView == "quick-view" ? "textTop absolute" : "textTop"}>
        {activeList !== "all" ? (
          <div className="list-title">
            <div className="back" onClick={goBack}></div>
            <h2>{activeList}</h2>
          </div>
        ) : activeView == "quick-view" ? (
          <div className="list-title">
            <div className="back" onClick={goBack}></div>
          </div>
        ) : (
          <div className="list-title">
            <h2>Your favourites</h2>
            <div className={activeView == "all" && favourites && favourites.lists && favourites.lists.length === 0 ? "text-link create-list desktop cta secondary visible" : "text-link create-list desktop cta secondary hidden"}>
            <a onClick={() => showCreateList()}>Create List</a>
            </div>
            {activeView === "all-list-view" ? (
              <div className="text-link create-list desktop cta secondary visible">
              <a onClick={() => showCreateList()}>Create List</a>
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        <div className="favourites-close" onClick={closeModal}></div>
      </div>
      <div className={showViewTabs() == false ? "favourite-tabs hidden" : "favourite-tabs visible"}>
        <div className={activeView == "all" ? "favourite-tab all active" : "favourite-tab all"} onClick={() => updateActiveView("all")}>
          <span>All favourites</span>
        </div>
        <div className={activeView == "all-list-view" ? "favourite-tab lists active" : "favourite-tab lists"} onClick={() => updateActiveView("all-list-view")}>
          <span>Lists</span>
        </div>
        <span className="tabs-active-marker"></span>
      </div>

      <div className="favouritesContent">
        <div className={activeView == "all" && favourites && favourites.lists && favourites.lists.length === 0 ? "text-link create-list mobile visible" : "text-link mobile create-list hidden"}>
        <a onClick={() => showCreateList()}>Create List</a>
        </div>
        <div className={activeView == "all" ? "allProducts visible" : "allProducts hidden"}>
          {favourites && favourites.items && favourites.items.length !== 0 ? (
            <ul className="favourites">
              {(favourites.items || [])
                .sort((a, b) => a.title < b.title)
                .map((item) => (
                  <li key={item.productId} className="favourite-product">
                    <div className="favourite-product-image" style={`background-image:url(${item.imageUrl})`}>
                      <a className="fullLink" href={item.link} onClick={productEvent}></a>
                    </div>
                    <div className="favourite-product-info">
                      <p className="bodyText">{item.title}</p>
                      <div className="actions">
                        <a className="cta primary" onClick={() => showQuickView(item.link)}>
                          Quick view
                        </a>
                        {favourites.lists.length > 0 ? (
                          <select className="select-list-options" value={item.list} onChange={(e) => addProductToList(item.productId, e.target.value)}>
                            <option value="">Add to list</option>
                            {(favourites.lists || []).sort().map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <span className="favourites-close" onClick={() => clickRemoveItem(item.productId)}></span>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="noItems">You currently have no products saved</div>
          )}
        </div>

        <div className={activeView == "create-list" ? "createList visible" : "createList hidden"}>
          <p className="bodyText">What would you like to call your list?</p>
          <span className={errorMessage !== "" ? "error visible" : "error hidden"}>{errorMessage}</span>
          <input type="text" ref={listInputRef} placeholder="Makeup, skincare..."></input>
          <div className="create-list-ctas">
            <a className="cta primary" onClick={listValidation}>
              Create
            </a>
            <a className="cta secondary" onClick={() => cancelCreateList()}>
              Cancel
            </a>
          </div>
        </div>

        <div className={activeView == "all-list-view" ? "all-list-view visible" : "all-list-view hidden"}>
          <div className="text-link create-list mobile">
          <a onClick={() => showCreateList()}>Create List</a>
          </div>
          <div className="all-lists">
            {(favourites.lists || []).sort().map((item) => (
              <div key={item} className="list-item" onClick={() => showCustomList(item)}>
                <h3>{item}</h3>
                <p>{getListCount(item) === 1 ? getListCount(item) + " product" : getListCount(item) + " products"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={activeView == "custom-list-view" ? "custom-list-view visible" : "custom-list-view hidden"} list-name={activeList}>
          <div className="list-options">
            {/* <a className="cta secondary" onClick={() => shareList(activeList)}>
              Share list
            </a> */}
            <div className="text-link delete-list">
              <a onClick={() => clickRemoveList(activeList)}>Delete List</a>
            </div>
          </div>
          <div className="list-products">{getListItems()}</div>
        </div>

        <div className={activeView == "quick-view" && quickViewURL !== "" ? "quick-view visible" : "quick-view hidden"}>
          {quickViewURL !== "" ? <QuickView productURL={quickViewURL}></QuickView> : ""}
          <div className="addDetails"></div>
        </div>
      </div>
    </div>
  );
};

export default FavouritesModal;
