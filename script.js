// Lấy tham số `time` và `startTime` từ URL
const params = new URLSearchParams(window.location.search);
let time = parseInt(params.get('time'), 10) || 0; // Thời gian ban đầu (giây)
let startTime = parseInt(params.get('startTime'), 10) || Date.now(); // Timestamp bắt đầu

// Đổi giây thành mili giây
let initialMilliseconds = time * 1000;

// Tính thời gian đã trôi qua
let elapsedMilliseconds = Date.now() - startTime;
let milliseconds = Math.max(initialMilliseconds - elapsedMilliseconds, 0); // Thời gian còn lại (đảm bảo không âm)

// Hàm định dạng thời gian
function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const fraction = Math.floor((milliseconds % 1000) / 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${fraction}`;
}

// Hiển thị và đếm ngược
const countdownElement = document.getElementById('countdown');

const timer = setInterval(() => {
    if (milliseconds <= 0) {
        clearInterval(timer);
        countdownElement.textContent = 'Hết giờ!';
    } else {
        countdownElement.textContent = `Đếm ngược: ${formatTime(milliseconds)}`;
        milliseconds -= 100; // Giảm 100ms mỗi lần
    }
}, 100);
