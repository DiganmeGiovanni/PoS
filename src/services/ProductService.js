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

  lastPPrice(productId, date, cb) {
    PurchasePrice.findOne({
      where: {
        productId: productId,
        date: {
          [Sequelize.Op.lte]: date
        }
      },
      order: [['date', 'DESC']]
    })
    .then(cb)
    .catch(err => {
      console.error('Latest purchase price query has failed: ' + err);
    });
  }
}

const instance = new ProductService();
export default instance;
