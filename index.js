const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN
});

async function startMusic() {
  try {
    // 1. ขอ Access Token ใหม่
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body['access_token']);

    // 2. ดึงรายชื่ออุปกรณ์ที่ผูกกับบัญชีนี้
    const devices = await spotifyApi.getMyDevices();
    const deviceList = devices.body.devices;

    if (deviceList.length === 0) {
      console.log('❌ ไม่พบอุปกรณ์ที่ออนไลน์อยู่ กรุณาเปิดแอป Spotify ใน iPad หรือมือถือทิ้งไว้');
      return;
    }

    // 3. เลือกอุปกรณ์ตัวแรกที่เจอ (หรือตัวที่กำลัง Active อยู่)
    const activeDevice = deviceList.find(d => d.is_active) || deviceList[0];
    console.log(`📱 กำลังเชื่อมต่อไปยังอุปกรณ์: ${activeDevice.name}`);

    // 4. สั่งให้เล่นเพลงแบบ Shuffle
    await spotifyApi.setShuffle(true, { device_id: activeDevice.id });
    await spotifyApi.play({ device_id: activeDevice.id });
    
    console.log('✅ สั่งเล่นเพลงสำเร็จ! เพลงกำลังรันอยู่บน: ' + activeDevice.name);
  } catch (err) {
    console.error('❌ เกิดข้อผิดพลาด:', err.message);
    if (err.message.includes('PREMIUM_REQUIRED')) {
      console.log('แจ้งเตือน: บัญชีของคุณไม่ใช่ Premium จึงสั่งงานผ่าน API ไม่ได้');
    }
  }
}

startMusic();
