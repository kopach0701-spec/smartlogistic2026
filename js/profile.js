// Проверка авторизации на странице профиля
document.addEventListener('DOMContentLoaded', async () => {
    const user = await getCurrentUser();
    
    if (!user) {
        window.location.href = '/auth.html';
        return;
    }

    // Обработчик кнопки выхода
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            const { error } = await supabase.auth.signOut();
            
            if (error) {
                alert('Ошибка при выходе: ' + error.message);
            } else {
                window.location.href = '/index.html';
            }
        });
    }

    // Обработчик кнопки сохранения данных
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert('Данные сохранены!');
        });
    }
});
