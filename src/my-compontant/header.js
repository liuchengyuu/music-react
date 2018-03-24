import React, { Component } from 'react';
import './header.css'
import logoImg from '../static/images/logo.png'

class Header extends Component {
  render() {
    return (
      <div className="components-header row">
        <img src={logoImg} width="40" alt=""/>
        <h1 className="caption">React Music Player</h1>
      </div>
    );
  }
}

export default Header;