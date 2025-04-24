import settings from '../settings';
import Component from '../Component';
import { counties } from '../data';
import { events } from '../../../../../../lib/utils';

/**
 * Personalised Toggle
 */
export default class CountySearch extends Component {
  /**
   * @constructor
   */
  constructor(updater) {
    super(updater);

    // Defaults
    this.state = {
      chosenCounty: '',
    };

    // Init
    this.init();

    // Will render..
    this.update();
  }

  /**
   * Helper County select
   */
  getCounties() {
    return Object.keys(counties).map((c) => ({ name: c, id: c.toLowerCase().replace(/\s/g, '') })) || [];
  }

  /**
   * Helper Get county info by county name
   */
  getCountyInfoByCountyName(name) {
    return counties[name];
  }

  afterRender() { }

  init() { }

  handleChange(e) {
    e = e || window.event;
    const target = e.target || e.srcElement;

    this.state.chosenCounty = target.value || '';

    window.dataLayer.push({ event: `${settings.ID}-did-change-select` });

    this.update();

    events.send(
      `${settings.ID}-${settings.VARIATION}`,
      'did-choose-select',
      this.state.chosenCounty,
      {
        sendOnce: true
      }
    );
  }

  handleLocationClick() {
    events.send(
      `${settings.ID}-${settings.VARIATION}`,
      'did-click-a-county',
      this.state.chosenCounty,
      {
        sendOnce: true
      }
    );
  }

  render() {
    let labelMessaging = 'With 100+ branches nationwide, we provide visiting and live-in home care local to you.';

    let resultsMessaging = '';

    if(this.state.chosenCounty) {
      const countyInfo = this.getCountyInfoByCountyName(this.state.chosenCounty);

      let resultsList = '';
      countyInfo.locations.forEach((loc) => {
        resultsList += `<li><a onclick=${this.register('handleLocationClick()')} href="${loc.link}">${loc.name}</a></li>`;
      });

      const phoneNumber = document.querySelector('#top-nav .phone-number');
      let phoneText = '03300 376 958';
      if(phoneNumber) {
        phoneText = phoneNumber.innerText.trim();
      }

      const numLocations = countyInfo.locations.length;

      if(countyInfo && countyInfo.alternativeMessage) {
        labelMessaging = `
          We have ${numLocations} branch${numLocations > 1 ? 'es' : ''} in the
          neighbouring counties who may be able to provide
          care in your area.
        `;

        resultsMessaging = `
          <p>
            Click on your nearest city in the neighbouring counties to learn more about
            how that branch can support you.
          </p>
          <ul class="results">
            ${resultsList}
          </ul>
          <p class="${settings.ID}-extra-margin-top">If these branches are not convenient or you are not sure what type of care you need, feel free to give us a call on 
            <a href="tel:${phoneText.replace(/\s/g, '')}">${phoneText}</a> or speak to us on live chat
            to see how we can help.</p>
        `;

      } else if(countyInfo && countyInfo.countyPage) {
        labelMessaging = `
          We have ${numLocations} branch${numLocations > 1 ? 'es' : ''} in the
          neighbouring counties who may be able to provide
          care in your area.
        `;
        resultsMessaging = `
          <p>
            If you are interested in <a href="/live-in-care/" class="${settings.ID}-texthighlight"
              >live in care</a>, please go to the county page.
          </p>

          <ul class="results extra-bottom-margin">
            <li><a href="${countyInfo.countyPage}">${this.state.chosenCounty}</a></li>
          </ul>

          <p>
            If you are interested in <a href="/visiting-care/" class="${settings.ID}-texthighlight"
              >visiting care</a>, please click on your nearest city or town in the
              neighbouring counties to learn more about how that branch can support you.
          </p>

          <ul class="results">
            ${resultsList}
          </ul>

          <p class="${settings.ID}-extra-margin-top">If these branches are not convenient or you are not sure what type of care you need, feel free to give us a call on 
            <a href="tel:${phoneText.replace(/\s/g, '')}">${phoneText}</a> or speak to us on live chat
            to see how we can help.</p>
        `;
      } else if(countyInfo && !countyInfo.alternativeMessage) {
        labelMessaging = `
          We have ${numLocations} branch${numLocations > 1 ? 'es' : ''} across ${this.state.chosenCounty}
          that can provide home care across the entire county.
        `;

        resultsMessaging = `
          <p>Click on any city or town below to learn more about how that branch can support you.</p>
          <ul class="results">
            ${resultsList}
          </ul>
        `;
      }
    }

    let options = '<option>-- Select County --</option>';
    this.getCounties().forEach((county) => {
      options += `<option 
        ${this.state.chosenCounty == county.name ? 'selected="selected"' : ''}
        value="${county.name}" id=${county.id}">${county.name}</option>`;
    });

    return `
      <h2><span>Search by County</span></h2>
      <div class="${settings.ID}-county-search__select-wrap row">
        <div class="col-sm-7 ${settings.ID}-county-search__messaging">
          ${labelMessaging}
        </div>
        <div class="col-sm-5 ${settings.ID}-county-search__select-col">
          <select 
            onchange=${this.register('handleChange()')}
            class="${settings.ID}-county-search__select">
            ${options}
          </select>
        </div>
      </div>
      ${resultsMessaging ? `
        <div class="${settings.ID}-county-search__results">
          ${resultsMessaging}
        </div>
      `: ''}
    `;
  }

};
