// Lấy tham số từ URL
const params = new URLSearchParams(window.location.search);
let unpackAt = parseInt(params.get('unpack_at'), 10); // Lấy thời gian hết hạn
let diamondCount = params.get('diamond_count') || 'N/A'; // Lấy diamond_count từ URL
let peopleCount = params.get('people_count') || 'N/A'; // Lấy people_count từ URL
let box = `${diamondCount}/${peopleCount}`; // Ghép diamond_count và people_count

// Kiểm tra nếu không có `unpack_at` trong URL
if (!unpackAt) {
    document.getElementById('countdown').textContent = 'Không có thông tin thời gian hết hạn!';
    throw new Error('unpack_at is missing in the URL');
}

// Lấy thời gian hiện tại
const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (timestamp dạng giây)

// Trừ độ trễ 1.3 giây
const offset = 1.6; // Độ trễ (giây)

// Tính thời gian còn lại, bù trừ độ trễ
let remainingTime = Math.max((unpackAt - currentTime - offset) * 1000, 0); // Chuyển sang mili giây, đảm bảo không âm

// Lấy thời gian hết hạn ở dạng cố định (giờ:phút:giây)
const expiryTime = new Date(unpackAt * 1000).toLocaleTimeString('vi-VN', { hour12: false });

// Hàm định dạng thời gian đếm ngược (phút:giây:1/10 giây)
function formatCountdown(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const tenths = Math.floor((milliseconds % 1000) / 100); // Lấy phần 1/10 giây
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${tenths}`;
}

// Hiển thị và cập nhật bộ đếm
const countdownElement = document.getElementById('countdown');
const timer = setInterval(() => {
    if (remainingTime <= 0) {
        clearInterval(timer);
        countdownElement.innerHTML = `
            ${box}<br><br>
            ${formatCountdown(0)}<br><br>
            ${expiryTime}
        `;
    } else {
        countdownElement.innerHTML = `
            ${box}<br><br>
            ${formatCountdown(remainingTime)}<br><br>
            ${expiryTime}
        `;
        remainingTime -= 100; // Giảm thời gian còn lại mỗi 100ms (tương ứng 1/10 giây)
    }
}, 100); // Cập nhật mỗi 100ms

