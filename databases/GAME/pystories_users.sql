-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 178.33.54.14:3306
-- Czas generowania: 13 Lis 2020, 09:13
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
-- Baza danych: `db_60055`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pystories_users`
--

CREATE TABLE `pystories_users` (
  `id` int(11) NOT NULL,
  `login` text CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `login2` text,
  `pass` text CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `token` varchar(64) NOT NULL,
  `checktoken` varchar(10) NOT NULL DEFAULT 'false',
  `zdrowie` int(11) NOT NULL DEFAULT '100',
  `money` int(11) NOT NULL DEFAULT '0' COMMENT 'Portfel',
  `bank_money` int(25) NOT NULL DEFAULT '0' COMMENT 'Bankomat',
  `skin` int(11) NOT NULL DEFAULT '0',
  `weave` int(11) NOT NULL DEFAULT '50',
  `reputation` int(25) NOT NULL DEFAULT '0' COMMENT 'Reputacja',
  `pjA` int(11) NOT NULL DEFAULT '0' COMMENT 'Prawo Jazdy Motocykl',
  `pjB` int(11) NOT NULL DEFAULT '0' COMMENT 'Prawo Jazdy Samochod',
  `pjC` int(11) NOT NULL DEFAULT '0' COMMENT 'Prawo Jazdy Ciezarowki',
  `pjL` int(11) NOT NULL DEFAULT '0' COMMENT 'Licencja Lotnicza',
  `pjT` int(11) NOT NULL DEFAULT '0',
  `licS` int(11) NOT NULL DEFAULT '0' COMMENT 'licka na strzelnicy',
  `prize` text NOT NULL,
  `identity_card` smallint(1) NOT NULL DEFAULT '0',
  `identity_card_text` text CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `passport` smallint(1) NOT NULL DEFAULT '0',
  `worker` int(11) NOT NULL DEFAULT '0' COMMENT 'Minuty Duty',
  `hours` int(12) NOT NULL COMMENT 'Przegrane Minuty ',
  `mandate` int(10) NOT NULL DEFAULT '0',
  `registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `register_serial` varchar(120) DEFAULT NULL,
  `logowania_nagroda` int(11) NOT NULL DEFAULT '0',
  `ostatnio_online` date NOT NULL DEFAULT '1970-01-01',
  `premiumdate` date NOT NULL,
  `changedpw` tinyint(1) NOT NULL DEFAULT '0',
  `pp` int(11) NOT NULL COMMENT 'punkty premium',
  `shader` varchar(100) NOT NULL DEFAULT '0,0,0,0,0,0,0',
  `blokada` int(11) NOT NULL DEFAULT '0',
  `seriale` varchar(1024) NOT NULL,
  `prezent` int(11) DEFAULT '0',
  `rp_tytul` text NOT NULL,
  `awatar` varchar(255) DEFAULT NULL,
  `scorespedytor` int(11) NOT NULL DEFAULT '0',
  `house` int(11) DEFAULT NULL,
  `tokennagroda` int(1) NOT NULL DEFAULT '1',
  `new` text,
  `srp` int(11) NOT NULL,
  `pkt_sv` text NOT NULL,
  `paczki_magazynier` text NOT NULL,
  `code` text NOT NULL,
  `premiumplusdate` date NOT NULL,
  `karta_bank` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Neveron';

--
-- Zrzut danych tabeli `pystories_users`
--

INSERT INTO `pystories_users` (`id`, `login`, `login2`, `pass`, `token`, `checktoken`, `zdrowie`, `money`, `bank_money`, `skin`, `weave`, `reputation`, `pjA`, `pjB`, `pjC`, `pjL`, `pjT`, `licS`, `prize`, `identity_card`, `identity_card_text`, `passport`, `worker`, `hours`, `mandate`, `registered`, `register_serial`, `logowania_nagroda`, `ostatnio_online`, `premiumdate`, `changedpw`, `pp`, `shader`, `blokada`, `seriale`, `prezent`, `rp_tytul`, `awatar`, `scorespedytor`, `house`, `tokennagroda`, `new`, `srp`, `pkt_sv`, `paczki_magazynier`, `code`, `premiumplusdate`, `karta_bank`) VALUES
(1, 'testUser', NULL, 'HASHEDPASSWD', '', 'false', 100, 275968748, 0, 167, 50, 23, 1, 1, 1, 1, 1, 1, '', 0, '', 0, 19, 802, 0, '2020-07-26 14:09:38', 'USERSERIAL', 0, '1970-01-01', '2020-08-15', 1, 0, '0,0,0,0,0,0,0', 0, '', 0, '', NULL, 0, NULL, 1, NULL, 15009, '', '', '', '2021-02-10', '');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `pystories_users`
--
ALTER TABLE `pystories_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `pystories_users`
--
ALTER TABLE `pystories_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
