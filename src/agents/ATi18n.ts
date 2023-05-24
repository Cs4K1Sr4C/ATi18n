import { ChatOpenAI } from "langchain/chat_models/openai";
import { VectorStoreRetrieverMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  AgentAction,
  AgentFinish,
  AgentStep,
  BaseChatMessage,
  HumanChatMessage,
  InputValues,
  PartialValues,
} from "langchain/schema";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";

class ATi18n {
  private model: ChatOpenAI;
  private executor: PlanAndExecuteAgentExecutor;

  constructor() {
    this.model = new ChatOpenAI({
      temperature: 0,
      modelName: "gpt-3.5-turbo",
      verbose: true,
    });
    this.executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
      llm: this.model,
      tools: [],
    });
  }

  async scanFilesAndExtractTranslatableParts() {
    const result = await this.executor.call({
      input: "Start to scan the files and extract the translatable parts.",
    });

    console.log({ result });
  }
}

export default ATi18n;