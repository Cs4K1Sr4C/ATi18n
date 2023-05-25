import * as dotenv from "dotenv";
import * as MENUGROUPS from './TerminalAssistant/index';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema";
import { OpenAI } from "langchain/llms/openai";

dotenv.config();

console.log(process.env.OPENAI_API_KEY);

// TESTING
export const TEST_COMPLETION = async (prompt: string) => {
  const model = new OpenAI({
    temperature: 0.9,
    openAIApiKey: process.env.OPENAI_API_KEY,
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
