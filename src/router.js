/**
 *
 * ROUTES
 *
 */

//views
import initView from './views/init/init';

export default {
  View(config) {
    switch (config.page) {
      case 'init':
        initView.init();
        break;
      default:
        initView.init();
        break;
    }
  },
};
