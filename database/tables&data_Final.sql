-- use awakecup database
USE `awakecup`;
--
-- Create tables
-- 

-- lessons table
DROP TABLE IF EXISTS `lessons`;
CREATE TABLE `lessons` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Level` VARCHAR(16) NOT NULL,
    `LessonsID` VARCHAR(16) NOT NULL,
    `ExerciseID` INT NOT NULL,
    `RecordStatus` TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

-- today lesson and review lessons table
DROP TABLE IF EXISTS `todaylessons`;
CREATE TABLE `todaylessons` (
    `ID` INT NOT NULL AUTO_INCREMENT,              
    `ID_account` INT NOT NULL,    
    `ID_lesson` INT NOT NULL,
    `Times` VARCHAR(4) NOT NULL DEFAULT 0, 
    `FirstDate` DATETIME NOT NULL DEFAULT now(),               
    PRIMARY KEY (`ID`)
);

--
-- Insert Data
--

-- lessons table
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g-1,v-1","1");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g-2,v-2","2");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g-3,v-3","3");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g-4,v-4","4");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g-5,v-5","5");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g-6,v-6","6");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g-7,v-7","7");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g-8,v-8","8");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","v-9,v-10","9");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","v-11,v-12","10");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","v-13,v-14,v15","11");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-9,v-16","12");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-10,v-17","13");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-12,v-18","14");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-13,v-19","15");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-14,v-20","16");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-15,v-21","17");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-16,v-22","18");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-17,v-23","19");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-18,v-24","20");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-19,g-20","21");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-21,g-22","22");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-23,g-24","23");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-25,g-26","24");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-27,g-28","25");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g-29,g-30","26");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g-31,v-25","27");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g-32,v-26","28");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g-33,v-27","29");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g-34,v-28","30");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g-35,v-29","31");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g-36,v-30","32");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g-37,v-31","33");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g-38,v-32","34");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g-39,g-40","35");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g-41,g-42","36");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g-43,g-44,g-45","37");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g-46,v-33","38");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g-47,v-34","39");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g-48,v-35","40");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g-49,v-36","41");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g-50,v-37","42");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g-51,v-38","43");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g-52,v-39,v-40","44");