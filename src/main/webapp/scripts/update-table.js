// Function to update the results table
function updateTable(data) {
    let tableDiv = document.querySelector('.table');

    // Check if the table exists
    let table = document.getElementById('result-table');
    if (!table) {
        // Create the table and header
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
