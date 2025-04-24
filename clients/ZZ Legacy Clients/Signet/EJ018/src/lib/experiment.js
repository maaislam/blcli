/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import BreadcrumbBar from './components/breadcrumbBar';

const activate = () => {
  setup();

  const breadcrumbs = new BreadcrumbBar();
};

export default activate;
