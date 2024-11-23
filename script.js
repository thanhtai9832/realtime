// Lấy tham số từ URL
const params = new URLSearchParams(window.location.search);
let initialTime = parseInt(params.get('time'), 10) || 0;  // Thời gian ban đầu (giây)
let startTime = parseInt(params.get('start_time'), 10) || 0;  // Thời gian bắt đầu (Unix timestamp)

// Lấy thời gian hiện tại
let currentTimestamp = Math.floor(Date.now() / 1000);  // Unix timestamp hiện tại (giây)

// Tính toán thời gian đã trôi qua và còn lại
let elapsedTime = Math.max(currentTimestamp - startTime, 0);  // Đảm bảo không âm
let remainingTime = Math.max(initialTime - elapsedTime, 0);  // Thời gian còn lại (giây)

// Log để kiểm tra
console.log("Initial Time:", initialTime);
console.log("Start Time:", startTime);
console.log("Current Timestamp:", currentTimestamp);
console.log("Elapsed Time:", elapsedTime);
console.log("Remaining Time:", remainingTime);

// Hiển thị đếm ngược
const countdownElement = document.getElementById('countdown');
let remainingMilliseconds = remainingTime * 1000;  // Chuyển sang mili giây

if (remainingMilliseconds <= 0) {
    // Hết giờ
    countdownElement.textContent = 'Hết giờ!';
} else {
    // Bắt đầu đếm ngược
    const timer = setInterval(() => {
        if (remainingMilliseconds <= 0) {
            clearInterval(timer);
            countdownElement.textContent = 'Hết giờ!';
        } else {
            countdownElement.textContent = `Đếm ngược: ${formatTime(remainingMilliseconds)}`;
            remainingMilliseconds -= 100;  // Giảm mỗi 100ms
        }
    }, 100);  // Cập nhật mỗi 100ms
}
