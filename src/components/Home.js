import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Playlist from './Playlist';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play_lists: [],
      displayedTracks: [],
      user: {},
      token: '',
    };
  }

  componentWillMount() {
    if (this.props.location.state) {
      this.setState({
        user: this.props.location.state.user,
        token: this.props.location.state.token,
      });
      axios.get(`https://api.spotify.com/v1/me/playlists?access_token=${this.props.location.state.token}`)
        .then((response) => {
          this.setState({ play_lists: response.data.items });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.token ? null : <Redirect to='/' /> }
      <div>Logged in successfully, {this.state.user.email}!</div>
      {this.state.play_lists.map(playlist =>
        <Playlist key={playlist.name} playlist={playlist} token={this.state.token}/>)}
      </div>
    );
  }
}
