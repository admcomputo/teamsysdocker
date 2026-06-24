INSERT INTO roles (id, nombre)
VALUES (1, 'ADMIN')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

INSERT INTO roles (id, nombre)
VALUES (2, 'USER')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);
