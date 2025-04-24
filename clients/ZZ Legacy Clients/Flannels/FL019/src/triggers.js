import run from './experiment';
// import { poller } from '../../../../lib/uc-lib';
import flicker from './flickerprevention';


flicker();
// poller([
//   '#divContinueSecurelyTop',
//   '#TotalValue',
//   '#SubtotalRow',
//   '#TotalRow',
//   '.currency-gbp',
// ], run);

run();
