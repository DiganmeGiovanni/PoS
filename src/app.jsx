import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import ProvidersList from './ui/providers/ProvidersList';
import ProvidersCreate from './ui/providers/ProvidersCreate';
import MUnitsList from './ui/m_unit/MUnitsList';
import MUnitsCreate from './ui/m_unit/MUnitsCreate';
import BrandsList from './ui/brands/BrandsList';
import BrandsCreate from './ui/brands/BrandsCreate';
import Navbar from './ui/components/navbar/Navbar';

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
          <Route exact path={'/providers'} component={ProvidersList} />
          <Route exact path={'/providers/create'} component={ProvidersCreate} />
        </div>
      </Router>
    );
  }
}
