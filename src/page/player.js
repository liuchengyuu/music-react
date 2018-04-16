import React, { Component } from 'react';
import Progress from "../my-compontant/progress";
import {Link} from "react-router-dom";
import './player.css'
import $ from 'jquery';
import 'jplayer';

let duration = null;
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      volume: 0,
      isPlay: true
    };
    this.play = this.play.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrev = this.playPrev.bind(this);
  }

  progressChangeHandler(progress) {
    $('#player').jPlayer('play', duration * progress);
    console.log('from root widget', progress);
  }
  changeVolumeHandler(progress) {
    console.log(progress)
    $('#player').jPlayer('volume', progress);
  }
  play() {
    if (this.state.isPlay) {
      $('#player').jPlayer('pause');
      // this.refs获取的dom元素为js对象
      this.refs.musicPic.style.animationPlayState = "paused";
    } else {
      $('#player').jPlayer('play');
      this.refs.musicPic.style.animationPlayState = "running";
    }

    this.setState({
      isPlay: !this.state.isPlay
    })
  }

  playPrev() {
    this.props.callbackPlayPrev();
  }
  playNext() {
    this.props.callbackPlayNext();
  }
  changeRepeat() {

  }
  formatTime(time) {
    time = Math.floor(time);
    let min = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${min}:${seconds}`;
  }
  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration;
      this.setState({
        volume: e.jPlayer.options.volume * 100,
        progress: e.jPlayer.status.currentPercentAbsolute,
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
      });
    })
  }
  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }
  render() {
    let currentMusicItem = this.props.currentMusicItem;
    return (
      <div className="player-page">
        <h1 className="">
          <Link to="/list">我的私人音乐坊 ></Link>
        </h1>
        <div>
          <div className="control-wrapper">
            <h2 className="music-title">{currentMusicItem.title}</h2>
            <h3 className="music-artist">{currentMusicItem.artist}</h3>
            <div>{this.state.leftTime}</div>
            <div className="volume-container">
              <i className="icon-volume"></i>
              <div className="volume-wrapper">
                <Progress
                  progress={this.state.volume}
                  onProgressChange={this.changeVolumeHandler}
                  barColor="#31c27c"
                >
                </Progress>
              </div>
            </div>
            <div className="progress-container">
              <Progress
                progress={this.state.progress}
                onProgressChange={this.progressChangeHandler}
                barColor="#31c27c"
              >
              </Progress>
            </div>
            <div className="music-control">
              <div>
                <i className="icon prev" onClick={this.playPrev}></i>
                <i className={`icon ${this.state.isPlay ? 'play' : 'pause'}`} onClick={this.play}></i>
                <i className="icon next" onClick={this.playNext}></i>
              </div>
              <div className="-col-auto">
                <i className="icon repeat-cycle" onClick={this.changeRepeat}></i>
              </div>
            </div>
          </div>
          <div className="music-pic cover">
            <img ref="musicPic" className="pause" src={currentMusicItem.cover} alt="FXXK IT"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
