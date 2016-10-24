import React, { Component } from 'react';

import Loader from '../bootstrap/Loader';

import { providersFor } from './ComparisonApi';
import Amount from './Amount';
import Datetime from './Datetime';

export default class Disclaimer extends Component {
  state = {
    loading: false,
    error: false,
    providers: []
  }

  clear = (e) => {
    e.preventDefault();
    this.setState({providers: []});
  }

  loadProviders = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    providersFor(this.props.source, this.props.target)
      .then(response => response.json())
      .then(json => {
        console.log(json);

        this.setState({providers: json.providers, loading: false});
      })
      .catch(e => {
        this.setState({error: true, loading: false});
        throw e;
      })
  }

  renderData() {
    if (this.state.loading) {
      return <Loader/>;
    }

    if (this.state.providers.length > 0) {
      return (
        <div className="small m-t-2">
          <p>Price comparisons are based on data obtained online through the relevant providers’ website(s). The name of these providers, the date and time of data collection are listed in table below.</p>
          <table className="table table-condensed table-striped">
            <thead>
              <tr>
                <td>Provider</td>
                <td>Currency route</td>
                <td>Transfer threshold</td>
                <td>Date and time of collection</td>
              </tr>
            </thead>
            <tbody>
            {this.state.providers.map(provider => {
              return Object.keys(provider.routes).map(source => {
                return Object.keys(provider.routes[source]).map(target => {
                  return provider.routes[source][target].recordedAmounts.map(d => {
                    return <tr>
                      <td>{provider.name}</td>
                      <td>{source} to {target}</td>
                      <td><Amount currency={source} value={d.amount}/></td>
                      <td><Datetime date={d.dateCollected} time/></td>
                    </tr>;
                  });
                });
              });
            })}
            </tbody>
          </table>
          <p>The comparison shows the overall costs to a consumer and the amount received by the recipient of sending the specified amount internationally in the currency selected using different providers.</p>
          <p>The upfront cost represents the advertised fee charged by the relevant provider for using their service. The hidden cost represents the cost that is concealed in the exchange rate given by the provider compared to the mid-market rate (provided by Reuters at the time of data collection from the relevant provider) multiplied by the amount sent. In simple terms:</p>
          <p><code>Hidden cost = (mid-market rate - provider rate) X amount of transfer</code></p>
          <p>The total cost is calculated by adding together the upfront cost and the hidden cost. This represents the entire financial cost to a consumer:</p>
          <p><code>Total cost  = upfront cost + hidden cost</code></p>
          <p>The data is manually collected in specific thresholds (see table for more detail) and if the amount of transfer is in between these thresholds, we used the provider’s rate applicable for the higher transfer threshold. For example, if a provider’s has a threshold of <Amount currency={this.props.source} value="5000"/>  and <Amount currency={this.props.source} value="10000"/>, and we want to calculate the total cost of sending <Amount currency={this.props.source} value="5500"/> , then we will use the  exchange rate and fee for sending <Amount currency={this.props.source} value="10000"/>. Generally, providers give better exchange rates and charge smaller fees for higher-value transfers, this approach helps to reduce the risk of inflating the cost of using the relevant provider, in fact it may show a better rate for the relevant providers than what they  may actually be.</p>
          <p>In this comparison we have not taken into account the cost to the recipient which a recipient provider may charge for an international transfer.  With TransferWise, the recipient will not be charged for receiving the transfer.</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.state.providers.length > 0 ?
          <div className="small"><a href="" onClick={this.clear}>Close</a></div> :
          <div className="small">How we collect this data? <a href="" onClick={this.loadProviders}>Learn more</a></div>}
        {this.renderData()}
      </div>
    );
  }
}
