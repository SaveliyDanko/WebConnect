window.addEventListener('load', function() {
    const canvas = document.getElementById('coordinateCanvas');
    const ctx = canvas.getContext('2d');
    let points = []; // Массив для хранения точек

    // Устанавливаем значение R по умолчанию
    function setDefaultR() {
        const rElement = document.querySelector('input[name="r"][value="1"]');
        if (rElement) {
            rElement.checked = true;
        }
    }

    // Функция для получения выбранного значения R
    function getSelectedR() {
        const rElements = document.querySelectorAll('input[name="r"]');
        let rValue = null;
        rElements.forEach((elem) => {
            if (elem.checked) {
                rValue = parseFloat(elem.value);
            }
        });
        return rValue;
    }

    // Функция изменения размера canvas и перерисовки
    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        drawCoordinatePlane();
    }

    // Преобразование координат плоскости в координаты canvas
    function planeToCanvasX(xPlane) {
        const width = canvas.width;
        const xCanvas = ((xPlane + 3) / 6) * width;
        return xCanvas;
    }

    function planeToCanvasY(yPlane) {
        const height = canvas.height;
        const yCanvas = ((3 - yPlane) / 6) * height;
        return yCanvas;
    }

    // Преобразование координат canvas в координаты плоскости
    function canvasToPlaneX(xCanvas) {
        const width = canvas.width;
        const xPlane = (xCanvas / width) * 6 - 3;
        return xPlane;
    }

    function canvasToPlaneY(yCanvas) {
        const height = canvas.height;
        const yPlane = 3 - (yCanvas / height) * 6;
        return yPlane;
    }

    // Функция для отрисовки координатной плоскости, фигуры и точек
    function drawCoordinatePlane() {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // Рисуем оси
        drawAxes();

        // Рисуем сложную фигуру в зависимости от R
        drawFigure();

        // Рисуем сохраненные точки
        drawPoints();
    }

    function drawAxes() {
        const width = canvas.width;
        const height = canvas.height;

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;

        // Ось X
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        // Ось Y
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();

        // Добавляем метки на осях (необязательно)
    }

    function drawFigure() {
        const R = getSelectedR();

        if (R !== null) {
            ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';

            // 1-я четверть: Четверть круга с радиусом R/2
            ctx.beginPath();
            ctx.moveTo(planeToCanvasX(0), planeToCanvasY(0));
            ctx.arc(
                planeToCanvasX(0),
                planeToCanvasY(0),
                Math.abs(planeToCanvasX(R / 2) - planeToCanvasX(0)),
                -Math.PI / 2,
                0
            );
            ctx.closePath();
            ctx.fill();

            // 2-я четверть: Прямоугольник со сторонами R
            ctx.beginPath();
            ctx.rect(
                planeToCanvasX(-R),
                planeToCanvasY(0),
                planeToCanvasX(0) - planeToCanvasX(-R),
                planeToCanvasY(R) - planeToCanvasY(0)
            );
            ctx.closePath();
            ctx.fill();

            // 4-я четверть: Прямоугольный треугольник с катетами R и R/2
            ctx.beginPath();
            ctx.moveTo(planeToCanvasX(0), planeToCanvasY(0));
            ctx.lineTo(planeToCanvasX(R / 2), planeToCanvasY(0));
            ctx.lineTo(planeToCanvasX(0), planeToCanvasY(-R));
            ctx.closePath();
            ctx.fill();
        }
    }

    function drawPoints() {
        ctx.fillStyle = 'red';

        points.forEach((point) => {
            // Преобразуем координаты плоскости в координаты canvas
            const xCanvas = planeToCanvasX(point.planeX);
            const yCanvas = planeToCanvasY(point.planeY);

            // Рисуем маленький круг в точке
            ctx.beginPath();
            ctx.arc(xCanvas, yCanvas, 3, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    // Обработка клика по canvas
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();

        // Получаем позицию клика относительно canvas
        const xCanvas = event.clientX - rect.left;
        const yCanvas = event.clientY - rect.top;

        // Преобразуем пиксельные координаты в координаты плоскости
        const planeX = canvasToPlaneX(xCanvas);
        const planeY = canvasToPlaneY(yCanvas);

        // Округляем координаты до двух знаков после запятой
        const planeXFixed = parseFloat(planeX.toFixed(2));
        const planeYFixed = parseFloat(planeY.toFixed(2));

        // Сохраняем точку для отрисовки
        points.push({ planeX: planeXFixed, planeY: planeYFixed });

        // Перерисовываем canvas
        drawCoordinatePlane();

        // Отправляем GET-запрос на сервер с координатами x, y и r
        const R = getSelectedR();
        if (R !== null) {
            const params = new URLSearchParams();
            params.append('x', planeXFixed);
            params.append('y', planeYFixed);
            params.append('r', R);

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
        } else {
            alert('Выберите значение R перед кликом по координатной плоскости.');
        }
    });

    // Обработчик изменения R
    const rElements = document.querySelectorAll('input[name="r"]');
    rElements.forEach((elem) => {
        elem.addEventListener('change', function() {
            points = []; // Очищаем массив с точками
            drawCoordinatePlane(); // Перерисовываем координатную плоскость без точек
        });
    });

    // Начальная отрисовка и установка значения R по умолчанию
    setDefaultR();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
});

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
