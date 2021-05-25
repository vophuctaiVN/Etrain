-- use awakecup database
USE `awakecup`;

--
-- Create procedures and functions
-- 

-- create gram_topic_query procedure
DROP procedure IF EXISTS `gram_topic_table_query`;

DELIMITER $$
CREATE PROCEDURE `gram_topic_table_query` (
    _ID INT, _Title VARCHAR(32), _Level VARCHAR(16), _ImageURL VARCHAR(256), _Description VARCHAR(1024), _RecordStatus TINYINT,
    _Search VARCHAR(32), _Sorting VARCHAR(32), _PageNo INT, _PageSize INT
)
BEGIN
    -- preprocessing input params
    SET _Title = LTRIM(RTRIM(_Title));
    SET _Level = LTRIM(RTRIM(_Level));
    SET _ImageURL = LTRIM(RTRIM(_ImageURL));
    SET _Description = LTRIM(RTRIM(_Description));
    IF _ID IS NULL THEN SET @ID = "NULL"; ELSE SET @ID = _ID; END IF;
    IF _Title IS NULL THEN SET @Title = "''"; ELSE SET @Title= CONCAT("'",_Title,"'"); END IF;    
    IF _Level IS NULL THEN SET @Level = "''"; ELSE SET @Level = CONCAT("'",_Level,"'"); END IF;
    IF _ImageURL IS NULL THEN SET @ImageURL = "''"; ELSE SET @ImageURL = CONCAT("'",_ImageURL,"'"); END IF;
    IF _Description IS NULL THEN SET @Description = "''"; ELSE SET @Description = CONCAT("'",_Description,"'"); END IF;
    IF _RecordStatus IS NULL THEN SET @RecordStatus = "NULL"; ELSE SET @RecordStatus = _RecordStatus; END IF;
    IF _Search IS NULL THEN SET @Search = "''"; ELSE SET @Search = CONCAT("'",_Search,"'"); END IF;
    IF _Sorting IS NULL OR NOT (
        (_Sorting LIKE 'ID%' OR _Sorting LIKE 'FatherID%' OR _Sorting LIKE 'Name%' OR _Sorting LIKE 'Type%' OR _Sorting LIKE 'Level%') 
        AND (_Sorting LIKE '%ASC' OR _Sorting LIKE '%DESC')
    )THEN SET @Sorting = 'ID ASC'; ELSE SET @Sorting = _Sorting; END IF;
    IF (_PageSize IS NULL OR _PageSize = 0) THEN SET @Size = 1; ELSEIF _PageSize > 50 THEN SET @Size = 50; ELSE SET @Size = _PageSize; END IF;
    IF _PageNo IS NULL OR _PageNo = 0 THEN SET @Offset_ = 0; ELSE SET @Offset_ = @Size * (_PageNo - 1); END IF;
    -- build statements
    SET @WhereStmt = CONCAT("
        WHERE (",@ID," IS NULL OR ",@ID," = `ID`)
            AND is_substr(",@Title,", `Title`) > 0
            AND is_substr(",@Level,", `Level`) > 0
            AND is_substr(",@ImageURL,", `ImageURL`) > 0
            AND is_substr(",@Description,", `Description`) > 0
            AND (
                is_substr(",@Search,", `Title`) > 0
                OR is_substr(",@Search,", `Description`) > 0
                OR is_substr(",@Search,", `Level`) > 0
            )
            AND (",@RecordStatus," IS NULL OR ",@RecordStatus," = `RecordStatus`)
    ");
    SET @TotalStmt = CONCAT('SELECT COUNT(`ID`) FROM `gram_topics` ',@WhereStmt);
    SET @SortStmt = CONCAT('ORDER BY ', @Sorting, ' ');
    SET @LimitStmt = CONCAT('LIMIT ',@Offset_,', ',@Size);
    SET @QueryStmt = CONCAT('SELECT (',@TotalStmt,') AS TotalRows, `gram_topics`.* FROM `gram_topics` ',@WhereStmt, @SortStmt, @LimitStmt);
    -- call query statement
    PREPARE stmt FROM @QueryStmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- create vocab_topics_query procedure
DROP procedure IF EXISTS `vocab_topics_table_query`;

DELIMITER $$
CREATE PROCEDURE `vocab_topics_table_query` (
    _ID INT, _Title VARCHAR(32), _Level VARCHAR(16), _ImageURL VARCHAR(256), _Description VARCHAR(1024), _RecordStatus TINYINT,
    _Search VARCHAR(32), _Sorting VARCHAR(32), _PageNo INT, _PageSize INT
)
BEGIN
    -- preprocessing input params
    SET _Title = LTRIM(RTRIM(_Title));
    SET _Level = LTRIM(RTRIM(_Level));
    SET _ImageURL = LTRIM(RTRIM(_ImageURL));
    SET _Description = LTRIM(RTRIM(_Description));
    IF _ID IS NULL THEN SET @ID = "NULL"; ELSE SET @ID = _ID; END IF;
    IF _Title IS NULL THEN SET @Title = "''"; ELSE SET @Title= CONCAT("'",_Title,"'"); END IF;    
    IF _Level IS NULL THEN SET @Level = "''"; ELSE SET @Level = CONCAT("'",_Level,"'"); END IF;
    IF _ImageURL IS NULL THEN SET @ImageURL = "''"; ELSE SET @ImageURL = CONCAT("'",_ImageURL,"'"); END IF;
    IF _Description IS NULL THEN SET @Description = "''"; ELSE SET @Description = CONCAT("'",_Description,"'"); END IF;
    IF _RecordStatus IS NULL THEN SET @RecordStatus = "NULL"; ELSE SET @RecordStatus = _RecordStatus; END IF;
    IF _Search IS NULL THEN SET @Search = "''"; ELSE SET @Search = CONCAT("'",_Search,"'"); END IF;
    IF _Sorting IS NULL OR NOT (
        (_Sorting LIKE 'ID%' OR _Sorting LIKE 'FatherID%' OR _Sorting LIKE 'Name%' OR _Sorting LIKE 'Type%' OR _Sorting LIKE 'Level%') 
        AND (_Sorting LIKE '%ASC' OR _Sorting LIKE '%DESC')
    )THEN SET @Sorting = 'ID ASC'; ELSE SET @Sorting = _Sorting; END IF;
    IF (_PageSize IS NULL OR _PageSize = 0) THEN SET @Size = 1; ELSEIF _PageSize > 50 THEN SET @Size = 50; ELSE SET @Size = _PageSize; END IF;
    IF _PageNo IS NULL OR _PageNo = 0 THEN SET @Offset_ = 0; ELSE SET @Offset_ = @Size * (_PageNo - 1); END IF;
    -- build statements
    SET @WhereStmt = CONCAT("
        WHERE (",@ID," IS NULL OR ",@ID," = `ID`)
            AND is_substr(",@Title,", `Title`) > 0
            AND is_substr(",@Level,", `Level`) > 0
            AND is_substr(",@ImageURL,", `ImageURL`) > 0
            AND is_substr(",@Description,", `Description`) > 0
            AND (
                is_substr(",@Search,", `Title`) > 0
                OR is_substr(",@Search,", `Description`) > 0
                OR is_substr(",@Search,", `Level`) > 0
            )
            AND (",@RecordStatus," IS NULL OR ",@RecordStatus," = `RecordStatus`)
    ");
    SET @TotalStmt = CONCAT('SELECT COUNT(`ID`) FROM `vocab_topics` ',@WhereStmt);
    SET @SortStmt = CONCAT('ORDER BY ', @Sorting, ' ');
    SET @LimitStmt = CONCAT('LIMIT ',@Offset_,', ',@Size);
    SET @QueryStmt = CONCAT('SELECT (',@TotalStmt,') AS TotalRows, `vocab_topics`.* FROM `vocab_topics` ',@WhereStmt, @SortStmt, @LimitStmt);
    -- call query statement
    PREPARE stmt FROM @QueryStmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;


-- There are two type here---------------
-- create Grammar_Post_Section_query procedure
DROP procedure IF EXISTS `gram_post_section_query`;

DELIMITER $$
CREATE PROCEDURE `gram_post_section_query` (
    _ID INT, _ID_topic INT, _Title VARCHAR(32), _Formular VARCHAR(256), _Usage VARCHAR(1024), _Note VARCHAR(256), _RecordStatus TINYINT,
    _Search VARCHAR(32), _Sorting VARCHAR(32), _PageNo INT, _PageSize INT
)
BEGIN
    -- preprocessing input params
    IF _ID IS NULL THEN SET @ID = "NULL"; ELSE SET @ID = _ID; END IF;
    IF _ID_topic IS NULL THEN SET @ID_topic = "NULL"; ELSE SET @ID_topic = _ID_topic; END IF;
    IF _Title IS NULL THEN SET @Title = "''"; ELSE SET @Title = CONCAT("'",_Title,"'"); END IF;
    IF _Formular IS NULL THEN SET @Formular = "''"; ELSE SET @Formular = CONCAT("'",_Formular,"'"); END IF;
    IF _Usage IS NULL THEN SET @Usage = "''"; ELSE SET @Usage = CONCAT("'",_Usage,"'"); END IF;
    IF _Note IS NULL THEN SET @Note = "''"; ELSE SET @Note = CONCAT("'",_Note,"'"); END IF;
    IF _RecordStatus IS NULL THEN SET @RecordStatus = "NULL"; ELSE SET @RecordStatus = _RecordStatus; END IF;
    IF _Search IS NULL THEN SET @Search = "''"; ELSE SET @Search = CONCAT("'",_Search,"'"); END IF;
    IF _Sorting IS NULL OR NOT (
        (_Sorting LIKE 'ID%' OR _Sorting LIKE 'FatherID%' OR _Sorting LIKE 'Name%' OR _Sorting LIKE 'Type%' OR _Sorting LIKE 'Level%') 
        AND (_Sorting LIKE '%ASC' OR _Sorting LIKE '%DESC')
    )THEN SET @Sorting = 'ID ASC'; ELSE SET @Sorting = _Sorting; END IF;
    IF (_PageSize IS NULL OR _PageSize = 0) THEN SET @Size = 1; ELSEIF _PageSize > 50 THEN SET @Size = 50; ELSE SET @Size = _PageSize; END IF;
    IF _PageNo IS NULL OR _PageNo = 0 THEN SET @Offset_ = 0; ELSE SET @Offset_ = @Size * (_PageNo - 1); END IF;
    -- build statements
    SET @WhereStmt = CONCAT("
        WHERE (",@ID," IS NULL OR ",@ID," = `ID`)
            AND (is_substr(",@ID_topic,", `ID_topic`) > 0)
            AND is_substr(",@Title,", `Title`) > 0
			AND is_substr(",@Formular,", `Formular`) > 0
            AND is_substr(",@Usage,", `Usage`) > 0
            AND is_substr(",@Note,", `Note`) > 0
            AND (
                is_substr(",@Search,", `Title`) > 0
                OR is_substr(",@Search,", `ID`) > 0
                OR is_substr(",@Search,", `ID_topic`) > 0
            )
            AND (",@RecordStatus," IS NULL OR ",@RecordStatus," = `RecordStatus`)
    ");
    SET @TotalStmt = CONCAT('SELECT COUNT(`ID`) FROM `gram_post_section` ',@WhereStmt);
    SET @SortStmt = CONCAT('ORDER BY ', @Sorting, ' ');
    SET @LimitStmt = CONCAT('LIMIT ',@Offset_,', ',@Size);
    SET @QueryStmt = CONCAT('SELECT (',@TotalStmt,') AS TotalRows, `gram_post_section`.* FROM `gram_post_section` ',@WhereStmt, @SortStmt, @LimitStmt);
    -- call query statement
    PREPARE stmt FROM @QueryStmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- create Grammar_Post_Section_Example table procedure
DROP procedure IF EXISTS `gram_post_section_example`;

DELIMITER $$
CREATE PROCEDURE `gram_post_section_example` (
    _ID INT, _ID_section INT, _ImageURL VARCHAR(256), _Example VARCHAR(1024), _RecordStatus TINYINT,
    _Search VARCHAR(32), _Sorting VARCHAR(32), _PageNo INT, _PageSize INT
)
BEGIN
    -- preprocessing input params
    IF _ID IS NULL THEN SET @ID = "NULL"; ELSE SET @ID = _ID; END IF;
    IF _ID_section IS NULL THEN SET @ID_section = "NULL"; ELSE SET @ID_section = _ID_section; END IF;
    IF _ImageURL IS NULL THEN SET @ImageURL = "''"; ELSE SET @ImageURL = CONCAT("'",_ImageURL,"'"); END IF;
    IF _Example IS NULL THEN SET @Example = "''"; ELSE SET @Example = CONCAT("'",_Example,"'"); END IF;
    IF _RecordStatus IS NULL THEN SET @RecordStatus = "NULL"; ELSE SET @RecordStatus = _RecordStatus; END IF;
    IF _Search IS NULL THEN SET @Search = "''"; ELSE SET @Search = CONCAT("'",_Search,"'"); END IF;
    IF _Sorting IS NULL OR NOT (
        (_Sorting LIKE 'ID%' OR _Sorting LIKE 'FatherID%' OR _Sorting LIKE 'Name%' OR _Sorting LIKE 'Type%' OR _Sorting LIKE 'Level%') 
        AND (_Sorting LIKE '%ASC' OR _Sorting LIKE '%DESC')
    )THEN SET @Sorting = 'ID ASC'; ELSE SET @Sorting = _Sorting; END IF;
    IF (_PageSize IS NULL OR _PageSize = 0) THEN SET @Size = 1; ELSEIF _PageSize > 50 THEN SET @Size = 50; ELSE SET @Size = _PageSize; END IF;
    IF _PageNo IS NULL OR _PageNo = 0 THEN SET @Offset_ = 0; ELSE SET @Offset_ = @Size * (_PageNo - 1); END IF;
    -- build statements
    SET @WhereStmt = CONCAT("
        WHERE (",@ID," IS NULL OR ",@ID," = `ID`)
            AND (is_substr(",@ID_section,", `ID_section`) > 0)
            AND is_substr(",@ImageURL,", `ImageURL`) > 0
			AND is_substr(",@Example,", `Example`) > 0
            AND (
                is_substr(",@Search,", `ID_section`) > 0
                OR is_substr(",@Search,", `ID`) > 0
            )
            AND (",@RecordStatus," IS NULL OR ",@RecordStatus," = `RecordStatus`)
    ");
    SET @TotalStmt = CONCAT('SELECT COUNT(`ID`) FROM `gram_post_section_example` ',@WhereStmt);
    SET @SortStmt = CONCAT('ORDER BY ', @Sorting, ' ');
    SET @LimitStmt = CONCAT('LIMIT ',@Offset_,', ',@Size);
    SET @QueryStmt = CONCAT('SELECT (',@TotalStmt,') AS TotalRows, `gram_post_section_example`.* FROM `gram_post_section_example` ',@WhereStmt, @SortStmt, @LimitStmt);
    -- call query statement
    PREPARE stmt FROM @QueryStmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;


-- Tye 2
-- create Grammar_Post_Section_query procedure
DROP procedure IF EXISTS `gram_post_section_query`;

DELIMITER $$
CREATE PROCEDURE `gram_post_section_query` (
    _fatherID INT
)
BEGIN
    -- preprocessing input params
    IF _fatherID IS NULL THEN SET @ID_topic = "NULL"; ELSE SET @ID_topic = _fatherID; END IF;
    -- build statements
    SET @WhereStmt = CONCAT("
          WHERE `ID_topic` = ",@ID_topic);
    SET @TotalStmt = CONCAT('SELECT COUNT(`ID`) FROM `gram_post_section` ',@WhereStmt);
    SET @QueryStmt = CONCAT('SELECT (',@TotalStmt,') AS TotalRows, `gram_post_section`.* FROM `gram_post_section` ',@WhereStmt);
    -- call query statement
    PREPARE stmt FROM @QueryStmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- create Grammar_Post_Section_Example table procedure
DROP procedure IF EXISTS `gram_post_section_example`;

DELIMITER $$
CREATE PROCEDURE `gram_post_section_example` (
    _fatherID INT
)
BEGIN
    -- preprocessing input params
    IF _fatherID IS NULL THEN SET @ID_section = "NULL"; ELSE SET @ID_section = _fatherID; END IF;
    -- build statements
    SET @WhereStmt = CONCAT("
        WHERE  `ID_section` = ",@ID_section);
    SET @TotalStmt = CONCAT('SELECT COUNT(`ID`) FROM `gram_post_section_example` ',@WhereStmt);
    SET @QueryStmt = CONCAT('SELECT (',@TotalStmt,') AS TotalRows, `gram_post_section_example`.* FROM `gram_post_section_example` ',@WhereStmt);
    -- call query statement
    PREPARE stmt FROM @QueryStmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;



-- create vocab_by_topic table procedure
DROP procedure IF EXISTS `vocab_by_topic`;

DELIMITER $$
CREATE PROCEDURE `vocab_by_topic` (
    _fatherID INT
)
BEGIN
    -- preprocessing input params
    IF _fatherID IS NULL THEN SET @ID_topic = "NULL"; ELSE SET @ID_topic = _fatherID; END IF;
    -- build statements
    SET @WhereStmt = CONCAT("
        WHERE (is_substr(",@ID_topic,", `ID_topic`) > 0)
    ");
    SET @TotalStmt = CONCAT('SELECT COUNT(`ID`) FROM `vocab_by_topic` ',@WhereStmt);
    SET @QueryStmt = CONCAT('SELECT (',@TotalStmt,') AS TotalRows, `vocab_by_topic`.* FROM `vocab_by_topic` ',@WhereStmt);
    -- call query statement
    PREPARE stmt FROM @QueryStmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- create vocab_by_topic table procedure 2 WITH PAGINATION FLASHCARD
DROP procedure IF EXISTS `vocab_by_topic`;

DELIMITER $$
CREATE PROCEDURE `vocab_by_topic` (
    _fatherID INT
)
BEGIN
    -- preprocessing input params
    IF _fatherID IS NULL THEN SET @ID_topic = "NULL"; ELSE SET @ID_topic = _fatherID; END IF;
    -- build statements
    SET @WhereStmt = CONCAT("
        WHERE `ID_topic` = ",@ID_topic);
    SET @TotalStmt = CONCAT('SELECT COUNT(`ID`) FROM `vocab_by_topic` ',@WhereStmt);
    SET @QueryStmt = CONCAT('SELECT (',@TotalStmt,') AS TotalRows, `vocab_by_topic`.* FROM `vocab_by_topic` ',@WhereStmt);
    -- call query statement
    PREPARE stmt FROM @QueryStmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- create quiz_table_query procedure
DROP procedure IF EXISTS `quiz_table_query`;

DELIMITER $$
CREATE PROCEDURE `quiz_table_query` (
    _Search VARCHAR(32), _Sorting VARCHAR(32), _PageNo INT, _PageSize INT
)
BEGIN
    -- preprocessing input params
    IF _Search IS NULL THEN SET @Search = "''"; ELSE SET @Search = CONCAT("'",_Search,"'"); END IF;
    IF _Sorting IS NULL OR NOT (
        (_Sorting LIKE 'ID%') 
        AND (_Sorting LIKE '%ASC' OR _Sorting LIKE '%DESC')
    )THEN SET @Sorting = 'ID ASC'; ELSE SET @Sorting = _Sorting; END IF;
    IF (_PageSize IS NULL OR _PageSize = 0) THEN SET @Size = 1; ELSEIF _PageSize > 50 THEN SET @Size = 50; ELSE SET @Size = _PageSize; END IF;
    IF _PageNo IS NULL OR _PageNo = 0 THEN SET @Offset_ = 0; ELSE SET @Offset_ = @Size * (_PageNo - 1); END IF;
    -- build statements   
    SET @TotalStmt = CONCAT('SELECT COUNT(`ID`) FROM `quiz` ');
    SET @SortStmt = CONCAT('ORDER BY ', @Sorting, ' ');
    SET @LimitStmt = CONCAT('LIMIT ',@Offset_,', ',@Size);
    SET @QueryStmt = CONCAT('SELECT (',@TotalStmt,') AS TotalRows, `quiz`.* FROM `quiz` ', @SortStmt, @LimitStmt);
    -- call query statement
    PREPARE stmt FROM @QueryStmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- create account_table_create procedure
DROP procedure IF EXISTS `account_table_create`;

DELIMITER $$
CREATE PROCEDURE `account_table_create` (
    _Username VARCHAR(32), _Password VARCHAR(32),
    _Name VARCHAR(64), _Email VARCHAR(64)
)
account_create:BEGIN
    -- preprocessing input params
    SET _Username = LTRIM(RTRIM(_Username));
    SET _Password = LTRIM(RTRIM(_Password));
    IF _Username IS NULL THEN SET _Username = ''; END IF;
    IF _Password IS NULL THEN SET _Password = ''; END IF;
    -- checking parameters
    IF (
        _Username IS NULL OR _Username = '' OR
        _Password IS NULL OR _Password = ''
    ) THEN
		SELECT -20 Result, 'Input enough information' ErrorDesc;
		LEAVE account_create;
    END IF;
    IF EXISTS (SELECT 1 FROM `account` WHERE _Username = `Username`) THEN
		SELECT -21 Result, 'Duplicated user name for insert account' ErrorDesc;
		LEAVE account_create;
	END IF;
    -- create new account
    INSERT INTO `account` (`Username`, `Password`, `Role`) VALUES (_Username, UNHEX(SHA1(_Password)), 1);
	SET @AccountID = (SELECT LAST_INSERT_ID());
    
    -- create new info
    INSERT INTO `userInfo` (`ID_account`, `Name`, `Email`) VALUES (@AccountID, _Name, _Email);
    -- create new scoreInfo    
    INSERT INTO `user_scoreInfo` (`ID_account`) VALUES (@AccountID);
    -- create first lesson by default A1 data
    	INSERT INTO  todaylessons (`ID_account`, `ID_lesson`) VALUES (@AccountID, 1);


    SELECT @AccountID Result, 'Last username inserted' ErrorDesc;
END$$

DELIMITER ;


-- create quiz_question table procedure
DROP procedure IF EXISTS `quiz_question_query`;

DELIMITER $$
CREATE PROCEDURE `quiz_question_query` (
    _fatherID INT
)
BEGIN
    -- preprocessing input params
    IF _fatherID IS NULL THEN SET @ID_quiz = "NULL"; ELSE SET @ID_quiz = _fatherID; END IF;
    -- build statements
    SET @WhereStmt = CONCAT("
        WHERE (@ID_quiz = `ID_quiz`)
    ");
    SET @TotalStmt = CONCAT('SELECT COUNT(`ID`) FROM `quiz_question` ',@WhereStmt);
    SET @QueryStmt = CONCAT('SELECT (',@TotalStmt,') AS TotalRows, `quiz_question`.* FROM `quiz_question` ',@WhereStmt);
    -- call query statement
    PREPARE stmt FROM @QueryStmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- create quiz_info_byID table procedure
DROP procedure IF EXISTS `quiz_info_byID`;

DELIMITER $$
CREATE PROCEDURE `quiz_info_byID` (
    _fatherID INT
)
BEGIN
    -- preprocessing input params
    IF _fatherID IS NULL THEN SET @ID_section = "NULL"; ELSE SET @ID_section = _fatherID; END IF;
    -- build statements
    SET @WhereStmt = CONCAT("
        WHERE (@ID_section = `ID`)
    ");
    SET @TotalStmt = CONCAT('SELECT COUNT(`ID`) FROM `quiz` ',@WhereStmt);
    SET @QueryStmt = CONCAT('SELECT (',@TotalStmt,') AS TotalRows, `quiz`.* FROM `quiz` ',@WhereStmt);
    -- call query statement
    PREPARE stmt FROM @QueryStmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;


-- user_info_query table procedure
DROP procedure IF EXISTS `user_info_query`;

DELIMITER $$
CREATE PROCEDURE `user_info_query` (
    _ID INT
)
BEGIN
    
    SELECT *, COUNT(*) AS TotalRows
FROM (SELECT ID, ID_account, Score, PostLeft, Level, FIND_IN_SET( Score, (
    SELECT GROUP_CONCAT( Score
	ORDER BY Score DESC ) 
	FROM user_scoreinfo )
	) AS Score_Rank
	FROM user_scoreinfo
	WHERE ID_account =  _ID   ) AS newscoretable
INNER JOIN userInfo ON userInfo.ID_account= newscoretable.ID_account
INNER JOIN account ON account.ID = newscoretable.ID_account
WHERE newscoretable.ID_account = _ID;
    
END$$
DELIMITER ;

-- create user_info_update procedure
DROP procedure IF EXISTS `user_info_update`;

DELIMITER $$
CREATE PROCEDURE `user_info_update` (
    _IDaccount INT, _Name VARCHAR(64), _Email VARCHAR(64), _Phone VARCHAR(64), _Image VARCHAR(1024), _Address VARCHAR(1024), _About  VARCHAR(1024)
)
userInfo_update:BEGIN
    -- create new product
    UPDATE `userInfo` SET `Name` = _Name, `Email` = _Email, `Phone` = _Phone, `Image` = _Image, `Address` = _Address, `About` = _About
    WHERE _IDaccount = `ID_account`;

    SELECT _IDaccount Result, 'Last account info updated' ErrorDesc;
END$$

DELIMITER ;

-- create question_create procedure
DROP procedure IF EXISTS `question_create`;

DELIMITER $$
CREATE PROCEDURE `question_create` (
    _Question VARCHAR(64), _Topic VARCHAR(16),
    _Detail VARCHAR(1024), _IDaccount INT
)
account_create:BEGIN
    -- create new account
    INSERT INTO `question` (`Question`, `Topic`, `Detail`, `ID_account`, `Time`) VALUES (_Question, _Topic, _Detail, _IDaccount, now());
	SET @ID = (SELECT LAST_INSERT_ID());

    SELECT @ID Result, 'Last username inserted' ErrorDesc;
END$$

DELIMITER ;


-- create question_query procedure
DROP procedure IF EXISTS `question_query`;

DELIMITER $$
CREATE PROCEDURE `question_query` (
   _ID INT, _Search VARCHAR(32), _Sorting VARCHAR(32), _PageNo INT, _PageSize INT
)
BEGIN
    -- preprocessing input params
	IF _ID IS NULL THEN SET @ID = "NULL"; ELSE SET @ID = _ID; END IF;
    IF _Search IS NULL THEN SET @Search = "''"; ELSE SET @Search = CONCAT("'",_Search,"'"); END IF;
    IF _Sorting IS NULL OR NOT(_Sorting LIKE '%ASC' OR _Sorting LIKE '%DESC')
    THEN SET @Sorting = 'ID DESC'; ELSE SET @Sorting = _Sorting; END IF;
    IF (_PageSize IS NULL OR _PageSize = 0) THEN SET @Size = 1; ELSEIF _PageSize > 50 THEN SET @Size = 50; ELSE SET @Size = _PageSize; END IF;
    IF _PageNo IS NULL OR _PageNo = 0 THEN SET @Offset_ = 0; ELSE SET @Offset_ = @Size * (_PageNo - 1); END IF;
    -- build statements
    SET @WhereStmt = CONCAT("
        WHERE (",@ID," IS NULL OR ",@ID," = `ID`) AND (
                is_substr(",@Search,", `Question`) > 0
                OR is_substr(",@Search,", `Topic`) > 0
            )
    ");
    SET @TotalStmt = CONCAT('SELECT COUNT(`ID`) FROM `question` ',@WhereStmt);
    SET @SortStmt = CONCAT('ORDER BY ', @Sorting, ' ');
    SET @LimitStmt = CONCAT('LIMIT ',@Offset_,', ',@Size);
    SET @QueryStmt = CONCAT('SELECT (',@TotalStmt,') AS TotalRows, `question`.* FROM `question` ',@WhereStmt, @SortStmt, @LimitStmt);
    -- call query statement
    PREPARE stmt FROM @QueryStmt;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- create question_create procedure
DROP procedure IF EXISTS `answer_create`;

DELIMITER $$
CREATE PROCEDURE `answer_create` (
    _Detail VARCHAR(1024), _IDaccount INT, _IDquestion INT
)
account_create:BEGIN
    -- create new answer
    INSERT INTO `answer` (`ID_question`, `Detail`, `ID_account`, `Time`) VALUES (_IDquestion, _Detail, _IDaccount, now());
	SET @ID = (SELECT LAST_INSERT_ID());
    UPDATE `question` SET `NumberOfAnswer`= `NumberOfAnswer` + 1 WHERE `ID` =_IDquestion;

    SELECT @ID Result, 'Last username inserted' ErrorDesc;
END$$

DELIMITER ;

-- create answer_query procedure
DROP procedure IF EXISTS `answer_query`;

DELIMITER $$
CREATE PROCEDURE `answer_query` (
    _IDquestion INT
)
BEGIN
    SET @TotalStmt = (SELECT COUNT(`ID`) FROM `answer` WHERE `ID_question`= _IDquestion);
    SELECT *, @TotalStmt AS TotalRows FROM `answer` WHERE `ID_question`= _IDquestion;
END$$

DELIMITER ;

