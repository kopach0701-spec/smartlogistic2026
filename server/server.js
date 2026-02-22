// server.js - УЛЬТРА ПРОСТАЯ ВЕРСИЯ

require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// ============================================
// CORS - РАЗРЕШАЕМ ВСЁ
// ============================================

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});

app.use(express.json());

// Хранилище пользователей (в памяти)
let users = [];

// ============================================
// МАРШРУТЫ
// ============================================

// Проверка сервера
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true,
        message: 'Сервер работает!',
        time: new Date()
    });
});

// Регистрация
app.post('/api/register', (req, res) => {
    console.log('📝 Регистрация:', req.body);
    
    const { name, email, password } = req.body;
    
    // Простая проверка
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Заполните все поля'
        });
    }
    
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Пароль должен быть минимум 6 символов'
        });
    }
    
    // Проверяем, существует ли пользователь
    if (users.find(u => u.email === email)) {
        return res.status(400).json({
            success: false,
            message: 'Пользователь уже существует'
        });
    }
    
    // Создаем пользователя
    const newUser = {
        id: Date.now(),
        name,
        email,
        password, // В реальном проекте нужно хешировать!
        createdAt: new Date()
    };
    
    users.push(newUser);
    
    // Создаем токен
    const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        'secret-key',
        { expiresIn: '7d' }
    );
    
    console.log('✅ Пользователь создан, всего:', users.length);
    
    res.json({
        success: true,
        message: 'Регистрация успешна',
        data: {
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            },
            token
        }
    });
});

// Вход
app.post('/api/login', (req, res) => {
    console.log('📝 Вход:', req.body);
    
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    
    if (!user || user.password !== password) {
        return res.status(401).json({
            success: false,
            message: 'Неверный email или пароль'
        });
    }
    
    const token = jwt.sign(
        { id: user.id, email: user.email },
        'secret-key',
        { expiresIn: '7d' }
    );
    
    console.log('✅ Успешный вход');
    
    res.json({
        success: true,
        message: 'Вход выполнен',
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        }
    });
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`\n✅ Сервер запущен на http://localhost:${PORT}`);
    console.log(`📝 Тест: http://localhost:${PORT}/api/health\n`);
});

app.get('/', (req, res) => {
    res.send(`
        <h1>✅ Сервер работает!</h1>
        <p>Пользователей в базе: ${users.length}</p>
        <p>Перейдите на ваш сайт: <a href="http://127.0.0.1:5500">http://127.0.0.1:5500</a></p>
    `);
});