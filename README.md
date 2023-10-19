# Caminheiros

O Caminheiros é um projeto completo que integra um banco de dados com uma interface gráfica moderna. Desenvolvido para facilitar o gerenciamento de usuários, grupos e reuniões de uma organização chamada Caminheiros, ele combina a potência do MySQL como sistema de gerenciamento de banco de dados relacional com a flexibilidade do Vue.js e Quasar Framework para criar uma experiência intuitiva e agradável.

## Principais recursos

- Cadastro e gerenciamento de usuários com informações detalhadas, como nome, telefone, e-mail, senha e papel (admin ou user).
- Organização de grupos com nome e associação a um usuário responsável.
- Agendamento e controle de reuniões com data, horário e vínculo a um grupo específico.
- Associação e remoção de usuários aos grupos de forma fácil e rápida.
- Registro de frequência dos usuários nas reuniões para acompanhamento preciso.

## Tecnologias utilizadas

O Caminheiros utiliza uma combinação poderosa de tecnologias:

- **MySQL**: Sistema de gerenciamento de banco de dados relacional confiável e escalável.
- **Vue.js**: Framework JavaScript progressivo para construção de interfaces de usuário interativas.
- **Quasar Framework**: Framework Vue.js que permite o desenvolvimento de aplicações web e mobile responsivas.
- **Docker**: Plataforma de contêinerização que simplifica o desenvolvimento, implantação e execução de aplicativos.

## Uso

1. Abra o terminal da sua máquina e execute o seguinte códico `git clone git@github.com:"seu_usuário"/Caminheiros.git`.  Certifique-se de substituir "seu_usuário" pelo seu nome de usuário do GitHub.
2. Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.
3. Navegue até a raiz do projeto no terminal.
4. Execute o comando `docker-compose up --build` para iniciar o contêiner do banco de dados.
5. Aguarde até que todos os contêineres sejam iniciados com sucesso.
6. Em seguida, navegue até a pasta "backend" e execute os seguintes comandos: `npm install` E `npm run dev`.
7. Da mesma forma, vá para a pasta "frontend" e execute: `npm install` E `quasar dev`.
8. Acesse o sistema por meio de um navegador web utilizando o endereço indicado pelo sistema.

<details>
<summary>Exemplo de Usuários</summary>
Aqui está um exemplo de usuários que você pode usar para cadastrar através da rota POST http://localhost:3001/users/create-user:

[
    {
        "name": "Lucas Agostinho",
        "phone": "(041) 99830-5678",
        "email": "admin@example.com",
        "password": "senha",
        "role": "Administrador"
    },
    {
        "name": "Maria Souza",
        "phone": "(041) 98830-9379",
        "email": "maria@example.com",
        "password": "senha",
        "role": "Facilitador"
    },
    {
        "name": "João Santos",
        "phone": "(041) 98830-9380",
        "email": "joao@example.com",
        "password": "senha",
        "role": "Facilitador"
    },
    {
        "name": "Ana Oliveira",
        "phone": "(041) 98830-9381",
        "email": "ana@example.com",
        "password": "senha",
        "role": "Facilitador"
    },
    {
        "name": "Pedro Pereira",
        "phone": "(041) 98830-9382",
        "email": "pedro@example.com",
        "password": "senha",
        "role": "Facilitador"
    },
    {
        "name": "José Martins",
        "phone": "(041) 98830-9383",
        "email": "jose@example.com",
        "password": "senha",
        "role": "Participante"
    },
    {
        "name": "Mariana Ferreira",
        "phone": "(041) 98830-9384",
        "email": "mariana@example.com",
        "password": "senha",
        "role": "Participante"
    },
    {
        "name": "Carlos Lima",
        "phone": "(041) 98830-9385",
        "email": "carlos@example.com",
        "password": "senha",
        "role": "Participante"
    },
    {
        "name": "Sofia Rodrigues",
        "phone": "(041) 98830-9386",
        "email": "sofia@example.com",
        "password": "senha",
        "role": "Participante"
    },
    {
        "name": "Paulo Pereira",
        "phone": "(041) 98830-9387",
        "email": "paulo@example.com",
        "password": "senha",
        "role": "Participante"
    },
    {
        "name": "Lara Almeida",
        "phone": "(041) 98830-9388",
        "email": "lara@example.com",
        "password": "senha",
        "role": "Participante"
    },
    {
        "name": "Eduardo Gomes",
        "phone": "(041) 98830-9389",
        "email": "eduardo@example.com",
        "password": "senha",
        "role": "Participante"
    },
    {
        "name": "Isabela Ribeiro",
        "phone": "(041) 98830-9390",
        "email": "isabela@example.com",
        "password": "senha",
        "role": "Participante"
    },
    {
        "name": "Ricardo Barbosa",
        "phone": "(041) 98830-9391",
        "email": "ricardo@example.com",
        "password": "senha",
        "role": "Participante"
    },
    {
        "name": "Camila Nunes",
        "phone": "(041) 98830-9392",
        "email": "camila@example.com",
        "password": "senha",
        "role": "Participante"
    }
]
</details>

<details>
<summary>Exemplo de Grupos</summary>
Aqui está um exemplo de grupos que você pode usar para cadastrar através da rota POST http://localhost:3001/groups/create-group:

[
    {
        "name": "Grupo Alegria",
        "description": "Este grupo é dedicado a promover a alegria e o bem-estar por meio do estudo e da convivência fraterna.",
        "studyDays": "Às segundas-feiras",
        "hour": "19h00",
        "modality": "Presencial",
        "userId": 1
    },
    {
        "name": "Grupo Amizade",
        "description": "O Grupo Amizade é um espaço onde a amizade é valorizada e cultivada. Todos são bem-vindos para participar.",
        "studyDays": "Às quartas-feiras",
        "hour": "18h30",
        "modality": "Online",
        "userId": 1
    },
    {
        "name": "Grupo Sabedoria",
        "description": "Este grupo busca aprofundar o conhecimento por meio de estudos e debates construtivos. Venha compartilhar sua sabedoria.",
        "studyDays": "Às quintas-feiras",
        "hour": "20h15",
        "modality": "Presencial",
        "userId": 1
    },
    {
        "name": "Grupo União",
        "description": "O Grupo União promove a união e a solidariedade entre seus membros. Junte-se a nós para fortalecer os laços de amizade.",
        "studyDays": "Às sextas-feiras",
        "hour": "19h30",
        "modality": "Online",
        "userId": 1
    },
    {
        "name": "Grupo Reflexão",
        "description": "Refletir é o objetivo deste grupo, que aborda temas profundos e inspiradores para estimular a reflexão e o autoconhecimento.",
        "studyDays": "Às terças-feiras",
        "hour": "19h00",
        "modality": "Presencial",
        "userId": 1
    },
    {
        "name": "Grupo Harmonia",
        "description": "O Grupo Harmonia busca promover a harmonia interior e a paz de espírito por meio de encontros fraternos.",
        "studyDays": "Às segundas-feiras",
        "hour": "20h00",
        "modality": "Online",
        "userId": 1
    },
    {
        "name": "Grupo Luz Interior",
        "description": "Este grupo é dedicado a explorar a luz interior de cada um de seus participantes. Junte-se a nós para essa jornada de autoconhecimento.",
        "studyDays": "Às quartas-feiras",
        "hour": "19h30",
        "modality": "Presencial",
        "userId": 1
    },
    {
        "name": "Grupo Amor Fraterno",
        "description": "O Grupo Amor Fraterno cultiva o amor e a compaixão entre seus membros, promovendo ações de caridade e solidariedade.",
        "studyDays": "Às quintas-feiras",
        "hour": "20h30",
        "modality": "Presencial",
        "userId": 1
    },
    {
        "name": "Grupo Esperança",
        "description": "A esperança é o motor deste grupo, que busca inspirar e motivar seus participantes a superar desafios e adversidades.",
        "studyDays": "Às sextas-feiras",
        "hour": "18h45",
        "modality": "Online",
        "userId": 1
    },
    {
        "name": "Grupo Renovação",
        "description": "A renovação espiritual é o foco deste grupo, que explora novas perspectivas e abordagens para a espiritualidade.",
        "studyDays": "Às terças-feiras",
        "hour": "19h15",
        "modality": "Presencial",
        "userId": 1
    },
    {
        "name": "Grupo Gratidão",
        "description": "A gratidão é o sentimento que guia este grupo, que valoriza as bênçãos da vida e as boas ações.",
        "studyDays": "Às segundas-feiras",
        "hour": "19h45",
        "modality": "Online",
        "userId": 1
    },
    {
        "name": "Grupo Consciência",
        "description": "A consciência espiritual é o tema deste grupo, que busca aprofundar o entendimento da vida e do propósito.",
        "studyDays": "Às quartas-feiras",
        "hour": "20h15",
        "modality": "Presencial",
        "userId": 1
    },
    {
        "name": "Grupo Paz Interior",
        "description": "A paz interior é cultivada neste grupo, que busca equilíbrio e tranquilidade por meio da espiritualidade.",
        "studyDays": "Às quintas-feiras",
        "hour": "19h30",
        "modality": "Presencial",
        "userId": 1
    },
    {
        "name": "Grupo Serenidade",
        "description": "A serenidade é o objetivo deste grupo, que busca equilíbrio e tranquilidade por meio da espiritualidade.",
        "studyDays": "Às sextas-feiras",
        "hour": "19h00",
        "modality": "Online",
        "userId": 2
    },
    {
        "name": "Grupo Transformação",
        "description": "A transformação espiritual é o propósito deste grupo, que convida os participantes a crescer e evoluir.",
        "studyDays": "Às terças-feiras",
        "hour": "20h00",
        "modality": "Presencial",
        "userId": 3
    }
]
</details>

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema, tiver sugestões ou quiser adicionar novas funcionalidades, sinta-se à vontade para abrir uma issue ou enviar um pull request.


