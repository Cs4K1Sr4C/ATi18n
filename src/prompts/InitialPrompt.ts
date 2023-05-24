import { SystemMessagePromptTemplate } from "langchain/prompts";

const prompt = SystemMessagePromptTemplate.fromTemplate(
  "You are a helpful assistant that translates {input_language} to {output_language}."
);

const formattedPrompt = await prompt.format({
  input_language: "English",
  output_language: "French",
});
