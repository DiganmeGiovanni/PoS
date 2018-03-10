import React from 'react';
import { Link } from 'react-router-dom';

class PurchasesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <h1>Compras</h1>
        <Link to={'/purchases/create'} className="btn btn-primary">
          Nueva compra
        </Link>
      </div>
    );
  }
}

export default PurchasesList;
