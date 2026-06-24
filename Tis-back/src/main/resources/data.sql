INSERT INTO roles (nombre_rol)
VALUES ('ROLE_USER')
ON DUPLICATE KEY UPDATE nombre_rol = VALUES(nombre_rol);

INSERT INTO roles (nombre_rol)
VALUES ('ROLE_ADMIN')
ON DUPLICATE KEY UPDATE nombre_rol = VALUES(nombre_rol);

INSERT INTO profesiones (nombre_profesion)
VALUES ('Ingeniería de Sistemas')
ON DUPLICATE KEY UPDATE nombre_profesion = VALUES(nombre_profesion);

INSERT INTO profesiones (nombre_profesion)
VALUES ('Diseño Gráfico')
ON DUPLICATE KEY UPDATE nombre_profesion = VALUES(nombre_profesion);

INSERT INTO profesiones (nombre_profesion)
VALUES ('Marketing Digital')
ON DUPLICATE KEY UPDATE nombre_profesion = VALUES(nombre_profesion);

INSERT INTO categorias (nombre, clasificacion)
VALUES ('Frontend', 'TECNICA')
ON DUPLICATE KEY UPDATE clasificacion = VALUES(clasificacion);

INSERT INTO categorias (nombre, clasificacion)
VALUES ('Backend', 'TECNICA')
ON DUPLICATE KEY UPDATE clasificacion = VALUES(clasificacion);

INSERT INTO categorias (nombre, clasificacion)
VALUES ('Base de Datos', 'TECNICA')
ON DUPLICATE KEY UPDATE clasificacion = VALUES(clasificacion);

INSERT INTO categorias (nombre, clasificacion)
VALUES ('Comunicación', 'BLANDA')
ON DUPLICATE KEY UPDATE clasificacion = VALUES(clasificacion);

INSERT INTO categorias (nombre, clasificacion)
VALUES ('Trabajo en equipo', 'BLANDA')
ON DUPLICATE KEY UPDATE clasificacion = VALUES(clasificacion);

INSERT INTO tecnologias (nombre, categoria, logo_url)
VALUES ('React', 'Frontend', '')
ON DUPLICATE KEY UPDATE categoria = VALUES(categoria), logo_url = VALUES(logo_url);

INSERT INTO tecnologias (nombre, categoria, logo_url)
VALUES ('Java', 'Backend', '')
ON DUPLICATE KEY UPDATE categoria = VALUES(categoria), logo_url = VALUES(logo_url);

INSERT INTO tecnologias (nombre, categoria, logo_url)
VALUES ('Spring Boot', 'Backend', '')
ON DUPLICATE KEY UPDATE categoria = VALUES(categoria), logo_url = VALUES(logo_url);

INSERT INTO tecnologias (nombre, categoria, logo_url)
VALUES ('MySQL', 'Base de Datos', '')
ON DUPLICATE KEY UPDATE categoria = VALUES(categoria), logo_url = VALUES(logo_url);
