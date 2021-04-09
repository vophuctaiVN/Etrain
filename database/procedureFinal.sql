-- use awakecup database
USE `awakecup`;

--
-- Create procedures and functions
-- 

-- create user_scoreInfo_update procedure
DROP procedure IF EXISTS `user_scoreInfo_update`;

DELIMITER $$
CREATE PROCEDURE `user_scoreInfo_update` (
    _IDaccount INT,    
    _Score INT,      
    _PostLeft INT, 
    _Level VARCHAR(4)
)
user_scoreInfo_update:BEGIN
    UPDATE `user_scoreInfo` SET `Score` = _Score, `PostLeft` = _PostLeft, `Level` = _Level
    WHERE _IDaccount = `ID_account`;

    SELECT _IDaccount Result, 'Last info updated' ErrorDesc;
END$$

DELIMITER ;


-- create firstLesson_create procedure
DROP procedure IF EXISTS `firstLesson_create`;

DELIMITER $$
CREATE PROCEDURE `firstLesson_create` (
    _IDaccount INT,
    _Level VARCHAR(4)
)
firstLesson_create:BEGIN
	SET @IDlesson = (SELECT ID FROM lessons WHERE `Level` = _Level LIMIT 1);
	INSERT INTO  todaylessons (`ID_account`, `ID_lesson`) VALUES (_IDaccount, @IDlesson);
	
    SELECT _IDaccount Result, 'Last info updated' ErrorDesc;
END$$

DELIMITER ;

-- create todayless_query procedure
DROP procedure IF EXISTS `todayless_query`;

DELIMITER $$
CREATE PROCEDURE `todayless_query` (
    _IDaccount INT
)
todayless_query:BEGIN    
    SELECT todaylessons.ID, ID_account, Times, FirstDate, Level, LessonsID, ExerciseID  FROM todaylessons INNER JOIN lessons ON todaylessons.ID_lesson = lessons.ID WHERE`ID_account` = _IDaccount AND `Times` = 0;
END$$

DELIMITER ;