import swaggerJsdoc from "swagger-jsdoc";

const URL = process.env.URL;

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RAG Document Chat API",
      version: "1.0.0",
    },
    servers: [
      {
        url: URL,
      },
    ],
  },
  apis: ["src/routes/*.ts", "src/app.ts"],
});