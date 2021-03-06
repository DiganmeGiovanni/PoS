import React from 'react';
import PoSActions from '../../PoSActions';
import SaleViewStore from './SaleViewStore';
import TextFormatter from '../../../services/TextFormatter';
import moment from 'moment';
import 'moment/locale/es';
import SaleContent from "./SaleContent";

moment.locale('es');

class SaleView extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.saleId = this.props.match.params.saleId;
    this.state = SaleViewStore.getState();
  }

  componentWillMount() {
    SaleViewStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    document.title = 'Detalles de venta';
    PoSActions.sales.list.fetch(this.saleId);
  }

  componentWillUnmount() {
    SaleViewStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(SaleViewStore.getState());
  }

  renderDetails() {
    if (this.state.sale === null) {
      return (
        <div className="padding-32">
          <span>Espere un momento por favor ...</span>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-sm-4">
          <label className="control-label">Fecha</label>
          <br/>
          <span>{ moment(this.state.sale.date).format('DD MMMM, YYYY') }</span>
        </div>

        <div className="col-sm-4">
          <label className="control-label">Autoconsumo</label>
          <br/>
          <span>{ this.state.sale.selfConsumption ? 'Si' : 'No' }</span>
        </div>

        <div className="col-sm-4">
          <label className="control-label">Total</label>
          <br/>
          <span>{ TextFormatter.asMoney(this.state.sale.total) }</span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <h1 className="margin-bottom-0">Detalles de venta</h1>
        <h4 className="margin-top-4"># { this.saleId }</h4>

        <div className="panel panel-default margin-top-32">
          <div className="panel-heading">
            <h4 className="panel-title">Venta</h4>
          </div>
          <div className="panel-body">
            { this.renderDetails() }
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">Contenido</h4>
          </div>
          <div className="panel-body">
            <SaleContent
              contents={ this.state.contents }
              isLoadingProducts={ this.state.isLoadingProducts }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SaleView;