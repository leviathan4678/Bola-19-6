// data.js

// Mật khẩu gốc cho alice là "password123"
const OneHashedPassword = '$2b$10$fVw1iXN6F3a.8r7s3tX7o.wE5tYq/uI4oP2wS6xZ8cR9jK0bL1aBc';
// Mật khẩu gốc cho bob là "password456"
const TwoHashedPassword = '$2b$10$aB2c3dE4fG5h6iJ7kL8m9N.oP1qR2sT3uV4wX5yZ6aB7c8D9eF0gH';
// Mật khẩu gốc cho admin là "adminpass789"
const adminHashedPassword = '$2b$10$kL9m8N.oP1qR2sT3uV4wX5.yZ6aB7c8D9eF0gH1iJ2kL3m4N.oP5';

let users = [
    { id: 1, username: 'user1', password: OneHashedPassword, name: 'user1' },
    { id: 2, username: 'user2', password: TwoHashedPassword, name: 'user2' },
    { id: 3, username: 'admin', password: adminHashedPassword, name: 'Admin User' },
];
let nextUserId = 4;

let notes = [
    { id: 101, ownerId: 1, title: 'User1 Plan', content: 'Replace Admin' },
    { id: 102, ownerId: 1, title: 'List for food', content: 'Sữa, Bánh mì, Trứng.' },
    { id: 201, ownerId: 2, title: 'User2 thought', content: 'Tôi nghĩ Alice đang âm mưu gì đó.' },
];
let nextNoteId = 202;

// Xuất các biến để các file khác có thể sử dụng
module.exports = { users, notes, nextUserId, nextNoteId };
