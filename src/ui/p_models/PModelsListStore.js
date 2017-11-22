import { EventEmitter } from 'events';
import PoSDispatcher from '../PoSDispatcher';
import ActionTypes from '../ActionTypes';
import { ProductModel } from '../../model/entities';

class PModelsListStore extends EventEmitter {
  constructor() {
    super();
    this.CHANGE_EVENT = 'CHANGE';

    this.activePage = {
      pModels: [],
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
    ProductModel.findAndCountAll({
      offset,
      limit: pageSize,
    }).then((result) => {
      this.activePage.pModels = result.rows;
      this.activePage.pageIdx = pageNumber;
      this.activePage.pagesCount = Math.ceil(result.count / pageSize);
      this.emitChange();
    });
  }

  getState() {
    return this.activePage;
  }
}

const storeInstance = new PModelsListStore();
storeInstance.dispatchToken = PoSDispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.PRODUCT_MODELS.PAGE:
      storeInstance.page(action.pageNumber, action.pageSize);
      break;

    default:
    // Do nothing
  }
});

export default storeInstance;
