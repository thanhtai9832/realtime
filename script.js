// Lấy tham số `unpack_at` từ URL
const params = new URLSearchParams(window.location.search);
let unpackAt = parseInt(params.get('unpack_at'), 10); // Lấy thời gian hết hạn từ URL (timestamp dạng giây)

// Kiểm tra nếu không có `unpack_at` trong URL
if (!unpackAt) {
    document.getElementById('countdown').textContent = 'Không có thông tin thời gian hết hạn!';
    throw new Error('unpack_at is missing in the URL');
}

// Lấy thời gian hiện tại
const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (timestamp dạng giây)

// Trừ độ trễ 2 giây
const offset = 2; // Độ trễ (giây)

// Tính thời gian còn lại, bù trừ độ trễ
let remainingTimeMs = Math.max((unpackAt - currentTime - offset) * 1000, 0); // Thời gian còn lại (mili giây)

// Tạo chuỗi hiển thị "time hết giờ"
function formatFullTime(timestamp) {
    const date = new Date(timestamp * 1000); // Chuyển đổi timestamp sang mili giây
    const hours = date.getHours().toString().padStart(2, '0'); // Giờ
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Phút
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Giây
    return `${hours}:${minutes}:${seconds}`;
}

// Hiển thị thời gian hết giờ
const expireTimeElement = document.getElementById('expire-time');
expireTimeElement.textContent = `Hết giờ vào: ${formatFullTime(unpackAt)}`;

// Hàm định dạng thời gian còn lại
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000); // Tổng số giây
    const minutes = Math.floor(totalSeconds / 60); // Số phút
    const seconds = totalSeconds % 60; // Số giây còn lại
    const fraction = Math.floor((milliseconds % 1000) / 100); // Phần nhỏ của giây (1 chữ số)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${fraction}`;
}

// Hiển thị và cập nhật bộ đếm
const countdownElement = document.getElementById('countdown');
const timer = setInterval(() => {
    if (remainingTimeMs <= 0) {
        clearInterval(timer);
        countdownElement.textContent = 'Hết giờ!';
    } else {
        countdownElement.textContent = `Còn lại: ${formatTime(remainingTimeMs)}`;
        remainingTimeMs -= 100; // Giảm thời gian còn lại mỗi 100ms
    }
}, 100); // Cập nhật mỗi 100ms
