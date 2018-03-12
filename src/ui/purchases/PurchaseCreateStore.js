import { EventEmitter } from 'events';
import PoSDispatcher from '../PoSDispatcher';
import ActionTypes from '../ActionTypes';

class PurchaseCreateStore extends EventEmitter {
  constructor() {
    super();
    this.CHANGE_EVENT = 'CHANGE';

    this.state = {
      contents: [],
      totalCost: 0
    };
  }

  emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }

  addProduct(product, provider, quantity, cost, price) {
    this.state.contents.push({
      product,
      provider,
      quantity,
      cost,
      price
    });

    this.state.totalCost += cost * quantity;
    this.emitChange();
  }

  setPaymentInvestment(amount) {
    this.state.paymentInvestment = amount;
  }

  setPaymentReinvestment(amount) {
    this.state.paymentReinvestment = amount;
  }

  getState() {
    return this.state;
  }
}

const storeInstance = new PurchaseCreateStore();
storeInstance.dispatchToken = PoSDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.PURCHASE.ADD_CONTENT:
      storeInstance.addProduct(
        action.product,
        action.provider,
        action.quantity,
        action.cost,
        action.price
      );
      break;

    case ActionTypes.PURCHASE.CHANGE_PAYMENT_AS_INVESTMENT:
      storeInstance.setPaymentInvestment(action.amount);
      break;

    case ActionTypes.PURCHASE.CHANGE_PAYMENT_AS_REINVESTMENT:
      storeInstance.setPaymentReinvestment(action.amount);
      break;

    default:
      // Do nothing
  }
});

export default storeInstance;
