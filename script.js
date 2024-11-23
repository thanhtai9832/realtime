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

// Tính thời gian còn lại
let remainingTime = unpackAt - currentTime; // Thời gian còn lại (giây)

// Hàm định dạng thời gian
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); // Số phút
    const remainingSeconds = seconds % 60; // Số giây còn lại
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Hiển thị và cập nhật bộ đếm
const countdownElement = document.getElementById('countdown');
const timer = setInterval(() => {
    if (remainingTime <= 0) {
        clearInterval(timer);
        countdownElement.textContent = 'Hết giờ!';
    } else {
        countdownElement.textContent = `Còn lại: ${formatTime(remainingTime)}`;
        remainingTime -= 1; // Giảm thời gian còn lại mỗi giây
    }
}, 1000); // Cập nhật mỗi giây
