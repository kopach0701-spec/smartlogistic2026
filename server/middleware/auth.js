const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Middleware для защиты маршрутов
const protect = async (req, res, next) => {
    let token;
    
    // Проверяем наличие токена в заголовках
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Нет доступа. Пожалуйста, авторизуйтесь.'
        });
    }
    
    try {
        // Проверяем токен
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Находим пользователя
        req.user = await User.findById(decoded.id);
        
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Недействительный токен. Пожалуйста, авторизуйтесь снова.'
        });
    }
};

module.exports = { protect };