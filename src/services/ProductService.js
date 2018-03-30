import {Product, PurchasePrice} from '../model/entities';
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
}

const instance = new ProductService();
export default instance;
