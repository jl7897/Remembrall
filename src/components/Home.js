import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'React Spotify',
      authToken: '',
      authorized: false,
      profile: [],
    };
  }

  render() {
    return (
      <div>Logged in successfully, {this.props.location.state.user.email}!</div>
    );
  }
}
