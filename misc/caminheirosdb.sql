DROP SCHEMA IF EXISTS caminheirosdb;
CREATE SCHEMA IF NOT EXISTS caminheirosdb;

CREATE TABLE caminheirosdb.Users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  password VARCHAR(255) NOT NULL DEFAULT '',
  role TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE caminheirosdb.Groups (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES caminheirosdb.Users (id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE caminheirosdb.Meetings (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  groupId INTEGER,
  FOREIGN KEY (groupId) REFERENCES caminheirosdb.Groups (id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
  frequency BOOLEAN,
  FOREIGN KEY (userId) REFERENCES caminheirosdb.Users (id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO caminheirosdb.Users (name, phone, email, password, role)
VALUES
('Lucas Gabriel Agostinho Belgamann', '(41) 98830-9378', 'lucasbelgamann@hotmail.com', 'lucaspass', 'admin'),
('José Roberto', '987654321', 'usuario2@example.com', 'senha2', 'admin'),
('Maria da Silva', '987654321', 'usuario3@example.com', 'senha3', 'admin'),
('Carlos Eduardo', '987654321', 'usuario4@example.com', 'senha4', 'user'),
('Pedro', '987654321', 'usuario4@example.com', 'senha4', 'user'),
('Jefferson Eduardo', '987654321', 'usuario4@example.com', 'senha4', 'user'),
('Dirceu Eduardo', '987654321', 'usuario4@example.com', 'senha4', 'user');

INSERT INTO caminheirosdb.Groups (name, userId)
VALUES
('André Luiz', 1),
('ESDE TOMO 1', 3),
('ESDE TOMO 2', 2);


INSERT INTO caminheirosdb.Groups_has_users (groupId, userId)
VALUES
(1, 4),
(1, 5),
(2, 4),
(2, 6),
(2, 7);