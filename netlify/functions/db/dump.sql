-- MySQL dump 10.19  Distrib 10.3.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: containers-us-west-41.railway.app    Database: railway
-- ------------------------------------------------------
-- Server version       8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artists` (
  `artist_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `nationality` varchar(16) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`artist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1,'back number','Japanese','2023-06-12 04:15:50','2023-06-12 04
:15:50'),(2,'Nidji','Indonesian','2023-06-12 04:15:50','2023-06-12 04:15:50'),(8,'Once Mekel'
,'Indonesian','2023-06-12 05:04:46','2023-06-12 05:04:46'),(9,'Imagine Dragons','American','2
023-06-12 05:04:55','2023-06-12 05:06:56'),(10,'Afgan','Indonesian','2023-06-12 05:05:08','20
23-06-12 05:05:08'),(11,'Kotak','Indonesian','2023-06-12 05:05:18','2023-06-12 05:05:18'),(12
,'Jisoo','Korean','2023-06-12 05:05:28','2023-06-12 05:05:28'),(13,'Bruno Mars','American','2
023-06-12 05:05:45','2023-06-12 05:05:45'),(14,'BLACKPINK','korean','2023-06-12 05:07:22','20
23-06-12 05:07:22'),(15,'Masdo','Malaysian','2023-06-12 05:07:38','2023-06-12 05:07:38');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres` (
  `genre_id` int NOT NULL AUTO_INCREMENT,
  `subgenre_id` int DEFAULT NULL,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`genre_id`),
  KEY `subgenre_id` (`subgenre_id`),
  CONSTRAINT `genres_ibfk_1` FOREIGN KEY (`subgenre_id`) REFERENCES `genres` (`genre_id`) ON
UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,NULL,'Pop'),(2,NULL,'Rock'),(3,NULL,'Pop Rock'),(4,1,'Indonesi
an Pop'),(5,3,'Indonesian Pop Rock'),(6,NULL,'Alternative Rock'),(7,1,'J-Pop'),(8,2,'J-Rock')
,(9,NULL,'indonesian pop rock'),(10,NULL,'alternatife rock'),(11,NULL,'j-pop'),(12,NULL,'j-ro
ck'),(13,NULL,'indonesian blues'),(14,NULL,'pop'),(15,NULL,'rock'),(16,NULL,'electropop'),(17
,NULL,'poprock'),(18,NULL,'indie pop'),(19,NULL,'jazz'),(20,NULL,'indonesian pop'),(21,NULL,'
k-pop'),(22,NULL,'dance-pop'),(23,NULL,'indonesian rock');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `languages` (
  `language_code` varchar(2) NOT NULL,
  `country` varchar(32) NOT NULL,
  PRIMARY KEY (`language_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES ('EN','English'),('ID','Indonesia'),('JA','Japan'),('KR','Kore
an'),('MS','Malaysian');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metadata`
--

DROP TABLE IF EXISTS `metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metadata` (
  `metadata_id` int NOT NULL AUTO_INCREMENT,
  `length` time NOT NULL,
  `tempo` int NOT NULL DEFAULT '100',
  `skey` varchar(16) NOT NULL,
  `loudness` int NOT NULL DEFAULT '0',
  `popularity` int NOT NULL DEFAULT '0',
  `energy` int NOT NULL DEFAULT '0',
  `speechiness` int NOT NULL DEFAULT '0',
  `instrumentalness` int NOT NULL DEFAULT '0',
  `danceability` int NOT NULL DEFAULT '0',
  `positiveness` int NOT NULL DEFAULT '0',
  `liveness` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`metadata_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metadata`
--

LOCK TABLES `metadata` WRITE;
/*!40000 ALTER TABLE `metadata` DISABLE KEYS */;
INSERT INTO `metadata` VALUES (1,'00:05:14',78,'F# min',-3,61,65,4,0,38,33,14),(2,'00:03:58',
142,'B Minor',-5,55,90,30,1,62,84,29),(3,'00:13:10',134,'F Major',0,41,86,4,0,63,65,65),(4,'0
0:05:40',134,'E Maj',0,63,7,3,0,40,42,42),(5,'00:05:06',150,'E Major',0,58,58,3,0,34,28,28),(
6,'00:02:45',114,'F Minor',0,87,74,51,0,77,57,57),(7,'00:04:11',140,'F#/Gb',0,72,43,3,0,34,16
,16),(8,'00:02:53',124,'A Minor',0,85,38,4,0,84,60,60),(9,'00:03:31',140,'E Minor',0,77,83,7,
0,67,39,39),(10,'00:03:25',106,'G Major',0,49,88,3,0,62,82,82);
/*!40000 ALTER TABLE `metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songgenres`
--

DROP TABLE IF EXISTS `songgenres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `songgenres` (
  `song_id` int NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`song_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `songgenres_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`) ON UP
DATE CASCADE,
  CONSTRAINT `songgenres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`genre_id`) ON
 UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songgenres`
--

LOCK TABLES `songgenres` WRITE;
/*!40000 ALTER TABLE `songgenres` DISABLE KEYS */;
INSERT INTO `songgenres` VALUES (2,4),(2,5),(2,6),(1,7),(1,8),(3,9),(3,10),(4,11),(4,12),(5,1
3),(5,14),(7,14),(9,14),(5,15),(6,16),(6,17),(6,18),(7,19),(7,20),(10,20),(8,21),(9,21),(8,22
),(10,23);
/*!40000 ALTER TABLE `songgenres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `songs` (
  `song_id` int NOT NULL AUTO_INCREMENT,
  `artist_id` int NOT NULL,
  `title` varchar(64) NOT NULL,
  `spotify_url` varchar(128) DEFAULT NULL,
  `image_url` varchar(128) DEFAULT NULL,
  `language_code` varchar(2) NOT NULL,
  `metadata_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`song_id`),
  KEY `artist_id` (`artist_id`),
  KEY `language_code` (`language_code`),
  KEY `metadata_id` (`metadata_id`),
  CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`) ON U
PDATE CASCADE,
  CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`language_code`) REFERENCES `languages` (`language_c
ode`) ON UPDATE CASCADE,
  CONSTRAINT `songs_ibfk_3` FOREIGN KEY (`metadata_id`) REFERENCES `metadata` (`metadata_id`)
 ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (1,1,'ハッピーエンド','https://open.spotify.com/track/4GqO80eGXA54
2oTvlYv4LS','https://i.scdn.co/image/ab67616d00001e02e09353d6028fda18c3699085','JA',1,'2023-0
6-12 04:15:51','2023-06-12 04:15:51'),(2,2,'Biarlah','https://open.spotify.com/track/2bY1xVEU
0seRJwgUT8Grjp','https://i.scdn.co/image/ab67616d0000b2737e7ca8820a1435577b8acf09','ID',2,'20
23-06-12 04:15:51','2023-06-12 04:15:51'),(3,2,'Disco Lazy Time','https://open.spotify.com/tr
ack/4Rm7dvxs2UCn9xuCJ4xJip','https://www.chosic.com/similar-songs/track/4Rm7dvxs2UCn9xuCJ4xJi
p/','ID',3,'2023-06-12 04:53:16','2023-06-12 04:53:16'),(4,1,'クリスマスソング','https://open
.spotify.com/track/5P8ZvBQoCrujjNcLAxO3Su','https://i.scdn.co/image/ab67616d00001e0259a14a1d5
3eb5610f84c8382','JA',4,'2023-06-12 05:10:56','2023-06-12 05:10:56'),(5,8,'Symphoni Yang Inda
h','https://open.spotify.com/track/3KajF6MAAspVyWsMp4fvsn','https://i.scdn.co/image/8f6520f7a
bfcc9aab14e9d9cfcdaf70528c83fff','ID',5,'2023-06-12 05:13:31','2023-06-12 05:13:31'),(6,9,'on
es','https://open.spotify.com/track/0HqZX76SFLDz2aW8aiqi7G','https://i.scdn.co/image/ab67616d
0000b273813713582dcc508e7d5073c4','EN',6,'2023-06-12 05:20:55','2023-06-12 05:20:55'),(7,10,'
Bukan Cinta Biasa','https://open.spotify.com/track/7pnySx65jx0qm8ZmV6R56m','https://i.scdn.co
/image/ab67616d0000b273daa3a5d2478cc796925f7c90','ID',7,'2023-06-12 05:22:52','2023-06-12 05:
22:52'),(8,12,'FLOWER','https://open.spotify.com/track/69CrOS7vEHIrhC2ILyEi0s','https://i.scd
n.co/image/ab67616d0000b273f35b8a6c03cc633f734bd8ac','KR',8,'2023-06-12 05:24:39','2023-06-12
 05:24:39'),(9,14,'DDU-DU DDU-DU','https://open.spotify.com/track/4lQsB3ERTWSNaAN1IkuNRl','ht
tps://i.scdn.co/image/ab67616d0000b273bfd46639322b597331d9ecef','KR',9,'2023-06-12 05:26:18',
'2023-06-12 05:26:18'),(10,11,'Beraksi','https://open.spotify.com/track/1x1zmEE1YLQLSlXkZr4dz
v','https://i.scdn.co/image/ab67616d0000b27355fcbac77e9be79cffca62e4','ID',10,'2023-06-12 05:
28:19','2023-06-12 05:28:19');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-12 13:14:22
