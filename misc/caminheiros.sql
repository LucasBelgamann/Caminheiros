DROP SCHEMA IF EXISTS caminheirosdb;
CREATE SCHEMA IF NOT EXISTS caminheirosdb;

CREATE TABLE caminheirosdb.Users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

INSERT INTO caminheirosdb.Users (name, phone, email, password, role, created_at, updated_at)
VALUES
('Lucas Gabriel Agostinho Belgamann', '(41) 98830-9378', 'lucasbelgamann@hotmail.com', 'lucaspass', 'admin', CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo')),
('José Roberto', '987654321', 'usuario2@example.com', 'senha2', 'admin', CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo')),
('Maria da Silva', '987654321', 'usuario3@example.com', 'senha3', 'admin', CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo')),
('Carlos Eduardo', '987654321', 'usuario4@example.com', 'senha4', 'user', CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo')),
('Pedro', '987654321', 'usuario4@example.com', 'senha4', 'user', CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo')),
('Jefferson Eduardo', '987654321', 'usuario4@example.com', 'senha4', 'user', CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo')),
('Dirceu Eduardo', '987654321', 'usuario4@example.com', 'senha4', 'user', CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'));

INSERT INTO caminheirosdb.Groups (name, userId, created_at, updated_at)
VALUES
('André Luiz', 1, CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo')),
('ESDE TOMO 1', 3, CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo')),
('ESDE TOMO 2', 2, CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'));


INSERT INTO caminheirosdb.Groups_has_users (groupId, userId)
VALUES
(1, 4),
(1, 5),
(2, 6),
(2, 7);