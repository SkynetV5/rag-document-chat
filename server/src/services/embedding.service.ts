import { pipeline } from "@xenova/transformers";


let extractor: any;

async function getExtractor() {
  if (!extractor) {
      extractor = await pipeline(
          "feature-extraction",
          "Xenova/all-MiniLM-L6-v2"
      );
  }

  return extractor;
}

export const embeddingService = {
    async embed(text: string): Promise<number[]> {

      const model = await getExtractor();
      const res = await model(
        text,{pooling: "mean", normalize:true});
  
      return Array.from(res.data);
    },
  };