// form-handler.js

// Функция для обработки отправки формы
function handleFormSubmit(event) {
    event.preventDefault();

    let errorMessage = '';

    // Валидация полей
    errorMessage += validateX();
    errorMessage += validateY();
    errorMessage += validateR();

    const form = document.getElementById('user-form');

    // Если есть ошибки, отображаем их
    if (errorMessage !== '') {
        showErrorMessage(form, errorMessage);
        return;
    } else {
        clearErrorMessage();
    }

    // Собираем данные формы
    const xValue = document.querySelector('input[name="x"]:checked').value;
    const yValue = document.getElementById('y').value.trim();
    const rValue = document.querySelector('input[name="r"]:checked').value;

    const params = new URLSearchParams();
    params.append('x', xValue);
    params.append('y', yValue);
    params.append('r', rValue);

    // Отправка AJAX-запроса
    fetch('http://localhost:8080/SavaDanko/receive?' + params.toString(), {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        // Обработка JSON-ответа от сервера
        console.log('Ответ от сервера:', data);
        // Обновляем таблицу с результатами
        updateTable(data);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

// Добавляем обработчик события на форму после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('user-form');
    form.addEventListener('submit', handleFormSubmit);
});
