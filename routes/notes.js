// routes/notes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware xác thực
let { notes, nextNoteId, users } = require('../data');

// Middleware `auth` sẽ được áp dụng cho tất cả các route trong file này.

// ENDPOINT 3: [AN TOÀN] Lấy thông tin cá nhân của người dùng đang đăng nhập
router.get('/users/me', auth, (req, res) => {
    res.json(req.user);
});

// ENDPOINT 4: [AN TOÀN] Tạo một ghi chú mới cho bản thân
router.post('/notes', auth, (req, res) => {
    const { title, content } = req.body;
    const newNote = { id: nextNoteId++, ownerId: req.user.id, title, content };
    notes.push(newNote);
    res.status(201).json(newNote);
});

// ENDPOINT 5: [AN TOÀN] Lấy tất cả ghi chú của chính mình
router.get('/notes', auth, (req, res) => {
    const myNotes = notes.filter(note => note.ownerId === req.user.id);
    res.json(myNotes);
});


// ===============================================
// === CÁC API CỐ TÌNH CHỨA LỖ HỔNG BOLA BÊN DƯỚI ===
// ===============================================

// ENDPOINT 6: [LỖ HỔNG BOLA] Lấy một ghi chú bất kỳ bằng ID của nó
router.get('/notes/:noteId', auth, (req, res) => {
    const note = notes.find(n => n.id == req.params.noteId);
    if (note) {
        // LỖ HỔNG: Ứng dụng không hề kiểm tra xem người yêu cầu (req.user.id)
        // có phải là chủ sở hữu (note.ownerId) của ghi chú này không.
        res.json(note);
    } else {
        res.status(404).json({ error: 'Không tìm thấy ghi chú' });
    }
});

// ENDPOINT 7: [LỖ HỔNG BOLA] Cập nhật ghi chú bất kỳ bằng ID
router.put('/notes/:noteId', auth, (req, res) => {
    const note = notes.find(n => n.id == req.params.noteId);
    if (note) {
        // LỖ HỔNG: Tương tự, không kiểm tra quyền sở hữu trước khi cập nhật.
        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;
        res.json({ message: 'Cập nhật ghi chú thành công', note });
    } else {
        res.status(404).json({ error: 'Không tìm thấy ghi chú' });
    }
});

// ENDPOINT 8: [LỖ HỔNG BOLA] Xóa ghi chú bất kỳ bằng ID
router.delete('/notes/:noteId', auth, (req, res) => {
    const noteIndex = notes.findIndex(n => n.id == req.params.noteId);
    if (noteIndex > -1) {
        // LỖ HỔNG: Không kiểm tra quyền sở hữu trước khi xóa.
        notes.splice(noteIndex, 1);
        res.json({ message: 'Xóa ghi chú thành công' });
    } else {
        res.status(404).json({ error: 'Không tìm thấy ghi chú' });
    }
});

// ENDPOINT 9: [LỖ HỔNG BOLA] Lấy thông tin user bất kỳ bằng ID
router.get('/users/:id', auth, (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        // LỖ HỔNG: Bất kỳ ai đăng nhập cũng xem được profile người khác.
        // Mặc dù đã ẩn password, việc lộ thông tin khác vẫn là một rủi ro.
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } else {
        res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }
});

// ENDPOINT 10: [LỖ HỔNG BOLA] Cập nhật thông tin user bất kỳ bằng ID
router.put('/users/:id', auth, (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        // LỖ HỔNG: Không kiểm tra xem người yêu cầu (req.user.id)
        // có phải là người dùng đang bị cập nhật (req.params.id) không.
        user.name = req.body.name || user.name;
        res.json({ message: 'Cập nhật người dùng thành công', user: {id: user.id, name: user.name} });
    } else {
        res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }
});

module.exports = router;
