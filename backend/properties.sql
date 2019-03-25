DROP DATABASE IF EXISTS myproperty;
CREATE DATABASE myproperty;

\c myproperty;

CREATE TABLE property (
	propertyNumber int,
	originalPrice float,
	propertyAddress VARCHAR,	
	yearBuilt int,
	propertyType VARCHAR,
	totalBeds int,
	totalBaths int,
	ownerEmail VARCHAR,
	PRIMARY KEY (propertyNumber)
);

INSERT INTO property (propertyNumber, originalPrice, propertyAddress, yearbuilt, propertyType, totalBeds, totalBaths, ownerEmail) VALUES 
(12381, 1000000.0, '1 test a5te California', 2018, 'mansion', 10, 3, NULL),
(12382, 2000000.0, '1 test a5te2 New York', 2018, 'mansion', 10, 5, 'test2@gmail.com'),
(12383, 1000000.0, '1 test a5te3 Vancouver', 2018, 'mansion', 10, 2, 'test2@gmail.com'),
(12384, 3000000.0, '1 test a5te4 Toronto', 2018, 'mansion', 10, 1, NULL),
(12385, 5000000.0, '1 test a5te5 Los Angeles', 2018, 'mansion', 10, 7, 'test2@gmail.com');

CREATE TABLE account (
	email VARCHAR,
	permissions VARCHAR,
	accountName VARCHAR,
	accountPassword VARCHAR,	
	phone VARCHAR,
	rating int,
	PRIMARY KEY (email)
);

INSERT INTO account (email, permissions, accountName, accountPassword, phone, rating) VALUES 
('test1@gmail.com', 'agent', 'John Smith', 'password123', '1', 5),
('test2@gmail.com', 'seller', 'Susanne', '12345', '2', 3),
('test3@gmail.com', 'buyer', 'Test User', 'password123', '3', 5),
('test4@gmail.com', 'agent', 'Test User2', 'password123', '4', 2),
('test5@gmail.com', 'buyer', 'Test User3', 'password123', '5', 1);


CREATE TABLE orders (
	orderNumber int,
	date VARCHAR,
	email VARCHAR,
	listedPrice float,
	propertyNumber int,
	status VARCHAR,
	PRIMARY KEY (orderNumber),
	FOREIGN KEY (email) REFERENCES account(email) ON DELETE CASCADE,
    FOREIGN KEY (propertyNumber) REFERENCES  property(propertyNumber) ON DELETE NO ACTION
);

ALTER TABLE orders DROP CONSTRAINT orders_propertynumber_fkey;
ALTER TABLE orders DROP CONSTRAINT orders_email_fkey;

INSERT INTO orders (orderNumber, date, email, listedprice, propertyNumber, status) VALUES
(102, 'Mon. Feb. 25, 2019', 'test1@gmail.com', 1000000, 12381, 'approved'), 
(105, 'Mon. Feb. 25, 2019', 'test2@gmail.com', 2000000, 12382, 'pending'),
(12, 'Mon. Feb. 25, 2019', 'test3@gmail.com', 500000, 12383, 'pending'),
(32, 'Mon. Feb. 25, 2019', 'test4@gmail.com', 5000000, 12384, 'pending'),
(421, 'Mon. Feb. 25, 2019', 'test5@gmail.com', 1000000, 12385, 'pending');

CREATE TABLE payments (
	paymentNumber int,
	orderNumber int,
	method VARCHAR,
	amount float,
    PRIMARY KEY (paymentNumber, orderNumber),
    FOREIGN KEY (orderNumber) REFERENCES orders (orderNumber) ON DELETE CASCADE
);

INSERT INTO payments (paymentNumber, orderNumber, method, amount) VALUES
(1, 102, 'Visa', 100000),
(2, 105, 'Mastercard', 150000),
(3, 12, 'Visa', 55000),
(4, 32, 'Visa', 45000),
(5, 421, 'Bitcoin', 3.53);
