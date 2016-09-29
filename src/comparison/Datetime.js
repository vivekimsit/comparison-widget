import React, { Component } from 'react';

export default class Datetime extends Component {
  addZero(number) {
    return parseInt(number, 10) < 10 ? '0' + number : number;
  }

  render() {
    const d = new Date(this.props.date);

    return (
      <span>
        {d.getFullYear() + '-' + this.addZero(d.getMonth() + 1) + '-' + this.addZero(d.getDate())}
        {this.props.time ? <span> at {this.addZero(d.getUTCHours())}:{this.addZero(d.getUTCMinutes())}</span> : null}
      </span>
    );
  }
}
