// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let { users, nextUserId } = require('../data'); // Dùng let để có thể thay đổi

// ENDPOINT 1: [AN TOÀN] Đăng ký người dùng mới
router.post('/register', async (req, res) => {
    const { username, password, name } = req.body;

    try {
        if (users.find(u => u.username === username)) {
            return res.status(400).json({ msg: 'Tên người dùng đã tồn tại' });
        }

        // Băm mật khẩu bằng bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: nextUserId++,
            username,
            password: hashedPassword,
            name: name || username
        };
        users.push(newUser);

        res.status(201).json({ msg: 'Đăng ký người dùng thành công', userId: newUser.id });
    } catch (err) {
        res.status(500).send('Lỗi máy chủ');
    }
});

// ENDPOINT 2: [AN TOÀN] Đăng nhập và nhận JWT Token
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ msg: 'Thông tin đăng nhập không hợp lệ' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Thông tin đăng nhập không hợp lệ' });
        }

        const payload = { user: { id: user.id, username: user.username } };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Token sẽ hết hạn sau 1 giờ
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        res.status(500).send('Lỗi máy chủ');
    }
});

module.exports = router;

