import * as MENUGROUPS from "./ATi18n/index";

import {
  OPENAI_CHAT_COMPLETION,
  OPENAI_TEXT_COMPLETION,
} from "../services/openai";

interface TerminalAssistantConfiguration { }

export class TerminalAssistant {
  options: any;
  chatModelConstructor: () => Promise<any>;
  chatModel: any;
  textModel: any;


  constructor(options?: TerminalAssistantConfiguration) {
    this.chatModelConstructor = async () => {
      const chat = await OPENAI_CHAT_COMPLETION(
        "You are the interactive assistant of the ATi18n internationalization and translator platform.",
        false
      );
      this.chatModel = chat; // Set the value of chatModel
      return chat;
    };
    this.textModel = OPENAI_TEXT_COMPLETION;

    this.initializeChatModel(); // Call the function to set chatModel immediately
  }

  private async initializeChatModel() {
    try {
      this.chatModel = await this.chatModelConstructor(); // Wait for chatModelConstructor to complete
    } catch (error) {

    }
  }


  private displayMenu = async (selectedMenu: string, options?: {}) => { };
}
