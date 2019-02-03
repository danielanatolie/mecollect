DROP DATABASE IF EXISTS myproperty;
CREATE DATABASE myproperty;

\c myproperty;

CREATE TABLE user_data (
    email VARCHAR PRIMARY KEY,
    password VARCHAR,
    firstName VARCHAR,
    lastName VARCHAR
);

INSERT INTO user_data VALUES ('daniel.anatolie@gmail.com', 'password', 'Daniel', 'Anatolie');
