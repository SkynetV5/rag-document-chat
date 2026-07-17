import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    output: {
      mode: 'tags-split',
      target: 'src/api',
      schemas: 'src/api/model',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: "./src/api/axios.ts",
          name: "axios",
        },
        formData: true,
      },
    },
    input: {
      target: '../server/src/config/docs.json',
    },
  },
});