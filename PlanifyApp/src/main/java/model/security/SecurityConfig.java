package model.security;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
     PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Para encriptar contraseñas
    }

    @Bean
     SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desactivado para APIs REST
            .authorizeHttpRequests(auth -> auth
                // Registro y Swagger son públicos
                .requestMatchers("/api/usuarios/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                
                // Reglas por ROL (según el enunciado)
                .requestMatchers(HttpMethod.POST, "/api/mercancias/**").hasRole("EMPRESA")
                .requestMatchers(HttpMethod.PUT, "/api/inscripciones/validar/**").hasRole("EMPRESA")
                
                .requestMatchers("/api/camiones/**").hasRole("CONDUCTOR")
                .requestMatchers("/api/incidencias/**").hasRole("CONDUCTOR")
                
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults()); // Autenticación básica (Usuario:Password)
            
        return http.build();
    }
}