const params = new URLSearchParams(window.location.search);

let unpackAt = parseInt(params.get('unpack_at'), 10); 
let diamondCount = params.get('diamond_count') || params.get('total_coin'); // Dùng total_coin nếu là Bag
let peopleCount = params.get('people_count') || params.get('winner_headcount'); // Dùng winner_headcount nếu là Bag

let isBox = params.has('diamond_count') && params.has('people_count');
let isBag = params.has('total_coin') && params.has('winner_headcount');

console.log("unpackAt:", unpackAt);
console.log("Diamond Count:", diamondCount);
console.log("People Count:", peopleCount);
console.log("Total Coin:", params.get('total_coin'));
console.log("Winner Headcount:", params.get('winner_headcount'));

if (isNaN(unpackAt)) {
    document.getElementById('countdown').textContent = 'Không có thông tin thời gian hết hạn!';
    throw new Error('unpack_at is missing or invalid in the URL');
}

let displayInfo = isBox
    ? `🎁 ${diamondCount}/${peopleCount}` 
    : isBag
    ? `🎒 ${diamondCount}/${peopleCount}`  // Giờ Bag cũng có diamond_count & people_count
    : '❓ Không rõ dữ liệu';

const currentTime = Math.floor(Date.now() / 1000); 
const offset = 0.6; 
let remainingTime = Math.max((unpackAt - currentTime - offset) * 1000, 0); 
const expiryTime = new Date(unpackAt * 1000).toLocaleTimeString('vi-VN', { hour12: false }); 

function formatCountdown(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const tenths = String(Math.floor((milliseconds % 1000) / 100)); 
    return `${minutes}:${seconds}:${tenths}`;
}

const countdownElement = document.getElementById('countdown');
const timer = setInterval(() => {
    if (remainingTime <= 0) {
        clearInterval(timer);
        countdownElement.innerHTML = `
            ${displayInfo}<br><br>
            Hết giờ!<br><br>
            ${expiryTime}
        `;
    } else {
        countdownElement.innerHTML = `
            ${displayInfo}<br><br>
            ${formatCountdown(remainingTime)}<br><br>
            ${expiryTime}
        `;
    }
    remainingTime -= 100; 
}, 100);
