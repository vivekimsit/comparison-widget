import React, { Component } from 'react';

const SHOW_DELAY = 5;
const DISABLED = {
  active: false,
  top: -10000,
  left: -10000,
  popoverHeight: 0,
  popoverWidth: 0,
  wrapperWidth: 0
}

export default class Popover extends Component {
  state = DISABLED;

  click = () => {
    if (this.props.trigger === 'click') {
      setTimeout(() => this.activate(), SHOW_DELAY);
    }
  }

  activate() {
    const wrapperPosition = this.refs.wrapper.getBoundingClientRect();
    const popoverPosition = this.refs.popover.getBoundingClientRect();

    console.log(wrapperPosition)

    this.setState({
      active: true,
      top: wrapperPosition.top + window.scrollY,
      left: wrapperPosition.left + window.scrollX,
      popoverHeight: this.refs.popover.scrollHeight,
      popoverWidth: popoverPosition.width,
      wrapperWidth: wrapperPosition.width
    });
  }

  disable() {
    this.setState(DISABLED);
  }

  blur = () => {
    if (this.state.active) {
      this.disable();
    }
  }

  mouseOver = () => {
    if (this.props.trigger === 'hover') {
      this.activate();
    }
  }

  mouseOut = () => {
    if (this.props.trigger === 'hover') {
      this.disable();
    }
  }

  componentDidMount() {
    if (this.props.trigger === 'click') {
      window.addEventListener('click', this.blur, false);
      window.addEventListener('resize', this.blur, false);
    }
  }

  componentWillUnmount() {
    if (this.props.trigger === 'click') {
      window.removeEventListener('click', this.blur, false);
      window.removeEventListener('resize', this.blur, false);
    }
  }

  render() {
    const classes = 'popover top fade' + (this.state.active ? ' in' : '');
    const styles = {
      display: 'block',
      top: this.state.top - this.state.popoverHeight,
      left: this.state.left - (this.state.popoverWidth / 2) + (this.state.wrapperWidth / 2)
    };

    return (
      <span onClick={this.click} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <span ref="wrapper">
          {this.props.children}
        </span>
        <div className={classes} style={styles} ref="popover">
          <div className="arrow"></div>
          {this.props.title ? <h3 className="popover-title">{this.props.title}</h3> : null}
          {this.props.content ? <div className="popover-content">{this.props.content}</div> : null}
        </div>
      </span>
    );
  }
}
