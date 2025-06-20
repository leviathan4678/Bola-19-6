// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Lấy token từ header Authorization. Định dạng chuẩn là "Bearer [token]"
    const authHeader = req.header('Authorization');

    // Nếu không có header hoặc không đúng định dạng
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Không có token, quyền truy cập bị từ chối' });
    }

    try {
        // Tách lấy phần token từ chuỗi "Bearer [token]"
        const token = authHeader.split(' ')[1];

        // Xác thực token với mã bí mật
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Nếu token hợp lệ, giải mã và gán thông tin user vào đối tượng request
        // để các hàm xử lý sau có thể sử dụng
        req.user = decoded.user;
        next(); // Cho phép request đi tiếp
    } catch (err) {
        // Nếu token không hợp lệ (hết hạn, sai chữ ký,...)
        res.status(401).json({ msg: 'Token không hợp lệ' });
    }
};
