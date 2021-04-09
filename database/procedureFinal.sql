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
	IF NOT EXISTS (SELECT ID FROM lessons WHERE `Level` = _Level LIMIT 1) THEN
		SELECT -3 Result, 'There is no lesson for your level' ErrorDesc;
		LEAVE firstLesson_create;
	END IF;
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

-- create studyDone procedure
DROP procedure IF EXISTS `studyDone`;

DELIMITER $$
CREATE PROCEDURE `studyDone` (
    _IDreviewRow INT
)
studyDone:BEGIN
	UPDATE todaylessons SET Times = Times + 1 WHERE `ID` = _IDreviewRow;
    
	SET @IDlesson = (SELECT ID_lesson FROM todaylessons WHERE `ID` = _IDreviewRow);
    SET @ID_account = (SELECT ID_account FROM todaylessons WHERE `ID` = _IDreviewRow);
    
	INSERT INTO  todaylessons (`ID_account`, `ID_lesson`) VALUES (@ID_account, @IDlesson + 1);
END$$

DELIMITER ;

-- create reviewDone procedure
DROP procedure IF EXISTS `reviewDone`;

DELIMITER $$
CREATE PROCEDURE `reviewDone` (
    _IDreviewRow INT
)
reviewDone:BEGIN
	UPDATE todaylessons SET Times = Times + 1 WHERE `ID` = _IDreviewRow;
END$$

DELIMITER ;

-- create getReviewLessons procedure
DROP procedure IF EXISTS `getReviewLessons`;

DELIMITER $$
CREATE PROCEDURE `getReviewLessons` (
    _IDaccount INT
)
getReviewLessons:BEGIN
	SELECT * FROM todaylessons WHERE `ID_account` = _IDaccount AND ( DATEDIFF(now(), `FirstDate`) >= 1 OR DATEDIFF(now(), `FirstDate`) >= 7 OR DATEDIFF(now(), `FirstDate`) >= 30 ); 
END$$

DELIMITER ;