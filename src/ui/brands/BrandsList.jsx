import React from 'react';
import PaginatedTable from './../components/paginated_table/PaginatedTable';

class BrandsList extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>Brands</h1>

        <PaginatedTable />
      </div>
    );
  }
}

export default BrandsList;
