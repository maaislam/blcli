import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';

export default class BuildingMaterials extends Component {
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
                    events.send(shared.ID, 'building-materials-top-section-click')
                }} className={shared.ID + `__categories__bot__main`}>
                    <a href='/product/building-materials/aggregates/c/1500039/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3345767.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Aggregates
                    </a>
                    <a href='/product/building-materials/bricks-and-blocks/c/1500030/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3345770.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Bricks & Blocks
                    </a>
                    <a href='/product/building-materials/plaster-and-plasterboards/c/1500220/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3345774.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Plaster & Plasterboard
                    </a>
                    <a href='/product/building-materials/civils-and-drainage/c/1500054/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3345776.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Civils & Drainage
                    </a>
                </div>
                <div onClick={() => {
                    events.send(shared.ID, 'building-materials-bottom-section-click')
                }} className={shared.ID + `__categories__bot__sub--1`}>
                    <a href='/product/building-materials/cements/c/1591033/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Cements
                    </a>
                    <a href='/product/building-materials/insulation/c/1500212/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Insulation
                    </a>
                    <a href='/product/building-materials/building-chemicals/c/1529000/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Building Chemicals
                    </a>
                    <a href='/product/building-materials/roofing/c/1500072/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Roofing
                    </a>
                    <a href='/product/building-materials/guttering/c/1500083/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Guttering
                    </a>
                </div>
                <div onClick={() => {
                    events.send(shared.ID, 'building-materials-bottom-section-click')
                }} className={shared.ID + `__categories__bot__sub--2`}>
                    <a href='/product/building-materials/render/c/1500041/' className={shared.ID + `__categories__bot__sub--2__category`}>
                        Render
                    </a>
                    <a href='/product/building-materials/lintels/c/1500068/' className={shared.ID + `__categories__bot__sub--2__category`}>
                        Lintels
                    </a>
                    <a href='/product/building-materials/builders-metalwork/c/1500090/' className={shared.ID + `__categories__bot__sub--2__category`}>
                        Building Metalwork
                    </a>
                    <a href='/product/building-materials/c/1500029/' className={shared.ID + `__categories__bot__sub--2__cta`}>
                        View All Building Materials
                    </a>
                </div>
            </div>
        )
    }
}