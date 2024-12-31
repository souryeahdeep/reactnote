CREATE TABLE items(
   id SERIAL PRIMARY KEY NOT NULL,
   user_id SERIAL,
   titles VARCHAR(99),
   content VARCHAR(299)
);

CREATE TABLE users(
   id SERIAL PRIMARY KEY NOT NULL,
   name VARCHAR(99),
   password VARCHAR(99)
);


SELECT * FROM items WHERE user_id=id;

SELECT * FROM users WHERE name = username;

INSERT INTO users (name, password) VALUES (username, hash);

INSERT INTO items (user_id,titles,content) VALUES (UserID,title,content);

DELETE FROM items WHERE id=id;
