-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 24, 2022 at 03:09 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tesaFollowers`
--

-- --------------------------------------------------------

--
-- Table structure for table `API_Provider`
--

CREATE TABLE `API_Provider` (
  `id` int(11) NOT NULL,
  `APIproviderID` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `apiKey` varchar(255) NOT NULL,
  `balance` double NOT NULL,
  `currency` varchar(40) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` int(1) NOT NULL COMMENT '1=active 0=inactive',
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `API_Provider`
--

INSERT INTO `API_Provider` (`id`, `APIproviderID`, `userID`, `name`, `url`, `apiKey`, `balance`, `currency`, `description`, `status`, `updatedAt`, `createdAt`) VALUES
(1, 'l3bhj1mzfqaryonfy1', '1', 'socialsecret', 'https://socialsecret.club/api/v2', '75cf395d56079b1b91eab021a400164956d2b4d650f7494f30d501dfc85b09e1', 1, 'USD', 'This will be the main source for service now', 1, '2022-07-25 21:21:58', '2022-05-18 11:12:49');

-- --------------------------------------------------------

--
-- Table structure for table `general_news`
--

CREATE TABLE `general_news` (
  `id` int(11) NOT NULL,
  `userID` varchar(255) NOT NULL COMMENT 'The Admin user that created the news',
  `title` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `status` int(1) NOT NULL COMMENT '1=active 0=don''t display',
  `expiryDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `general_options`
--

CREATE TABLE `general_options` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `value` longtext DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `general_options`
--

INSERT INTO `general_options` (`id`, `name`, `value`) VALUES
(67, 'enable_https', '1'),
(68, 'enable_disable_homepage', '0'),
(69, 'website_desc', 'NigeriaFollowers -Real Instagram Followers - YouTube Subscribers - Twitter Followers - Website Traffic - Instagram Verification - TikTook Followers, AudioMack Stream, Spotify Services - #1 SMM Reseller Panel - Best SMM Panel for Resellers. Also well known for TOP SMM Panel and Cheap SMM Panel for all kind of Social Media Marketing Services. SMM Panel for Facebook, Instagram, YouTube and more services!                                                                                '),
(70, 'website_keywords', 'Instagram Services, YouTube Services, Twitter Services, Facebook Services, Spotify Service,  social media, Instagram Verification, smm panel, smm reseller panel, smm provider panel, reseller panel, instagram panel, resellerpanel, social media reseller panel, smmpanel, panelsmm, smm, panel, socialmedia, instagram reseller panel                                                                                '),
(71, 'website_title', 'NigeriaFollowers - Best Digital Marketing Platform'),
(72, 'website_favicon', 'https://nigeriafollowers.com/assets/uploads/user5b384ce32d8cdef02bc3a139d4cac0a22bb029e8/a01452203d9787957759c1c3e4dba784.png'),
(73, 'embed_head_javascript', '&lt;script src=&quot;//code.tidio.co/y3cidazxaj6s8xwugmawbyiukfishk7k.js&quot; async&gt;&lt;/script&gt;'),
(74, 'website_logo', 'https://nigeriafollowers.com/assets/uploads/user5b384ce32d8cdef02bc3a139d4cac0a22bb029e8/c6b23eb9556c010e5a30990bc74e0cb6.png'),
(75, 'website_logo_white', 'https://nigeriafollowers.com/assets/uploads/user5b384ce32d8cdef02bc3a139d4cac0a22bb029e8/0354fb89b99b9c5bbb47622b779bc78d.png'),
(76, 'enable_service_list_no_login', '1'),
(77, 'disable_signup_page', '0'),
(78, 'notification_popup_content', '<p>AUDIOMACK UNLIMITED STREAM ANNOUNCEMENT </p>\r\n<table class=\"table table-striped table-bordered table-hover dataTable\" id=\"sample_1\" aria-describedby=\"sample_1_info\" xss=\"removed\">\r\n<tbody role=\"alert\" aria-live=\"polite\" aria-relevant=\"all\">\r\n<tr class=\"gradeX odd\" xss=\"removed\">\r\n<td class=\"center \" xss=\"removed\"><center><strong><small>Audiomackstream.com has been officially Launched to get Unlimited Audiomack Streams• visit Website @ Audiomackstream.com</small></strong></center></td>\r\n<td class=\"center \" xss=\"removed\"></td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p></p>\r\n<p>AUDIOMACKSTREAM</p>'),
(79, 'is_cookie_policy_page', ''),
(80, 'enable_api_tab', '1'),
(81, 'contact_tel', ''),
(82, 'contact_email', 'support@nigeriafollowers.com'),
(83, 'contact_work_hour', 'MON - SUN [ 24 HOURS SUPPORT ]'),
(84, 'social_facebook_link', ''),
(85, 'social_twitter_link', ''),
(86, 'social_instagram_link', ''),
(87, 'social_pinterest_link', ''),
(88, 'social_tumblr_link', ''),
(89, 'social_youtube_link', ''),
(90, 'copy_right_content', 'Copyright © 2015 - 2021 - NigeriaFollowers'),
(91, 'embed_javascript', ''),
(92, 'enable_notification_popup', '1'),
(93, 'enable_goolge_recapcha', '0'),
(94, 'currency_decimal_separator', 'dot'),
(95, 'currency_thousand_separator', 'comma'),
(96, 'currency_symbol', '$'),
(97, 'currency_decimal', '2'),
(98, 'default_header_skin', 'cosmic-fusion'),
(99, 'enable_news_announcement', '1'),
(100, 'is_maintenance_mode', '0'),
(101, 'website_name', 'NigeriaFollowers'),
(102, 'is_active_paystack', '1'),
(103, 'paystack_chagre_fee', '1'),
(104, 'paystack_currency_rate_to_usd', '550'),
(105, 'paystack_secret_key', 'sk_live_9caf46817cc4240d65246d95a60f38c3711c073f'),
(106, 'paystack_public_key', 'pk_live_04f01c95fab61cbbcb3388ad46801ea0bee01d92'),
(107, 'is_verification_new_account', '0'),
(108, 'is_welcome_email', '0'),
(109, 'is_new_user_email', '0'),
(110, 'is_payment_notice_email', '1'),
(111, 'is_ticket_notice_email', '1'),
(112, 'is_ticket_notice_email_admin', '1'),
(113, 'is_order_notice_email', '0'),
(114, 'email_from', 'Support@nigeriafollowers.com'),
(115, 'email_name', 'NigeriaFollower Support Team'),
(116, 'email_protocol_type', 'php_mail'),
(117, 'smtp_server', ''),
(118, 'smtp_port', ''),
(119, 'smtp_encryption', 'none'),
(120, 'smtp_username', ''),
(121, 'smtp_password', ''),
(122, 'verification_email_subject', '{{website_name}} - Please validate your account'),
(123, 'verification_email_content', '<p><strong>Welcome to {{website_name}}! </strong></p>\r\n<p>Hello <strong>{{user_firstname}}</strong>!</p>\r\n<p> Thank you for joining! We\'re glad to have you as community member, and we\'re stocked for you to start exploring our service.  If you don\'t verify your address, you won\'t be able to create a User Account.</p>\r\n<p>  All you need to do is activate your account by click this link: <br>  {{activation_link}} </p>\r\n<p>Thanks and Best Regards!</p>'),
(124, 'email_welcome_email_subject', '{{website_name}} - Getting Started with Our Service!'),
(125, 'email_welcome_email_content', '<p><strong>Welcome to {{website_name}}! </strong></p>\r\n<p>Hello <strong>{{user_firstname}}</strong>!</p>\r\n<p>Congratulations! <br>You have successfully signed up for our service - {{website_name}} with follow data</p>\r\n<ul>\r\n<li>Firstname: {{user_firstname}}</li>\r\n<li>Lastname: {{user_lastname}}</li>\r\n<li>Email: {{user_email}}</li>\r\n<li>Timezone: {{user_timezone}}</li>\r\n</ul>\r\n<p>It has been a pleasure having you on board & We want to exceed your expectations, All services on our platform are working perfect, so please do not hesitate to reach out at any time if you have any questions or concerns. We look to working with you.</p>\r\n<p>Don\'t Reply this email <br>Best Regards,</p>'),
(126, 'email_new_registration_subject', '{{website_name}} - New Registration'),
(127, 'email_new_registration_content', '<p xss=removed>Hi Admin!</p>\r\n<p>Someone signed up in <strong>{{website_name}}</strong> with follow data</p>\r\n<ul>\r\n<li>Firstname {{user_firstname}}</li>\r\n<li>Lastname: {{user_lastname}}</li>\r\n<li>Email: {{user_email}}</li>\r\n<li>Timezone: {{user_timezone}}</li>\r\n</ul>'),
(128, 'email_password_recovery_subject', '{{website_name}} - Password Recovery'),
(129, 'email_password_recovery_content', '<p>Hi<strong> {{user_firstname}}! </strong></p>\r\n<p>Somebody (hopefully you) requested a new password for your account. </p>\r\n<p>No changes have been made to your account yet. <br>You can reset your password by click this link: <br>{{recovery_password_link}}</p>\r\n<p>If you did not request a password reset, no further action is required. </p>\r\n<p>Thanks and Best Regards!</p>'),
(130, 'email_payment_notice_subject', '{{website_name}} -  Thank You! Deposit Payment Received'),
(131, 'email_payment_notice_content', '<p>Hi<strong> {{user_firstname}}! </strong></p>\r\n<p>We\'ve just received your final remittance and would like to thank you. We appreciate your diligence in adding funds to your balance in our service.</p>\r\n<p>You can start placing your orders now. We wish you the best of luck.</p>\r\n<p>Don\'t reply this email <br>Thanks and Best Regards!</p>'),
(132, 'currency_code', 'USD'),
(133, 'default_price_percentage_increase', '30'),
(134, 'auto_rounding_x_decimal_places', '2'),
(135, 'is_auto_currency_convert', '1'),
(136, 'new_currecry_rate', '1'),
(137, 'enable_signup_skype_field', '0'),
(138, 'is_active_paypal', '0'),
(139, 'is_active_stripe', '0'),
(140, 'is_active_2checkout', '0'),
(141, 'is_active_manual', '1'),
(142, 'paystack_payment_transaction_min', ''),
(143, 'payment_transaction_min', '1000'),
(144, 'paystack_payment_environment', 'TEST'),
(145, 'payment_environment', 'sandbox'),
(146, 'paypal_chagre_fee', '3'),
(147, 'paypal_client_id', ''),
(148, 'paypal_client_secret', ''),
(149, 'stripe_chagre_fee', '4'),
(150, 'stripe_publishable_key', ''),
(151, 'stripe_secret_key', ''),
(152, 'twocheckout_chagre_fee', '4'),
(153, '2checkout_publishable_key', ''),
(154, '2checkout_private_key', ''),
(155, '2checkout_seller_id', ''),
(156, 'manual_payment_content', ''),
(157, 'cookies_policy_page', '<p><strong>Lorem Ipsum</strong></p><p>Lorem ipsum dolor sit amet, in eam consetetur consectetuer. Vivendo eleifend postulant ut mei, vero maiestatis cu nam. Qui et facer mandamus, nullam regione lucilius eu has. Mei an vidisse facilis posidonium, eros minim deserunt per ne.</p><p>Duo quando tibique intellegam at. Nec error mucius in, ius in error legendos reformidans. Vidisse dolorum vulputate cu ius. Ei qui stet error consulatu.</p><p>Mei habeo prompta te. Ignota commodo nam ei. Te iudico definitionem sed, placerat oporteat tincidunt eu per, stet clita meliore usu ne. Facer debitis ponderum per no, agam corpora recteque at mel.</p>'),
(158, 'terms_content', '<div class=\"col-md-8\">\r\n<div class=\"content\">\r\n<p><strong>The use of services provided by Naijafollowers establishes agreement to these terms. By registering or using our services you agree that you have read and fully understood the following terms of Service and Naijafollowers will not be help liable for loss in any way for users who have not read the below terms of service.</strong></p>\r\n<p><strong>1. GENERAL</strong><br>By placing an order with Naijafollowers, you automatically accept all the below listed term of services weather you read them or not.</p>\r\n<p>We reserve the right to change these terms of service without notice. You are expected to read all terms of service before placing every order to insure you are up to date with any changes or any future changes.</p>\r\n<p>You will only use the Naijafollowers website in a manner which follows all agreements made with Instagram/facebook/twitter/youtube/other social media site on their individual Terms of Service page.</p>\r\n<p>Naijafollowers rates are subject to change at any time without notice. The payment/refund policy stays in effect in the case of rate changes. Naijafollowers does not guarantee a delivery time for any services. We offer our best estimation for when the order will be delivered. This is only an estimation and Naijafollowers will not refund orders that are processing if you feel they are taking too long.</p>\r\n<p>Naijafollowers tries hard to deliver exactly what is expected from us by our re-sellers. In this case, we reserve the right to change a service type if we deem it necessary to complete an order.</p>\r\n<p><strong>Disclaimer:</strong><br>Naijafollowers will not be responsible for any damages you or your business may suffer.</p>\r\n<p><strong>Liabilities:</strong><br>Naijafollowers is in no way liable for any account suspension or picture deletion done by Instagram or Twitter or Facebook or YouTube or Other Social Media.</p>\r\n<p><strong>2 SERVICE</strong></p>\r\n<p>Naijafollowers will only be used to promote your Instagram/Twitter/Facebook or Social account and help boost your \"Appearance\" only.</p>\r\n<p>We DO NOT guarantee your new followers will interact with you, we simply guarantee you to get the followers you pay for.</p>\r\n<p>We DO NOT guarantee 100% of our accounts will have a profile picture, full bio and uploaded pictures, although we strive to make this the reality for all accounts.</p>\r\n<p>You will not upload anything into the Naijafollowers site including nudity or any material that is not accepted or suitable for the Instagram/Twitter/Facebook or Social Media community.</p>\r\n<p>Private accounts would not get a refund! Please ensure that your account is public before ordering.</p>\r\n</div>\r\n</div>'),
(159, 'policy_content', '<p><strong>1. REFUND POLICY</strong></p>\r\n<p>No refunds will be made to Paypal. After a deposit has been completed, there is no way to reverse it. You must use your balance on orders from Naijafollowers.</p>\r\n<p>You agree that once you complete a payment, you will not file a dispute or a charge-back against us for any reason.</p>\r\n<p>If you file a dispute or charge-back against us after a deposit, we reserve the right to terminate all future orders, ban you from our site. We also reserve the right to take away any followers or likes we delivered to your or your clients Instagram/Facebook/Twitter or other social media account.</p>\r\n<p>Orders placed in Naijafollowers will not be refunded or cancelled after they are placed. You will receive a refund credit to your Naijafollowers account if the order is non-deliverable.</p>\r\n<p>Misplaced or Private account orders will not qualify for a refund. Be sure to confirm each and every order before placing it.</p>\r\n<p>Fraudulent activity such as using unauthorized or stolen credit cards will lead to termination of your account. There are no exceptions.</p>\r\n<p>Please do not use more than one server at the same time for the same page. We cannot give you the correct followers/likes number in that case. We will not refund for these orders</p>\r\n<p></p>\r\n<p><strong>PRIVACY POLICY</strong></p>\r\n<p>This policy covers how we use your personal information. We take your privacy seriously and will take all measures to protect your personal information. Any personal information received will only be used to fill your order. We will not sell or redistribute your information to anyone. All information is encrypted and saved in secure servers.</p>'),
(160, 'default_home_page', 'regular'),
(161, 'default_limit_per_page', '10'),
(162, 'default_timezone', 'Africa/Lagos'),
(163, 'is_clear_ticket', '0'),
(164, 'default_clear_ticket_days', '30'),
(165, 'default_min_order', '5'),
(166, 'default_max_order', '1000000000000000000000000000000000'),
(167, 'default_price_per_1k', '0.000001'),
(168, 'enable_drip_feed', '0'),
(169, 'default_drip_feed_runs', '10'),
(170, 'default_drip_feed_interval', '30'),
(171, 'enable_explication_service_symbol', '0'),
(172, 'google_capcha_site_key', ''),
(173, 'google_capcha_secret_key', ''),
(174, 'enable_attentions_orderpage', ''),
(175, 'defaut_auto_sync_service_setting', '{\"price_percentage_increase\":225,\"sync_request\":1,\"new_currency_rate\":\"1\",\"is_enable_sync_price\":1,\"is_convert_to_new_currency\":1}'),
(176, 'get_features_option', '0'),
(66, 'website_name', 'Tesa Followers');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `orderID` varchar(255) NOT NULL,
  `providerOrderID` varchar(255) DEFAULT NULL,
  `serviceID` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL COMMENT 'direct or API',
  `APIproviderID` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `amount` double NOT NULL,
  `costAmount` double NOT NULL,
  `apiCharge` double DEFAULT NULL,
  `profit` double NOT NULL,
  `startCount` bigint(20) DEFAULT NULL,
  `remains` bigint(20) DEFAULT NULL,
  `note` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `id` int(11) NOT NULL,
  `paymentMethodID` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `minAmount` int(11) NOT NULL,
  `maxAmount` int(11) NOT NULL,
  `exchangeRate` int(11) NOT NULL,
  `data` text NOT NULL,
  `status` int(1) NOT NULL COMMENT '1:active 0:inactive',
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`id`, `paymentMethodID`, `name`, `currency`, `minAmount`, `maxAmount`, `exchangeRate`, `data`, `status`, `updatedAt`, `createdAt`) VALUES
(1, 'sdrtfyguhj', 'Flutterwave', 'NGN,USD', 1, 1000, 640, '{\"publicKey\": \"FLWPUBK-4246edd2d1f351a3adc83d131e431ec5-X\"}', 1, '2022-07-26 08:48:33', '2022-06-07 08:40:34');

-- --------------------------------------------------------

--
-- Table structure for table `payment_transactions`
--

CREATE TABLE `payment_transactions` (
  `id` int(11) NOT NULL,
  `transactionID` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `extraData` text NOT NULL,
  `amount` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment_transactions`
--

INSERT INTO `payment_transactions` (`id`, `transactionID`, `userID`, `currency`, `paymentMethod`, `extraData`, `amount`, `status`, `updatedAt`, `createdAt`) VALUES
(12, '1658825320295', '82b8644b-1f7d-40e3-a6c4-5ae0dfb3583d', 'NGN', 'Flutterwave', '{\"ip\":\"105.112.214.38\",\"lat\":6.3332,\"lon\":5.6238,\"country\":\"Nigeria\",\"usedNetwork\":\"AS36873 Airtel Networks Limited\"}', 1920, 'Rejected', '2022-07-30 22:42:34', '2022-07-26 08:49:02'),
(13, '1658825768740', '82b8644b-1f7d-40e3-a6c4-5ae0dfb3583d', 'NGN', 'Flutterwave', '{\"ip\":\"105.112.214.38\",\"lat\":6.3332,\"lon\":5.6238,\"country\":\"Nigeria\",\"usedNetwork\":\"AS36873 Airtel Networks Limited\"}', 1920, 'Failed', '2022-07-26 08:56:52', '2022-07-26 08:56:52'),
(14, '1658825842829', '82b8644b-1f7d-40e3-a6c4-5ae0dfb3583d', 'NGN', 'Flutterwave', '{\"ip\":\"105.112.214.38\",\"lat\":6.3332,\"lon\":5.6238,\"country\":\"Nigeria\",\"usedNetwork\":\"AS36873 Airtel Networks Limited\"}', 1920, 'Failed', '2022-07-26 08:58:07', '2022-07-26 08:58:07'),
(15, '1658841258286', '91849bca-6c5e-4e06-b8a6-27fe3814ac64', 'USD', 'Flutterwave', '{}', 8, 'Failed', '2022-07-26 13:14:56', '2022-07-26 13:14:56');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `serviceID` varchar(255) NOT NULL,
  `serviceProvider` varchar(255) NOT NULL,
  `serviceCategory` varchar(255) NOT NULL,
  `serviceType` varchar(255) NOT NULL COMMENT 'API provider call_ID',
  `providerRate` double NOT NULL COMMENT 'API provider rate',
  `resellRate` double NOT NULL COMMENT 'selling rate',
  `minOrder` int(11) NOT NULL,
  `maxOrder` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `serviceID`, `serviceProvider`, `serviceCategory`, `serviceType`, `providerRate`, `resellRate`, `minOrder`, `maxOrder`, `description`, `updatedAt`, `createdAt`) VALUES
(68, '2534', 'Press Release', '📰 Press Release  Publication & Newspapers', 'Fox Magazine & 40+ Media Outlet Publication [Good For Brand Awarenewss]', 230, 299, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 08:59:08'),
(69, '2746', 'Press Release', '📰 Press Release  Publication & Newspapers', 'Fox Magazine & 30+ Media Outlet Publication', 200, 260, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 08:59:08'),
(70, '2540', 'Press Release', '📰 Press Release  Publication & Newspapers', 'BUSINESS DAY Newspaper Publication', 230, 299, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 08:59:08'),
(71, '2687', 'Press Release', '📰 Press Release  Publication & Newspapers', 'NBC , CBS, FOX + 100 Web News PUBLISHING', 500, 650, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 08:59:08'),
(72, '2533', 'Press Release', '📰 Press Release  Publication & Newspapers', 'Tribune Newspaper Publication', 230, 299, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 08:59:08'),
(73, '2535', 'Press Release', '📰 Press Release  Publication & Newspapers', 'Punch Newspaper Publication', 270, 351, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 08:59:08'),
(74, '2536', 'Press Release', '📰 Press Release  Publication & Newspapers', 'THE NATION Newspaper Publication', 230, 299, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 08:59:08'),
(75, '2537', 'Press Release', '📰 Press Release  Publication & Newspapers', 'VANGUARD Newspaper Publication', 230, 299, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 08:59:08'),
(76, '2539', 'Press Release', '📰 Press Release  Publication & Newspapers', 'SUNRISE Newspaper Publication', 230, 299, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 08:59:08'),
(77, '2538', 'Press Release', '📰 Press Release  Publication & Newspapers', 'GUARDIAN Newspaper Publication', 230, 299, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 08:59:08'),
(78, '2086', 'Traffic', 'Website Traffic', 'Website Traffic Directly (http:yoursite.com)', 2.3, 2.99, 500, 100000, '', '2022-07-20 20:46:02', '2022-05-12 11:15:57'),
(79, '2088', 'Traffic', 'Website Traffic', 'Website Traffic - From [ Fb, IG, Google, Twitter ] Targeted ( South Africa & England  )', 2.5, 3.25, 500, 1000000, '', '2022-07-20 20:46:02', '2022-05-12 11:15:57'),
(80, '2087', 'Traffic', 'Website Traffic', 'Website Traffic - To Fiverr Gigs & Special platforms', 3, 3.9, 500, 1000000, '', '2022-07-20 20:46:02', '2022-05-12 11:15:57'),
(81, '2090', 'Traffic', 'Website Traffic', 'Website Traffic - From [ Fb, IG, Google, Twitter ] Targeted ( Africa )', 3, 3.9, 500, 1000000, '', '2022-07-20 20:46:02', '2022-05-12 11:15:57'),
(82, '2089', 'Traffic', 'Website Traffic', 'Website Traffic - From [ Fb, IG, Google, Twitter ] Targeted ( America & Asia )', 2.5, 3.25, 500, 1000000, '', '2022-07-20 20:46:02', '2022-05-12 11:15:57'),
(83, '2909', 'Google', 'Google Profile Search', 'Entrepreneur Google Profile Search', 600, 780, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 11:22:52'),
(84, '2910', 'Google', 'Google Profile Search', 'Comedians Google Profile Search', 400, 520, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 11:22:52'),
(85, '2911', 'Google', 'Google Profile Search', 'Bloggers Google Profile Search', 450, 585, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 11:22:52'),
(86, '2908', 'Google', 'Google Profile Search', 'Musicians Google profile Serach', 500, 650, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-12 11:22:52'),
(87, '2717', 'Google', 'Google Map Reviews', 'Google Maps Reviews [5* Ratings] [Custom Reviews] [Any Country]', 48.4, 62.92, 10, 10000, '', '2022-07-20 20:46:02', '2022-05-12 11:30:23'),
(88, '2716', 'Google', 'Google Map Reviews', 'Google Maps Reviews [5* Ratings] [Random Reviews] [WW]', 33, 42.9, 10, 10000, '', '2022-07-20 20:46:02', '2022-05-12 11:30:23'),
(89, '2123', 'Google', 'Google Reviews', 'Google Business  Review / Ratings', 200, 260, 10, 100000, '', '2022-07-20 20:46:02', '2022-05-12 11:35:39'),
(90, '2122', 'Google', 'Google Reviews', 'Google Play store custom App Review + Ratings (Read Description))', 1400, 1820, 1, 200, '', '2022-07-20 20:46:02', '2022-05-12 11:35:39'),
(91, '2247', 'LinkedIn', 'Followers', 'LinkedIn Profiles Followers [USA]', 10, 13, 100, 1000, '', '2022-07-20 20:46:02', '2022-05-12 11:45:34'),
(92, '2097', 'LinkedIn', 'LinkedIn Connection', 'LinkedIn Connection', 32, 41.6, 30, 10000000, '', '2022-07-20 20:46:02', '2022-05-12 11:45:34'),
(93, '2248', 'LinkedIn', 'Views', 'LinkedIn - Photo/Video Views', 5.2, 6.76, 500, 5000, '', '2022-07-20 20:46:02', '2022-05-12 11:45:34'),
(94, '3051', 'Discord', 'Discord Friend Requests', 'Discord Friend Requests [30k] [1-6 Hours Start]', 15.299999999999999, 19.89, 100, 30000, '', '2022-07-20 20:46:02', '2022-05-12 12:04:39'),
(95, '3052', 'Discord', 'Discord Friend Requests', 'Discord Friend Request [2K] [No Drop]', 15.299999999999999, 19.89, 1000, 2000, '', '2022-07-20 20:46:02', '2022-05-12 12:04:39'),
(96, '3054', 'Discord', 'Discord Server Member', 'Discord Server Member [Male] [50K] [No Drop]', 16.2, 21.06, 1500, 50000, '', '2022-07-20 20:46:02', '2022-05-12 12:05:47'),
(97, '3053', 'Discord', 'Discord Server Member', 'Discord Server Member [50K] [Non Drop]', 16.2, 21.06, 1500, 50000, '', '2022-07-20 20:46:02', '2022-05-12 12:05:47'),
(98, '3055', 'Discord', 'Discord Server Member', 'Discord Server Member [Female] [50K] [No Drop]', 15.299999999999999, 19.89, 1500, 50000, '', '2022-07-20 20:46:02', '2022-05-12 12:05:48'),
(99, '3056', 'Discord', 'Discord Server Member', 'Discord Server Member [Real] [20K] | [Non Drop]', 16.2, 21.06, 1500, 20000, '', '2022-07-20 20:46:02', '2022-05-12 12:05:48'),
(100, '3064', 'Discord', 'Discord DM', 'Discord Mass DM [Min 50k] [Max 500k]', 41.05728, 53.37, 50000, 500000, '', '2022-07-20 20:46:02', '2022-05-12 12:07:08'),
(101, '3065', 'Discord', 'Discord DM', 'Discord Mass DM [Min 500k] [Max 1M]', 31.93344, 41.51, 500000, 1000000, '', '2022-07-20 20:46:02', '2022-05-12 12:07:08'),
(102, '2439', 'AudioMack', 'AudioMack Stream/Play', 'AudioMack Play + Monthly Listeners [NEW]', 3, 3.9, 10000, 2147483647, '', '2022-07-20 20:46:02', '2022-05-12 12:41:32'),
(103, '2869', 'AudioMack', 'AudioMack Stream/Play', 'Audiomack Stream [Cheapest Ever]', 1, 1.3, 1000, 10000000, '', '2022-07-20 20:46:02', '2022-05-12 12:41:32'),
(104, '2891', 'AudioMack', 'AudioMack Stream/Play', 'Audiomack Stream [Increase Likes + Repost + Comment]', 12, 15.6, 1000, 10000000, '', '2022-07-20 20:46:02', '2022-05-12 12:41:32'),
(105, '2277', 'AudioMack', 'AudioMack Stream/Play', 'Audiomack Celebrity Stream', 3.5, 4.55, 1000, 10000000, '', '2022-07-20 20:46:02', '2022-05-12 12:41:32'),
(106, '2242', 'AudioMack', 'AudioMack Stream/Play', 'AudioMack Stream [Ghana/South Africa', 3.5, 4.55, 1000, 2147483647, '', '2022-07-20 20:46:02', '2022-05-12 12:41:32'),
(107, '2299', 'AudioMack', 'AudioMack Stream/Play', 'Audiomack Stream Indonisia', 3.5, 4.55, 1000, 300000, '', '2022-07-20 20:46:02', '2022-05-12 12:41:32'),
(108, '2298', 'AudioMack', 'AudioMack Stream/Play', 'Audiomack Stream Australia', 3.5, 4.55, 1000, 300000, '', '2022-07-20 20:46:02', '2022-05-12 12:41:32'),
(109, '2297', 'AudioMack', 'AudioMack Stream/Play', 'Audiomack Stream USA', 3.5, 4.55, 2000, 300000, '', '2022-07-20 20:46:02', '2022-05-12 12:41:32'),
(110, '2300', 'AudioMack', 'AudioMack Stream/Play', 'Audiomack Stream India', 3.5, 4.55, 1000, 300000, '', '2022-07-20 20:46:02', '2022-05-12 12:41:32'),
(111, '2993', 'AudioMack', 'AudioMack Stream/Play', 'Audiomack - Plays/Stream | Best Organic', 20, 26, 1000, 1000000, '', '2022-07-20 20:46:02', '2022-05-12 12:41:32'),
(112, '2988', 'AudioMack', 'AudioMack Stream/Play', 'Audiomack Stream [Free Stream % ]', 0.8, 1.04, 5000, 2147483647, '', '2022-07-20 20:46:02', '2022-05-12 12:41:32'),
(113, '2685', 'AudioMack', 'Likes | Followers | Repost', 'Audiomack Organic Followers [New]', 11.700000000000001, 15.21, 100, 3000, '', '2022-07-20 20:46:02', '2022-05-12 12:46:44'),
(114, '2989', 'AudioMack', 'Likes | Followers | Repost', 'Audiomack Likes  [ Fastest Speed ]', 9, 11.7, 100, 3000, '', '2022-07-20 20:46:02', '2022-05-12 12:46:44'),
(115, '2303', 'AudioMack', 'Likes | Followers | Repost', 'AudioMack Follower [Working Great}', 15, 19.5, 100, 50000, '', '2022-07-20 20:46:02', '2022-05-12 12:46:44'),
(116, '2295', 'AudioMack', 'Likes | Followers | Repost', 'AudioMack Likes', 7, 9.1, 100, 50000, '', '2022-07-20 20:46:02', '2022-05-12 12:46:44'),
(117, '2418', 'AudioMack', 'Likes | Followers | Repost', 'AudioMack Reposts - NEW', 9, 11.7, 100, 50000, '', '2022-07-20 20:46:02', '2022-05-12 12:46:44'),
(118, '2686', 'AudioMack', 'Likes | Followers | Repost', 'Audiomack Followers [HQ]', 6.7, 8.71, 1000, 3000, '', '2022-07-20 20:46:02', '2022-05-12 12:46:44'),
(119, '2990', 'AudioMack', 'Likes | Followers | Repost', 'Audiomack - Likes | Best Organic', 20, 26, 100, 3000, '', '2022-07-20 20:46:02', '2022-05-12 12:46:44'),
(120, '2991', 'AudioMack', 'Likes | Followers | Repost', 'Audiomack - Re-up | Best Organic', 20, 26, 100, 3000, '', '2022-07-20 20:46:02', '2022-05-12 12:46:44'),
(121, '2992', 'AudioMack', 'Likes | Followers | Repost', 'Audiomack - Followers | Best Organic', 20, 26, 100, 3000, '', '2022-07-20 20:46:02', '2022-05-12 12:46:44'),
(122, '2860', 'YouTube', 'YouTube Views', 'Youtube Views [Lifetime Refill] [5-10k Per D/S]', 2, 2.6, 200, 500000, '', '2022-07-20 20:46:02', '2022-05-13 08:40:25'),
(123, '3021', 'YouTube', 'YouTube Views', 'Youtube Views [10M] [ Speed 5-10k/Day] [Lifetime Guaranteed]', 2.5, 3.25, 200, 10000000, '', '2022-07-20 20:46:02', '2022-05-13 08:40:25'),
(124, '2501', 'YouTube', 'YouTube Views', 'Youtube Views [10-20K Per Day] [10 Days Refill]', 2, 2.6, 1000, 1000000000, '', '2022-07-20 20:46:02', '2022-05-13 08:40:25'),
(125, '2268', 'YouTube', 'YouTube Views', 'Youtube Views 100% Working Fast [Recommend]', 4.5, 5.85, 1000, 1000009, '', '2022-07-20 20:46:02', '2022-05-13 08:40:25'),
(126, '2893', 'YouTube', 'Youtube Subscribers', 'Youtube Subscirbers [100k] Newly Added [Best] 🔥🔥', 75, 97.5, 100, 50000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:06'),
(127, '2733', 'YouTube', 'Youtube Subscribers', 'Youtube Subscribers [Non Drop] [1000 P/D]', 59.4, 77.22, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:06'),
(128, '2735', 'YouTube', 'Youtube Subscribers', 'YouTube Subscribers [10k] [Bots] Non Refill', 19.272000000000002, 25.05, 50, 20000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:07'),
(129, '2975', 'YouTube', 'Youtube Subscribers', 'Youtube Subscribers [Max 5k] [Speed 200-300/Day] [R30]', 50, 65, 100, 5000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:06'),
(130, '2736', 'YouTube', 'Youtube Subscribers', 'YouTube  Subscribers [Non Drop Real] - [300 Per Day]', 77, 100.1, 100, 50000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:07'),
(131, '2734', 'YouTube', 'Youtube Subscribers', 'Youtube Subscribers [200-300 Per Day]', 48.4, 62.92, 10, 2000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:06'),
(132, '3019', 'YouTube', 'Youtube Subscribers', 'Youtube Subscribers Direct Monetization 💰', 100, 130, 200, 10000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:08'),
(133, '2737', 'YouTube', 'Youtube Subscribers', 'Youtube  Subscribers Real [20 - 30 P/D] LifeTime Refill', 46.199999999999996, 60.06, 10, 50000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:08'),
(134, '2738', 'YouTube', 'Youtube Subscribers', 'Youtube subscribers [50 Per Day] [Lifetime Refill]', 57.024, 74.13, 50, 8000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:08'),
(135, '2739', 'YouTube', 'Youtube Subscribers', 'YouTube Subscribers [No Refill] [Drop Issue]', 11, 14.3, 200, 3000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:08'),
(136, '2740', 'YouTube', 'Youtube Subscribers', 'Youtube Subscribers [4k Max] [ Refill 30 Days] [30-50 P/D] [No Drop]', 50.6, 65.78, 100, 4000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:08'),
(137, '2741', 'YouTube', 'Youtube Subscribers', 'YouTube Subscribers [1k Max] [300 P/D]', 88, 114.4, 10, 1000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:08'),
(138, '2742', 'YouTube', 'Youtube Subscribers', 'Youtube  Subscribers [3k Max] [200/300 P/H] [ Refill 30 Days]', 50.6, 65.78, 100, 3000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:09'),
(139, '2743', 'YouTube', 'Youtube Subscribers', 'YouTube Subscribers [200 P/D] [Non Drop] [R30]', 83.6, 108.68, 100, 1500, '', '2022-07-20 20:46:02', '2022-05-13 09:22:09'),
(140, '2744', 'YouTube', 'Youtube Subscribers', 'Youtube Subscribers  [ Real Account] - Fast Speed {500+ Per Day]', 77, 100.1, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 09:22:09'),
(141, '2745', 'YouTube', 'Youtube Subscribers', 'Youtube Subscribers [Real Subscribers] [50 P/D] [Lifetime Refill]', 56.87, 73.93, 10, 2500, '', '2022-07-20 20:46:02', '2022-05-13 09:22:09'),
(148, '2072', 'YouTube', 'Youtube Likes/Comments/Shares', 'YouTube Custom Comment', 28, 36.4, 10, 10000, '', '2022-07-20 20:46:02', '2022-05-13 09:52:19'),
(149, '2183', 'YouTube', 'Youtube Likes/Comments/Shares', 'YouTube Likes [ Premium  Quality]', 15, 19.5, 100, 50000, '', '2022-07-20 20:46:02', '2022-05-13 09:52:19'),
(150, '2074', 'YouTube', 'Youtube Likes/Comments/Shares', 'YouTube Video Share', 8, 10.4, 1000, 10000, '', '2022-07-20 20:46:02', '2022-05-13 09:52:19'),
(151, '2356', 'YouTube', 'Youtube Likes/Comments/Shares', 'YouTube Likes [Non Drop] Best', 20, 26, 50, 100000, '', '2022-07-20 20:46:02', '2022-05-13 09:52:19'),
(152, '2357', 'YouTube', 'Youtube Likes/Comments/Shares', 'YouTube Likes [Cheap]', 9, 11.7, 50, 100000, '', '2022-07-20 20:46:02', '2022-05-13 09:52:19'),
(153, '2073', 'YouTube', 'Youtube Likes/Comments/Shares', 'YouTube Likes [25days Refill]', 22, 28.6, 50, 100000, '', '2022-07-20 20:46:02', '2022-05-13 09:52:19'),
(154, '3057', 'Twitter', 'Twitter Followers', 'Twitter Followers [Max 5k] [30 Days Refill Cheapest] 🔥', 3.3, 4.29, 50, 5000, '', '2022-07-20 20:46:02', '2022-05-13 10:05:08'),
(155, '3058', 'Twitter', 'Twitter Followers', 'Twitter Followers [Organic & Engaging]', 20, 26, 100, 5000, '', '2022-07-20 20:46:02', '2022-05-13 10:05:08'),
(156, '3059', 'Twitter', 'Twitter Followers', 'Twitter Followers [Organic USers]', 15, 19.5, 100, 5000, '', '2022-07-20 20:46:02', '2022-05-13 10:05:08'),
(157, '2790', 'Twitter', 'Twitter Followers', 'Twitter Followers NEW High Quality [30 Days Refill]', 7.92, 10.3, 100, 1000, '', '2022-07-20 20:46:02', '2022-05-13 10:05:08'),
(158, '2791', 'Twitter', 'Twitter Followers', 'Twitter Followers [60k] [High Speed] [30 Days Refill] 🔥', 12.1, 15.73, 100, 60000, '', '2022-07-20 20:46:02', '2022-05-13 10:05:08'),
(159, '2792', 'Twitter', 'Twitter Followers', 'Twitter Real Followers Women [100k] [30 Days Refill]', 10.516, 13.67, 100, 200000, '', '2022-07-20 20:46:02', '2022-05-13 10:05:08'),
(160, '2793', 'Twitter', 'Twitter Followers', 'Twitter Followers [30 Days Refill ] [1k/day]', 24.2, 31.46, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:05:08'),
(161, '2794', 'Twitter', 'Twitter Followers', 'Twitter Favorites (HQ) {Unlimited} [R30]', 10.824, 14.07, 100, 5000, '', '2022-07-20 20:46:02', '2022-05-13 10:05:08'),
(162, '2795', 'Twitter', 'Twitter Followers', 'Twitter followers [10k] [Refill 30 Days]', 21.511599999999998, 27.97, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:05:08'),
(163, '2796', 'Twitter', 'Twitter Followers', 'Twitter Followers [25k Max] [200 P/D] [R/30]', 6.072, 7.89, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:05:08'),
(164, '2307', 'Twitter', 'Twitter Likes / Views / ReTweet / Share', 'Twitter Likes [Real Users ] HQ', 9, 11.7, 50, 5000, '', '2022-07-20 20:46:02', '2022-05-13 10:25:58'),
(165, '2301', 'Twitter', 'Twitter Likes / Views / ReTweet / Share', 'Twitter Likes [Working Fast]', 5, 6.5, 50, 5000, '', '2022-07-20 20:46:02', '2022-05-13 10:25:58'),
(166, '3000', 'Twitter', 'Twitter Direct Messages', 'Twitter Direct Messages [Min 50k][Max 90k]', 33.75, 43.88, 50000, 90000, '', '2022-07-20 20:46:02', '2022-05-13 10:27:20'),
(167, '3001', 'Twitter', 'Twitter Direct Messages', 'Twitter Direct Messages [Min 500k][ Max 900k]', 28.139999999999997, 36.58, 500000, 900000, '', '2022-07-20 20:46:02', '2022-05-13 10:27:20'),
(168, '3002', 'Twitter', 'Twitter Direct Messages', 'Twitter Direct Messages [Min 1M] [Max 2M]', 25.32, 32.92, 1000000, 1900000, '', '2022-07-20 20:46:02', '2022-05-13 10:27:20'),
(169, '2410', 'TikTok', 'TikTok LIVE', 'Tiktok Live Broadcast Maximum 20K | 60 Minutes', 12.6, 16.38, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:30:31'),
(170, '2412', 'TikTok', 'TikTok LIVE', 'Tiktok Live Broadcast Maximum 20K | 120 Minutes', 21.6, 28.08, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:30:31'),
(171, '2414', 'TikTok', 'TikTok LIVE', 'Tiktok Live Broadcast Maximum 20K | 240 minutes', 39.6, 51.48, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:30:31'),
(172, '2411', 'TikTok', 'TikTok LIVE', 'Tiktok Live Broadcast Maximum 20K | 90 minutes', 18, 23.4, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:30:31'),
(173, '2409', 'TikTok', 'TikTok LIVE', 'Tiktok Live Broadcast Maximum 20K | 30 minutes', 6.3, 8.19, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:30:31'),
(174, '2413', 'TikTok', 'TikTok LIVE', 'Tiktok Live Broadcast Maximum 20K | 180 Minutes', 30.599999999999998, 39.78, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:30:31'),
(175, '3026', 'TikTok', 'TikTok Followers', 'Tiktok Real Followers [200k] [30 Days Refill] ✅', 8.8, 11.44, 100, 200000, '', '2022-07-20 20:46:02', '2022-05-13 10:37:25'),
(176, '3029', 'TikTok', 'TikTok Followers', 'Tik Tok Followers [50k] [Instant] [Real] [30 Days Refill]', 18.8, 24.44, 20, 50000, '', '2022-07-20 20:46:02', '2022-05-13 10:37:25'),
(177, '3030', 'TikTok', 'TikTok Followers', 'Tiktok Real Followers [150k] [15 Days Refill]', 6.4, 8.32, 100, 150000, '', '2022-07-20 20:46:02', '2022-05-13 10:37:25'),
(178, '3032', 'TikTok', 'TikTok Followers', 'TikTok Followers [10k] [Refill 30 Days]', 14.975999999999999, 19.47, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:37:25'),
(179, '3031', 'TikTok', 'TikTok Followers', 'Tik Tok Followers [Bot 10k Per Day]', 14, 18.2, 100, 100000, '', '2022-07-20 20:46:02', '2022-05-13 10:37:25'),
(180, '3027', 'TikTok', 'TikTok Followers', 'Tiktok Followers [High Quality] [50k] [ Best Selling Service] [R30]', 10.56, 13.73, 20, 50000, '', '2022-07-20 20:46:02', '2022-05-13 10:37:25'),
(181, '3033', 'TikTok', 'TikTok Followers', 'Tik Tok Followers [30k]', 14.4, 18.72, 100, 30000, '', '2022-07-20 20:46:02', '2022-05-13 10:37:26'),
(182, '3034', 'TikTok', 'TikTok Followers', 'Tik Tok Followers [20k] [Less Drop]', 11.2, 14.56, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:37:26'),
(183, '3035', 'TikTok', 'TikTok Followers', 'Tik Tok Followers [100k] [Instant] [10k|Per Day]', 25.2, 32.76, 20, 30000, '', '2022-07-20 20:46:02', '2022-05-13 10:37:26'),
(184, '3036', 'TikTok', 'TikTok Followers', 'Tik Tok Followers [Refill 30 Days]', 24, 31.2, 50, 15000, '', '2022-07-20 20:46:02', '2022-05-13 10:37:26'),
(185, '3049', 'TikTok', 'TikTok Followers', 'TikTok Brazil Followers [10k Max] [HQ Profiles] [NR]', 10.56, 13.73, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:37:26'),
(186, '3039', 'TikTok', 'TikTok Likes', 'TikTok Likes [HQ] [12k] [Speed 10k/Day] [ Less Drop ]', 1.84, 2.39, 100, 12000, '', '2022-07-20 20:46:02', '2022-05-13 10:41:54'),
(187, '3038', 'TikTok', 'TikTok Likes', 'TikTok Likes [10k] [10k/Day] [Non Drop] [30 Days Refill]', 1.88, 2.44, 110, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:41:54'),
(188, '3041', 'TikTok', 'TikTok Likes', 'Tik Tok Likes [100k] [Instant]', 24, 31.2, 100, 100000, '', '2022-07-20 20:46:02', '2022-05-13 10:41:54'),
(189, '3040', 'TikTok', 'TikTok Likes', 'Tiktok Likes [50k] [HQ] [30 Days Refill] Instant 🔥', 10.56, 13.73, 20, 50000, '', '2022-07-20 20:46:02', '2022-05-13 10:41:54'),
(190, '3042', 'TikTok', 'TikTok Likes', 'TikTok Likes [Real] [Instant] [Quantity Multiple of 100]', 4, 5.2, 10, 50000, '', '2022-07-20 20:46:02', '2022-05-13 10:41:54'),
(191, '3043', 'TikTok', 'TikTok Likes', 'TikTok Likes [10k] [ 30 Days Refill]', 8.2944, 10.78, 25, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:41:54'),
(192, '3044', 'TikTok', 'TikTok Likes', 'TikTok Likes [1k ] [HQ] [R30]', 2.2239999999999998, 2.89, 10, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:41:54'),
(193, '3045', 'TikTok', 'TikTok Likes', 'TikTok Likes [30K] [R60] [10k/d]', 32, 41.6, 100, 30000, '', '2022-07-20 20:46:02', '2022-05-13 10:41:54'),
(194, '3046', 'TikTok', 'TikTok Likes', 'TikTok Likes [50k] [HQ] [500/day]', 2.016, 2.62, 10, 100000, '', '2022-07-20 20:46:02', '2022-05-13 10:41:54'),
(195, '3047', 'TikTok', 'TikTok Likes', 'Tiktok Likes [10k] [3-4k Per Day]', 4.8, 6.24, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:41:54'),
(196, '3050', 'TikTok', 'TikTok Likes', 'TikTok Real Likes Brazil [10k Max] NR', 6.32, 8.22, 50, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:41:54'),
(197, '2078', 'Facebook', 'Facebook Page Likes', 'Facebook Page Likes [Fast]', 10, 13, 500, 50000, '', '2022-07-20 20:46:02', '2022-05-13 10:44:27'),
(198, '2184', 'Facebook', 'Facebook Page Likes', 'Facebook Page likes [Auto Refill] Non Drop', 13, 16.9, 500, 50000, '', '2022-07-20 20:46:02', '2022-05-13 10:44:27'),
(199, '2185', 'Facebook', 'Facebook Page Likes', 'Facebook Page likes [1k - 5k Daily] Quality', 11, 14.3, 500, 50000, '', '2022-07-20 20:46:02', '2022-05-13 10:44:27'),
(200, '2186', 'Facebook', 'Facebook Page Likes', 'Facebook Page likes [No Refill]', 5.5, 7.15, 500, 50000, '', '2022-07-20 20:46:02', '2022-05-13 10:44:27'),
(201, '2366', 'Facebook', 'Facebook Page Likes', 'Facebook Page likes [25Days Auto Refill] [Real User]', 6.2, 8.06, 500, 70000, '', '2022-07-20 20:46:02', '2022-05-13 10:44:27'),
(202, '2133', 'Facebook', 'Facebook Followers/Friends', 'Facebook Premium Profile Followers', 8, 10.4, 200, 3000, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(203, '2660', 'Facebook', 'Facebook Followers/Friends', 'Facebook Profile Followers [Refill 30 Days]', 9.4, 12.22, 100, 3000, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(204, '2661', 'Facebook', 'Facebook Followers/Friends', 'Facebook Real Page Likes [10k Per Day Speed] [30 Days Refill]', 7.08, 9.2, 100, 250000, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(205, '2662', 'Facebook', 'Facebook Followers/Friends', 'Facebook Profile Followers', 7, 9.1, 30, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(206, '2663', 'Facebook', 'Facebook Followers/Friends', 'FB Profile Followers (Worldwide)', 6.6, 8.58, 30, 3000, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(207, '2664', 'Facebook', 'Facebook Followers/Friends', 'Facebook Profile Followers [100k]  [500/day]', 1.4400000000000002, 1.87, 100, 100000, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(208, '2665', 'Facebook', 'Facebook Followers/Friends', 'FB Profile Followers (Indian)', 6.720000000000001, 8.74, 50, 100, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(209, '2666', 'Facebook', 'Facebook Followers/Friends', 'Facebook Page Followers [ 30 days refill ]', 7.9, 10.27, 100, 50000, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(210, '2667', 'Facebook', 'Facebook Followers/Friends', 'Facebook Profile Followers (Refill 30D)', 5.8999999999999995, 7.67, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(211, '2668', 'Facebook', 'Facebook Followers/Friends', 'FB Profile Followers (Bangladesh)', 6.720000000000001, 8.74, 50, 100, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(212, '2669', 'Facebook', 'Facebook Followers/Friends', 'FB Profile Followers (Indonesian)', 6.720000000000001, 8.74, 50, 100, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(213, '2670', 'Facebook', 'Facebook Followers/Friends', 'FB Profile Followers (Philippines)', 6.720000000000001, 8.74, 50, 100, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(214, '2671', 'Facebook', 'Facebook Followers/Friends', 'FB Profile Followers (Vietnam)', 6.720000000000001, 8.74, 50, 100, '', '2022-07-20 20:46:02', '2022-05-13 10:46:44'),
(215, '2913', 'Facebook', 'Facebook Comment Reaction', 'Facebook Comment React [CARE] (50/20k)', 6.864, 8.92, 50, 20000, '', '2022-07-20 20:46:02', '2022-05-13 10:51:13'),
(216, '2914', 'Facebook', 'Facebook Comment Reaction', 'Facebook Comment React [HAHA] (50/20k)', 6.864, 8.92, 50, 20000, '', '2022-07-20 20:46:02', '2022-05-13 10:51:13'),
(217, '2912', 'Facebook', 'Facebook Comment Reaction', 'Facebook Comment React [LOVE] (50/20k)', 6.864, 8.92, 50, 20000, '', '2022-07-20 20:46:02', '2022-05-13 10:51:13'),
(218, '2915', 'Facebook', 'Facebook Comment Reaction', 'Facebook Comment React [WOW] (50/20k)', 6.864, 8.92, 50, 20000, '', '2022-07-20 20:46:02', '2022-05-13 10:51:13'),
(219, '2916', 'Facebook', 'Facebook Comment Reaction', 'Facebook Comment Likes [20k] [Superfast]', 6.842, 8.89, 50, 20000, '', '2022-07-20 20:46:02', '2022-05-13 10:51:13'),
(220, '2917', 'Facebook', 'Facebook Comment Reaction', 'Facebook Comment React [SAD] (50/20k)', 6.864, 8.92, 50, 20000, '', '2022-07-20 20:46:02', '2022-05-13 10:51:13'),
(221, '2918', 'Facebook', 'Facebook Comment Reaction', 'Facebook Comment Likes [100k] [WorldWide]', 4.7894, 6.23, 100, 100000, '', '2022-07-20 20:46:02', '2022-05-13 10:51:13'),
(222, '2919', 'Facebook', 'Facebook Comment Reaction', 'Facebook Comment React [ANGRY] (50/20k)', 6.9432, 9.03, 50, 20000, '', '2022-07-20 20:46:02', '2022-05-13 10:51:13'),
(223, '2080', 'Facebook', 'Facebook Post Likes', 'Facebook Post Likes', 4.4, 5.72, 100, 10000000, '', '2022-07-20 20:46:02', '2022-05-13 10:53:59'),
(224, '2270', 'Facebook', 'Facebook Post Likes', 'FaceBook Post Likes [FASTEST] [Instant]', 4, 5.2, 100, 1000, '', '2022-07-20 20:46:02', '2022-05-13 10:53:59'),
(225, '2217', 'Facebook', 'Facebook Post Likes', 'Facebook Photo/Post Likes [Instant] Real Users', 5, 6.5, 100, 1000, '', '2022-07-20 20:46:02', '2022-05-13 10:53:59'),
(226, '2216', 'Facebook', 'Facebook Post Likes', 'Facebook Post Likes INSTANT [20day Refill]', 3.5, 4.55, 100, 1000, '', '2022-07-20 20:46:02', '2022-05-13 10:53:59'),
(227, '2081', 'Facebook', 'Facebook Post Likes', 'Facebook Live Video Views Stream', 30, 39, 100, 1000, '', '2022-07-20 20:46:02', '2022-05-13 10:53:59'),
(228, '2218', 'Facebook', 'Facebook Post Likes', 'Facebook post Likes [Real User]', 4.5, 5.85, 100, 1000, '', '2022-07-20 20:46:02', '2022-05-13 10:53:59'),
(229, '2976', 'Facebook', 'Facebook Post Likes', 'Facebook Post Likes [10k] [Speed 1k/Day] [Less Drop]', 1.26, 1.64, 150, 100000, '', '2022-07-20 20:46:02', '2022-05-13 10:54:00'),
(230, '2977', 'Facebook', 'Facebook Post Likes', 'Facebook Post Likes [50k] [20k Per Day Speed]', 3.801, 4.94, 50, 50000, '', '2022-07-20 20:46:02', '2022-05-13 10:54:00'),
(231, '2978', 'Facebook', 'Facebook Post Likes', 'Facebook Post Likes [Max 1k] [Speed 1k/Hr] NR', 1.5150000000000001, 1.97, 50, 1000, '', '2022-07-20 20:46:02', '2022-05-13 10:54:00'),
(232, '2973', 'Facebook', 'Facebook Group Members', 'Facebook Group Members Real [10k] [30 Days Refill]', 12.42, 16.15, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 11:00:17'),
(233, '2972', 'Facebook', 'Facebook Group Members', 'Facebook Group Members [200k] [Non Refill', 5.796, 7.53, 1000, 200000, '', '2022-07-20 20:46:02', '2022-05-13 11:00:17'),
(234, '2974', 'Facebook', 'Facebook Group Members', 'Facebook Group Members INDIAN [10k] [No Refill]', 11.04, 14.35, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 11:00:17'),
(235, '2079', 'Facebook', 'Facebook Video Viewers', 'Facebook Video VIews', 2.5, 3.25, 1000, 10000000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(236, '2936', 'Facebook', 'Facebook Video Viewers', 'Facebook Video Views [100-500/day]', 0.1188, 0.15, 100, 1000000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(237, '2938', 'Facebook', 'Facebook Video Viewers', 'Facebook Video Views [Retention 1Minute] [300k P/D]', 0.3168, 0.41, 100, 1000000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(238, '2935', 'Facebook', 'Facebook Video Viewers', 'Facebook Video Views [1k Per Day Speed] [Multiple of 1000 Only]', 0.8140000000000001, 1.06, 5000, 1000000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(239, '2939', 'Facebook', 'Facebook Video Viewers', 'Facebook Video Views [Full Retention}', 0.528, 0.69, 100, 1000000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(240, '2937', 'Facebook', 'Facebook Video Viewers', 'Facebook Video Views [Instant]', 0.22440000000000002, 0.29, 100, 1000000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(241, '2940', 'Facebook', 'Facebook Video Viewers', 'Facebook Video Views [Speed 20k-50k] [Instant Start]', 2.1648, 2.81, 500, 5000000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(242, '2941', 'Facebook', 'Facebook Video Viewers', 'Facebook Live Stream Views [30 Minute]', 4.4, 5.72, 50, 1000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(243, '2942', 'Facebook', 'Facebook Video Viewers', 'Facebook Live Stream Views [60 Minute]', 9.24, 12.01, 50, 1000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(244, '2943', 'Facebook', 'Facebook Video Viewers', 'Facebook Live Stream Views [90 Minute]', 13.639999999999999, 17.73, 50, 1000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(245, '2944', 'Facebook', 'Facebook Video Viewers', 'Facebook Live Stream Views [120 Minute]', 18.04, 23.45, 50, 1000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(246, '2945', 'Facebook', 'Facebook Video Viewers', 'Facebook Live Stream Views [150 Minute]', 22.44, 29.17, 50, 1000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(247, '2946', 'Facebook', 'Facebook Video Viewers', 'Facebook Live Stream Views [180 Minute]', 27.279999999999998, 35.46, 50, 1000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(248, '2947', 'Facebook', 'Facebook Video Viewers', 'Facebook Live Stream Views [210 Minute]', 31.46, 40.9, 50, 1000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(249, '2948', 'Facebook', 'Facebook Video Viewers', 'Facebook Live Stream Views [240 Minute]', 36.96, 48.05, 50, 1000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(250, '2949', 'Facebook', 'Facebook Video Viewers', 'Facebook Live Stream Views [270 Minute]', 41.58, 54.05, 50, 1000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(251, '2950', 'Facebook', 'Facebook Video Viewers', 'Facebook Live Stream Views [300 Minute]', 46.199999999999996, 60.06, 50, 1000, '', '2022-07-20 20:46:02', '2022-05-13 11:03:26'),
(252, '2027', 'Facebook', 'Facebook Page Rating', 'Fb Page Star Rating', 130, 169, 50, 10000, '', '2022-07-20 20:46:02', '2022-05-13 11:08:01'),
(253, '2016', 'Facebook', 'Facebook Event', 'Facebook Event | Going | Female', 30, 39, 50, 500, '', '2022-07-20 20:46:02', '2022-05-13 11:09:03'),
(254, '2246', 'Instagram', 'Instagram Followers [Targeted Country]', 'Instagram Followers [ASIA] [15 Days Refill]', 17, 22.1, 100, 300000, '', '2022-07-20 20:46:02', '2022-05-13 11:16:00'),
(255, '2233', 'Instagram', 'Instagram Followers [Targeted Country]', 'Instagram Followers (South Africa] [ 15 Days Refill]', 18, 23.4, 1000, 300000, '', '2022-07-20 20:46:02', '2022-05-13 11:16:00'),
(256, '2234', 'Instagram', 'Instagram Followers [Targeted Country]', 'Instagram Followers Real [ AUSTRALIA] [ 15 DAYS REFILL]', 13.5, 17.55, 100, 300000, '', '2022-07-20 20:46:02', '2022-05-13 11:16:00'),
(257, '2291', 'Instagram', 'Instagram Followers [Targeted Country]', 'Instagram Followers [Iran] [15 Days Refill]', 6, 7.8, 100, 50000, '', '2022-07-20 20:46:02', '2022-05-13 11:16:00'),
(258, '2292', 'Instagram', 'Instagram Followers [Targeted Country]', 'Instagram Followers [Brazil]', 15, 19.5, 100, 15000, '', '2022-07-20 20:46:02', '2022-05-13 11:16:00'),
(259, '2293', 'Instagram', 'Instagram Followers [Targeted Country]', 'Instagram Followers [Arab] [20 Days Refill]', 6, 7.8, 50, 20000, '', '2022-07-20 20:46:02', '2022-05-13 11:16:00'),
(260, '2341', 'Instagram', 'Instagram Followers [Targeted Country]', 'Instagram Followers [India]', 8, 10.4, 100, 150000, '', '2022-07-20 20:46:02', '2022-05-13 11:16:00'),
(261, '2035', 'Instagram', 'Instagram Followers [Targeted Country]', 'Instagram Followers USA [15 DAYS REFILL] BEST', 11, 14.3, 1000, 100000, '', '2022-07-20 20:46:02', '2022-05-13 11:16:00'),
(262, '2364', 'Instagram', 'Instagram Followers', 'Instagram Follower  [Working Good]', 8, 10.4, 100, 300000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:09'),
(263, '2406', 'Instagram', 'Instagram Followers', 'Instagram Followers + Engagement [Less Drop]', 4, 5.2, 100, 100000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:09'),
(264, '2511', 'Instagram', 'Instagram Followers', 'Instagram Followers [30-50k P/D] [Real Mixed]', 2.8, 3.64, 20, 500000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:09'),
(265, '2259', 'Instagram', 'Instagram Followers', 'IG Followers For Influencer & Top Brand Followers', 25, 32.5, 100, 300000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:09'),
(266, '2369', 'Instagram', 'Instagram Followers', 'Instagram Followers [ Fast Working]', 1.8, 2.34, 100, 3000000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:09'),
(267, '2368', 'Instagram', 'Instagram Followers', 'Instagram Followers [Fastest 20k Per Day]', 6.890000000000001, 8.96, 100, 300000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:09'),
(268, '2789', 'Instagram', 'Instagram Followers', 'INSTAGRAM FOLLOWERS [FOREVER NEVER DROP] + Engagement', 20, 26, 1000, 2000000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:09'),
(269, '2373', 'Instagram', 'Instagram Followers', 'Instagram Followers [Cheapest Less Drop]', 2, 2.6, 20, 100000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:10'),
(270, '2370', 'Instagram', 'Instagram Followers', 'Instagram Followers [3k speed Daily] HQ', 1.59, 2.07, 50, 100000000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:10'),
(271, '2367', 'Instagram', 'Instagram Followers', 'Instagram Followers [Random] 2Days Refill', 1.1900000000000002, 1.55, 100, 3000000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:10'),
(272, '2254', 'Instagram', 'Instagram Followers', 'Instagram Followers [20Days Refill] New', 2.8, 3.64, 100, 50000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:10'),
(273, '2363', 'Instagram', 'Instagram Followers', 'Instagram Followers [New Active Users [7 Days Refill]', 4.5, 5.85, 100, 700000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:10'),
(274, '2257', 'Instagram', 'Instagram Followers', 'Instagram Followers [HQ] No Refill', 1.5, 1.95, 200, 100000, '', '2022-07-20 20:46:02', '2022-05-13 12:13:11'),
(275, '2445', 'Instagram', 'Instagram Likes', 'Instagram Likes [Non Drop] [5k Per Hour]', 4.165, 5.41, 50, 20000, '', '2022-07-20 20:46:02', '2022-05-13 12:39:39'),
(276, '3062', 'Instagram', 'Instagram Likes', 'Instagram Likes [400k] [Speed 300-500/Hour] [Non Drop', 0.54, 0.7, 10, 400000, '', '2022-07-20 20:46:02', '2022-05-13 12:39:39'),
(277, '2444', 'Instagram', 'Instagram Likes', 'Instagram Likes [Real Likes] [1k Per Hour]', 2.2950000000000004, 2.98, 20, 10000, '', '2022-07-20 20:46:02', '2022-05-13 12:39:39'),
(278, '2437', 'Instagram', 'Instagram Likes', 'Instagram Likes [Real Audience]', 1.8567, 2.41, 50, 10000, '', '2022-07-20 20:46:02', '2022-05-13 12:39:39'),
(279, '2592', 'Instagram', 'Instagram Likes', 'Instagram Real Likes [50k Per Hour] New', 2.3, 2.99, 100, 100000, '', '2022-07-20 20:46:02', '2022-05-13 12:39:39'),
(280, '2573', 'Instagram', 'Instagram Likes', 'Instagram Likes/Impressions [10k] [Less Drop]', 0.4, 0.52, 10, 10000, '', '2022-07-20 20:46:02', '2022-05-13 12:39:39'),
(281, '2510', 'Instagram', 'Instagram Likes', 'Instagram Real Likes Non Drop [1-2K Per Hour]', 1, 1.3, 50, 3000, '', '2022-07-20 20:46:02', '2022-05-13 12:39:40'),
(282, '2436', 'Instagram', 'Instagram Likes', 'Instagram Likes [Active User] Fast', 0.9909999999999999, 1.29, 100, 50000, '', '2022-07-20 20:46:02', '2022-05-13 12:39:40'),
(283, '2192', 'Instagram', 'Instagram Likes', 'Instagram Likes [Non Drop] [ 1 Year REFILL]', 4, 5.2, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 12:39:40'),
(284, '2489', 'Instagram', 'Instagram Likes', 'Instagram Real Likes [5k] [1k Per Hour]', 0.48000000000000004, 0.62, 50, 5000, '', '2022-07-20 20:46:02', '2022-05-13 12:39:40'),
(285, '2232', 'Instagram', 'Instagram Likes', 'Instagram Likes [Non Drop] [ 365 Days REFILL]', 3.09, 4.02, 100, 10000, '', '2022-07-20 20:46:02', '2022-05-13 12:39:40'),
(286, '2499', 'Instagram', 'Instagram Likes', 'Instagram Real Indian Likes [10k]', 0.57, 0.74, 100, 500000, '', '2022-07-20 20:46:02', '2022-05-13 12:39:40'),
(287, '2576', 'Instagram', 'Instagram Post Save', 'Instagram Real Save [15k]', 0.015400000000000002, 0.02, 100, 15000, '', '2022-07-20 20:46:02', '2022-05-13 12:41:48'),
(288, '2575', 'Instagram', 'Instagram Post Save', 'Instagram Saves [Post,Reel,Igtv] [5k]', 0.0176, 0.02, 20, 5000, '', '2022-07-20 20:46:02', '2022-05-13 12:41:48'),
(289, '2574', 'Instagram', 'Instagram Post Save', 'Instagram Saves {Max : 15k}', 0.8932, 1.16, 100, 15000, '', '2022-07-20 20:46:02', '2022-05-13 12:41:48'),
(290, '2577', 'Instagram', 'Instagram Post Save', 'Instagram Real Saves [Super Instant]', 0.0132, 0.02, 10, 10000, '', '2022-07-20 20:46:02', '2022-05-13 12:41:48'),
(291, '2498', 'Instagram', 'Instagram Views', 'Instagram Reel Views [100k P/D Speed] [Instant Start]', 0.060000000000000005, 0.08, 100, 1000000, '', '2022-07-20 20:46:02', '2022-05-13 12:48:03'),
(292, '2803', 'Instagram', 'Instagram Views', 'Instagram Reels Views [1M] Cheapest In Market 🔥', 0.7, 0.91, 100, 1000000, '', '2022-07-20 20:46:02', '2022-05-13 12:48:03'),
(293, '2168', 'Instagram', 'Instagram Views', 'Instagram Reel Views [100-200k P/Day] Instant ]', 0.9, 1.17, 500, 1000000, '', '2022-07-20 20:46:02', '2022-05-13 12:48:03'),
(294, '2781', 'Instagram', 'Instagram Views', 'Instagram Views [Emergency] [Instant]', 1.14, 1.48, 500, 5000000, '', '2022-07-20 20:46:02', '2022-05-13 12:48:03'),
(295, '2778', 'Instagram', 'Instagram Views', 'Instagram Views [Max 1m] Working Excellent', 0.95, 1.24, 500, 10000000, '', '2022-07-20 20:46:02', '2022-05-13 12:48:03'),
(296, '2861', 'Instagram', 'Instagram Views', 'Instagram Views [Max 1m] [Reel/Igtv]', 0.5, 0.65, 100, 1000000, '', '2022-07-20 20:46:02', '2022-05-13 12:48:03'),
(297, '2782', 'Instagram', 'Instagram Views', 'Instagram Reels Views', 1.5, 1.95, 100, 50000000, '', '2022-07-20 20:46:02', '2022-05-13 12:48:04'),
(298, '2783', 'Instagram', 'Instagram Views', 'Instagram Views + Reels + TV [INSTANT]', 1, 1.3, 100, 5000000, '', '2022-07-20 20:46:02', '2022-05-13 12:48:04'),
(299, '2311', 'Instagram', 'Instagram Views', 'Instagram Views [Fastest Working]', 1.2, 1.56, 500, 10000000, '', '2022-07-20 20:46:02', '2022-05-13 12:48:04'),
(300, '2021', 'Instagram', 'Instagram Views', 'Story Views [Instant]', 1, 1.3, 500, 30000, '', '2022-07-20 20:46:02', '2022-05-13 12:48:04'),
(301, '2582', 'Instagram', '@ Instagram Mention', 'Instagram Mentions  [Enter Username] [Enter Post Link]', 8.968, 11.66, 1000, 5000, '', '2022-07-20 20:46:02', '2022-05-13 12:51:49'),
(302, '2584', 'Instagram', '@ Instagram Mention', 'Instagram Mention [ Bulk ] User Followers (16k/100k)', 3.042, 3.95, 16000, 100000, '', '2022-07-20 20:46:02', '2022-05-13 12:51:49'),
(303, '2586', 'Instagram', '@ Instagram Mention', 'Instagram Mention User Followers (10k/100k)', 3.594, 4.67, 10000, 100000, '', '2022-07-20 20:46:02', '2022-05-13 12:51:49'),
(304, '2583', 'Instagram', '@ Instagram Mention', 'Instagram Mentions  [Enter Username] [Enter Reel Link]', 8.968, 11.66, 1000, 5000, '', '2022-07-20 20:46:02', '2022-05-13 12:51:49'),
(305, '2581', 'Instagram', '@ Instagram Mention', 'Instagram Mentions  [Enter list of Usernames] [Enter Post Link]', 9.358, 12.17, 1000, 5000, '', '2022-07-20 20:46:02', '2022-05-13 12:51:49'),
(306, '2585', 'Instagram', '@ Instagram Mention', 'Instagram Mention [ Bulk ] Custom Users (16k/100k)', 3.042, 3.95, 16000, 100000, '', '2022-07-20 20:46:02', '2022-05-13 12:51:49'),
(307, '2587', 'Instagram', '@ Instagram Mention', 'Instagram  Mention Custom users (2k/100k)', 3.594, 4.67, 2000, 100000, '', '2022-07-20 20:46:02', '2022-05-13 12:51:49'),
(308, '3023', 'Instagram', 'Instagram Comment', 'Instagram Random Comments [HQ]  Max 50K Superfast', 4.62, 6.01, 10, 1000000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(309, '2038', 'Instagram', 'Instagram Comment', 'Instagram Comment (Positive Comment)', 38, 49.4, 20, 1000000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(310, '2371', 'Instagram', 'Instagram Comment', 'Instagram Comment [From 1m+ Followers Account]', 3, 3.9, 1000, 1000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(311, '2572', 'Instagram', 'Instagram Comment', 'Instagram Comments [RANDOM] [20/5k]', 8.200000000000001, 10.66, 20, 500000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(312, '2249', 'Instagram', 'Instagram Comment', 'Instagram Real Comment [FAST & Recommended]', 90, 117, 10, 100000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(313, '3024', 'Instagram', 'Instagram Comment', 'Instagram Custom Comments HQ Real Fast', 3.57, 4.64, 10, 50000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(314, '2039', 'Instagram', 'Instagram Comment', 'Instagram - Custom Comments [Mix People]', 35, 45.5, 10, 100000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(315, '2229', 'Instagram', 'Instagram Comment', 'Instagram Random Fast Comment', 30, 39, 10, 300000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(316, '2593', 'Instagram', 'Instagram Comment', 'Instagram Comments [RANDOM] [5k]', 9.216000000000001, 11.98, 20, 500000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(317, '2594', 'Instagram', 'Instagram Comment', 'Instagram Real Comments [Real Users] [20/5k]', 15, 19.5, 20, 5000000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(318, '2230', 'Instagram', 'Instagram Comment', 'Instagram Comment [Real users]', 50, 65, 10, 10000000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(319, '2595', 'Instagram', 'Instagram Comment', 'Instagram Comments [RANDOM] [Emojies]', 9.216000000000001, 11.98, 10, 5000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(320, '2596', 'Instagram', 'Instagram Comment', 'Instagram Comments [RANDOM] [20/100] [Emojies]', 9.216000000000001, 11.98, 20, 5000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(321, '2597', 'Instagram', 'Instagram Comment', 'Instagram Comments [Custom] [5k]', 9.216000000000001, 11.98, 20, 5000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(322, '2598', 'Instagram', 'Instagram Comment', 'Instagram Comments [Custom] [20/5k]', 9.216000000000001, 11.98, 20, 5000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(323, '2863', 'Instagram', 'Instagram Comment', 'Instagram Random Comments [HQ]  Max 50K Superfast', 2.904, 3.78, 10, 1000000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(324, '2864', 'Instagram', 'Instagram Comment', 'Instagram Custom Comments HQ Real Fast', 2.2439999999999998, 2.92, 10, 50000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(325, '2865', 'Instagram', 'Instagram Comment', 'Instagram Custom Comments [Mixed] [Real]', 33, 42.9, 10, 2000000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(326, '3022', 'Instagram', 'Instagram Comment', 'Instagram Random USA [Random]', 115.5, 150.15, 10, 50000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(327, '3025', 'Instagram', 'Instagram Comment', 'Instagram Comments Likes [25k] [R30 Days', 4.5360000000000005, 5.9, 10, 50000, '', '2022-07-20 20:46:02', '2022-05-13 12:53:36'),
(328, '2241', 'Instagram', 'Instagram Live Viewers', 'Instagram Live Viewers For 60 Minutes [Comment + Likes Included]', 18, 23.4, 100, 20000, '', '2022-07-20 20:46:02', '2022-05-13 12:56:42'),
(329, '2240', 'Instagram', 'Instagram Live Viewers', 'Instagram Live Viewes [For 0 - 30 minutes][Comment + Likes Included]', 16, 20.8, 50, 20000, '', '2022-07-20 20:46:02', '2022-05-13 12:56:42'),
(330, '2239', 'Instagram', 'Instagram Live Viewers', 'Instagram Live Viewers For [ 0 - 3hrs ][Comment + Likes Included]', 22, 28.6, 50, 2000, '', '2022-07-20 20:46:02', '2022-05-13 12:56:42'),
(335, '3103', 'YouTube', 'Youtube Subscribers', 'YouTube Subscribers [Organic + Engaging Audience', 205, 266.5, 400, 3000, '', '2022-07-20 20:46:02', '2022-07-10 03:15:52'),
(339, '2420', 'Press Release', '📰 Press Release  Publication & Newspapers', 'Instagram Likes [Non Drop] [5k Per Hour]', 18, 23.4, 50, 20000, '', '2022-07-20 20:46:02', '2022-07-12 11:28:35');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `ticketID` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `attachedFile` text NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `isRead` int(1) NOT NULL DEFAULT 0,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_messages`
--

CREATE TABLE `ticket_messages` (
  `id` int(11) NOT NULL,
  `userID` varchar(255) NOT NULL,
  `ticketID` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `attachedFile` text DEFAULT NULL COMMENT 'link to the file',
  `adminRead` int(1) NOT NULL DEFAULT 0,
  `userRead` int(1) NOT NULL DEFAULT 0,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userID` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `name` varchar(40) NOT NULL,
  `username` varchar(40) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneNumber` bigint(20) NOT NULL,
  `balance` double NOT NULL DEFAULT 0,
  `apiKey` varchar(255) NOT NULL,
  `ipHistory` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'active:1 blocked:0',
  `webSiteLink` varchar(150) DEFAULT NULL,
  `facebookLink` varchar(150) DEFAULT NULL,
  `instagramLink` varchar(150) DEFAULT NULL,
  `twitterLink` varchar(150) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userID`, `role`, `name`, `username`, `email`, `phoneNumber`, `balance`, `apiKey`, `ipHistory`, `country`, `status`, `webSiteLink`, `facebookLink`, `instagramLink`, `twitterLink`, `password`, `updatedAt`, `createdAt`) VALUES
(21, '82b8644b-1f7d-40e3-a6c4-5ae0dfb3583d', 'admin', 'Sunday Etom', 'white', 'sundaywht@gmail.com', 2348108786933, 0, 'l41pnixxluznw06s3w', '105.112.212.36', 'Nigeria', 1, 'sunday.rf.gd', NULL, NULL, NULL, '$2a$12$.RqfZqEBjW9dCOuadpWYOOeR1FzZGwy1AVbZ9OBJZ32eY5p4hFF92', '2022-07-30 06:29:22', '2022-05-23 10:20:21'),
(24, '2687861b-6892-45cd-8183-2109860a1e35', 'reseller', 'Tesa Media', 'reseller', 'reseller@mail.com', 2348108786933, 0, 'l614s5im0vjquz7lssn', '', '', 1, NULL, NULL, NULL, NULL, '$2a$12$Pd1IgNMh7yHRCD.z9rqoyuTuLW5X.n7VMS9Sv20EDKuOBh.hjjq26', '2022-07-25 19:21:48', '2022-07-25 19:17:18'),
(25, '91849bca-6c5e-4e06-b8a6-27fe3814ac64', 'moderator', 'affliate', 'affliate', 'affliate@mail.com', 2348108786933, 0, 'l614todl0zgar5h5ft2c', '', '', 1, NULL, NULL, NULL, NULL, '$2a$12$pd6Yp6AZDBkpC/F8g.FUxeKVu2RfTKCDIPbyiLhv8Dd8am364e8/W', '2022-07-26 10:00:41', '2022-07-25 19:18:29'),
(26, 'bece4c0b-1889-46fe-b247-021aefca9021', 'admin', 'Clifford', 'Clifford', 'cliffordetuk@gmail.com', 2348108786933, 0, 'l614utcvyada3o01he', '', '', 1, NULL, NULL, NULL, NULL, '$2a$12$efk2dj8UlwzQErl4Ghaf2OFH1elDsMMKaL.Y9S4j0jtTUzt2kz5pq', '2022-07-29 16:41:56', '2022-07-25 19:19:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `API_Provider`
--
ALTER TABLE `API_Provider`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `APIproviderID` (`APIproviderID`);

--
-- Indexes for table `general_news`
--
ALTER TABLE `general_news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `general_options`
--
ALTER TABLE `general_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orderID` (`orderID`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `paymentMethodID` (`paymentMethodID`);

--
-- Indexes for table `payment_transactions`
--
ALTER TABLE `payment_transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `paymentTransactionID` (`transactionID`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `serviceID` (`serviceID`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ticketID` (`ticketID`);

--
-- Indexes for table `ticket_messages`
--
ALTER TABLE `ticket_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userID` (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `API_Provider`
--
ALTER TABLE `API_Provider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `general_news`
--
ALTER TABLE `general_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `general_options`
--
ALTER TABLE `general_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_transactions`
--
ALTER TABLE `payment_transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=340;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `ticket_messages`
--
ALTER TABLE `ticket_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
