package com.savadanko;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import java.io.IOException;

public class CheckServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "*");
        try {
            // Получаем параметры из атрибутов запроса
            double x = Double.parseDouble((String) request.getAttribute("x"));
            double y = Double.parseDouble((String) request.getAttribute("y"));
            double r = Double.parseDouble((String) request.getAttribute("r"));

            // Вычисляем результат
            double result = 0;

            if ((x <= 0 && y >=0) && ((x <= r) && (y <= r))){
                result = 1;
            }
            if ((x >= 0 && y >= 0) && (x*x + y*y <= (r*r)/2)){
                result = 1;
            }

            if ((x >= 0 && y <=0) && (y >= 2*x - r)){
                result = 1;
            }

            // Передаем данные в SenderServlet
            request.setAttribute("result", result);

            RequestDispatcher dispatcher = request.getRequestDispatcher("/send");
            dispatcher.forward(request, response);

        } catch (NumberFormatException e) {
            // Обрабатываем ошибку преобразования
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid number format.");
        }
    }
}

