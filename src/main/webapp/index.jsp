<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SavaDanko</title>

    <!-- Ваши метаданные и стили -->
     <script>
        const contextPath = '<%= request.getContextPath() %>';
     </script>

    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/styles/style.css">
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/styles/header/header.css">
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/styles/main/main.css">
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/styles/main/form.css">
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/styles/main/table.css">
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/styles/main/plane.css">
    <link rel="stylesheet" type="text/css" href="<%= request.getContextPath() %>/styles/footer/footer.css">

    <script src="<%= request.getContextPath() %>/scripts/form-handler.js"></script>
</head>

<body class="light-theme">
<header class="header">
    <div class="left-text">P3212</div>
    <div class="square"></div>
    <button id="theme-toggle">Sava Danko</button>
    <div class="right-text">12052</div>
</header>


<main class="main-grid">
    <div class="form">
        <form id="user-form" action="<%= request.getContextPath() %>/receive" method="get">
            <!-- Checkbox X -->
            <fieldset>
                <legend>Select X values:</legend>
                <label><input type="checkbox" name="x" value="-3"> -3</label><br>
                <label><input type="checkbox" name="x" value="-2"> -2</label><br>
                <label><input type="checkbox" name="x" value="-1"> -1</label><br>
                <label><input type="checkbox" name="x" value="0"> 0</label><br>
                <label><input type="checkbox" name="x" value="1"> 1</label><br>
                <label><input type="checkbox" name="x" value="2"> 2</label><br>
                <label><input type="checkbox" name="x" value="3"> 3</label><br>
                <label><input type="checkbox" name="x" value="4"> 4</label><br>
                <label><input type="checkbox" name="x" value="5"> 5</label>
            </fieldset>

            <!-- Text Y -->
            <label for="y">Enter Y value:</label><br>
            <input type="text" id="y" name="y"><br><br>

            <!-- Radio button R -->
            <fieldset>
                <legend>Select R value:</legend>
                <label><input type="radio" name="r" value="1"> 1</label><br>
                <label><input type="radio" name="r" value="1.5"> 1.5</label><br>
                <label><input type="radio" name="r" value="2"> 2</label><br>
                <label><input type="radio" name="r" value="2.5"> 2.5</label><br>
                <label><input type="radio" name="r" value="3"> 3</label>
            </fieldset>

            <!-- Submit button -->
            <button type="submit">Submit</button>

            <a href="<%= request.getContextPath() %>/table" id="table-button" class="button-link">Table</a>


        </form>
    </div>
    <div class="table"></div>
    <div class="plane">
        <div class="coordinate-plane">
            <canvas id="coordinateCanvas"></canvas>
        </div>
    </div>
</main>

<footer class="footer">
    <!-- Footer content -->
</footer>

<script src="<%= request.getContextPath() %>/scripts/theme-switcher.js"></script>
<script src="<%= request.getContextPath() %>/scripts/validation.js"></script>
<script src="<%= request.getContextPath() %>/scripts/form-handler.js"></script>
<script src="<%= request.getContextPath() %>/scripts/update-table.js"></script>
<script src="<%= request.getContextPath() %>/scripts/coordinate-plane.js"></script>
</body>
</html>
