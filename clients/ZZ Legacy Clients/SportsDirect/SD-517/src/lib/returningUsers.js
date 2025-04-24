const returningUsers = (ID) => {
    console.log("returning users")
    var getRecentlySearchedProducts = JSON.parse(localStorage.getItem("recentlyViewedProducts"));
    if (getRecentlySearchedProducts != '') {
        getRecentlySearchedProducts.map(item => {
            console.log(item.product.MainImageDetails)
        })
    }


    let expSearchBox =
        `
    <div id="myModal" class="modal">
        <div class="modal-content">
            <div class="${ID}-main-search-body">
                <div class="${ID}-search-recent-category">
                    <div class="${ID}-recent-category-title">RECENT CATEGORIES</div>
                    <div class="${ID}-recent-category-content">
                        <div class="${ID}-recent-categories">Tops</div>
                        <div class="${ID}-recent-categories">Shorts</div>
                        <div class="${ID}-recent-categories">Gym</div>
                        <div class="${ID}-recent-categories">Football</div>
                    </div>
                </div>
                <div class="${ID}-search-recent-viewed">
                    <div class="${ID}-recent-viewed-title">RECENTLY VIEWED</div>
                    <div class="${ID}-recent-viewed-content">
                        <div class="${ID}-card-container">
                            <img src="https://source.unsplash.com/1600x900/?beach" alt="Girl in a jacket" class="${ID}-card-product-image">
                            <div class="${ID}-card-product-title">Brand</div>
                            <div class="${ID}-card-product-description">Product name. This is what it looks live over two lines</div>
                            <div class="${ID}-card-product-sizes">S, M, L</div>
                            <div class="${ID}-card-product-price">$000</div>
                        </div>
                        <div class="${ID}-card-container">
                            <img src="https://source.unsplash.com/1600x900/?beach" alt="Girl in a jacket" class="${ID}-card-product-image">
                            <div class="${ID}-card-product-title">Brand</div>
                            <div class="${ID}-card-product-description">Product name. This is what it looks live over two lines</div>
                            <div class="${ID}-card-product-sizes">S, M, L</div>
                            <div class="${ID}-card-product-price">$000</div>
                        </div>
                        <div class="${ID}-card-container">
                            <img src="https://source.unsplash.com/1600x900/?beach" alt="Girl in a jacket" class="${ID}-card-product-image">
                            <div class="${ID}-card-product-title">Brand</div>
                            <div class="${ID}-card-product-description">Product name. This is what it looks live over two lines</div>
                            <div class="${ID}-card-product-sizes">S, M, L</div>
                            <div class="${ID}-card-product-price">$000</div>
                        </div>
                        <div class="${ID}-card-container">
                            <img src="https://source.unsplash.com/1600x900/?beach" alt="Girl in a jacket" class="${ID}-card-product-image">
                            <div class="${ID}-card-product-title">Brand</div>
                            <div class="${ID}-card-product-description">Product name. This is what it looks live over two lines</div>
                            <div class="${ID}-card-product-sizes">S, M, L</div>
                            <div class="${ID}-card-product-price">$000</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

    let expSearchBoxContainer = document.createElement('div')
    expSearchBoxContainer.classList.add(`${ID}-main-container-search`)
    expSearchBoxContainer.insertAdjacentHTML('afterbegin', expSearchBox)

    let mainContent = document.querySelector('.header-overlay')
    mainContent.insertAdjacentElement('beforebegin', expSearchBoxContainer)



    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close-modal")[0];

    // When the user clicks the button, open the modal 
    // btn.onclick = function() {
    //     modal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //     console.log('close')
    //     modal.style.display = "none";
    // }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    // document.querySelector('.ui-autocomplete.ui-front.ui-menu.ui-widget.ui-widget-content.ui-corner-all').classList.add(`${ID}-new-modal-type`)


    document.querySelector('.ShowClearButton.ui-autocomplete-input').addEventListener('focus', function() {
        modal.style.display = "block";
    })


    document.querySelector('.ShowClearButton.ui-autocomplete-input').addEventListener('keydown', function(e) {
        modal.style.display = "none";
    })


    // $(".header-overlay").addClass("activeOverlay"), $(this).closest(".dvSearch").addClass("active"), i.addClass("searchFocus")

}

export default returningUsers;