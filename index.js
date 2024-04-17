import { RoomServiceClient } from "livekit-server-sdk";

const roomList = async () => {
  const svc = new RoomServiceClient(
    "http://127.0.0.1:7880",
    "devkey",
    "secret"
  );

  const opts = {
    name: "myroom",
    emptyTimeout: 10 * 60, // 10 minutes
    maxParticipants: 20,
  };
  return svc.createRoom(opts);
};

roomList().then((res) => {
    console.log(res);
});