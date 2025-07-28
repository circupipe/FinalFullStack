-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-07-2025 a las 23:44:39
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hardware`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `case_pc`
--

CREATE TABLE `case_pc` (
  `id` int(11) NOT NULL,
  `product` varchar(100) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `colors` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `case_pc`
--

INSERT INTO `case_pc` (`id`, `product`, `stock`, `image`, `colors`, `price`) VALUES
(1, 'Thermaltake Versa H18', 8, 'https://i.ibb.co/BH2TKrDM/12721-thermaltake-2.jpg', 'Black', 28000.00),
(2, 'Deepcool Matrexx 55', 12, 'https://i.ibb.co/SXX4pNKv/02.webp', 'blanco', 32000.00),
(3, 'Aerocool Cylon mini', 15, 'https://i.ibb.co/DfYtFbCw/Cylon-Mini-White-Infographics-700x700px-001.jpg', 'Blanco', 21000.00),
(4, 'NZXT H210i', 7, 'https://i.ibb.co/QvyZs3pX/614c-Br-Hf-Js-S-UF894-1000-QL80.jpg', 'Red', 39000.00),
(6, 'Cooler Master MB311L', 9, 'https://i.ibb.co/svVJwJT9/D-Q-NP-986641-MLU54963030630-042023-O.webp', 'Black', 27000.00),
(7, 'Phanteks P300A', 11, 'https://i.ibb.co/jkj9Nb3G/D-Q-NP-2-X-679482-MLU78120295193-082024-T.webp', 'Black', 25000.00),
(8, 'Lian Li Lancool 215', 6, 'https://i.ibb.co/M5Crym0M/D-Q-NP-678556-MLU70700569493-072023-O.webp', 'White', 41000.00),
(9, 'Fractal Design Focus G', 13, 'https://i.ibb.co/MkvG7Lg8/131.jpg', 'Blue', 23000.00),
(10, 'SilverStone Fara R1', 8, 'https://i.ibb.co/C5Yqn3fG/r1-pro-v2-640x640.webp', 'Black', 26000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cpu`
--

CREATE TABLE `cpu` (
  `id` int(11) NOT NULL,
  `product` varchar(100) NOT NULL,
  `watts_consumption` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `platform` enum('AMD','Intel') DEFAULT NULL,
  `socket` enum('AM4','LGA1200','LGA1700','AM5') DEFAULT NULL,
  `frequency` decimal(5,2) DEFAULT NULL,
  `integrated` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cpu`
--

INSERT INTO `cpu` (`id`, `product`, `watts_consumption`, `stock`, `image`, `platform`, `socket`, `frequency`, `integrated`, `price`) VALUES
(1, 'Intel Core i5-12600K', 125, 5, 'https://i.ibb.co/gZ4chvwG/1635539052-sdfdsf.jpg', 'Intel', 'LGA1700', 4.90, 'Sí', 210000.00),
(2, 'AMD Ryzen 5 5600G', 65, 7, 'https://i.ibb.co/jK8Rd1X/D-NQ-NP-800106-CBT75866297295-042024-O.webp', 'AMD', 'AM4', 4.40, 'Sí', 120000.00),
(3, 'Intel Core i7-12700F', 65, 6, 'https://i.ibb.co/ycHWW2S8/735858503105-PROCESADOR-INTEL-CORE-I7-12700-F-4.png', 'Intel', 'LGA1700', 4.80, 'No', 250000.00),
(4, 'AMD Ryzen 7 5800X', 105, 4, 'https://i.ibb.co/5X7Xc1SG/nb-PROCESADOR-AMD-AM4-RYZEN-7-5700-G-ver-a4193bdfbc1c2b9c547d5db676f9c9aa.jpg', 'AMD', 'AM5', 4.70, 'No', 180000.00),
(5, 'Intel Core i3-12100', 60, 8, 'https://i.ibb.co/KxhkW28W/000000000041435714151414357-1-800x800.png', 'Intel', 'LGA1700', 4.30, 'Sí', 95000.00),
(6, 'AMD Ryzen 3 4100', 65, 10, 'https://i.ibb.co/84RrRgMb/1655397661-dfgdfg.jpg', 'AMD', 'AM4', 4.00, 'No', 70000.00),
(7, 'Intel Core i9-12900K', 125, 3, 'https://i.ibb.co/39fznnZq/896373-MLA48198117525-112021-F.jpg', 'Intel', 'LGA1700', 5.20, 'Sí', 350000.00),
(8, 'AMD Ryzen 9 5900X', 105, 2, 'https://i.ibb.co/9k4tkTwC/D-NQ-NP-733513-MLU78853089507-082024-O.webp', 'AMD', 'AM4', 4.80, 'No', 320000.00),
(9, 'Intel Gold G740', 46, 12, 'https://i.ibb.co/C30BVBkY/D-NQ-NP-946417-MLA52279931619-112022-O.webp', 'Intel', 'LGA1700', 3.70, 'Sí', 40000.00),
(10, 'AMD Ryzen 5 7600X', 105, 5, 'https://i.ibb.co/wh8syq5k/processador-amd-ryzen-5-7600-5-2ghz-max-turbo-cache-38mb-am5-6-nucleos-video-integrado-100-100001015.jpg', 'AMD', 'AM5', 5.30, 'No', 250000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disk`
--

CREATE TABLE `disk` (
  `id` int(11) NOT NULL,
  `product` varchar(100) NOT NULL,
  `watts_consumption` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `capacity_gb` int(11) DEFAULT NULL,
  `technology` enum('HDD','SSD','M2') DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `disk`
--

INSERT INTO `disk` (`id`, `product`, `watts_consumption`, `stock`, `image`, `capacity_gb`, `technology`, `price`) VALUES
(1, 'Kingston A400 480GB SSD', 3, 10, 'https://i.ibb.co/h6DmP4j/disco-solido-ssd-34642-4.jpg', 480, 'SSD', 25000.00),
(2, 'WD Blue 2TB HDD', 6, 8, 'https://i.ibb.co/PsVkx3VL/1457-producto-wd-blue-2tb.jpg', 2000, 'HDD', 42000.00),
(3, 'Samsung 870 EVO 1TB SSD', 4, 7, 'https://i.ibb.co/zW7jj6Z9/https-static-arvutitark-ee-public-media-hub-olev-2023-02-351182-ssss-179-ssss-179-01.webp', 1000, 'SSD', 60000.00),
(4, 'Seagate Barracuda 4TB HDD', 8, 5, 'https://i.ibb.co/0yDNntDT/DIS464.jpg', 4000, 'HDD', 80000.00),
(5, 'Crucial BX500 240GB SSD', 2, 15, 'https://i.ibb.co/d0vYbhTm/1019-producto-ssd-crucial-bx500-240gb-2-6280.jpg', 240, 'SSD', 15000.00),
(6, 'ADATA XPG SX8200 Pro 1TB M2', 5, 6, 'https://i.ibb.co/4wC6Fshm/sx8200.jpg', 1000, 'M2', 70000.00),
(7, 'WD Black SN750 500GB M2', 4, 9, 'https://i.ibb.co/QjY73NSp/western-digital-m2-4.jpg', 500, 'M2', 35000.00),
(8, 'Seagate FireCuda 2TB SSHD', 7, 4, 'https://i.ibb.co/VcT0WZd4/firecuda-3-5-sshd-left-hero-270x270.png', 2000, 'HDD', 60000.00),
(9, 'Patriot Burst 120GB SSD', 2, 13, 'https://i.ibb.co/ynFjq3KW/hd-ssd-120gb-patriot-burst-elite-sata-iii-25-0.jpg', 120, 'SSD', 9000.00),
(10, 'Samsung 980 PRO 500GB M2', 3, 11, 'https://i.ibb.co/RGfwdxGs/disco-solido-ssd-nvme-m2-samsung-980-evo-pro-500gb-pcie-40-2274-3484.jpg', 500, 'M2', 32000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `graphics_card`
--

CREATE TABLE `graphics_card` (
  `id` int(11) NOT NULL,
  `product` varchar(100) NOT NULL,
  `watts_consumption` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `ram_type` enum('DDR3','DDR4','DDR5') DEFAULT NULL,
  `capacity_gb` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `graphics_card`
--

INSERT INTO `graphics_card` (`id`, `product`, `watts_consumption`, `stock`, `image`, `ram_type`, `capacity_gb`, `price`) VALUES
(1, 'ASUS GeForce RTX 4060 8GB', 115, 4, 'https://i.ibb.co/4ZBPtwhM/placa-de-video-geforce-asus-rtx-4060-dual-oc-8gb-black.jpg', 'DDR5', 8, 450000.00),
(2, 'AMD Radeon RX 7600 8GB', 165, 3, 'https://i.ibb.co/3m7jH4qd/sapphire-radeon-rx-7600-pulse-8gb-gddr61.jpg', 'DDR5', 8, 430000.00),
(3, 'NVIDIA GTX 1660 Super 6GB', 125, 7, 'https://i.ibb.co/V0fDSCpR/13-11-2024-11-11-22-5002.png', 'DDR4', 6, 210000.00),
(4, 'AMD Radeon RX 6500 XT 4GB', 107, 8, 'https://i.ibb.co/KxVv1ZMf/placa-de-video-gigabyte-radeon-rx-6500-xt-gaming-oc-4g-10.jpg', 'DDR4', 4, 150000.00),
(5, 'NVIDIA GeForce RTX 3070 Ti 8GB', 290, 2, 'https://i.ibb.co/zhMXMST5/81-XJZl7-OOo-L.jpg', 'DDR5', 8, 700000.00),
(6, 'AMD Radeon RX 6800 XT 16GB', 300, 1, 'https://i.ibb.co/7NJHqwHF/000000000041417750712414177-1.png', 'DDR5', 16, 950000.00),
(7, 'NVIDIA GeForce RTX 3050 8GB', 130, 6, 'https://i.ibb.co/FrKbY6k/video-geforce-rtx-3050-8gb-msi-ventus-2x-xs-oc-0.jpg', 'DDR4', 8, 320000.00),
(8, 'AMD Radeon RX 570 4GB', 120, 10, 'https://i.ibb.co/zT1nZ5M4/2000.png', 'DDR4', 4, 90000.00),
(9, 'NVIDIA GeForce GTX 1050 Ti 4GB', 75, 12, 'https://i.ibb.co/V08KRPcW/1024.png', 'DDR4', 4, 80000.00),
(10, 'AMD Radeon RX 7900 XTX 24GB', 355, 1, 'https://i.ibb.co/1GS6H7rm/video-radeon-rx-7900-xtx-24gb-gigabyte-gaming-oc-0.jpg', 'DDR5', 24, 1800000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `motherboard`
--

CREATE TABLE `motherboard` (
  `id` int(11) NOT NULL,
  `product` varchar(100) NOT NULL,
  `watts_consumption` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `socket` enum('AM4','LGA1200','LGA1700','AM5') DEFAULT NULL,
  `platform` enum('AMD','Intel') DEFAULT NULL,
  `ram_slots` int(11) DEFAULT NULL,
  `ram_type` enum('DDR3','DDR4','DDR5') DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `motherboard`
--

INSERT INTO `motherboard` (`id`, `product`, `watts_consumption`, `stock`, `image`, `socket`, `platform`, `ram_slots`, `ram_type`, `price`) VALUES
(1, 'ASUS ROG Strix B550-F', 40, 6, 'https://i.ibb.co/23MG4MLX/Motherboard-AM4-Asus-Rog-Strix-B550-F-II-Gaming-Wifi-D4.jpg', 'AM4', 'AMD', 4, 'DDR4', 110000.00),
(2, 'Gigabyte Z690 AORUS Elite', 38, 5, 'https://i.ibb.co/5XPBNh4p/box.png', 'LGA1700', 'Intel', 4, 'DDR5', 180000.00),
(3, 'MSI B450M PRO-VDH MAX', 30, 8, 'https://i.ibb.co/9HjQQp0c/e32b496fe16885ca0a2a273b1c8cfaad-hi.jpg', 'AM4', 'AMD', 4, 'DDR4', 60000.00),
(4, 'ASRock B660M Pro RS', 32, 7, 'https://i.ibb.co/5gBbgKhm/8107u-OIZKJL-AC-SL1500.jpg', 'LGA1700', 'Intel', 4, 'DDR4', 90000.00),
(5, 'Gigabyte X570 AORUS Elite', 42, 4, 'https://i.ibb.co/XrCQVtxV/22419.png', 'AM4', 'AMD', 4, 'DDR4', 130000.00),
(6, 'MSI MAG B550 Tomahawk', 35, 6, 'https://i.ibb.co/PGsVfKcK/D-Q-NP-788154-MLU74075251330-012024-O.webp', 'AM4', 'AMD', 4, 'DDR4', 95000.00),
(7, 'ASUS PRIME Z690-P', 36, 5, 'https://i.ibb.co/6c9D3HZ4/w692.png', 'LGA1700', 'Intel', 4, 'DDR5', 160000.00),
(8, 'Biostar B550MH', 28, 9, 'https://i.ibb.co/twvWT7Cp/D-NQ-NP-909583-MLU77949799065-072024-O.webp', 'AM4', 'AMD', 2, 'DDR4', 50000.00),
(9, 'ASRock X570 Phantom 4', 40, 3, 'https://i.ibb.co/NdssDCqw/D-NQ-NP-882618-MLU54978343450-042023-O.webp', 'AM4', 'AMD', 4, 'DDR4', 120000.00),
(10, 'Gigabyte B660M DS3H', 33, 7, 'https://i.ibb.co/4RtTvwhd/1058-producto-d-nq-np-665454-mla46238799244-062021-o-1601.jpg', 'LGA1700', 'Intel', 4, 'DDR4', 85000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `power_supply`
--

CREATE TABLE `power_supply` (
  `id` int(11) NOT NULL,
  `product` varchar(100) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `watts` int(11) DEFAULT NULL,
  `modular` tinyint(1) DEFAULT NULL,
  `certification` enum('80 Plus Bronze','80 Plus Gold','80 Plus Platinum') DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `power_supply`
--

INSERT INTO `power_supply` (`id`, `product`, `stock`, `image`, `watts`, `modular`, `certification`, `price`) VALUES
(1, 'Corsair CX650M 650W', 9, 'https://i.ibb.co/0jtW5LPh/1019-producto-corsair-fuente-cx650m-10-2726.jpg', 650, 1, '80 Plus Bronze', 35000.00),
(2, 'EVGA 700 GD 700W', 7, 'https://i.ibb.co/jv9YnsFp/100-GD-0700-V1-XL-1.png', 700, 0, '80 Plus Gold', 48000.00),
(3, 'Seasonic S12III 500W', 12, 'https://i.ibb.co/BHs0tPqF/fuente-pc-seasonic-550w-reales-s12iii-550-80-bronze-certificada-gamer.jpg', 500, 0, '80 Plus Bronze', 22000.00),
(4, 'Thermaltake Smart 600W', 10, 'https://i.ibb.co/0pK0WqCx/PS-SPD-0600-NPCW-W-0d26da03742b430cb61f0f082f4fd6a5.jpg', 600, 0, '80 Plus Bronze', 26000.00),
(5, 'Cooler Master MWE Gold 650W', 8, 'https://i.ibb.co/hJqkFysQ/81ghpcd8hr-L-UF894-1000-QL80.jpg', 650, 1, '80 Plus Gold', 39000.00),
(6, 'Gigabyte P650B 650W', 11, 'https://i.ibb.co/GQqvfdnV/929872-MLA40694293750-022020-F.jpg', 650, 0, '80 Plus Bronze', 27000.00),
(7, 'Corsair RM750x 750W', 6, 'https://i.ibb.co/SwrHRFfZ/Fuente-Corsair-RM750-X-750-W-80-Plus-Gold-Fully-Modular0.jpg', 750, 1, '80 Plus Gold', 65000.00),
(8, 'EVGA 600 W1 600W', 13, 'https://i.ibb.co/Pv6qnKjK/100-W1-0600-K1.png', 600, 0, '80 Plus Bronze', 21000.00),
(9, 'Thermaltake Toughpower GF1 850W', 5, 'https://i.ibb.co/cKdywbQD/gf850.jpg', 850, 1, '80 Plus Gold', 90000.00),
(10, 'Seasonic FOCUS GX-750 750W', 7, 'https://i.ibb.co/F4yr78Mq/71ya-Ad-Rz-FCL-UF894-1000-QL80.jpg', 750, 1, '80 Plus Gold', 70000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ram`
--

CREATE TABLE `ram` (
  `id` int(11) NOT NULL,
  `product` varchar(100) NOT NULL,
  `watts_consumption` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type` enum('DDR3','DDR4','DDR5') DEFAULT NULL,
  `capacity_gb` int(11) DEFAULT NULL,
  `speed_mhz` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ram`
--

INSERT INTO `ram` (`id`, `product`, `watts_consumption`, `stock`, `image`, `type`, `capacity_gb`, `speed_mhz`, `price`) VALUES
(1, 'Patriot Viper Steel 16GB DDR4 3200MHz', 12, 10, 'https://i.ibb.co/zhW3SrgV/nb-MEMORIA-PATRIOT-VIPER-STEEL-SERIES-16-GB-DDR4-3200-PE000639-ver-504820e1aca8df4f22a0e5dfc0607a38.jpg', 'DDR4', 16, 3200, 32000.00),
(2, 'Corsair Vengeance 32GB DDR5 5600MHz', 18, 6, 'https://i.ibb.co/CKgmGh8t/16-GB-CORSAIR-VENGEANCE-DDR5-5200-MHz-RAM-Memory16x1-3-Y.png', 'DDR5', 32, 5600, 95000.00),
(3, 'Kingston Fury Beast 8GB DDR4 2666MHz', 10, 15, 'https://i.ibb.co/wFpW8W9d/D-NQ-NP-816631-MLA46905803276-072021-O.webp', 'DDR4', 8, 2666, 12000.00),
(4, 'G.Skill Ripjaws V 32GB DDR4 3600MHz', 16, 8, 'https://i.ibb.co/6qwTBsx/MEMORIA-G-SKILL-RIPJAWS-V-8-GB-16-GVK8-GB.jpg', 'DDR4', 32, 3600, 70000.00),
(5, 'ADATA XPG Lancer 16GB DDR5 6000MHz', 20, 5, 'https://i.ibb.co/tPKSBLNn/772620-MLA75619519709-042024-F.jpg', 'DDR5', 16, 6000, 60000.00),
(6, 'Crucial Ballistix 16GB DDR4 3200MHz', 14, 12, 'https://i.ibb.co/Xk2mdrpd/D-NQ-NP-773761-MLA47515571581-092021-O.webp', 'DDR4', 16, 3200, 30000.00),
(7, 'T-Force Vulcan Z 8GB DDR4 3000MHz', 11, 14, 'https://i.ibb.co/cctbB3Bm/71-Bh3v-SQNAL-AC-SL1500.jpg', 'DDR4', 8, 3000, 11000.00),
(8, 'Corsair Dominator 64GB DDR5 5200MHz', 25, 2, 'https://i.ibb.co/Ld0v0y1y/Corsair-Dominator-Titanium-DDR5-2x16-GB-7200-Mhz-CL34-Review.jpg', 'DDR5', 64, 5200, 180000.00),
(9, 'Kingston HyperX Fury 16GB DDR3 1866MHz', 9, 10, 'https://i.ibb.co/rfKk8Fgz/D-NQ-NP-889680-MLU71549266401-092023-O.webp', 'DDR3', 16, 1866, 15000.00),
(10, 'Patriot Signature 4GB DDR3 1600MHz', 7, 20, 'https://i.ibb.co/FbPXC30Y/b4953492ac354cdaac2d490bb2bae255.webp', 'DDR3', 4, 1600, 5000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `type` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `firstname`, `lastname`, `timestamp`, `type`) VALUES
(1, 'admin', 'leonardoromangarcia@gmail.com', '$2b$10$mitR3h5pdIVSxBlf2Ky.Wek3W2Uh3Por4ZjXVSHwChShmUgrDCtk2', 'Leonardo', 'Garcia', '2025-07-10 21:03:44', 'admin'),
(2, 'user', 'user@user.com', '$2b$10$y3/QQ3CMMktPuwYNUdSkVOaUeFztAnFO20s0Xxhd86ghcY7btNd1S', 'leo', 'user', '2025-07-15 18:50:40', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `case_pc`
--
ALTER TABLE `case_pc`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cpu`
--
ALTER TABLE `cpu`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `disk`
--
ALTER TABLE `disk`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `graphics_card`
--
ALTER TABLE `graphics_card`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `motherboard`
--
ALTER TABLE `motherboard`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `power_supply`
--
ALTER TABLE `power_supply`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ram`
--
ALTER TABLE `ram`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `case_pc`
--
ALTER TABLE `case_pc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `cpu`
--
ALTER TABLE `cpu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `disk`
--
ALTER TABLE `disk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `graphics_card`
--
ALTER TABLE `graphics_card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `motherboard`
--
ALTER TABLE `motherboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `power_supply`
--
ALTER TABLE `power_supply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `ram`
--
ALTER TABLE `ram`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
