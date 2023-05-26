import * as MENUGROUPS from './TerminalAssistant/index';
import { OPENAI_CHAT_COMPLETION, OPENAI_TEXT_COMPLETION } from '../services/openai';

interface TerminalAssistantConfiguration { }

export class TerminalAssistant {
  options: any;
  chatModel: any;
  textModel: any;

  constructor(options?: TerminalAssistantConfiguration) {
    this.chatModel = OPENAI_CHAT_COMPLETION;
    this.textModel = OPENAI_TEXT_COMPLETION;
  }

  public displayMainMenu = async (firstRun: boolean, shouldExit: boolean) => {
    MENUGROUPS.default.main.selectMainMenu(firstRun, shouldExit);
    return shouldExit;
  }

}