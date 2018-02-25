import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { ProductModel } from '../../model/entities';
import FormGroup from '../components/form/FormGroup';
import BrandsAutosuggest from '../components/autosuggesters/BrandsAutosuggest'
import DValidator from "../../services/ValidatorService";

class PModelsForm extends React.Component {
  constructor(props) {
    super(props);
    this.renderDescError = this.renderDescError.bind(this);
    this.onSubmitClicked = this.onSubmitClicked.bind(this);

    this.onBrandChange = this.onBrandChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onMinExistencesChange = this.onMinExistencesChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);

    this.state = {
      brand: {
        errMessage: null,
        hasError: false,
        value: null
      },
      name: {
        hasError: false,
        value: '',
      },
      description: {
        errMessage: null,
        hasError: false,
        value: '',
      },
      minExistences: {
        hasError: false,
        value: '',
      },
    };
  }

  onBrandChange(evt, { suggestion }) {
    this.setState({
      brand: { value: suggestion }
    });
  }

  onDescriptionChange(evt) {
    this.setState({
      description: { value: evt.target.value },
    });
  }

  onMinExistencesChange(evt) {
    this.setState({
      minExistences: { value: evt.target.value },
    });
  }

  onNameChange(evt) {
    this.setState({
      name: { value: evt.target.value },
    });
  }

  onSubmitClicked(evt, history) {
    evt.preventDefault();
    if (this.validate()) {
      const pModel = this.props.pModel;
      pModel.name = this.state.name.value;
      pModel.description = this.state.description.value;
      pModel.brandId = this.state.brand.value.id;

      this.props.onSubmit(pModel, history);
    }
  }

  renderDescError() {
    if (!this.state.description.hasError) {
      return '';
    }

    return (
      <span className="help-block">
        {this.state.description.errMessage}
      </span>
    );
  }

  validate() {
    let formOk = true;

    if (!DValidator.isName(this.state.name.value)) {
      formOk = false;
      this.setState({
        name: {
          hasError: true,
          errMessage: 'Ingrese un nombre valido'
        }
      });
    }

    if (this.state.brand.value === null) {
      formOk = false;
      this.setState({
        brand: {
          hasError: true,
          errMessage: 'Indique la marca del producto'
        }
      });
    }

    return formOk;
  }

  render() {
    return (
      <Route render={({ history }) => (
        <form onSubmit={evt => this.onSubmitClicked(evt, history)}>
          <div className="row">
            <div className="col-sm-6">
              <BrandsAutosuggest
                onBrandSelected={ this.onBrandChange }
                errMessage={ this.state.brand.errMessage }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <FormGroup
                label={'Nombre'}
                name={'name'}
                type={'text'}
                handleChange={this.onNameChange}
                errMessage={this.state.name.errMessage}
              />
            </div>
            <div className="col-sm-6">
              <FormGroup
                label={'Existencias minimas'}
                name={'min_existences'}
                type={'text'}
                handleChange={this.onMinExistencesChange}
              />
            </div>
            <div className="col-xs-12">
              <div className={`form-group${this.state.description.hasError ? 'has-error' : ''}`}>
                <label htmlFor="inp-description"
                       className="control-label">
                  Descripción
                </label>
                <textarea
                  id="inp-description"
                  name="description"
                  className="form-control"
                  rows="2"
                  onChange={this.onDescriptionChange}
                />

                { this.renderDescError() }
              </div>
            </div>

            <div className="col-xs-12 text-right">
              <button className="btn btn-success" type="submit">
                <span>Registrar</span>
              </button>
            </div>
          </div>
        </form>
      )} />
    );
  }
}

PModelsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // pModel: PropTypes.objectOf(ProductModel).isRequired,
};

export default PModelsForm;
