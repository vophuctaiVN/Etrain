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
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g1,v1","1");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g2,v2","2");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g3,v3","3");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g4,v4","4");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g5,v5","5");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g6,v6","6");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g7,v7","7");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","g8,v8","8");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","v9,v10","9");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","v11,v12","10");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A1","v13,v14,v15","11");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g9,v16","12");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g10,v17","13");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g12,v18","14");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g13,v19","15");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g14,v20","16");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g15,v21","17");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g16,v22","18");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g17,v23","19");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g18,v24","20");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g19,g20","21");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g21,g22","22");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g23,g24","23");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g25,g26","24");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g27,g28","25");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("A2","g29,g30","26");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g31,v25","27");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g32,v26","28");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g33,v27","29");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g34,v28","30");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g35,v29","31");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g36,v30","32");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g37,v31","33");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g38,v32","34");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g39,g40","35");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g41,g42","36");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B1","g43,g44,g45","37");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g46,v33","38");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g47,v34","39");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g48,v35","40");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g49,v36","41");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g50,v37","42");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g51,v38","43");
INSERT INTO `lessons` (`Level`, `LessonsID`, `ExerciseID`) VALUES ("B2","g52,v39,v40","44");