import React from 'react';
import PurchasePricesStore from "./PurchasePricesStore";
import PoSActions from "../PoSActions";

class PurchasePricesList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.pModelId = this.props.match.params.pModelId;
    this.state = PurchasePricesStore.getState();
  }

  componentWillMount() {
    PurchasePricesStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    PoSActions.purchasePrices.fetchProductModel(this.pModelId);
  }

  componentWillUnmount() {
    PurchasePricesStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(PurchasePricesStore.getState());
  }

  render() {
    return (
      <div className="container">
        <h1 style={{ marginBottom: '0' }}>Precios de compra</h1>
        <h2 style={{ marginTop: '4px' }}>
          { this.state.pModel !== null ? this.state.pModel.name : '' }
        </h2>
      </div>
    )
  }
}

export default PurchasePricesList;
