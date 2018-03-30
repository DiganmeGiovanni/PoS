import { EventEmitter } from 'events';
import PoSDispatcher from '../PoSDispatcher';
import ActionTypes from '../ActionTypes';
import {Brand, MeasurementUnit, Product} from '../../model/entities';
import sequelize from '../../model/database';
const Sequelize = require('sequelize');

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
    let sql = '\
      SELECT\
        PROD.id,\
        PROd.code,\
        PROD.name,\
        BRA.name                          AS brand_name,\
        MU.name                           AS measurement_unit_name,\
        PROD.minimal_existences           AS minimal_stock,\
        IFNULL(EXIS.total - EXIS.sold, 0) AS stock,\
        IFNULL(EXIS.sold, 0)              AS total_sold\
      FROM product PROD\
      INNER JOIN brand BRA\
        ON BRA.id = PROD.brand_id\
      INNER JOIN measurement_unit MU\
        ON MU.id = PROD.measurement_unit_id\
      LEFT JOIN (\
            SELECT\
              product_id,\
              SUM(IFNULL(SHE.id, 0)) AS sold,\
              COUNT(*)               AS total\
            FROM existence EXI\
            LEFT JOIN sale_has_existence SHE\
                ON EXI.id = SHE.existence_id\
            GROUP BY product_id\
        ) EXIS\
        ON EXIS.product_id = PROD.id\
      ';
    let countSql = `SELECT COUNT(*) AS count FROM (${ sql }) SQ1`;

    // Append offset and limit
    sql += ' LIMIT :offset, :limit';

    // Get count
    sequelize.query(countSql, { type: Sequelize.QueryTypes.SELECT })
      .then(result => {
        this.activePage.pagesCount = Math.ceil(result.count / pageSize);

        sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT,
          replacements: { offset: (pageNumber - 1) * pageSize, limit: pageSize }
        })
        .then(products => {
          this.activePage.products = products;
          this.activePage.pageIdx = pageNumber;
          this.emitChange();
        })
        .catch(err => {
          console.error('Fail during products query: ' + err);
        })
      })
      .catch(err => {
        console.error('Fail during products count: ' + err);
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
