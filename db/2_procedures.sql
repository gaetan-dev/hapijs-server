use StarterHapi;

-- --------------------------------------------------------------------------------
-- 								PS_ReadAllUsers
-- --------------------------------------------------------------------------------

Drop procedure if exists `PS_ReadAllUsers`;

DELIMITER |
CREATE PROCEDURE `PS_ReadAllUsers` ()
	SELECT * FROM `User`;
|
DELIMITER ;

-- --------------------------------------------------------------------------------
-- 								PS_ReadUserById
-- --------------------------------------------------------------------------------

Drop procedure if exists `PS_ReadUserById`;

DELIMITER |
CREATE PROCEDURE `PS_ReadUserById` (
	in P_Id VARCHAR(50)
)
	SELECT * FROM `User` WHERE Id = P_Id;
|
DELIMITER ;

-- --------------------------------------------------------------------------------
-- 								PS_CreateUser
-- --------------------------------------------------------------------------------

Drop procedure if exists `PS_CreateUser`;

DELIMITER |
CREATE PROCEDURE `PS_CreateUser` (
	in P_Id VARCHAR(50),
	in P_Email varchar(255),
	in P_Password varchar(255)
)
BEGIN
	INSERT INTO `User`( Id, Email, Password )
	VALUES ( P_Id, P_Email, P_Password );
    
    CALL PS_ReadUserById(P_Id); 
END |
DELIMITER ;

-- --------------------------------------------------------------------------------
-- 								PS_UpdateUser
-- --------------------------------------------------------------------------------

Drop procedure if exists `PS_UpdateUser`;

DELIMITER |
CREATE PROCEDURE `PS_UpdateUser` (
	in P_Id VARCHAR(50),
	in P_Email varchar(255),
	in P_Password varchar(255)
)
BEGIN
	UPDATE `User` SET Email = P_Email, Password = P_Password
    WHERE Id = P_Id;
    
    CALL PS_ReadUserById(P_Id); 
END |
DELIMITER ;

-- --------------------------------------------------------------------------------
-- 								PS_DeleteUser
-- --------------------------------------------------------------------------------

Drop procedure if exists `PS_DeleteUser`;

DELIMITER |
CREATE PROCEDURE `PS_DeleteUser` (
	in P_Id VARCHAR(50)
)
	DELETE FROM `User` WHERE id = P_id; 
|
DELIMITER ;