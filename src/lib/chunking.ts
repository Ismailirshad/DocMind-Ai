const CHUNK_SIZE = 2000;
const CHUNK_OVERLAP = 50;

export interface TextChunk {
    content: string;
    chunkIndex: number;
}

export function splitTextIntoChunks(text: string): TextChunk[] {
    const cleanedText = text.trim();

    if (!cleanedText) {
        return [];
    }

    const chunks: TextChunk[] = [];

    let start = 0;
    let chunkIndex = 0;

    while (start < cleanedText.length) {
        let end = Math.min(start + CHUNK_SIZE, cleanedText.length);

        // Try to avoid cutting a chunk in the middle of a word.
        if (end < cleanedText.length) {
            const lastSpace = cleanedText.lastIndexOf(" ", end);

            if (lastSpace > start + CHUNK_SIZE * 0.7) {
                end = lastSpace;
            }
        }

        const content = cleanedText.slice(start, end).trim();

        if (content) {
            chunks.push({
                content,
                chunkIndex,
            });

            chunkIndex++;
        }

        // Stop if we have reached the end of the text.
        if (end >= cleanedText.length) {
            break;
        }

        // Move forward while keeping some overlapping text.
        const nextStart = end - CHUNK_OVERLAP;

        if (nextStart <= start) {
            break;
        }

        start = nextStart;
    }

    return chunks;
}
