export type RetrievedChunk = {
    id: string;
    document_id: string;
    content: string;
    page_number: number;
    similarity: number;
};

export function hitAtK(
    results: RetrievedChunk[], expectedPages: number[], k: number
): boolean {
    return results
    .slice(0, k)
    .some((result) => expectedPages.includes(result.page_number));
}

export function reciprocalRank(
    results: RetrievedChunk[],
    expectedPages: number[]
): number {
    const index = results.findIndex((result) => 
        expectedPages.includes(result.page_number)
    )

    if (index === -1) return 0;

    return 1 / (index + 1);
}

