// update-table.js

// Функция для обновления таблицы с результатами
function updateTable(data) {
    let tableDiv = document.querySelector('.table');

    // Проверяем, существует ли таблица
    let table = document.getElementById('result-table');
    if (!table) {
        // Создаем таблицу и заголовок
        table = document.createElement('table');
        table.id = 'result-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                </tr>
            </thead>
            <tbody id="table-body">
            </tbody>
        `;
        tableDiv.appendChild(table);
    }

    // Добавляем новую строку с данными
    const tbody = document.getElementById('table-body');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${data.x}</td>
        <td>${data.y}</td>
        <td>${data.r}</td>
        <td>${data.result}</td>
    `;

    tbody.appendChild(newRow);
}
