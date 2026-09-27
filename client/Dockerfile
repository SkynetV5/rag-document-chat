FROM node:22 AS builder

WORKDIR /rag-document-chatbot-client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:22 AS runner

WORKDIR /rag-document-chatbot-client

COPY package*.json ./

RUN npm install

COPY --from=builder /rag-document-chatbot-client/dist ./dist

EXPOSE 5173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]