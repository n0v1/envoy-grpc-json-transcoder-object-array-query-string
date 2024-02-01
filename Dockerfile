FROM node:20.11.0-alpine

EXPOSE 10000

ENV NODE_ENV="production"
COPY package*.json ./
COPY patches/      ./patches/
RUN npm ci

COPY google/   ./google/
COPY *.proto   ./
COPY server.js ./

CMD ["node", "server.js"]
