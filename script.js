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

// Trừ độ trễ 2.3 giây
const offset = 2.3; // Độ trễ (giây)

// Tính thời gian còn lại, bù trừ 2.3 giây
let remainingTime = Math.max((unpackAt - currentTime - offset) * 1000, 0); // Chuyển sang mili giây, đảm bảo không âm

// Lấy thời gian hết hạn ở dạng cố định (giờ:phút:giây)
const expiryTime = new Date(unpackAt * 1000).toLocaleTimeString('vi-VN', { hour12: false });

// Hàm định dạng thời gian đếm ngược (phút:giây:mili giây)
function formatCountdown(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millis = Math.floor(milliseconds % 100);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${millis.toString().padStart(3, '0')}`;
}

// Hiển thị và cập nhật bộ đếm
const countdownElement = document.getElementById('countdown');
const timer = setInterval(() => {
    if (remainingTime <= 0) {
        clearInterval(timer);
        countdownElement.textContent = `Hết giờ! | Hết hạn: ${expiryTime}`;
    } else {
        countdownElement.textContent = `Còn lại: ${formatCountdown(remainingTime)} | Hết hạn: ${expiryTime}`;
        remainingTime -= 50; // Giảm thời gian còn lại mỗi 50ms
    }
}, 50); // Cập nhật mỗi 50ms
