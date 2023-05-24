import { SystemChatMessage, HumanChatMessage } from "langchain/schema";
import { ChatOpenAI } from "langchain/chat_models/openai";


class LangChainIntegration {
  private openaiInstance: any;
  private conversationId: string;
  private conversation: Array<any>;

  constructor(apiKey: string) {
    this.openaiInstance = new SystemChatMessage('');
    this.conversationId = '';
    this.conversation = [];
  }

  async sendMessage(message: string): Promise<string> {
    this.conversation.push({
      role: 'system',
      content: message,
    });

    const response = await this.openaiInstance.completions.create({
      engine: 'text-davinci-003',
      prompt: this.getConversationPrompt(),
      max_tokens: 100,
      temperature: 0.6,
      n: 1,
      stop: '\n',
      context: this.conversation,
    });

    this.conversation.push({
      role: 'user',
      content: message,
    });

    this.conversationId = response.id;
    const reply = response.choices[0].text.trim();
    this.conversation.push({
      role: 'assistant',
      content: reply,
    });

    return reply;
  }

  private getConversationPrompt(): string {
    let prompt = '';
    for (const message of this.conversation) {
      if (message.role === 'system') {
        prompt += `Assistant: ${message.content}\n`;
      } else if (message.role === 'user') {
        prompt += `User: ${message.content}\n`;
      } else if (message.role === 'assistant') {
        prompt += `Assistant: ${message.content}\n`;
      }
    }
    return prompt;
  }
}

// Example usage:
const langChainIntegration = new LangChainIntegration('YOUR_OPENAI_API_KEY');
const reply = await langChainIntegration.sendMessage('Hello');
console.log(reply);