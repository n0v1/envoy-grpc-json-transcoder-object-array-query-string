FROM node:20.11.0-alpine

EXPOSE 10000

ENV NODE_ENV="production"
COPY package*.json ./
COPY patches/      ./patches/
RUN npm ci

COPY google/   ./google/
COPY *.proto   ./
COPY bookstore.js ./

CMD ["node", "bookstore.js"]
