import React from 'react';
import PropTypes from 'prop-types';

const PurchaseContents = ({ products, isLoadingProducts }) => {
  const makeTableBody = () => {
    if (isLoadingProducts) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            <i>Espere un momento por favor ...</i>
          </td>
        </tr>
      )
    }
  };

  return (
    <table className="table table-striped">
      <thead>
      <tr>
        <th>Proveedor</th>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Unidad</th>
        <th>Precio</th>
        <th>Costo C/U</th>
        <th>Costo</th>
      </tr>
      </thead>
      <tbody>{ makeTableBody() }</tbody>
    </table>
  )
};

PurchaseContents.propTypes = {
  products: PropTypes.array.isRequired,
  isLoadingProducts: PropTypes.bool.isRequired
};

export default PurchaseContents;
