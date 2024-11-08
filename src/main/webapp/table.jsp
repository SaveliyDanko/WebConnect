<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="com.savadanko.ResultEntry" %>
<%
    // Получаем контекст приложения
    ServletContext context = getServletContext();

    // Получаем resultList из контекста приложения
    List<ResultEntry> resultList = (List<ResultEntry>) context.getAttribute("resultList");

    // Отладочный вывод
    System.out.println("Result list in table.jsp: " + resultList);
%>
<!DOCTYPE html>
<html>
<head>
    <title>Таблица результатов</title>
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/styles/table.css">
    <style>
        /* Стили для страницы и таблицы */
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f9f9f9;
        }

        h1 {
            text-align: center;
            color: #333;
        }

        table {
            border-collapse: collapse;
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        th, td {
            border: 1px solid #ddd;
            text-align: center;
            padding: 12px;
        }

        th {
            background-color: #007BFF;
            color: white;
            text-transform: uppercase;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #e9e9e9;
        }

        .button-container {
            text-align: center;
            margin-top: 20px;
        }

        .back-button {
            display: inline-block;
            padding: 12px 24px;
            text-decoration: none;
            background-color: #007BFF; /* Синий цвет */
            color: white;
            border-radius: 4px;
            font-size: 16px;
            transition: background-color 0.3s;
        }

        .back-button:hover {
            background-color: #0056b3; /* Темнее при наведении */
        }
    </style>
</head>
<body>
    <h1>Таблица результатов</h1>
    <% if (resultList != null && !resultList.isEmpty()) { %>
    <table>
        <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Результат</th>
            </tr>
        </thead>
        <tbody>
            <% for (ResultEntry entry : resultList) { %>
            <tr>
                <td><%= entry.getX() %></td>
                <td><%= entry.getY() %></td>
                <td><%= entry.getR() %></td>
                <td><%= entry.getResult() %></td>
            </tr>
            <% } %>
        </tbody>
    </table>
    <% } else { %>
    <p style="text-align: center;">Нет данных для отображения.</p>
    <% } %>

    <!-- Кнопка для возврата на index.jsp -->
    <div class="button-container">
        <a href="<%= request.getContextPath() %>/index.jsp" class="back-button">На главную</a>
    </div>
</body>
</html>
