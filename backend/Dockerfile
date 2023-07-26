FROM node:16-alpine

WORKDIR /app-back

COPY package.json package-lock.json /app-back/

RUN npm install --silent

COPY . /app-back

EXPOSE 3001

CMD ["npm", "run", "watch"]