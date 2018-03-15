import React from 'react';
import DatePickerInput from "react-day-picker/DayPickerInput";
import PurchaseProductForm from "./PurchaseProductForm";
import PoSActions from "../PoSActions";
import PurchaseCreateStore from './PurchaseCreateStore';
import FormGroup from "../components/form/FormGroup";
import TextFormatter from "../../services/TextFormatter";
import MonthYearForm from "../components/form/MonthYearForm";


class PurchasesCreate extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);

    this.state = PurchaseCreateStore.getState();
  }

  componentWillMount() {
    PurchaseCreateStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    PurchaseCreateStore.removeChangeListener(this.onChange);
  }

  onChange() {
    // Pull state changes from store
    this.setState(PurchaseCreateStore.getState());
  }

  // noinspection JSMethodCanBeStatic
  addProduct(product, provider, quantity, cost, price) {
    PoSActions.purchase.create.addProduct(
      product,
      provider,
      quantity,
      cost,
      price
    );
  }

  handleYearMonthChange(yMonthDate) {
    console.log('Year and month has change');
  }

  // noinspection JSMethodCanBeStatic
  onPaymentInvestmentChange(e) {
    PoSActions.purchase
      .create
      .changePaymentInvestment(e.target.value);
  }

  // noinspection JSMethodCanBeStatic
  onPaymentReinvestmentChange(e) {
    PoSActions.purchase
    .create
    .changePaymentReinvestment(e.target.value);
  }

  renderContents() {
    if (this.state.contents.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">
            <i>Sin productos</i>
          </td>
        </tr>
      );
    } else {
      return this.state.contents.map((inOrder, idx) => {
        return (
          <tr key={`in_order-${ idx }`}>
            <td>{ inOrder.provider.name }</td>
            <td>{ inOrder.product.name }</td>
            <td>{ inOrder.quantity }</td>
            <td>Pieza</td>
            <td className="text-right">
              { TextFormatter.asMoney(inOrder.price) }
            </td>
            <td className="text-right">
              { TextFormatter.asMoney(inOrder.cost) }
            </td>
            <td className="text-right">
              { TextFormatter.asMoney(inOrder.cost * inOrder.quantity) }
            </td>
          </tr>
        );
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Registrar compra</h1>
        <br/>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">Compra</h4>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="inp-date"
                         className="control-label"
                  >Fecha</label>
                  <br/>
                  <DatePickerInput
                    locale="es"
                    inputProps={{
                      className: 'form-control',
                    }}
                    dayPickerProps={{
                      captionElement: ({ date, localeUtils }) => (
                        <MonthYearForm
                        date={ date }
                        localeUtils={ localeUtils }
                        onChange={ this.handleYearMonthChange }
                        />
                      )
                    }}
                  />
                </div>
              </div>
              
              <div className="col-md-4">
                <FormGroup
                  label="Pago como inversión"
                  name="payment_investment"
                  type="text"
                  handleChange={ this.onPaymentInvestmentChange }
                />
              </div>

              <div className="col-md-4">
                <FormGroup
                  label="Pago como reinversión"
                  name="payment_reinvestment"
                  type="text"
                  handleChange={ this.onPaymentReinvestmentChange }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">Agregar producto</h4>
              </div>
              <div className="panel-body">
                <PurchaseProductForm addProduct={ this.addProduct }/>
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
                    <th>Precio</th>
                    <th>Costo C/U</th>
                    <th>Costo</th>
                  </tr>
                  </thead>
                  <tbody>{ this.renderContents() }</tbody>
                  <tfoot>
                  <tr>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                    <td/>
                    <td className="text-right text-bold">
                      <b>{ TextFormatter.asMoney(this.state.totalCost) }</b>
                    </td>
                  </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 text-center padding-bottom-64">
            <hr/>
            <button className="btn btn-success">
              <span>Crear compra</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PurchasesCreate;
