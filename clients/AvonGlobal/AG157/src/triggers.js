import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(['.ProductList', () => document.querySelectorAll('.ProductList .ProductListCell').length > 10], activate);
