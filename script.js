// Lấy tham số `data` đã mã hóa từ URL
const params = new URLSearchParams(window.location.search);
const encodedData = params.get('data'); // Tham số chứa dữ liệu mã hóa

// Giải mã Base64
let decodedData;
if (encodedData) {
    try {
        decodedData = atob(encodedData); // Giải mã Base64
        console.log("Decoded Data:", decodedData);

        // Kiểm tra dữ liệu đã giải mã
        if (!decodedData.includes('unpack_at')) {
            throw new Error('Dữ liệu đã giải mã không chứa tham số unpack_at');
        }
    } catch (error) {
        document.getElementById('countdown').textContent = `Lỗi khi giải mã dữ liệu: ${error.message}`;
        throw new Error('Failed to decode Base64: ' + error.message);
    }
} else {
    document.getElementById('countdown').textContent = 'Không có dữ liệu mã hóa trong URL!';
    throw new Error('Missing encoded data in the URL');
}

// Phân tích dữ liệu đã giải mã
const dataParams = new URLSearchParams(decodedData);

let unpackAt = parseInt(dataParams.get('unpack_at'), 10);
if (isNaN(unpackAt)) {
    document.getElementById('countdown').textContent = 'Tham số unpack_at không hợp lệ!';
    throw new Error('Invalid unpack_at value');
}

let diamondCount = dataParams.get('diamond_count') || 'N/A';
let peopleCount = dataParams.get('people_count') || 'N/A';
let box = `${diamondCount}/${peopleCount}`;

console.log("unpack_at:", unpackAt, "diamond_count:", diamondCount, "people_count:", peopleCount);

// Tính toán thời gian
const currentTime = Math.floor(Date.now() / 1000);
const offset = 0.6;
let remainingTime = Math.max((unpackAt - currentTime - offset) * 1000, 0);
const expiryTime = new Date(unpackAt * 1000).toLocaleTimeString('vi-VN', { hour12: false });

// Định dạng đếm ngược
function formatCountdown(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const tenths = String(Math.floor((milliseconds % 1000) / 100));
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
    remainingTime = Math.max(remainingTime - 100, 0);
}, 100);
