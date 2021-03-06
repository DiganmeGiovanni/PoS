import { EventEmitter } from 'events';
import PoSDispatcher from '../../PoSDispatcher';
import ActionTypes from '../../ActionTypes';
import {Sale} from "../../../model/entities";
import sequelize from "../../../model/database";
const Sequelize = require('sequelize');

class SaleViewStore extends EventEmitter {
  constructor() {
    super();
    this.CHANGE_EVENT = 'CHANGE';

    this.state = {
      sale: null,
      contents: [],

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

  fetchSale(saleId) {
    Sale.findById(saleId)
      .then(sale => {
        this.state.sale = sale;

        this.fetchContents(sale.id)
          .then(contents => {
            this.state.isLoadingProducts = false;
            this.state.contents = contents;
            this.emitChange();
          })
          .catch(err => {
            console.error(err);
            this.emitChange();
          });
      })
      .catch(err => {
        console.error('Sale could not be retrieved: ' + err);
      });
  }

  // noinspection JSMethodCanBeStatic
  fetchContents(saleId) {
    let sql = '\
      SELECT\
        PROD.id,\
        PROD.name,\
        COUNT(*)                    AS quantity,\
        MU.name                     AS measurement_unit_name,\
        SALE_PRICE.price,\
        SALE_PRICE.price * COUNT(*) AS total\
      FROM sale_has_existence SHE\
      INNER JOIN existence EXI\
        ON EXI.id = SHE.existence_id\
      INNER JOIN product PROD\
        ON EXI.product_id = PROD.id\
      INNER JOIN measurement_unit MU\
        ON MU.id = PROD.measurement_unit_id\
      INNER JOIN sale_price SALE_PRICE\
        ON SHE.sale_price_id = SALE_PRICE.id\
      WHERE SHE.sale_id = :saleId\
      GROUP BY SALE_PRICE.id, PROD.id\
    ';

    return sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      replacements: { saleId: saleId }
    });
  }
}

const storeInstance = new SaleViewStore();
storeInstance.dispatchToken = PoSDispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.SALES.FETCH:
      storeInstance.fetchSale(action.saleId);
      break;
  }
});

export default storeInstance;
