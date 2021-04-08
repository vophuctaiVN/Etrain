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
IF NOT EXISTS (SELECT 1 FROM `administrative_division` WHERE _ProvinceID = `ID` AND 'Tỉnh/Thành' = `Level`) THEN
		SELECT -3 Result, 'Not found province for insert order' ErrorDesc;
		LEAVE order_create;
	END IF;
	SET @IDlesson = (SELECT ID FROM lessons WHERE `Level` = _Level LIMIT 1);
	INSERT INTO  todaylessons (`ID_account`, `ID_lesson`) VALUES (_IDaccount, @IDlesson);
END$$

DELIMITER ;