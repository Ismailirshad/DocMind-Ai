import ai from "@/lib/gemini";

const EMBEDDING_MODEL = "gemini-embedding-001";
const EMBEDDING_DIMENSIONS = 768;

type EmbeddingTask = "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY";

export async function generateEmbedding( text: string, taskType: EmbeddingTask): Promise<number[]> {
  // 1. Validate the input
  const cleanedText = text.trim();

  if (!cleanedText) {
    throw new Error("Cannot generate embedding for empty text.");
  }

  // 2. Ask Gemini to generate the embedding
  const response = await ai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: cleanedText,
    config: {
      taskType,
      outputDimensionality: EMBEDDING_DIMENSIONS,
    },
  });

  // 3. Extract the numerical vector
  const embedding = response.embeddings?.[0]?.values;

  // 4. Validate the returned vector
  if (!embedding || embedding.length !== EMBEDDING_DIMENSIONS) {
    throw new Error("Failed to generate a valid embedding.");
  }

  return embedding;
}
