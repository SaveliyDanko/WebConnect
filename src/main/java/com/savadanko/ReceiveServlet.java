package com.savadanko;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import java.io.IOException;

public class ReceiveServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");
        // Получаем параметры x, y, r из запроса
        String xParam = request.getParameter("x");
        String yParam = request.getParameter("y");
        String rParam = request.getParameter("r");

        // Проверяем, что параметры не null
        if (xParam != null && yParam != null && rParam != null) {
            // Передаем параметры в следующий сервлет через атрибуты запроса
            request.setAttribute("x", xParam);
            request.setAttribute("y", yParam);
            request.setAttribute("r", rParam);

            // Перенаправляем запрос в CheckServlet
            RequestDispatcher dispatcher = request.getRequestDispatcher("/check");
            dispatcher.forward(request, response);
        } else {
            // Возвращаем ошибку, если параметры отсутствуют
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing parameters x, y, or r.");
        }
    }
}


