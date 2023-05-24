import { HuggingFaceInference } from "langchain/llms/hf";

// TESTING
export const TEST_COMPLETION = async (
  selectedModel: string,
  prompt: string
) => {
  const model = new HuggingFaceInference({
    model: selectedModel || "gpt2",
    apiKey: process.env.HUGGINGFACEHUB_API_KEY || null, // In Node.js defaults to process.env.HUGGINGFACEHUB_API_KEY
  });
  const res = await model.call(prompt);

  console.log({ res });
};
