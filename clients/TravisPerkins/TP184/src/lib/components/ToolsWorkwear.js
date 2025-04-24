import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';

export default class ToolsWorkwear extends Component {
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
                    events.send(shared.ID, 'tools-workwear-top-section-click')
                }} className={shared.ID + `__categories__bot__main`}>
                    <a href='/product/tools-and-workwear/power-tools/c/1500471/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363530.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Power Tools
                    </a>
                    <a href='/product/tools-and-workwear/hand-tools/c/1500499/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363531.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Hand Tools
                    </a>
                    <a href='/product/tools-and-workwear/safety-workwear/c/1500451/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363532.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Safety Workwear
                    </a>
                    <a href='/product/tools-and-workwear/site-equipment/c/1500467/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363533.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Site Equipment
                    </a>
                </div>
                <div onClick={() => {
                    events.send(shared.ID, 'tools-workwear-bottom-section-click')
                }} className={shared.ID + `__categories__bot__sub--1`}>
                    <a href='/product/tools-and-workwear/tools-storage-and-workbenches/tool-boxes/c/1500528/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Tools, Storage & Workbenches
                    </a>
                    <a href='/product/tools-and-workwear/tarpaulins-and-rubble-sacks/c/1501000/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Tarpaulins & Rubble Sacks
                    </a>
                    <a href='/product/tools-and-workwear/ladders/c/1500533/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Ladders
                    </a>
                    <a href='/product/tools-and-workwear/safety/c/1558001/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Safety
                    </a>
                    <a href='/product/tools-and-workwear/site-lighting/c/1500598/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Site Lighting
                    </a>
                </div>
                <div onClick={() => {
                    events.send(shared.ID, 'tools-workwear-bottom-section-click')
                }} className={shared.ID + `__categories__bot__sub--2`}>
                    <a href='/product/tools-and-workwear/automotive/c/1500537/' className={shared.ID + `__categories__bot__sub--2__category`}>
                        Automotive
                    </a>
                    <a href='/product/tools-and-workwear/wheelbarrows-and-hand-trucks/c/1500525/' className={shared.ID + `__categories__bot__sub--2__category`}>
                        Wheelbarrows
                    </a>
                    {/* <a className={shared.ID + `__categories__bot__sub--2__category`}>
                        Building Metalwork
                    </a> */}
                    <a href='/product/tools-and-workwear/c/1500450/' className={shared.ID + `__categories__bot__sub--2__cta`}>
                        View All Tools & Workwear
                    </a>
                </div>
            </div>
        )
    }
}