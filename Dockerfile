FROM node:12.2.0-alpine

WORKDIR /app

COPY . .

RUM npm install

EXPOSE 3000
CMD ["npm", "run", "start"]