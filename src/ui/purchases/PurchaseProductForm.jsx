import React from 'react';

class PurchaseProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <label htmlFor="inp-product-name" className="control-label">Test</label>
        <input type="text" className="form-control"/>
      </div>
    );
  }
}

export default PurchaseProductForm;