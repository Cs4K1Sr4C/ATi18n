import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import MemoryHandler from "../modules/memoryHandler";
import { ConversationChain } from "langchain/chains";
import type {
  textCompletionModel,
  chatCompletionModel,
} from "../utils/types";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { GPT_35_TURBO } from "../utils/constants";
import {
  InputValues,
  OutputValues,
} from "langchain/dist/memory/base";

const sourceMemory = new BufferMemory({ returnMessages: true, memoryKey: "history" });
let input: InputValues = { text: "My name is John and the weather is sunny now." };
let output: OutputValues = { text: "Nice to meet you John. Thank you for providing me the current information about the weather." };
sourceMemory.saveContext(input, output);
input = { text: "required: \"This field is required.\"," }
output = { text: "required: translate('This field is required.')," }
sourceMemory.saveContext(input, output);


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
    cache: true
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
      cache: true
    });
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(systemMessage),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    const chain = new ConversationChain({
      prompt: chatPrompt,
      llm: chat,
      //memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
      memory: sourceMemory
    });

    return chain;
  } else {
    const chat = new ChatOpenAI({
      temperature: settings?.temperature || 0.9,
      streaming: false,
      cache: true
    });
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(systemMessage),
      new MessagesPlaceholder("history"),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    const chain = new ConversationChain({
      prompt: chatPrompt,
      llm: chat,
      //memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
      memory: sourceMemory
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
