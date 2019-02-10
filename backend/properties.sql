DROP DATABASE IF EXISTS myproperty;
CREATE DATABASE myproperty;

\c myproperty;

CREATE TABLE UserTypes (
    userTypeID int PRIMARY KEY,
    userType VARCHAR
);

INSERT INTO UserTypes (userTypeID, userType) VALUES
(1, 'Admin'),
(2, 'Buyer'),
(3, 'Seller'),
(4, 'Agent');

CREATE TABLE UserData (
    userID SERIAL PRIMARY KEY,
    email VARCHAR,
    userPassword VARCHAR,
    firstName VARCHAR,
    lastName VARCHAR,
    phoneNumber float,
    userTypeID int,
    deleted boolean DEFAULT false,
    FOREIGN KEY (userTypeID) REFERENCES UserTypes (userTypeID)
);

INSERT INTO UserData (email, userPassword, firstName, lastName, phoneNumber, userTypeID) VALUES 
('alex.ford123@gmail.com', 'password', 'Alex', 'Ford', 2505555556, 1),
('daniel.anatolie@gmail.com', 'password', 'Daniel', 'Anatolie', 2505555556, 1),
('agent1@agent.com', 'agent123', 'John', 'Doe', 2501231234, 4),
('buyer1@buyer.com', 'buyer123', 'Jane', 'Doe', 2501231235, 2),
('seller1@seller.com', 'seller123', 'Josh', 'Doe', 2501231236, 3);

CREATE TABLE Agents (
    agentID int PRIMARY KEY,
    rating int,
    FOREIGN KEY (agentID) REFERENCES UserData (userID)
); 

INSERT INTO Agents (agentID, rating) VALUES
(3, 8);

CREATE TABLE PropertyTypes (
    propertyTypeID int PRIMARY KEY,
    propertyType VARCHAR
);

INSERT INTO PropertyTypes (propertyTypeID, propertyType) VALUES
(1, 'Land'),
(2, 'Commercial'),
(3, 'Residential');

CREATE TABLE Locations (
    locationID int PRIMARY KEY,
    city VARCHAR,
    province VARCHAR,
    country VARCHAR
);

INSERT INTO Locations (locationID, city, province, country) VALUES
(1, 'Vancouver', 'BC', 'Canada'),
(2, 'Toronto', 'ON', 'Canada'),
(3, 'Calgary', 'AB', 'Canada');

CREATE TABLE PropertyLocationInfo (
    propertyID int PRIMARY KEY,
    houseNumber int,
    postalCode VARCHAR,
    locationID int,
    FOREIGN KEY (locationID) REFERENCES Locations (locationID) 
);

INSERT INTO PropertyLocationInfo (propertyID, houseNumber, postalCode, locationID) VALUES
(1, 1234, 'VX1VN5', 1);

CREATE TABLE Properties (
    propertyID SERIAL PRIMARY KEY,
    originalPrice float,
    size int,
    yearBuilt int,
    propertyTypeID int,
    typeIDIndex int,
    FOREIGN KEY (propertyTypeID) REFERENCES PropertyTypes (propertyTypeID), 
    FOREIGN KEY (propertyID) REFERENCES PropertyLocationInfo (propertyID)
);

INSERT INTO Properties (originalPrice, size, yearBuilt, propertyTypeID, typeIDIndex) VALUES
(950000, 3000, 2007, 3, 1);

CREATE TABLE Land (
    landID int PRIMARY KEY,
    landType VARCHAR
);
 
CREATE TABLE Commercial (
    companyID int PRIMARY KEY,
    company VARCHAR
);

INSERT INTO Commercial (companyID, company) VALUES
(1, 'Subway');

CREATE TABLE Residential (
    resTypeID int PRIMARY KEY,
    numBeds int,
    numBaths int
);

INSERT INTO Residential (resTypeID, numBeds, numBaths) VALUES
(1, 4, 4);


CREATE TABLE PaymentInfo (
    paymentNumber int PRIMARY KEY,
    methodType int,
    amount float
);

INSERT INTO PaymentInfo (paymentNumber, methodType, amount) VALUES
(1, 1, 1000000);

CREATE TABLE BuyingAgreements (
    orderNumber SERIAL PRIMARY KEY,
    userID int,
    signDate date,
    listedPrice float,
    propertyID int,
    paymentNumber int,
    FOREIGN KEY (propertyID) REFERENCES Properties (propertyID),
    FOREIGN KEY (userID) REFERENCES UserData (userID),
    FOREIGN KEY (paymentNumber) REFERENCES PaymentInfo (paymentNumber)  
);

INSERT INTO BuyingAgreements (orderNumber, userID, signDate, listedPrice, propertyID) VALUES
(1, 4, '2019-12-28', 1000000, 1);

CREATE TABLE PaymentMethod (
    paymentMethodID int PRIMARY KEY,
    paymentMethod VARCHAR
);

INSERT INTO PaymentMethod (paymentMethodID, paymentMethod) VALUES
(1, 'Visa'),
(2, 'MasterCard'),
(3, 'PayPal');