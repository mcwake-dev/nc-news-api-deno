import { runQuery } from "../connection.ts";

export const createTables = async () => {
  await runQuery(`
    CREATE TABLE topics (
      slug VARCHAR(50) NOT NULL PRIMARY KEY,
      description VARCHAR(255) NOT NULL
    );
  `);
  await runQuery(`
    CREATE TABLE users (
      username VARCHAR(50) NOT NULL PRIMARY KEY,
      avatar_url VARCHAR(255) NOT NULL,
      firstName VARCHAR(100) NOT NULL,
      surname VARCHAR(50) NOT NULL,
      password VARCHAR(100) NOT NULL
    );
  `);
  await runQuery(`
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      votes INT DEFAULT 0 NOT NULL,
      topic VARCHAR(50) NOT NULL,
      author VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT now(),
      FOREIGN KEY (topic) REFERENCES topics (slug) ON DELETE CASCADE,
      FOREIGN KEY (author) REFERENCES users (username) ON DELETE CASCADE
    )
  `);
  await runQuery(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(50) NOT NULL,
      article_id INT NOT NULL,
      votes INT DEFAULT 0 NOT NULL,
      created_at TIMESTAMP DEFAULT now(),
      body TEXT NOT NULL,
      FOREIGN KEY (author) REFERENCES users(username) ON DELETE CASCADE,
      FOREIGN KEY (article_id) REFERENCES articles(article_id) ON DELETE CASCADE
    )
  `);
};
