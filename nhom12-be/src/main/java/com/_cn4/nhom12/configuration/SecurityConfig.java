package com._cn4.nhom12.configuration;

import com._cn4.nhom12.utility.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
                .cors() // Enable CORS configuration
                .and()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/account/register", "/account/login").permitAll() // Public endpoints
                        .requestMatchers("/admin/**").hasAuthority("ADMIN") // Secure admin endpoints
                        .anyRequest().authenticated() // All other requests require authentication
                )
                .addFilterBefore(new JwtFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
