import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom'
import {Route, Switch} from 'react-router';
import './App.css';
import './static/css/common.css'
import Header from "./my-compontant/header";

import {MUSIC_LIST} from "./config/musiclist";
import MusicList from "./page/musiclist";
import $ from 'jquery';
import 'jplayer';
import Player from "./page/player";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[1]
    };
    this.playNext = this.playNext.bind(this);
    this.playPrev = this.playPrev.bind(this);
    this.playMusic = this.playMusic.bind(this);
  }
  componentDidMount() {
    var file = this.state.currentMusicItem.file;
    $('#player').jPlayer({
      ready: function () {
        $(this).jPlayer('setMedia', {
          mp3: file
        }).jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });
    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playNext();
    });
  }
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.ended);
  }
  playMusic(musicItem) {
    $('#player').jPlayer('setMedia', {
      mp3: musicItem.file
    }).jPlayer('play');

    this.setState({
      currentMusicItem: musicItem
    });
  }
  playPrev() {
    this.playNext('prev');
  }
  playNext(type = 'next') {
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length;

    if (type === 'next') {
      newIndex = (index +1) % musicListLength;
    } else {
      newIndex = (index - 1 + musicListLength) % musicListLength;
    }
    this.playMusic(this.state.musicList[newIndex]);
  }
  findMusicIndex(musicItem) {
    return this.state.musicList.indexOf(musicItem);
  }
  render() {
    return (
      <div>
        <Header/>
          
        <div id="player"></div>
      </div>
    );
  }
}

export default App;
