import { createClient } from "redis";
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  SystemChatMessage,
  HumanChatMessage,
  AIChatMessage,
} from "langchain/schema";
import { BaseMemory, BufferMemory, ChatMessageHistory } from "langchain/memory";
import { RedisChatMessageHistory } from "langchain/stores/message/redis";
import { ConversationChain } from "langchain/chains";
import type {
  textCompletionModel,
  chatCompletionModel,
} from "../types/openAIModelSettings";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { GPT_35_TURBO } from "../utils/constants";
import {
  InputValues,
  MemoryVariables,
  OutputValues,
} from "langchain/dist/memory/base";

const createTextCompletionModel = (settings?: textCompletionModel) => {
  return new OpenAI({
    modelName: settings?.modelName || GPT_35_TURBO,
    temperature: settings?.temperature || 0.9,
    maxTokens: settings?.maxTokens || 400,
    openAIApiKey: process.env.OPENAI_API_KEY,
    streaming: settings?.streaming || true,
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          process.stdout.write(token);
        },
      },
    ],
  });
};

export const OPENAI_TEXT_COMPLETION = async (prompt: string) => {
  const model = createTextCompletionModel();
  const res = await model.call(prompt);
  return res as string;
};

const createChatCompletionModel = async (
  systemMessage: string,
  settings?: chatCompletionModel
) => {
  if (settings?.streaming) {
    const chat = new ChatOpenAI({
      temperature: settings?.temperature || 0.9,
      streaming: settings?.streaming || true,
      callbacks: [
        {
          handleLLMNewToken(token: string) {
            process.stdout.write(token);
          },
        },
      ],
    });
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(systemMessage),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    const chain = new ConversationChain({
      prompt: chatPrompt,
      llm: chat,
      memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    });

    return chain;
  } else {
    const chat = new ChatOpenAI({
      temperature: settings?.temperature || 0.9,
      streaming: false,
    });
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(systemMessage),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    const chain = new ConversationChain({
      prompt: chatPrompt,
      llm: chat,
      memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    });

    return chain;
  }
};

export const OPENAI_CHAT_COMPLETION = async (
  systemMessage: string,
  stream: boolean
) => {
  const chat = await createChatCompletionModel(systemMessage, {
    streaming: stream,
  });

  return chat;
};
