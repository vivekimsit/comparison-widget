import React, { Component } from 'react';

export default class Option extends Component {
  click = (e) => {
    e.preventDefault();
    this.props.onClick(this.props.value);
  }

  render() {
    return (
      <li>
        <a href="" onClick={this.click}>{this.props.label}</a>
      </li>
    );
  }
}
