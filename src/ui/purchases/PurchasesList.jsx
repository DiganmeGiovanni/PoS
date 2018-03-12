import React from 'react';
import { Link } from 'react-router-dom';

class PurchasesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    document.title = 'Compras';
  }

  renderContents() {
    return (
      <tr>
        <td colSpan="6" className="text-center">
          <i>Sin compras registradas</i>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div className="container">
        <h1>Compras</h1>
        <Link to={'/purchases/create'} className="btn btn-primary">
          Nueva compra
        </Link>
        <br/>
        <br/>
        <table className="table table-bordered table-striped">
          <thead>
          <tr>
            <th>Fecha</th>
            <th>Pago como inversión</th>
            <th>Pago como reinversión</th>
            <th>No. Productos</th>
            <th>Costo total</th>
            <th>&nbsp;</th>
          </tr>
          </thead>
          <tbody>
          { this.renderContents() }
          </tbody>
        </table>
      </div>
    );
  }
}

export default PurchasesList;
