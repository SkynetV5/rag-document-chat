import { supabase } from "../lib/supabase"

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

    console.log("FILE:", {
        name: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        bufferType: file.buffer.constructor.name
    });


    const fileName = `${Date.now()}-${file.originalname}`;


    console.log("BEFORE UPLOAD");


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


    console.log("AFTER UPLOAD");


    if(uploadError) throw uploadError;


    console.log("BEFORE INSERT");


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


    console.log("AFTER INSERT");


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

        const { data, error} = await supabase.from("documents").delete().eq("id", id).single();

        if (error) throw error;

        return data;
    }

}