INSERT INTO roles (id, nombre)
VALUES (1, 'ROLE_USER')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

INSERT INTO roles (id, nombre)
VALUES (2, 'ROLE_ADMIN')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);
