import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [] };
  }

  componentWillMount() {
    axios.get(`${this.props.playlist.tracks.href}?access_token=${this.props.token}`)
      .then((response) => {
        this.setState({ tracks: response.data.items });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>
          {this.props.playlist.name}
        </h3>
        {this.state.tracks.map((item, index) =>
          <div key={item.track.id + index}>{item.track.name}</div>)}
      </div>
    );
  }
}
