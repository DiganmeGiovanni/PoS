import sequelize from './database';

const Sequelize = require('sequelize');


/**
 * Define all models for application
 */


const Provider = sequelize.define('provider', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(500),
    unique: true,
    allowNull: false,
  },
});

const Brand = sequelize.define('brand', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(500),
    unique: true,
    allowNull: false,
  },
});

const Purchase = sequelize.define('purchase', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  externalPayment: {
    field: 'external_payment',
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  total: {
    type: Sequelize.DECIMAL(13, 2),
    allowNull: false,
  },
});

const MeasurementUnit = sequelize.define('measurement_unit', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(500),
    unique: true,
    allowNull: false,
  },
  abbreviation: {
    type: Sequelize.STRING(50),
  },
});

const Sale = sequelize.define('sale', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  total: {
    type: Sequelize.DECIMAL(13, 2),
    allowNull: false,
  },
});

const ProductModel = sequelize.define('product_model', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(500),
    unique: true,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(5000),
  },
  minimalExistences: {
    field: 'minimal_existences',
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  brandId: {
    field: 'brand_id',
    type: Sequelize.INTEGER,
    references: {
      model: Brand,
      key: 'id',
    },
  },
});

const PurchasePrice = sequelize.define('purchase_price', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  price: {
    type: Sequelize.DECIMAL(13, 2),
    allowNull: false,
  },
  minimalQuantity: {
    field: 'minimal_quantity',
    type: Sequelize.DOUBLE,
    defaultValue: 1,
  },
  measurementUnitId: {
    field: 'measurement_unit_id',
    type: Sequelize.INTEGER,
    references: {
      model: MeasurementUnit,
      key: 'id',
    },
  },
  providerId: {
    field: 'provider_id',
    type: Sequelize.INTEGER,
    references: {
      model: Provider,
      key: 'id',
    },
  },
  productModelId: {
    field: 'product_model_id',
    type: Sequelize.INTEGER,
    references: {
      model: ProductModel,
      key: 'id',
    },
  },
});

const ProductExistence = sequelize.define('product_existence', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: Sequelize.STRING(500),
  },
  exhibitor: {
    type: Sequelize.INTEGER,
  },
  unactivatedAt: {
    field: 'unactivated_at',
    type: Sequelize.DATE,
  },
  purchasePriceId: {
    field: 'purchase_price_id',
    type: Sequelize.INTEGER,
    references: {
      model: PurchasePrice,
      key: 'id',
    },
  },
  purchaseId: {
    field: 'purchase_id',
    type: Sequelize.INTEGER,
    references: {
      model: Purchase,
      key: 'id',
    },
  },
  productModelId: {
    field: 'product_model_id',
    type: Sequelize.INTEGER,
    references: {
      model: ProductModel,
      key: 'id',
    },
  },
  measurementUnitId: {
    field: 'measurement_unit_id',
    type: Sequelize.INTEGER,
    references: {
      model: MeasurementUnit,
      key: 'id',
    },
  },
});

const SalePrice = sequelize.define('sale_price', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  price: {
    type: Sequelize.DECIMAL(13, 2),
    allowNull: true,
  },
  measurementUnitId: {
    field: 'measurement_unit_id',
    type: Sequelize.INTEGER,
    references: {
      model: MeasurementUnit,
      key: 'id',
    },
  },
  productModelId: {
    field: 'product_model_id',
    type: Sequelize.INTEGER,
    references: {
      model: ProductModel,
      key: 'id',
    },
  },
});

const SaleHasProduct = sequelize.define('sale_has_product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  partialQuantity: {
    field: 'partial_quantity',
    type: Sequelize.FLOAT,
  },
  saleId: {
    field: 'sale_id',
    type: Sequelize.INTEGER,
    references: {
      model: Sale,
      key: 'id',
    },
  },
  productExistenceId: {
    field: 'product_existence_id',
    type: Sequelize.INTEGER,
    references: {
      model: ProductExistence,
      key: 'id',
    },
  },
  salePriceId: {
    field: 'sale_price_id',
    type: Sequelize.INTEGER,
    references: {
      model: SalePrice,
      key: 'id',
    },
  },
});


/**
 * Define all relationships between models
 */

Provider.hasMany(PurchasePrice, { foreignKey: 'provider_id' });
PurchasePrice.belongsTo(Provider, { foreignKey: 'provider_id' });
PurchasePrice.belongsTo(ProductModel, { foreignKey: 'product_model_id' });
PurchasePrice.belongsTo(MeasurementUnit, { foreignKey: 'measurement_unit_id' });
PurchasePrice.hasMany(ProductExistence, { foreignKey: 'purchase_price_id' });
Brand.hasMany(ProductModel, { foreignKey: 'brand_id' });
ProductModel.hasMany(PurchasePrice, { foreignKey: 'product_model_id' });
ProductModel.hasMany(ProductExistence, { foreignKey: 'product_model_id' });
ProductModel.hasMany(SalePrice, { foreignKey: 'product_model_id' });
ProductModel.belongsTo(Brand, { foreignKey: 'brand_id' });
Purchase.hasMany(ProductExistence, { foreignKey: 'purchase_id' });
ProductExistence.belongsTo(PurchasePrice, { foreignKey: 'purchase_price_id' });
ProductExistence.belongsTo(Purchase, { foreignKey: 'purchase_id' });
ProductExistence.belongsTo(ProductModel, { foreignKey: 'product_model_id' });
ProductExistence.belongsTo(MeasurementUnit, { foreignKey: 'measurement_unit_id' });
SaleHasProduct.belongsTo(ProductExistence, { foreignKey: 'product_existence_id' });
SaleHasProduct.belongsTo(Sale, { foreignKey: 'sale_id' });
SaleHasProduct.belongsTo(SalePrice, { foreignKey: 'sale_price_id' });
Sale.hasMany(SaleHasProduct, { foreignKey: 'sale_id' });
SalePrice.belongsTo(MeasurementUnit, { foreignKey: 'measurement_unit_id' });


/**
 * Sync all models against database
 */
// Provider.sync();
// Brand.sync();
// Purchase.sync();
// MeasurementUnit.sync();
// Sale.sync();
// ProductModel.sync();
// PurchasePrice.sync();
// ProductExistence.sync();
// SalePrice.sync();
// SaleHasProduct.sync();


export {
  Provider,
  Brand,
  Purchase,
  MeasurementUnit,
  Sale,
  ProductModel,
  PurchasePrice,
  ProductExistence,
  SalePrice,
  SaleHasProduct,
};
