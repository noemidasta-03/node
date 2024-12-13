CREATE TABLE IF NOT EXISTS Books (
    book_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    genre TEXT,
    published_year INTEGER,
    isbn INTEGER,
    price REAL,
    rating REAL,
    stock_count INTEGER
);

ALTER TABLE Books ADD publisher TEXT;
ALTER TABLE Books ADD pages INTEGER;

INSERT INTO Books (title, author, genre, published_year, isbn, price, rating, stock_count, publisher, pages) VALUES ('A Journey to the Center', 'Jules Verne' , 'Adventure', 1864, 1234567890123, 12.99, 4.5, 10, 'Verne Publishing', 350),('War and Peace', 'Leo Tolstoy' , 'Historical', 1869, 1234567890124, 14.99, 4.8, 5, 'Tolstoy Prints', 1200),('Whispers of the Wind', 'Amelia Blackburn' , 'Romance', 1982, 1234567890125, 9.99, 4.2, 20, 'Blackburn House', 275),('The Galactic Odyssey', 'Orion Starfield' , 'Science Fiction', 2005, 1234567890126, 19.99, 4.9, 15, 'Nebula Press', 450);

UPDATE Books SET stock_count = 1199 WHERE book_id = 2;

GRANT SELECT UPDATE ON Books TO 'martin'@'localhost'
REVOKE UPDATE ON Books TO 'martin'@'localhost'

BEGIN TRANSACTION;
DELETE FROM Books WHERE book_id = 1;
COMMIT;

BEGIN TRANSACTION;
DELETE FROM Books WHERE book_id = 2;
ROLLBACK;