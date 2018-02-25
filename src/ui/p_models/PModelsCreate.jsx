import React from 'react';
import { ProductModel } from '../../model/entities';
import PModelsForm from './PModelsForm';

class PModelsCreate extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      pModel: ProductModel.build(),
    };
  }

  onSubmit(pModel, history) {
    pModel.save().then(() => {
      this.setState({ pModel });
      history.push('/p_models')
    });
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
          <h1>Nuevo producto</h1>
          <br />
          <br />

          <PModelsForm
            onSubmit={this.onSubmit}
            pModel={this.state.pModel}
          />
        </div>
      </div>
    )
  }
}

export default PModelsCreate;
