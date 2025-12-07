import { getEmbedding } from "./geminiClient.js";
import { pineconeIndex } from "../../config/pineconeClient.js";

export async function queryDocuments(query, docId, topK = 5) {
  const [queryEmbedding] = await getEmbedding([query]);

  const queryResponse = await pineconeIndex.query({
    vector: queryEmbedding.values,
    topK,
    includeMetadata: true,
    filter: {
      docId: docId,
    },
  });

  return queryResponse.matches.map((match) => match.metadata.chunkText);
}
