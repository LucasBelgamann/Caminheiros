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
  date TEXT NOT NULL,
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
('Usuário 2', '987654321', 'usuario2@example.com', 'senha2', 'user', CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo')),
('Usuário 3', '987654321', 'usuario3@example.com', 'senha3', 'user', CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo')),
('Usuário 4', '987654321', 'usuario4@example.com', 'senha4', 'user', CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'), CONVERT_TZ(NOW(), 'UTC', 'America/Sao_Paulo'));
