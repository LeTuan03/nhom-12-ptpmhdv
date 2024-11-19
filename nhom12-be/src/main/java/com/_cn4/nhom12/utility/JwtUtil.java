package com._cn4.nhom12.utility;

import io.jsonwebtoken.*;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JwtUtil {
    private static final String SECRET_KEY = "ucOhZ53JLySVR1buZWTaSXu8GTiacm5fJs49GrIRdSPh93kB1SKhgt8gyCaNYu4z";
    private static final long EXPIRATION_TIME = 86400000; // 1 day

    public static String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Thời gian hết hạn
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes(StandardCharsets.UTF_8)) // Ký với khóa
                .compact();
    }

    public static Claims validateToken(String token) {
        try {
            Key key = new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            System.out.println("Token đã hết hạn.");
            return null;
        } catch (io.jsonwebtoken.SignatureException e) {
            System.out.println("Lỗi chữ ký: Token không hợp lệ.");
            return null;
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            System.out.println("Token không đúng định dạng.");
            return null;
        } catch (Exception e) {
            System.out.println("Lỗi xác minh token: " + e.getMessage());
            return null;
        }
    }

}
