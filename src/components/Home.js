import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play_lists: [],
      auth: {},
    };
    this.expandPlaylist = this.expandPlaylist.bind(this);
  }

  componentWillMount() {
    this.setState({ auth: this.props.location.state });
    axios.get(`https://api.spotify.com/v1/me/playlists?access_token=${this.props.location.state.token}`)
      .then((response) => {
        console.log(response.data);
        this.setState({ play_lists: response.data.items });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  expandPlaylist(index) {
    axios.get(`${this.state.play_lists[index].tracks.href}?access_token=${this.props.location.state.token}`)
      .then((tracks) => {
        console.log('the tracks of the playlist: ', tracks);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
      {this.state.auth.token ? null : <Redirect to='/'/>}
      <div>Logged in successfully, {this.state.auth.user.email}!</div>
      {this.state.play_lists.map((item, index) =>
        <div key={item.name} onClick={() => this.expandPlaylist(index)}>{item.name}</div>)}
      </div>
    );
  }
}
