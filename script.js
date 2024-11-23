// Lấy tham số từ URL
const params = new URLSearchParams(window.location.search);
let initialTime = parseInt(params.get('time'), 10) || 0;  // Thời gian ban đầu (giây)
let startTime = parseInt(params.get('start_time'), 10) || 0;  // Thời gian gốc (Unix timestamp)

// Lấy thời gian hiện tại
let currentTimestamp = Math.floor(Date.now() / 1000);  // Unix timestamp hiện tại (giây)

// Tính toán thời gian đã trôi qua
let elapsedTime = Math.max(currentTimestamp - startTime, 0);  // Đảm bảo không âm
let remainingTime = Math.max(initialTime - elapsedTime, 0);  // Thời gian còn lại (giây)

// Log giá trị để kiểm tra
console.log("Initial Time (giây):", initialTime);
console.log("Start Time (timestamp):", startTime);
console.log("Current Timestamp:", currentTimestamp);
console.log("Elapsed Time (giây):", elapsedTime);
console.log("Remaining Time (giây):", remainingTime);

// Hàm định dạng thời gian (phút:giây:phần nhỏ của giây)
function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000); // Tính phút
    const seconds = Math.floor((milliseconds % 60000) / 1000); // Tính giây
    const fraction = Math.floor((milliseconds % 1000) / 100); // Phần nhỏ của giây (1 chữ số)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${fraction}`;
}

// Hiển thị đếm ngược
const countdownElement = document.getElementById('countdown');
let remainingMilliseconds = remainingTime * 1000;  // Chuyển thời gian còn lại sang mili giây

if (remainingMilliseconds <= 0) {
    // Nếu hết giờ ngay khi mở
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
