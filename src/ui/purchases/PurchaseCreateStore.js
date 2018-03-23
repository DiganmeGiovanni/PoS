import { EventEmitter } from 'events';
import PoSDispatcher from '../PoSDispatcher';
import ActionTypes from '../ActionTypes';

class PurchaseCreateStore extends EventEmitter {
  constructor() {
    super();
    this.CHANGE_EVENT = 'CHANGE';

    this.state = {
      contents: [],
      totalCost: 0,
      date: new Date(),
      paymentInvestment: 0,
      paymentReinvestment: 0,
      validationErrors: {
        contents: '',
        date: '',
        paymentInvestment: ''
      }
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

  setDate(date) {
    this.state.date = date;
    this.emitChange();
  }

  setPaymentInvestment(amount) {
    this.state.paymentInvestment = amount;
  }

  setPaymentReinvestment(amount) {
    this.state.paymentReinvestment = amount;
  }

  save() {
    if (this.validate()) {
      // TODO Store order
    }
  }

  validate() {
    let formOk = true;

    if (this.state.contents.length === 0) {
      formOk = false;
      this.state.validationErrors.contents = 'Agregue al menos un producto';
    } else {
      this.state.validationErrors.contents = '';
    }

    let payment = this.state.paymentInvestment;
    payment += this.state.paymentReinvestment;
    if (payment !== this.state.totalCost) {
      formOk = false;
      this.state
        .validationErrors
        .paymentInvestment = 'El monto pagado no coincide con el costo de la' +
            ' compra';
    } else {
      this.state.validationErrors.paymentInvestment = '';
    }

    this.emitChange();
    return formOk;
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

    case ActionTypes.PURCHASE.CHANGE_DATE:
      storeInstance.setDate(action.date);
      break;

    case ActionTypes.PURCHASE.SAVE:
      storeInstance.save();
      break;
  }
});

export default storeInstance;
