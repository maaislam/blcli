import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';

export default class GardensLandscaping extends Component {
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
                    events.send(shared.ID, 'gardens-landscaping-top-section-click')
                }} className={shared.ID + `__categories__bot__main`}>
                    <a href='/product/gardens-and-landscaping/paving-and-walling/c/1500121/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363469.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Paving & Walling
                    </a>
                    <a href='/product/gardens-and-landscaping/sheds-and-storage/garden-sheds/c/1500134/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363473.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Sheds & Storage
                    </a>
                    <a href='/product/gardens-and-landscaping/fencing-and-trellis/fence-panels/c/1500100/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363477.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Fence Panels
                    </a>
                    <a href='/product/building-materials/aggregates/decorative-stones-and-gravel/c/1500053/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363478.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Decorative Stones & Gravel
                    </a>
                </div>
                <div onClick={() => {
                    events.send(shared.ID, 'gardens-landscaping-bottom-section-click')
                }} className={shared.ID + `__categories__bot__sub--1`}>
                    <a href='/product/gardens-and-landscaping/decking/c/1500107/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Decking
                    </a>
                    <a href='/product/gardens-and-landscaping/driveways/c/1500116/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Driveways
                    </a>
                    <a href='/product/gardens-and-landscaping/garden-buildings-and-features/c/1513003/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Garden Buildings
                    </a>
                    <a href='/product/gardens-and-landscaping/lawns-planting-and-growing/c/1530000/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Lawns, Planting & Growing
                    </a>
                    <a href='/product/gardens-and-landscaping/gates-and-railings/timber-gates/c/1500112/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Gates & Railing
                    </a>
                </div>
                <div onClick={() => {
                    events.send(shared.ID, 'gardens-landscaping-bottom-section-click')
                }} className={shared.ID + `__categories__bot__sub--2`}>
                    <a href='/product/gardens-and-landscaping/garden-power-tools/c/1570000/' className={shared.ID + `__categories__bot__sub--2__category`}>
                        Garden Power Tools
                    </a>
                    <a href='/product/timber-and-sheet-materials/timber-sleepers/c/1500128/' className={shared.ID + `__categories__bot__sub--2__category`}>
                        Timber Sleepers
                    </a>
                    {/* <div className={shared.ID + `__categories__bot__sub--2__category`}>
                        Building Metalwork
                    </div> */}
                    <a href='/product/gardens-and-landscaping/c/1500098/' className={shared.ID + `__categories__bot__sub--2__cta`}>
                        View All Gardens and Landscaping
                    </a>
                </div>
            </div>
        )
    }
}