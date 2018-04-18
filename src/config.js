const string = 'https://accounts.spotify.com/authorize/?client_id=9b94bbc2722645f9b65d68b3137a0857&response_type=token&redirect_uri=http://localhost:3000/&scope=user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played';

module.exports = {
  scope: 'user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played',
  clientId: '9b94bbc2722645f9b65d68b3137a0857',
  clientSecret: 'bde19012fd6b4edca7a8b066bd6ac73a',
  redirectURI: 'http://localhost:3000/',
  spotifyWebApiURL: string,
  spotifyProfileURL: 'https://api.spotify.com/v1/me?access_token=',
};
