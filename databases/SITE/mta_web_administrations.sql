-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 178.33.54.14:3306
-- Czas generowania: 13 Lis 2020, 09:11
-- Wersja serwera: 10.1.41-MariaDB-0+deb9u1
-- Wersja PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `db_59994`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `mta_web_administrations`
--

CREATE TABLE `mta_web_administrations` (
  `id` int(11) NOT NULL,
  `serial` text NOT NULL,
  `rank` text NOT NULL,
  `userId` text,
  `qrcode` text NOT NULL,
  `secret_ascii` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Zrzut danych tabeli `mta_web_administrations`
--

INSERT INTO `mta_web_administrations` (`id`, `serial`, `rank`, `userId`, `qrcode`, `secret_ascii`) VALUES
(1, 'test', 'test', 'test', 'test', 'test');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `mta_web_administrations`
--
ALTER TABLE `mta_web_administrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `mta_web_administrations`
--
ALTER TABLE `mta_web_administrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
