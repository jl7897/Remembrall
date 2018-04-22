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
  }

  componentWillMount() {
    this.setState({ auth: this.props.location.state });
    axios.get(`https://api.spotify.com/v1/me/playlists?access_token=${this.props.location.state.token}`)
      .then((response) => {
        console.log(response.data);
        this.setState({ play_lists: response.data.items });
      })
      .then(() => {
        axios.get(`${this.state.play_lists[2].tracks.href}?access_token=${this.props.location.state.token}`)
          .then(data => console.log('tracks: ', data))
          .catch(error => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
      {this.state.auth.token ? null : <Redirect to='/'/>}
      <div>Logged in successfully, {this.state.auth.user.email}!</div>
      {this.state.play_lists.map(item => <div key={item.name}>{item.name}</div>)}
      </div>
    );
  }
}
