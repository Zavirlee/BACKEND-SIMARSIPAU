-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 19 Sep 2023 pada 10.26
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simarsip`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `archive`
--

CREATE TABLE `archive` (
  `archive_id` int(11) NOT NULL,
  `archive_code` varchar(256) NOT NULL,
  `archive_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `archive_catalog_id` int(11) NOT NULL,
  `archive_title` varchar(512) NOT NULL,
  `archive_serial_number` int(11) NOT NULL,
  `archive_release_date` date NOT NULL,
  `archive_file_number` int(11) NOT NULL,
  `archive_condition_id` int(11) NOT NULL,
  `archive_type_id` int(11) NOT NULL,
  `archive_class_id` int(11) NOT NULL,
  `archive_agency` varchar(256) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `archive`
--

INSERT INTO `archive` (`archive_id`, `archive_code`, `archive_timestamp`, `archive_catalog_id`, `archive_title`, `archive_serial_number`, `archive_release_date`, `archive_file_number`, `archive_condition_id`, `archive_type_id`, `archive_class_id`, `archive_agency`, `user_id`) VALUES
(1, '01', '2023-09-11 04:02:42', 1, 'DOKTRIN TNI AU', 1, '2014-02-05', 1, 1, 1, 1, 'TNI AU', 1),
(9, '01', '2023-09-12 01:03:31', 1, 'KOPASGAT DAN MATRA UDARA', 2, '2019-03-02', 1, 1, 1, 1, 'TNI AU', 1),
(10, '01', '2023-09-15 08:04:26', 1, 'KOPASGAT DAN MATRA UDARA', 2, '2019-03-02', 1, 1, 1, 1, 'TNI AU', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `archive_catalog`
--

CREATE TABLE `archive_catalog` (
  `archive_catalog_id` int(11) NOT NULL,
  `archive_catalog_label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `archive_catalog`
--

INSERT INTO `archive_catalog` (`archive_catalog_id`, `archive_catalog_label`) VALUES
(1, 'DOKTRIN'),
(2, 'ORGANISASI DAN PROSEDUR (SURAT)'),
(3, 'PERENCANAAN'),
(4, 'SISTEM'),
(5, 'INSPEKSI DAN PENGAWASAN'),
(6, 'INTELIJEN-PENGAMANAN'),
(7, 'OPERASI MILITER'),
(8, 'PERSONEL (SPRIN)'),
(9, 'MATERIIL-LOGISTIK'),
(10, 'KOMUNIKASI DAN ELEKTRONIKA'),
(11, 'TERITORIAL'),
(12, 'PENDIDIKAN DAN LATIHAN'),
(13, 'HUKUM'),
(14, 'PENERANGAN'),
(15, 'KESEHATAN'),
(16, 'SEJARAH'),
(17, 'ADMINISTRASI UMUM'),
(18, 'KEUANGAN'),
(19, 'PEMBINAAN MENTAL'),
(20, 'PEMBINAAN JASMANI'),
(21, 'HUBUNGAN INTERNASIONAL'),
(22, 'NAVIGASI DAN AERONAUTIKA'),
(23, 'INDUSTRI'),
(24, 'PSIKOLOGI'),
(25, 'LAPORAN'),
(26, 'PENELITIAN DAN PENGEMBANGAN'),
(27, 'SURVEI DAN PEMETAAN'),
(28, 'KUMPULAN SKEP, KEP KASAU'),
(29, 'CD, DVD'),
(30, 'KERJASAMA'),
(31, 'KODE UNTUK BERKAS');

-- --------------------------------------------------------

--
-- Struktur dari tabel `archive_class`
--

CREATE TABLE `archive_class` (
  `archive_class_id` int(11) NOT NULL,
  `archive_class_label` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `archive_class`
--

INSERT INTO `archive_class` (`archive_class_id`, `archive_class_label`) VALUES
(1, 'Biasa'),
(2, 'Rahasia'),
(3, 'Sangat Rahasia');

-- --------------------------------------------------------

--
-- Struktur dari tabel `archive_condition`
--

CREATE TABLE `archive_condition` (
  `archive_condition_id` int(11) NOT NULL,
  `archive_condition_label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `archive_condition`
--

INSERT INTO `archive_condition` (`archive_condition_id`, `archive_condition_label`) VALUES
(1, 'Baik'),
(2, 'Rusak'),
(3, 'Sedang');

-- --------------------------------------------------------

--
-- Struktur dari tabel `archive_loc`
--

CREATE TABLE `archive_loc` (
  `archive_loc_id` int(11) NOT NULL,
  `archive_loc_building_id` int(11) NOT NULL,
  `archive_loc_room_id` int(11) NOT NULL,
  `archive_loc_rollopack_id` int(11) NOT NULL,
  `archive_loc_cabinet` int(11) NOT NULL,
  `archive_loc_rack` varchar(128) NOT NULL,
  `archive_loc_box` varchar(128) NOT NULL,
  `archive_loc_cover` varchar(128) NOT NULL,
  `archive_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `archive_loc`
--

INSERT INTO `archive_loc` (`archive_loc_id`, `archive_loc_building_id`, `archive_loc_room_id`, `archive_loc_rollopack_id`, `archive_loc_cabinet`, `archive_loc_rack`, `archive_loc_box`, `archive_loc_cover`, `archive_id`) VALUES
(1, 1, 1, 2, 1, '1', '1', '', 1),
(4, 1, 1, 1, 1, '1', '1', '', 9),
(5, 1, 1, 1, 1, '1', '1', '', 10);

-- --------------------------------------------------------

--
-- Struktur dari tabel `archive_type`
--

CREATE TABLE `archive_type` (
  `archive_type_id` int(11) NOT NULL,
  `archive_type_label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `archive_type`
--

INSERT INTO `archive_type` (`archive_type_id`, `archive_type_label`) VALUES
(1, 'Berkas'),
(2, 'Buku'),
(3, 'Audio'),
(4, 'Visual'),
(5, 'Film/Vidio'),
(6, 'Kartografi'),
(7, 'Elektronik');

-- --------------------------------------------------------

--
-- Struktur dari tabel `level_user`
--

CREATE TABLE `level_user` (
  `level_user_id` int(11) NOT NULL,
  `level_user_label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `level_user`
--

INSERT INTO `level_user` (`level_user_id`, `level_user_label`) VALUES
(1, 'admin'),
(2, 'operator'),
(3, 'pimpinan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `loc_building`
--

CREATE TABLE `loc_building` (
  `loc_building_id` int(11) NOT NULL,
  `loc_building_label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `loc_building`
--

INSERT INTO `loc_building` (`loc_building_id`, `loc_building_label`) VALUES
(1, 'Gedung I');

-- --------------------------------------------------------

--
-- Struktur dari tabel `loc_cabinet`
--

CREATE TABLE `loc_cabinet` (
  `loc_cabinet_id` int(11) NOT NULL,
  `loc_cabinet_label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `loc_cabinet`
--

INSERT INTO `loc_cabinet` (`loc_cabinet_id`, `loc_cabinet_label`) VALUES
(1, 'L1'),
(2, 'L2'),
(3, 'L3'),
(4, 'L4'),
(5, 'L5');

-- --------------------------------------------------------

--
-- Struktur dari tabel `loc_rollopack`
--

CREATE TABLE `loc_rollopack` (
  `loc_rollopack_id` int(11) NOT NULL,
  `loc_rollopack_label` text NOT NULL,
  `archive_catalog_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `loc_rollopack`
--

INSERT INTO `loc_rollopack` (`loc_rollopack_id`, `loc_rollopack_label`, `archive_catalog_id`) VALUES
(1, 'R-1', 1),
(2, 'R-2', 2),
(3, 'R-3', 3),
(4, 'R-4', 4),
(5, 'R-5', 5),
(6, 'R-6', 6),
(7, 'R-7', 7),
(8, 'R-8', 8),
(9, 'R-9', 9),
(10, 'R-10', 10),
(11, 'R-11', 11),
(12, 'R-12', 12),
(13, 'R-13', 13),
(14, 'R-14', 14),
(15, 'R-15', 15),
(16, 'R-16', 16),
(17, 'R-17', 17),
(18, 'R-18', 18),
(19, 'R-19', 19),
(20, 'R-20', 20),
(21, 'R-21', 21),
(22, 'R-22', 22),
(23, 'R-23', 23),
(24, 'R-24', 24),
(25, 'R-25', 25),
(67, 'R-26', 26),
(68, 'R-27', 27),
(69, 'R-28', 28),
(70, 'R-29', 29),
(71, 'R-30', 30),
(72, 'R-31', 31);

-- --------------------------------------------------------

--
-- Struktur dari tabel `loc_room`
--

CREATE TABLE `loc_room` (
  `loc_room_id` int(11) NOT NULL,
  `loc_room_label` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `loc_room`
--

INSERT INTO `loc_room` (`loc_room_id`, `loc_room_label`) VALUES
(1, 'Ruangan I');

-- --------------------------------------------------------

--
-- Struktur dari tabel `log`
--

CREATE TABLE `log` (
  `log_id` int(11) NOT NULL,
  `action` varchar(256) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `archive_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(256) NOT NULL,
  `satker` varchar(128) NOT NULL,
  `level_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `satker`, `level_user_id`) VALUES
(1, 'admin', '$2a$10$lMJnLbtJtEJrEyQup9mp6.8sRWfj3cplQwYRvAGuozu7RiPtKSx.u', 'DISINFOLAHTA TNI AU', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `archive`
--
ALTER TABLE `archive`
  ADD PRIMARY KEY (`archive_id`),
  ADD KEY `archive_catalog_id_2` (`archive_catalog_id`),
  ADD KEY `archive_condition_id` (`archive_condition_id`),
  ADD KEY `archive_type_id` (`archive_type_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `archive_class_id` (`archive_class_id`),
  ADD KEY `archive_catalog_id_3` (`archive_catalog_id`),
  ADD KEY `archive_catalog_id_4` (`archive_catalog_id`),
  ADD KEY `archive_catalog_id` (`archive_catalog_id`) USING BTREE;

--
-- Indeks untuk tabel `archive_catalog`
--
ALTER TABLE `archive_catalog`
  ADD PRIMARY KEY (`archive_catalog_id`);

--
-- Indeks untuk tabel `archive_class`
--
ALTER TABLE `archive_class`
  ADD PRIMARY KEY (`archive_class_id`);

--
-- Indeks untuk tabel `archive_condition`
--
ALTER TABLE `archive_condition`
  ADD PRIMARY KEY (`archive_condition_id`);

--
-- Indeks untuk tabel `archive_loc`
--
ALTER TABLE `archive_loc`
  ADD PRIMARY KEY (`archive_loc_id`),
  ADD KEY `archive_loc_building_id` (`archive_loc_building_id`),
  ADD KEY `archive_loc_room_id` (`archive_loc_room_id`),
  ADD KEY `archive_loc_rollopack_id` (`archive_loc_rollopack_id`),
  ADD KEY `archive_id` (`archive_id`),
  ADD KEY `archive_loc_cabinet` (`archive_loc_cabinet`);

--
-- Indeks untuk tabel `archive_type`
--
ALTER TABLE `archive_type`
  ADD PRIMARY KEY (`archive_type_id`);

--
-- Indeks untuk tabel `level_user`
--
ALTER TABLE `level_user`
  ADD PRIMARY KEY (`level_user_id`);

--
-- Indeks untuk tabel `loc_building`
--
ALTER TABLE `loc_building`
  ADD PRIMARY KEY (`loc_building_id`);

--
-- Indeks untuk tabel `loc_cabinet`
--
ALTER TABLE `loc_cabinet`
  ADD PRIMARY KEY (`loc_cabinet_id`);

--
-- Indeks untuk tabel `loc_rollopack`
--
ALTER TABLE `loc_rollopack`
  ADD PRIMARY KEY (`loc_rollopack_id`),
  ADD KEY `archive_catalog_id` (`archive_catalog_id`);

--
-- Indeks untuk tabel `loc_room`
--
ALTER TABLE `loc_room`
  ADD PRIMARY KEY (`loc_room_id`);

--
-- Indeks untuk tabel `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `archive_id` (`archive_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `level_user_id_2` (`level_user_id`),
  ADD KEY `level_user_id` (`level_user_id`) USING BTREE;

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `archive`
--
ALTER TABLE `archive`
  MODIFY `archive_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `archive_catalog`
--
ALTER TABLE `archive_catalog`
  MODIFY `archive_catalog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT untuk tabel `archive_class`
--
ALTER TABLE `archive_class`
  MODIFY `archive_class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `archive_condition`
--
ALTER TABLE `archive_condition`
  MODIFY `archive_condition_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `archive_loc`
--
ALTER TABLE `archive_loc`
  MODIFY `archive_loc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `archive_type`
--
ALTER TABLE `archive_type`
  MODIFY `archive_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `level_user`
--
ALTER TABLE `level_user`
  MODIFY `level_user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `loc_building`
--
ALTER TABLE `loc_building`
  MODIFY `loc_building_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `loc_cabinet`
--
ALTER TABLE `loc_cabinet`
  MODIFY `loc_cabinet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `loc_rollopack`
--
ALTER TABLE `loc_rollopack`
  MODIFY `loc_rollopack_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT untuk tabel `loc_room`
--
ALTER TABLE `loc_room`
  MODIFY `loc_room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `log`
--
ALTER TABLE `log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `archive`
--
ALTER TABLE `archive`
  ADD CONSTRAINT `archive_ibfk_1` FOREIGN KEY (`archive_condition_id`) REFERENCES `archive_condition` (`archive_condition_id`),
  ADD CONSTRAINT `archive_ibfk_2` FOREIGN KEY (`archive_type_id`) REFERENCES `archive_type` (`archive_type_id`),
  ADD CONSTRAINT `archive_ibfk_3` FOREIGN KEY (`archive_catalog_id`) REFERENCES `archive_catalog` (`archive_catalog_id`),
  ADD CONSTRAINT `archive_ibfk_4` FOREIGN KEY (`archive_class_id`) REFERENCES `archive_class` (`archive_class_id`);

--
-- Ketidakleluasaan untuk tabel `archive_loc`
--
ALTER TABLE `archive_loc`
  ADD CONSTRAINT `archive_loc_ibfk_1` FOREIGN KEY (`archive_loc_building_id`) REFERENCES `loc_building` (`loc_building_id`),
  ADD CONSTRAINT `archive_loc_ibfk_2` FOREIGN KEY (`archive_loc_room_id`) REFERENCES `loc_room` (`loc_room_id`),
  ADD CONSTRAINT `archive_loc_ibfk_3` FOREIGN KEY (`archive_loc_rollopack_id`) REFERENCES `loc_rollopack` (`loc_rollopack_id`),
  ADD CONSTRAINT `archive_loc_ibfk_4` FOREIGN KEY (`archive_id`) REFERENCES `archive` (`archive_id`),
  ADD CONSTRAINT `archive_loc_ibfk_5` FOREIGN KEY (`archive_loc_cabinet`) REFERENCES `loc_cabinet` (`loc_cabinet_id`);

--
-- Ketidakleluasaan untuk tabel `loc_rollopack`
--
ALTER TABLE `loc_rollopack`
  ADD CONSTRAINT `loc_rollopack_ibfk_1` FOREIGN KEY (`archive_catalog_id`) REFERENCES `archive_catalog` (`archive_catalog_id`);

--
-- Ketidakleluasaan untuk tabel `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `log_ibfk_1` FOREIGN KEY (`archive_id`) REFERENCES `archive` (`archive_id`),
  ADD CONSTRAINT `log_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Ketidakleluasaan untuk tabel `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`level_user_id`) REFERENCES `level_user` (`level_user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
