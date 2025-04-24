import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';

export default class Timber extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
        };
    };

    render() {
        return (
            <div className={shared.ID + `__categories__bot`}>
                <div onClick={() => {
                    events.send(shared.ID, 'timber-top-section-click')
                }} className={shared.ID + `__categories__bot__main`}>
                    <a href='/product/timber-and-sheet-materials/sawn-timber/c/1500001/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363504.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Sawn Timber
                    </a>
                    <a href='/product/timber-and-sheet-materials/sheet-materials/c/1500007/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363505.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Sheet Materials
                    </a>
                    <a href='/product/timber-and-sheet-materials/planed-timber/c/1500014/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363504.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Planed Timber
                    </a>
                    <a href='/product/timber-and-sheet-materials/fencing-and-trellis/fence-panels/c/1500100/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363477.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Fence Panels
                    </a>
                </div>
                <div onClick={() => {
                    events.send(shared.ID, 'timber-bottom-section-click')
                }} className={shared.ID + `__categories__bot__sub--1`}>
                    <a href='/product/timber-and-sheet-materials/timber-sleepers/c/1500128/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Timber Sleepers
                    </a>
                    <a href='/product/timber-and-sheet-materials/cls-studwork-timber/c/1500004/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        CLS Studwork Timber
                    </a>
                    <a href='/product/timber-and-sheet-materials/timber-cladding/c/1501001/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Timber Cladding
                    </a>
                    <a href='/product/timber-and-sheet-materials/flooring/c/1500188/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Flooring
                    </a>
                    <a href='/product/gardens-and-landscaping/gates-and-railings/timber-gates/c/1500112/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Gates & Railings
                    </a>
                </div>
                <div onClick={() => {
                    events.send(shared.ID, 'timber-bottom-section-click')
                }} className={shared.ID + `__categories__bot__sub--2`}>
                    {/* <div className={shared.ID + `__categories__bot__sub--2__category`}>
                        Render
                    </div>
                    <div className={shared.ID + `__categories__bot__sub--2__category`}>
                        Lintels
                    </div>
                    <div className={shared.ID + `__categories__bot__sub--2__category`}>
                        Building Metalwork
                    </div> */}
                    <a href='/product/timber-and-sheet-materials/c/1500000/' className={shared.ID + `__categories__bot__sub--2__cta`}>
                        View All Timber
                    </a>
                </div>
            </div>
        )
    }
}