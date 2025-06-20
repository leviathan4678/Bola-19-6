// index.js
const express = require('express');
require('dotenv').config(); // Phải gọi ở dòng đầu tiên để nạp biến môi trường

const app = express();
const port = 3000;

// Middleware để Express có thể đọc được dữ liệu JSON từ body của request
app.use(express.json());

// Liên kết các router
// Tất cả các route trong 'auth.js' sẽ có tiền tố '/api/auth'
app.use('/api/auth', require('./routes/auth'));
// Tất cả các route trong 'notes.js' sẽ có tiền tố '/api'
app.use('/api', require('./routes/notes'));

// Route gốc để kiểm tra server có đang chạy không
app.get('/', (req, res) => {
    res.send('BOLA vulnerable API with JWT Auth is running!');
});

app.listen(port, () => {
    console.log(`Ứng dụng có lỗ hổng đang chạy tại http://localhost:${port}`);
    console.log('Các user có sẵn: user1 (password123), user2 (password456), admin (adminpass789)');
});
