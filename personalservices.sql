-- phpMyAdmin SQL Dump
-- version 4.2.8
-- http://www.phpmyadmin.net
--
-- Anamakine: localhost
-- Üretim Zamanı: 01 Haz 2015, 11:22:56
-- Sunucu sürümü: 5.6.23-log
-- PHP Sürümü: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Veritabanı: `personalservices`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `city`
--

CREATE TABLE IF NOT EXISTS `city` (
`city_id` int(11) NOT NULL,
  `city_name` varchar(50) NOT NULL,
  `create_uid` int(11) NOT NULL,
  `create_date` date NOT NULL,
  `lastupd_uid` int(11) DEFAULT NULL,
  `lastupd_date` date DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `city`
--

INSERT INTO `city` (`city_id`, `city_name`, `create_uid`, `create_date`, `lastupd_uid`, `lastupd_date`) VALUES
(1, 'Sakarya', 1, '2015-04-16', 1, '2015-05-29'),
(2, 'İstanbul', 1, '2015-04-21', 1, '2015-05-13'),
(3, 'Sivas', 1, '2015-04-21', 1, '2015-05-13'),
(6, 'Mersin', 1, '2015-04-22', 0, NULL),
(7, 'Kayseri', 1, '2015-04-22', 0, NULL),
(8, 'Samsun', 1, '2015-04-22', 0, NULL),
(9, 'Sinop', 1, '2015-04-22', 0, NULL),
(10, 'Düzce', 1, '2015-04-22', 0, NULL),
(11, 'Çanakkale', 1, '2015-04-22', 0, NULL),
(17, 'Yalova', 2, '2015-05-21', 0, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `route`
--

CREATE TABLE IF NOT EXISTS `route` (
`route_id` int(11) NOT NULL,
  `route_name` varchar(100) NOT NULL,
  `city_id` int(11) NOT NULL,
  `route_type_id` int(11) NOT NULL,
  `tot_duration` int(3) NOT NULL,
  `peron_no` int(2) NOT NULL,
  `vehicle_type` int(1) NOT NULL,
  `create_uid` int(11) NOT NULL,
  `create_date` date NOT NULL,
  `lastupd_uid` int(11) DEFAULT NULL,
  `lastupd_date` date DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `route`
--

INSERT INTO `route` (`route_id`, `route_name`, `city_id`, `route_type_id`, `tot_duration`, `peron_no`, `vehicle_type`, `create_uid`, `create_date`, `lastupd_uid`, `lastupd_date`) VALUES
(1, 'Çarşı-Serdivan', 1, 1, 555, 55, 3, 1, '2015-04-20', 1, '2015-05-14'),
(2, 'Ataşehir', 2, 2, 11, 11, 2, 1, '2015-04-22', 1, '2015-05-13'),
(4, 'Erenler-Toyota', 1, 1, 120, 55, 3, 1, '2015-04-24', 1, '2015-05-14'),
(6, 'Kadiköy-Ataşehir', 2, 1, 15, 15, 2, 1, '2015-04-24', 1, '2015-05-14'),
(7, 'Taşköprü', 17, 9, 15, 95, 2, 2, '2015-05-21', 2, '2015-05-21');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `route_type`
--

CREATE TABLE IF NOT EXISTS `route_type` (
`route_type_id` int(11) NOT NULL,
  `route_type_name` varchar(50) NOT NULL,
  `create_uid` int(11) NOT NULL,
  `create_date` date NOT NULL,
  `lastupd_uid` int(11) DEFAULT NULL,
  `lastupd_date` date DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `route_type`
--

INSERT INTO `route_type` (`route_type_id`, `route_type_name`, `create_uid`, `create_date`, `lastupd_uid`, `lastupd_date`) VALUES
(1, '08:00 - 18:00', 1, '2015-04-20', 1, '2015-05-29'),
(2, '10:00 - 20:00', 1, '2015-04-21', 1, '2015-04-21'),
(8, '06:00 - 16:00', 1, '2015-04-23', 0, NULL),
(9, '1. Vardiya', 2, '2015-05-21', 0, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `station`
--

CREATE TABLE IF NOT EXISTS `station` (
`station_id` int(11) NOT NULL,
  `station_name` varchar(100) NOT NULL,
  `route_id` int(11) NOT NULL,
  `station_no` int(2) NOT NULL,
  `arrival_time` varchar(5) NOT NULL,
  `departure_time` varchar(5) NOT NULL,
  `create_uid` int(11) NOT NULL,
  `create_date` date NOT NULL,
  `lastupd_uid` int(11) DEFAULT NULL,
  `lastupd_date` date DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `station`
--

INSERT INTO `station` (`station_id`, `station_name`, `route_id`, `station_no`, `arrival_time`, `departure_time`, `create_uid`, `create_date`, `lastupd_uid`, `lastupd_date`) VALUES
(1, 'Arifiye', 1, 11, '11:11', '22:22', 1, '2015-04-20', 1, '2015-05-14'),
(2, 'Mavi Durak', 1, 12, '16:12', '11:22', 1, '2015-04-21', 1, '2015-04-21'),
(3, 'Serdivan', 1, 11, '21:12', '11:55', 1, '2015-04-21', 1, '2015-04-21'),
(5, 'Mesire Yolu', 4, 12, '11:11', '22:22', 1, '2015-04-24', 0, NULL),
(7, 'deneme', 4, 12, '12:21', '12:12', 1, '2015-04-25', 1, '2015-05-14'),
(9, 'deneme12345', 6, 29, '15:15', '11:11', 1, '2015-05-14', 1, '2015-05-14'),
(10, 'Mavi Durak', 7, 35, '12:00', '15:00', 2, '2015-05-21', 0, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `sysadm_user`
--

CREATE TABLE IF NOT EXISTS `sysadm_user` (
`sysadm_uid` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `sysadm_user`
--

INSERT INTO `sysadm_user` (`sysadm_uid`, `first_name`, `last_name`, `username`, `password`) VALUES
(1, 'Mustafa', 'Deryol', 'mustafa', '1'),
(2, 'Onur', 'Altunsoy', 'onur', '1');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `city`
--
ALTER TABLE `city`
 ADD PRIMARY KEY (`city_id`);

--
-- Tablo için indeksler `route`
--
ALTER TABLE `route`
 ADD PRIMARY KEY (`route_id`);

--
-- Tablo için indeksler `route_type`
--
ALTER TABLE `route_type`
 ADD PRIMARY KEY (`route_type_id`);

--
-- Tablo için indeksler `station`
--
ALTER TABLE `station`
 ADD PRIMARY KEY (`station_id`);

--
-- Tablo için indeksler `sysadm_user`
--
ALTER TABLE `sysadm_user`
 ADD PRIMARY KEY (`sysadm_uid`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `city`
--
ALTER TABLE `city`
MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- Tablo için AUTO_INCREMENT değeri `route`
--
ALTER TABLE `route`
MODIFY `route_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Tablo için AUTO_INCREMENT değeri `route_type`
--
ALTER TABLE `route_type`
MODIFY `route_type_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- Tablo için AUTO_INCREMENT değeri `station`
--
ALTER TABLE `station`
MODIFY `station_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- Tablo için AUTO_INCREMENT değeri `sysadm_user`
--
ALTER TABLE `sysadm_user`
MODIFY `sysadm_uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
