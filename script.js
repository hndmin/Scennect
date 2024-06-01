class User {
    constructor(id, x, y) {
      this.id = id;
      this.x = x;
      this.y = y;
    }
  }

// WebSocket URL을 wss로 변경
const webSocket = new WebSocket("wss://ec2-13-124-8-41.ap-northeast-2.compute.amazonaws.com:9000");
const userId = Math.random().toString(36).substr(2, 9); // 유저를 구분할 ID
const usersDiv = document.getElementById("users");
const userPointers = {};

// 유저 포인터 업데이트
function updateUserPointer(id, x, y) {
  if (!userPointers[id]) {
    const pointer = document.createElement("div");
    pointer.classList.add("user-pointer");
    usersDiv.appendChild(pointer);
    userPointers[id] = pointer;
  }
  userPointers[id].style.left = `${x}px`;
  userPointers[id].style.top = `${y}px`;
}

// 마우스 위치 추적 및 서버로 전송
document.addEventListener("mousemove", (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const user = new User(userId, x, y);
  webSocket.send(JSON.stringify(user));
});

// 웹 소켓 연결 이벤트
webSocket.onopen = function () {
  console.log("웹소켓 서버와 연결에 성공했습니다.");
};

// 웹 소켓 메세지 수신
webSocket.onmessage = function (event) {
  const users = JSON.parse(event.data);
  users.forEach(user => {
    updateUserPointer(user.id, user.x, user.y);
  });
};

// 웹 소켓 연결 종료
webSocket.onclose = function () {
  console.log("웹소켓 서버와 연결이 종료되었습니다.");
};

// 오류 발생
webSocket.onerror = function (error) {
  console.log(error);
};