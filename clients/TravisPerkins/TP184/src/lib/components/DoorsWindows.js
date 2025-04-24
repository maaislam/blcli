import { h, render, Component } from "preact";
import shared from "../shared";
import { pollerLite } from "../../../../../../lib/uc-lib";
import { events } from '../../../../../../lib/utils';

export default class DoorsWindows extends Component {
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
                    events.send(shared.ID, 'doors-windows-top-section-click')
                }} className={shared.ID + `__categories__bot__main`}>
                    <a href='/product/doors-windows-and-joinery/internal-doors/c/1500153/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363517.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Internal Doors
                    </a>
                    <a href='/product/doors-windows-and-joinery/exterior-doors/c/1500160/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363518.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        External Doors
                    </a>
                    <a href='/product/doors-windows-and-joinery/windows/c/1500200/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363519.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Windows
                    </a>
                    <a href='/product/doors-windows-and-joinery/ironmongery-and-security/c/1500168/' style={{
                        backgroundImage: `url("http://sb.monetate.net/img/1/581/3363520.png")`,
                    }} className={shared.ID + `__categories__bot__main__category`}>
                        Ironmongery & Security
                    </a>
                </div>
                <div onClick={() => {
                    events.send(shared.ID, 'doors-windows-bottom-section-click')
                }} className={shared.ID + `__categories__bot__sub--1`}>
                    <a href='/product/doors-windows-and-joinery/roof-windows/velux-roof-windows-and-flashings/c/1520002/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Roof Windows
                    </a>
                    <a href='/product/doors-windows-and-joinery/door-frames-linings-and-casings/c/1500177/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Frames, Linings & Casings
                    </a>
                    <a href='/product/doors-windows-and-joinery/fire-doors/c/1500165/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Fire Doors
                    </a>
                    <a href='/product/doors-windows-and-joinery/garage-doors/c/1512000/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Garage Doors
                    </a>
                    <a href='/product/doors-windows-and-joinery/stairs/stair-accessories/c/1500207/' className={shared.ID + `__categories__bot__sub--1__category`}>
                        Stairs
                    </a>
                </div>
                <div onClick={() => {
                    events.send(shared.ID, 'doors-windows-bottom-section-click')
                }} className={shared.ID + `__categories__bot__sub--2`}>
                    <a href='/product/doors-windows-and-joinery/worktops-and-accessories/c/1502005/' className={shared.ID + `__categories__bot__sub--2__category`}>
                        Worktops & Accessories
                    </a>
                    {/* <a className={shared.ID + `__categories__bot__sub--2__category`}>
                        Lintels
                    </a>
                    <a className={shared.ID + `__categories__bot__sub--2__category`}>
                        Building Metalwork
                    </a> */}
                    <a href='/product/doors-windows-and-joinery/c/1500152/' className={shared.ID + `__categories__bot__sub--2__cta`}>
                        View All Doors, Windows & Joinery
                    </a>
                </div>
            </div>
        )
    }
}