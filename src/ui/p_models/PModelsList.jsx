import React from 'react';
import { Link } from 'react-router-dom';
import PModelsTable from './PModelsTable';
import PModelsListStore from './PModelsListStore';
import PoSActions from './../PoSActions';

class PModelsList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.navToPage = this.navToPage.bind(this);

    this.pageSize = 20;
    this.state = PModelsListStore.getState();
  }

  componentWillMount() {
    PModelsListStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    PoSActions.productModels.page(1, this.pageSize);
  }

  componentWillUnmount() {
    PModelsListStore.removeChangeListener(this.onChange);
  }

  onChange() {
    // Pull state changes from store
    this.setState(PModelsListStore.getState());
  }

  navToPage(targetPage) {
    PoSActions.productModels.page(
      targetPage,
      this.pageSize,
    );
  }

  render() {
    return (
      <div className="container">
        <h1>Productos</h1>
        <Link to={'/p_models/create'} className={'btn btn-primary'}>
          Nuevo producto
        </Link>

        <br />
        <br />
        <PModelsTable
          pModels={this.state.pModels}
          navCallback={this.navToPage}
          activePage={this.state.pageIdx}
          totalPages={this.state.pagesCount}
        />
      </div>
    );
  }
}

export default PModelsList;
