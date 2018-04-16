import React, { Component } from 'react';
import './musiclistitem.css'

class MusicListItem extends Component {

  playMusic(musicItem) {
    this.props.callbackPlayOther(musicItem);
  }
  render() {
    let musicItem = this.props.musicItem;
    return (
      <li className={`components-musiclistitem ${this.props.focus ? 'focus' : ''}`}
        onClick={this.playMusic.bind(this, musicItem)}>
        <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
      </li>
    );
  }
}

export default MusicListItem;