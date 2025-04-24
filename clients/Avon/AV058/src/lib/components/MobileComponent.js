import { h, render, Component } from "preact";
import shared from '../../../../../../core-files/shared';
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events, getCookie } from '../../../../../../lib/utils';
import { fireEvent } from '../../../../../../core-files/services';
import { data1, data2, data3, data4 } from '../data';

export default class MobileComponent extends Component {
    constructor() {
        super();
        this.state = {
            test: 'test',
            stockChecked: false,
            total: 0,
            tier: 1,
            products: null,
            productQty1: 1,
            productQty2: 1,
            productQty3: 1,
            productQty4: 1,
        };

        // Bind methods here
        this.testFunction = this.testFunction.bind(this);
        this.loadProducts = this.loadProducts.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.setTier = this.setTier.bind(this);
        this.handleQty = this.handleQty.bind(this);
        this.addToBag = this.addToBag.bind(this);
    };

    // Lifecycle methods & others here

    componentDidMount() {
        this.calculateTotal();
    };

    testFunction() {
        console.log('Test function fired');
    };

    stockCheck(productUrl) {
      return fetch(productUrl + '.js').then(r => r.json()).then(d => !!d?.available)
    }

    loadProducts(cb = null) {
        if (this.state.tier == 1) {
            this.setState({
                products: window.xxdata1 || data1
            }, cb)
        }
        if (this.state.tier == 2) {
            this.setState({
                products: window.xxdata2 || data2
            }, cb)
        }
        if (this.state.tier == 3) {
            this.setState({
                products: window.xxdata3 || data3
            }, cb)
        }
        if (this.state.tier == 4) {
            this.setState({
                products: window.xxdata4 || data4
            }, cb)
        }
    };

    calculateTotal() {
        const totalPriceWrap = document.querySelector('.total-price');
        if(totalPriceWrap) {
            const valueElem = totalPriceWrap.querySelector('.value');
            if (valueElem) {
                const value = valueElem.getAttribute('data-total-value');
                value ? (
                    this.setState({
                        total: value
                    }, () => {
                        this.setTier();
                    })
                ) : null;
            }
        }
    };

    setTier() {
        const total = this.state.total;
        let tier = 1;
        if (total < 1699) {
            tier = 1;
        } else if (total > 1699 && total <= 1799) {
            tier = 2;
        } else if (total > 1799 && total <= 1899) {
            tier = 3;
        } else if (total > 1899) {
            tier = 4;
        };
        this.setState({
            tier: tier,
        }, () => {
            this.loadProducts(() => {
              const prods = this.state.products;
              if(prods) {
                prods.forEach(p => {
                  this.stockCheck(p.url).then(inStock => {
                    if(!inStock) {
                      p.outOfStock = true;

                      this.setState({
                        products: prods
                      });

                      fireEvent('Out of Stock Product - ' + p.url.replace('https://avon.uk.com', ''));
                    }
                  });
                });
              }
            });
        })
    }


    handleQty(product, change) {
        var currentQty = 0;
        if(product ===  1) {
            currentQty = this.state.productQty1;
        }
        if(product ===  2) {
            currentQty = this.state.productQty2;
        }
        if(product ===  3) {
            currentQty = this.state.productQty3;
        }
        if(product ===  4) {
            currentQty = this.state.productQty4;
        }

        if (change === 'increment') {
            currentQty = currentQty + 1;

            if(product === 1) {
                this.setState({
                    productQty1: currentQty
                })
            }
            if(product === 2) {
                this.setState({
                    productQty2: currentQty
                })
            }
            if(product === 3) {
                this.setState({
                    productQty3: currentQty
                })
            }
            if(product === 4) {
                this.setState({
                    productQty4: currentQty
                })
            }
        }

        if (change === 'decrease') {
            if(currentQty === 0) return;
            currentQty = currentQty - 1;
            if(product === 1) {
                this.setState({
                    productQty1: currentQty
                })
            }
            if(product === 2) {
                this.setState({
                    productQty2: currentQty
                })
            }
            if(product === 3) {
                this.setState({
                    productQty3: currentQty
                })
            }
            if(product === 4) {
                this.setState({
                    productQty4: currentQty
                })
            }
        }
    }

    addToBag(id, quantity) {
        fireEvent('Click Add To Basket - ' + id);

        const span = document.querySelector(`[btn-ref="${id}"]`);
        if(span) {
            span.innerText = 'Adding...';
        }
        jQuery.ajax({
            url: `https://avon.uk.com/cart/add?id=${id}&quantity=${quantity}`,
            success: function(xhr) {
              location.reload();
            }
          });
    }

    // Render method
    render() {
        return (
            <div className={`${shared.ID}__mobile-component`}>
                <h4 className={`${shared.ID}__mobileTitle`}>See these little extras!...</h4>

                { this.state.products ? (
                    <div className={`${shared.ID}__mobile-grid`}>
                        <div className={`${shared.ID}__mobile__product-wrap`}>
                            <div className={`${shared.ID}__mobile__product`}>
                                <div className={`${shared.ID}__mobile__product__top`}>
                                    <a href={this.state.products[0].url} className={`${shared.ID}__mobile__product__top__img`} style={{backgroundImage: `url(${this.state.products[0].img})`}}>
                                    </a>
                                  {!this.state.products[0].outOfStock ? (
                                    <div className={`${shared.ID}__mobile__product__top__qtys`}>
                                        <span className={`${shared.ID}__mobile__product__top__qtys__btn`}
                                            onClick={() => {
                                                this.handleQty(1, 'decrease');
                                            }}
                                        >-</span>
                                        <span className={`${shared.ID}__mobile__product__top__qtys__qty`}>{this.state.productQty1}</span>
                                        <span className={`${shared.ID}__mobile__product__top__qtys__btn`}
                                            onClick={() => {
                                                this.handleQty(1, 'increment');
                                            }}
                                        >+</span>
                                    </div>
                                  ) : (
                                    <div className={`${shared.ID}__mobile__product__top__qtys`}></div>
                                  )}
                                  {!this.state.products[0].outOfStock ? (
                                    <div className={`${shared.ID}__mobile__product__top__cta`}
                                         onClick={()=>{this.addToBag(this.state.products[0].id, this.state.productQty1)}}
                                         btn-ref={this.state.products[0].id}
                                    >
                                        Add to basket
                                    </div>
                                  ) : (
                                    <div className={`${shared.ID}__mobile__product__top__cta xoos`}>
                                      Out of stock
                                    </div>
                                  )}
                                </div>
                                <div className={`${shared.ID}__mobile__product__bottom`}>
                                    <div className={`${shared.ID}__mobile__product__bottom__price`}>
                                        {this.state.products[0].price}
                                    </div>
                                    <a href={this.state.products[0].url}
                                      className={`${shared.ID}__mobile__product__bottom__title`}>
                                        {this.state.products[0].name}
                                    </a>
                                    <div className={`${shared.ID}__mobile__product__bottom__reviews`}>
                                        <img className={`${shared.ID}__product__details__rating__img`} src='https://ucds.ams3.digitaloceanspaces.com/avmig/C1D546D2C3D53B8085B3D41040A757F0A45D1949C2A39BE6917BE353A9949D6C.png'/>
                                        <span>
                                            {this.state.products[0].reviews} Reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${shared.ID}__mobile__product-wrap`}>
                            <div className={`${shared.ID}__mobile__product`}>
                                <div className={`${shared.ID}__mobile__product__top`}>
                                    <a href={this.state.products[1].url} className={`${shared.ID}__mobile__product__top__img`} style={{backgroundImage: `url(${this.state.products[1].img})`}}>
                                    </a>
                                  {!this.state.products[1].outOfStock ? (
                                    <div className={`${shared.ID}__mobile__product__top__qtys`}>
                                        <span className={`${shared.ID}__mobile__product__top__qtys__btn`}
                                            onClick={() => {
                                                this.handleQty(2, 'decrease');
                                            }}
                                        >-</span>
                                        <span className={`${shared.ID}__mobile__product__top__qtys__qty`}>{this.state.productQty2}</span>
                                        <span className={`${shared.ID}__mobile__product__top__qtys__btn`}
                                            onClick={() => {
                                                this.handleQty(2, 'increment');
                                            }}
                                        >+</span>
                                    </div>
                                  ) : (
                                    <div className={`${shared.ID}__mobile__product__top__qtys`}></div>
                                  )}
                                  {!this.state.products[1].outOfStock ? (
                                    <div className={`${shared.ID}__mobile__product__top__cta`}
                                         onClick={()=>{this.addToBag(this.state.products[1].id, this.state.productQty2)}}
                                         btn-ref={this.state.products[1].id}
                                    >
                                        Add to basket
                                    </div>
                                  ) : (
                                    <div className={`${shared.ID}__mobile__product__top__cta xoos`}>
                                      Out of stock
                                    </div>
                                  )}
                                </div>
                                <div className={`${shared.ID}__mobile__product__bottom`}>
                                    <div className={`${shared.ID}__mobile__product__bottom__price`}>
                                        {this.state.products[1].price}
                                    </div>
                                    <a href={this.state.products[1].url} className={`${shared.ID}__mobile__product__bottom__title`}>
                                        {this.state.products[1].name}
                                    </a>
                                    <div className={`${shared.ID}__mobile__product__bottom__reviews`}>
                                        <img className={`${shared.ID}__product__details__rating__img`} src='https://ucds.ams3.digitaloceanspaces.com/avmig/C1D546D2C3D53B8085B3D41040A757F0A45D1949C2A39BE6917BE353A9949D6C.png'/>
                                        <span>
                                            {this.state.products[1].reviews} Reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${shared.ID}__mobile__product-wrap`}>
                            <div className={`${shared.ID}__mobile__product`}>
                                <div className={`${shared.ID}__mobile__product__top`}>
                                    <a href={this.state.products[2].url} className={`${shared.ID}__mobile__product__top__img`} style={{backgroundImage: `url(${this.state.products[2].img})`}}>
                                    </a>
                                  {!this.state.products[2].outOfStock ? (
                                    <div className={`${shared.ID}__mobile__product__top__qtys`}>
                                        <span className={`${shared.ID}__mobile__product__top__qtys__btn`}
                                            onClick={() => {
                                                this.handleQty(3, 'decrease');
                                            }}
                                        >-</span>
                                        <span className={`${shared.ID}__mobile__product__top__qtys__qty`}>{this.state.productQty3}</span>
                                        <span className={`${shared.ID}__mobile__product__top__qtys__btn`}
                                            onClick={() => {
                                                this.handleQty(3, 'increment');
                                            }}
                                        >+</span>
                                    </div>
                                  ) : (
                                    <div className={`${shared.ID}__mobile__product__top__qtys`}></div>
                                  )}
                                  {!this.state.products[2].outOfStock ? (
                                    <div className={`${shared.ID}__mobile__product__top__cta`}
                                         onClick={()=>{this.addToBag(this.state.products[2].id, this.state.productQty3)}}
                                         btn-ref={this.state.products[2].id}
                                    >
                                        Add to basket
                                    </div>
                                  ) : (
                                    <div className={`${shared.ID}__mobile__product__top__cta xoos`}>
                                      Out of stock
                                    </div>
                                  )}
                                </div>
                                <div className={`${shared.ID}__mobile__product__bottom`}>
                                    <div className={`${shared.ID}__mobile__product__bottom__price`}>
                                        {this.state.products[2].price}
                                    </div>
                                    <a href={this.state.products[2].url} className={`${shared.ID}__mobile__product__bottom__title`}>
                                        {this.state.products[2].name}
                                    </a>
                                    <div className={`${shared.ID}__mobile__product__bottom__reviews`}>
                                        <img className={`${shared.ID}__product__details__rating__img`} src='https://ucds.ams3.digitaloceanspaces.com/avmig/C1D546D2C3D53B8085B3D41040A757F0A45D1949C2A39BE6917BE353A9949D6C.png'/>
                                        <span>
                                            {this.state.products[2].reviews} Reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${shared.ID}__mobile__product-wrap`}>
                            <div className={`${shared.ID}__mobile__product`}>
                                <div className={`${shared.ID}__mobile__product__top`}>
                                    <a href={this.state.products[3].url} className={`${shared.ID}__mobile__product__top__img`} style={{backgroundImage: `url(${this.state.products[3].img})`}}>
                                    </a>
                                  {!this.state.products[3].outOfStock ? (
                                    <div className={`${shared.ID}__mobile__product__top__qtys`}>
                                        <span className={`${shared.ID}__mobile__product__top__qtys__btn`}
                                            onClick={() => {
                                                this.handleQty(4, 'decrease');
                                            }}
                                        >-</span>
                                        <span className={`${shared.ID}__mobile__product__top__qtys__qty`}>{this.state.productQty4}</span>
                                        <span className={`${shared.ID}__mobile__product__top__qtys__btn`}
                                            onClick={() => {
                                                this.handleQty(4, 'increment');
                                            }}
                                        >+</span>
                                    </div>
                                  ) : (
                                    <div className={`${shared.ID}__mobile__product__top__qtys`}>
                                    </div>
                                  )}
                                  {!this.state.products[3].outOfStock ? (
                                    <div className={`${shared.ID}__mobile__product__top__cta`}
                                         onClick={()=>{this.addToBag(this.state.products[3].id, this.state.productQty4)}}
                                         btn-ref={this.state.products[3].id}
                                    >
                                        Add to basket
                                    </div>
                                  ) : (
                                    <div className={`${shared.ID}__mobile__product__top__cta xoos`}>
                                      Out of stock
                                    </div>
                                  )}
                                </div>
                                <div className={`${shared.ID}__mobile__product__bottom`}>
                                    <div className={`${shared.ID}__mobile__product__bottom__price`}>
                                        {this.state.products[3].price}
                                    </div>
                                    <a href={this.state.products[3].url} className={`${shared.ID}__mobile__product__bottom__title`}>
                                        {this.state.products[3].name}
                                    </a>
                                    <div className={`${shared.ID}__mobile__product__bottom__reviews`}>
                                        <img className={`${shared.ID}__product__details__rating__img`} src='https://ucds.ams3.digitaloceanspaces.com/avmig/C1D546D2C3D53B8085B3D41040A757F0A45D1949C2A39BE6917BE353A9949D6C.png'/>
                                        <span className={`${shared.ID}__mobile__product__bottom__reviews__text`}>
                                            {this.state.products[3].reviews} Reviews
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null }
            </div>
        )
    }
};
