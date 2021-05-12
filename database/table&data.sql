-- use awakecup database
DROP DATABASE IF EXISTS awakecup;
CREATE DATABASE awakecup;
USE `awakecup`;

--
-- Create tables
-- 

-- administrative_division table
DROP TABLE IF EXISTS `administrative_division`;
CREATE TABLE `administrative_division` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `FatherID` INT,
    `Name` VARCHAR(32) NOT NULL,
    `Type` VARCHAR(32) NOT NULL,
    `Level` VARCHAR(32) NOT NULL,
    PRIMARY KEY (`ID`)
);

-- category table
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `CategoryTitle` VARCHAR(32) NOT NULL UNIQUE,
    PRIMARY KEY (`ID`)
);

-- order_status table
DROP TABLE IF EXISTS `order_status`;
CREATE TABLE `order_status` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Status` VARCHAR(32) NOT NULL UNIQUE,
    PRIMARY KEY (`ID`)
);

-- account table
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(32) NOT NULL UNIQUE,
    `Password` BINARY(20) NOT NULL,    
    `Role` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- product table
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Code` VARCHAR(8) NOT NULL,
    `ProductTitle` VARCHAR(256) NOT NULL,
    `Description` VARCHAR(1024) NOT NULL DEFAULT 'No Description',
    `CategoryID` INT NOT NULL,
    `Price` INT NOT NULL,
    `ImageURL` VARCHAR(256) NOT NULL DEFAULT 'default.png',
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- order table
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Firstname` VARCHAR(32) NOT NULL,
    `Lastname` VARCHAR(32) NOT NULL,
    `StatusID` INT NOT NULL,
    `Phone` VARCHAR(16) NOT NULL,
    `ProvinceID` INT NOT NULL,
    `DistrictID` INT NOT NULL,
    `CommuneID` INT NOT NULL,
    `Address` VARCHAR(256) NOT NULL,
    `Note` VARCHAR(256),
    PRIMARY KEY (`ID`)
);

-- cart table
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
    `OrderID` INT NOT NULL,
    `Subtotal` INT NOT NULL,
    `Delivery` INT NOT NULL,
    `Discount` INT NOT NULL,
    `Total` INT NOT NULL,
    PRIMARY KEY (`OrderID`)
);

-- cart_detail table
DROP TABLE IF EXISTS `cart_detail`;
CREATE TABLE `cart_detail` (
    `OrderID` INT NOT NULL,
    `ProductID` INT NOT NULL,
    `Price` INT NOT NULL,
    `Quantity` INT NOT NULL,
    `Total` INT NOT NULL,
    PRIMARY KEY (`OrderID`, `ProductID`)
);

--
-- Insert Data
--
INSERT INTO `account` (`Username`, `Password`, `Role`) VALUES ('admin', UNHEX(SHA1('admin')), 0);
INSERT INTO `account` (`Username`, `Password`, `Role`) VALUES ('user', UNHEX(SHA1('user')), 1);

INSERT INTO `category` (`CategoryTitle`) VALUES ('Grammar');
INSERT INTO `category` (`CategoryTitle`) VALUES ('Vocabulary');
INSERT INTO `category` (`CategoryTitle`) VALUES ('Beginer');
INSERT INTO `category` (`CategoryTitle`) VALUES ('Test');
INSERT INTO `category` (`CategoryTitle`) VALUES ('Novel');

INSERT INTO `order_status` (`Status`) VALUES ('Đang xử lý');
INSERT INTO `order_status` (`Status`) VALUES ('Đang chuẩn bị');
INSERT INTO `order_status` (`Status`) VALUES ('Đang giao hàng');
INSERT INTO `order_status` (`Status`) VALUES ('Đã giao hàng');

INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00001', 'Oxford Practice Grammar Intermediate without Key', 'Covers the grammar students need to know for the First Certificate Exam Regular revision units and tests help learners focus on the grammar they need to practise most Exit test makes sure you are ready for Oxford Practice Grammar Advanced', 1, 39000, 'appdata/products/PRO00001_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00002', 'A Practical English Grammar', 'Everyone who is studying English should probably buy a copy of this book at some point.',1,29000, 'appdata/products/PRO00002_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00003', 'English Grammar in Use, R.Murphy (Cambridge)', 'Some of the exercises require you to use your imagination, but all exercises have suggested answers. This is not a book that you work through from the beginning to the end, it is more like a reference book that you go to when realise that you need to improve a certain part of English. All of this combines to make this the number one IELTS book.',1,45000, 'appdata/products/PRO00003_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00004', 'Oxford Practice Grammar', 'Second edition Oxford Practice Grammarwith answers John Eastwood Oxford University Press',1,45000, 'appdata/products/PRO00004_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00005', 'Oxford Practice Grammar Intermediate', 'This book is best for students who have problems with “simple” grammar, i.e. simple present/past. It contains a lot of repeating, which is a really good way to learn.',1,49000, 'appdata/products/PRO00005_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00006', 'Word Smart, 6th Edition', 'Whether your goal is to get a competitive edge on a specific exam or simply to build your word knowledge, this updated sixth edition of Word Smart gives you the tools you need to transform your vocabulary and start using words with confidence!',2,45000, 'appdata/products/PRO00006_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00007', 'Beginner English', 'If you are looking for a solid foundation to your language studies for school, work or travel, this engaging course will get you speaking, writing, reading and understanding English in no time.',2,45000, 'appdata/products/PRO00007_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00008', 'Use of English Masterclass', 'This grammar book focuses on phrasal verbs and collocations, and is ideal for anyone who has problems understanding, remembering and using English vocabulary and grammar.',2,49000, 'appdata/products/PRO00008_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00009', 'Short Stories in English', 'Short Stories in English for Beginners has been written especially for students from beginner to intermediate level, designed to give a sense of achievement, and most importantly - enjoyment! Mapped to A2-B1 on the Common European Framework of Reference, these eight captivating stories will both entertain you, and give you a feeling of progress when reading.',2,49000, 'appdata/products/PRO00009_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00010', 'Get Started in Beginners English', 'The course focuses on British English but offers American alternatives. Basic English is slowly and carefully introduced to ensure you progress confidently through the course and build up a foundation to allow you to feel confident in everyday situations and move to the next level of your learning.',3,45000, 'appdata/products/PRO00010_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00011', 'Summer Reading Log', 'It’s summer! I am so excited to bring you this Summer Reading Log!  It is a Color by Book sheet!  What does that mean?  It means that when you read a Dr. Seuss book, you get to color in the part of the picture that says “Read a Dr. Seuss book”.  I LOVE IT! ',3,55000, 'appdata/products/PRO00011_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00012', 'Easy English - Conversations for Beginners', 'Easy English provides conversations, in many different settings to help you increase your fluency. By using the conversations in this book you can prepare to talk to people in many different arenas.',3,45000, 'appdata/products/PRO00012_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00013', 'Writing Masterclass 8.5', 'IELTS Writing practice self-study resource designed for IELTS Academic learners who need to achieve a band score of 7.0 to 8.5 in the IELTS Academic Writing test.',4,59000, 'appdata/products/PRO00013_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00014', 'COBUILD Key Words for IELTS', 'Collins Cobuild Key Words for IELTS is a brand-new range of three graded books which contain the essential vocabulary students need to succeed in the IELTS exam.',4,59000, 'appdata/products/PRO00014_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00015', 'Essential Words for the IELTS', 'IELTS test takers must have a command of English vocabulary that applies to many different situations and contexts. This book offers students extensive practice in vocabulary building and correct English usage, with emphasis on 600 English words that relate to specific categories that appear frequently on IELTS exams.',4,59000, 'appdata/products/PRO00015_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00016', 'Collins English For IELTS - Get Ready For IELTS: Students Book: IELTS 4+ (A2+)', 'Get Ready for IELTS provides a firm foundation for lower-level students who are starting out in their IELTS preparation and are working within a band score of 3.5-4.5. The information, advice and practice material will enable students to improve their score and develop the key skills and strategies they need for success in IELTS.',4,59000, 'appdata/products/PRO00016_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00017', 'HAUNTING OF HILL HOUSE', 'In the summer of 1992, Hugh and Olivia Crain and their children—Steven, Shirley, Theodora, Luke, and Eleanor (Nell)—move into Hill House to renovate the mansion in order to sell it and build their own house, designed by Olivia. However, due to unexpected repairs, they have to stay longer, and they begin to experience increasing paranormal phenomena, resulting in a tragic loss and the family fleeing from the house. Twenty-six years later, the Crain siblings and their estranged father reunite after tragedy strikes again, and they are forced to confront how their time in Hill House has affected each of them.',5,29000, 'appdata/products/PRO00017_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00018', 'The Twilight Saga: Breaking Dawn', 'Back at the Cullen home, Alice glimpses the future, seeing Edward and Bella together with Jacob and a fully matured Renesmee also together. Edward reads Alice mind and feels relieved that Renesmee has Jacob to protect her. ',5,29000, 'appdata/products/PRO00018_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00019', 'Animal Farm', 'When the downtrodden animals of Manor Farm overthrow their master Mr Jones and take over the farm themselves, they imagine it is the beginning of a life of freedom and equality. But gradually a cunning, ruthless elite among them, masterminded by the pigs Napoleon and Snowball, starts to take control.',5,29000, 'appdata/products/PRO00019_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00020', 'Scary Stories to Tell in the Dark', 'These stories are some of the most terrifying tales of horror, revenge, and supernatural events of all time, collected and retold by Alvin Schwartz and featuring the classic artwork by Stephen Gammell.',5,32000, 'appdata/products/PRO00020_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00021', 'Harry Potter and the Sorcerer’s Stone', 'Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry’s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry.',5,29000, 'appdata/products/PRO00021_1.png');
INSERT INTO `product` (`Code`, `ProductTitle`, `Description`, `CategoryID`, `Price`, `ImageURL`) VALUES ('PRO00022', 'Fantastic Beasts and Where to Find Them', 'When Magizoologist Newt Scamander arrives in New York, he intends his stay to be just a brief stopover. However, when his magical case is misplaced and some of Newt fantastic beasts escape, it spells trouble for everyone.',5,39000, 'appdata/products/PRO00022_1.png');

INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (1, NULL, 'Thành phố Hồ Chí Minh', 'Thành phố Trung ương', 'Tỉnh/Thành');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (2, 1, 'Quận Thủ Đức', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (3, 1, 'Quận Tân Phú', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (4, 1, 'Quận Tân Bình', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (5, 1, 'Quận Phú Nhuận', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (6, 1, 'Quận Gò Vấp', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (7, 1, 'Quận Bình Thạnh', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (8, 1, 'Quận Bình Tân', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (9, 1, 'Quận 9', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (10, 1, 'Quận 8', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (11, 1, 'Quận 7', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (12, 1, 'Quận 6', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (13, 1, 'Quận 5', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (14, 1, 'Quận 4', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (15, 1, 'Quận 3', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (16, 1, 'Quận 2', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (17, 1, 'Quận 12', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (18, 1, 'Quận 11', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (19, 1, 'Quận 10', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (20, 1, 'Quận 1', 'Quận', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (21, 1, 'Huyện Nhà Bè', 'Huyện', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (22, 1, 'Huyện Hóc Môn', 'Huyện', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (23, 1, 'Huyện Củ Chi', 'Huyện', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (24, 1, 'Huyện Cần Giờ', 'Huyện', 'Quận/Huyện');
INSERT INTO `administrative_division` (`ID`, `FatherID`, `Name`, `Type`, `Level`) VALUES (25, 1, 'Huyện Bình Chánh', 'Huyện', 'Quận/Huyện');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (20, 'Phường Tân Định', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (20, 'Phường Đa Kao', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (20, 'Phường Bến Nghé', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (20, 'Phường Bến Thành', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (20, 'Phường Nguyễn Thái Bình', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (20, 'Phường Phạm Ngũ Lão', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (20, 'Phường Cầu Ông Lãnh', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (20, 'Phường Cô Giang', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (20, 'Phường Nguyễn Cư Trinh', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (20, 'Phường Cầu Kho', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (17, 'Phường Thạnh Xuân', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (17, 'Phường Thạnh Lộc', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (17, 'Phường Hiệp Thành', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (17, 'Phường Thới An', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (17, 'Phường Tân Chánh Hiệp', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (17, 'Phường An Phú Đông', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (17, 'Phường Tân Thới Hiệp', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (17, 'Phường Trung Mỹ Tây', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (17, 'Phường Tân Hưng Thuận', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (17, 'Phường Đông Hưng Thuận', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (17, 'Phường Tân Thới Nhất', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (2, 'Phường Linh Xuân', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (2, 'Phường Bình Chiểu', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (2, 'Phường Linh Trung', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (2, 'Phường Tam Bình', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (2, 'Phường Tam Phú', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (2, 'Phường Hiệp Bình Phước', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (2, 'Phường Hiệp Bình Chánh', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (2, 'Phường Linh Chiểu', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (2, 'Phường Linh Tây', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (2, 'Phường Linh Đông', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (2, 'Phường Bình Thọ', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (2, 'Phường Trường Thọ', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Long Bình', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Long Thạnh Mỹ', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Tân Phú', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Hiệp Phú', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Tăng Nhơn Phú A', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Tăng Nhơn Phú B', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Phước Long B', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Phước Long A', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Trường Thạnh', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Long Phước', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Long Trường', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Phước Bình', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (9, 'Phường Phú Hữu', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 15', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 13', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 17', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 6', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 16', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 12', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 14', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 10', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 05', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 07', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 04', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 01', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 9', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 8', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 11', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (6, 'Phường 03', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 13', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 11', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 27', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 26', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 12', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 25', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 05', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 07', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 24', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 06', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 14', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 15', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 02', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 01', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 03', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 17', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 21', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 22', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 19', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (7, 'Phường 28', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 02', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 04', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 12', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 13', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 01', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 03', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 11', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 07', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 05', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 10', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 06', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 08', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 09', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 14', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (4, 'Phường 15', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (3, 'Phường Tân Sơn Nhì', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (3, 'Phường Tây Thạnh', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (3, 'Phường Sơn Kỳ', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (3, 'Phường Tân Quý', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (3, 'Phường Tân Thành', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (3, 'Phường Phú Thọ Hòa', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (3, 'Phường Phú Thạnh', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (3, 'Phường Phú Trung', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (3, 'Phường Hòa Thạnh', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (3, 'Phường Hiệp Tân', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (3, 'Phường Tân Thới Hòa', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 04', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 05', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 09', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 07', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 03', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 01', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 02', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 08', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 15', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 10', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 11', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 17', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 14', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 12', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (5, 'Phường 13', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (16, 'Phường Thảo Điền', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (16, 'Phường An Phú', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (16, 'Phường Bình An', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (16, 'Phường Bình Trưng Đông', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (16, 'Phường Bình Trưng Tây', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (16, 'Phường Bình Khánh', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (16, 'Phường An Khánh', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (16, 'Phường Cát Lái', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (16, 'Phường Thạnh Mỹ Lợi', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (16, 'Phường An Lợi Đông', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (16, 'Phường Thủ Thiêm', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 08', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 07', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 14', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 12', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 11', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 13', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 06', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 09', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 10', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 04', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 05', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 03', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 02', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (15, 'Phường 01', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 15', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 13', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 14', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 12', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 11', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 10', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 09', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 01', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 08', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 02', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 04', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 07', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 05', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 06', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (19, 'Phường 03', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 15', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 05', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 14', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 11', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 03', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 10', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 13', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 08', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 09', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 12', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 07', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 06', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 04', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 01', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 02', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (18, 'Phường 16', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 12', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 13', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 09', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 06', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 08', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 10', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 05', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 18', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 14', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 04', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 03', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 16', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 02', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 15', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (14, 'Phường 01', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 04', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 09', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 03', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 12', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 02', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 08', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 15', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 07', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 01', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 11', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 14', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 05', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 06', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 10', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (13, 'Phường 13', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 14', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 13', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 09', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 06', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 12', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 05', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 11', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 02', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 01', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 04', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 08', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 03', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 07', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (12, 'Phường 10', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 08', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 02', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 01', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 03', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 11', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 09', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 10', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 04', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 13', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 12', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 05', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 14', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 06', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 15', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 16', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (10, 'Phường 07', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (8, 'Phường Bình Hưng Hòa', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (8, 'Phường Bình Hưng Hoà A', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (8, 'Phường Bình Hưng Hoà B', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (8, 'Phường Bình Trị Đông', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (8, 'Phường Bình Trị Đông A', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (8, 'Phường Bình Trị Đông B', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (8, 'Phường Tân Tạo', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (8, 'Phường Tân Tạo A', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (8, 'Phường  An Lạc', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (8, 'Phường An Lạc A', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (11, 'Phường Tân Thuận Đông', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (11, 'Phường Tân Thuận Tây', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (11, 'Phường Tân Kiểng', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (11, 'Phường Tân Hưng', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (11, 'Phường Bình Thuận', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (11, 'Phường Tân Quy', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (11, 'Phường Phú Thuận', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (11, 'Phường Tân Phú', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (11, 'Phường Tân Phong', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (11, 'Phường Phú Mỹ', 'Phường', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Thị trấn Củ Chi', 'Thị trấn', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Phú Mỹ Hưng', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã An Phú', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Trung Lập Thượng', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã An Nhơn Tây', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Nhuận Đức', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Phạm Văn Cội', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Phú Hòa Đông', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Trung Lập Hạ', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Trung An', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Phước Thạnh', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Phước Hiệp', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Tân An Hội', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Phước Vĩnh An', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Thái Mỹ', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Tân Thạnh Tây', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Hòa Phú', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Tân Thạnh Đông', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Bình Mỹ', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Tân Phú Trung', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (23, 'Xã Tân Thông Hội', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (22, 'Thị trấn Hóc Môn', 'Thị trấn', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (22, 'Xã Tân Hiệp', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (22, 'Xã Nhị Bình', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (22, 'Xã Đông Thạnh', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (22, 'Xã Tân Thới Nhì', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (22, 'Xã Thới Tam Thôn', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (22, 'Xã Xuân Thới Sơn', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (22, 'Xã Tân Xuân', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (22, 'Xã Xuân Thới Đông', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (22, 'Xã Trung Chánh', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (22, 'Xã Xuân Thới Thượng', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (22, 'Xã Bà Điểm', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Thị trấn Tân Túc', 'Thị trấn', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Phạm Văn Hai', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Vĩnh Lộc A', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Vĩnh Lộc B', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Bình Lợi', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Lê Minh Xuân', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Tân Nhựt', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Tân Kiên', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Bình Hưng', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Phong Phú', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã An Phú Tây', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Hưng Long', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Đa Phước', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Tân Quý Tây', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Bình Chánh', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (25, 'Xã Quy Đức', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (21, 'Thị trấn Nhà Bè', 'Thị trấn', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (21, 'Xã Phước Kiển', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (21, 'Xã Phước Lộc', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (21, 'Xã Nhơn Đức', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (21, 'Xã Phú Xuân', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (21, 'Xã Long Thới', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (21, 'Xã Hiệp Phước', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (24, 'Thị trấn Cần Thạnh', 'Thị trấn', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (24, 'Xã Bình Khánh', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (24, 'Xã Tam Thôn Hiệp', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (24, 'Xã An Thới Đông', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (24, 'Xã Thạnh An', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (24, 'Xã Long Hòa', 'Xã', 'Phường/Xã');
INSERT INTO `administrative_division` (`FatherID`, `Name`, `Type`, `Level`) VALUES (24, 'Xã Lý Nhơn', 'Xã', 'Phường/Xã');

