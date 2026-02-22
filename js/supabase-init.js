// Инициализация Supabase клиента
const SUPABASE_URL = 'https://pdmrkgdyisllrfnujwqf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkbXJrZ2R5aXNsbHJmbnVqd3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MDIwNDEsImV4cCI6MjA4MDE3ODA0MX0.X6B5-UKDnpvBUGTX2SVYq9cGGi0WMFzsG8YjTpR2E8c';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Функция проверки авторизации
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

// Функция получения текущего пользователя
async function getCurrentUser() {
    const session = await checkAuth();
    return session ? session.user : null;
}

// Обработчик кнопки профиля в навигации
document.addEventListener('DOMContentLoaded', async () => {
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', async () => {
            const user = await getCurrentUser();
            if (user) {
                window.location.href = '/profile.html';
            } else {
                window.location.href = '/auth.html';
            }
        });
    }
});
