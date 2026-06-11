CREATE DATABASE  IF NOT EXISTS "db_portafolios_tis" /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_portafolios_tis`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: mysql-fda57ea-myql.l.aivencloud.com    Database: db_portafolios_tis
-- ------------------------------------------------------
-- Server version	8.0.45

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
--SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
--SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

--SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '1f2abb85-3555-11f1-a0c7-92c88f224880:1-51,
--a8830ce0-3dd9-11f1-b2d0-725c577bd6de:1-490';

--
-- Table structure for table `bitacora_logins`
--

DROP TABLE IF EXISTS `bitacora_logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bitacora_logins` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha_login` datetime(6) NOT NULL,
  `ip_origen` varchar(255) DEFAULT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKaeqjjbe06xrfhx0l7pbro7vjy` (`id_usuario`),
  CONSTRAINT `FKaeqjjbe06xrfhx0l7pbro7vjy` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bitacora_logins`
--

LOCK TABLES `bitacora_logins` WRITE;
/*!40000 ALTER TABLE `bitacora_logins` DISABLE KEYS */;
INSERT INTO `bitacora_logins` VALUES (1,'2026-06-02 03:44:12.911895','0:0:0:0:0:0:0:1',3),(2,'2026-06-02 03:44:39.566693','0:0:0:0:0:0:0:1',4),(3,'2026-06-02 04:47:39.384407','0:0:0:0:0:0:0:1',4),(5,'2026-06-02 12:54:17.649694','0:0:0:0:0:0:0:1',3),(6,'2026-06-02 22:36:24.993694','0:0:0:0:0:0:0:1',6),(7,'2026-06-02 22:40:02.189804','0:0:0:0:0:0:0:1',6),(8,'2026-06-03 03:20:34.139269','0:0:0:0:0:0:0:1',6),(9,'2026-06-04 14:57:03.235321','0:0:0:0:0:0:0:1',3),(10,'2026-06-04 14:59:26.646941','0:0:0:0:0:0:0:1',6),(11,'2026-06-04 16:06:54.942761','0:0:0:0:0:0:0:1',6),(12,'2026-06-04 18:08:52.369033','0:0:0:0:0:0:0:1',6),(13,'2026-06-04 18:46:20.049275','0:0:0:0:0:0:0:1',6),(14,'2026-06-04 18:52:34.935795','0:0:0:0:0:0:0:1',6),(15,'2026-06-04 19:33:46.571361','0:0:0:0:0:0:0:1',3),(16,'2026-06-04 19:54:39.077869','0:0:0:0:0:0:0:1',6),(17,'2026-06-04 21:00:25.123236','0:0:0:0:0:0:0:1',6),(18,'2026-06-04 21:27:42.323988','0:0:0:0:0:0:0:1',6),(19,'2026-06-04 21:50:34.491259','0:0:0:0:0:0:0:1',1),(20,'2026-06-04 21:55:17.596290','0:0:0:0:0:0:0:1',1),(21,'2026-06-04 22:36:18.861702','0:0:0:0:0:0:0:1',6),(22,'2026-06-04 22:52:59.796978','0:0:0:0:0:0:0:1',1),(23,'2026-06-05 14:34:11.930402','0:0:0:0:0:0:0:1',1),(24,'2026-06-05 15:33:22.031890','0:0:0:0:0:0:0:1',1),(25,'2026-06-05 16:37:27.172464','0:0:0:0:0:0:0:1',1),(26,'2026-06-05 17:36:28.089586','0:0:0:0:0:0:0:1',1),(27,'2026-06-05 18:10:35.592479','0:0:0:0:0:0:0:1',1),(28,'2026-06-05 20:12:09.168833','0:0:0:0:0:0:0:1',7),(29,'2026-06-05 20:20:50.458036','0:0:0:0:0:0:0:1',7),(30,'2026-06-05 20:23:48.333271','0:0:0:0:0:0:0:1',3),(31,'2026-06-05 20:40:35.061034','0:0:0:0:0:0:0:1',9),(32,'2026-06-05 20:49:29.877868','0:0:0:0:0:0:0:1',9),(33,'2026-06-05 21:24:31.745883','0:0:0:0:0:0:0:1',1),(34,'2026-06-05 21:27:37.060167','0:0:0:0:0:0:0:1',9),(35,'2026-06-05 22:07:56.244138','0:0:0:0:0:0:0:1',9),(36,'2026-06-05 22:10:17.850840','0:0:0:0:0:0:0:1',3),(37,'2026-06-05 22:51:28.798574','0:0:0:0:0:0:0:1',1),(38,'2026-06-06 00:00:55.105523','0:0:0:0:0:0:0:1',1),(39,'2026-06-06 00:22:03.822292','0:0:0:0:0:0:0:1',11),(40,'2026-06-06 00:34:21.205767','0:0:0:0:0:0:0:1',11),(41,'2026-06-06 00:40:47.769739','0:0:0:0:0:0:0:1',11),(42,'2026-06-06 00:47:32.022969','0:0:0:0:0:0:0:1',11),(43,'2026-06-06 00:48:39.505219','0:0:0:0:0:0:0:1',11),(44,'2026-06-06 00:52:54.731348','0:0:0:0:0:0:0:1',9),(45,'2026-06-06 01:03:00.539590','0:0:0:0:0:0:0:1',1),(46,'2026-06-06 01:03:41.083385','0:0:0:0:0:0:0:1',8),(47,'2026-06-06 01:06:19.428622','0:0:0:0:0:0:0:1',11),(48,'2026-06-06 01:27:22.707525','0:0:0:0:0:0:0:1',1),(49,'2026-06-06 01:40:59.401439','0:0:0:0:0:0:0:1',1),(50,'2026-06-06 01:45:27.368637','0:0:0:0:0:0:0:1',11),(51,'2026-06-06 02:50:44.522272','0:0:0:0:0:0:0:1',10),(52,'2026-06-06 02:54:43.878814','0:0:0:0:0:0:0:1',1),(53,'2026-06-06 03:02:40.573916','0:0:0:0:0:0:0:1',9),(54,'2026-06-06 03:22:37.162234','0:0:0:0:0:0:0:1',7),(55,'2026-06-06 03:24:08.945735','0:0:0:0:0:0:0:1',9),(56,'2026-06-06 03:43:29.750612','0:0:0:0:0:0:0:1',3),(57,'2026-06-06 04:03:30.504990','0:0:0:0:0:0:0:1',11),(58,'2026-06-06 04:07:37.975147','0:0:0:0:0:0:0:1',11),(59,'2026-06-06 04:31:13.480812','0:0:0:0:0:0:0:1',1),(60,'2026-06-06 04:37:17.088214','0:0:0:0:0:0:0:1',9),(61,'2026-06-06 04:50:22.060683','192.168.1.10',11),(62,'2026-06-06 04:54:34.786386','192.168.1.11',11),(63,'2026-06-06 04:57:16.907664','0:0:0:0:0:0:0:1',1),(64,'2026-06-06 05:09:38.392267','192.168.1.4',7),(65,'2026-06-06 05:10:17.627273','0:0:0:0:0:0:0:1',1),(66,'2026-06-06 05:15:58.521849','0:0:0:0:0:0:0:1',1),(67,'2026-06-06 05:16:43.877161','0:0:0:0:0:0:0:1',1),(68,'2026-06-06 05:18:41.762143','0:0:0:0:0:0:0:1',1),(69,'2026-06-06 05:19:54.248930','0:0:0:0:0:0:0:1',3),(70,'2026-06-06 05:35:15.928626','192.168.1.7',3),(71,'2026-06-06 05:39:15.087376','192.168.1.7',9),(72,'2026-06-06 05:51:35.539945','0:0:0:0:0:0:0:1',1),(73,'2026-06-06 06:00:06.693602','192.168.1.11',11),(74,'2026-06-06 06:19:49.144879','0:0:0:0:0:0:0:1',1),(75,'2026-06-06 06:20:07.802093','192.168.1.7',8),(76,'2026-06-06 07:02:56.036354','0:0:0:0:0:0:0:1',9),(77,'2026-06-06 07:15:25.987672','0:0:0:0:0:0:0:1',11),(78,'2026-06-06 08:09:23.361359','0:0:0:0:0:0:0:1',9),(79,'2026-06-06 18:12:42.833686','0:0:0:0:0:0:0:1',1),(80,'2026-06-06 18:30:53.749377','0:0:0:0:0:0:0:1',1),(81,'2026-06-06 19:34:39.797678','0:0:0:0:0:0:0:1',1),(82,'2026-06-06 19:57:54.162998','0:0:0:0:0:0:0:1',1),(83,'2026-06-06 20:06:41.349887','0:0:0:0:0:0:0:1',1),(84,'2026-06-06 20:12:52.533002','0:0:0:0:0:0:0:1',2),(85,'2026-06-06 21:42:40.626629','0:0:0:0:0:0:0:1',11),(86,'2026-06-06 21:46:44.689598','0:0:0:0:0:0:0:1',15),(87,'2026-06-06 21:59:54.858341','0:0:0:0:0:0:0:1',17),(88,'2026-06-07 00:09:07.173742','0:0:0:0:0:0:0:1',1),(89,'2026-06-07 01:05:31.857333','0:0:0:0:0:0:0:1',8),(90,'2026-06-07 01:58:49.019674','0:0:0:0:0:0:0:1',8),(91,'2026-06-07 02:06:25.943141','0:0:0:0:0:0:0:1',8),(92,'2026-06-07 02:08:02.438298','0:0:0:0:0:0:0:1',3),(93,'2026-06-07 02:49:17.580271','0:0:0:0:0:0:0:1',8),(94,'2026-06-09 01:25:22.654126','0:0:0:0:0:0:0:1',11),(95,'2026-06-09 01:25:38.939949','0:0:0:0:0:0:0:1',11),(96,'2026-06-09 05:15:04.518863','0:0:0:0:0:0:0:1',6),(97,'2026-06-09 12:28:16.332042','0:0:0:0:0:0:0:1',6),(98,'2026-06-10 01:27:14.009607','0:0:0:0:0:0:0:1',6),(99,'2026-06-10 02:22:05.196925','192.168.1.4',6),(100,'2026-06-10 02:33:57.160840','192.168.1.7',6),(101,'2026-06-10 18:38:41.456113','0:0:0:0:0:0:0:1',1),(102,'2026-06-11 01:21:54.667208','0:0:0:0:0:0:0:1',2),(103,'2026-06-11 01:22:11.996141','0:0:0:0:0:0:0:1',1),(104,'2026-06-11 02:28:41.561880','0:0:0:0:0:0:0:1',2),(105,'2026-06-11 02:44:31.191930','0:0:0:0:0:0:0:1',4),(106,'2026-06-11 02:55:16.554790','0:0:0:0:0:0:0:1',1),(107,'2026-06-11 02:55:35.063421','0:0:0:0:0:0:0:1',2),(108,'2026-06-11 03:11:54.988322','0:0:0:0:0:0:0:1',4),(109,'2026-06-11 13:22:51.588465','0:0:0:0:0:0:0:1',4),(110,'2026-06-11 15:15:20.475319','0:0:0:0:0:0:0:1',4),(111,'2026-06-11 15:23:06.778105','0:0:0:0:0:0:0:1',4),(112,'2026-06-11 16:47:53.492602','0:0:0:0:0:0:0:1',2),(113,'2026-06-11 17:05:24.529821','0:0:0:0:0:0:0:1',1),(114,'2026-06-11 17:51:30.402325','0:0:0:0:0:0:0:1',1),(115,'2026-06-11 18:00:28.972774','0:0:0:0:0:0:0:1',2),(116,'2026-06-11 18:02:51.306604','0:0:0:0:0:0:0:1',1),(117,'2026-06-11 18:04:14.965866','0:0:0:0:0:0:0:1',1),(118,'2026-06-11 18:06:29.579006','0:0:0:0:0:0:0:1',1),(119,'2026-06-11 19:31:11.158304','0:0:0:0:0:0:0:1',2),(120,'2026-06-11 19:48:07.673877','0:0:0:0:0:0:0:1',2);
/*!40000 ALTER TABLE `bitacora_logins` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'TECNICA','Backend'),(2,'TECNICA','Frontend'),(3,'TECNICA','Base de Datos'),(4,'TECNICA','DevOps'),(5,'BLANDA','Metodologías Ágiles'),(6,'BLANDA','Liderazgo'),(7,'BLANDA','Comunicación'),(8,'BLANDA','Trabajo en Equipo');
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
-- Table structure for table `curriculums`
--

DROP TABLE IF EXISTS `curriculums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculums` (
  `id_curriculum` bigint NOT NULL AUTO_INCREMENT,
  `es_oficial` bit(1) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `url_pdf` varchar(255) NOT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id_curriculum`),
  KEY `FK3umdq7v30vlta6h1257q7w28y` (`id_usuario`),
  CONSTRAINT `FK3umdq7v30vlta6h1257q7w28y` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculums`
--

LOCK TABLES `curriculums` WRITE;
/*!40000 ALTER TABLE `curriculums` DISABLE KEYS */;
/*!40000 ALTER TABLE `curriculums` ENABLE KEYS */;
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
  `es_publico` bit(1) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencias_laborales`
--

LOCK TABLES `experiencias_laborales` WRITE;
/*!40000 ALTER TABLE `experiencias_laborales` DISABLE KEYS */;
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
  `es_publico` bit(1) NOT NULL,
  `estado` enum('EN_CURSO','FINALIZADO','INCOMPLETO') DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `institucion` varchar(255) NOT NULL,
  `nivel` enum('DIPLOMADO','DOCTORADO','LICENCIATURA','MAESTRIA','TECNICO','PRIMARIA','SECUNDARIA','CURSOS') DEFAULT NULL,
  `titulo_obtenido` varchar(255) DEFAULT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfpamcwqshqe569m1n00jaijd2` (`id_usuario`),
  CONSTRAINT `FKfpamcwqshqe569m1n00jaijd2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formaciones_academicas`
--

LOCK TABLES `formaciones_academicas` WRITE;
/*!40000 ALTER TABLE `formaciones_academicas` DISABLE KEYS */;
INSERT INTO `formaciones_academicas` VALUES (1,'Desarrollo Software','estudinate con ganas de hacer proyectos',_binary '','FINALIZADO','2026-05-31','2021-02-28','UMSS','LICENCIATURA','Ingenieria Informatica','',1),(2,'Preparacion','',_binary '','FINALIZADO','2026-06-01','2025-12-02','San Martin','TECNICO','Secundaria','',4),(3,'desarrollo','',_binary '','EN_CURSO',NULL,'2025-10-02','san simon','LICENCIATURA','sistemas','',4),(4,'Desarrollo de software','Especialista en construir arquitecturas backend robustas en Java y crear interfaces modernas con TypeScript. Apasionado por el código limpio y la optimización de sistemas.',_binary '','FINALIZADO','2009-12-17','2004-02-20','Universidad mayor de San Andres','LICENCIATURA','Ingenieria de informatica','https://res.cloudinary.com/dvhan21ur/image/upload/v1780696663/jzsimw8ukpoykqpfviqj.pdf',9),(5,'desarrollo front','Enfoque en desarrollo front',_binary '','FINALIZADO','2025-12-24','2022-01-01','Universidad Mayor de san simon','LICENCIATURA','Ingenieria de sistemas','',8),(6,'desarrollo web','Enforque en desarroloo web',_binary '\0','FINALIZADO','2026-06-06','2026-01-06','universidad mext','MAESTRIA','ingenieria de informatica','',8),(7,'desarrollo de software','Enfoque en desarrollo web o software',_binary '','FINALIZADO','2014-10-08','2009-01-01','Universidad Jorge','LICENCIATURA','Ingenieria de software','',8),(8,'ventas','Marketing en ventas',_binary '','FINALIZADO','2026-01-14','2024-01-02','Instituo Paz','TECNICO','marketing','',8),(9,'preparacion','',_binary '\0','FINALIZADO','2026-06-06','2025-02-24','1ro de mayo','TECNICO','preparacion','',4);
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
  `es_publico` bit(1) NOT NULL,
  `evidencia_url` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_categoria` bigint NOT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhvpap0fo91pvnt6xpwwki8ixf` (`id_categoria`),
  KEY `FK99sks30ncrvj6hm9s6otlvvt7` (`id_usuario`),
  CONSTRAINT `FK99sks30ncrvj6hm9s6otlvvt7` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `FKhvpap0fo91pvnt6xpwwki8ixf` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilidades_blandas`
--

LOCK TABLES `habilidades_blandas` WRITE;
/*!40000 ALTER TABLE `habilidades_blandas` DISABLE KEYS */;
INSERT INTO `habilidades_blandas` VALUES (1,'gusta cumplir tareas',_binary '','','Cumplido',8,1),(2,'cordinacion con personas del proyecto sin problema',_binary '','','Adaptable',8,1),(3,'Habilidad que se va mejorando.',_binary '','https://res.cloudinary.com/dvhan21ur/image/upload/v1780373081/j7ka6emumnhtnltahvqh.pdf','Liderazgo',6,3),(4,'Especialista en construir arquitecturas backend robustas en Java y crear interfaces modernas con TypeScript. Apasionado por el código limpio y la optimización de sistemas.',_binary '','','Liderazgo',6,9),(5,'Especialista en construir arquitecturas backend robustas en Java y crear interfaces modernas con TypeScript. Apasionado por el código limpio y la optimización de sistemas.',_binary '','','Trabajo en equipo',8,9);
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
  `es_publico` bit(1) NOT NULL,
  `nivel_dominio` enum('AVANZADO','BASICO','EXPERTO','INTERMEDIO') DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_categoria` bigint NOT NULL,
  `id_usuario` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr1ps7xn6pmnnlvw05xp57bwbx` (`id_categoria`),
  KEY `FK8508pdx2v3lrpgkjo55oygw0n` (`id_usuario`),
  CONSTRAINT `FK8508pdx2v3lrpgkjo55oygw0n` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `FKr1ps7xn6pmnnlvw05xp57bwbx` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilidades_tecnicas`
--

LOCK TABLES `habilidades_tecnicas` WRITE;
/*!40000 ALTER TABLE `habilidades_tecnicas` DISABLE KEYS */;
INSERT INTO `habilidades_tecnicas` VALUES (1,0,'','amante de hacer desarrollo front en <b>react</b>',_binary '','INTERMEDIO','React',1,1),(2,0,'','gustose de hacer codigo tipado',_binary '','BASICO','Type Script',1,1),(3,1,'','Una habilidad que aun me falta mucho por mejorar.',_binary '','INTERMEDIO','React',1,3),(4,1,'','Te amo BB y tambien a js',_binary '','INTERMEDIO','Java Script',1,1),(5,6,'https://res.cloudinary.com/dvhan21ur/image/upload/v1780695863/vghwbb71ncjo0pzy7usj.pdf','Especialista en construir arquitecturas backend robustas en Java y crear interfaces modernas con TypeScript. Apasionado por el código limpio y la optimización de sistemas.',_binary '','AVANZADO','Pyton',1,9),(6,3,'','Especialista en construir arquitecturas backend robustas en Java y crear interfaces modernas con TypeScript. Apasionado por el código limpio y la optimización de sistemas.',_binary '','INTERMEDIO','Java',1,9),(7,6,'','Especialista en construir arquitecturas backend robustas en Java y crear interfaces modernas con TypeScript. Apasionado por el código limpio y la optimización de sistemas.',_binary '','EXPERTO','My sql',1,9);
/*!40000 ALTER TABLE `habilidades_tecnicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes_perfil`
--

DROP TABLE IF EXISTS `likes_perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes_perfil` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha_like` datetime(6) DEFAULT NULL,
  `perfil_id` bigint NOT NULL,
  `usuario_like_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK3hl6f0abkiow92bk1g8ebxkl9` (`perfil_id`,`usuario_like_id`),
  KEY `FKsuskyqvfusnr2qwqlu3jm3qvg` (`usuario_like_id`),
  CONSTRAINT `FKqdtdv91ivtl1g19d9qpeg655e` FOREIGN KEY (`perfil_id`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `FKsuskyqvfusnr2qwqlu3jm3qvg` FOREIGN KEY (`usuario_like_id`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes_perfil`
--

LOCK TABLES `likes_perfil` WRITE;
/*!40000 ALTER TABLE `likes_perfil` DISABLE KEYS */;
INSERT INTO `likes_perfil` VALUES (7,'2026-06-06 05:36:09.775876',9,7),(8,'2026-06-06 05:36:10.130179',9,3),(9,'2026-06-06 06:01:34.321746',16,11),(10,'2026-06-06 06:04:31.120011',7,11),(11,'2026-06-06 06:21:39.328917',9,8),(12,'2026-06-06 07:35:18.648897',11,9),(13,'2026-06-06 20:23:23.446450',1,2),(14,'2026-06-09 01:33:40.575062',9,11);
/*!40000 ALTER TABLE `likes_perfil` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesiones`
--

LOCK TABLES `profesiones` WRITE;
/*!40000 ALTER TABLE `profesiones` DISABLE KEYS */;
INSERT INTO `profesiones` VALUES (4,'Administrador de Bases de Datos (DBA)'),(2,'Desarrollador Backend'),(3,'Desarrollador Frontend'),(1,'Desarrollador Fullstack'),(6,'Diseñador UX/UI'),(5,'Ingeniero de DevOps'),(8,'Product Owner'),(7,'Scrum Master');
/*!40000 ALTER TABLE `profesiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto_imagenes`
--

DROP TABLE IF EXISTS `proyecto_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto_imagenes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proyecto_id` bigint NOT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pi_proyecto` (`proyecto_id`),
  CONSTRAINT `fk_pi_proyecto` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto_imagenes`
--

LOCK TABLES `proyecto_imagenes` WRITE;
/*!40000 ALTER TABLE `proyecto_imagenes` DISABLE KEYS */;
INSERT INTO `proyecto_imagenes` VALUES (1,10,'https://imagenes.com/inventario1.jpg'),(2,10,'https://imagenes.com/inventario2.jpg');
/*!40000 ALTER TABLE `proyecto_imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto_imagenes_adicionales`
--

DROP TABLE IF EXISTS `proyecto_imagenes_adicionales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto_imagenes_adicionales` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proyecto_id` bigint NOT NULL,
  `url_adicionales` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pia_proyecto` (`proyecto_id`),
  CONSTRAINT `fk_pia_proyecto` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto_imagenes_adicionales`
--

LOCK TABLES `proyecto_imagenes_adicionales` WRITE;
/*!40000 ALTER TABLE `proyecto_imagenes_adicionales` DISABLE KEYS */;
INSERT INTO `proyecto_imagenes_adicionales` VALUES (1,10,'https://miportafolio.com/proyecto-inventario'),(2,10,'https://docs.miempresa.com/inventario');
/*!40000 ALTER TABLE `proyecto_imagenes_adicionales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto_pdfs`
--

DROP TABLE IF EXISTS `proyecto_pdfs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto_pdfs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `proyecto_id` bigint NOT NULL,
  `url_pdfs` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pp_proyecto` (`proyecto_id`),
  CONSTRAINT `fk_pp_proyecto` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto_pdfs`
--

LOCK TABLES `proyecto_pdfs` WRITE;
/*!40000 ALTER TABLE `proyecto_pdfs` DISABLE KEYS */;
INSERT INTO `proyecto_pdfs` VALUES (1,10,'https://documentos.com/manual.pdf'),(2,10,'https://documentos.com/especificacion.pdf');
/*!40000 ALTER TABLE `proyecto_pdfs` ENABLE KEYS */;
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
  PRIMARY KEY (`id_proyecto`,`id_tecnologia`),
  KEY `fk_proyecto_tecnologias_tecnologia` (`id_tecnologia`),
  CONSTRAINT `fk_proyecto_tecnologias_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE CASCADE,
  CONSTRAINT `fk_proyecto_tecnologias_tecnologia` FOREIGN KEY (`id_tecnologia`) REFERENCES `tecnologias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto_tecnologias`
--

LOCK TABLES `proyecto_tecnologias` WRITE;
/*!40000 ALTER TABLE `proyecto_tecnologias` DISABLE KEYS */;
INSERT INTO `proyecto_tecnologias` VALUES (10,2),(10,3),(11,6),(10,9),(10,12),(11,12);
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
  `destacar` bit(1) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (10,'Aplicación web para la gestión de inventarios y control de stock.',_binary '','https://inventario-demo.com','https://github.com/usuario/inventario',_binary '\0','FINALIZADO','2025-05-30','2025-01-15','Desarrollador Backend','Sistema de Gestión de Inventarios',11),(11,'Descripción:\nEl sistema debe permitir que el administrador visualice un reporte general de usuarios registrados, mostrando nombre completo, correo, profesión, fecha de registro y estado. Además, debe permitir filtrar la información por fecha, estado, profesión y búsqueda por nombre o correo, mostrar indicadores estadísticos de usuarios totales, activos e inactivos, y exportar el reporte en formato PDF. ',_binary '','https://docs.google.com/document/d/19VmgbgrFlJB8wXkt_LCjOXwkR4ncTkoDpxxF_tDlx40/edit?tab=t.0','https://github.com/JoseQuirozPerez777/Tis-back/commits/develop/',_binary '\0','FINALIZADO',NULL,NULL,'Backend Developer','portafolio',11);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redes_sociales`
--

LOCK TABLES `redes_sociales` WRITE;
/*!40000 ALTER TABLE `redes_sociales` DISABLE KEYS */;
INSERT INTO `redes_sociales` VALUES (1,_binary '','GitHub','https://github.com/JoseQuirozPerez777/Tis-front-.git',1),(2,_binary '\0','GitHub','https://github.com/JoseQuirozPerez777/Tis-front-',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tecnologias`
--

LOCK TABLES `tecnologias` WRITE;
/*!40000 ALTER TABLE `tecnologias` DISABLE KEYS */;
INSERT INTO `tecnologias` VALUES (2,'Backend','https://example.com/logos/java.png','Java'),(3,'Backend','https://example.com/logos/springboot.png','Spring Boot'),(4,'Backend','https://example.com/logos/nodejs.png','Node.js'),(5,'Backend','https://example.com/logos/python.png','Python'),(6,'Frontend','https://example.com/logos/react.png','React'),(7,'Frontend','https://example.com/logos/angular.png','Angular'),(8,'Frontend','https://example.com/logos/vue.png','Vue.js'),(9,'Base de Datos','https://example.com/logos/postgresql.png','PostgreSQL'),(10,'Base de Datos','https://example.com/logos/mysql.png','MySQL'),(11,'Base de Datos','https://example.com/logos/mongodb.png','MongoDB'),(12,'DevOps','https://example.com/logos/docker.png','Docker'),(13,'DevOps','https://example.com/logos/kubernetes.png','Kubernetes');
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
  `disponibilidad` varchar(255) DEFAULT NULL,
  `enlace_publico` varchar(255) DEFAULT NULL,
  `fecha_bloqueo` datetime(6) DEFAULT NULL,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `fecha_ultimo_intento_fallido` datetime(6) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `intentos_fallidos` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `id_profesion` bigint DEFAULT NULL,
  `fecha_ultimo_login` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `UKcdmw5hxlfj78uf4997i3qyyw5` (`correo`),
  UNIQUE KEY `UKq093u00whswi8xmccxpb5tcsa` (`enlace_publico`),
  KEY `FK7po61rilo1oqmwhiwa0pfa62d` (`id_profesion`),
  CONSTRAINT `FK7po61rilo1oqmwhiwa0pfa62d` FOREIGN KEY (`id_profesion`) REFERENCES `profesiones` (`id_profesion`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'hacedor de proyectos','miktejere@gmail.com','Av paiirumani','Disponible',NULL,NULL,'2026-05-30 00:52:11.595888',NULL,NULL,0,'Miguel Juan Huaranca','$2a$10$EpRacAS/urfqDHYsV7XE/.6aAREX426blThZ7t5pO.dZQbk0L4Y2i','61600018',3,'2026-06-11 18:06:29.579006'),(2,NULL,'lolita@gmail.com',NULL,'Disponible',NULL,NULL,'2026-05-31 21:53:17.016947',NULL,NULL,0,'Lolita Perez','$2a$10$f/D8MRc/FcztagEyONUoYOh0P1PP3R7gwAtY.icNfnN2kYDqnzNge',NULL,NULL,'2026-06-11 19:48:07.673877'),(3,'Trabaje en un empresa HJH','sebastian@gmail.com','Quillacollo av, Surigan','Disponible',NULL,NULL,'2026-06-02 03:43:41.482537',NULL,'https://res.cloudinary.com/ddzmot3te/image/upload/v1780374443/karxtc8vphiyp8uqncya.jpg',0,'Sebastian Nina','$2a$10$/sdyVKwrsZaP1VRqIj1dWeI0U7X2EMy0YfbPWriNdxwH80pIJRQMC','78901234',3,'2026-06-07 02:08:02.438298'),(4,NULL,'fvera@gmail.com',NULL,'Disponible',NULL,NULL,'2026-06-02 03:44:30.886425',NULL,NULL,0,'Fernando Vera','$2a$10$ADlTIJ6682maweLZ.xW9iej2a442UQ5zSKHHTA/laTbQZFjWkDvJO',NULL,NULL,'2026-06-11 15:23:06.778105'),(6,NULL,'administrador@gmail.com',NULL,'Disponible',NULL,NULL,'2026-06-02 22:36:04.424484',NULL,'https://res.cloudinary.com/ddzmot3te/image/upload/v1780440487/mf4uaqzt1vgwpfo0wpus.jpg',0,'Usuario Administrador','$2a$10$8CwgKxcFOhYUxZc7Xelpc.HkHkxkt6p/9HXfrI6xQJb1gM0f1R6Wa',NULL,NULL,'2026-06-10 02:33:57.160840'),(7,NULL,'danielrojas@gmail.com',NULL,'Disponible',NULL,NULL,'2026-06-05 20:11:07.466677',NULL,NULL,0,'Daniel Rojas','$2a$10$czWeyZnOVR6iDee.CfBFSutywkV3BTzXZk4OgMHqDVhJJZwAVDRLO',NULL,NULL,'2026-06-06 05:09:38.392267'),(8,'Analiza las siguientes Historias de Usuario y genera casos de prueba funcionales completos.<br>','josefina@gmail.com','tiquipaya','Disponible',NULL,NULL,'2026-06-05 20:30:35.925062',NULL,NULL,0,'Josefina Molle Calizaya','$2a$10$63eqeZkeWCysILdEpHtwxOTcN9cmuOIoRVLeJdhDwmSldo7SULD4u','67895321',4,'2026-06-07 02:49:17.580271'),(9,'Especialista en construir arquitecturas backend robustas en Java y crear interfaces modernas con TypeScript. Apasionado por el código limpio y la optimización de sistemas.','lauren@gmail.com','Sacaba calle hernandez','Disponible',NULL,NULL,'2026-06-05 20:31:25.234301',NULL,NULL,0,'Lauren Choque','$2a$10$w/wRs/ioE/u2RR/9VOcXBu6lmpkuBpIO/qn9A5fdMUHhHWOWTeT1W','65432171',8,'2026-06-06 08:09:23.361359'),(10,NULL,'matias@gmail.com',NULL,'Disponible',NULL,NULL,'2026-06-05 20:32:11.075844',NULL,NULL,0,'Matias Reyes','$2a$10$2OTa34oIZJo5V.uU.nozJOv.bmPa2UPAsXc7eTzasIQy9gw6wPJVu',NULL,NULL,'2026-06-06 02:50:44.522272'),(11,'<u style=\"background-color: transparent; color: rgb(0, 0, 0); font-family: Comfortaa, cursive;\"><b>DESCRIPCIÓN: Validar que los campos marcados como ocultos por el usuario no sean visibles para otros usuarios.</b></u>','edsonchambi2000@gmail.com','cbba','Disponible',NULL,NULL,'2026-06-06 00:21:52.110493','2026-06-06 00:40:32.938355','https://res.cloudinary.com/ddzmot3te/image/upload/v1780723686/tj8eydizfdezd307vucb.jpg',0,'Edson Chambi','$2a$10$NUA1LLz26KdgGPC7zI/GzufJJixs.F.TNR.ConWJyufCK9PkYTIbm','73754703',2,'2026-06-09 01:25:38.939949'),(12,NULL,'lucas@gmail.com',NULL,'Disponible',NULL,NULL,'2026-06-06 04:21:21.052624',NULL,NULL,0,'Lucas Roble','$2a$10$tWuIPV3Tf.YwNpECyOy8b.8tJeEXQKeLx7hea349Bpd9gKlQXUWRy',NULL,NULL,NULL),(13,NULL,'lucasroble@gmail.com',NULL,'Disponible',NULL,NULL,'2026-06-06 04:21:57.953744',NULL,NULL,0,'Lucas Roble','$2a$10$TwzFX27GjhDEg5aJ293N0Om5MZepQ/d/4hgc0lsgjxwAWqWIjg3eW',NULL,NULL,NULL),(14,NULL,'franz@gmail.com',NULL,'Disponible',NULL,NULL,'2026-06-06 04:25:28.487462',NULL,NULL,0,'Franz Roble','$2a$10$YRI1H6NCzbnP67yeGNsoe.pG9yVhumzoQdgGq30M/QdDHNgVspNzS',NULL,NULL,NULL),(15,NULL,'edsonchambi003@gmail.com',NULL,'Disponible',NULL,NULL,'2026-06-06 04:34:23.146781',NULL,NULL,0,'Edson','$2a$10$DG8nIRfG7vf3Bz9yh5uXyOn0EkaFY8PkD0z9EtU4nUaeQT1UJB0cC',NULL,NULL,'2026-06-06 21:46:44.689598'),(16,NULL,'edsonchambi00das3@gmail.com',NULL,'Disponible',NULL,NULL,'2026-06-06 04:35:50.621126',NULL,NULL,0,'Edson','$2a$10$64lWwERsZb6Kn01M58neP.oiHeZuh5FlB6bekV1.9LU6LWZO8HhlO',NULL,NULL,NULL),(17,'<span style=\"background-color: transparent; color: rgb(0, 0, 0); font-family: Comfortaa, cursive; font-size: 11pt;\">DESCRIPCIÓN: Validar que los campos marcados como ocultos por el usuario no sean visibles para otros usuarios.</span>','pedrosanches@gmail.com','cbba','Disponible',NULL,NULL,'2026-06-06 21:59:23.182270',NULL,'https://res.cloudinary.com/ddzmot3te/image/upload/v1780783406/dllpaovol2qcmb1xxus8.png',0,'Pedro Sanches','$2a$10$yoD7Qh6XQ3eva7mGKtZQL.PsPYvm9nyjrnDS1C/eeGPi/OTqFNCU.','63656842',1,'2026-06-06 21:59:54.858341');
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
INSERT INTO `usuarios_roles` VALUES (1,1),(2,1),(3,1),(4,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(16,1),(17,1),(6,2),(11,2);
/*!40000 ALTER TABLE `usuarios_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visibilidad_perfil`
--

DROP TABLE IF EXISTS `visibilidad_perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visibilidad_perfil` (
  `id_usuario` bigint NOT NULL,
  `biografia_usr` bit(1) NOT NULL,
  `correo_usr` bit(1) NOT NULL,
  `direccion_usr` bit(1) NOT NULL,
  `nombre_usr` bit(1) NOT NULL,
  `profesion_usr` bit(1) NOT NULL,
  `telefono_usr` bit(1) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `FK1nujbc933ydoipu4dtgfrvghd` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visibilidad_perfil`
--

LOCK TABLES `visibilidad_perfil` WRITE;
/*!40000 ALTER TABLE `visibilidad_perfil` DISABLE KEYS */;
INSERT INTO `visibilidad_perfil` VALUES (1,_binary '',_binary '',_binary '\0',_binary '',_binary '',_binary '\0'),(2,_binary '',_binary '',_binary '',_binary '',_binary '',_binary ''),(3,_binary '',_binary '',_binary '',_binary '',_binary '',_binary ''),(4,_binary '',_binary '',_binary '',_binary '',_binary '',_binary ''),(6,_binary '',_binary '',_binary '',_binary '',_binary '',_binary ''),(7,_binary '',_binary '',_binary '',_binary '',_binary '',_binary ''),(8,_binary '',_binary '',_binary '',_binary '',_binary '',_binary ''),(9,_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(10,_binary '',_binary '',_binary '',_binary '',_binary '',_binary ''),(11,_binary '',_binary '',_binary '',_binary '',_binary '',_binary '\0'),(16,_binary '',_binary '',_binary '',_binary '',_binary '',_binary ''),(17,_binary '\0',_binary '',_binary '',_binary '',_binary '',_binary '\0');
/*!40000 ALTER TABLE `visibilidad_perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vistas_perfil`
--

DROP TABLE IF EXISTS `vistas_perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vistas_perfil` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha_visita` datetime(6) DEFAULT NULL,
  `perfil_id` bigint NOT NULL,
  `visitante_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqn10f0vr9h2trkc53hht6x7fh` (`perfil_id`),
  KEY `FK1tpabhytwd0733dqcdm1u0mae` (`visitante_id`),
  CONSTRAINT `FK1tpabhytwd0733dqcdm1u0mae` FOREIGN KEY (`visitante_id`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `FKqn10f0vr9h2trkc53hht6x7fh` FOREIGN KEY (`perfil_id`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vistas_perfil`
--

LOCK TABLES `vistas_perfil` WRITE;
/*!40000 ALTER TABLE `vistas_perfil` DISABLE KEYS */;
INSERT INTO `vistas_perfil` VALUES (1,'2026-06-02 04:57:00.130528',3,NULL),(2,'2026-06-06 01:40:33.360802',11,NULL),(3,'2026-06-06 03:15:09.086868',11,NULL),(4,'2026-06-06 03:17:22.287819',9,NULL),(5,'2026-06-06 04:49:11.368738',9,NULL),(6,'2026-06-06 07:40:19.529764',9,NULL),(7,'2026-06-06 20:24:29.599128',1,NULL),(8,'2026-06-06 21:51:37.142871',11,NULL),(9,'2026-06-07 00:29:24.717435',1,NULL),(10,'2026-06-11 01:44:10.357633',1,NULL),(11,'2026-06-11 02:58:30.437204',1,NULL),(12,'2026-06-11 18:07:02.068878',1,NULL);
/*!40000 ALTER TABLE `vistas_perfil` ENABLE KEYS */;
UNLOCK TABLES;
--SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-11 17:34:29
