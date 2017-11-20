import ActionTypes from './ActionTypes';
import PosDispatcher from './PoSDispatcher';

const PoSActions = {
  brands: {
    page(pageNumber, pageSize) {
      PosDispatcher.dispatch({
        type: ActionTypes.BRANDS.PAGE,
        pageNumber,
        pageSize,
      });
    },
  },
  provider: {
    page(pageNumber, pageSize) {
      PosDispatcher.dispatch({
        type: ActionTypes.PROVIDERS.PAGE,
        pageNumber,
        pageSize,
      });
    },
  },
};

export default PoSActions;
