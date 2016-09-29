import React, { Component } from 'react';

export default class Amount extends Component {
  render() {
    let {currency, value, ...props} = this.props;
    return (
      <span {...props}>{parseFloat(value).toFixed(2)} <span style={{fontSize: '0.7em'}}>{currency}</span></span>
    );
  }
}
