import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import ProvidersList from './ui/providers/ProvidersList';
import BrandsList from './ui/brands/BrandsList';
import Navbar from './ui/components/navbar/Navbar';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          {/* Routes */}
          <Route path={'/brands'} component={BrandsList} />
          <Route path={'/providers'} component={ProvidersList} />
        </div>
      </Router>
    );
  }
}
