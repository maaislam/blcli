import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.bodyText .addressText',
], () => {
  const storeName = document.querySelector('.bodyText .addressText').textContent.replace(/^\s+|\s+$/g, '');
  const regex = /(Aberdeen - Holburn Street|Aberdeen - Northern Road|Aberdeen - Summerhill Court|Ayr|Dundee - East|Edinburgh - Fountainbridge|Edinburgh - Leith Walk|Edinburgh - Newington|Edinburgh - Sighthill|Falkirk|Glenrothes|Kilmarnock|Glasgow - Rutherglen|Kirkcaldy|Andover|Basingstoke|Bournemouth - Holdenhurst Road|Bournemouth - Wimborne Road|Brighton - Lewes Road|Brighton - Preston Road|Broadstone|Canterbury|Chichester|Christchurch|Crawley - Gossops Parade|Dover|Eastbourne|Eastleigh|Fareham|Folkestone|Hastings|Herne Bay|Hove|Maidstone|Peacehaven|Poole|Portsmouth|Salisbury|Sittingbourne|Southampton - Shirley|Southampton - Thornhill Park Road|Southampton - Portswood|Worthing)/gi;
  if (storeName.match(regex)) {
    Experiment.init();
  }
});
