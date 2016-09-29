import React, { Component } from 'react';

import Loader from '../bootstrap/Loader';

import { providersFor } from './ComparisonApi';
import Provider from './Provider';
import Datetime from './Datetime';
import './Comparison.css';

export default class Comparison extends Component {
  state = {
    showMore: false,
    showLegal: false,
    providers: [],
    loading: true,
    error: false
  };

  toggleLegal = () => this.setState({showLegal: !this.state.showLegal});

  showMore = () => this.setState({showMore: true});

  showLess = () => this.setState({showMore: false});

  componentDidMount() {
    this.loadProviders(this.props.amount);
  }

  componentWillReceiveProps(nextProps){
    this.setState({loading: true, error: false});
    this.loadProviders(nextProps.amount);
  }

  hiddenFees = (midmarketRate, providerRate, amount) => {
    return (midmarketRate - providerRate) * amount;
  }

  maxFee = (providers, amount) => {
    return Math.max.apply(null, providers.map(p => p.fees + this.hiddenFees(p.midmarketRate, p.rate, amount)));
  }

  loadProviders(amount) {
    providersFor(this.props.source, this.props.target, amount)
      .then(response => response.json())
      .then(json => {
        const providers = this.props.filter ?
          json.providerRates.filter(p => p.name.includes(this.props.filter) || p.name === 'TransferWise') :
          json.providerRates;

        const maxFee = this.maxFee(providers, amount);

        this.setState({providers: providers.map(data => {
          return {
            id: data.providerId,
            name: data.name,
            rate: data.rate,
            fees: data.fees,
            hiddenFees: this.hiddenFees(data.midmarketRate, data.rate, amount),
            amount: data.targetAmount,
            maxFee: maxFee,
            collectedAt: data.upperDateCollected
          }
        }), loading: false});
      })
      .catch(e => this.setState({error: true, loading: false}))
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
              <th className="text-xs-right hidden-xs text-md-left">Total cost</th>
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

        <div className="text-xs-center m-b-3">
          {!this.state.showMore && trimmed ?
          <a href="" onClick={this.showMore}>
              Show more providers <span className="caret"></span>
          </a> : null}

          {this.state.showMore ?
          <a href="" onClick={this.showLess}>
              Show less providers <span className="caret"></span>
          </a> : null}
        </div>

        <div className="col-xs-12 col-sm-12 col-xl-12">
          <span className="small">How we collect this data? <a href="" onClick={this.toggleLegal}>Learn more</a></span>
          {this.state.showLegal ?
            <div>
              <p className="small m-t-3">Price comparisons are based on data obtained online through the respective provider's website. The name of the providers and the date and time of the data collection are listed below.</p>
              <ul className="list-unstyled m-t-3">
                {this.state.providers.map(p => <li key={p.id}><strong>{p.name} on <Datetime date={p.collectedAt} time/></strong></li>)}
              </ul>
              <p>
                The data shows the overall costs and the amount received of sending the specified amount internationally in the currency selected using different providers.
                <br/>
                <br/>
                The upfront cost represents the transparent fee charged by the provider for using the service. The hidden cost represents the cost that is concealed in the exchange rate given by the provider compared to the mid-market rate multiplied by the amount sent. The total cost represents the entire financial cost to consumers and is calculated by adding together the upfront cost and the hidden cost. Price comparisons can be verified by establishing the mid-market rate, the provider's upfront cost and the exchange rate provided.
                <br/>
                <br/>
                The data is collected manually and therefore collected in different dates. To make the comparison legitimate, the hidden fee is calculated based on the rate and the mid-market rate on the collection date, so even if there is a difference in the dates collected, the cost displayed and the amount received are based on the exchange rate, upfront fee and hidden fees of the collection date.
              </p>
            </div> : null}
        </div>
      </div>
    );
  }
}
