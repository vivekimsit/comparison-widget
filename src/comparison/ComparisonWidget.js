import React, { Component } from 'react';

import Select from '../bootstrap/Select';

import { ComparisonTable } from 'comparison-components';

import './ComparisonWidget.css';

const AMOUNTS = [500, 1000, 5000, 10000];

export default class ComparisonWidget extends Component {
  state = {
    amount: this.props.amount || AMOUNTS[0]
  };

  changeAmount = (amount) => this.setState({amount});

  generateAmountOptions() {
    return AMOUNTS.reduce((map, amount) => {
      map[amount] = amount + ' ' + this.props.source;
      return map;
    }, {});
  }

  render() {
    return (
      <div>
        <h2 className="col-xs-12 text-xs-center">
          The true cost for sending
          <br/>
          <Select onChange={this.changeAmount} options={this.generateAmountOptions()} value={this.props.amount}/> to {this.props.target}
        </h2>
        <div className="row text-xs-center">
            <div className="col-sm-offset-1 col-sm-10 m-t-3">
              <p className="small">TransferWise uses the REAL exchange rate and charges a low, transparent fee. That's why it's cheaper. It's only fair. It's your money.</p>
            </div>
        </div>

        <ComparisonTable
          source={this.props.source}
          target={this.props.target}
          amount={this.state.amount}
          providers={JSON.parse(this.props.providers) || null}
        />
      </div>
    );
  }
}
