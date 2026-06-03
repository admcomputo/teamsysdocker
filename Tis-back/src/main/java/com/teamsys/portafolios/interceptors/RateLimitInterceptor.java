package com.teamsys.portafolios.interceptors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    private final Map<String, Integer> intentosPorIp = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> bloqueoIp = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // MUY IMPORTANTE PARA CORS
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        String ipCliente = request.getHeader("X-Forwarded-For");

        if (ipCliente == null || ipCliente.isBlank()) {
            ipCliente = request.getRemoteAddr();
        } else {
            ipCliente = ipCliente.split(",")[0].trim();
        }

        if (bloqueoIp.containsKey(ipCliente)) {
            if (bloqueoIp.get(ipCliente).isAfter(LocalDateTime.now())) {
                response.setStatus(429);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Demasiadas peticiones. Intente más tarde.\"}");
                return false;
            } else {
                bloqueoIp.remove(ipCliente);
                intentosPorIp.put(ipCliente, 0);
            }
        }

        int intentos = intentosPorIp.getOrDefault(ipCliente, 0) + 1;
        intentosPorIp.put(ipCliente, intentos);

        if (intentos > 10000000) {
            bloqueoIp.put(ipCliente, LocalDateTime.now().plusMinutes(5));
            response.setStatus(429);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Demasiadas peticiones. Intente más tarde.\"}");
            return false;
        }

        return true;
    }
}