import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import BrandsList from './ui/brands/BrandsList';
import BrandsCreate from './ui/brands/BrandsCreate';
import MUnitsList from './ui/m_unit/MUnitsList';
import MUnitsCreate from './ui/m_unit/MUnitsCreate';
import ProductsList from './ui/products/ProductsList';
import ProductsCreate from './ui/products/ProductsCreate';
import ProvidersList from './ui/providers/ProvidersList';
import ProvidersCreate from './ui/providers/ProvidersCreate';
import PurchasePricesList from './ui/purchase_prices/PurchasePricesList';
import PurchasePricesCreate from './ui/purchase_prices/PurchasePricesCreate'
import Navbar from './ui/components/navbar/Navbar';
import PurchasesList from "./ui/purchases/PurchasesList";
import PurchasesCreate from "./ui/purchases/PurchasesCreate";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          {/* Routes */}
          <Route exact path={'/brands'} component={BrandsList} />
          <Route exact path={'/brands/create'} component={BrandsCreate} />
          <Route exact path={'/measurement_units'} component={MUnitsList} />
          <Route exact path={'/measurement_units/create'} component={MUnitsCreate} />
          <Route exact path={'/products'} component={ProductsList} />
          <Route exact path={'/products/create'} component={ProductsCreate} />
          <Route exact path={'/purchase_prices/:pModelId'} component={PurchasePricesList} />
          <Route exact path={'/purchase_prices/:pModelId/create'} component={PurchasePricesCreate} />
          <Route exact path={'/providers'} component={ProvidersList} />
          <Route exact path={'/providers/create'} component={ProvidersCreate} />
          <Route exact path={'/purchases'} component={PurchasesList} />
          <Route exact path={'/purchases/create'} component={PurchasesCreate} />
        </div>
      </Router>
    );
  }
}
