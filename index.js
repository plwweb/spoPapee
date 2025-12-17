const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
});

async function playRandom() {
  try {
    // ขอ Access Token ใหม่จาก Refresh Token
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body['access_token']);

    // สั่งเปิดโหมด Shuffle
    await spotifyApi.setShuffle(true);
    
    // สั่งเริ่มเล่นเพลง (ถ้ามี Device เปิดทิ้งไว้)
    await spotifyApi.play();
    
    console.log('Spotify is now playing in shuffle mode!');
  } catch (err) {
    console.error('Error!', err);
  }
}

playRandom();
