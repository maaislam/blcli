import run from './experiment';
import { poller } from '../../../../lib/uc-lib';
import flicker from './flickerprevention';


flicker();
poller([
  '#password_error_message > span',
], run);
