import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import config from '../config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'React Spotify',
      authToken: '',
      authorized: false,
      profile: [],
      redirect: false,
      current_user: {},
      auth: '',
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleAuthFlow = this.handleAuthFlow.bind(this);
  }

  componentDidMount() {
    const url = window.location.href;
    if (url.indexOf('token=') > -1) {
      const authToken = url
        .split('token=')[1]
        .split('&')[0]
        .trim();
      const authorized = true;
      this.setState({
        authToken,
        authorized,
      });
    }
  }

  handleAuthFlow(event) {
    event.preventDefault();

    if (this.state.authorized) {
      const { authToken } = this.state;
      let user;
      axios
        .get(config.spotifyProfileURL + authToken)
        .then((response) => {
          this.setState({ profile: response.data });
          user = response.data;
        })
        .then(() => {
          this.setState({
            current_user: user,
            auth: authToken,
            redirect: true,
          });
        })
        .catch((error) => {
          console.log(error);
          window.location.assign(config.spotifyWebApiURL);
        });
    } else {
      window.location.assign(config.spotifyWebApiURL);
    }
  }

  render() {
    return (
      <div>
        <div>
        {this.state.redirect
          ? <Redirect to={{
              pathname: '/home',
              state: {
                user: this.state.current_user,
                token: this.state.auth,
              },
            }}/>
          :
            <div>
              <p>
                {this.state.authorized
                  ? 'Successfully authorized! Click below to Enter!'
                  : 'Just click the button below to authorize your Spotify account to start using React Spotify!'}
              </p>
              <button
                type='button'
                onClick={this.handleAuthFlow}
              >
                {this.state.authorized
                  ? 'Proceed to React Spotify'
                  : 'Sign in with Spotify'}
              </button>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
