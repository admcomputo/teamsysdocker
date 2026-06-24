INSERT INTO roles (nombre_rol)
VALUES ('ROLE_USER')
ON DUPLICATE KEY UPDATE nombre_rol = VALUES(nombre_rol);

INSERT INTO roles (nombre_rol)
VALUES ('ROLE_ADMIN')
ON DUPLICATE KEY UPDATE nombre_rol = VALUES(nombre_rol);

INSERT INTO categorias (nombre, clasificacion)
VALUES
('Backend', 'TECNICA'),
('Frontend', 'TECNICA'),
('Base de Datos', 'TECNICA'),
('DevOps', 'TECNICA'),
('Metodologias Agiles', 'BLANDA'),
('Liderazgo', 'BLANDA'),
('Comunicacion', 'BLANDA'),
('Trabajo en Equipo', 'BLANDA')
ON DUPLICATE KEY UPDATE clasificacion = VALUES(clasificacion);

INSERT INTO profesiones (nombre_profesion)
VALUES
('Desarrollador Fullstack'),
('Desarrollador Backend'),
('Desarrollador Frontend'),
('Administrador de Bases de Datos'),
('Ingeniero de DevOps'),
('Disenador UX/UI'),
('Scrum Master'),
('Product Owner')
ON DUPLICATE KEY UPDATE nombre_profesion = VALUES(nombre_profesion);

INSERT INTO tecnologias (nombre, categoria, logo_url)
VALUES
('Java', 'Backend', 'https://example.com/logos/java.png'),
('Spring Boot', 'Backend', 'https://example.com/logos/springboot.png'),
('Node.js', 'Backend', 'https://example.com/logos/nodejs.png'),
('Python', 'Backend', 'https://example.com/logos/python.png'),
('React', 'Frontend', 'https://example.com/logos/react.png'),
('Angular', 'Frontend', 'https://example.com/logos/angular.png'),
('Vue.js', 'Frontend', 'https://example.com/logos/vue.png'),
('PostgreSQL', 'Base de Datos', 'https://example.com/logos/postgresql.png'),
('MySQL', 'Base de Datos', 'https://example.com/logos/mysql.png'),
('MongoDB', 'Base de Datos', 'https://example.com/logos/mongodb.png'),
('Docker', 'DevOps', 'https://example.com/logos/docker.png'),
('Kubernetes', 'DevOps', 'https://example.com/logos/kubernetes.png')
ON DUPLICATE KEY UPDATE
categoria = VALUES(categoria),
logo_url = VALUES(logo_url);
