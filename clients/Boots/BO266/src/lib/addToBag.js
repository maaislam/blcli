class AddToBag {
	constructor(catentry, entitledItem, SAP, name) {
		this.catentry = catentry; //Can be found on PDP - 'objectid' field returned by the API
		this.entitledItem = entitledItem; //Can also be found on PDP, typically looks to be catentry -1 however I am not 100% on this so not hardcoding yet
		this.SAP = SAP; //SAP Code
		this.name = name; //Product name as appears on PDP - 'offername' field returned by the API
	}

	insert(parent) {
		//adds the default HTML for the Add To Bag button along with all supporting data elements to the DOM where specified
		const df = new DocumentFragment();

		const atb = document.createElement("div");
		atb.className = "AT-custom-ATB";
		atb.innerHTML = `
    <div id="entitledItem_${this.entitledItem}" style="display:none;">
        [{
            "catentry_id" : "${this.catentry}", //From PDP
            "Attributes" :	{},"ItemImage" : "/wcsstore/eBootsStorefrontAssetStore/images/NoImageIcon.jpg","ItemImage467" : "/wcsstore/eBootsStorefrontAssetStore/images/NoImageIcon.jpg","ItemThumbnailImage" : "/wcsstore/eBootsStorefrontAssetStore/images/NoImageIcon_sm.jpg"}
        ]
    </div>	
        <input type="hidden" id="dlProductId_${this.entitledItem}" name="dlProductId_${this.entitledItem}" value="${this.SAP}.P" autocomplete="off">
        <div class="product_add">
            <div class="shopperActions plp_shopperActions_redesign" id="shopperActionsRedesign${this.entitledItem}">
                <div class="quantity_section quantity_section_redesign" id="quantity_section_${this.entitledItem}">
                    <p 
                        id="desreseQty_${this.entitledItem}" 
                        class="plus_quantity_disabled minus_quantity_redesign plus_quantity_disabled_redesign" 
                        onclick="if(shoppingActionsJS.removeItemConfirmationRedesign( 'desreseQty','${this.entitledItem}','${this.name} (${this.SAP}.P)')){
                            shoppingActionsJS.fireElementTag('Remove', 'Adjust basket quantity','${this.name} (${this.SAP}.P)');
                            setupShop5DataRedesign(
                            sanitizeCoreMetricsInput('selectedVariantCatId') != '' ? sanitizeCoreMetricsInput('selectedVariantCatId') : '${this.SAP}.P',
                            '${this.name}',
                            sanitizeCoreMetricsInput('quantity_${this.entitledItem}') !== '' ? sanitizeCoreMetricsInput('quantity_${this.entitledItem}') : '1',
                            '£10.00',
                            '1803681',
                            sanitizeCoreMetricsInput('searchBoxText') != '' ? 'Search Lister' : 'Product Lister',
                            'N',
                            '', 
                            '-_--_--_--_-','N','N','Y','Y','Search Successful','','',
                            'add2CartBtn_${this.entitledItem}','','1 ');									
                            shoppingActionsJS.minusQuantityRedesign('${this.entitledItem}',99,'${this.entitledItem}');
                        }" tabindex="-1" 
                        aria-hidden="true"
                        data-icon="K">
                    </p>
                    
                    <input 
                        aria-label="Quantity" 
                        name="quantity_${this.entitledItem}" 
                        id="quantity_${this.entitledItem}" 
                        type="text" 
                        class="quantity_input quantity_input_redesign" 
                        value="1" 
                        readonly="readonly" 
                        onchange="javascript:shoppingActionsJS.enableDisableMinusQty(this.value,${this.entitledItem});notifyQuantityChange(this.value);" 
                        maxlength="2" 
                        onkeydown="limitText(this,2);" 
                        onkeyup="limitText(this,2);"
                    >
                    
                    <p 
                        id="increseQty_${this.entitledItem}"
                        class="plus_quantity plus_quantity_redesign" 
                        onclick="shoppingActionsJS.fireElementTag('Add','Adjust basket quantity','${this.name} (${this.SAP}.P)');
                            setupShop5DataRedesign(
                            sanitizeCoreMetricsInput('selectedVariantCatId') != '' ? sanitizeCoreMetricsInput('selectedVariantCatId') : '${this.SAP}.P',
                            '${this.name}',
                            sanitizeCoreMetricsInput('quantity_${this.entitledItem}') !== '' ? sanitizeCoreMetricsInput('quantity_${this.entitledItem}') : '1',
                            '£10.00',
                            '1803681',
                            sanitizeCoreMetricsInput('searchBoxText') != '' ? 'Search Lister' : 'Product Lister',
                            'N',
                            '', 
                            '-_--_--_--_-','N','N','Y','Y','Search Successful','','',
                            'add2CartBtn_${this.entitledItem}','','1 ');									
                            shoppingActionsJS.plusQuantityAddItemCallRedesign('entitledItem_${this.entitledItem}',false,'${this.entitledItem}',false)" 
                            tabindex="-1" 
                            aria-hidden="true" 
                            data-icon="L"
                        >
                    </p>
                    <div class="clear_float"></div>
                    <div class="quantity_label desktop">in your basket</div>
                    <div class="quantity_label mobile">in basket</div>
                </div>
                                        
                <input type="hidden" name="freeGiftId_${this.entitledItem}" id="freeGiftId_${this.entitledItem}" value="" autocomplete="off">
                <!--  DWR-3188 added Datalayer update function  publishAdd2CartPDPPageGTM -->
                <a 
                    id="add2CartBtn_${this.entitledItem}" 
                    data-value="{&quot;price&quot;:&quot;10.00&quot;,&quot;hasSizeOptions&quot;:false,&quot;name&quot;:&quot;${this.name}&quot;,&quot;id&quot;:&quot;${this.SAP}.P&quot;,&quot;position&quot;:&quot;15&quot;,&quot;list&quot;:&quot;PLP&quot;,&quot;hasColourOptions&quot;:false}" 
                    href="javascript:setCurrentId('add2CartBtn');
                        setupShop5DataRedesign(
                        sanitizeCoreMetricsInput('selectedVariantCatId') != '' ? sanitizeCoreMetricsInput('selectedVariantCatId') : '${this.SAP}.P',
                        '${this.name}',
                        sanitizeCoreMetricsInput('quantity_${this.entitledItem}') !== '' ? sanitizeCoreMetricsInput('quantity_${this.entitledItem}') : '1',
                        '£10.00',
                        '1803681',
                        sanitizeCoreMetricsInput('searchBoxText') != '' ? 'Search Lister' : 'Product Lister',
                        'N',
                        '', 
                        '-_--_--_--_-','N','N','Y','Y','Search Successful','','',
                        'add2CartBtn_${this.entitledItem}','','1 ');
                        shoppingActionsJS.Add2ShopCartAjaxRedesign('entitledItem_${this.entitledItem}',1, false)" 
                    onkeypress="javascript:MessageHelper.setFocusElement('listViewAdd2Cart_${this.entitledItem}');" 
                    wairole="button" 
                    role="button" 
                    class="button primary primary_redesign" 
                    title="Add"
                >
                    <div class="left_border"></div>
                    <span id="productPageAdd2Cart" class="button_text button_text_redesign desktop">Add to basket</span>
                    <span id="productPageAdd2Cart" class="button_text button_text_redesign mobile">Add</span>
                    <div class="right_border"></div>										
                </a>

                <div id="coremetrics_add_to_cart_json" class="hidden"></div>
                <input type="hidden" id="lister_orderItemId_${this.entitledItem}" name="lister_orderItemId" value="" autocomplete="off">
                <input type="hidden" id="lister_orderItemQty_${this.entitledItem}" name="lister_orderItemId" value="0" autocomplete="off">
                                                    
                
                <div id="basket_confirmation_overlay_${this.entitledItem}" class="popup_overlay basket_confirmation_overlay_redesign" style="display:none">
                    <a 
                        title="Close overlay" 
                        href="javascript:void(0)" 
                        onclick="eStoreProductOverlayWithEsc('basket_confirmation_overlay_${this.entitledItem}');shoppingActionsJS.fireElementTag('Close','basket_confirmation_overlay','${this.name} (${this.SAP}.P)')" 
                        class="close-btn">x
                    </a>
                    
                    <p id="basket_confirmation_text">Are you sure you want to remove this product?</p>
                    <div class="row">
                        <a href="javascript:void(0)" role="button" class="button secondary" id="basket_confirmation_button_yes" onclick="eStoreProductOverlayWithEsc('basket_confirmation_overlay_${this.entitledItem}'); shoppingActionsJS.fireElementTag('Confirm remove: Yes','basket_confirmation_overlay','${this.name} (${this.SAP}.P)');shoppingActionsJS.minusQuantityRedesign('${this.entitledItem}',99,'${this.entitledItem}');"> Yes
                        </a>
                        <a href="javascript:void(0)" role="button" class="button tertiary" id="basket_confirmation_button_no" onclick="eStoreProductOverlayWithEsc('basket_confirmation_overlay_${this.entitledItem}');shoppingActionsJS.fireElementTag('Confirm remove: No','basket_confirmation_overlay','${this.name} (${this.SAP}.P)')">
                            No
                        </a>
                    </div>
                </div>
                                        
            </div><!-- . shopperActions plp_shopperActions_redesign-->				
        </div><!-- .product_add -->
        `;
		df.append(atb);

		parent.append(df);
	}

	add() {
		return new Promise((resolve, reject) => {
			//we must set up some hidden data elements on page for the atb interaction to work properly
			const entitledItemDiv = document.createElement("div");
			document.body.append(entitledItemDiv);
			entitledItemDiv.outerHTML = `
        <div id="entitledItem_${this.entitledItem}" style="display:none;">
            [{
                "catentry_id" : "${this.catentry}", //From PDP
                "Attributes" :	{},"ItemImage" : "/wcsstore/eBootsStorefrontAssetStore/images/NoImageIcon.jpg","ItemImage467" : "/wcsstore/eBootsStorefrontAssetStore/images/NoImageIcon.jpg","ItemThumbnailImage" : "/wcsstore/eBootsStorefrontAssetStore/images/NoImageIcon_sm.jpg"}
            ]
        </div>
        `;
			const shopperActions = document.createElement("div");
			document.body.append(shopperActions);
			shopperActions.outerHTML = `
        <div class="shopperActions plp_shopperActions_redesign" id="shopperActionsRedesign${this.entitledItem}" style="display: none">
        </div>
        `;

			const dlprodinfo = document.createElement("div");
			document.body.append(dlprodinfo);
			dlprodinfo.outerHTML = `
        <input type="hidden" id="dlProductId_${this.entitledItem}" name="dlProductId_${this.entitledItem}" value="${this.SAP}.P" autocomplete="off">
        `;

			setCurrentId("add2CartBtn");
			setupShop5DataRedesign(
				sanitizeCoreMetricsInput("selectedVariantCatId") != ""
					? sanitizeCoreMetricsInput("selectedVariantCatId")
					: `${this.SAP}.P`,
				`${this.name}`,
				sanitizeCoreMetricsInput(`quantity_${this.entitledItem}`),
				"£10.00",
				"1803681",
				sanitizeCoreMetricsInput("searchBoxText") != ""
					? "Search Lister"
					: "Product Lister",
				"N",
				"",
				"-_--_--_--_-",
				"N",
				"N",
				"Y",
				"Y",
				"Search Successful",
				"",
				"",
				`add2CartBtn_${this.entitledItem}`,
				"1",
				"1 "
			);
			shoppingActionsJS.Add2ShopCartAjaxRedesign(
				`entitledItem_${this.entitledItem}`,
				1,
				false
			);

			const resolvePromise = (success, error) => {
				//remove event listeners
				window.removeEventListener("add-to-basket:success", () =>
					resolvePromise(true)
				);
				window.removeEventListener("update-basket:success", () =>
					resolvePromise(true)
				);
				window.removeEventListener("add-to-basket:failure", (e) =>
					resolvePromise(false, e)
				);
				window.removeEventListener("update-basket:failure", (e) =>
					resolvePromise(false, e)
				);

				//clean up DOM
				entitledItemDiv.remove();
				shopperActions.remove();
				dlprodinfo.remove();

				//resolve promise to allow chaining
				if (success) {
					resolve();
				} else {
					reject(error);
				}
			};
			//we dont know if this will return an update or an add
			window.addEventListener("add-to-basket:success", () =>
				resolvePromise(true)
			);
			window.addEventListener("update-basket:success", () =>
				resolvePromise(true)
			);

			//capturing failures
			window.addEventListener("add-to-basket:failure", (e) =>
				resolvePromise(false, e)
			);
			window.addEventListener("update-basket:failure", (e) =>
				rejectOnfail(false, e)
			);
		});
	}

	increment() {
		//todo
	}

	decrement() {
		//todo
	}
}

export default AddToBag;
