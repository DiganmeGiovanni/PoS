import { Product } from '../model/entities';
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
    })
  }
}

export default new ProductService();
