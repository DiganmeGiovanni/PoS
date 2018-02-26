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
  measurementUnits: {
    page(pageNumber, pageSize) {
      PosDispatcher.dispatch({
        type: ActionTypes.MEASUREMENT_UNITS.PAGE,
        pageNumber,
        pageSize,
      });
    },
  },
  productModels: {
    page(pageNumber, pageSize) {
      PosDispatcher.dispatch({
        type: ActionTypes.PRODUCT_MODELS.PAGE,
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
  purchasePrices: {
    fetchProductModel(pModelId) {
      PosDispatcher.dispatch({
        type: ActionTypes.PURCHASE_PRICES.FETCH_P_MODEL,
        pModelId
      });
    }
  }
};

export default PoSActions;
