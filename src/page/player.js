import React, { Component } from 'react';
import Progress from "../my-compontant/progress";
import './player.css'
import $ from 'jquery';
import 'jplayer';

let duration = null;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {progress: '-'};
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

    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute
      });
    })
  }
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }
  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress);
    console.log('from root widget', progress);
  }
  render() {
    return (
      <div className="player-page">
        <h1>我的私人音乐坊</h1>
        <h2 className="music-title">音乐标题</h2>
        <h3 className="music-artist">作者</h3>
        <div className="volume-container">
          <span></span>
          <div className="volume-wrapper">
            <Progress
              progress={this.state.progress}
              onVolumeChange={this.progressChangeHandler}
              barColor="#ff0000"
            >
            </Progress>
          </div>
        </div>
        <div className="progress-container">
          <Progress
            progress={this.state.progress}
            onProgressChange={this.progressChangeHandler}
            barColor="#ff0000"
          >
          </Progress>
        </div>
        <div id="player">

        </div>
      </div>
    );
  }
}

export default App;
