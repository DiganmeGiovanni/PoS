import ActionTypes from './ActionTypes';
import PosDispatcher from './PoSDispatcher';

const PoSActions = {
  provider: {
    list() {
      PosDispatcher.dispatch({
        type: ActionTypes.PROVIDERS.LIST,
      });
    },

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
