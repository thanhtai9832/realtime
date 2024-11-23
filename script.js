// Lấy tham số từ URL
const params = new URLSearchParams(window.location.search);

// Lấy các tham số từ URL và log để kiểm tra
let unpackAt = parseInt(params.get('unpack_at'), 10); // Thời gian hết hạn
let diamondCount = params.get('diamond_count') || 'N/A'; // Số lượng kim cương
let peopleCount = params.get('people_count') || 'N/A'; // Số lượng người

// Log để kiểm tra giá trị
console.log("unpackAt:", unpackAt);
console.log("Diamond Count:", diamondCount);
console.log("People Count:", peopleCount);

let box = `${diamondCount}/${peopleCount}`; // Ghép diamond_count và people_count

// Kiểm tra nếu không có `unpack_at` hoặc `unpack_at` không hợp lệ
if (isNaN(unpackAt)) {
    document.getElementById('countdown').textContent = 'Không có thông tin thời gian hết hạn!';
    throw new Error('unpack_at is missing or invalid in the URL');
}

// Lấy thời gian hiện tại
const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại (timestamp dạng giây)

// Trừ độ trễ 0.6 giây
const offset = 0.6; // Độ trễ (giây)

// Tính thời gian còn lại, đảm bảo không âm
let remainingTime = Math.max((unpackAt - currentTime - offset) * 1000, 0); // Chuyển sang mili giây
const expiryTime = new Date(unpackAt * 1000).toLocaleTimeString('vi-VN', { hour12: false }); // Thời gian hết hạn

// Hàm định dạng thời gian đếm ngược (phút:giây:1/10 giây)
function formatCountdown(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const tenths = String(Math.floor((milliseconds % 1000) / 100)); // Lấy phần 1/10 giây
    return `${minutes}:${seconds}:${tenths}`;
}

// Hiển thị và cập nhật bộ đếm
const countdownElement = document.getElementById('countdown');
const timer = setInterval(() => {
    if (remainingTime <= 0) {
        clearInterval(timer);
        countdownElement.innerHTML = `
            ${box}<br><br>
            Hết giờ!<br><br>
            ${expiryTime}
        `;
    } else {
        countdownElement.innerHTML = `
            ${box}<br><br>
            ${formatCountdown(remainingTime)}<br><br>
            ${expiryTime}
        `;
    }
    remainingTime -= 100; // Giảm thời gian còn lại mỗi 100ms (tương ứng 1/10 giây)
}, 100); // Cập nhật mỗi 100ms
