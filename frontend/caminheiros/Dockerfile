# Use a imagem base do Node.js no ambiente Linux
FROM node:16-alpine

# Defina o diretório de trabalho como /app-front
WORKDIR /app-front

# Copie apenas os arquivos de dependência para o contêiner e instale-os
COPY package*.json ./
RUN npm install --silent

# Copie todo o conteúdo do diretório do projeto para o contêiner
COPY . .

# Execute npm install novamente para instalar todas as dependências
RUN npm install

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
