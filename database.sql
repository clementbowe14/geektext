

CREATE DATABASE geektext;

CREATE TABLE "User" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password VARCHAR(30),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
);

CREATE TABLE CreditCard (
    card_id SERIAL PRIMARY KEY,
    card_number VARCHAR(16),
    expiration_date VARCHAR(5),
	card_user_id Serial REFERENCES "User"(user_id) ON DELETE CASCADE
);

CREATE TABLE Wishlist (
    wishlist_id SERIAL PRIMARY KEY,
    user_id Serial REFERENCES "User"(user_id) NOT NULL,
    ISBN INT[] REFERENCES Book(ISBN) NOT NULL
)