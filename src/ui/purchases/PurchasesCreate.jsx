import React from 'react';
import PurchaseProductForm from "./PurchaseProductForm";

class PurchasesCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <h1>Registrar compra</h1>
        <br/>
        <br/>
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">Agregar producto</h4>
              </div>
              <div className="panel-body">
                <PurchaseProductForm/>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">Productos en la compra</h4>
              </div>
              <div className="panel-body">
                <table className="table table-striped">
                  <thead>
                  <tr>
                    <th>Proveedor</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                    <th>Precio C/U</th>
                    <th>Precio</th>
                  </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PurchasesCreate;
