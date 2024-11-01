package com.savadanko;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;

import org.json.JSONObject;

public class SenderServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // Разрешаем CORS
        response.setHeader("Access-Control-Allow-Origin", "*");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Получаем данные из атрибутов запроса
        String x = (String) request.getAttribute("x");
        String y = (String) request.getAttribute("y");
        String r = (String) request.getAttribute("r");
        double result = (double) request.getAttribute("result");

        // Создаем JSON-объект
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("x", x);
        jsonResponse.put("y", y);
        jsonResponse.put("r", r);
        jsonResponse.put("result", result);

        // Отправляем JSON-ответ
        PrintWriter out = response.getWriter();
        out.print(jsonResponse.toString());
        out.flush();
    }
}


