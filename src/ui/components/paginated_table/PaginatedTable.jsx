import React from 'react';

class PaginatedTable extends React.Component {

  render() {
    return (
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Title 1</th>
            <th>Title 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Heello world</td>
            <td>Hello world</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default PaginatedTable;
