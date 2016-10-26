import React, { Component } from 'react';

import Loader from '../bootstrap/Loader';

import { comparisonsFor } from './ComparisonApi';
import Provider from './Provider';
import Disclaimer from './Disclaimer';
import './Comparison.css';

export default class Comparison extends Component {
  state = {
    showMore: false,
    providers: [],
    loading: true,
    error: false
  };

  showMore = (e) => {
    e.preventDefault();
    this.setState({showMore: true});
  }

  showLess = (e) => {
    e.preventDefault();
    this.setState({showMore: false});
  }

  componentDidMount() {
    this.loadProviders(this.props.amount);
  }

  componentWillReceiveProps(nextProps){
    this.setState({loading: true, error: false});
    this.loadProviders(nextProps.amount);
  }

  maxFee = (providers, amount) => {
    return Math.max.apply(null, providers.map(p => p.fees + p.hiddenFees));
  }

  loadProviders(amount) {
    comparisonsFor(this.props.source, this.props.target, amount)
      .then(response => response.json())
      .then(json => {
        const providers = this.props.filter ?
          json.providers.filter(p => p.name.includes(this.props.filter) || p.name === 'TransferWise') :
          json.providers;

        const maxFee = this.maxFee(providers, amount);

        this.setState({providers: providers.map(data => {
          return {
            id: data.id,
            name: data.name,
            rate: data.rate,
            fees: data.fees,
            hiddenFees: data.hiddenFees,
            amount: data.receivedAmount,
            maxFee: maxFee,
            collectedAt: data.dateCollected
          }
        }), loading: false});
      })
      .catch(e => {
        this.setState({error: true, loading: false});
        throw e;
      })
  }

  renderError() {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Ups!</strong> There was a problem retrieving data. Please try again later.
      </div>
    );
  }

  renderLoader() {
    return (
      <div className="text-xs-center m-t-3 p-t-3">
        <Loader/>
      </div>
    );
  }

  renderTable() {
    if (this.state.error) {
      return this.renderError();
    }

    if (this.state.loading) {
      return this.renderLoader();
    }

    const providers = this.state.showMore ? this.state.providers : this.state.providers.slice(0, 3);
    return (
      <div className="table-responsive col-xs-12 col-sm-12 col-xl-12 p-x-0" style={{position: 'static'}}>
        <table className="table">
          <tbody>
            <tr>
              <th>Provider</th>
              <th className="text-xs-right hidden-xs text-md-left">Total cost for sending {this.props.amount} {this.props.source} to {this.props.target}</th>
              <th className="text-xs-right">Amount received</th>
            </tr>
          </tbody>
          <tbody>
            {providers.map(p => {
              return <Provider key={p.id} name={p.name} fees={p.fees} rate={p.rate} hiddenFees={p.hiddenFees} maxFee={p.maxFee} source={this.props.source} target={this.props.target} amount={p.amount} collectedAt={p.collectedAt}/>
            })}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const providers = this.state.showMore ? this.state.providers : this.state.providers.slice(0, 3);
    const trimmed = providers.length < this.state.providers.length;
    return (
      <div>
        {this.renderTable()}

        <div className="col-xl-12 text-xs-center m-b-3">
          {!this.state.showMore && trimmed ?
          <a href="" onClick={this.showMore}>
              Show more providers <span className="icon icon-down"></span>
          </a> : null}

          {this.state.showMore ?
          <a href="" onClick={this.showLess}>
              Show less providers <span className="icon icon-up"></span>
          </a> : null}
        </div>

        <div className="col-xs-12 col-sm-12 col-xl-12">
          <Disclaimer source={this.props.source} target={this.props.target}/>
        </div>
      </div>
    );
  }
}
