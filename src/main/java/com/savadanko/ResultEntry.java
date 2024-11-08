package com.savadanko;

import java.io.Serializable;

public class ResultEntry implements Serializable {
    private String x;
    private String y;
    private String r;
    private double result;

    public ResultEntry(String x, String y, String r, double result) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
    }

    // Геттеры
    public String getX() { return x; }
    public String getY() { return y; }
    public String getR() { return r; }
    public double getResult() { return result; }
}
