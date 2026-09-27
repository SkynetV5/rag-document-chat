FROM node:22 AS builder

WORKDIR /rag-document-chatbot-server

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build


FROM node:22 AS runner

WORKDIR /rag-document-chatbot-server

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /rag-document-chatbot-server/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]