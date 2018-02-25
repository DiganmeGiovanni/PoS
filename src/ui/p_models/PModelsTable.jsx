import React from 'react';
import PropTypes from 'prop-types';
import Paginator from './../components/paginated_table/Paginator';

const PModelsTable = ({ pModels, activePage, totalPages, navCallback }) => {
  const makeTableBody = () => {
    if (pModels.length === 0) {
      return (
        <tr>
          <td colSpan={6} className={'text-center'}>
            <i>No hay productos para mostrar</i>
          </td>
        </tr>
      );
    }

    return pModels.map(pModel => (
      <tr key={`product-model-${ pModel.id }`}>
        <td>{pModel.id}</td>
        <td>{pModel.name}</td>
        <td>{pModel.brand.name}</td>
        <td>{pModel.description}</td>
        <td>0</td>
        <td>0</td>
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
              <th>Descripción</th>
              <th>Existencias</th>
              <th>Existencias minimas</th>
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

PModelsTable.propTypes = {
  pModels: PropTypes.arrayOf(PropTypes.object).isRequired,
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  navCallback: PropTypes.func.isRequired,
};

export default PModelsTable;
