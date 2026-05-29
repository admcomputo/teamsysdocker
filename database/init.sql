CREATE DATABASE  IF NOT EXISTS `db_portafolios_tis` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_portafolios_tis`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_portafolios_tis
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` bigint NOT NULL AUTO_INCREMENT,
  `clasificacion` enum('BLANDA','TECNICA') NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `UKqcog8b7hps1hioi9onqwjdt6y` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'TECNICA','Desarrollo Web (Frontend/Backend)'),(2,'TECNICA','Bases de Datos'),(3,'TECNICA','Arquitectura de Software'),(4,'TECNICA','Seguridad Informática'),(5,'TECNICA','Cloud & DevOps'),(6,'BLANDA','Liderazgo y Gestión'),(7,'BLANDA','Comunicación y Oratoria'),(8,'BLANDA','Trabajo Colaborativo'),(9,'BLANDA','Resolución de Conflictos'),(10,'BLANDA','Productividad Personal');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codigos_verificacion`
--

DROP TABLE IF EXISTS `codigos_verificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codigos_verificacion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) NOT NULL,
  `fecha_expiracion` datetime(6) NOT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `id_usuario` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKilgv8hq667360fvfqn6bwskaj` (`id_usuario`),
  CONSTRAINT `FKe0ef8mnhqrcyxjt50r0tj1yd` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codigos_verificacion`
--

LOCK TABLES `codigos_verificacion` WRITE;
/*!40000 ALTER TABLE `codigos_verificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `codigos_verificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencia_tecnologias`
--

DROP TABLE IF EXISTS `experiencia_tecnologias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiencia_tecnologias` (
  `experiencia_id` bigint NOT NULL,
  `tecnologia_id` bigint NOT NULL,
  KEY `FK84g2s6s638b7palenlcuj8j0m` (`tecnologia_id`),
  KEY `FKfjfknpq5sm8b3i9d3a2q4p128` (`experiencia_id`),
  CONSTRAINT `FK84g2s6s638b7palenlcuj8j0m` FOREIGN KEY (`tecnologia_id`) REFERENCES `tecnologias` (`id`),
  CONSTRAINT `FKfjfknpq5sm8b3i9d3a2q4p128` FOREIGN KEY (`experiencia_id`) REFERENCES `experiencias_laborales` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencia_tecnologias`
--

LOCK TABLES `experiencia_tecnologias` WRITE;
/*!40000 ALTER TABLE `experiencia_tecnologias` DISABLE KEYS */;
INSERT INTO `experiencia_tecnologias` VALUES (1,6),(1,7),(1,8),(1,16);
/*!40000 ALTER TABLE `experiencia_tecnologias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencias_laborales`
--

DROP TABLE IF EXISTS `experiencias_laborales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiencias_laborales` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `actualmente_trabajo_aqui` bit(1) DEFAULT NULL,
  `area_profesional` varchar(255) DEFAULT NULL,
  `cargo_puesto` varchar(255) NOT NULL,
  `descripcion_proyecto` text,
  `especializacion` varchar(255) DEFAULT NULL,
  `evidencia_laboral_pdf_url` varchar(255) DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `modalidad_trabajo` enum('HIBRIDO','PRESENCIAL','REMOTO') DEFAULT NULL,
  `nombre_empresa` varchar(255) NOT NULL,
  `proyecto_relacionado_url` varchar(255) DEFAULT NULL,
  `tipo_contrato` enum('FREELANCE','MEDIO_TIEMPO','PASANTIA','PROYECTO','TIEMPO_COMPLETO') DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhfowh9t1wdxsta861xmyr2vlv` (`id_usuario`),
  CONSTRAINT `FKhfowh9t1wdxsta861xmyr2vlv` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencias_laborales`
--

LOCK TABLES `experiencias_laborales` WRITE;
/*!40000 ALTER TABLE `experiencias_laborales` DISABLE KEYS */;
INSERT INTO `experiencias_laborales` VALUES (1,_binary '','Desarrollo de Software','w','ddddddddddddddddddddddddddddddddddddddddddddddddddd','Frontend','jjs.pdf',NULL,'0003-03-01','REMOTO','w','https://drive.google.com/drive/u/0/folders/19U5CdCq6dwEjua0jgGbUnTo_4-bOB-8F','FREELANCE','w',2);
/*!40000 ALTER TABLE `experiencias_laborales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formaciones_academicas`
--

DROP TABLE IF EXISTS `formaciones_academicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formaciones_academicas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `area` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `estado` enum('EN_CURSO','FINALIZADO','INCOMPLETO') DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `institucion` varchar(255) NOT NULL,
  `nivel` enum('DIPLOMADO','DOCTORADO','LICENCIATURA','MAESTRIA','TECNICO') DEFAULT NULL,
  `titulo_obtenido` varchar(255) NOT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfpamcwqshqe569m1n00jaijd2` (`id_usuario`),
  CONSTRAINT `FKfpamcwqshqe569m1n00jaijd2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formaciones_academicas`
--

LOCK TABLES `formaciones_academicas` WRITE;
/*!40000 ALTER TABLE `formaciones_academicas` DISABLE KEYS */;
INSERT INTO `formaciones_academicas` VALUES (1,'7','77777777777777777777777777777777777777777777777777777777777777777777777777777','EN_CURSO','0007-07-07','0007-07-07','77','TECNICO','7','',2);
/*!40000 ALTER TABLE `formaciones_academicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habilidades_blandas`
--

DROP TABLE IF EXISTS `habilidades_blandas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habilidades_blandas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `evidencia_url` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_categoria` bigint NOT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhvpap0fo91pvnt6xpwwki8ixf` (`id_categoria`),
  KEY `FK99sks30ncrvj6hm9s6otlvvt7` (`id_usuario`),
  CONSTRAINT `FK99sks30ncrvj6hm9s6otlvvt7` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `FKhvpap0fo91pvnt6xpwwki8ixf` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilidades_blandas`
--

LOCK TABLES `habilidades_blandas` WRITE;
/*!40000 ALTER TABLE `habilidades_blandas` DISABLE KEYS */;
INSERT INTO `habilidades_blandas` VALUES (1,'ooooooooooooooooooooooooooooooooooooooooooooo','','ii',7,2),(2,'wwww','','w',7,1),(3,'Buena comunicación con el equipo','https://google.com','comunicacion',1,1),(4,'ddd','d','d',5,1),(5,'w','w','w',10,1),(6,'www','www','esther123',3,1);
/*!40000 ALTER TABLE `habilidades_blandas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habilidades_tecnicas`
--

DROP TABLE IF EXISTS `habilidades_tecnicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habilidades_tecnicas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `anos_experiencia` int DEFAULT NULL,
  `certificado_url` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `nivel_dominio` enum('AVANZADO','BASICO','EXPERTO','INTERMEDIO') DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_categoria` bigint NOT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr1ps7xn6pmnnlvw05xp57bwbx` (`id_categoria`),
  KEY `FK8508pdx2v3lrpgkjo55oygw0n` (`id_usuario`),
  CONSTRAINT `FK8508pdx2v3lrpgkjo55oygw0n` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `FKr1ps7xn6pmnnlvw05xp57bwbx` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilidades_tecnicas`
--

LOCK TABLES `habilidades_tecnicas` WRITE;
/*!40000 ALTER TABLE `habilidades_tecnicas` DISABLE KEYS */;
INSERT INTO `habilidades_tecnicas` VALUES (1,0,'','wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww','BASICO','d',2,2),(2,3,'','3','INTERMEDIO','3333',2,2),(3,0,'','iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii','BASICO','iiiiii',2,2),(4,1,'','ddddddddddddddddd','BASICO','jose',2,3),(5,2,'','s','INTERMEDIO','d',2,3),(6,2,'https://www.figma.com/board/swwVBk3nBVdTQpOXlzTFiq/Sin-t%C3%ADtulo?node-id=1-2&t=RNBJqVCbWqUuVtj2-0','wwwwwwwwwwww','INTERMEDIO','swwwwwwww',1,1),(7,3,NULL,'2','AVANZADO','1',1,1),(9,3,NULL,'33333333','INTERMEDIO','edd',1,1),(10,333,NULL,'33333333','AVANZADO','eee',1,1),(11,33,NULL,'3','BASICO','wer',2,1),(12,6,'https://docs.google.com/document/d/10I6T0fb9vrbgOo9usgJEHZE-DCYc1wKkGayCN5hgnOQ/edit?tab=t.0','vite] connected.\nreact-dom-client.development.js:28004 Download the React DevTools for a better development experience: https://react.dev/link/react-devtools\nuseLogin.ts:29 User logged in: {id: \'1\', email: \'teamsys2020@gmail.com\', fullName: \'Jose Quiroz\', token: \'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZWFtc3lzMjAyMEBnb…QwM30.Tn7tPHPq-zahtn98TwjiMw3rvxXUPN9mqN-6KzuNlTs\', foto: undefined}','AVANZADO','administrador',2,1),(13,3,'w','w','INTERMEDIO','jose',2,1),(14,3,'3','3333','INTERMEDIO','estheer',1,1);
/*!40000 ALTER TABLE `habilidades_tecnicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesiones`
--

DROP TABLE IF EXISTS `profesiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesiones` (
  `id_profesion` bigint NOT NULL AUTO_INCREMENT,
  `nombre_profesion` varchar(255) NOT NULL,
  PRIMARY KEY (`id_profesion`),
  UNIQUE KEY `UKfqna5f3k1h3tl0w03d8g2qiib` (`nombre_profesion`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesiones`
--

LOCK TABLES `profesiones` WRITE;
/*!40000 ALTER TABLE `profesiones` DISABLE KEYS */;
INSERT INTO `profesiones` VALUES (6,'Analista de QA'),(5,'Arquitecto de Software'),(4,'Científico de Datos'),(3,'Desarrollador Full Stack'),(1,'Ingeniero de Sistemas'),(2,'Ingeniero Informático');
/*!40000 ALTER TABLE `profesiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto_imagenes`
--

DROP TABLE IF EXISTS `proyecto_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto_imagenes` (
  `proyecto_id` bigint NOT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  KEY `FKrslfmlukq4erxjqhaoxhur6x8` (`proyecto_id`),
  CONSTRAINT `FKrslfmlukq4erxjqhaoxhur6x8` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto_imagenes`
--

LOCK TABLES `proyecto_imagenes` WRITE;
/*!40000 ALTER TABLE `proyecto_imagenes` DISABLE KEYS */;
INSERT INTO `proyecto_imagenes` VALUES (1,'https://res.cloudinary.com/ddzmot3te/image/upload/v1778358744/project_images/y36u6ql346z12nzmaprz.png');
/*!40000 ALTER TABLE `proyecto_imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto_imagenes_adicionales`
--

DROP TABLE IF EXISTS `proyecto_imagenes_adicionales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto_imagenes_adicionales` (
  `proyecto_id` bigint NOT NULL,
  `url_adicionales` varchar(255) DEFAULT NULL,
  KEY `FKlfwvrj74c5r1fld3yk20npaux` (`proyecto_id`),
  CONSTRAINT `FKlfwvrj74c5r1fld3yk20npaux` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto_imagenes_adicionales`
--

LOCK TABLES `proyecto_imagenes_adicionales` WRITE;
/*!40000 ALTER TABLE `proyecto_imagenes_adicionales` DISABLE KEYS */;
INSERT INTO `proyecto_imagenes_adicionales` VALUES (1,'https://chatgpt.com/c/69ff8cc3-f67c-83e9-9b46-402d504bff6b'),(1,'https://chatgpt.com/c/69ff8cc3-f67c-83e9-9b46-402d504bff6b');
/*!40000 ALTER TABLE `proyecto_imagenes_adicionales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto_tecnologias`
--

DROP TABLE IF EXISTS `proyecto_tecnologias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto_tecnologias` (
  `id_proyecto` bigint NOT NULL,
  `id_tecnologia` bigint NOT NULL,
  KEY `FK2e0fwwfw9h1wf5ysh6pi3r57b` (`id_tecnologia`),
  KEY `FKm6ccn59f0089vlsfaabtyco2r` (`id_proyecto`),
  CONSTRAINT `FK2e0fwwfw9h1wf5ysh6pi3r57b` FOREIGN KEY (`id_tecnologia`) REFERENCES `tecnologias` (`id`),
  CONSTRAINT `FKm6ccn59f0089vlsfaabtyco2r` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto_tecnologias`
--

LOCK TABLES `proyecto_tecnologias` WRITE;
/*!40000 ALTER TABLE `proyecto_tecnologias` DISABLE KEYS */;
/*!40000 ALTER TABLE `proyecto_tecnologias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos` (
  `id_proyecto` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(2000) DEFAULT NULL,
  `enlace_demo` varchar(255) DEFAULT NULL,
  `enlace_github` varchar(255) DEFAULT NULL,
  `es_publico` bit(1) NOT NULL,
  `estado_proyecto` varchar(255) DEFAULT NULL,
  `fecha_finalizacion` varchar(255) DEFAULT NULL,
  `fecha_inicio` varchar(255) DEFAULT NULL,
  `rol_proyecto` varchar(255) DEFAULT NULL,
  `titulo` varchar(150) NOT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id_proyecto`),
  KEY `FK2mxm4r5it9s1tpayg2nxbdxlq` (`id_usuario`),
  CONSTRAINT `FK2mxm4r5it9s1tpayg2nxbdxlq` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (1,'hola amigo sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss','https://chatgpt.com/c/69ff8cc3-f67c-83e9-9b46-402d504bff6b','https://chatgpt.com/c/69ff8cc3-f67c-83e9-9b46-402d504bff6b',_binary '\0','PAUSADO','1888-02-02','0002-02-01','Backend Developer','sitemas de joyas',2);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redes_sociales`
--

DROP TABLE IF EXISTS `redes_sociales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `redes_sociales` (
  `id_red` bigint NOT NULL AUTO_INCREMENT,
  `es_publico` bit(1) NOT NULL,
  `nombre_red` varchar(255) DEFAULT NULL,
  `url_perfil` varchar(255) DEFAULT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id_red`),
  KEY `FKqom25ab2shqitwi3twrdkrd2y` (`id_usuario`),
  CONSTRAINT `FKqom25ab2shqitwi3twrdkrd2y` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redes_sociales`
--

LOCK TABLES `redes_sociales` WRITE;
/*!40000 ALTER TABLE `redes_sociales` DISABLE KEYS */;
INSERT INTO `redes_sociales` VALUES (4,_binary '','LinkedIn','https://drive.google.com/drive/u/0/folders/19U5CdCq6dwEjua0jgGbUnTo_4-bOB-8F',2),(5,_binary '','GitHub','https://docs.google.com/document/d/1ntzd0L242vYyXCE3ZZRs4qYpdw4rDVh5DgEe6zdMNFM/edit?tab=t.0',2),(6,_binary '','GitHub','https://github.com/JoseQuirozPerez777/Tis-front-',1);
/*!40000 ALTER TABLE `redes_sociales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` bigint NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(255) NOT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `UK7odo9mpa3aq06bh7o6ri3v5ue` (`nombre_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'ROLE_ADMIN'),(1,'ROLE_USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tecnologias`
--

DROP TABLE IF EXISTS `tecnologias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tecnologias` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `categoria` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKsei1pvncygdab2j0f4gi0f6vf` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tecnologias`
--

LOCK TABLES `tecnologias` WRITE;
/*!40000 ALTER TABLE `tecnologias` DISABLE KEYS */;
INSERT INTO `tecnologias` VALUES (1,'Frontend','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg','HTML5'),(2,'Frontend','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg','CSS3'),(3,'Frontend','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg','JavaScript'),(4,'Frontend','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg','TypeScript'),(5,'Frontend','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg','React'),(6,'Frontend','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg','Angular'),(7,'Backend','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg','Java'),(8,'Backend','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg','Spring Boot'),(9,'Backend','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg','Node.js'),(10,'Backend','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg','Python'),(11,'Base de Datos','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg','MySQL'),(12,'Base de Datos','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg','PostgreSQL'),(13,'Base de Datos','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg','MongoDB'),(14,'DevOps','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg','Docker'),(15,'DevOps','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg','Kubernetes'),(16,'Cloud','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg','AWS'),(17,'Cloud','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg','Google Cloud'),(18,'Herramientas','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg','Git'),(19,'Herramientas','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg','GitHub'),(20,'Herramientas','https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg','VS Code');
/*!40000 ALTER TABLE `tecnologias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefono`
--

DROP TABLE IF EXISTS `telefono`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefono` (
  `id_telefono` bigint NOT NULL AUTO_INCREMENT,
  `telefono` varchar(255) NOT NULL,
  PRIMARY KEY (`id_telefono`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefono`
--

LOCK TABLES `telefono` WRITE;
/*!40000 ALTER TABLE `telefono` DISABLE KEYS */;
/*!40000 ALTER TABLE `telefono` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` bigint NOT NULL AUTO_INCREMENT,
  `biografia` text,
  `correo` varchar(255) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fecha_bloqueo` datetime(6) DEFAULT NULL,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `fecha_ultimo_intento_fallido` datetime(6) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `intentos_fallidos` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `id_profesion` bigint DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `UKcdmw5hxlfj78uf4997i3qyyw5` (`correo`),
  KEY `FK7po61rilo1oqmwhiwa0pfa62d` (`id_profesion`),
  CONSTRAINT `FK7po61rilo1oqmwhiwa0pfa62d` FOREIGN KEY (`id_profesion`) REFERENCES `profesiones` (`id_profesion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'hola soy un  buen muchacho','teamsys2020@gmail.com','vinto-motecato',NULL,'2026-05-09 20:16:11.613707','2026-05-13 05:42:53.534700',NULL,0,'Jose Quiroz','$2a$10$Ygzq1T4epaf/Gr6AerWcSOM8cdgeHhqDMdgUzEnTVskRJ6wYWvp4S','67584028',6),(2,'josesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss','jose_qp_1929@gmail.com','vinto-motecato',NULL,'2026-05-09 20:18:08.954771','2026-05-09 20:33:59.195354','https://res.cloudinary.com/ddzmot3te/image/upload/v1778358449/bruf3apakbywlb5cbn6m.jpg',0,'Jose Quiroz','$2a$10$zVVyrhFRss7nXhGKlQfAveVubidvsQ9Zv/vqjezUq1J69sCwAsbY6','21354687',6),(3,NULL,'201904925@est.umss.edu',NULL,NULL,'2026-05-13 04:15:55.816839',NULL,NULL,0,'Jose','$2a$10$1C7VhV63olO0FMNA3R2JJurmEcOQEucpg2CubMGb91wgTtujgELqS',NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_roles`
--

DROP TABLE IF EXISTS `usuarios_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_roles` (
  `id_usuario` bigint NOT NULL,
  `id_rol` bigint NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_rol`),
  KEY `FKhcbndx0dnk4c3ww8jfg98k7el` (`id_rol`),
  CONSTRAINT `FKhcbndx0dnk4c3ww8jfg98k7el` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`),
  CONSTRAINT `FKt5th9sao5wjukq9ij7154ktuw` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_roles`
--

LOCK TABLES `usuarios_roles` WRITE;
/*!40000 ALTER TABLE `usuarios_roles` DISABLE KEYS */;
INSERT INTO `usuarios_roles` VALUES (1,1),(2,1),(3,1);
/*!40000 ALTER TABLE `usuarios_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-20 14:18:35
