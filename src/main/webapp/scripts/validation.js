// Проверка, является ли значение числовым
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Функция для валидации X, Y, и R
function validateX() {
    const xCheckboxes = document.querySelectorAll('input[name="x"]:checked');
    if (xCheckboxes.length !== 1) {
        return 'Select exactly one X value.\n';
    }
    return '';
}

function validateY() {
    const yInput = document.getElementById('y');
    const yValue = yInput.value.trim();

    if (!isNumeric(yValue)) {
        return 'Y value must be a number.\n';
    }

    const yNumber = parseFloat(yValue);
    if (yNumber < -3 || yNumber > 5) {
        return 'Y value must be between -3 and 5.\n';
    }
    return '';
}

function validateR() {
    const rRadio = document.querySelector('input[name="r"]:checked');
    if (!rRadio) {
        return 'Select an R value.\n';
    }
    return '';
}

// Функции для отображения и очистки сообщений об ошибке
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

// Обработчик для отправки формы
function handleFormSubmit(event) {
    event.preventDefault();

    let errorMessage = '';

    // Валидация полей X, Y, и R
    errorMessage += validateX();
    errorMessage += validateY();
    errorMessage += validateR();

    const form = document.getElementById('user-form');

    // Если есть ошибки, выводим их
    if (errorMessage !== '') {
        showErrorMessage(form, errorMessage);
    } else {
        clearErrorMessage();
        // Действие при успешной валидации формы
        console.log("Form submitted successfully.");
    }
}

// Событие для отправки формы
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('user-form');
    form.addEventListener('submit', handleFormSubmit);

    // Событие для того, чтобы выбрать только один чекбокс X
    document.querySelectorAll('input[name="x"]').forEach((checkbox) => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                document.querySelectorAll('input[name="x"]').forEach((otherCheckbox) => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
});
