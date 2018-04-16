import React, { Component } from 'react';
import MusicListItem from '../my-compontant/musiclistitem'
class MusicList extends Component {
  onCallbackPlayOther(musicItem) {
    this.props.callbackPlay(musicItem);
  }
  render() {
    let listEle = this.props.musicList.map((item) => {
      return (
        <MusicListItem
          focus={item === this.props.currentMusicItem}
          key={item.id}
          musicItem={item}
          callbackPlayOther={this.onCallbackPlayOther.bind(this)}>
        </MusicListItem>
      );
    })
    return (
      <ul>
        {listEle}
      </ul>
    );
  }
}

export default MusicList;
