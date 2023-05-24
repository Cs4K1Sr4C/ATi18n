import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema";
import { OpenAI } from "langchain/llms/openai";

// TESTING
export const TEST_COMPLETION = async (prompt: string) => {
  const model = new OpenAI({
    temperature: 0.9,
    openAIApiKey: "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",
  });
  const res = await model.call(prompt);

  console.log({ res });
};

export const TEST_CHAT_COMPLETION = async (prompt: string) => {
  const chat = new ChatOpenAI({
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          process.stdout.write(token);
        },
      },
    ],
  });

  await chat.call([new HumanChatMessage(prompt)]);
};
