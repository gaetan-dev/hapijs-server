use StarterHapi;

SET FOREIGN_KEY_CHECKS = 0; 
TRUNCATE `User`; 
SET FOREIGN_KEY_CHECKS = 1;

-- -------------------------------------------------------
-- 						PS_CreateUser
-- -------------------------------------------------------

CALL PS_CreateUser 
(
'1',
'aaa@mail.com',
'123456')
;

-- -------------------------------------------------------
-- 						PS_CreateUser
-- -------------------------------------------------------

CALL PS_CreateUser 
(
'2',
'bbb@mail.com',
'abcdef')
;

-- -------------------------------------------------------
-- 						PS_CreateUser
-- -------------------------------------------------------

CALL PS_CreateUser 
(
'3',
'ccc@mail.com',
'abcdef')
;

-- -------------------------------------------------------
-- 						PS_CreateUser
-- -------------------------------------------------------

CALL PS_CreateUser 
(
'4',
'eee@mail.com',
'abcdef')
;

-- -------------------------------------------------------
-- 						PS_CreateUser
-- -------------------------------------------------------

CALL PS_CreateUser 
(
'5',
'fff@mail.com',
'abcdef')
;

-- -------------------------------------------------------
-- 						PS_CreateUser
-- -------------------------------------------------------

CALL PS_CreateUser 
(
'6',
'ggg@mail.com',
'abcdef')
;

-- -------------------------------------------------------
-- 						PS_CreateUser
-- -------------------------------------------------------

CALL PS_CreateUser 
(
'7',
'hhh@mail.com',
'abcdef')
;

-- -------------------------------------------------------
-- 						PS_CreateUser
-- -------------------------------------------------------

CALL PS_CreateUser 
(
'8',
'iii@mail.com',
'abcdef')
;