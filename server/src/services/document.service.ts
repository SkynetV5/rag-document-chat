import { supabase } from "../lib/supabase"
import { DocumentsChatsService } from "./documents-chats.service";

export const documentService = {
    async getAllDocuments(){
        const {data, error} = await supabase.from("documents").select("*").order("created_at", {ascending: false});

        if (error) throw error;

        return data;
    },

    async getDocumentById(id:string){
        const {data,error} = await supabase.from("documents").select("*").eq("id", id).single();

        if (error) throw error;

        return data;
    },

    async getDocumentsByName(name:string){
        const {data, error} = await supabase.from("documents").select("*").eq("name", name);

        if (error) throw error;

        return data;
    },

    async create(file: Express.Multer.File){

    // console.log("FILE:", {
    //     name: file.originalname,
    //     size: file.size,
    //     mimetype: file.mimetype,
    //     bufferType: file.buffer.constructor.name
    // });

    const fileName = `${Date.now()}-${file.originalname}`;

    const {error: uploadError} =
        await supabase.storage
        .from("documents")
        .upload(
            fileName,
            new Uint8Array(file.buffer),
            {
                contentType:file.mimetype
            }
        );

    if(uploadError) throw uploadError;

    const {data,error} =
        await supabase
        .from("documents")
        .insert({
            name:file.originalname,
            file_path:fileName,
            size:file.size
        })
        .select()
        .single();

    if(error) throw error;


    return data;
},

    async delete(id:string){
        const {data: document, error: errorDocument} = await supabase.from("documents").select("file_path").eq("id",id).single();

        if (errorDocument) throw errorDocument;

        if (!document?.file_path) throw new Error("File path not found.");

        const fileUrl = document.file_path;
        const fileName = fileUrl.split("/").pop();

        if(!fileName) throw new Error("Invalid file name.");

        const {error: storageError} = await supabase.storage.from("documents").remove([fileName]);

        if (storageError) throw storageError;

        const documentsChatByDocumentId = await DocumentsChatsService.getByDocumentId(id);

        for (let i = 0; i < documentsChatByDocumentId.length; i++){
            await DocumentsChatsService.deleteByDocumentId(id);
        }

        const { data, error} = await supabase.from("documents").delete().eq("id", id).single();

        if (error) throw error;

        return data;
    }

}