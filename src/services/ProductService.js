import { Product, PurchasePrice, SalePrice } from '../model/entities';
import sequelize from '../model/database';
const Sequelize = require('sequelize');

class ProductService {
  find(query, limit, cb) {
    Product.findAll({
      where: { name: { [Sequelize.Op.like]: `%${ query }%`}},
      limit: limit
    })
    .then(cb)
    .catch(() => {
      console.error('Products could not be retrieved');
    });
  }

  /**
   * Queries the last purchase price offered by a given provider
   * for specified product
   * @param {number} productId - Product's id
   * @param {number} providerId - Provider's id
   * @param {Date} date - Look for product until this date
   * @param {Function} cb - If provided, callback will be executed with result,
   *                        otherwise, a promise will be returnted
   */
  lastProviderPrice(productId, providerId, date, cb) {
    let promise = PurchasePrice.findOne({
      where: {
        productId: productId,
        providerId: providerId,
        date: {
          [Sequelize.Op.lte]: date
        }
      },
      order: [['date', 'DESC']]
    });

    if (typeof cb !== "undefined") {
      promise
          .then(cb)
          .catch(err => {
            console.error('Last provider price query has failed: ' + err)
          });
    } else {
      return promise;
    }
  }

  /**
   * Queries for the last purchase price for given product
   * until given date
   * @param {number} productId - Product's id
   * @param {Date} date - Look for price until this date
   * @param {Function} cb - If provided, will be executed with result,
   *                        otherwise a promise will be returned
   */
  lastCost(productId, date, cb) {
    let promise = PurchasePrice.findOne({
      where: {
        productId: productId,
        date: {
          [Sequelize.Op.lte]: date
        }
      },
      order: [['date', 'DESC']]
    });

    if (typeof cb !== "undefined") {
      promise
          .then(cb)
          .catch(err => { console.error('Last cost query has failed: ' + err) });
    } else {
      return promise;
    }
  }

  /**
   * Queries for the last sale price for given product
   * until given date
   * @param {number} productId - Product's id
   * @param {Date} date - Look for price until this date
   * @param {Function} cb - If provided, will be executed with result,
   *                        otherwise a promise will be returned
   * @return {Promise}
   */
  lastPrice(productId, date, cb) {
    let promise = SalePrice.findOne({
      where: {
        productId: productId,
        date: { [Sequelize.Op.lte]: date }
      },
      order: [['date', 'DESC']]
    });

    if (typeof cb !== "undefined") {
      promise
        .then(cb)
        .catch(err => { console.error('Last price query has failed: ' + err)})
    } else {
      return promise;
    }
  }

  stockCount(productId, date, cb) {
    let sql = '\
      SELECT\
        PROD.id,\
        PROD.name,\
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
            INNER JOIN purchase PUR\
              ON PUR.id = EXI.purchase_id\
            WHERE PUR.date <= :date\
            GROUP BY product_id\
        ) EXIS\
        ON EXIS.product_id = PROD.id\
      WHERE PROD.id = :productId\
      LIMIT 1\
    ';

    let promise = sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
          date: date,
          productId: productId
        }
    });

    if (typeof cb !== "undefined") {
      promise
        .then(cb)
        .catch(err => {
          console.error('Stock could not be retrieved: ' + err);
        })
    } else {
      return promise
    }
  }

  availableExistences(productId, quantity, date, cb) {
    let sql = '\
      SELECT\
        product_id,\
        EXI.id AS existence_id\
      FROM existence EXI\
      INNER JOIN purchase PUR\
      ON PUR.id = EXI.purchase_id\
      LEFT JOIN sale_has_existence SHE\
        ON EXI.id = SHE.existence_id\
      WHERE PUR.date <= :date\
      LIMIT :quantity\
    ';

    let promise = sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      replacements: { date: date, quantity: quantity }
    });

    if (typeof cb !== "undefined") {
      promise
        .then(cb)
        .catch(err => {
          console.error('Available existences could not be retrieved' + err);
        });
    } else {
      return promise;
    }
  }
}

const instance = new ProductService();
export default instance;
