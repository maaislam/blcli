import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';

export default class MobileTimber extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            panel: 1,
            panel1: 'Building Materials',
            panel2: 'Gardens and Landscaping',
            panel3: 'Timber',
            visitedCats: [],
            isExpanded: false,
            viewMore: false,
        };

        this.expandMenu = this.expandMenu.bind(this);
        this.viewMore = this.viewMore.bind(this);
    };

    componentWillMount() {

    };

    expandMenu() {
        if (this.state.isExpanded === false) {
            this.setState({
                isExpanded: true
            })
            events.send(shared.ID, 'timber-expanded');
        } else {
            this.setState({
                isExpanded: false,
                viewMore: false,
            })
        }
    };

    viewMore() {
        if (this.state.viewMore === false) {
            this.setState({
                viewMore: true
            })
            events.send(shared.ID, 'timber-view-more');
        } else {
            this.setState({
                viewMore: false,
            })
        }
    }

    render() {
        return (
            <div>
                    <div onClick={this.expandMenu} className={ this.state.isExpanded ? `${shared.ID + '__mobile__category--active'}` : `${shared.ID}__mobile__category`}>
                       <div className={shared.ID + `__mobile__category__inner`}>

                            { this.state.isExpanded ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364826.png'} />
                            ) : (
                                <img src={'http://sb.monetate.net/img/1/581/3364372.png'} />
                            )}

                            <p className={ this.state.isExpanded ? `${shared.ID}__mobile__category__inner__text--active` : `${shared.ID}__mobile__category__inner__text`}>Timber</p>

                            { this.state.isExpanded ? (
                                <img src={'http://sb.monetate.net/img/1/581/3364346.png'} />
                            ) : (
                                <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                            )}

                       </div> 
                    </div>
                    <div className={ this.state.isExpanded ? `${shared.ID + '__lower-wrap--active'}` : `${shared.ID}__lower-wrap`}>
                        { this.state.isExpanded ? (
                            <div className={shared.ID + `__mobile__category__main`}>
                                <a href='/product/timber-and-sheet-materials/sawn-timber/c/1500001/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Sawn Timber</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/timber-and-sheet-materials/sheet-materials/c/1500007/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Sheet Materials</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/timber-and-sheet-materials/planed-timber/c/1500014/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Planed Timber</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/timber-and-sheet-materials/fencing-and-trellis/fence-panels/c/1500100/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Fence Panels</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <div onClick={this.viewMore} className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p className={shared.ID + `__mobile__category__main__item__inner__view-more`}>View more</p>
                                        { this.state.viewMore ? (
                                            <img src={'http://sb.monetate.net/img/1/581/3364353.png'} />
                                        ) : (
                                            <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : ''}
                        { this.state.viewMore ? (
                            <div className={shared.ID + `__mobile__category__main`}>
                                <a href='/product/timber-and-sheet-materials/planed-timber/c/1500014/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Planed Timber</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/timber-and-sheet-materials/cls-studwork-timber/c/1500004/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>CLS Studwork Timber</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/timber-and-sheet-materials/timber-cladding/c/1501001/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Timber Cladding</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/timber-and-sheet-materials/sawn-timber/c/1500001/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Sawn Timber</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/gardens-and-landscaping/gates-and-railings/timber-gates/c/1500112/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Gates & Railing</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/timber-and-sheet-materials/flooring/c/1500188/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Flooring</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                                <a href='/product/timber-and-sheet-materials/timber-sleepers/c/1500128/' className={shared.ID + `__mobile__category__main__item`}>
                                    <div className={shared.ID + `__mobile__category__main__item__inner`}>
                                        <p></p>
                                        <p>Timber Sleepers</p>
                                        <img src={'http://sb.monetate.net/img/1/581/3364334.png'} />
                                    </div>
                                </a>
                            </div>
                        ) : ''}
                    </div>
            </div>
        )
    }
};