package com.savadanko;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

public class SenderServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");

        // Retrieve data from request attributes
        String x = (String) request.getAttribute("x");
        String y = (String) request.getAttribute("y");
        String r = (String) request.getAttribute("r");
        double result = (double) request.getAttribute("result");

        // Отладочный вывод
        System.out.println("Attributes in SenderServlet: x=" + x + ", y=" + y + ", r=" + r + ", result=" + result);

        // Сохранение данных в контексте приложения
        ServletContext context = getServletContext();
        List<ResultEntry> resultList = (List<ResultEntry>) context.getAttribute("resultList");
        if (resultList == null) {
            resultList = new ArrayList<>();
        }
        resultList.add(new ResultEntry(x, y, r, result));
        context.setAttribute("resultList", resultList);

        // Отладочный вывод
        System.out.println("Result list size in SenderServlet: " + resultList.size());

        // Create JSON object
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("x", x);
        jsonResponse.put("y", y);
        jsonResponse.put("r", r);
        jsonResponse.put("result", result);

        // Send JSON response
        PrintWriter out = response.getWriter();
        out.print(jsonResponse.toString());
        out.flush();
    }
}
