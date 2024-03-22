FROM node:18-alpine

COPY package*.json ./
RUN yarn install --production


COPY . .

EXPOSE 8000
CMD yarn start
