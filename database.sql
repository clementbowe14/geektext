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

CREATE TABLE Book (
    ISBN INT PRIMARY KEY,
    authorID INT REFERENCES Author (authorKey),
    bookName VARCHAR,
    bookDescription VARCHAR,
    bookPrice INT,
    bookGenre VARCHAR,
    bookPublisher VARCHAR,
    yearPublished INT
    copiesSold INT,
);

CREATE TABLE Author (
    authorKey INT PRIMARY KEY,
    firstName VARCHAR,
    lastName VARCHAR,
    publisher VARCHAR,
    biography VARCHAR,
);

CREATE TABLE Wishlist (
    wishlist_id SERIAL PRIMARY KEY,
    user_id Serial REFERENCES "User"(user_id) NOT NULL,
    ISBN INT[] REFERENCES Book(ISBN) NOT NULL
);

CREATE TABLE ReviewedBooks(
    review_id integer SERIAL PRIMARY KEY,
    rating_score integer,
    date_stamp date,
    review_text VARCHAR,
 	review_user_id Serial REFERENCES "User"(user_id) ON DELETE CASCADE,
	review_ISBN Serial REFERENCES "Book"(ISBN) ON DELETE CASCADE
);

CREATE TABLE ShoppingCart (
    cart_id INT PRIMARY KEY,
    user_id Serial REFERENCES "User"(user_id) NOT NULL,
    ISBN Serial REFERENCES "Book"(ISBN) ON DELETE CASCADE, 
    quantity INT NOT NULL,
    price INT,
    created_date date

);
