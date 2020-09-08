-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 08, 2020 at 05:00 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `clinic_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `clinic_users`
--

CREATE TABLE `clinic_users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `clinic_name` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `clinic_users`
--

INSERT INTO `clinic_users` (`id`, `email`, `password`, `clinic_name`, `phone_number`, `address`, `created_at`) VALUES
(9, 'aa@gmail.com', '$2a$10$K.064O4Y8aQbrZnjRvWU2e/bWKGrFPbk0DQ0tMMPhOIknNgMZfGKe', 'asdf', 'asdf', 'asdf', '2020-09-08 23:32:49'),
(12, 'test@gmail.com', '$2a$10$GdUjJRqzE0xotos9MtstB.k5OMzb79p1DJyuzxN3.BJjJpB2IAj/a', 'test', '123123123', '123ST', '2020-09-08 23:53:00');

-- --------------------------------------------------------

--
-- Table structure for table `records`
--

CREATE TABLE `records` (
  `id` int(11) NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `doctor_name` varchar(255) NOT NULL,
  `patient_name` varchar(255) NOT NULL,
  `diagnosis` text NOT NULL,
  `medication` text NOT NULL,
  `fee` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `follow_up` int(2) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `records`
--

INSERT INTO `records` (`id`, `clinic_id`, `doctor_name`, `patient_name`, `diagnosis`, `medication`, `fee`, `date`, `time`, `follow_up`, `created_at`) VALUES
(1, 12, 'asdf', 'aa', 'asdf', 'asf', 123, '2020-10-02', '12:12:00', 1, '2020-09-09 00:26:22'),
(2, 12, 'asdf2', 'aa2', 'asdf2', 'asf2', 1232, '2020-10-02', '12:12:00', 0, '2020-09-09 00:46:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clinic_users`
--
ALTER TABLE `clinic_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `records`
--
ALTER TABLE `records`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clinic_users`
--
ALTER TABLE `clinic_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `records`
--
ALTER TABLE `records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
