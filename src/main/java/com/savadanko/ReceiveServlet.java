package com.savadanko;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import org.json.JSONObject;

public class ReceiveServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json; charset=UTF-8");

        String xParam = request.getParameter("x");
        String yParam = request.getParameter("y");
        String rParam = request.getParameter("r");

        if (xParam == null || yParam == null || rParam == null) {
            sendErrorResponse(response, "Missing parameters x, y, or r.");
            return;
        }

        try {
            Double.parseDouble(xParam);
            Double.parseDouble(yParam);
            Double.parseDouble(rParam);

            request.setAttribute("x", xParam);
            request.setAttribute("y", yParam);
            request.setAttribute("r", rParam);

            RequestDispatcher dispatcher = request.getRequestDispatcher("/check");
            dispatcher.forward(request, response);

        } catch (NumberFormatException e) {
            sendErrorResponse(response, "Parameters x, y, and r must be numeric.");
        }
    }

    private void sendErrorResponse(HttpServletResponse response, String errorMessage) throws IOException {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("error", errorMessage);

        PrintWriter out = response.getWriter();
        out.print(jsonResponse.toString());
        out.flush();
    }
}
