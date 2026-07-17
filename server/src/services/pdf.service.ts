import { supabase } from "../lib/supabase"
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import {PDFParse} from "pdf-parse";

export const pdfService = {
    async downloadPdf(filePath: string){
        const { data, error } =
            await supabase.storage
            .from("documents")
            .download(filePath);
    
        if(error){
            throw error;
        }
    
        const arrayBuffer = await data.arrayBuffer();
    
        return new Uint8Array(arrayBuffer);
    },

    async extractPages(buffer: Uint8Array){
        const pdf = await pdfjsLib.getDocument({data: buffer}).promise;

        
        const pages = [];

        for (let i = 1; i <=pdf.numPages; i++){
            const page = await pdf.getPage(i);

            const content = await page.getTextContent();

            const text = content.items.map((item: any) => item.str).join(" ");

            pages.push({
                pageNumber:i,
                text
            });
        }

        return pages;
    }
}