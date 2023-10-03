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
  description TEXT,
  studyDays VARCHAR(255),
  hour TEXT,
  modality VARCHAR(255),
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

CREATE TABLE caminheirosdb.Warnings (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  description TEXT,
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
  frequency BOOLEAN,
  FOREIGN KEY (userId) REFERENCES caminheirosdb.Users (id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Administrador
INSERT INTO caminheirosdb.Users (name, phone, email, password, role)
VALUES ('Lucas', '(041) 98830-9378', 'admin@example.com', 'senha', 'Administrador');

-- Facilitadores
INSERT INTO caminheirosdb.Users (name, phone, email, password, role)
VALUES
  ('Maria', '(041) 98830-9379', 'maria@example.com', 'senha', 'Facilitador'),
  ('João', '(041) 98830-9380', 'joao@example.com', 'senha', 'Facilitador'),
  ('Ana', '(041) 98830-9381', 'ana@example.com', 'senha', 'Facilitador'),
  ('Pedro', '(041) 98830-9382', 'pedro@example.com', 'senha', 'Facilitador');

-- Participantes
INSERT INTO caminheirosdb.Users (name, phone, email, password, role)
VALUES
  ('José', '(041) 98830-9383', 'jose@example.com', 'senha', 'Participante'),
  ('Mariana', '(041) 98830-9384', 'mariana@example.com', 'senha', 'Participante'),
  ('Carlos', '(041) 98830-9385', 'carlos@example.com', 'senha', 'Participante'),
  ('Sofia', '(041) 98830-9386', 'sofia@example.com', 'senha', 'Participante'),
  ('Paulo', '(041) 98830-9387', 'paulo@example.com', 'senha', 'Participante'),
  ('Lara', '(041) 98830-9388', 'lara@example.com', 'senha', 'Participante'),
  ('Eduardo', '(041) 98830-9389', 'eduardo@example.com', 'senha', 'Participante'),
  ('Isabela', '(041) 98830-9390', 'isabela@example.com', 'senha', 'Participante'),
  ('Ricardo', '(041) 98830-9391', 'ricardo@example.com', 'senha', 'Participante'),
  ('Camila', '(041) 98830-9392', 'camila@example.com', 'senha', 'Participante');

-- Grupos
INSERT INTO caminheirosdb.Groups (name, description, studyDays, hour, modality, userId)
VALUES
  ('Evangelho no Lar', 'O Evangelho no Lar Online se baseia no Evangelho segundo o Espiritismo – ESE e está aberto a todos aqueles que queiram estudar e conhecer um pouco mais sobre a palavra do Cristo.', 'Aos domingos', 'das 21h15 às 21h55', 'Online', 1),
  ('Espiritismo Conectado', 'Este grupo visa estudar o espiritismo em suas diferentes expressões. Com um caráter dentro da psicologia transpessoal, aplica-se o estudo aos temas e assuntos em pauta trazidos pelos membros ou temática da atualidade.', 'Às segundas-feiras', 'das 20h00 às 20h55', 'Online', 1),
  ('Grupo de Acolhimento', 'O Grupo de Acolhimento tem o objetivo de proporcionar ao participante um primeiro contato com o Caminheiros do Bem. Nesse momento são discutidos temas importantes para aqueles que estão conhecendo a Doutrina Espírita assim como para aqueles que já são espíritas a mais tempo. É a oportunidade também, de apresentar todas as atividades da casa, proporcionando ao participante maiores condições de decidir onde gostaria de estar. Tem um ciclo curto de no máximo 10 encontros e posteriormente os participantes serão direcionados aos grupos de estudos que escolherem.', 'Às segundas-feiras', 'das 19h45 às 20h45', 'Presencial', 1),
  ('ESDE - TOMO I', 'O Estudo Sistematizado da Doutrina Espírita (ESDE) oferece uma visão panorâmica do Espiritismo, fundamentada no Livro dos Espíritos. O objetivo fundamental é propiciar condições para um estudo sério, regular e contínuo, alicerçado na codificação de Kardec e no Evangelho de Jesus.', 'Às terças-feiras', '19h45', 'Presencial', 1),
  ('Servidores da Luz', 'O grupo de estudos Servidores da Luz tem a proposta de estudar a mediunidade de forma mais aprofundada, buscando ir além da teoria, entendendo que a mediunidade acontece em toda a vida, e não apenas no grupo mediúnico.', 'Às quartas-feiras', 'das 19h30 às 21h00', 'Presencial', 1),
  ('Xavier', 'O Grupo de Estudos Mediúnicos Xavier tem como objetivo gerar uma base sólida da doutrina dos espíritos para equilibrar os médiuns e preparar aqueles que se dispuserem aos trabalhos na casa.', 'Às quartas-feiras', 'das 19h30 às 21h00', 'Presencial', 1),
  ('Allan Kardec', 'Grupo de Estudos das Obras Básicas de Allan Kardec, com um viés para estudos sobre a mediunidade. Fazemos o estudo de O Livro dos Espíritos na primeira e segunda semana do mês, e o livro O Céu e o Inferno, na terceira e quarta semana do mês. Utilizamos a leitura comentada como base de nosso estudo.', 'Às quintas-feiras', 'das 20h00 às 21h30', 'Online', 1),
  ('Reforma Íntima', 'Se você está buscando autoconhecimento para sua melhoria espiritual e gosta do estudo da psicologia humana, este grupo pode lhe auxiliar.', 'Às quintas-feiras', 'das 19h30 às 21h00', 'Presencial & Online', 1),
  ('Boa Nova', 'O Grupo Boa Nova vem, ao longo dos anos, aprofundando seus estudos nas obras básicas da Codificação Espírita, com o objetivo principal de evangelizarmos nossos corações, buscando através do ensino moral do Cristo, uma ampliação da nossa visão de mundo, buscando também superar nossas dificuldades, nossos sofrimentos, enganos, rumo a nossa felicidade prometida por Jesus.', 'Às quintas-feiras', 'das 19h30 às 21h00', 'Presencial & Online', 1),
  ('ESDE -TOMO ÚNICO', 'O Programa do Estudo Sistematizado da Doutrina Espírita (ESDE) oferece uma visão panorâmica do Espiritismo, fundamentada nos assuntos existentes em O livro dos espíritos. O objetivo fundamental deste Programa, como dos anteriores, é propiciar condições para estudar o Espiritismo de forma séria, regular e contínua, tendo como base as obras codificadas por Allan Kardec e o Evangelho de Jesus, conforme os esclarecimentos prestados na apresentação.', 'As sextas-feiras', 'das 19h45 às 20h45', 'Presencial', 1),
  ('Grupo Pão Nosso', 'O Estudo Aprofundado da Doutrina Espírita (EADE) é um curso que tem como proposta enfatizar o tríplice aspecto da Doutrina Espírita, estudado de forma geral nos cursos de formação básica, usuais na Casa Espírita.', 'As segundas-feiras', 'das 21h00 às 22h30', 'Online', 1),
  ('André Luiz', 'Neste formato de grupos de estudos, os livros são lidos por capítulos individualmente e comentados entre os participantes, sob orientação de facilitadores, familiarizados com as obras estudadas, sendo, inclusive, possível utilizar-se de bibliografia auxiliar.', 'Aos sábados', 'das 13h00 às 14h20', 'Presencial', 1),
  ('ESDE - TOMO II', 'Os grupos de estudo do ciclo ESDE são baseados na proposta da Federação Espírita Brasileira, que aborda temas fundamentais para a compreensão de nossa querida doutrina. De forma leve e participativa abordamos os dois tomos do programa fundamental e o tomo único do programa complementar, passeando pelos diversos conceitos e discutindo a racionalidade e grandeza dos princípios cristãos à luz da Doutrina Espírita.', 'Aos sábados', '14h45', 'Presencial', 1);
