import {groq} from "../lib/groq";



export const embeddingService = {
    async embed(text: string): Promise<number[]> {
      const res = await groq.embeddings.create({
        model: "nomic-embed-text",
        input: text,
      });
  
      const embedding = res.data[0].embedding;
  
      if (!Array.isArray(embedding)) {
        throw new Error("Embedding is not a number array.");
      }
  
      return embedding;
    },
  };