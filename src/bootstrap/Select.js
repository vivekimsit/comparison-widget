import React, { Component } from 'react';
import Option from './Option';
import './Select.css';

export default class Select extends Component {
  state = {
    open: false,
    value: this.props.value ? this.props.options[this.props.value] : this.firstValue()
  }

  firstValue() {
    return this.props.options[Object.keys(this.props.options)[0]];
  }

  openDropdown = (e) => {
    e.preventDefault();
    setTimeout(() => this.setState({open: true}), 10);
  }

  select = (value) => {
    this.setState({
      value: this.props.options[value],
      open: false
    });

    this.props.onChange(value);
  }

  closeDropdown = (e)  => {
    if (this.state.open) {
      this.setState({open: false});
    }
  }

  componentDidMount() {
      window.addEventListener('click', this.closeDropdown, false);
  }

  componentWillUnmount() {
      window.removeEventListener('click', this.closeDropdown, false);
  }

  render() {
    return (
      <div className={this.state.open ? 'Select open' : 'Select'}>
        <a href="" onClick={this.openDropdown} className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
            {this.state.value} <span className="caret"></span>
        </a>
        <ul className="dropdown-menu" role="menu" aria-labelledby="dropdown-label">
            {Object.keys(this.props.options).map(k => <Option key={k} value={k} label={this.props.options[k]} onClick={this.select}/>)}
        </ul>
      </div>
    );
  }
}
