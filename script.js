// Lấy tham số `data` đã mã hóa từ URL
const params = new URLSearchParams(window.location.search);
const encodedData = params.get('data'); // Tham số chứa dữ liệu mã hóa

// Giải mã Base64
let decodedData;
if (encodedData) {
    try {
        // Giải mã Base64
        decodedData = atob(encodedData);
        console.log("Decoded Data:", decodedData); // Log dữ liệu sau giải mã

        // Kiểm tra nếu dữ liệu không chứa 'unpack_at'
        if (!decodedData.includes('unpack_at')) {
            console.error("Dữ liệu đã giải mã không chứa 'unpack_at':", decodedData);
            document.getElementById('countdown').textContent = 'Dữ liệu đã giải mã không chứa thông tin thời gian hết hạn!';
            throw new Error('Dữ liệu đã giải mã không chứa unpack_at');
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
let dataParams;
try {
    dataParams = new URLSearchParams(decodedData);
    console.log("Decoded Data as Params:", Array.from(dataParams.entries())); // Log tất cả tham số
} catch (error) {
    console.error("Dữ liệu giải mã không hợp lệ để phân tích:", decodedData);
    document.getElementById('countdown').textContent = 'Dữ liệu đã giải mã không hợp lệ!';
    throw new Error('Invalid decoded data format: ' + decodedData);
}

// Kiểm tra và log tham số unpack_at
let unpackAt = dataParams.get('unpack_at');
console.log("Tham số unpack_at (chuỗi):", unpackAt);

if (!unpackAt) {
    document.getElementById('countdown').textContent = 'Tham số unpack_at không tồn tại!';
    throw new Error('Missing unpack_at parameter');
}

unpackAt = parseInt(unpackAt, 10);
if (isNaN(unpackAt)) {
    console.error("Tham số 'unpack_at' không hợp lệ hoặc không phải số:", unpackAt);
    document.getElementById('countdown').textContent = 'Tham số unpack_at không hợp lệ!';
    throw new Error('Invalid unpack_at value: ' + unpackAt);
}

console.log("unpack_at (số nguyên):", unpackAt);

// Lấy các tham số khác
let diamondCount = dataParams.get('diamond_count') || 'N/A';
let peopleCount = dataParams.get('people_count') || 'N/A';
let box = `${diamondCount}/${peopleCount}`;

// Log các tham số
console.log("diamond_count:", diamondCount);
console.log("people_count:", peopleCount);

// Tính toán thời gian
const currentTime = Math.floor(Date.now() / 1000);
const offset = 0.6; // Bù độ trễ
let remainingTime = Math.max((unpackAt - currentTime - offset) * 1000, 0);
const expiryTime = new Date(unpackAt * 1000).toLocaleTimeString('vi-VN', { hour12: false });

// Hàm định dạng thời gian đếm ngược
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
