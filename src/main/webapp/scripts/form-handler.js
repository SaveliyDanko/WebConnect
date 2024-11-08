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

    // Отправляем AJAX-запрос
    fetch(contextPath + '/receive?' + params.toString(), {
        method: 'GET',
        credentials: 'include', // Добавлено
    })
    .then(response => response.json())
    .then(data => {
        // Обрабатываем ответ от сервера
        console.log('Server response:', data);
        // Обновляем таблицу результатов
        updateTable(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
