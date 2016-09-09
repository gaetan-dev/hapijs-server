Drop database IF EXISTS StarterHapi;
CREATE DATABASE StarterHapi;

use StarterHapi;

-- User
Create Table User (
Id varchar(50) NOT NULL,
Email varchar(255) NOT NULL,
Password varchar(255) NOT NULL,
PRIMARY KEY (Id)
);