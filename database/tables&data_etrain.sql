-- use awakecup database
USE `awakecup`;
--
-- Create tables
-- 

-- grammar_topics table
DROP TABLE IF EXISTS `gram_topics`;
CREATE TABLE `gram_topics` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(64) NOT NULL,
    `Level` VARCHAR(16) NOT NULL,
    `ImageURL` VARCHAR(256) NOT NULL DEFAULT 'default.png',
    `Description` VARCHAR(1024) NOT NULL,
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- vocabulary_topics table
DROP TABLE IF EXISTS `vocab_topics`;
CREATE TABLE `vocab_topics` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(32) NOT NULL,
    `Level` VARCHAR(16) NOT NULL,
    `ImageURL` VARCHAR(256) NOT NULL DEFAULT 'default.png',
    `Description` VARCHAR(1024) NOT NULL,
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- Grammar_Post_Section table
DROP TABLE IF EXISTS `gram_post_section`;
CREATE TABLE `gram_post_section` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `ID_topic` INT NOT NULL,
    `Title` VARCHAR(64) NOT NULL,
    `Formular` VARCHAR(256) NOT NULL,
    `Usage` VARCHAR(1024) NOT NULL DEFAULT 'default.png',
    `Note` VARCHAR(256) NOT NULL DEFAULT 0,
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (ID_topic) REFERENCES gram_topics(ID) ON DELETE CASCADE
);

-- Grammar_Post_Section_Example table
DROP TABLE IF EXISTS `gram_post_section_example`;
CREATE TABLE `gram_post_section_example` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `ID_section` INT NOT NULL,
    `ImageURL` VARCHAR(1024) NOT NULL DEFAULT 'default.png',
    `Example` VARCHAR(1024) NOT NULL,
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (ID_section) REFERENCES gram_post_section(ID) ON DELETE CASCADE
);

-- vocab_by_topic table
DROP TABLE IF EXISTS `vocab_by_topic`;
CREATE TABLE `vocab_by_topic` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `ID_topic` INT NOT NULL,
    `En` VARCHAR(32) NOT NULL, 
    `IPA` VARCHAR(32) NOT NULL, 
    `SoundURL` VARCHAR(256) NOT NULL,
    `Type` VARCHAR(16) NOT NULL,
    `Vn` VARCHAR(32) NOT NULL,
    `Example1` VARCHAR(256) NOT NULL,
    `Example2` VARCHAR(256) NOT NULL,
    `ImageURL` VARCHAR(1024) NOT NULL DEFAULT 'default.png',    
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- quiz table
DROP TABLE IF EXISTS `quiz`;
CREATE TABLE `quiz` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(64) NOT NULL,    
    `Level` VARCHAR(32) NOT NULL,
    `Description` VARCHAR(1024) NOT NULL,
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- quiz_question table
DROP TABLE IF EXISTS `quiz_question`;
CREATE TABLE `quiz_question` (
    `ID` INT NOT NULL AUTO_INCREMENT,    
    `ID_quiz` INT NOT NULL,
    `question` VARCHAR(256) NOT NULL,    
    `questionType` VARCHAR(16) NOT NULL,
    `questionPic` VARCHAR(256),
    `answerSelectionType` VARCHAR(16) NOT NULL,
    `answers` VARCHAR(1024) NOT NULL,   
    `correctAnswer` VARCHAR(16) NOT NULL,
    `explanation` VARCHAR(256),
    PRIMARY KEY (`ID`),
    FOREIGN KEY (ID_quiz) REFERENCES quiz(ID) ON DELETE CASCADE
);

-- userInfo table
DROP TABLE IF EXISTS `userInfo`;
CREATE TABLE `userInfo` (
    `ID` INT NOT NULL AUTO_INCREMENT,    
    `ID_account` INT NOT NULL,
    `Name` VARCHAR(64) NOT NULL,     
    `Email` VARCHAR(64) NOT NULL,        
    `Phone` VARCHAR(64),  
    `Image` VARCHAR(1024) NOT NULL DEFAULT 'default.png',    
    `Address` VARCHAR(1024),     
    `About` VARCHAR(1024), 
    PRIMARY KEY (`ID`),
	FOREIGN KEY (ID_account) REFERENCES account(ID) ON DELETE CASCADE
);

-- user_scoreInfo table
DROP TABLE IF EXISTS `user_scoreInfo`;
CREATE TABLE `user_scoreInfo` (
    `ID` INT NOT NULL AUTO_INCREMENT,    
    `ID_account` INT NOT NULL,    
    `Score` INT NOT NULL DEFAULT 0,      
    `PostLeft` INT NOT NULL DEFAULT 20, 
    `Level` VARCHAR(8) NOT NULL DEFAULT "No Level",
    PRIMARY KEY (`ID`),
	FOREIGN KEY (ID_account) REFERENCES account(ID) ON DELETE CASCADE
);

-- question table
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
    `ID` INT NOT NULL AUTO_INCREMENT,    
    `Question` VARCHAR(64) NOT NULL,    
    `Topic` VARCHAR(16) NOT NULL,
    `Detail` VARCHAR(1024) NOT NULL,
    `ID_account` INT NOT NULL,
    `Time` DATETIME,              
    `NumberOfAnswer` INT NOT NULL DEFAULT 0,   
    PRIMARY KEY (`ID`),
    FOREIGN KEY (ID_account) REFERENCES account(ID) ON DELETE CASCADE
);
-- answer table
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
    `ID` INT NOT NULL AUTO_INCREMENT,     
    `ID_question` INT NOT NULL,
    `Detail` VARCHAR(1024) NOT NULL,         
    `ID_account` INT NOT NULL,    
    `Time` DATETIME,               
    PRIMARY KEY (`ID`),
	FOREIGN KEY (ID_question) REFERENCES question(ID) ON DELETE CASCADE
);




