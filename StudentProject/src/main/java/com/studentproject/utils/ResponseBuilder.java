package com.studentproject.utils;

import java.util.HashMap;
import com.studentproject.dto.ResponseType;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResponseBuilder extends Throwable {

    public ResponseBuilder(Object o, ResponseType error, String s) {
    }

    public static Map<String, Object> buildObjectResponse(Object obj, ResponseType responseType, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("data", obj);
        response.put("status", responseType);
        response.put("message", message);
        return response;
    }
    public static Map<String, Object> buildNullResponse(String empty, ResponseType responseType, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("data", empty);
        response.put("status", responseType);
        response.put("message", message);
        return response;
    }
    public static Map<String, Object> buildIntegerResponse(Integer value, ResponseType responseType, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("data", value);
        response.put("status", responseType);
        response.put("message", message);
        return response;
    }

    public static Map<String, Object> buildListResponse(List<Object> obj, ResponseType responseType, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("data", obj);
        response.put("status", responseType);
        response.put("message", message);
        return response;
    }
    public static Map<String, Object> buildListResponseTreeTable(List<Object> obj, ResponseType responseType, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("root", obj);
        response.put("status", responseType);
        response.put("message", message);
        return response;
    }

    public static Map<String, String> buildListResponse(String obj, String responseType, String message) {
        Map<String, String> response = new HashMap<>();
        response.put("data", obj);
        response.put("status", responseType);
        response.put("message", message);
        return response;
    }



}
