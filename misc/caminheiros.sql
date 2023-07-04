DROP SCHEMA IF EXISTS caminheirosdb;
CREATE SCHEMA IF NOT EXISTS caminheirosdb;

CREATE TABLE caminheirosdb.Users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE caminheirosdb.Groups (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES caminheirosdb.Users (id)
);

CREATE TABLE caminheirosdb.Meetings (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  date TEXT NOT NULL,
  groupId INTEGER,
  FOREIGN KEY (groupId) REFERENCES caminheirosdb.Groups (id)
);

CREATE TABLE caminheirosdb.Groups_has_users (
  groupId INTEGER,
  userId INTEGER,
  FOREIGN KEY (groupId) REFERENCES caminheirosdb.Groups (id),
  FOREIGN KEY (userId) REFERENCES caminheirosdb.Users (id)
);

CREATE TABLE caminheirosdb.Meetings_has_users (
  meetingsId INTEGER,
  userId INTEGER,
  frequency TINYINT,
  FOREIGN KEY (userId) REFERENCES caminheirosdb.Users (id)
);


INSERT INTO caminheirosdb.Users (name, phone, email, password, role) VALUES
('Lucas Gabriel Agostinho Belgamann', '(41) 98830-9378', 'lucasbelgamann@hotmail.com', 'lucaspass', 'admin'),
('Usuário 2', '987654321', 'usuario2@example.com', 'senha2', 'user'),
('Usuário 3', '987654321', 'usuario3@example.com', 'senha3', 'user'),
('Usuário 4', '987654321', 'usuario4@example.com', 'senha4', 'user');