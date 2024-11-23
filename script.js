// Lấy tham số `time` từ URL
const params = new URLSearchParams(window.location.search);
let time = parseInt(params.get('time'), 10) || 0; // Chuyển `time` thành số nguyên

// Đổi giây thành mili giây
let milliseconds = time * 1000;

// Hàm định dạng thời gian (phút:giây:phần nhỏ của giây - 1 chữ số)
function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000); // Tính số phút
    const seconds = Math.floor((milliseconds % 60000) / 1000); // Tính số giây còn lại
    const fraction = Math.floor((milliseconds % 1000) / 100); // Lấy phần nhỏ của giây (1 chữ số)
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
}, 100); // Cập nhật mỗi 100ms
