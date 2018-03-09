import React from 'react';
import { Link } from 'react-router-dom';
import ProductsTable from './ProductsTable';
import ProductsListStore from './ProductsListStore';
import PoSActions from './../PoSActions';

class ProductsList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.navToPage = this.navToPage.bind(this);

    this.pageSize = 20;
    this.state = ProductsListStore.getState();
  }

  componentWillMount() {
    ProductsListStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    PoSActions.products.page(1, this.pageSize);
  }

  componentWillUnmount() {
    ProductsListStore.removeChangeListener(this.onChange);
  }

  onChange() {
    // Pull state changes from store
    this.setState(ProductsListStore.getState());
  }

  navToPage(targetPage) {
    PoSActions.products.page(
      targetPage,
      this.pageSize,
    );
  }

  render() {
    return (
      <div className="container">
        <h1>Productos</h1>
        <Link to={'/products/create'} className={'btn btn-primary'}>
          Nuevo producto
        </Link>

        <br />
        <br />
        <ProductsTable
          products={this.state.products}
          navCallback={this.navToPage}
          activePage={this.state.pageIdx}
          totalPages={this.state.pagesCount}
        />
      </div>
    );
  }
}

export default ProductsList;
