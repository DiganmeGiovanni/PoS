const ActionTypes = {
  BRANDS: {
    PAGE: 'brands/page',
  },
  MEASUREMENT_UNITS: {
    PAGE: 'measurement_units/page',
  },
  PRODUCTS: {
    PAGE: 'products/page',
    SET_END_DATE: 'products/set_end_date'
  },
  PROVIDERS: {
    LIST: 'providers/list',
    PAGE: 'providers/page',
  },
  PURCHASE: {
    ADD_CONTENT: 'purchase/add_content',
    CHANGE_PAYMENT_AS_REINVESTMENT: 'purchase/change_reinvestment',
    CHANGE_PAYMENT_AS_INVESTMENT: 'purchase/change_investment',
    CHANGE_DATE: 'purchase/change_date',
    SAVE: 'purchase/save',
    SET_REDIRECT_AS_COMPLETED: 'purchase/set_redirect_as_completed',

    LIST: 'purchase/list',
    FETCH: 'purchase/fetch',
  },
  PURCHASE_PRICES: {
    FETCH_P_MODEL: 'purchase_prices/fetch_p_model'
  },
  SALES: {
    ADD_CONTENT: 'sales/add_content',
    CHANGE_DATE: 'sales/change_date',
    CHANGE_SELF_CONSUMPTION: 'sales/self_consumption',
    SAVE: 'sales/save',
    SET_REDIRECT_AS_COMPLETED: 'sales/set_redirect_as_completed',

    LIST: 'sales/list',
    FETCH: 'sales/fetch'
  }
};

export default ActionTypes;
