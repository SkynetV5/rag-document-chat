import { supabase } from "../lib/supabase"
import { pdfService } from "./pdf.service"
import { chunkService } from "./chunk.service"
import { documentService } from "./document.service"
import { embeddingService } from "./embedding.service"

export const documentChunksService = {

    async indexDocumentChunks(documentId: string){

        const document = await documentService.getDocumentById(documentId);

        const pdfFile = await pdfService.downloadPdf(document.file_path);

        const text = await pdfService.extractPages(pdfFile);

        const chunks = chunkService.createChunks(1000, 200, text);

        for (let i = 0; i < chunks.length; i++){
            const embedding = await embeddingService.embed(chunks[i]);

            await supabase.from("documents_chunks").insert({document_id: documentId,
                content: chunks[i].content,
                chunk_index: i,
                page_number: chunks[i].pageNumber,
                embedding
            })
        }
        
    }
}