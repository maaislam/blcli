import { h, render, Component } from "preact";
import shared from '../../../../../../core-files/shared';
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events, getCookie } from '../../../../../../lib/utils';
import { fireEvent } from '../../../../../../core-files/services';
import { data1, data2, data3, data4 } from '../data';

export default class ReactComponent extends Component {
    constructor() {
        super();
        this.state = {
            test: 'test',
            total: 0,
            tier: 1,
            products: null,
            productQty1: 1,
            productQty2: 1,
            productQty3: 1,
            productQty4: 1,
        };

        // Bind methods here
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
            <div className={`${shared.ID}__component`}>
                <span className={`${shared.ID}__desktopTitle`}>See these little extras!...</span>

                { this.state.products ? (
                    <div className={`${shared.ID}__grid`}>
                        <div className={`${shared.ID}__product`}>
                            <a href={this.state.products[0].url} className={`${shared.ID}__product__img`}
                                style={{backgroundImage: `url(${this.state.products[0].img})`}}
                            >
                            </a>
                            <div className={`${shared.ID}__product__details`}>
                                <a href={this.state.products[0].url} className={`${shared.ID}__product__details__title`}>
                                    {this.state.products[0].name}
                                </a>
                                <div className={`${shared.ID}__product__details__rating`}>
                                    <img className={`${shared.ID}__product__details__rating__img`} src='https://ucds.ams3.digitaloceanspaces.com/avmig/C1D546D2C3D53B8085B3D41040A757F0A45D1949C2A39BE6917BE353A9949D6C.png'/>
                                    <span className={`${shared.ID}__product__details__rating__text`}>{this.state.products[0].reviews} reviews</span>
                                </div>
                                <div className={`${shared.ID}__product__details__price`}>
                                    <span>{this.state.products[0].price}</span>
                                </div>
                                {!this.state.products[0].outOfStock ? (
                                  <div className={`${shared.ID}__product__details__ctas`}>
                                      <div className={`${shared.ID}__product__details__ctas__qty`}>
                                          <span onClick={() => {
                                              this.handleQty(1, 'decrease');
                                          }} className={`${shared.ID}__product__details__ctas__qty__btn`}>-</span>
                                          <span>{this.state.productQty1}</span>
                                          <span onClick={() => {
                                              this.handleQty(1, 'increment');
                                          }} className={`${shared.ID}__product__details__ctas__qty__btn`}>+</span>
                                      </div>
                                      <div className={`${shared.ID}__product__details__ctas__add`}
                                          onClick={()=>{this.addToBag(this.state.products[0].id, this.state.productQty1)}}
                                      >
                                          <span btn-ref={this.state.products[0].id}>Add to basket</span>
                                      </div>
                                  </div>
                                ) : (
                                  <div className={`${shared.ID}__product__details__ctas xoos`}>Out of Stock</div>
                                )}
                            </div> 
                        </div>
                        <div className={`${shared.ID}__product`}>
                            <a href={this.state.products[1].url} className={`${shared.ID}__product__img`}
                                style={{backgroundImage: `url(${this.state.products[1].img})`}}
                            >
                            </a>
                            <div className={`${shared.ID}__product__details`}>
                                <a href={this.state.products[1].url} className={`${shared.ID}__product__details__title`}>
                                    {this.state.products[1].name}
                                </a>
                                <div className={`${shared.ID}__product__details__rating`}>
                                    <img className={`${shared.ID}__product__details__rating__img`} src='https://ucds.ams3.digitaloceanspaces.com/avmig/C1D546D2C3D53B8085B3D41040A757F0A45D1949C2A39BE6917BE353A9949D6C.png'/>
                                    <span className={`${shared.ID}__product__details__rating__text`}>{this.state.products[1].reviews} reviews</span>
                                </div>
                                <div className={`${shared.ID}__product__details__price`}>
                                    <span>{this.state.products[1].price}</span>
                                </div>
                                {!this.state.products[1].outOfStock ? (
                                  <div className={`${shared.ID}__product__details__ctas`}>
                                      <div className={`${shared.ID}__product__details__ctas__qty`}>
                                          <span onClick={() => {
                                              this.handleQty(2, 'decrease');
                                          }} className={`${shared.ID}__product__details__ctas__qty__btn`}>-</span>
                                          <span>{this.state.productQty2}</span>
                                          <span onClick={() => {
                                              this.handleQty(2, 'increment');
                                          }} className={`${shared.ID}__product__details__ctas__qty__btn`}>+</span>
                                      </div>
                                      <div className={`${shared.ID}__product__details__ctas__add`}
                                          onClick={()=>{this.addToBag(this.state.products[1].id, this.state.productQty2)}}
                                      >
                                          <span btn-ref={this.state.products[1].id}>Add to basket</span>
                                      </div>
                                  </div>
                                ) : (
                                  <div className={`${shared.ID}__product__details__ctas xoos`}>Out of Stock</div>
                                )}
                            </div> 
                        </div>
                        <div className={`${shared.ID}__product`}>
                            <a href={this.state.products[2].url} className={`${shared.ID}__product__img`}
                                style={{backgroundImage: `url(${this.state.products[2].img})`}}
                            >
                            </a>
                            <div className={`${shared.ID}__product__details`}>
                                <a href={this.state.products[2].url} className={`${shared.ID}__product__details__title`}>
                                    {this.state.products[2].name}
                                </a>
                                <div className={`${shared.ID}__product__details__rating`}>
                                    <img className={`${shared.ID}__product__details__rating__img`} src='https://ucds.ams3.digitaloceanspaces.com/avmig/C1D546D2C3D53B8085B3D41040A757F0A45D1949C2A39BE6917BE353A9949D6C.png'/>
                                    <span className={`${shared.ID}__product__details__rating__text`}>{this.state.products[2].reviews} reviews</span>
                                </div>
                                <div className={`${shared.ID}__product__details__price`}>
                                    <span>{this.state.products[2].price}</span>
                                </div>
                                {!this.state.products[2].outOfStock ? (
                                  <div className={`${shared.ID}__product__details__ctas`}>
                                      <div className={`${shared.ID}__product__details__ctas__qty`}>
                                          <span onClick={() => {
                                              this.handleQty(3, 'decrease');
                                          }} className={`${shared.ID}__product__details__ctas__qty__btn`}>-</span>
                                          <span>{this.state.productQty3}</span>
                                          <span onClick={() => {
                                              this.handleQty(3, 'increment');
                                          }} className={`${shared.ID}__product__details__ctas__qty__btn`}>+</span>
                                      </div>
                                      <div className={`${shared.ID}__product__details__ctas__add`}
                                          onClick={()=>{this.addToBag(this.state.products[2].id, this.state.productQty3)}}
                                      >
                                          <span btn-ref={this.state.products[2].id}>Add to basket</span>
                                      </div>
                                  </div>
                                ) : (
                                  <div className={`${shared.ID}__product__details__ctas xoos`}>Out of Stock</div>
                                )}
                            </div> 
                        </div>
                        <div className={`${shared.ID}__product`}>
                            <a href={this.state.products[3].url} className={`${shared.ID}__product__img`}
                                style={{backgroundImage: `url(${this.state.products[3].img})`}}
                            >
                            </a>
                            <div className={`${shared.ID}__product__details`}>
                                <a href={this.state.products[3].url} className={`${shared.ID}__product__details__title`}>
                                    {this.state.products[3].name}
                                </a>
                                <div className={`${shared.ID}__product__details__rating`}>
                                    <img className={`${shared.ID}__product__details__rating__img`} src='https://ucds.ams3.digitaloceanspaces.com/avmig/C1D546D2C3D53B8085B3D41040A757F0A45D1949C2A39BE6917BE353A9949D6C.png'/>
                                    <span className={`${shared.ID}__product__details__rating__text`}>{this.state.products[3].reviews} reviews</span>
                                </div>
                                <div className={`${shared.ID}__product__details__price`}>
                                    <span>{this.state.products[3].price}</span>
                                </div>
                                {!this.state.products[3].outOfStock ? (
                                  <div className={`${shared.ID}__product__details__ctas`}>
                                      <div className={`${shared.ID}__product__details__ctas__qty`}>
                                          <span onClick={() => {
                                              this.handleQty(4, 'decrease');
                                          }} className={`${shared.ID}__product__details__ctas__qty__btn`}>-</span>
                                          <span>{this.state.productQty4}</span>
                                          <span onClick={() => {
                                              this.handleQty(4, 'increment');
                                          }} className={`${shared.ID}__product__details__ctas__qty__btn`}>+</span>
                                      </div>
                                      <div className={`${shared.ID}__product__details__ctas__add`}
                                          onClick={()=>{this.addToBag(this.state.products[3].id, this.state.productQty4)}}
                                      >
                                          <span btn-ref={this.state.products[3].id}>Add to basket</span>
                                      </div>
                                  </div>
                                ) : (
                                  <div className={`${shared.ID}__product__details__ctas xoos`}>Out of Stock</div>
                                )}
                            </div> 
                        </div>
                    </div>
                ) : null }
            </div>
        )
    }
};
