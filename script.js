class User {
    constructor(ip, x, y, connectTime) {
        this.ip = ip;
        this.x = x;
        this.y = y;
        //this.connectTime = connectTime;
    }
}

const webSocket = new WebSocket("wss://ec2-13-124-8-41.ap-northeast-2.compute.amazonaws.com:9000");

// 웹 소켓 연결 이벤트
webSocket.onopen = function () {
    alert("웹소켓 서버와 연결에 성공했습니다.");

    // 접속 IP는 서버에서 받아온다고 가정
    const ip = "0.0.0.0"; // 실제로는 서버로부터 IP를 받아와야 함

    // 현재 시간
    //const connectTime = new Date().toISOString();

    // 마우스 위치 추적
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    // User 객체 생성
    const user = new User(ip, mouseX, mouseY);

    // User 객체를 서버로 전송
    webSocket.send(JSON.stringify(user));
};

// 웹 소켓 메세지 수신
webSocket.onmessage = function (event) {
    alert(event.data);
};

// 웹 소켓 연결 종료
webSocket.onclose = function () {
    alert("웹소켓 서버와 연결이 종료되었습니다.");
};

// 오류 발생
webSocket.onerror = function (error) {
    console.log(error);
};

function sendMessage() {
    const message = document.getElementById("message").value;
    webSocket.send(message);
}




