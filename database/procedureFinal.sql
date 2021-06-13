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
    _Level VARCHAR(8)
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
    SELECT todaylessons.ID, ID_account, Times, FirstDate, Level, LessonsID, ExerciseID  FROM todaylessons INNER JOIN lessons ON todaylessons.ID_lesson = lessons.ID WHERE`ID_account` = _IDaccount AND `Times` = 0 ORDER BY todaylessons.ID DESC LIMIT 1;
END$$

DELIMITER ;

-- create getReviewLessons procedure
DROP procedure IF EXISTS `reviewLessons_query`;

DELIMITER $$
CREATE PROCEDURE `reviewLessons_query` (
    _IDaccount INT
)
reviewLessons_query:BEGIN
	SELECT todaylessons.ID, ID_account, Times, FirstDate, Level, LessonsID, ExerciseID  FROM todaylessons INNER JOIN lessons ON todaylessons.ID_lesson = lessons.ID WHERE `ID_account` = _IDaccount AND ( (DATEDIFF(now(), `FirstDate`) >= 1 AND `Times`=1) OR (DATEDIFF(now(), `FirstDate`) >= 7 AND `Times`=2) OR (DATEDIFF(now(), `FirstDate`) >= 30 AND `Times`=3)) ORDER BY Times ASC; 
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
     SELECT _IDreviewRow Result, 'Last info updated' ErrorDesc;
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
     SELECT _IDreviewRow Result, 'Last info updated' ErrorDesc;
END$$

DELIMITER ;

-- check if words memorize procedure -- get all remember word
DROP procedure IF EXISTS `getMyWords`;
DELIMITER $$
CREATE PROCEDURE `getMyWords` (
	_IDaccount INT
)
getMyWords:BEGIN
     SELECT vocab_by_topic.ID, vocab_by_topic.en, vocab_by_topic.IPA, vocab_by_topic.SoundURL, vocab_by_topic.Type, vocab_by_topic.Vn, vocab_by_topic.Example1, vocab_by_topic.Example2, vocab_by_topic.ImageURL from memorizedwords join vocab_by_topic on memorizedwords.ID_word = vocab_by_topic.ID where `ID_account` = _IDaccount;
END$$
DELIMITER ;

-- remember word
DROP procedure IF EXISTS `addMyWords`;
DELIMITER $$
CREATE PROCEDURE `addMyWords` (
	_IDaccount INT,
    _IDword INT
)
addMyWords:BEGIN
     INSERT INTO `memorizedwords` (`ID_account`, `ID_word`) VALUES (_IDaccount, _IDword);
END$$
DELIMITER ;

-- forget word
DROP procedure IF EXISTS `deleteMyWords`;
DELIMITER $$
CREATE PROCEDURE `deleteMyWords` (
	_IDaccount INT,
    _IDword INT
)
deleteMyWords:BEGIN
     DELETE from memorizedwords where `ID_account` = _IDaccount AND `ID_word` = _IDword;
END$$
DELIMITER ;

-- get Top 5 Ranking
DROP procedure IF EXISTS `ranking_get`;
DELIMITER $$
CREATE PROCEDURE `ranking_get` (
    _Top INT
)
ranking_get:BEGIN
     SELECT * from user_scoreInfo INNER JOIN userInfo ON userInfo.ID_account= user_scoreInfo.ID_account
 ORDER BY Score DESC LIMIT _Top;
END$$
DELIMITER ;


-- remember dictionary word
DROP procedure IF EXISTS `addMyDicWords`;
DELIMITER $$
CREATE PROCEDURE `addMyDicWords` (
	_IDaccount INT,
    _en VARCHAR(32),
    _ipa VARCHAR(32),
    _type VARCHAR(16),
    _vn VARCHAR(32),
    _ex1 VARCHAR(256),
    _ex2 VARCHAR(256),
    _imageURL VARCHAR(1024)
)
addMyDicWords:BEGIN
	INSERT INTO `vocab_by_topic` (`ID_topic`, `En`, `IPA`, `SoundURL`, `Type`, `Vn`, `Example1`, `Example2`, `ImageURL`) VALUES ("0", _en, _ipa, "0", _type, _vn, _ex1, _ex2, _imageURL);
    INSERT INTO `memorizedwords` (`ID_account`, `ID_word`) VALUES (_IDaccount, LAST_INSERT_ID());
END$$
DELIMITER ;

-- get all vocab
DROP procedure IF EXISTS `vocab_getAll`;
DELIMITER $$
CREATE PROCEDURE `vocab_getAll` ()
vocab_getAll:BEGIN
     SELECT ID, En from vocab_by_topic;
END$$
DELIMITER ;
