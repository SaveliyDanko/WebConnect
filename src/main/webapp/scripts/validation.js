// validation.js

// Функция проверки числового значения
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Функции валидации для каждого поля
function validateX() {
    const xCheckboxes = document.querySelectorAll('input[name="x"]:checked');
    if (xCheckboxes.length !== 1) {
        return 'Выберите ровно одно значение X.\n';
    }
    return '';
}

function validateY() {
    const yInput = document.getElementById('y');
    const yValue = yInput.value.trim();
    if (!isNumeric(yValue)) {
        return 'Значение Y должно быть числом.\n';
    }
    return '';
}

function validateR() {
    const rRadio = document.querySelector('input[name="r"]:checked');
    if (!rRadio) {
        return 'Выберите значение R.\n';
    }
    return '';
}

// Функции для отображения и очистки сообщений об ошибках
function showErrorMessage(form, errorMessage) {
    let errorDiv = document.getElementById('error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.style.color = 'red';
        form.prepend(errorDiv);
    }
    errorDiv.textContent = errorMessage;
}

function clearErrorMessage() {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = '';
    }
}
