window.addEventListener('load', function() {
    const canvas = document.getElementById('coordinateCanvas');
    const ctx = canvas.getContext('2d');
    let points = []; // Массив для хранения точек
    let currentR = getSelectedR() || 1; // Текущее значение R

    // Установка значения R по умолчанию
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

    // Функция для изменения размера канваса и перерисовки
    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        drawCoordinatePlane();
    }

    // Преобразование координат плоскости в координаты канваса
    function planeToCanvasX(xPlane) {
        const width = canvas.width;
        const xCanvas = ((xPlane + currentR * 1.5) / (currentR * 3)) * width;
        return xCanvas;
    }

    function planeToCanvasY(yPlane) {
        const height = canvas.height;
        const yCanvas = ((currentR * 1.5 - yPlane) / (currentR * 3)) * height;
        return yCanvas;
    }

    // Преобразование координат канваса в координаты плоскости
    function canvasToPlaneX(xCanvas) {
        const width = canvas.width;
        const xPlane = (xCanvas / width) * (currentR * 3) - currentR * 1.5;
        return xPlane;
    }

    function canvasToPlaneY(yCanvas) {
        const height = canvas.height;
        const yPlane = currentR * 1.5 - (yCanvas / height) * (currentR * 3);
        return yPlane;
    }

    // Функция для рисования координатной плоскости, фигуры и точек
    function drawCoordinatePlane() {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // Рисуем оси
        drawAxes();

        // Рисуем фигуру на основе R
        drawFigure();

        // Рисуем сохраненные точки
        drawPoints();
    }

function drawAxes() {
    const width = canvas.width;
    const height = canvas.height;

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Markings for the axes
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText('0', width / 2 + 5, height / 2 - 5);
    ctx.fillText(`${-currentR}`, width / 2 - planeToCanvasX(currentR), height / 2 + 15);
    ctx.fillText(`${currentR}`, width / 2 + planeToCanvasX(currentR) - 10, height / 2 + 15);
    ctx.fillText(`${-currentR}`, width / 2 + 5, height / 2 + planeToCanvasY(-currentR));
    ctx.fillText(`${currentR}`, width / 2 + 5, height / 2 - planeToCanvasY(currentR));
}

function drawFigure() {
    const R = currentR;
    if (R === null) return;

    ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';

    // First quadrant: Quarter circle with radius R/2
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

    // Second quadrant: Rectangle with sides R
    ctx.beginPath();
    ctx.rect(
        planeToCanvasX(-R),
        planeToCanvasY(0),
        planeToCanvasX(0) - planeToCanvasX(-R),
        planeToCanvasY(R) - planeToCanvasY(0)
    );
    ctx.closePath();
    ctx.fill();

    // Fourth quadrant: Right triangle with legs R and R/2
    ctx.beginPath();
    ctx.moveTo(planeToCanvasX(0), planeToCanvasY(0));
    ctx.lineTo(planeToCanvasX(R / 2), planeToCanvasY(0));
    ctx.lineTo(planeToCanvasX(0), planeToCanvasY(-R));
    ctx.closePath();
    ctx.fill();
}


    function drawPoints() {
        ctx.fillStyle = 'red';

        points.forEach((point) => {
            // Преобразуем координаты плоскости в координаты канваса
            const xCanvas = planeToCanvasX(point.planeX);
            const yCanvas = planeToCanvasY(point.planeY);

            // Рисуем небольшую окружность в точке
            ctx.beginPath();
            ctx.arc(xCanvas, yCanvas, 3, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    // Обработчик клика по канвасу
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();

        // Получаем позицию клика относительно канваса
        const xCanvas = event.clientX - rect.left;
        const yCanvas = event.clientY - rect.top;

        // Преобразуем координаты пикселей в координаты плоскости
        const planeX = canvasToPlaneX(xCanvas);
        const planeY = canvasToPlaneY(yCanvas);

        // Округляем координаты до двух знаков после запятой
        const planeXFixed = parseFloat(planeX.toFixed(2));
        const planeYFixed = parseFloat(planeY.toFixed(2));

        // Сохраняем точку для рисования
        points.push({ planeX: planeXFixed, planeY: planeYFixed });

        // Перерисовываем канвас
        drawCoordinatePlane();

        // Отправляем GET-запрос на сервер с координатами x, y и r
        const R = currentR;
        if (R !== null) {
            const params = new URLSearchParams();
            params.append('x', planeXFixed);
            params.append('y', planeYFixed);
            params.append('r', R);

            // Отправляем AJAX-запрос
            fetch(contextPath + '/receive?' + params.toString(), {
                method: 'GET',
                credentials: 'include', // Обязательно
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
        } else {
            alert('Выберите значение R перед кликом по координатной плоскости.');
        }
    });

    // Обработчик изменения R
    const rElements = document.querySelectorAll('input[name="r"]');
    rElements.forEach((elem) => {
        elem.addEventListener('change', function() {
            currentR = getSelectedR();
            drawCoordinatePlane(); // Перерисовка плоскости с обновленными точками
        });
    });

    // Инициализация при загрузке страницы
    setDefaultR();
    currentR = getSelectedR() || 1;
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
});


// Function to update the results table
function updateTable(data) {
    let tableDiv = document.querySelector('.table');

    // Check if the table exists
    let table = document.getElementById('result-table');
    if (!table) {
        // Create table and header
        table = document.createElement('table');
        table.id = 'result-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody id="table-body">
            </tbody>
        `;
        tableDiv.appendChild(table);
    }

    // Add a new row with data
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
