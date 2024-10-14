import { RoomServiceClient, AccessToken } from "livekit-server-sdk";

const { LIVEKIT_URL: url, LIVEKIT_API_KEY: apiKey, LIVEKIT_API_SECRET: apiSecret } = process.env;

console.log(url, apiKey, apiSecret);

const roomName = "tet-room-" + generateRandomString();
const identity = "test-user-" + generateRandomString();

const createRoom = async () => {
  const svc = new RoomServiceClient(url, apiKey, apiSecret);

  return svc.createRoom({
    name: roomName,
    emptyTimeout: 100 * 60,
    maxParticipants: 20,
  });
};

function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


createRoom().then(async (res) => {
  const at = new AccessToken(apiKey, apiSecret, {
    identity,
  });
  at.addGrant({ roomJoin: true, room: roomName });

  console.log(await at.toJwt());
});
