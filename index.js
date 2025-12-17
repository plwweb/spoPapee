const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
});

async function startMusic() {
  try {
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body['access_token']);

    // เปิดโหมดสุ่มเพลง (Shuffle)
    await spotifyApi.setShuffle(true);
    // สั่งให้เล่นเพลงต่อ (Resume/Play)
    await spotifyApi.play();
    
    console.log('✅ Spotify is now playing randomly!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('Tip: ตรวจสอบว่าคุณเปิดแอป Spotify ทิ้งไว้ในอุปกรณ์ใดอุปกรณ์หนึ่งอยู่หรือเปล่า');
  }
}

startMusic();
