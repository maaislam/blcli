import { h, render, Component } from 'preact';
import { useState, useEffect } from "preact/hooks";

export const Tooltip = (name, closeFunc) => {
    let html = null;

    switch (name) {
        case 'ridesup':
            html = 
                <div className="BV-tooltip">
                    <picture class="c-picture">
                        <source srcset="//images.ctfassets.net/bz0fvtkbk5r1/3yompgnxHulv7zinWYitrB/4e40f10217dbd8280878d5cf419dd6a4/Bad-back-band.jpg?q=80&amp;w=868&amp;fm=webp" type="image/webp" />
                        <img alt="Underband riding up your back?" src="//images.ctfassets.net/bz0fvtkbk5r1/3yompgnxHulv7zinWYitrB/4e40f10217dbd8280878d5cf419dd6a4/Bad-back-band.jpg?q=80&amp;w=868" class="c-image" />
                    </picture>
                    <p>If your backband looks like this, it’s riding up. Your back band should be firm (but comfortable), and should sit horizontally around your body without riding up or digging in.</p>
                    <button className="BV-button BV-show" onClick={closeFunc}>Got It</button>
                </div>
            ;
            break;
        case 'underwires':
            html = 
                <div className="BV-tooltip">
                    <picture class="c-picture">
                        <source srcset="//images.ctfassets.net/bz0fvtkbk5r1/4n6OpApyaYgLuNDKYfQE1G/0ec0d0861573be987e66ba54541a5fb1/Boob-showing-underband.jpg?q=80&amp;w=868&amp;fm=webp" type="image/webp" />
                        <img alt="Why do my boobs come out of the bottom of my bra?" src="//images.ctfassets.net/bz0fvtkbk5r1/4n6OpApyaYgLuNDKYfQE1G/0ec0d0861573be987e66ba54541a5fb1/Boob-showing-underband.jpg?q=80&amp;w=868" class="c-image" />
                    </picture>
                    <p>If your underwires look like this, they’re lifting away from your body. The underwires in your bra should sit on flat on your ribcage (not your boobs!) all the way round to your armpits. The wires between your boobs should lie flat against your chest without digging in, rubbing or poking out.</p>
                    <button className="BV-button BV-show" onClick={closeFunc}>Got It</button>
                </div>
            ;
            break;
        case 'sitflat':
            html = 
                <div className="BV-tooltip">
                    <picture class="c-picture">
                        <source srcset="//images.ctfassets.net/bz0fvtkbk5r1/1GB61ApV16N9x1a0kC4IuY/1bd542d24eff98683ce7d804dccfcc3f/Shadow-band.jpg?q=80&amp;w=868&amp;fm=webp" type="image/webp" />
                        <img alt="Why doesn't the centre of my bra lay flat against my chest?" src="//images.ctfassets.net/bz0fvtkbk5r1/1GB61ApV16N9x1a0kC4IuY/1bd542d24eff98683ce7d804dccfcc3f/Shadow-band.jpg?q=80&amp;w=868" class="c-image" />
                    </picture>
                    <p>If the wires look like this, they’re sitting on your boobs rather than your breastbone. The wires should sit flat between your boobs</p>
                    <button className="BV-button BV-show" onClick={closeFunc}>Got It</button>
                </div>
            ;
            break;
        case 'pressing':
            html = 
                <div className="BV-tooltip">
                    <picture class="c-picture">
                        <source srcset="//images.ctfassets.net/bz0fvtkbk5r1/1za2qikaEnnIn9kT63fAg8/adc71ebce1ef178461c6d89f0569a1e6/Wires-digging-in.jpg?q=80&amp;w=868&amp;fm=webp" type="image/webp" />
                        <img alt="Why does the underwire in my bra hurt?" src="//images.ctfassets.net/bz0fvtkbk5r1/1za2qikaEnnIn9kT63fAg8/adc71ebce1ef178461c6d89f0569a1e6/Wires-digging-in.jpg?q=80&amp;w=868" class="c-image" />
                    </picture>
                    <p>If your underwire looks like this, it’s sitting against your breast tissue (which can hurt!) – it should sit under your armpit, fully encasing your boob</p>
                    <button className="BV-button BV-show" onClick={closeFunc}>Got It</button>
                </div>
            ;
            break;
        case 'wrinkling':
            html = 
                <div className="BV-tooltip">
                    <picture class="c-picture">
                        <source srcset="//images.ctfassets.net/bz0fvtkbk5r1/3ayysznFspkRjZ6KrP0QMo/0966b6d3a613ced610048dd058b31573/Wrinkling.jpg?q=80&amp;w=868&amp;fm=webp" type="image/webp" />
                        <img alt="Why do my bra cups wrinkle?" src="//images.ctfassets.net/bz0fvtkbk5r1/3ayysznFspkRjZ6KrP0QMo/0966b6d3a613ced610048dd058b31573/Wrinkling.jpg?q=80&amp;w=868" class="c-image" />
                    </picture>
                    <p>If your bra cups are wrinkling, this is a sign that there is too much room in the cups</p>
                    <button className="BV-button BV-show" onClick={closeFunc}>Got It</button>
                </div>
            ;
            break;
        default:
            html = null;
            break;
    }

    if (html) {
        return html;
    }
};