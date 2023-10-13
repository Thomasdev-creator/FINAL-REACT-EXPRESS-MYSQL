SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `sals` (
  `id` int(11) NOT NULL,
  `guestname` varchar(100) NOT NULL,
  `year` int(11) NOT NULL,
  `carname` text NOT NULL,
  `date` datetime NOT NULL,
  `nationality` text NOT NULL,
  `contact` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `totalcost` int(11) NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO sals 
(id, guestname, year, carname, date, nationality, contact, email, age, message, totalcost, role) 
VALUES 
(1, 'John Doe', 2023, 'Toyota Camry', '2023-10-13 12:00:00', 'American', '+123456789', 'johndoe@example.com', 30, 'Test message', 20000, 'Guest');


CREATE TABLE `guests` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO guests 
(id, email, password, role) 
VALUES 
(1, 'johndoe@example.com', 'hashed_password_here', 'RegularGuest');


CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO subscribers 
(id, email) 
VALUES 
(1, 'subscriber@example.com');



CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `time` varchar(50) NOT NULL,
  `model` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `year` int(11) NOT NULL,
  `kilometer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO vehicles 
(id, name, price, image, time, model, description, year, kilometer) 
VALUES 
(1, 'Toyota Camry', 25000, 'path/to/image.jpg', '12:30 PM', 'Sedan', 'This is a description for Toyota Camry.', 2023, 10000);


CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `secName` varchar(100) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `users` (firstName, secName, contact, email, password, role) 
VALUES 
('Tom', 'test', '+33 123456789', 'tom@admin.com', 'adminadmin', 'admin');

ALTER TABLE `sals`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `sals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

ALTER TABLE `guests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;