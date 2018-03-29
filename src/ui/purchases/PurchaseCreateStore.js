import { EventEmitter } from 'events';
import PoSDispatcher from '../PoSDispatcher';
import ActionTypes from '../ActionTypes';
import {Existence, Purchase, PurchasePrice} from "../../model/entities";
import ProductService from '../../services/ProductService';

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
      Purchase.build({
        reinvestment: this.state.paymentReinvestment,
        investment: this.state.paymentInvestment,
        date: this.state.date
      })
      .save()
      .then(purchase => this.saveContents(purchase))
      .catch(err => {
        console.error('Purchase creation has failed: ' + err);
      });
    }
  }

  /** Register existences for each purchased product */
  saveContents(purchase) {
    for (let content of this.state.contents) {

      // Find last purchase price
      ProductService.lastPPrice(content.product.id, this.state.date, lastPrice => {
        if (lastPrice === null || lastPrice.price !== content.cost) {
          PurchasePrice.build({
            price: content.cost,
            measurementUnitId: 1,
            providerId: content.provider.id,
            productId: content.product.id,
            date: this.state.date,
          })
          .save()
          .then(purchasePrice => {
            this.saveExistences(
              content.product.id,
              purchase.id,
              purchasePrice.id,
              content.quantity
            );
          });
        } else {
          this.saveExistences(
            content.product.id,
            purchase.id,
            lastPrice.id,
            content.quantity
          );
        }
      });
    }
  }

  /** Creates given number of existences */
  saveExistences(productId, purchaseId, purchasePriceId, quantity) {
    let data = [];
    for (let i = 0; i < quantity; i++) {
      data.push({
        productId: productId,
        purchaseId: purchaseId,
        purchasePriceId: purchasePriceId
      });
    }

    Existence
      .bulkCreate(data)
      .then(() => {
        console.log(quantity + ' existences created');
      })
      .catch(err => {
        console.error('Existences could not be created: ' + err);
      });
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
