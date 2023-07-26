# Dockerfile (dentro da pasta backend)
FROM node:16-alpine

WORKDIR /app-back

COPY package.json package-lock.json /app-back/

# Configure o npm para usar um diretório de cache dentro do diretório do aplicativo
ENV NPM_CONFIG_CACHE=/app-back/.npm

RUN npm install --silent

COPY . /app-back

EXPOSE 3001

CMD ["npm", "run", "watch"]
