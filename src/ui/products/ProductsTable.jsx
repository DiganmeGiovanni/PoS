import React from 'react';
import PropTypes from 'prop-types';
import Paginator from './../components/paginated_table/Paginator';
import { Link } from "react-router-dom";

const ProductsTable = ({ products, activePage, totalPages, navCallback }) => {
  const makeTableBody = () => {
    if (products.length === 0) {
      return (
        <tr>
          <td colSpan={7} className={'text-center'}>
            <i>No hay productos para mostrar</i>
          </td>
        </tr>
      );
    }

    return products.map(product => (
      <tr key={`product-model-${ product.id }`}>
        <td>{ product.id }</td>
        <td>{ product.name }</td>
        <td>{ product.brand.name }</td>
        <td>{ product.measurementUnit.name }</td>
        <td>{ product.description }</td>
        <td>0</td>
        <td>{ product.minimalExistences }</td>
        <td>
          <Link to={`/purchase_prices/${ product.id }`} title="Precios de compra">
            <span className="glyphicon glyphicon-usd"/>
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <div className="row">
      <div className="col-xs-12">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Unidad de medida</th>
              <th>Descripción</th>
              <th>Existencias</th>
              <th>Existencias minimas</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>{makeTableBody()}</tbody>
        </table>

        <Paginator
          activePage={activePage}
          totalPages={totalPages}
          navCallback={navCallback}
        />
      </div>
    </div>
  );
};

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  navCallback: PropTypes.func.isRequired,
};

export default ProductsTable;
