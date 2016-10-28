import React, { Component } from 'react';

import Popover from '../bootstrap/Popover';
import Amount from './Amount';
import Datetime from './Datetime';

export default class Provider extends Component {

  hasNoHiddenFees() {
    return parseFloat(this.props.hiddenFees) === 0;
  }

  popoverTitle() {
    return this.hasNoHiddenFees() ?
      <span>Transparent and only fee: <Amount currency={this.props.source} value={this.props.fees}/></span>:
      <span>
        Charges they tell you about: <Amount currency={this.props.source} value={this.props.fees}/>
        <br/>
        <span className="text-danger">Hidden charge in rate mark-up: <Amount currency={this.props.source} value={this.props.hiddenFees}/></span><br/>
      </span>;
  }

  render() {
    const barWidth = (((this.props.hiddenFees + this.props.fees) / this.props.maxFee) * 100) * 0.5;
    const feeBarWidth = (this.props.fees / (this.props.hiddenFees + this.props.fees) * 100);
    const title = this.popoverTitle();
    const fetched = <span>Fetched on: <Datetime date={this.props.collectedAt}/></span>
    return (
      <tr>
        <td className="provider-name">
          <div className="h3 font-weight-normal m-t-3"><img src={this.props.logo} width="150px" alt={this.props.name}/></div>
        </td>

        <td className="hidden-xs hidden-sm">
          <div className="m-t-3">
            <Popover trigger="hover" title={title} content={fetched}>
              <div className="progress progress-lg help-cursor" style={{position: 'relative', width: barWidth + '%', verticalAlign: 'middle', minWidth: '35px'}}>
                {parseFloat(this.props.fees) > 0 ?
                  <div className="progress-bar" style={{width: feeBarWidth + '%'}}>
                  </div> : null}
              </div>

              <Amount className="h2 font-weight-normal text-no-wrap m-l-2 help-cursor" style={{verticalAlign: 'middle', margin: 0}} currency={this.props.source} value={this.props.fees + this.props.hiddenFees}/>
            </Popover>
          </div>
          <div>
            <small className="text-primary">Upfront</small>
            {this.props.hiddenFees > 0 ? <small className="text-danger m-l-2">Hidden</small> : null}
          </div>
        </td>

        <td className="hidden-xs hidden-md hidden-lg hidden-xl text-xs-right">
          <Popover trigger="click" title={title} content={fetched}>
            <div className="progress help-cursor" style={{width: barWidth + '%'}}>
              <div className="progress-bar" style={{width: feeBarWidth + '%'}}></div>
            </div>

          <br/>
          <Amount className="m-b-0 h2 font-weight-normal no-text-wrap help-cursor" style={{display: 'inline-block'}} currency={this.props.source} value={this.props.fees + this.props.hiddenFees}/>

          <br/>
          <div style={{display: 'inline-block'}}>
            <small>
              {this.hasNoHiddenFees() ?
                'Fair and honest fee' :
                <span>Hidden in rate <Amount currency={this.props.source} value={this.props.hiddenFees}/></span>
              }
            </small>
          </div>
          </Popover>
        </td>

        <td className="text-xs-right amount-received">
          <div className="m-t-3">
            <Amount className="m-b-0 h2 font-weight-normal no-text-wrap" currency={this.props.target} value={this.props.amount}/>
            <small>
              {this.hasNoHiddenFees() ?
                <span>Real rate <span className="text-default">{this.props.rate}</span></span> :
                <span>{this.props.name} rate <span className="text-danger">{this.props.rate}</span></span>}
            </small>
          </div>
        </td>
      </tr>
    );
  }
}
