import React from 'react';
import PaginatedTable from './../components/paginated_table/PaginatedTable';

class ProvidersList extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>Proveedores</h1>

        <PaginatedTable />
      </div>
    );
  }
}

export default ProvidersList;
