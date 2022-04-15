CREATE TABLE "User"
(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password VARCHAR(30),
    first_name VARCHAR(30),
    last_name VARCHAR(30)
);

CREATE TABLE CreditCard (
    card_id SERIAL PRIMARY KEY,
    card_holder_name VARCHAR(40),
    card_number VARCHAR(16),
    expiration_date VARCHAR(5),
	card_user_id Serial REFERENCES "User"(user_id) ON DELETE CASCADE
);

CREATE TABLE Author (
    authorKey INT PRIMARY KEY,
    firstName VARCHAR,
    lastName VARCHAR,
    publisher VARCHAR,
    biography VARCHAR
);

CREATE TABLE Book (
    ISBN INT PRIMARY KEY,
    authorID INT REFERENCES Author(authorKey),
    bookName VARCHAR,
    bookDescription VARCHAR,
    bookPrice INT,
    bookGenre VARCHAR,
    bookPublisher VARCHAR,
    yearPublished INT,
    copiesSold INT
);

CREATE TABLE Wishlist (
    wishlist_id SERIAL PRIMARY KEY,
    wishlist_name VARCHAR NOT NULL,
    user_id Serial REFERENCES "User"(user_id) NOT NULL,
    ISBN INT REFERENCES Book(ISBN)
);

CREATE TABLE Reviews(
    review_id SERIAL PRIMARY KEY,
    rating_score integer CHECK (rating_score BETWEEN 1 AND 5),
    date_stamp date,
    review_text VARCHAR,
    review_user int, 
    review_ISBN int,
    FOREIGN KEY (review_user) REFERENCES "User" (user_id),
    FOREIGN KEY (review_ISBN) REFERENCES Book (ISBN)
);

CREATE TABLE PurchasedBook(
    purchashed_id SERIAL PRIMARY KEY,
    purchased_user_id Serial REFERENCES "User"(user_id) ON DELETE CASCADE,
    purchased_book Serial REFERENCES Book(ISBN) ON DELETE CASCADE

);

CREATE TABLE ShoppingCart (
    cart_id SERIAL PRIMARY KEY,
    user_id Serial REFERENCES "User"(user_id) NOT NULL,
    ISBN Serial REFERENCES Book(ISBN) ON DELETE CASCADE,
    quantity INT NOT NULL,
    price INT
);