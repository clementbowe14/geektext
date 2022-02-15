

CREATE DATABASE geektext;

CREATE TABLE "User" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password VARCHAR(30),
    first_name VARCHAR(30),
    last_name VARCHAR(30)
);

CREATE TABLE CreditCard (
    card_id SERIAL PRIMARY KEY,
    card_number VARCHAR(16),
    expiration_date VARCHAR(5),
	card_user_id Serial REFERENCES "User"(user_id) ON DELETE CASCADE
);