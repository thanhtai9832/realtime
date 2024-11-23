// Lấy tham số `time` từ URL
const params = new URLSearchParams(window.location.search);
let time = parseInt(params.get('time'), 10) || 0;

// Hàm định dạng thời gian (phút:giây)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Hiển thị và đếm ngược
const countdownElement = document.getElementById('countdown');
const timer = setInterval(() => {
    if (time <= 0) {
        clearInterval(timer);
        countdownElement.textContent = 'Hết giờ!';
    } else {
        countdownElement.textContent = `Đếm ngược: ${formatTime(time)}`;
        time--;
    }
}, 1000);
