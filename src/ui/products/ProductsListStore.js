import { EventEmitter } from 'events';
import PoSDispatcher from '../PoSDispatcher';
import ActionTypes from '../ActionTypes';
import {Brand, MeasurementUnit, Product} from '../../model/entities';

class ProductsListStore extends EventEmitter {
  constructor() {
    super();
    this.CHANGE_EVENT = 'CHANGE';

    this.activePage = {
      products: [],
      pageIdx: 0,
      pagesCount: 0,
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

  page(pageNumber, pageSize) {
    const offset = (pageNumber - 1) * pageSize;
    Product.findAndCountAll({
      offset,
      limit: pageSize,
      include: [
        Brand,
        { model: MeasurementUnit, as: 'measurementUnit' }
      ]
    }).then((result) => {
      this.activePage.products = result.rows;
      this.activePage.pageIdx = pageNumber;
      this.activePage.pagesCount = Math.ceil(result.count / pageSize);
      this.emitChange();
    });
  }

  getState() {
    return this.activePage;
  }
}

const storeInstance = new ProductsListStore();
storeInstance.dispatchToken = PoSDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.PRODUCTS.PAGE:
      storeInstance.page(action.pageNumber, action.pageSize);
      break;

    default:
    // Do nothing
  }
});

export default storeInstance;
