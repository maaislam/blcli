import { h, render, Component } from "preact";
import shared from "../shared";
import { events } from '../../../../../../lib/utils';

export default class DisplayComponent extends Component {
    constructor() {
        super();
        this.state = {
            productUrl: 'https://avon.uk.com/products/planet-spa-aromatherapy-beauty-sleep-pillow-mist',
            currentPrice: null,
            origPrice: null,
            imageUrl: null,
            header: 'Say goodbye to restless nights',
            text: 'Infused with mood-enhancing French lavender and chamomile essential oils, this multi-use spray delivers an instant hit of calm with every spritz.',
            title: 'Aromatherapy Beauty Sleep Pillow Mist - 100ml',
            bgImageUrl: 'https://service.maxymiser.net/cm/images-eu/avon-mas/3EB63AE40A62CAAF71776FC288623BC424738C5E5E79534FCB7631C4449A3B41.png?meta=/AV075---Glam-and-Treat-Element/av075-bg.png',
        }

        this.getProductData = this.getProductData.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount() {
        this.getProductData(this.state.productUrl);
    }

    // Functions here
    getProductData(productUrl) {
        return new Promise((resolve, reject) => {
          fetch(productUrl + '.xml').then(response => response.text()).then(data => {
            function xmlToJson(xml) {
              // Create the return object
              var obj = {};
              if (xml.nodeType == 1) { // element
                  // do attributes
                  if (xml.attributes.length > 0) {
                  obj["@attributes"] = {};
                      for (var j = 0; j < xml.attributes.length; j++) {
                          var attribute = xml.attributes.item(j);
                          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                      }
                  }
              } else if (xml.nodeType == 3) { // text
                  obj = xml.nodeValue;
              }
              // do children
              if (xml.hasChildNodes()) {
                  for(var i = 0; i < xml.childNodes.length; i++) {
                      var item = xml.childNodes.item(i);
                      var nodeName = item.nodeName;
                      if (typeof(obj[nodeName]) == "undefined") {
                          obj[nodeName] = xmlToJson(item);
                      } else {
                          if (typeof(obj[nodeName].push) == "undefined") {
                              var old = obj[nodeName];
                              obj[nodeName] = [];
                              obj[nodeName].push(old);
                          }
                          obj[nodeName].push(xmlToJson(item));
                      }
                  }
              }
              return obj;
            };
            var xml = (new DOMParser()).parseFromString(data, 'text/xml')
            var result = xmlToJson(xml);
            resolve(result.hash);
            console.log(result.hash);
            const origPrice = result.hash.variants.variant['compare-at-price']['#text'];
            const currentPrice = result.hash.variants.variant['price']['#text'];
            const imageUrl = result.hash.image.src['#text'];
            this.setState({
                origPrice: origPrice,
                currentPrice: currentPrice,
                imageUrl: imageUrl,
            }, () => {
                
            })
          });
        });
      };
    
    navigate() {
        events.send(shared.ID, 'experiment-click', this.state.productUrl);
        window.location = this.state.productUrl;
    }
      

    // Render method
    render() {
        return (
            <div onClick={this.navigate} className={shared.ID + '__product'} style={`background-image: url("${this.state.bgImageUrl}");`}>
                <h3 className={shared.ID + '__product__head'}>{this.state.header}</h3>
                <p className={shared.ID + '__product__text'}>{this.state.text}</p>
                <div className={shared.ID + '__product__content'}>
                    <div className={shared.ID + '__product__content__text'}>
                        <p className={shared.ID + '__product__content__text__title'}>{this.state.title}</p>
                        <div>
                            { this.state.currentPrice && this.state.origPrice ? (
                                <div>
                                    <p className={shared.ID + '__was'}>WAS: <span className={shared.ID + '__was__price'}>£{this.state.origPrice}</span></p>
                                    <p className={shared.ID + '__now'}>NOW: <span className={shared.ID + '__now__price'}>£{this.state.currentPrice}</span></p>
                                </div>
                            ) :  (
                                <div>
                                    <p className={shared.ID + '__now'}>NOW: <span className={shared.ID + '__now__price'}>£{this.state.currentPrice}</span></p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={shared.ID + '__product__content__image'} style={`background-image: url("${this.state.imageUrl}");`}>
                        
                    </div>
                </div>
                <div className={shared.ID + '__product__cta-wrap'}>
                    <div className={shared.ID + '__product__cta-wrap__cta'}>
                        View Product
                    </div>
                </div>
            </div>
        )
    }
}