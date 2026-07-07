export const chunkService = {

    createChunks(chunkSize = 1000, overlap = 200, pages:any[]){

        const chunks:any[] = [];

        pages.forEach(page =>{


        let start = 0;

        while (start < page.text.length){
            const end = start + chunkSize;

            chunks.push({
                content: page.text.slice(start,end),
                pageNumber: page.pageNumber
            });

            start += chunkSize - overlap;
        }        
    });
    return chunks;
}

}