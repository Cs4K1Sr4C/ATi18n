import * as MENUGROUPS from "./ATi18n/index";

import {
  OPENAI_CHAT_COMPLETION,
  OPENAI_TEXT_COMPLETION,
} from "../services/openai";

interface TerminalAssistantConfiguration {}

export class TerminalAssistant {
  options: any;
  chatModel: any;
  textModel: any;

  constructor(options?: TerminalAssistantConfiguration) {
    this.chatModel = async () => {
      const chat = await OPENAI_CHAT_COMPLETION(
        "You are the interactive assistant of the ATi18n internationalization and translator platform.",
        true
      );
      return chat;
    };
    this.textModel = OPENAI_TEXT_COMPLETION;
  }

  private displayMenu = async (selectedMenu: string, options?: {}) => {};
}
