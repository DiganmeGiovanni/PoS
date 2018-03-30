import { EventEmitter } from 'events';
import PoSDispatcher from '../../PoSDispatcher';
import ActionTypes from '../../ActionTypes';
import {Purchase} from "../../../model/entities";

class PurchaseViewStore extends EventEmitter {
  constructor() {
    super();
    this.CHANGE_EVENT = 'CHANGE';

    this.state = {
      purchase: null,
      products: [],

      isLoadingProducts: true
    }
  }

  getState() {
    return this.state;
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

  fetchPurchase(purchaseId) {
    Purchase.findById(purchaseId)
        .then(purchase => {
          this.state.purchase = purchase;
          this.emitChange();
        })
        .catch(err => {
          console.error('Purchase could not be retrieved: ' + err);
        });
  }
}

const storeInstance = new PurchaseViewStore();
storeInstance.dispatchToken = PoSDispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.PURCHASE.FETCH:
      storeInstance.fetchPurchase(action.purchaseId);
      break;
  }
});

export default storeInstance;
