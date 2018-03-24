import React, { Component } from 'react';
import './App.css';
import Header from "./my-compontant/header";
import Player from "./page/player"
import $ from 'jquery';
import 'jplayer';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $('#player').jPlayer({
      ready: function () {
        $(this).jPlayer('setMedia', {
          mp3: 'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131229550.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3'
        }).jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div>
        <Header/>
        <Player>
        </Player>
      </div>
    );
  }
}

export default App;
